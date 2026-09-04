# TASK_DB — подключение PocketBase (сайт + админка) с прицелом на Frontpad

Контекст: `apps/shashlik-web`, канон — `.cursor/rules/stack_new.mdc`. Frontpad — `.cursor/rules/API.mdc` (источник: `temp/API Frontpad.docx`). Сейчас всё на моках (`src/mocks/*`), PocketBase на проде **стоит, но не подключён** (systemd, `127.0.0.1:8090`, Nginx проксирует `/api/` и `/_/`).

## Архитектура

- **PocketBase JS SDK** — прямой клиент из React для публичного каталога (категории/товары/добавки/баннеры — чтение). Прод: тот же origin (`/api/...` через Nginx-прокси) → без CORS. Dev: отдельный `VITE_PB_URL` (staging PB или туннель), CORS настраивается в PB.
- **TanStack Query** — кэш/лоадинги/мутации над PB SDK. Явное решение для этой задачи (раньше в стеке запрещён бэкенд-клиент без задачи — теперь задача есть, фиксируем в `stack_new.mdc`).
- **Frontpad — только через PocketBase JS-хуки (`pb_hooks`)**, не через отдельный Node-сервер и не с клиента. Секрет живёт в env процесса PocketBase.
  - Клиент создаёт `orders` в PB (источник правды) → хук `onRecordAfterCreateSuccess("orders")` мапит строки в `product[]/product_kol[]/product_mod[]`, зовёт Frontpad `new_order`, патчит запись (`frontpadOrderId`, `frontpadOrderNumber`, `status`, ошибки).
  - Webhook Frontpad `change_status` → отдельный роут в `pb_hooks`, находит `orders` по `frontpadOrderId`, обновляет `status`.
  - `cronAdd` раз в час — `get_products` + `get_stops` → кэш-коллекция `frontpad_stock` (лимит 1/час соблюён на уровне PB, не клиента).
  - Клиент никогда не знает про Frontpad: только создаёт `orders` и подписывается на изменения записи через PB realtime (`subscribe`) — статус приходит без поллинга (запрещён по `API.mdc`).
- **Админка (`/admin`)** — реальный CRUD через `pb.collection(...).create/update/delete` вместо тостов-заглушек. Доступ — PB auth (`users`, поле `role`), гейт на роут.

## Зона БД — делаю сам (PocketBase Admin UI, `pb_hooks`, env)

Ничего из этого агент не трогает — только читает описанную здесь схему при генерации кода.

### Коллекции (имена полей = 1:1 с `entities/*/model.ts`, где возможно)

> Готовый импорт: `Tasks/schema.json` (PocketBase v0.23+, ключ `fields`). **PB 0.29:** у каждой коллекции в JSON обязателен `id` (не только `name`) — формат как при Export collections. Коллекция `users` не включена — поле `role` добавить вручную в существующую auth-коллекцию.

| Коллекция | Поля | Заметки |
|---|---|---|
| `categories` | `name`, `icon` (text, путь `/icons/*.png` или пусто), `order` (number) | id записи = код категории (`shawarma`, `shashlik`, …) — задать вручную при создании, не автоген, чтобы совпадало с `CategoryId` |
| `product_tags` | `categoryId` (relation → `categories`, cascade), `slug` (`^[a-z0-9-]+$`), `name`, `emoji` (text, optional), `order` (number) | уникально `(categoryId, slug)`. Чип «Все» не хранится. Сид: `mocks/tags.ts` |
| `product_badges` | `slug` (unique, `^[a-z0-9-]+$`), `label`, `order` (number) | Справочник бейджей витрины. Сид: `mocks/badges.ts` (hit/new/spicy). На товаре — `products.badge` = slug |
| `products` | `name`, `slug` (unique), `categoryId` (text/select = `CategoryId`), `emoji` (text, optional, legacy), `tagline`, `composition`, `image` (file, **до 5**), `badge` (text optional = slug из `product_badges`), `nutrition` (JSON), `tags` (JSON массив slug из `product_tags` своей категории), `variants` (JSON массив, **`required: false`** — пустой `[]` валиден), `sizes` (JSON массив, **`required: false`** — пустой `[]` у черновика; артикул кассы — `sizes[].article`), `rating` (JSON), `order` (number, `required: false`), `active` (bool, **`required: false`** — иначе PB отвергает `false`), `stats` (JSON) | `created`/`updated` — встроенные автополя PB (не заводить свои `createdAt`/`updatedAt`). Бывший select `classic|spicy|…` заменить на json, значения slug оставить. PB: `required` у bool = только `true`, у json = непустой — см. `stack_new.mdc` |
| `addons` | `name`, `weight`, `price` (number), `image` (file), `kind` (select: extra/sauce), `article` (text optional) | |
| `banners` | `image` (file), `note` (JSON optional `{title, text}`), `order` (number) | |
| `orders` | `number` (text), `customer`, `phone`, `mode` (select: pickup/delivery), `address` (text optional), `status` (select: new/cooking/delivering/done/canceled), `positions` (number), `total` (number), `lines` (JSON — снимок корзины), `promo` (text optional), `bonusSpent` / `bonusEarned` (number), `frontpadOrderId` (number optional), `frontpadOrderNumber` (text optional), `frontpadError` (text optional) | пишет клиент (create) + патчит хук |
| `bonus_settings` | singleton id=`main`: `enabled`, `defaultEarnPercent`, `birthdayAmount`, `referralInviterAmount`, `referralInviteeAmount`, `pwaInstallAmount`, `maxSpendPercent`, `earnOnStatus` | createRule null |
| `bonus_ledger` | append-only: `customerId`, `userId?`, `delta`, `balanceAfter`, `reason`, `dedupeKey` (unique), `meta`, `actor*` | create/update/delete с клиента закрыты |
| `activity_logs` | audit: `actorType`, `actorId`, `action`, `entity`, `entityId`, `meta`, `ip`, `userAgent` | list/view admin |
| `reviews` | `author`, `productName`, `score` (number), `text`, `published` (bool) | `created` — автополе |
| `frontpad_stock` | `article` (text), `price` (number), `sale` (bool), `stopped` (bool) | пишет только cron-хук |
| `users` (встроенная auth-коллекция PB) | + поле `role` (select: admin) | вход в `/admin` |

### API-правила (PB Rules)

- `categories`/`product_tags`/`product_badges`/`products`/`addons`/`banners`/`reviews` (published=true): List/View — публично; Create/Update/Delete — `@request.auth.role = "admin"`.
- `orders`: Create — публично (с валидацией полей); List/View/Update — только `admin`; клиенту для realtime-подписки на свою запись достаточно `view` по id, если правило это разрешает точечно.
- `frontpad_stock`: List/View — публично (для проверки стоп-листа на сайте); запись — только хук/суперюзер.
- `users`: обычные правила auth-коллекции, регистрация закрыта (создавать сотрудников из `/_/`).

### `pb_hooks` (JSVM)

- `frontpad.pb.js`: `onRecordAfterCreateSuccess("orders")` → вызов `new_order`; роут `POST /webhooks/frontpad/status` → обработка `change_status`; `cronAdd` → `get_products`/`get_stops` в `frontpad_stock`.
- Секрет Frontpad и `FRONTPAD_HOOK_URL` — только env процесса `pocketbase` (systemd unit), не в репозитории.
- Маппинг корзины → артикулы Frontpad (`product[]`/`product_kol[]`/`product_mod[]`) — по правилам `API.mdc`, добавки = отдельные артикулы с `product_mod` на индекс родителя.

### Env / инфра

- `VITE_PB_URL` — base URL **без** `/api` (SDK добавляет сам): прод — не задавать (берётся `window.location.origin`), dev — `http://127.0.0.1:8090` или staging origin.
- Nginx/systemd — уже готовы (см. `stack_new.mdc`, раздел «Прод»), доп. правок не требуют.

## Зона кода — делает агент (после того как коллекции выше созданы)

Порядок — чтобы каждый шаг был атомарным и не требовал перечитывать весь проект.

### Шаг 1. Зависимости и клиент PB

- Прочитать: `apps/shashlik-web/package.json`, `apps/shashlik-web/src/vite-env.d.ts`.
- Править: `package.json` (добавить `pocketbase`, `@tanstack/react-query`), `vite-env.d.ts` (типы `ImportMetaEnv.VITE_PB_URL`).
- Создать: `src/shared/api/pb.ts` (singleton `PocketBase` клиента), `src/shared/api/query-client.ts` (`QueryClient`).

### Шаг 2. Провайдеры

- Прочитать: `src/app/App.tsx`.
- Править: `App.tsx` — обернуть в `QueryClientProvider`.

### Шаг 3. Слой данных по сущностям (чтение)

Для каждой сущности — один новый файл `entities/<name>/api.ts` (список + get by id/slug, маппинг PB-записи → тип из `model.ts`; для `image`/`icon` — `pb.files.getUrl`).

- Прочитать: `entities/category/model.ts`, `mocks/categories.ts` → создать `entities/category/api.ts`.
- Прочитать: `entities/tag/model.ts`, `mocks/tags.ts` → создать `entities/tag/api.ts` (`product_tags`).
- Прочитать: `entities/product/model.ts`, `entities/product/lib.ts`, `mocks/products.ts` → создать `entities/product/api.ts`.
- Прочитать: `entities/addon/model.ts`, `mocks/addons.ts` → создать `entities/addon/api.ts`.
- Прочитать: `entities/banner/model.ts`, `mocks/banners.ts` → создать `entities/banner/api.ts`.
- Прочитать: `entities/order/model.ts`, `mocks/orders.ts` → создать `entities/order/api.ts` (+ `reviews`).

### Шаг 4. Переключение витрины с моков на запросы

Точечно, файл за файлом — заменить импорт из `mocks/*` на хук из `entities/*/api.ts` (react-query `useQuery`):

- `pages/home/HomePage.tsx`, `pages/home/ui/DesktopHome.tsx`, `pages/home/ui/MobileHome.tsx`
- `widgets/sidebar/Sidebar.tsx`, `widgets/hero/HeroBanner.tsx`, `widgets/catalog/CategoryTiles.tsx`, `widgets/catalog/TagFilters.tsx`
- `pages/product/ProductPage.tsx`
- `entities/product/ui/ProductCard.tsx`, `entities/product/ui/ProductCardCompact.tsx` (если тянут моки напрямую — проверить)

### Шаг 5. Корзина: синхронный лукап → кэш react-query

- Прочитать: `features/cart/model/selectors.ts` (использует `productById`/`addonById` синхронно из моков), `features/cart/model/store.ts`.
- Править: `selectors.ts` — брать товары/добавки из `queryClient.getQueryData` (данные уже в кэше после шага 4) вместо прямого импорта моков. Если товара нет в кэше — `resolveLine` возвращает `null`, как сейчас.

### Шаг 6. Оформление заказа + Frontpad-статус без поллинга

- Прочитать: `features/cart/ui/CartPanel.tsx`, `features/cart/model/selectors.ts`, `entities/order/model.ts`.
- Править: `CartPanel.tsx` — кнопка «Оформить заказ» вызывает мутацию `entities/order/api.ts#createOrder` (пишет в `orders`, снимок строк из `useCartTotals()`), очищает `useCartStore` при успехе.
- Создать: `entities/order/api.ts` экспорт `subscribeOrderStatus(orderId, cb)` (обёртка над `pb.collection('orders').subscribe`) — использовать в тост/баннере статуса после оформления (замена текущего `toast.success` заглушки).

### Шаг 7. Админка: реальный CRUD

- Прочитать: `pages/admin/AdminPage.tsx`, `pages/admin/sections/CatalogTables.tsx`, `pages/admin/sections/ProductEditor.tsx`, `pages/admin/ui/DataTable.tsx`.
- Править: `CatalogTables.tsx` (таблицы читают через `entities/*/api.ts` хуки вместо `mocks/*`), `ProductEditor.tsx` («Сохранить»/«Удалить» → мутации `pb.collection('products').update/delete`).

### Шаг 8. Авторизация админки

- Прочитать: `app/router.tsx`, `pages/admin/AdminPage.tsx`, `app/providers/theme.tsx` (как устроен провайдер-паттерн в проекте).
- Создать: `shared/api/auth.ts` (обёртка над `pb.authStore` + хук `useAdminAuth()`), `pages/admin/AdminLogin.tsx` (форма входа).
- Править: `router.tsx` — гейт на `/admin`: не авторизован/не `role=admin` → рендер `AdminLogin` вместо `AdminPage`.

### Шаг 9. Ревизия моков

- Мок-файлы (`src/mocks/*`) не удалять — оставить как справочные данные для сида PocketBase (или отдельный скрипт импорта, вне рамок этой задачи). Из кода приложения импорты моков к концу шага 4–7 должны исчезнуть.

## Не трогать / ограничения

- Секрет Frontpad и любые вызовы Frontpad — только в `pb_hooks`, никогда в `src/*`.
- Не поллить статус заказа — только `pb.collection().subscribe`.
- Не заводить второй HTTP-клиент/бэкенд помимо PocketBase SDK.
- Цвета/анимации/лэйаут — не менять в рамках этой задачи, только источник данных.
