# TASK_ADMIN — рабочая админ-панель `/admin`

Канон стека: `.cursor/rules/stack_new.mdc`. Схема БД и мост к кассе: `Tasks/TASK_DB.md` + `Tasks/schema.json`. Frontpad: `.cursor/rules/API.mdc`.

Цель: превратить `/admin` из прототипа с тремя рабочими сценариями (теги категорий, частичное сохранение товара, вход) в полноценную панель: **категории, добавки, товары, баннеры, заказы, отзывы, клиенты, сотрудники, купоны, настройки, дашборд** — с прицелом на Frontpad.

Работа делится на две зоны: **БД** (разделы 2 — делает владелец руками в `/_/`) и **код** (раздел 3 — по шагам, каждый шаг самодостаточен).

---

## 1. Инварианты (нарушение = баг)

**Frontpad**

1. Ни клиент, ни админка **никогда** не зовут Frontpad. Секрет — только env процесса `pocketbase`. Любое «действие с кассой» из админки = запись в коллекцию `frontpad_jobs`, которую разбирает `pb_hooks`.
2. Статус заказа в кассе через API **не меняется** — методов нет. Наш `orders.status` — зеркало: правка статуса в админке локальна и может быть перезаписана вебхуком. Помечать источник (`statusSource`) и предупреждать в UI.
3. Артикул — **цифровая строка, уникальная по всей рознице** (товары + добавки). SKU кассы = пара «вариант × размер», а не размер: `sizes[].article` — дефолт, `sizes[].articleByVariant[variantId]` — переопределение. Без этого «Курица M» и «Свинина M» уедут в кассу одним артикулом.
4. Скидка: `sale` (%) **или** `sale_amount` (₽), не оба. Купон обязан иметь ровно один вид.
5. Лимиты длин полей заказа: `name`/`phone`/`mail`/`street`/`home`/`apart` ≤ 50, `pod`/`et` ≤ 2, `descr` ≤ 100, `card` ≤ 16 цифр. Валидировать в формах админки и в схеме.
6. Лимиты запросов (30/мин, 2/сек; `get_products` — 1/час) соблюдает **воркер джобов** в хуке, не UI. Кнопка «Синхронизировать» ставит джоб и блокируется до его завершения.
7. Хук-роуты должны жить под `/api/...` — Nginx проксирует только `/api/` и `/_/`. Вебхук кассы: `POST /api/webhooks/frontpad/status`.

**PocketBase / данные**

8. Никакого поллинга. Живые списки (заказы) — `pb.collection(...).subscribe("*")` + инвалидация react-query.
9. `orders.createRule` публичное → клиент может прислать любой `total`/`status`/`frontpad*`. Хук `onRecordCreateRequest("orders")` обязан пересчитать деньги по `lines` и затереть служебные поля. Считать клиентские суммы недостоверными.
10. Фильтры PB собирать через `pb.filter("slug = {:slug}", { slug })`, не конкатенацией строк.
11. Файлы — `pb.files.getURL` (не deprecated `getUrl`), в таблицах — с `{ thumb: "100x100" }`.

**UI / производительность**

12. `motion` в режиме `strict`: только `m.*` из `motion/react-m`. Витрина остаётся на `domAnimation`; layout-анимации (`layoutId`-пилюля меню, перестановка строк) требуют `domMax` — включать **вложенным** `LazyMotion` внутри админского чанка, чтобы витрина не потолстела.
13. Анимации — `opacity` / `transform`. `width`/`height`/`gap` в переходах админки не анимировать.
14. Цвета — токены `globals.css`. Кнопки — `shared/ui/button.tsx`. Без `window.alert` / `confirm` (только `ConfirmDialog`), без `console.log`.
15. Ни одной кнопки-заглушки с `toast("…заглушка")`: либо работает, либо её нет.

---

## 2. Зона БД — делает владелец

Порядок: 2.1 → 2.2 → 2.3 → 2.4. До конца 2.1 код шага 4+ работать не будет.

### 2.1 Правки существующих коллекций

| Коллекция | Что сделать | Зачем |
|---|---|---|
| `categories`, `product_tags`, `products`, `banners` | number `order`: снять **Nonzero/Required** (`required: false`) | иначе `order: 0` → `validation_required`; админка шлёт 1-based, но 0 всё равно нужен при сиде/reorder |
| `addons` | number `price`: Nonzero off, `min: 0` | цена 0₽ для бесплатных соусов |
| `products` | `categoryId`: **select → relation** на `categories` (maxSelect 1, required, cascadeDelete **false**) | иначе новая категория из админки требует ручной правки схемы. Для кода семантика не меняется: single relation отдаёт тот же id-строку |
| `products` | file `image`: добавить `thumbs: ["100x100", "600x400"]` | превью в таблицах не тянет 5 МБ |
| `addons`, `banners` | file `image`: `thumbs: ["100x100"]` | то же |
| `orders` | добавить: `goods`(number), `packFee`(number), `deliveryFee`(number), `discount`(number), `couponCode`(text 32), `addressParts`(json `{street,home,pod,et,apart}`), `comment`(text 100), `personCount`(number), `payCode`(text 16), `preorderAt`(date), `customerId`(relation `customers`, optional), `statusSource`(select `client|hook|manual`), `frontpadStatus`(number), `sentAt`(date) | разбор денег в админке, адрес по частям под Frontpad, честный источник статуса |
| `orders` | индекс `CREATE INDEX idx_orders_created ON orders (created)` | пагинация и дашборд |
| `reviews` | добавить `productId`(relation `products`, optional, cascadeDelete false), `reply`(text 1000), `authorPhone`(text 20) | пересчёт рейтинга товара и ответ заведения |
| `users` | `role`: select со значениями `admin`, `manager` (было только `admin`) | роль «менеджер»: заказы и отзывы без доступа к настройкам/купонам/сотрудникам |
| `frontpad_stock` | добавить `name`(text 200) | в стоп-листе видно название, а не только артикул |

### 2.2 Новые коллекции

| Коллекция | Поля | Индексы |
|---|---|---|
| `customers` | `phone`(text 20, required), `name`(100), `street`(50), `home`(50), `pod`(2), `et`(2), `apart`(50), `card`(text 16, pattern `^[0-9]*$`), `sale`(number 0–100), `score`(number), `comment`(100), `blocked`(bool), `ordersCount`(number), `totalSpent`(number), `lastOrderAt`(date) | `UNIQUE (phone)` |
| `coupons` | `code`(text, pattern `^[A-Z0-9]{3,32}$`, required), `kind`(select `percent|amount`), `value`(number), `description`(200), `minTotal`(number), `startsAt`(date), `endsAt`(date), `usesLimit`(number, 0 = ∞), `perCustomer`(number, 0 = ∞), `uses`(number), `active`(bool) | `UNIQUE (code)` |
| `settings` | одна запись, id = `main`; id-поле: pattern `^[a-z]+$`, min 3, max 20. Поля: `packFee`, `deliveryFee`, `freeDeliveryFrom`, `minOrder` (number), `phoneDisplay`, `phoneTel`, `address`, `workHours`, `deliveryFrom`, `promoTitle`, `promoSubtitle`, `promoCode` (text), `acceptingOrders`(bool), `stopMessage`(text 200) | — |
| `frontpad_settings` | одна запись, id = `main`, id-поле как у `settings`. Поля: `sendEnabled`(bool), `payCodePickup`, `payCodeDelivery`, `channel`, `affiliate`, `point` (text 16), `orderTags`(json, ≤10), `hookStatuses`(json, ≤5), `statusMap`(json: `{"1":"cooking","3":"delivering","5":"done","9":"canceled"}`), `syncEnabled`(bool), `lastProductsSyncAt`(date), `lastStopsSyncAt`(date) | — |
| `frontpad_jobs` | `kind`(select `sync_products|sync_stops|resend_order|check_client`), `payload`(json), `status`(select `queued|running|done|error`), `result`(json), `error`(text 500), `attempts`(number) | `INDEX (status, created)` |

Обе singleton-записи (`settings#main`, `frontpad_settings#main`) создать вручную в `/_/` **сразу** — код рассчитывает, что они есть, и не создаёт их сам.

### 2.3 Правила доступа (PB Rules)

Обозначим `A` = `@request.auth.role = "admin"`, `S` = `@request.auth.role = "admin" || @request.auth.role = "manager"`.

| Коллекция | List / View | Create | Update | Delete |
|---|---|---|---|---|
| `categories`, `product_tags`, `products`, `addons`, `banners` | публично (у `products` остаётся `active = true \|\| S`) | `A` | `A` | `A` |
| `reviews` | `published = true \|\| S` | `A` | `S` | `A` |
| `orders` | List `S`; View публично (id — capability-ссылка для realtime статуса) | публично | `S` | `A` |
| `customers` | `S` | — (только хук) | `S` | `A` |
| `coupons` | `A` | `A` | `A` | `A` |
| `settings` | публично | — | `A` | — |
| `frontpad_settings` | `A` | — | `A` | — |
| `frontpad_stock` | публично | — | — | — |
| `frontpad_jobs` | `A` | `A` | — (хук от суперюзера) | `A` |
| `users` | List/View `A`, Update `A` | `A` | `A` | `A` |

`coupons` **не** отдаём публично: коды проверяются хук-роутом. Включить встроенный rate limiter PB на `POST /api/collections/orders/records` и `POST /api/promo/check`.

### 2.4 `pb_hooks`

| Файл | Что делает |
|---|---|
| `orders.pb.js` | `onRecordCreateRequest("orders")`: валидация `lines`, пересчёт `goods/packFee/deliveryFee/discount/total` по `products`+`addons`+`settings`+`coupons`, проверка `settings.acceptingOrders` и стоп-листа, генерация `number`, форс `status="new"`, `statusSource="client"`, зачистка `frontpad*`. `onRecordAfterCreateSuccess`: upsert `customers` по `phone`, `coupons.uses++` |
| `frontpad.pb.js` | `onRecordAfterCreateSuccess("orders")` → `new_order` (маппинг `lines` → `product[]`/`product_kol[]`/`product_mod[]`, `sale` XOR `sale_amount`, `hook_status[]` и коды из `frontpad_settings`), патч `frontpadOrderId/Number/Error/sentAt`. Роут `POST /api/webhooks/frontpad/status` → по `frontpadOrderId` мапит `frontpadStatus` через `statusMap`, ставит `statusSource="hook"`. `cronAdd` раз в минуту: воркер `frontpad_jobs` (лимиты 2/сек, `sync_products` не чаще 1/час) |
| `promo.pb.js` | `POST /api/promo/check` — `{ code, goods }` → `{ ok, kind, value, discount, message }`. Коды наружу не отдаёт |
| `reviews.pb.js` | после create/update/delete `reviews` с `published = true` — пересчёт `products.rating.overall` и `votes` по `productId` |

Секрет Frontpad и `FRONTPAD_HOOK_URL` — env systemd-юнита, не в репозитории. Всё остальное (коды оплаты, каналы, маппинг статусов) — в `frontpad_settings`, чтобы менялось из админки без деплоя.

---

## 3. Зона кода — шаги

У каждого шага: **Читать** (только эти файлы), **Создать/Править**, **Готово когда**. Шаги идут по порядку: 0–3 — фундамент, 4–14 — разделы, 15 — приёмка.

### Шаг 0. Навигация: URL-роутинг разделов

**Читать:** `pages/admin/model.ts`, `pages/admin/AdminPage.tsx`, `pages/admin/ui/AdminSidebar.tsx`, `app/router.tsx`.

**Править:**

- `model.ts` — `AdminTabId` → `AdminSectionId`: `dashboard | products | addons | categories | banners | orders | reviews | customers | staff | coupons | settings`. `ADMIN_NAV` — добавить `path` (slug раздела) и `role: "admin" | "manager"` (минимальная роль), пункты «Сотрудники» (`Users`) и «Клиенты» (`Contact`), порядок: Главная → Товары → Добавки → Категории → Баннеры → Заказы → Отзывы → Клиенты → Купоны → Сотрудники → Настройки.
- `AdminPage.tsx` — вложенный `<Routes>`: `index` → `<Navigate to="dashboard" replace />`, по одному `<Route path=":section">` на раздел. Убрать состояния `nav`/`tab` и `editing` (товар редактируется по `/admin/products/:id`). Обернуть контент во вложенный `LazyMotion features={domMax} strict`.
- `AdminSidebar.tsx` — `<Link to={"/admin/" + path}>` вместо `onSelect`, активность по `useLocation().pathname`, пункты не по роли — скрывать.
- `router.tsx` — `path="/admin/*"`; **ключ AnimatePresence**: `const routeKey = location.pathname.startsWith("/admin") ? "/admin" : location.pathname` и `key={routeKey}` (иначе каждый переход между разделами перемонтирует всю админку с фейдом).

**Создать:** `app/motion-features-max.ts` (`export { domMax as default } from "motion/react"`).

**Готово когда:** каждый пункт меню открывает свой экран по своему URL, F5 сохраняет раздел, «назад» работает, пилюля меню анимированно переезжает, сайдбар при переходе не мигает.

### Шаг 1. Счётчики, права, публичные фильтры

**Читать:** `shared/api/auth.ts`, `entities/product/api.ts`, `entities/order/api.ts`, `pages/admin/AdminPage.tsx`.

**Создать:** `shared/api/counts.ts` — `useAdminCounts()`: по одному `getList(1, 1, { filter })` на коллекцию, берём `totalItems` (сейчас AdminPage тянет шесть `getFullList` только ради цифр в меню). `staleTime` 30 с.

**Править:**

- `entities/product/api.ts` — `fetchProducts` добавить `filter: "active = true"` (витрина), новый `fetchAdminProducts()` без фильтра + `adminProductKeys`. Аналогично `entities/order/api.ts` для `reviews` (`published = true` для витрины).
- `shared/api/auth.ts` — `role: "admin" | "manager"`, `useAdminAuth` пускает обе роли, экспорт `can(section, action)` и `isManager`.
- `AdminPage.tsx` — счётчики из `useAdminCounts()`.

**Готово когда:** вход в админку делает ≤ 2 запроса до выбора раздела; менеджер видит только доступные пункты; скрытый товар не появляется на витрине даже у залогиненного админа.

### Шаг 2. Ядро CRUD: мутации, файлы, realtime

**Читать:** `shared/api/pb.ts`, `shared/api/query-client.ts`, `entities/tag/api.ts` (образец мутаций).

**Создать:**

- `shared/api/crud.ts` — `collectionMutations<TRecord, TEntity>({ collection, map, keys })` → `{ create, update, remove, useCreate, useUpdate, useRemove }`; инвалидация переданных ключей, `setQueryData` для detail, ошибки нормализуются через `pbErrorMessage(err)` (разбор `ClientResponseError.response.data` по полям — иначе пользователь видит «Failed to create record» вместо «slug уже занят»).
- `shared/api/files.ts` — `toFormData(data)`: `File` кладём как есть, объекты/массивы — `JSON.stringify`, `undefined` пропускаем, `null` = удалить файл; `imageUrl(record, field, thumb?)` над `pb.files.getURL`.
- `shared/api/realtime.ts` — `useCollectionRealtime(collection, keys)`: `subscribe("*")` + инвалидация, корректная отписка в StrictMode.

**Править:** `entities/*/api.ts` — заменить конкатенацию в `filter` на `pb.filter(...)`, `pb.files.getUrl` → `pb.files.getURL`.

**Готово когда:** `pnpm typecheck` чистый, ошибка уникальности slug показывается человеческим текстом.

### Шаг 3. UI-примитивы админки

**Читать:** `shared/ui/input.tsx`, `shared/ui/button.tsx`, `shared/ui/sheet.tsx`, `shared/ui/badge.tsx`, `pages/admin/ui/DataTable.tsx`, `pages/admin/ui/AdminCard.tsx`.

**Создать:**

- `shared/ui/select.tsx` — вынести стиль нативного `<select>`, который сейчас захардкожен в `ProductEditor`.
- `shared/ui/switch.tsx` — `role="switch"`, без новых зависимостей.
- `shared/ui/confirm-dialog.tsx` — на `@radix-ui/react-dialog` (уже в deps); хук `useConfirm()`. Замена `window.confirm`, запрещённого правилами.
- `shared/ui/image-field.tsx` — превью + drop-зона + валидация (jpeg/png/webp, лимиты как в схеме: товары/баннеры 5 МБ, добавки 2 МБ), отдаёт `File | null`.
- `pages/admin/ui/SectionShell.tsx` — заголовок + описание + слот действий + `m.div` вход (`opacity`, `y: 8`, 0.18 с).
- `pages/admin/ui/Toolbar.tsx` — поиск (`useDeferredValue`), фильтры-чипы, кнопка создания.
- `pages/admin/ui/SkeletonRows.tsx`, `pages/admin/ui/EmptyState.tsx`.
- `pages/admin/ui/SortableList.tsx` — перестановка кнопками ↑/↓ + `m.li layout` (под `domMax`), наружу отдаёт новый массив `order`.

**Править:** `DataTable.tsx` — `sort?`, `onSort?`, `busy?` (при мутации `opacity-60 pointer-events-none`), рендер строк через `AnimatePresence` с `initial={{ opacity: 0, y: -4 }}` (без анимации высоты).

**Готово когда:** примитивы собраны, ни один не тянет новый npm-пакет.

### Шаг 4. Категории

**Читать:** `entities/category/model.ts`, `entities/category/api.ts`, `pages/admin/sections/CatalogTables.tsx` (`CategoriesTable`), `pages/admin/sections/CategoryTagsEditor.tsx`.

**Создать:** `shared/config/icons.ts` — `CATEGORY_ICONS` (`/icons/shaurma.png`, `shahlik`, `pizza`, `combo`, `garnir`, `drinks`; `kcal.png` — не иконка категории). `pages/admin/sections/categories/CategoriesSection.tsx`, `CategoryForm.tsx`.

**Править:**

- `entities/category/model.ts` — `CategoryId` из литерального юниона в `string` + `KNOWN_CATEGORY_IDS` для дефолтов; иначе созданная в админке категория не типизируется. Проверить потребителей (`Product.categoryId`, `mocks/*`).
- `entities/category/api.ts` — мутации через `collectionMutations`; в `create` **обязателен свой `id`** (код категории, pattern `^[a-z]+$`), PB его не генерирует для этой коллекции.

**Готово когда:** категория создаётся с кодом и иконкой из грида, переименовывается, переупорядочивается, удаляется только при нулевом числе товаров (иначе — `ConfirmDialog` с отказом и подсказкой); теги внутри карточки работают как раньше.

### Шаг 5. Добавки

**Читать:** `entities/addon/model.ts`, `entities/addon/api.ts`, `pages/admin/sections/CatalogTables.tsx` (`AddonsTable`).

**Создать:** `pages/admin/sections/addons/AddonsSection.tsx`, `AddonForm.tsx` (в `Sheet`).

**Править:** `entities/addon/api.ts` — мутации + загрузка `image` через `toFormData`.

**Готово когда:** CRUD добавок и соусов работает, фото загружается, артикул валидируется как `^\d+$` и проверяется на конфликт с другими артикулами (см. шаг 6), фильтр по `kind` и поиск живые.

### Шаг 6. Товары + матрица артикулов

**Читать:** `entities/product/model.ts`, `entities/product/lib.ts`, `entities/product/api.ts`, `pages/admin/sections/CatalogTables.tsx` (`ProductsTable`), `pages/admin/sections/ProductEditor.tsx`.

**Править:**

- `entities/product/model.ts` — `ProductSize.articleByVariant?: Record<string, string>`; `nutrition`/`stats` без изменений.
- `entities/product/lib.ts` — `articleFor(product, sizeId, variantId?)`: `size.articleByVariant?.[variantId] ?? size.article`; `skuMatrix(product)` — список `{ variantId, sizeId, price, article }`.
- `entities/product/api.ts` — `UpdateProductInput` расширить до всех редактируемых полей (`slug`, `tagline`, `emoji`, `badge`, `nutrition`, `variants`, `sizes`, `order`, `active`, `image`), добавить `createProduct`, `duplicateProduct` (копия с `slug + "-copy"`, `active: false`), мутацию `toggleActive` с оптимистичным обновлением и откатом.
- `ProductEditor.tsx` — реальные: загрузка фото (`ImageField`), `slug`, `tagline`, `emoji`, `badge`, `nutrition` (4 числа), редактор `variants` (label/иконка мяса/`priceDelta`) и `sizes` (label/цена), **матрица артикулов вариант × размер** с проверкой «цифры / уникальность / есть в `frontpad_stock`», `active`-свитч, «Дублировать» вместо тоста. Плитка «Последние изменения» с выдуманным Алексеем — либо `updated` + `updatedBy`, либо удалить.

**Создать:** `pages/admin/sections/products/ProductsSection.tsx` (таблица + поиск + фильтры категория/статус/«без артикула» + пагинация), `ProductCreateForm.tsx`, `pages/admin/sections/products/ArticleMatrix.tsx`, `entities/product/lib/articles.ts` (`collectArticleConflicts(products, addons)`).

**Готово когда:** товар создаётся с нуля и появляется на витрине; фото меняется; для каждой пары вариант × размер видно артикул и его конфликты; страница товара `/admin/products/:id` открывается по URL.

### Шаг 7. Баннеры

**Читать:** `entities/banner/model.ts`, `entities/banner/api.ts`, `pages/admin/sections/CatalogTables.tsx` (`BannersTable`).

**Создать:** `pages/admin/sections/banners/BannersSection.tsx`, `BannerForm.tsx` (image/`note.{title,text}`/order).

**Править:** `entities/banner/api.ts` — мутации + файл.

**Готово когда:** баннер добавляется, порядок меняется через `SortableList`, `note` очищается в `null`, карусель витрины подхватывает без перезагрузки.

### Шаг 8. Заказы

**Читать:** `entities/order/model.ts`, `entities/order/api.ts`, `pages/admin/sections/CatalogTables.tsx` (`OrdersTable`), `features/cart/ui/CartPanel.tsx` (строки 55–80 — как собирается снимок `lines`).

**Править:**

- `entities/order/model.ts` — добавить в `Order` поля из 2.1 (`goods`, `packFee`, `deliveryFee`, `discount`, `couponCode`, `addressParts`, `comment`, `statusSource`, `frontpadOrderId`, `frontpadOrderNumber`, `frontpadError`, `frontpadStatus`, `sentAt`, `lines`), `ORDER_STATUS_FLOW` (допустимые переходы).
- `entities/order/api.ts` — `useOrdersPage({ page, perPage, status, query, from, to })` на `getList` + `placeholderData: keepPreviousData`; `useUpdateOrderStatus()` (пишет `status` + `statusSource: "manual"`); `useOrderJobs()`/`useResendOrder(orderId)` — создаёт запись в `frontpad_jobs` (`kind: "resend_order"`), никаких прямых вызовов кассы.
- `CartPanel.tsx` — `article` в снимке через `articleFor(...)` вместо `findSize(...).article`.

**Создать:** `pages/admin/sections/orders/OrdersSection.tsx` (фильтры по статусу/дате/поиск по номеру и телефону, пагинация, realtime через `useCollectionRealtime`), `OrderDrawer.tsx` (состав с ценами и артикулами, адрес по частям, деньги построчно, смена статуса, блок Frontpad: `order_id`/`order_number`/ошибка/`sentAt` + кнопка «Переотправить в кассу», заблокированная при активном джобе; предупреждение из инварианта 2).

**Готово когда:** новый заказ с витрины появляется в списке без перезагрузки; статус меняется; ошибка отправки в кассу видна с текстом; переотправка ставит джоб и меняет своё состояние по realtime.

### Шаг 9. Отзывы

**Читать:** `entities/order/model.ts` (`Review`), `entities/order/api.ts`, `pages/admin/sections/CatalogTables.tsx` (`ReviewsTable`).

**Править:** `entities/order/api.ts` — `productId`, `reply` в типе и маппинге; мутации create/update/delete; `useToggleReviewPublished()` оптимистично.

**Создать:** `pages/admin/sections/reviews/ReviewsSection.tsx` (фильтр «на модерации / опубликованные», привязка к товару через селект, ответ заведения, публикация свитчем, удаление через `ConfirmDialog`).

**Готово когда:** отзыв публикуется одним кликом без перезагрузки списка, рейтинг товара в таблице товаров меняется после публикации (пересчёт — хук из 2.4).

### Шаг 10. Клиенты

**Читать:** `shared/api/crud.ts` (после шага 2), `entities/order/api.ts`.

**Создать:** `entities/customer/model.ts`, `entities/customer/api.ts`, `pages/admin/sections/customers/CustomersSection.tsx` (поиск по телефону/имени, сортировка по `totalSpent`/`lastOrderAt`), `CustomerDrawer.tsx` (адрес по частям с лимитами Frontpad, `card`/`sale`/`score`, `blocked`, история заказов через `filter: customerId = {:id}`).

**Готово когда:** клиент находится по телефону, правки адреса сохраняются в границах лимитов, блокировка видна в списке, история заказов открывается.

### Шаг 11. Сотрудники

**Читать:** `shared/api/auth.ts`, `pages/admin/AdminLogin.tsx`.

**Создать:** `entities/staff/api.ts` (коллекция `users`: список, `create` с паролем, смена `role`, `verified`, `pb.collection("users").requestPasswordReset(email)`, удаление), `pages/admin/sections/staff/StaffSection.tsx`.

**Готово когда:** админ создаёт менеджера, тот входит и видит только заказы/отзывы/каталог; раздел скрыт от менеджера и на уровне PB-правил, и в меню. Себя удалить нельзя (проверка `user.id`).

### Шаг 12. Купоны

**Читать:** `shared/config/site.ts`, `features/cart/model/selectors.ts`, `features/cart/ui/CartPanel.tsx`, `mocks/orders.ts` (`coupons` — справочные данные).

**Создать:** `entities/coupon/model.ts`, `entities/coupon/api.ts` (CRUD + `checkPromo(code, goods)` — `POST /api/promo/check`), `pages/admin/sections/coupons/CouponsSection.tsx`, `CouponForm.tsx` (`kind` — сегмент percent/amount, взаимоисключающе; даты, лимиты, `uses` только для чтения).

**Править:** `features/cart/model/selectors.ts` + `CartPanel.tsx` — скидка не из `ORDER_RULES.promo.percent`, а из ответа `checkPromo` (состояние `appliedCoupon` в сторе корзины: `code`, `kind`, `value`). Хардкод `BOSS10` из логики убрать; в баннере витрины остаётся текст из `settings.promoCode`.

**Готово когда:** созданный в админке купон применяется в корзине, неактивный/просроченный/не добравший `minTotal` — отклоняется с текстом, список кодов через сеть наружу не утекает.

### Шаг 13. Настройки

**Читать:** `shared/config/site.ts`, `features/cart/model/selectors.ts`, `widgets/sidebar/Sidebar.tsx`, `widgets/promo/PromoBanner.tsx`.

**Создать:** `entities/settings/model.ts`, `entities/settings/api.ts` (`useSettings()` — `getOne("main")`, `staleTime` 5 мин; `useFrontpadSettings()` только для админа), `pages/admin/sections/settings/SettingsSection.tsx` (вкладки «Заведение», «Экономика заказа», «Касса»), `pages/admin/sections/settings/FrontpadPanel.tsx` (коды оплаты/канал/филиал/точка, `hook_status` ≤ 5, `orderTags` ≤ 10, маппинг статусов кассы → наши, `sendEnabled`, кнопки «Обновить товары кассы» / «Обновить стоп-лист» → `frontpad_jobs` + время последней синхронизации, стоп-лист из `frontpad_stock`).

**Править:** `shared/config/site.ts` — `SITE`/`ORDER_RULES` остаются **fallback-константами** на случай недоступности PB; `selectors.ts` и виджеты берут значения из `useSettings()` с этим fallback.

**Готово когда:** смена `packFee`/`deliveryFee`/`freeDeliveryFrom` в админке меняет расчёт в корзине без деплоя; `acceptingOrders: false` блокирует оформление с текстом из `stopMessage`; лимиты Frontpad (≤5 статусов, ≤10 тегов) не дают сохранить лишнее.

### Шаг 14. Главная (дашборд)

**Читать:** `entities/order/api.ts`, `shared/api/counts.ts`, `pages/admin/ui/AdminCard.tsx`.

**Создать:** `pages/admin/sections/dashboard/DashboardSection.tsx`, `ui/StatCard.tsx`, `ui/Sparkline.tsx`.

Данные — дешёвыми `getList(1, 1, { filter })` по `totalItems` и одним списком заказов за 14 дней: выручка и число заказов за сегодня (`created >= @todayStart`), средний чек, новые заказы в работе, ошибки отправки в кассу (`frontpadError != ""`), позиции в стоп-листе (`frontpad_stock.stopped = true`), отзывы на модерации, топ-5 товаров из `lines`. `Sparkline` — чистый SVG, анимация `pathLength` на `m.path`, без библиотек графиков.

**Готово когда:** «Главная» открывается первой, показывает живые цифры, ошибки кассы кликом ведут в отфильтрованный список заказов.

### Шаг 15. Чистка и приёмка

**Читать:** `pages/admin/ui/AdminTopbar.tsx`, `pages/admin/sections/CatalogTables.tsx`.

**Править:** `AdminTopbar.tsx` — «Сброс кэш» → `queryClient.invalidateQueries()`; «35 бонусов» и колокольчик уведомлений убрать (или подключить к числу новых заказов); выход перенести в явное меню, сейчас `logout` висит на всей плашке профиля и срабатывает случайным кликом.

**Удалить:** `pages/admin/sections/CatalogTables.tsx` — после шагов 4–9 файл пустеет, все таблицы живут в `sections/<раздел>/`. Импорты из `mocks/*` в коде приложения — только `mocks/*` как сид, ни одного импорта из `pages`/`widgets`/`features`.

**Приёмка:**

1. `pnpm typecheck` и `pnpm build` — чисто, основной чанк витрины не вырос (админский чанк с `domMax` — отдельный).
2. Ни одного `toast("…заглушка")`, `window.confirm`, `console.log` в `src`.
3. Все 11 разделов открываются по URL, работают у админа, корректно урезаны у менеджера, недоступны анониму.
4. Полный цикл: создать категорию → тег → добавку → товар с артикулами → баннер → купон → оформить заказ с витрины → увидеть его в админке по realtime → сменить статус → опубликовать отзыв → цифры на дашборде сошлись.
5. Grep по `src`: `frontpad` встречается только в типах/названиях полей и в UI-подписях — ни одного `app.frontpad.ru` и ни одного секрета.

---

## 4. Карта файлов (что открывать под задачу)

| Задача | Файлы |
|---|---|
| Навигация, разделы, роли | `pages/admin/model.ts`, `AdminPage.tsx`, `ui/AdminSidebar.tsx`, `app/router.tsx`, `shared/api/auth.ts` |
| Ядро запросов | `shared/api/pb.ts`, `query-client.ts`, `crud.ts`, `files.ts`, `realtime.ts`, `counts.ts` |
| Примитивы и таблицы | `shared/ui/{input,button,select,switch,badge,sheet,confirm-dialog,image-field}.tsx`, `pages/admin/ui/*` |
| Каталог | `entities/{category,tag,product,addon,banner}/{model,api}.ts`, `entities/product/lib.ts` |
| Заказы и деньги | `entities/order/{model,api}.ts`, `features/cart/model/selectors.ts`, `features/cart/ui/CartPanel.tsx`, `shared/config/site.ts` |
| Клиенты / купоны / настройки | `entities/{customer,coupon,settings,staff}/*`, `pages/admin/sections/{customers,coupons,settings,staff}/*` |
| Frontpad-контракт | `.cursor/rules/API.mdc`, `Tasks/TASK_DB.md`, `Tasks/schema.json` |

Не открывать без нужды: `widgets/header/*`, `shared/ui/glass.tsx`, `pages/product/*`, `styles/globals.css` — админка их не меняет.

---

## 5. Баги и долги, которые закрываются по пути

| Где | Что не так | Шаг |
|---|---|---|
| `AdminPage.tsx` | `nav` и `tab` — два независимых состояния: у «Главной», «Клиентов», «Купонов», «Настроек» нет `tab`, поэтому пилюля переезжает, а на экране остаётся таблица товаров | 0 |
| `router.tsx` | `key={location.pathname}` у `AnimatePresence` — после перехода на вложенные роуты админка будет перемонтироваться на каждый раздел | 0 |
| `app/motion-features.ts` | витрина грузит `domAnimation`, а `layoutId`-пилюля в `AdminSidebar` требует layout-фич — сейчас пилюля не анимируется вовсе | 0 |
| `AdminPage.tsx` | шесть `getFullList` при входе ради счётчиков в меню | 1 |
| `entities/product/api.ts` | `fetchProducts` без `active = true`: залогиненному админу витрина покажет скрытые товары (правило PB пускает) | 1 |
| `entities/{product,addon}/api.ts` | `filter` собирается конкатенацией — экранирования нет | 2 |
| все `entities/*/api.ts` | `pb.files.getUrl` помечен deprecated в SDK 0.27 | 2 |
| `ProductEditor.tsx` | «Загрузить фото», «Новый вариант», «Дублировать» — тосты-заглушки; вымышленный автор изменений «Алексей» | 6 |
| `CartPanel.tsx` | артикул берётся из `size.article` без учёта варианта — в кассу уйдёт не тот SKU | 6, 8 |
| `entities/product/model.ts` | `ProductSize.article` не различает варианты мяса | 6 |
| `entities/category/model.ts` | `CategoryId` — литеральный юнион, новая категория из админки не типизируется | 4 |
| `shared/config/site.ts` | экономика заказа и `BOSS10` захардкожены в бандле | 12, 13 |
| `AdminTopbar.tsx` | «Сброс кэш» и «35 бонусов» — заглушки; выход срабатывает по клику на всю плашку профиля | 15 |

---

## 6. Чего не делать

- Не звать Frontpad из `src/*` и не хранить его секрет в репозитории — только `pb_hooks` + env.
- Не менять статус в кассе из админки: API кассы этого не умеет, наш статус — зеркало.
- Не поллить ни заказы, ни джобы — `subscribe`.
- Не добавлять UI-kit, chart-библиотеку, Redux, второй HTTP-клиент. Дашборд — SVG, диалоги — Radix из deps.
- Не выносить `motion.*` вместо `m.*` и не включать `domMax` на витрине.
- Не отдавать `coupons` публичным правилом чтения.
- Не удалять `src/mocks/*` — это сид для PocketBase.
- Не трогать витринные анимации, стекло и токены: задача только про админку и источник данных.
