# Graph Report - shahlik  (2026-08-24)

## Corpus Check
- 178 files · ~1,377,232 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1306 nodes · 3296 edges · 82 communities (73 shown, 9 thin omitted)
- Extraction: 96% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 115 edges (avg confidence: 0.54)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `81a1fc93`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- addon/api.ts
- UI Layout Components
- NPM Dependencies
- TS Config Tooling
- Figma Make Stack
- Sushi Catalog UI
- Meal Add-ons UI
- Checkout Flow UI
- package.json
- Frontpad API
- Logo Variant B
- Logo Transparent
- 3. Зона кода — шаги
- Logo Black Variant
- Brand Typography
- Brand Logo Core
- Brand Color Palette
- Vite Figma Plugins
- FloatingActions.tsx
- product/api.ts
- ProductEditor.tsx
- gen-glass-noise.mjs
- cn
- HomePage.tsx
- category/api.ts
- cn.ts
- StickyBar.tsx
- order/model.ts
- FloatingActions.tsx
- useCategories
- order/api.ts
- customer/api.ts
- banner/api.ts
- addon/api.ts
- order/model.ts
- articles.ts
- MobileTabBar.tsx
- HomePage.tsx
- MobileHome.tsx
- TagFilters.tsx
- webhook.js
- pb.ts
- package.json
- AdminSidebar.tsx
- CustomerDrawer.tsx
- order/model.ts
- @radix-ui/react-slot
- HomePage.tsx
- invalidateProductRatings
- ProductCard.tsx
- @radix-ui/react-slot
- sonner
- @tanstack/react-query
- Sparkline.tsx
- CouponForm.tsx
- SettingsSection.tsx
- AdminPage.tsx
- send.js
- localOrders.ts
- jobs.js
- http.js
- AddonForm.tsx
- banner-image-field.tsx
- @radix-ui/react-dialog
- react-router-dom
- tailwind-merge
- CategoryForm.tsx
- sync.js
- HeroBanner.tsx
- category/api.ts
- category/model.ts
- files.ts
- AdminTopbar.tsx
- NutritionHint.tsx
- class-variance-authority
- lucide-react
- @radix-ui/react-dialog

## God Nodes (most connected - your core abstractions)
1. `cn()` - 107 edges
2. `formatPrice()` - 38 edges
3. `Button()` - 37 edges
4. `ProductEditor()` - 23 edges
5. `useCategories()` - 22 edges
6. `pb` - 21 edges
7. `Input()` - 21 edges
8. `ProductPage()` - 19 edges
9. `useAdminProducts()` - 18 edges
10. `useCartTotals()` - 18 edges

## Surprising Connections (you probably didn't know these)
- `Logo CMYK` --conceptually_related_to--> `figma-make-app`  [AMBIGUOUS]
  temp/логотип/лого CMYK.pdf → AGENTS.md
- `Logo RGB` --conceptually_related_to--> `figma-make-app`  [AMBIGUOUS]
  temp/логотип/лого RGB.pdf → AGENTS.md
- `AdminGate()` --calls--> `useAdminAuth()`  [EXTRACTED]
  apps/shashlik-web/src/app/router.tsx → apps/shashlik-web/src/shared/api/auth.tsx
- `AdminAuthProvider()` --indirect_call--> `logout()`  [INFERRED]
  apps/shashlik-web/src/shared/api/auth.tsx → apps/shashlik-web/src/entities/account/api.ts
- `resolveBadgeLabel()` --calls--> `badgeLabel()`  [EXTRACTED]
  apps/shashlik-web/src/shared/config/site.ts → apps/shashlik-web/src/entities/badge/model.ts

## Import Cycles
- None detected.

## Communities (82 total, 9 thin omitted)

### Community 0 - "addon/api.ts"
Cohesion: 0.14
Nodes (19): fetchTags(), mapTag(), TagInput, tagKeys, tagMutations, TagRecord, tagsForCategory(), useCategoryTags() (+11 more)

### Community 1 - "UI Layout Components"
Cohesion: 0.07
Nodes (46): adminReviewKeys, buildOrdersFilter(), createOrder(), CreateOrderInput, CreateReviewInput, fetchActiveResendJobs(), fetchAdminReviews(), fetchMyOrders() (+38 more)

### Community 2 - "NPM Dependencies"
Cohesion: 0.11
Nodes (19): devDependencies, tailwindcss, @tailwindcss/vite, tw-animate-css, @types/node, @types/react, @types/react-dom, typescript (+11 more)

### Community 3 - "TS Config Tooling"
Cohesion: 0.07
Nodes (26): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+18 more)

### Community 4 - "Figma Make Stack"
Cohesion: 0.14
Nodes (16): src/App.tsx, Default component exports, Figma Make, figma-make-app, src/index.css, index.html, src/main.tsx, oxfmt (+8 more)

### Community 5 - "Sushi Catalog UI"
Cohesion: 0.14
Nodes (19): useAdminReviews(), useDeleteReview(), useToggleReviewPublished(), ORDER_STATUS_LABEL, Props, ProductOption, ReviewFormProps, ReviewsSection() (+11 more)

### Community 6 - "Meal Add-ons UI"
Cohesion: 0.22
Nodes (10): CreateStaffInput, fetchStaff(), mapStaff(), mapStaffRequired(), staffKeys, StaffMember, staffMutations, StaffRecord (+2 more)

### Community 7 - "Checkout Flow UI"
Cohesion: 0.11
Nodes (18): API-правила (PB Rules), Env / инфра, `pb_hooks` (JSVM), TASK_DB — подключение PocketBase (сайт + админка) с прицелом на Frontpad, Архитектура, Зона БД — делаю сам (PocketBase Admin UI, `pb_hooks`, env), Зона кода — делает агент (после того как коллекции выше созданы), Коллекции (имена полей = 1:1 с `entities/*/model.ts`, где возможно) (+10 more)

### Community 8 - "package.json"
Cohesion: 0.12
Nodes (17): dependencies, clsx, motion, @radix-ui/react-tooltip, react, react-dom, react-easy-crop, tailwind-merge (+9 more)

### Community 10 - "Frontpad API"
Cohesion: 0.33
Nodes (11): API Frontpad, change_status webhook, get_certificate, get_client, get_products, get_stops, new_order, Product article (артикул) (+3 more)

### Community 11 - "Logo Variant B"
Cohesion: 0.31
Nodes (10): Decorative banner frame, Шашлыковский, EST. 2024, Grilled-meat food brand, Шашлыковский logo B (no background), Logo variant B transparent, Bearded chef mascot, White line-art monochrome (+2 more)

### Community 12 - "Logo Transparent"
Cohesion: 0.27
Nodes (10): Шашлыковский, Orange-black-red palette, EST. 2024, Grilled-meat food brand, Шашлыковский logo without background, Bearded chef mascot, Orange decorative plaque, Shashlik skewers (+2 more)

### Community 13 - "3. Зона кода — шаги"
Cohesion: 0.07
Nodes (27): 1. Инварианты (нарушение = баг), 2.1 Правки существующих коллекций, 2.2 Новые коллекции, 2.3 Правила доступа (PB Rules), 2.4 `pb_hooks`, 2. Зона БД — делает владелец, 3. Зона кода — шаги, 4. Карта файлов (что открывать под задачу) (+19 more)

### Community 14 - "Logo Black Variant"
Cohesion: 0.31
Nodes (9): Шашлыковский, Decorative plaque, EST. 2024, Grilled-meat food brand, Шашлыковский black logo (no background), Bearded chef mascot, Monochrome black variant, Shashlik skewers (+1 more)

### Community 15 - "Brand Typography"
Cohesion: 0.39
Nodes (8): Шашлыковский, EST. 2024, Akademische schmalfette, MisterK, Script + condensed serif pairing, Шашлыковский logo specimen, ШРИФТЫ, ШРИФТЫ — brand typography specimen

### Community 16 - "Brand Logo Core"
Cohesion: 0.52
Nodes (7): Шашлыковский, EST. 2024, Grilled-meat food brand, Шашлыковский brand logo, Bearded chef mascot, Orange decorative banner, Shashlik skewers

### Community 17 - "Brand Color Palette"
Cohesion: 0.47
Nodes (6): черный, Orange #EF7F1A, Brand color palette, Red #C30D0E, белый, RGB/HEX/CMYK dual specs

### Community 20 - "FloatingActions.tsx"
Cohesion: 0.12
Nodes (27): asNumberList(), asStatusMap(), asStringList(), enqueueSyncJob(), fetchActiveSyncJobs(), fetchFrontpadSettings(), fetchStoppedStock(), FrontpadJobRecord (+19 more)

### Community 21 - "product/api.ts"
Cohesion: 0.07
Nodes (26): 1. env процесса `pocketbase` (systemd unit, `Environment=`), 2. Правки коллекций в `/_/` (и синхронно в `Tasks/schema.json`), 3. Rate limits PocketBase (`/_/` → Settings → Rate limits), 4. Настройки Frontpad (оператор), 5. Деплой `pb_hooks`, TASK_inter — интеграция с кассой Frontpad (боевая), Зона БД / инфры — делает владелец, агент не трогает, Зона кода — агент (+18 more)

### Community 22 - "ProductEditor.tsx"
Cohesion: 0.27
Nodes (8): SectionStub(), ADMIN_NAV, AdminNavItem, AdminRole, AdminSectionId, AdminSidebar(), PILL, Props

### Community 23 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 24 - "cn"
Cohesion: 0.09
Nodes (22): CategoryId, DEFAULT_CRITERIA, MeatIcon, Product, ProductBadge, ProductNutrition, ProductRating, ProductSize (+14 more)

### Community 25 - "HomePage.tsx"
Cohesion: 0.25
Nodes (17): applyClientData(), backfillOrders(), bonusFromCustomer(), createCustomer(), ensureCustomer(), fetchClientFromCash(), findAppUserByPhone(), findCustomerById() (+9 more)

### Community 26 - "category/api.ts"
Cohesion: 0.26
Nodes (10): useDuplicateProduct(), articleConflictMessage(), ArticleExclude, ArticleRef, cellLabel(), collectArticleConflicts(), isExcludedCell(), skuMatrix() (+2 more)

### Community 27 - "cn.ts"
Cohesion: 0.18
Nodes (14): GuardedSection(), AdminAuth, AdminAuthContext, AdminAuthProvider(), authErrorMessage(), can(), isAbortError(), isStaffRecord() (+6 more)

### Community 28 - "StickyBar.tsx"
Cohesion: 0.12
Nodes (20): couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail, PromoCheckOk (+12 more)

### Community 29 - "order/model.ts"
Cohesion: 0.10
Nodes (18): DeliveryMode, FrontpadJob, FrontpadJobKind, FrontpadJobStatus, Order, ORDER_STATUS_FLOW, ORDER_STATUS_SOURCE_LABEL, OrderAddressParts (+10 more)

### Community 30 - "FloatingActions.tsx"
Cohesion: 0.17
Nodes (15): BadgeInput, badgeKeys, badgeMutations, BadgeRecord, fetchBadges(), mapBadge(), seedFallback(), useCreateBadge() (+7 more)

### Community 31 - "useCategories"
Cohesion: 0.08
Nodes (32): useTheme(), CategoryIcon(), Props, SumRow(), CartToggle(), formatOrderSum(), Props, ThemeToggle() (+24 more)

### Community 32 - "order/api.ts"
Cohesion: 0.17
Nodes (14): buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams, CustomersPageResult, fetchCustomerById() (+6 more)

### Community 33 - "customer/api.ts"
Cohesion: 0.17
Nodes (28): articleFor(), assertArticleAvailable(), buildDescr(), buildNewOrderPayload(), calcCouponDiscount(), checkPromo(), countRecentOrdersByPhone(), findSize() (+20 more)

### Community 34 - "banner/api.ts"
Cohesion: 0.14
Nodes (21): adminProductKeys, createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchAdminProducts() (+13 more)

### Community 35 - "addon/api.ts"
Cohesion: 0.22
Nodes (14): addonKeys, productKeys, articleFor(), cartLineTitle(), findSize(), findVariant(), priceOf(), SkuCell (+6 more)

### Community 36 - "order/model.ts"
Cohesion: 0.12
Nodes (23): OrderLineSnapshot, buildSeries(), buildTopProducts(), countByFilter(), DashboardData, dashboardKeys, DashboardSection(), dayKey() (+15 more)

### Community 37 - "articles.ts"
Cohesion: 0.08
Nodes (24): 1. Singleton-записи, 2. Новая auth-коллекция `app_users` (клиенты витрины), 3. Правки `orders`, 4. Правки `frontpad_settings`, 5. Правки `frontpad_jobs`, 6. Rate limits, TASK_order — профиль клиента, оформление заказа, витрина-модалка, Зона БД / инфры — делает владелец, агент не трогает (+16 more)

### Community 38 - "MobileTabBar.tsx"
Cohesion: 0.17
Nodes (11): App(), readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), ScrollToTop(), container (+3 more)

### Community 39 - "HomePage.tsx"
Cohesion: 0.23
Nodes (11): useOrdersPage(), isFrontpadWarning(), AdminLogin(), AdminPage(), loadDomMax(), ProductEditorRoute(), OrdersSection(), STATUS_FILTERS (+3 more)

### Community 40 - "MobileHome.tsx"
Cohesion: 0.05
Nodes (55): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+47 more)

### Community 41 - "TagFilters.tsx"
Cohesion: 0.29
Nodes (8): updateBody(), updateProduct(), useDeleteProduct(), useToggleProductActive(), useUpdateProduct(), hasMissingArticle(), applyFilteredReorder(), ProductsSection()

### Community 42 - "webhook.js"
Cohesion: 0.52
Nodes (6): applyStatusChange(), constantTimeEqual(), handleStatusWebhook(), readQueryToken(), readWebhookBody(), verifyHookToken()

### Community 43 - "pb.ts"
Cohesion: 0.33
Nodes (4): addons, extras, IMG, sauces

### Community 44 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, preview, typecheck, type (+1 more)

### Community 45 - "AdminSidebar.tsx"
Cohesion: 0.20
Nodes (13): useCreateOrder(), fetchSettings(), mapSettings(), useSettings(), settingsFallback(), useCartTotals(), CheckoutDialog(), CheckoutDialogProps (+5 more)

### Community 46 - "CustomerDrawer.tsx"
Cohesion: 0.12
Nodes (24): useDeleteBanner(), useCreateCategory(), useDeleteCategory(), useUpdateCategory(), BannersSection(), CategoriesSection(), CategoryForm(), Props (+16 more)

### Community 47 - "order/model.ts"
Cohesion: 0.25
Nodes (11): useCreateAddon(), useDeleteAddon(), useUpdateAddon(), Addon, AddonKind, useAdminProducts(), AddonForm(), Props (+3 more)

### Community 49 - "HomePage.tsx"
Cohesion: 0.21
Nodes (9): OrderStatus, FrontpadSettings, FrontpadStockItem, Settings, BADGE_LABEL, ORDER_RULES, resolveBadgeLabel(), SITE (+1 more)

### Community 50 - "invalidateProductRatings"
Cohesion: 0.28
Nodes (8): collectionMutations(), CollectionMutationsConfig, FIELD_CODE_RU, invalidate(), listKeys(), MutationKeys, QueryKey, syncDetail()

### Community 51 - "ProductCard.tsx"
Cohesion: 0.31
Nodes (13): useBadges(), badgeLabel(), PRODUCT_ASPECT_RATIO, minPrice(), isProductStopped(), useStoppedArticles(), ProductCard(), ProductCardProps (+5 more)

### Community 52 - "@radix-ui/react-slot"
Cohesion: 0.06
Nodes (39): bannerKeys, bannerMutations, BannerNote, BannerRecord, CreateBannerInput, fetchBannerById(), fetchBanners(), mapBanner() (+31 more)

### Community 55 - "Sparkline.tsx"
Cohesion: 0.18
Nodes (15): DEFAULT_STATUS_MAP, buildHookUrl(), coerceJsonArray(), decodeByteJson(), getHookToken(), isArrayLike(), loadFrontpadSettings(), pad2() (+7 more)

### Community 56 - "CouponForm.tsx"
Cohesion: 0.13
Nodes (24): addonMutations, AddonRecord, CreateAddonInput, createBody(), fetchAddonById(), fetchAddons(), fetchAddonsByKind(), fetchExtras() (+16 more)

### Community 57 - "SettingsSection.tsx"
Cohesion: 0.29
Nodes (9): frontpadSettingsKeys, settingsKeys, useUpdateSettings(), FrontpadPanel(), parseNonNeg(), SettingsSection(), TabId, TABS (+1 more)

### Community 58 - "AdminPage.tsx"
Cohesion: 0.20
Nodes (7): AdminGate(), AdminLogin, AdminPage, AppRoutes(), EASE, EXIT_ABS, loadMotionFeatures()

### Community 59 - "send.js"
Cohesion: 0.40
Nodes (9): claimOrderSend(), createDryRunJob(), nowPb(), patchFrontpadSettings(), patchOrder(), patchSendFailure(), recordToOrder(), sendOrder() (+1 more)

### Community 60 - "localOrders.ts"
Cohesion: 0.42
Nodes (9): canUseStorage(), getLatestLocalOrderId(), isStoredOrder(), listLocalOrderIds(), load(), prune(), rememberLocalOrder(), save() (+1 more)

### Community 61 - "jobs.js"
Cohesion: 0.24
Nodes (16): backoffMinutes(), buildKindFilter(), claimNextJob(), completeJob(), failJob(), formatPbDateTime(), isJobReady(), parseUpdatedMs() (+8 more)

### Community 62 - "http.js"
Cohesion: 0.36
Nodes (4): call(), extractWarnings(), formEncode(), maskSecret()

### Community 63 - "AddonForm.tsx"
Cohesion: 0.21
Nodes (14): useCoupons(), useDeleteCoupon(), useCustomersPage(), CouponsSection(), STATUS_FILTERS, CustomersSection(), Column, DataTable() (+6 more)

### Community 64 - "banner-image-field.tsx"
Cohesion: 0.14
Nodes (20): useCreateBanner(), useUpdateBanner(), useCreateProduct(), BannerForm(), Props, DEFAULT_NUTRITION, ProductCreateForm(), Props (+12 more)

### Community 65 - "@radix-ui/react-dialog"
Cohesion: 0.31
Nodes (9): useCustomer(), useUpdateCustomer(), CustomerDrawer(), digitsOnly(), FormState, OrderHistoryRow(), parseNonNeg(), Props (+1 more)

### Community 67 - "tailwind-merge"
Cohesion: 0.31
Nodes (9): useCreateStaff(), useDeleteStaff(), useRequestStaffPasswordReset(), useStaff(), useUpdateStaff(), ROLE_FILTERS, ROLE_LABEL, StaffCreateForm() (+1 more)

### Community 69 - "sync.js"
Cohesion: 0.32
Nodes (13): formatPbDateTime(), isNoStopsResponse(), isProductsSyncAllowed(), listAllStock(), normalizeArticle(), parsePrice(), parseSaleFlag(), parseSyncDate() (+5 more)

### Community 70 - "HeroBanner.tsx"
Cohesion: 0.48
Nodes (6): useAddons(), useFrontpadStockArticles(), ArticleMatrix(), cellArticle(), Props, setCellArticle()

### Community 73 - "category/api.ts"
Cohesion: 0.12
Nodes (33): AccountAuth, AccountContext, AccountProvider(), isAbortError(), refreshAuth(), addAddress(), asId(), asString() (+25 more)

### Community 74 - "category/model.ts"
Cohesion: 0.38
Nodes (4): formatGrams(), NutritionHint(), HintMark(), TooltipContent()

### Community 75 - "files.ts"
Cohesion: 0.50
Nodes (4): checkPromo(), updateSettings(), pbErrorMessage(), wrapError()

### Community 76 - "AdminTopbar.tsx"
Cohesion: 0.33
Nodes (6): AdminTopbar(), fetchNewOrdersCount(), newOrdersKey, pb, queryClient, QueryKey

### Community 77 - "NutritionHint.tsx"
Cohesion: 0.21
Nodes (17): formatCouponValue(), useProductBySlug(), fetchStoppedArticles(), isAddonStopped(), isSizeStopped(), isSkuStopped(), isVariantStopped(), stoppedArticlesKey (+9 more)

## Ambiguous Edges - Review These
- `figma-make-app` → `Logo CMYK`  [AMBIGUOUS]
  temp/логотип/лого CMYK.pdf · relation: conceptually_related_to
- `figma-make-app` → `Logo RGB`  [AMBIGUOUS]
  temp/логотип/лого RGB.pdf · relation: conceptually_related_to

## Knowledge Gaps
- **370 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+365 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `figma-make-app` and `Logo CMYK`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `figma-make-app` and `Logo RGB`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `cn()` connect `useCategories` to `banner-image-field.tsx`, `order/model.ts`, `Sushi Catalog UI`, `HeroBanner.tsx`, `MobileTabBar.tsx`, `MobileHome.tsx`, `category/model.ts`, `NutritionHint.tsx`, `CustomerDrawer.tsx`, `AdminSidebar.tsx`, `HomePage.tsx`, `ProductCard.tsx`, `@radix-ui/react-slot`, `ProductEditor.tsx`, `cn`, `FloatingActions.tsx`, `AddonForm.tsx`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **Why does `pb` connect `AdminTopbar.tsx` to `order/api.ts`, `UI Layout Components`, `banner/api.ts`, `addon/api.ts`, `order/model.ts`, `Meal Add-ons UI`, `MobileHome.tsx`, `NutritionHint.tsx`, `invalidateProductRatings`, `@radix-ui/react-slot`, `FloatingActions.tsx`, `CouponForm.tsx`, `category/api.ts`, `cn.ts`, `StickyBar.tsx`, `FloatingActions.tsx`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `Button()` connect `banner-image-field.tsx` to `addon/api.ts`, `@radix-ui/react-dialog`, `tailwind-merge`, `Sushi Catalog UI`, `HomePage.tsx`, `AdminTopbar.tsx`, `AdminSidebar.tsx`, `NutritionHint.tsx`, `CustomerDrawer.tsx`, `order/model.ts`, `useCategories`, `ProductCard.tsx`, `@radix-ui/react-slot`, `cn`, `SettingsSection.tsx`, `StickyBar.tsx`, `FloatingActions.tsx`, `AddonForm.tsx`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _370 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `addon/api.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13768115942028986 - nodes in this community are weakly interconnected._