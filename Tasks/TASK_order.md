# TASK_order — профиль клиента, оформление заказа, витрина-модалка

Продолжение `TASK_inter.md` (касса уже подключена). Здесь — то, что клиент видит после интеграции: свой заказ, свой профиль, новое оформление.

Канон архитектуры — `.cursor/rules/stack_new.mdc`. Спека кассы — `.cursor/rules/API.mdc`. Схема коллекций — `Tasks/schema.json` + `Tasks/TASK_DB.md`.

---

## Ответы на вопросы (от них зависят шаги)

**1. Правка заказа в кассе → сайт.** Frontpad отдаёт наружу **только** событие `change_status` (вебхук). Метода «получить заказ по id» в API нет — состав, суммы и правки позиций из кассы прийти не могут.
Значит: **статус — да** (уже работает, `pb_hooks/lib/webhook.js` → `orders.status`, realtime в браузер), **состав — нет**. Пользователю показываем наш снапшот `orders.lines` (он зафиксирован сервером при создании) + живой статус, с явной подписью «состав уточняет оператор». Правка состава — вручную в админке (шаг 4), тогда `statusSource="manual"`.

**2. Синхронизация цен.** Двусторонней быть не может: у Frontpad нет метода записи цены товара.
- **Касса → сайт**: `get_products` уже тянет `price` по артикулу в `frontpad_stock` (лимит 1/час). Не хватает только применения этих цен к `products.sizes[].price` — шаг 9.
- **Сайт → касса**: единственный канал — `product_price[]` в `new_order`, то есть цена навязывается **в конкретном заказе**, а не в справочнике кассы. Это и есть тумблер «Передавать цены в кассу» (`sendPrices`), и он работает, только если оператор включил в кассе разрешение изменения цены.
Вывод: источник правды по ценам выбирается тумблером `priceSource` (шаг 9), «поменять на сайте → обновилось в кассе» физически невозможно; менять справочник цен придётся в кассе.

**3. Что делают кнопки и поля вкладки «Касса».**
| Элемент | Что происходит |
|---|---|
| «Обновить товары кассы» | создаёт джоб `sync_products` → `get_products` → upsert `frontpad_stock` (артикул, имя, цена, флаг `sale`), отсутствующие артикулы удаляются. Жёсткий гейт **1 раз в час** (`lastProductsSyncAt`), иначе касса банит IP |
| «Обновить стоп-лист» | джоб `sync_stops` → `get_stops` → флаг `stopped` у артикулов; витрина гасит позиции по realtime-подписке. Автоматически раз в 15 мин |
| «Отметки заказа» (`orderTags`) | параметр `tags[]` метода `new_order` — **числовые коды** отметок из справочника кассы (Frontpad → Настройки → Отметки заказа), не более 10. Вводить именно коды; нечисловые сейчас молча отбрасываются в `lib/order.js` |
| «Webhook статусы» (`hookStatuses`) | `hook_status[]` — коды статусов кассы, при которых она дёрнет наш `hook_url` (≤ 5). Пусто = вебхук не придёт вообще. Перевод кода в наш статус — `statusMap` (`1→cooking`, `3→delivering`, `5→done`, `9→canceled`) |
| «Передавать цены в кассу» (`sendPrices`) | добавляет `product_price[]` в `new_order`. Включать только если в кассе разрешено изменение цены, иначе касса игнорирует цены или вернёт ошибку |

Задача по этому пункту — не менять логику, а объяснить её в UI: подсказки, валидация «только цифры», редактор `statusMap`, ссылки на справочники (шаг 10).

**4. Карточка поверх замыленной витрины** — да, PDP становится route-модалкой над сохранённой витриной (шаг 8).

**5. 404 на «Заведение»/«Экономика».** `updateSettings` бьёт в `PATCH /api/collections/settings/records/main`, а записи `settings/main` в базе **нет**: `createRule: null`, из клиента её не создать, а `fetchSettings` глотает ошибку и подставляет `settingsFallback()` — поэтому форма выглядит заполненной и живой. Второй возможный вклад: вход под `manager` (updateRule = только `admin`) — PB на непрошедшем правиле тоже отвечает 404, а не 403. Чиним обоими концами (шаг 1).

**6. Бонусы начисляются сразу после создания заказа.** Так работает Frontpad: заказ, принятый через `new_order`, для кассы уже существует, и бонус по телефону клиента начисляется по её внутренней настройке. Управлять этим через API нельзя — в payload мы `score`/`card` не шлём.
Два рычага:
- **зона владельца**: в кассе переключить начисление бонусов на закрытие чека (самый дешёвый путь);
- **зона кода**: режим отложенной отправки `sendMode: 'immediate' | 'on_confirm'` — заказ создаётся у нас в статусе `pending`, в кассу уходит после подтверждения (кнопка в админке или будущий вебхук оплаты). Шаг 5.

**7–9** — шаги 3, 6, 7, 8.

---

## Зона БД / инфры — делает владелец, агент не трогает

Всё ниже правится в `/_/` **и синхронно в `Tasks/schema.json`**. Помнить семантику `required` в PB: number = nonzero, bool = только `true`, json = не `[]`/`{}` — для необязательных снимать Required/Nonzero.

### 1. Singleton-записи

Создать записи с id **`main`** в `settings` и `frontpad_settings`, если их нет. После шага 1 их создаст хук `onBootstrap`, но проверить руками обязательно — это и есть причина 404.

### 2. Новая auth-коллекция `app_users` (клиенты витрины)

Персонал остаётся в `users`, клиентов туда **не мешать**: гейт `/admin/*` смотрит `role`, а OAuth2 создаёт запись в той коллекции, в которой авторизуется.

| Поле | Тип | Заметки |
|---|---|---|
| `phone` | text | уникальный индекс, нормализованный `+7XXXXXXXXXX` |
| `firstName` / `lastName` | text | 50 |
| `birthday` | date | меняется **один раз**, дальше блокирует хук |
| `addresses` | json | `[{ id, label, street, home, pod, et, apart, isDefault }]`, required: false |
| `customerId` | relation → `customers` | привязка к карточке клиента кассы, ставит только хук |
| `blocked` | bool | required: false |

Правила: `list/view`: `id = @request.auth.id`; `create`: `""` (нужен OAuth2 и телефонная регистрация); `update`: `id = @request.auth.id`; `delete`: `null`.
OAuth2: включить провайдеры **`vk`** и **`yandex`** (встроенные в PocketBase), redirect URL — `https://shashlik.loomixx.ru/auth/callback`.

### 3. Правки `orders`

| Поле | Тип | Зачем |
|---|---|---|
| `userId` | relation → `app_users`, required: false | заказы профиля |
| `paymentStatus` | select `unpaid \| paid \| refunded`, required: false | под отложенную отправку |

Правила:
- `list`: `@request.auth.collectionName = "app_users" && userId = @request.auth.id || @request.auth.role = "admin" || @request.auth.role = "manager"`
- `view`: оставить **пустым** (публичный просмотр по id) — на этом держится трекинг гостя; id PB — 15 случайных символов, перебором не берётся. В enum `status` добавить **`pending`** (для `sendMode = on_confirm`).

### 4. Правки `frontpad_settings`

Добавить: `sendMode` (select `immediate | on_confirm`, дефолт `immediate`), `priceSource` (select `site | frontpad`, дефолт `site`), `clientLookupEnabled` (bool, required: false).

### 5. Правки `frontpad_jobs`

В enum `kind` должны быть: `sync_products`, `sync_stops`, `resend_order`, `check_client`, **`send_order`**, **`apply_prices`**. Без `send_order` не пишется dry-run-джоб.

### 6. Rate limits

Добавить лимит на хук-роуты профиля: `/api/profile/*` — 10 запросов/мин на IP. `get_client` в кассе — не чаще 1 запроса на клиента в минуту (гарантирует шаг 3).

---

## Зона кода — агент

Шаги атомарные и упорядочены по зависимостям. Каждый заканчивается проверяемым критерием. `pnpm typecheck` — после каждого шага, `pnpm build` — после шагов 6, 7, 8.

---

### Шаг 1. Починить сохранение настроек (404)

**Читать:** `apps/shashlik-web/src/entities/settings/api.ts`, `pages/admin/sections/settings/SettingsSection.tsx`, `shared/api/crud.ts`, `pb_hooks/frontpad.pb.js`.
**Править:**
1. `pb_hooks/frontpad.pb.js` — добавить `onBootstrap`: после `e.next()` создать `settings/main` и `frontpad_settings/main`, если их нет (`findRecordById` в try/catch → `new Record(collection)` c явным `record.id = "main"`). Не забыть `e.next()` в начале, иначе оборвётся системная инициализация.
2. `entities/settings/api.ts` — `updateSettings` / `updateFrontpadSettings`: ловить `ClientResponseError.status === 404` и бросать понятный текст («Нет записи настроек или недостаточно прав»). `fetchSettings` — оставить fallback, но пробрасывать флаг `missing`, чтобы UI показал предупреждение.
3. `SettingsSection.tsx` — кнопку «Сохранить» скрывать/дизейблить, если `can("settings", "update")` даёт `false` (импорт из `shared/api/auth.tsx`).

**Готово:** под `admin` сохранение «Заведение»/«Экономика» проходит, под `manager` кнопки нет, а не 404.

---

### Шаг 2. Домен профиля и клиентский PB-клиент

**Читать:** `shared/api/pb.ts`, `shared/api/auth.tsx`, `entities/customer/model.ts`, `entities/order/model.ts`.
**Создать:**
- `shared/api/pb-client.ts` — **второй** экземпляр `PocketBase` с отдельным `LocalAuthStore` (ключ `shashlik:client:auth`). Один `pb` на два вида сессий не годится: вход клиента затрёт сессию админа и наоборот.
- `entities/account/model.ts` — `AppUser`, `SavedAddress`, `ProfileBonus` (`score`, `sale`, `card`).
- `entities/account/api.ts` — `useAccount()`, `loginWithOAuth(provider: "vk" | "yandex")` (`pbClient.collection("app_users").authWithOAuth2({ provider })`), `logout()`, `updateAccount()`, CRUD адресов (`addresses` — json-массив, мутация целиком).
- `app/providers/account.tsx` — `AccountProvider` + `useAccount()`, по образцу `AdminAuthProvider`: один `authRefresh` с `requestKey`, отмена запроса **не** чистит authStore.

**Править:** `app/App.tsx` — обернуть дерево в `AccountProvider`.
**Готово:** `useAccount()` отдаёт `null` для гостя и запись `app_users` после OAuth; сессия админки не ломается.

---

### Шаг 3. Серверные роуты профиля (бонусы, привязка клиента)

**Читать:** `pb_hooks/lib/http.js`, `pb_hooks/lib/config.js`, `pb_hooks/promo.pb.js` (образец роута), `.cursor/rules/API.mdc` (раздел `get_client`).
**Создать:** `pb_hooks/profile.pb.js` + `pb_hooks/lib/profile.js`.

- `GET /api/profile/bonus` — авторизация по токену `app_users` (`e.auth`, проверить `e.auth.collection().name === "app_users"`). Берёт телефон из записи, зовёт `get_client`, кладёт `score`/`sale`/`card` в связанный `customers` и отдаёт клиенту. **Кэш обязателен**: если `customers.updated` моложе 60 с — отдавать сохранённое без запроса в кассу (лимит 30/мин, автоперебор = бан IP).
- `POST /api/profile/link` — привязка телефона: нормализует номер, ищет/создаёт `customers`, пишет `app_users.customerId`, задним числом проставляет `orders.userId` у прошлых заказов с этим телефоном.

Правила JSVM (иначе будет 504 и молчаливые баги): зависимости — `require` **внутри** тела обработчика; каждый хук зовёт `e.next()`; в `runInTransaction` работать только через `txApp`; json-поля читать `toArrayLike`/`getField`, а не `JSON.stringify`; datetime — `config.readPbDateTime` / `config.toPbDateTime` (UTC), пусто = `""`.

**Готово:** `GET /api/profile/bonus` под клиентским токеном отдаёт баллы, повторный вызов в течение минуты в кассу не ходит.

---

### Шаг 4. Заказ пользователя: привязка, список, трекинг

**Читать:** `pb_hooks/lib/order.js` (`validateAndRecalculateOrder`), `entities/order/api.ts`, `pages/admin/sections/orders/OrderDrawer.tsx`.
**Править:**
1. `pb_hooks/lib/order.js` — в `validateAndRecalculateOrder` **затирать** клиентский `userId` и ставить свой: `record.set("userId", e.auth && e.auth.collection().name === "app_users" ? e.auth.id : "")`. Клиентским полям в заказе не верим — это то же правило, что и для сумм. Там же — если у авторизованного пустой телефон, брать его из `app_users`.
2. `entities/order/api.ts` — добавить `fetchMyOrders()` (фильтр по `userId` через `pb.filter`), `useMyOrders()`, `fetchPublicOrder(id)`; экспортировать `subscribeOrderStatus` для страницы трекинга (он уже есть, поллинг не заводить).
3. `features/order-tracking/model/localOrders.ts` (новый) — список id последних заказов гостя в `localStorage` (`shashlik:orders:v1`, максимум 10, чистка старше 7 дней).

**Готово:** заказ авторизованного получает `userId` на сервере; гость видит свой заказ по id из localStorage.

---

### Шаг 5. Отложенная отправка в кассу (бонусы до оплаты)

**Читать:** `pb_hooks/lib/send.js`, `pb_hooks/lib/jobs.js`, `pb_hooks/frontpad.pb.js`, `entities/settings/model.ts`.
**Править:**
1. `pb_hooks/frontpad.pb.js` — в `onRecordAfterCreateSuccess("orders")` звать `send.sendOrder` только при `sendMode === "immediate"`; при `on_confirm` ставить `status = "pending"` и ничего не отправлять.
2. `pb_hooks/lib/send.js` — экспортировать `confirmAndSend(orderId)`: снимает `pending`, ставит `new`, зовёт `sendOrder(orderId, { force: false })`. Идемпотентность не трогать: `claimOrderSend` и защита по заполненному `frontpadOrderId` остаются как есть.
3. `entities/settings/model.ts` + `api.ts` — поля `sendMode`, `priceSource`, `clientLookupEnabled`.
4. `pages/admin/sections/orders/OrderDrawer.tsx` — кнопка «Подтвердить и отправить» для `status === "pending"` (создаёт джоб `send_order`, не зовёт кассу напрямую).

**Готово:** при `on_confirm` заказ висит `pending`, в кассе его нет, бонусы не начисляются; после кнопки — уходит один раз.

---

### Шаг 6. Корзина: чистка полей и удаление добавок

**Читать:** `features/cart/ui/CartPanel.tsx`, `features/cart/ui/CartLineRow.tsx`, `features/cart/model/store.ts`, `features/cart/model/selectors.ts`.
**Править:**
1. `CartPanel.tsx` — убрать из панели: «Комментарий», «Имя», «Телефон», блок адресных полей. Остаётся: заголовок, `Segmented` (режим влияет на сумму доставки — оставить), список строк, промокод, суммы, «Оформить заказ». Функцию `checkout` целиком вынести в шаг 7 — панель только открывает модалку.
2. `CartLineRow.tsx` — у каждой добавки: `Stepper size="sm"` + крестик. Удаление — `bumpAddon(addon.id, -quantity, line.line.id)`; сигнатура уже поддерживает явный `lineId`, новых экшенов не заводить.
3. `store.ts` — добавить `setAddonQuantity(lineId, addonId, quantity)` только если понадобится прямой ввод; иначе не трогать. Persist-ключ уже `shashlik:cart:v2` — при изменении формы `CartItem` поднять до `v3`, иначе у пользователей упадёт гидратация.

**Готово:** в корзине нет полей контактов, добавки удаляются, суммы пересчитываются.

---

### Шаг 7. Модалка оформления заказа

**Читать:** `features/cart/ui/CartPanel.tsx` (старый `checkout` как эталон payload), `entities/order/api.ts` (`CreateOrderInput`), `shared/ui/sheet.tsx` (Radix Dialog уже подключён), `entities/settings/api.ts`.
**Создать:**
- `shared/ui/modal.tsx` — центрированный `Dialog` на Radix: `Overlay` (`bg-black/45`, без `Glass` — второй стеклянной плашки на экране быть не должно), `Content` с `max-w-[960px]`, скругление `--r-2xl`, скролл внутри колонок. Анимация — только `opacity` + `scale`.
- `features/checkout/ui/CheckoutDialog.tsx` — две колонки:
  - **слева** — `CartLineRow` списком, промокод, `SumRow`-итоги (переиспользовать, не копировать вёрстку);
  - **справа** — способ получения, адрес (для авторизованного — выбор из `app_users.addresses` + «новый»), имя, телефон, комментарий, для авторизованного — «Списать баллы» (шаг 3) и чекбокс сохранения адреса.
- `features/checkout/model/useCheckout.ts` — валидация (телефон обязателен, для доставки — улица и дом), сборка `CreateOrderInput` (перенести один в один из старого `checkout`, включая `articleFor`), `createOrder`, `clearCart`, запись id в `localOrders`, редирект на `/order/:id`.

**Править:** `CartPanel.tsx` — кнопка открывает `CheckoutDialog`.
**Важно:** суммы в payload остаются справочными — деньги пересчитывает `onRecordCreateRequest("orders")`. Не добавлять клиентскую «оптимизацию», которая полагается на них.
**Готово:** заказ оформляется из модалки, гость — по телефону, авторизованный — с подстановкой профиля.

---

### Шаг 8. PDP как модалка поверх замыленной витрины

**Читать:** `app/router.tsx`, `pages/product/ProductPage.tsx`, `features/cart/lib/useAddProduct.ts`, `entities/product/ui/ProductCard.tsx`, `styles/globals.css`, `shared/hooks/useSettling.ts`.
**Править:**
1. `app/router.tsx` — паттерн `backgroundLocation`: `const background = location.state?.background`; `<Routes location={background ?? location}>` рендерит витрину, а поверх — отдельный `<Routes>` с `/product/:slug` в модалке. Прямой заход по URL (background нет) остаётся полноэкранной страницей — SEO и «поделиться ссылкой» не ломаются. Ключ `AnimatePresence` не менять на `location.pathname`.
2. `useAddProduct.ts` и `ProductCard.tsx` — `navigate(url, { state: { background: location } })`.
3. `pages/product/ProductPage.tsx` — вынести содержимое в `ProductView` (без `min-h-dvh` и без `Navigate`), страница и модалка используют его. Крестик в модалке — `navigate(-1)`.
4. `styles/globals.css` — размытие фона:
   - `filter: blur(10px)` **на самой витрине** под `[data-modal-open="1"]`, не `backdrop-filter` на оверлее: оверлей во весь экран заставляет композитор пересобирать подложку на каждом кадре, а статичный фон под `filter` растеризуется один раз;
   - `body { overflow: hidden }` на время модалки, витрина — `inert`;
   - **обязательно** погасить преломление `StickyBar` (`data-animating` уже это умеет — переиспользовать механизм из `useSettling.ts`): SVG-фильтр стекла внутри размытого поддерева даёт двойную растеризацию на CPU;
   - модалка рендерится через `Dialog.Portal` в `body`, вне размытого узла.

**Готово:** клик по карточке открывает PDP поверх размытой витрины, скролл витрины сохраняется, на throttle 6× открытие не проседает ниже ~30 fps.

---

### Шаг 9. Цены из кассы

**Читать:** `pb_hooks/lib/sync.js`, `entities/product/lib.ts` (`articleFor`, `skuMatrix`), `entities/product/model.ts`, `pages/admin/sections/products/ArticleMatrix.tsx`.
**Создать:** `pb_hooks/lib/prices.js` + job `apply_prices` в `lib/jobs.js`.

Алгоритм (детерминированный, иначе цены разъедутся):
1. Для товара берём матрицу SKU `вариант × размер` и цены из `frontpad_stock` по артикулу.
2. Базой считается **первый вариант**: `size.price = price(article[вариант0, size])`, `variant.priceDelta = price(article[вариантN, size]) − size.price`.
3. Если `priceDelta` по размерам одного варианта расходится или артикул заполнен не у всех ячеек — **товар не трогаем**, пишем строку в отчёт расхождений (`result` джоба).
4. Применение только при `priceSource === "frontpad"`; при `site` джоб считает отчёт, но ничего не пишет.

**Править:** админка «Товары» — вкладка/панель «Цены кассы»: таблица «наша цена / цена кассы / расхождение», кнопка «Применить цены кассы» (создаёт джоб `apply_prices`, кассу напрямую не зовёт).
**Готово:** расхождения видны, применение меняет `products.sizes[].price` и `variants[].priceDelta` без ручной правки JSON.

---

### Шаг 10. Настройки кассы: объяснить UI

**Читать:** `pages/admin/sections/settings/FrontpadPanel.tsx`, `entities/settings/model.ts`.
**Править:** `FrontpadPanel.tsx` — подсказки `Field hint` по таблице из раздела «Ответы, п. 3»; валидация `orderTags` и `hookStatuses` (только цифры, лимиты 10 и 5, показывать отброшенные значения, а не молчать); редактор `statusMap` (код кассы → наш статус) вместо скрытого дефолта; рядом с кнопками синхронизации — время последнего запуска и остаток гейта 1/час; тумблеры `sendMode` и `priceSource`.
**Готово:** оператор понимает каждое поле без чтения исходников; нечисловая отметка не уезжает молча.

---

### Шаг 11. Страницы профиля и трекинга

**Читать:** `app/router.tsx`, `widgets/sidebar/Sidebar.tsx`, `widgets/header/FloatingActions.tsx`, `widgets/mobile/MobileTabBar.tsx`, `pages/admin/AdminLogin.tsx` (образец формы входа).
**Создать:**
- `pages/profile/ProfilePage.tsx` (**lazy**, как админка) — вкладки: «Текущий заказ» (активный заказ + realtime-статус), «История» (`useMyOrders`), «Данные» (имя, фамилия, телефон, день рождения — поле блокируется после первого сохранения), «Адреса», «Бонусы» (`/api/profile/bonus`).
- `pages/profile/ui/LoginPanel.tsx` — «Войти через VK» / «Войти через Яндекс» + пояснение: по телефону заказать можно, но баллы и история — только со входом.
- `pages/order/OrderTrackPage.tsx` — `/order/:id`, работает **без авторизации**: статус (realtime), состав из снапшота, сумма, адрес, кнопка «Повторить заказ».

**Править:**
1. `app/router.tsx` — роуты `/profile`, `/order/:id`, `/auth/callback`.
2. `Sidebar.tsx` — «Войти» ведёт на `/profile` (для авторизованного — имя + баллы), **не** на `/admin`.
3. `FloatingActions.tsx` — `showAccount` ведёт на `/profile`.
4. `MobileTabBar.tsx` — вкладка «Профиль» → `/profile`.
5. Ссылок на `/admin` в публичном UI не остаётся — вход в админку только вводом `/admin` в адресной строке. Гейт в `router.tsx` не трогать.

**Готово:** гость видит текущий заказ, авторизованный — историю, баллы и адреса; кнопок админки на витрине нет.

---

## Карта файлов

| Файл | Действие |
|---|---|
| `pb_hooks/frontpad.pb.js` | править — `onBootstrap` (singletons), `sendMode` в after-create |
| `pb_hooks/lib/order.js` | править — `userId` из `e.auth`, телефон из профиля |
| `pb_hooks/lib/send.js` | править — `confirmAndSend` |
| `pb_hooks/lib/jobs.js` | править — kind `apply_prices` |
| `pb_hooks/lib/sync.js` | читать — источник цен |
| `pb_hooks/lib/prices.js` | создать |
| `pb_hooks/profile.pb.js`, `pb_hooks/lib/profile.js` | создать |
| `shared/api/pb-client.ts` | создать — второй authStore |
| `app/providers/account.tsx` | создать |
| `entities/account/{model,api}.ts` | создать |
| `entities/order/api.ts` | править — `useMyOrders`, `fetchPublicOrder` |
| `entities/settings/{model,api}.ts` | править — `sendMode`, `priceSource`, обработка 404 |
| `features/cart/ui/CartPanel.tsx` | править — чистка полей, вызов модалки |
| `features/cart/ui/CartLineRow.tsx` | править — удаление добавок |
| `features/checkout/**` | создать |
| `features/order-tracking/model/localOrders.ts` | создать |
| `shared/ui/modal.tsx` | создать |
| `pages/product/ProductPage.tsx` | править — вынести `ProductView` |
| `pages/profile/**`, `pages/order/OrderTrackPage.tsx` | создать |
| `pages/admin/sections/settings/{SettingsSection,FrontpadPanel}.tsx` | править |
| `pages/admin/sections/orders/OrderDrawer.tsx` | править — подтверждение отправки |
| `app/router.tsx` | править — `backgroundLocation`, новые роуты |
| `styles/globals.css` | править — размытие витрины под модалкой |
| `Tasks/schema.json` | править — `app_users`, поля `orders` / `frontpad_settings` / `frontpad_jobs` |

---

## Приёмка

1. Сохранение «Заведение» и «Экономика» проходит под `admin`; под `manager` кнопки нет.
2. Гость оформляет заказ по телефону и видит статус на `/order/:id` после перезагрузки страницы.
3. Вход через VK/Яндекс открывает историю, баллы (из кассы, не чаще 1 запроса в минуту) и адреса; день рождения после сохранения не редактируется.
4. Смена статуса в кассе доезжает до открытой страницы заказа без перезагрузки (realtime, не поллинг).
5. При `sendMode = on_confirm` новый заказ в кассе не появляется до кнопки «Подтвердить и отправить».
6. `apply_prices` при `priceSource = frontpad` меняет цены только у товаров с полной матрицей артикулов; остальные попадают в отчёт.
7. Открытие PDP не перезагружает витрину, позиция скролла сохраняется; на CPU throttle 6× кадры не проседают ниже ~30 fps.
8. `pnpm build` — основной чанк не вырос скачком; профиль и админка — отдельные lazy-чанки.

---

## Чего не делать

- Не звать Frontpad из React и не хранить секрет вне env — только `pb_hooks`.
- Не поллить `get_client`, `get_products` и статусы заказа: перебор = бан IP кассы.
- Не смешивать клиентов и персонал в коллекции `users` и не держать обе сессии в одном `pb`.
- Не доверять `userId`, суммам и артикулам из клиентского запроса на создание заказа.
- Не пытаться писать цены в справочник кассы: метода нет, `product_price[]` действует только внутри заказа.
- Не показывать пользователю состав заказа «из кассы» — его неоткуда взять, показываем снапшот.
- Не вешать `backdrop-filter` на полноэкранный оверлей модалки и не оставлять преломление стекла включённым под размытием.
- Не заводить второй `Glass` на экране и постоянный `will-change`.
- Не оставлять ссылок на `/admin` в публичном UI.
