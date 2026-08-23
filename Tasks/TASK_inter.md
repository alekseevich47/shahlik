# TASK_inter — интеграция с кассой Frontpad (боевая)

Канон стека — `.cursor/rules/stack_new.mdc`. Спека кассы — `.cursor/rules/API.mdc`. Схема коллекций — `Tasks/schema.json`, зона БД — `Tasks/TASK_DB.md`.

## Что уже есть (не переписывать)

| Готово | Где |
|---|---|
| Коллекции `orders` / `frontpad_settings` / `frontpad_stock` / `frontpad_jobs` / `settings` / `coupons` | `Tasks/schema.json` |
| Артикулы: `article` на размере + `articleByVariant`, матрица SKU, поиск конфликтов | `entities/product/lib.ts`, `entities/product/lib/articles.ts` |
| Создание заказа, realtime-статус, постановка `resend_order` | `entities/order/api.ts` |
| Настройки кассы, стоп-лист, `sync_products` / `sync_stops` из админки | `entities/settings/api.ts`, `pages/admin/sections/settings/FrontpadPanel.tsx` |
| Заказы в админке: фильтр «есть ошибка отправки», дрор с переотправкой | `pages/admin/sections/orders/*` |

## Чего нет (это и есть задача)

1. **`pb_hooks` целиком** — в репозитории нет ни одного хука. Ни один заказ в кассу не уходит, `frontpad_stock` пуст, вебхук статусов некому принять, `POST /api/promo/check` (его уже зовёт `checkPromo`) отвечает 404.
2. **Адрес по частям.** Frontpad принимает `street/home/pod/et/apart`, у нас в корзине одна строка `address` + заглушка карты. Поле `orders.addressParts` есть, но никто не пишет.
3. **Стоп-лист не влияет на витрину** — `useFrontpadStockArticles` используется только в матрице артикулов админки.
4. **Рассинхрон полей заказа**: клиент шлёт `number` и `promo`, читает `couponCode`; суммы приходят с клиента и никем не пересчитываются.

## Ключевые решения (от них зависит корректность)

- **Единственный источник вызовов кассы — `pb_hooks`.** Секрет только в env процесса `pocketbase`. Клиент/админка Frontpad не зовут.
- **Идемпотентность важнее ретраев.** Заказ уходит один раз: перед вызовом `new_order` в транзакции ставится `sentAt`; повторная отправка возможна только если `frontpadOrderId` пуст. При таймауте/сетевой ошибке (результат неизвестен) — `frontpadError`, **без автоповтора**, только ручная переотправка из админки. Иначе кухня получит дубль.
- **Очередь `frontpad_jobs` + cron-воркер.** Быстрый путь: `onRecordAfterCreateSuccess("orders")` пытается отправить сразу (один HTTP, таймаут 8 с). Ошибка кассы (`cash_close`, `requests_limit`, 5xx) → джоб `resend_order` с бэкоффом. Воркер — `cronAdd` раз в минуту, **не более 2 отправок и 1 синхронизации за тик** (лимит кассы: 30/мин, 2/сек).
- **`hook_url` — пер-заказный.** В настройках API кассы глобальный webhook занят FoodSoul (URL и токен переданы в чате, его **не менять**). Наши заказы передают свой `hook_url` = `https://shashlik.loomixx.ru/api/webhooks/frontpad/status?token=<FRONTPAD_HOOK_TOKEN>` + `hook_status[]`.
- **Деньги считает сервер.** `onRecordCreateRequest("orders")` пересчитывает строки, упаковку, доставку, скидку по купону из БД; клиентские суммы затираются. Там же — валидация стоп-листа и наличия артикулов, генерация `number`.
- **Dry-run.** При `frontpad_settings.sendEnabled = false` хук не звонит в кассу, а пишет готовый payload в `frontpad_jobs.result`. Первую приёмку делать так.
- **Статус в кассе не меняем** (API не умеет). Наш `status` — зеркало: `hook` от вебхука, `manual` из админки.

---

## Зона БД / инфры — делает владелец, агент не трогает

### 1. env процесса `pocketbase` (systemd unit, `Environment=`)

| Переменная | Значение |
|---|---|
| `FRONTPAD_SECRET` | секрет кассы (передан в чате, в git не попадает) |
| `FRONTPAD_HOOK_TOKEN` | любая случайная строка ≥32 символа — ею подписан наш `hook_url` |
| `FRONTPAD_API_URL` | `https://app.frontpad.ru/api/index.php` (по умолчанию можно не задавать) |

После правки unit: `systemctl daemon-reload && systemctl restart pocketbase`.

### 2. Правки коллекций в `/_/` (и синхронно в `Tasks/schema.json`)

`frontpad_settings` — добавить поля (все `required: false`):

| Поле | Тип | Смысл |
|---|---|---|
| `hookUrl` | text | наш публичный URL вебхука (без токена, токен добавит хук из env) |
| `sendPrices` | bool | передавать `product_price` (включать только если в кассе разрешено изменение цены) |
| `articlePack` | text | артикул кассы для упаковки; пусто — не передавать |
| `articleDelivery` | text | артикул кассы для доставки; пусто — не передавать |
| `retryLimit` | number | попыток на джоб, дефолт 5 |
| `lastError` | text | последняя ошибка кассы (для панели) |
| `lastOrderSentAt` | date | время последней успешной отправки |

`frontpad_jobs` — в select `kind` добавить значение **`send_order`** (к существующим `sync_products`, `sync_stops`, `resend_order`, `check_client`). Убедиться, что `updateRule` = null (пишет только хук — хуки правила обходят).

`orders` — проверить, что есть и не `required`: `goods`, `packFee`, `deliveryFee`, `discount`, `couponCode`, `addressParts`, `comment`, `personCount`, `payCode`, `preorderAt`, `statusSource`, `frontpadStatus`, `sentAt`. Число с нулём и bool `false` — только `required: false` (PB: number required = nonzero, bool required = только `true`).

Записи-синглтоны: в `settings` и `frontpad_settings` должна существовать запись с `id = "main"` (`SETTINGS_ID`).

### 3. Rate limits PocketBase (`/_/` → Settings → Rate limits)

- `POST /api/collections/orders/records` — 5 запросов / 300 с на IP.
- `POST /api/promo/check` — 20 / 300 с.
- `POST /api/webhooks/frontpad/status` — не ограничивать (это касса).

### 4. Настройки Frontpad (оператор)

- API включён, секрет совпадает с `FRONTPAD_SECRET`.
- Глобальный webhook URL (FoodSoul) **оставить как есть**; после любой правки настроек API — перезапуск программы Frontpad, иначе вебхуки не активируются.
- У всех продаваемых онлайн товаров, соусов и добавок — уникальный **цифровой** артикул. Если упаковка/доставка проводятся отдельной позицией — их артикулы вписать в `articlePack` / `articleDelivery`.
- Коды из справочников для полей `payCodePickup` / `payCodeDelivery` / `channel` / `affiliate` / `point` заполнить в админке (`/admin/settings`, вкладка кассы).

### 5. Деплой `pb_hooks`

Каталог `/opt/pocketbase/pb_hooks/` на сервере. Файлы из репозитория (`pb_hooks/` в корне) копировать туда при деплое; PB подхватывает изменения сам (`--dev` не нужен). `pb_data`, `.env` и секреты в git не класть.

---

## Зона кода — агент

Каждый шаг атомарен: правит перечисленные файлы и не требует чтения остального проекта.

### Шаг 1. Каркас `pb_hooks` + общие модули

Создать в корне репозитория:

```
pb_hooks/
  frontpad.pb.js        # только регистрации хуков/роутов/крона
  promo.pb.js           # POST /api/promo/check
  lib/config.js         # env + чтение settings / frontpad_settings
  lib/http.js           # form-encode + запрос к Frontpad + разбор ответа
  lib/order.js          # пересчёт заказа и сборка payload new_order
  lib/send.js           # отправка одного заказа (claim → post → патч)
  lib/sync.js           # get_products / get_stops → frontpad_stock
  lib/jobs.js           # claim / complete / fail + бэкофф
```

Читать перед написанием: `.cursor/rules/API.mdc` (параметры и лимиты), `Tasks/schema.json` (имена полей).

**Ограничения JSVM (нарушение = рантайм-баг на проде):**

- Тело хука исполняется в изолированном пуле VM: **замыкания на внешние переменные файла не работают**. Все зависимости — `require(`${__hooks}/lib/http.js`)` **внутри** функции-обработчика.
- Автозагружаются только `*.pb.js`. Модули в `lib/` называть без `.pb.js`, иначе PB выполнит их как хуки.
- Нет `async` / `await` / `fetch` / `setTimeout`. HTTP — синхронный `$http.send({ url, method, body, headers, timeout })`, `body` — строка. env — `$os.getenv(...)`. Логи — `$app.logger()`.
- Ошибку API возвращать через `new BadRequestError(msg)` / `new ApiError(...)`, не `throw new Error`.

`lib/http.js`:

- `formEncode(params)` — `application/x-www-form-urlencoded`, `UTF-8`, массивы **с явными индексами**: `product[0]`, `product_kol[0]`, `product_mod[2]=0`, `tags[0]`, `hook_status[0]`. Пустые/`undefined` значения не сериализовать.
- `call(method, params)` — POST на `FRONTPAD_API_URL?<method>`, подмешивает `secret` из env, парсит JSON, возвращает `{ ok, data, error, warnings }`. `result: "error"` → `ok: false` с кодом (`invalid_secret`, `requests_limit`, `api_off`, `invalid_plant`, `cash_close`, `invalid_product_keys`). **Warnings при `result: "success"` не считать ошибкой** — заказ прошёл, их только логировать в `frontpadError` как предупреждение.
- Секрет никогда не попадает в логи и в `frontpad_jobs.result` — маскировать.

### Шаг 2. Пересчёт и валидация заказа (before-create)

`pb_hooks/lib/order.js` + регистрация `onRecordCreateRequest("orders")` в `frontpad.pb.js`.

Читать: `entities/order/model.ts` (форма `lines`, `OrderLineSnapshot`), `entities/product/lib.ts` (`priceOf`, `articleFor` — те же правила повторить на сервере), `features/cart/model/selectors.ts` (формулы упаковки/доставки/скидки), `entities/coupon/model.ts`.

Порядок внутри хука (до `e.next()`):

1. `settings.acceptingOrders = false` → 400 со `stopMessage`.
2. `lines` пустой / не массив → 400.
3. Для каждой строки: найти `products` по `productId`, размер по `sizeId`, вариант по `variantId`; `unitPrice = size.price + variant.priceDelta`; добавки — из `addons` по id; `article` — `articleByVariant[variantId] || size.article`. Строку **переписать** серверными значениями (цены, названия, артикулы). Товар не найден или не `active` → 400.
4. Артикул пустой → 400 «позиция недоступна». Артикул есть в `frontpad_stock` с `stopped = true` → 400 с названием позиции.
5. `goods = Σ line.total`; `packFee` = `settings.packFee` при непустом заказе; `deliveryFee` = `settings.deliveryFee`, если `mode = delivery` и `goods < settings.freeDeliveryFrom`; скидка — по `couponCode` из `coupons` (active, окно дат, `minTotal`, `usesLimit`); `total = max(goods + packFee + deliveryFee - discount, 0)`.
6. `goods < settings.minOrder` → 400.
7. Антиспам: ≥3 заказа с тем же `phone` за последние 10 минут → 400 (в дополнение к rate limit PB).
8. Обрезать под лимиты кассы: `name` 50, `phone` 50, `descr` 100, `street` 50, `home` 50, `pod` 2, `et` 2, `apart` 50.
9. Проставить `number` (`ddMM-NNN`, счётчик заказов за сутки + 1), `status = "new"`, `statusSource = "client"`, обнулить `frontpadOrderId`/`frontpadOrderNumber`/`frontpadError`/`frontpadStatus`/`sentAt`.
10. `e.next()`.

Купон: инкремент `uses` — не здесь, а в `onRecordAfterCreateSuccess`, чтобы отменённая транзакция не съедала лимит.

### Шаг 3. Отправка заказа в кассу

`pb_hooks/lib/send.js` + `onRecordAfterCreateSuccess("orders")`.

`buildNewOrderPayload(order, fpSettings)`:

- Товарные строки в `product[]` / `product_kol[]`; добавки — **отдельные артикулы** сразу после родителя, `product_mod[<индекс добавки>] = <индекс родителя>`.
- `articlePack` / `articleDelivery` — по одной позиции с `product_kol = 1`, если артикул задан и сумма > 0.
- `sale_amount = discount` (никогда вместе с `sale`), `product_price` — только при `sendPrices`.
- `phone`, `name`, `mail`; `descr` = `comment` + пометка способа получения + промокод; адрес — из `addressParts` при `mode = delivery`, при `pickup` адрес не передавать.
- `pay` = `payCodeDelivery` / `payCodePickup` по режиму; `channel`, `affiliate`, `point`, `person` = `personCount`, `datetime` = `preorderAt` (проверить формат `YYYY-MM-DD HH:MM:SS` и окно +30 дней), `tags[]` = `orderTags` (≤10), `hook_status[]` = `hookStatuses` (≤5), `hook_url` = `hookUrl` + `?token=FRONTPAD_HOOK_TOKEN`.

`sendOrder(orderId)`:

1. В `$app.runInTransaction`: перечитать заказ; `frontpadOrderId` уже есть **или** `sentAt` непустой → выход (защита от дубля); иначе поставить `sentAt = now`, сохранить.
2. `sendEnabled = false` → записать payload (без секрета) в `frontpad_jobs.result`, `frontpadError = "dry-run"`, выход.
3. `call("new_order", payload)`.
4. Успех → `frontpadOrderId`, `frontpadOrderNumber`, `frontpadError = ""` (или текст warnings), `frontpad_settings.lastOrderSentAt`.
5. Ошибка с известным кодом → `frontpadError` + джоб `resend_order` (кроме `invalid_product_keys` и `invalid_secret` — повтор бессмысленен, только ошибка), `sentAt` сбросить в пусто, чтобы ручная переотправка была возможна.
6. Таймаут / неизвестный ответ → `frontpadError = "Ответ кассы не получен, проверьте заказ вручную"`, `sentAt` **оставить**, джоб не ставить.

Ошибка отправки не должна ломать создание заказа: весь блок в `try/catch`, клиент всегда получает свой заказ.

### Шаг 4. Воркер очереди

`pb_hooks/lib/jobs.js` + `cronAdd("frontpad-worker", "* * * * *", ...)`.

- Клейм джоба в транзакции: `queued` → `running`, `attempts++`. Ре-чтение внутри транзакции — защита от двойной обработки при наложении тиков.
- За тик: ≤2 джоба `send_order`/`resend_order` и ≤1 джоб синхронизации. Остальное ждёт следующей минуты (лимит 2/сек, 30/мин).
- Бэкофф по `attempts`: 1, 2, 5, 15, 60 минут от `updated`. `attempts > retryLimit` → `status = "error"`, ошибка в `frontpad_jobs.error` и в `orders.frontpadError`.
- Завершённые джобы старше 7 дней удалять (там же, в кроне).

### Шаг 5. Синхронизация каталога и стоп-листа

`pb_hooks/lib/sync.js` + `cronAdd`: `get_stops` каждые 15 минут, `get_products` — раз в час.

- `get_products`: жёсткий гейт **1/час** — если `lastProductsSyncAt` моложе 60 минут, джоб завершается со `status = "done"` и пометкой «пропущено по лимиту» (не `error`, чтобы админка не мигала).
- Upsert в `frontpad_stock` по `article` (`name`, `price`, `sale`); артикулы, которых не вернула касса, удалять.
- `get_stops`: `stopped = true` для вернувшихся, `false` для остальных. Ответ `no_stops` при `result: success` — это пустой стоп-лист, не ошибка.
- По завершении писать `lastProductsSyncAt` / `lastStopsSyncAt` и `lastError`.
- `syncEnabled = false` → `get_products` не звать (стоп-лист качать всё равно: он влияет на приём заказов).

### Шаг 6. Вебхук статусов

`routerAdd("POST", "/api/webhooks/frontpad/status", handler)` в `frontpad.pb.js`.

- Сравнить `token` из query с `FRONTPAD_HOOK_TOKEN` (constant-time сравнение по длине + посимвольно); несовпадение → 404 без подробностей.
- Тело: `{ action: "change_status", order_id, status, datetime }`. Найти заказ по `frontpadOrderId`; нет — ответить 200 (не наш заказ, иначе касса начнёт ретраить).
- `status` → наш через `frontpad_settings.statusMap` (дефолт `DEFAULT_STATUS_MAP` из `entities/settings/model.ts`); неизвестный код — записать `frontpadStatus`, `status` не менять.
- Не понижать статус: `done` / `canceled` — терминальные, не перезаписывать.
- Проставить `statusSource = "hook"`. Ответ **всегда 200** и быстро; вся работа в `try/catch` с логом.
- Клиенту статус прилетит сам — `subscribeOrderStatus` уже подписан (PB realtime). Правило `viewRule` у `orders` публичное по id — не менять.

### Шаг 7. `POST /api/promo/check`

`pb_hooks/promo.pb.js`. Читать: `entities/coupon/api.ts` (контракт `PromoCheckResult`), `entities/coupon/model.ts` (`calcCouponDiscount`).

Вход `{ code, goods }` → ответ `{ ok, kind, value, discount }` либо `{ ok: false, message }`. Купоны наружу не отдавать, коллекция остаётся закрытой. Ошибки — человеческим текстом («Промокод истёк», «Минимальная сумма …»).

### Шаг 8. Клиент: адрес по частям и комментарий

- Править `apps/shashlik-web/src/features/cart/model/store.ts`: добавить `addressParts: { street, home, pod, et, apart }` и `comment` + сеттеры. Ключ persist **не менять** — zustand доливает новые поля из initial state, бампать `v2` → `v3` незачем (иначе у всех очистится корзина).
- Править `apps/shashlik-web/src/features/cart/ui/CartPanel.tsx`: в режиме `delivery` вместо заглушки карты — поля улица / дом / подъезд / этаж / квартира (`maxLength` 50/50/2/2/50) и «Комментарий» (100). В `pickup` — адрес пиццерии из `settings.address`, как сейчас. Валидация перед отправкой: `street` и `home` обязательны при доставке.
- Ошибку сервера показывать текстом из ответа (`pbErrorMessage`), а не общим «Не удалось оформить заказ» — иначе стоп-лист и минимальная сумма выглядят как сбой.

### Шаг 9. Клиент: контракт создания заказа

Править `apps/shashlik-web/src/entities/order/api.ts`:

- `CreateOrderInput`: убрать `promo`, добавить `couponCode`, `addressParts`, `comment`, `goods`, `packFee`, `deliveryFee`, `discount` (справочно, сервер пересчитает).
- `createOrder`: **не передавать `number`** — его ставит хук.
- В `CartPanel` заменить `promo: appliedCoupon?.code` на `couponCode`.

### Шаг 10. Клиент: стоп-лист на витрине

- Создать `apps/shashlik-web/src/entities/product/lib/stock.ts`: `useStoppedArticles()` (query по `frontpad_stock`, `filter: "stopped = true"`, `staleTime` 60 с) + `isSkuStopped(product, sizeId, variantId, stopped)` + `isProductStopped(product, stopped)` (все SKU в стопе).
- Править `entities/product/ui/ProductCard.tsx`, `ProductCardCompact.tsx`: полностью стопнутый товар — «Нет в наличии», кнопка «Добавить» disabled.
- Править `pages/product/ProductPage.tsx`: стопнутые вариант/размер — недоступный `OptionCard`; стопнутая добавка — скрыта; CTA disabled, если выбранный SKU в стопе.
- Править `features/cart/ui/CartLineRow.tsx`: пометка «нет в наличии» на строке, чтобы отказ сервера не был неожиданным.
- Реалтайм: `useCollectionRealtime("frontpad_stock", [frontpadStockKeys.all])` — витрину не поллить.

### Шаг 11. Админка: новые настройки кассы

- Править `apps/shashlik-web/src/entities/settings/model.ts` и `api.ts`: в `FrontpadSettings` + `mapFrontpadSettings` + fallback добавить `hookUrl`, `sendPrices`, `articlePack`, `articleDelivery`, `retryLimit`, `lastError`, `lastOrderSentAt`.
- Править `pages/admin/sections/settings/FrontpadPanel.tsx`: поля для них, показ `lastError` и статуса «dry-run включён», когда `sendEnabled = false`.
- Править `pages/admin/sections/orders/OrderDrawer.tsx`: показать `frontpadOrderNumber`, `sentAt`, `frontpadStatus`; кнопку переотправки блокировать, если `frontpadOrderId` уже есть (защита от дубля на кухне).

### Шаг 12. Финальная сверка

- `cd apps/shashlik-web && pnpm typecheck && pnpm build` — основной чанк не должен вырасти скачком (вся логика кассы на сервере).
- Обновить `Tasks/TASK_DB.md` (раздел `pb_hooks`) и `Tasks/schema.json` под новые поля `frontpad_settings`.
- `graphify update .`

---

## Карта файлов

**Читать (не менять):** `.cursor/rules/API.mdc`, `Tasks/schema.json`, `entities/order/model.ts`, `entities/product/lib.ts`, `entities/product/lib/articles.ts`, `entities/coupon/model.ts`, `features/cart/model/selectors.ts`, `entities/settings/model.ts`, `shared/api/crud.ts` (формат ошибок PB).

**Создать:** `pb_hooks/frontpad.pb.js`, `pb_hooks/promo.pb.js`, `pb_hooks/lib/{config,http,order,send,sync,jobs}.js`, `apps/shashlik-web/src/entities/product/lib/stock.ts`.

**Править:** `entities/order/api.ts`, `entities/settings/{model,api}.ts`, `features/cart/model/store.ts`, `features/cart/ui/{CartPanel,CartLineRow}.tsx`, `entities/product/ui/{ProductCard,ProductCardCompact}.tsx`, `pages/product/ProductPage.tsx`, `pages/admin/sections/settings/FrontpadPanel.tsx`, `pages/admin/sections/orders/OrderDrawer.tsx`, `Tasks/{TASK_DB.md,schema.json}`, `.cursor/rules/stack_new.mdc`.

## Приёмка

1. `sendEnabled = false`: оформить заказ → в `frontpad_jobs.result` лежит payload с корректными `product[]` / `product_kol[]` / `product_mod[]`, суммы в заказе пересчитаны сервером, `number` заполнен.
2. Заказ с ценой, заниженной через DevTools, сохраняется с честной суммой из БД.
3. Товар в стоп-листе: кнопка «Добавить» неактивна; прямой `create` через SDK отвечает 400.
4. `sendEnabled = true`: реальный заказ на 1 позицию + 1 добавку → `frontpadOrderId` и `order_number` в записи, позиция в кассе с правильной привязкой модификатора.
5. Смена статуса в кассе → запись `orders` обновилась, `statusSource = "hook"`, тост у клиента изменился без перезагрузки.
6. Вебхук с чужим/пустым токеном → 404, статус не изменился.
7. Повторная отправка того же заказа (кнопка в дроре при заполненном `frontpadOrderId`) невозможна; дубля в кассе нет.
8. `get_products` дважды подряд: второй раз джоб завершается пометкой о лимите 1/час, запроса в кассу нет.
9. Заказ при выключенной кассе (`api_off`) → `frontpadError`, джоб с бэкоффом, счётчик ошибок на дашборде админки.

## Чего не делать

- Не звать Frontpad из `apps/shashlik-web/src/*` и не держать секрет вне env.
- Не автоповторять `new_order` при неизвестном результате — только вручную.
- Не менять глобальный webhook URL кассы (FoodSoul) — свой передавать через `hook_url` в заказе.
- Не поллить `get_products` / `get_stops` / статусы заказа — только cron на сервере и `subscribe` на клиенте.
- Не пытаться менять статус в кассе по API.
- Не открывать `coupons` публичным чтением, промокод проверять только через `/api/promo/check`.
- Не бампать ключ persist корзины без необходимости.
