# Graph Report - shahlik  (2026-08-23)

## Corpus Check
- 168 files · ~1,369,574 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1193 nodes · 3053 edges · 67 communities (58 shown, 9 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 98 edges (avg confidence: 0.54)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0b0a7ad5`
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
- webhook.js
- pb.ts
- package.json
- AdminSidebar.tsx
- CustomerDrawer.tsx
- @radix-ui/react-slot
- invalidateProductRatings
- ProductCard.tsx
- @radix-ui/react-slot
- sonner
- @tanstack/react-query
- Sparkline.tsx
- ReviewsSection
- AdminPage.tsx
- send.js
- selectors.ts
- jobs.js
- http.js
- AddonForm.tsx
- @radix-ui/react-dialog
- react-router-dom
- tailwind-merge
- sync.js
- store.ts
- counts.ts

## God Nodes (most connected - your core abstractions)
1. `cn()` - 105 edges
2. `formatPrice()` - 37 edges
3. `Button()` - 36 edges
4. `ProductEditor()` - 23 edges
5. `useCategories()` - 22 edges
6. `pb` - 21 edges
7. `Input()` - 20 edges
8. `ProductPage()` - 19 edges
9. `useAdminProducts()` - 18 edges
10. `compilerOptions` - 18 edges

## Surprising Connections (you probably didn't know these)
- `Logo CMYK` --conceptually_related_to--> `figma-make-app`  [AMBIGUOUS]
  temp/логотип/лого CMYK.pdf → AGENTS.md
- `Logo RGB` --conceptually_related_to--> `figma-make-app`  [AMBIGUOUS]
  temp/логотип/лого RGB.pdf → AGENTS.md
- `AdminGate()` --calls--> `useAdminAuth()`  [EXTRACTED]
  apps/shashlik-web/src/app/router.tsx → apps/shashlik-web/src/shared/api/auth.tsx
- `resolveBadgeLabel()` --calls--> `badgeLabel()`  [EXTRACTED]
  apps/shashlik-web/src/shared/config/site.ts → apps/shashlik-web/src/entities/badge/model.ts
- `useDuplicateProduct()` --indirect_call--> `product()`  [INFERRED]
  apps/shashlik-web/src/entities/product/api.ts → apps/shashlik-web/src/mocks/products.ts

## Import Cycles
- None detected.

## Communities (67 total, 9 thin omitted)

### Community 0 - "addon/api.ts"
Cohesion: 0.13
Nodes (20): fetchTags(), mapTag(), TagInput, tagKeys, tagMutations, TagRecord, tagsForCategory(), useCategoryTags() (+12 more)

### Community 1 - "UI Layout Components"
Cohesion: 0.20
Nodes (7): AdminGate(), AdminLogin, AdminPage, AppRoutes(), EASE, EXIT_ABS, loadMotionFeatures()

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
Cohesion: 0.18
Nodes (14): GuardedSection(), AdminAuth, AdminAuthContext, AdminAuthProvider(), authErrorMessage(), can(), isAbortError(), isStaffRecord() (+6 more)

### Community 6 - "Meal Add-ons UI"
Cohesion: 0.15
Nodes (17): CreateStaffInput, fetchStaff(), mapStaff(), mapStaffRequired(), staffKeys, StaffMember, staffMutations, StaffRecord (+9 more)

### Community 7 - "Checkout Flow UI"
Cohesion: 0.11
Nodes (18): API-правила (PB Rules), Env / инфра, `pb_hooks` (JSVM), TASK_DB — подключение PocketBase (сайт + админка) с прицелом на Frontpad, Архитектура, Зона БД — делаю сам (PocketBase Admin UI, `pb_hooks`, env), Зона кода — делает агент (после того как коллекции выше созданы), Коллекции (имена полей = 1:1 с `entities/*/model.ts`, где возможно) (+10 more)

### Community 8 - "package.json"
Cohesion: 0.12
Nodes (17): dependencies, clsx, lucide-react, motion, @radix-ui/react-tooltip, react, react-dom, react-easy-crop (+9 more)

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
Cohesion: 0.06
Nodes (54): CategoryIcon(), Props, checkPromo(), asNumberList(), asStatusMap(), asStringList(), enqueueSyncJob(), fetchActiveSyncJobs() (+46 more)

### Community 21 - "product/api.ts"
Cohesion: 0.07
Nodes (26): 1. env процесса `pocketbase` (systemd unit, `Environment=`), 2. Правки коллекций в `/_/` (и синхронно в `Tasks/schema.json`), 3. Rate limits PocketBase (`/_/` → Settings → Rate limits), 4. Настройки Frontpad (оператор), 5. Деплой `pb_hooks`, TASK_inter — интеграция с кассой Frontpad (боевая), Зона БД / инфры — делает владелец, агент не трогает, Зона кода — агент (+18 more)

### Community 22 - "ProductEditor.tsx"
Cohesion: 0.12
Nodes (28): AddonKind, useUpdateCustomer(), useOrdersPage(), frontpadSettingsKeys, useUpdateFrontpadSettings(), Props, CustomerDrawer(), digitsOnly() (+20 more)

### Community 23 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 24 - "cn"
Cohesion: 0.05
Nodes (48): useAddons(), ALL_CATEGORY, Category, CategoryId, KNOWN_CATEGORY_IDS, KnownCategoryId, useAdminProducts(), useDeleteProduct() (+40 more)

### Community 25 - "HomePage.tsx"
Cohesion: 0.31
Nodes (7): readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), useTheme(), ThemeToggle()

### Community 26 - "category/api.ts"
Cohesion: 0.18
Nodes (17): addonMutations, AddonRecord, CreateAddonInput, createBody(), fetchAddonById(), fetchAddons(), fetchAddonsByKind(), fetchExtras() (+9 more)

### Community 27 - "cn.ts"
Cohesion: 0.43
Nodes (6): filenamesOf(), FileRecord, imageFilenames(), imageUrl(), imageUrls(), ToFormDataOptions

### Community 28 - "StickyBar.tsx"
Cohesion: 0.11
Nodes (22): couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail, PromoCheckOk (+14 more)

### Community 29 - "order/model.ts"
Cohesion: 0.27
Nodes (6): App(), ScrollToTop(), container, Glass(), GlassDefs(), GlassProps

### Community 30 - "FloatingActions.tsx"
Cohesion: 0.17
Nodes (15): BadgeInput, badgeKeys, badgeMutations, BadgeRecord, fetchBadges(), mapBadge(), seedFallback(), useCreateBadge() (+7 more)

### Community 31 - "useCategories"
Cohesion: 0.16
Nodes (14): AdminTopbar(), fetchNewOrdersCount(), newOrdersKey, collectionMutations(), CollectionMutationsConfig, FIELD_CODE_RU, invalidate(), listKeys() (+6 more)

### Community 32 - "order/api.ts"
Cohesion: 0.06
Nodes (55): adminReviewKeys, buildOrdersFilter(), createOrder(), CreateOrderInput, CreateReviewInput, fetchActiveResendJobs(), fetchAdminReviews(), fetchOrderById() (+47 more)

### Community 33 - "customer/api.ts"
Cohesion: 0.17
Nodes (24): articleFor(), assertArticleAvailable(), buildDescr(), buildNewOrderPayload(), calcCouponDiscount(), checkPromo(), countRecentOrdersByPhone(), findSize() (+16 more)

### Community 34 - "banner/api.ts"
Cohesion: 0.11
Nodes (28): adminProductKeys, createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchAdminProducts() (+20 more)

### Community 35 - "addon/api.ts"
Cohesion: 0.19
Nodes (16): bannerFormData(), bannerKeys, bannerMutations, BannerRecord, CreateBannerInput, fetchBannerById(), fetchBanners(), mapBanner() (+8 more)

### Community 36 - "order/model.ts"
Cohesion: 0.13
Nodes (22): buildSeries(), buildTopProducts(), countByFilter(), DashboardData, dashboardKeys, DashboardSection(), dayKey(), fetchDashboard() (+14 more)

### Community 38 - "MobileTabBar.tsx"
Cohesion: 0.14
Nodes (35): useDeleteBanner(), useDeleteCategory(), KIND_FILTERS, BannersSection(), CategoriesSection(), STATUS_FILTERS, STATUS_FILTERS, STATUS_FILTERS (+27 more)

### Community 39 - "HomePage.tsx"
Cohesion: 0.06
Nodes (54): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+46 more)

### Community 42 - "webhook.js"
Cohesion: 0.52
Nodes (6): applyStatusChange(), constantTimeEqual(), handleStatusWebhook(), readQueryToken(), readWebhookBody(), verifyHookToken()

### Community 43 - "pb.ts"
Cohesion: 0.29
Nodes (11): invalidateProductRatings(), useAdminReviews(), useCreateReview(), useDeleteReview(), useToggleReviewPublished(), useUpdateReview(), ProductOption, ReviewForm() (+3 more)

### Community 44 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, preview, typecheck, type (+1 more)

### Community 45 - "AdminSidebar.tsx"
Cohesion: 0.13
Nodes (20): useDeleteAddon(), useDeleteCoupon(), AdminLogin(), AdminPage(), loadDomMax(), AddonsSection(), CouponsSection(), OrderHistoryRow() (+12 more)

### Community 46 - "CustomerDrawer.tsx"
Cohesion: 0.11
Nodes (25): CartToggle(), formatOrderSum(), Props, AddonRow(), Props, FreshStamp(), STAMP_GLYPHS, cn() (+17 more)

### Community 50 - "invalidateProductRatings"
Cohesion: 0.16
Nodes (16): buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams, CustomersPageResult, fetchCustomerById() (+8 more)

### Community 51 - "ProductCard.tsx"
Cohesion: 0.31
Nodes (13): useBadges(), badgeLabel(), PRODUCT_ASPECT_RATIO, minPrice(), isProductStopped(), useStoppedArticles(), ProductCard(), ProductCardProps (+5 more)

### Community 52 - "@radix-ui/react-slot"
Cohesion: 0.08
Nodes (30): BannerNote, BANNER_ASPECT_RATIO, Banner, banners, Props, canvasToBlob(), compressImage(), CompressOptions (+22 more)

### Community 55 - "Sparkline.tsx"
Cohesion: 0.26
Nodes (9): DEFAULT_STATUS_MAP, buildHookUrl(), getHookToken(), loadFrontpadSettings(), parseJsonField(), readDateField(), toNumberArray(), toStatusMap() (+1 more)

### Community 58 - "AdminPage.tsx"
Cohesion: 0.36
Nodes (6): useCreateCategory(), useUpdateCategory(), CategoryForm(), Props, CATEGORY_ICONS, CategoryIconPath

### Community 59 - "send.js"
Cohesion: 0.36
Nodes (10): claimOrderSend(), createDryRunJob(), formatPbDateTime(), isSentAtSet(), pad2(), patchFrontpadSettings(), patchOrder(), recordToOrder() (+2 more)

### Community 60 - "selectors.ts"
Cohesion: 0.11
Nodes (28): addonKeys, Addon, productKeys, articleFor(), cartLineTitle(), findSize(), findVariant(), hasMissingArticle() (+20 more)

### Community 61 - "jobs.js"
Cohesion: 0.23
Nodes (16): backoffMinutes(), buildKindFilter(), claimNextJob(), completeJob(), failJob(), formatPbDateTime(), isJobReady(), pad2() (+8 more)

### Community 62 - "http.js"
Cohesion: 0.43
Nodes (4): call(), extractWarnings(), formEncode(), maskSecret()

### Community 63 - "AddonForm.tsx"
Cohesion: 0.27
Nodes (8): SectionStub(), ADMIN_NAV, AdminNavItem, AdminRole, AdminSectionId, AdminSidebar(), PILL, Props

### Community 69 - "sync.js"
Cohesion: 0.30
Nodes (14): formatPbDateTime(), isNoStopsResponse(), isProductsSyncAllowed(), listAllStock(), normalizeArticle(), pad2(), parsePrice(), parseSaleFlag() (+6 more)

### Community 70 - "store.ts"
Cohesion: 0.15
Nodes (12): isAddonStopped(), AddPayload, CartAddon, CartItem, CartState, EMPTY_ADDRESS_PARTS, useCartStore, CartLineRow() (+4 more)

### Community 75 - "counts.ts"
Cohesion: 0.50
Nodes (4): adminCountKeys, AdminCounts, fetchAdminCounts(), useAdminCounts()

## Ambiguous Edges - Review These
- `figma-make-app` → `Logo CMYK`  [AMBIGUOUS]
  temp/логотип/лого CMYK.pdf · relation: conceptually_related_to
- `figma-make-app` → `Logo RGB`  [AMBIGUOUS]
  temp/логотип/лого RGB.pdf · relation: conceptually_related_to

## Knowledge Gaps
- **342 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+337 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `figma-make-app` and `Logo CMYK`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `figma-make-app` and `Logo RGB`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `cn()` connect `CustomerDrawer.tsx` to `order/api.ts`, `order/model.ts`, `store.ts`, `MobileTabBar.tsx`, `HomePage.tsx`, `ProductCard.tsx`, `FloatingActions.tsx`, `@radix-ui/react-slot`, `ProductEditor.tsx`, `cn`, `HomePage.tsx`, `AdminPage.tsx`, `selectors.ts`, `order/model.ts`, `FloatingActions.tsx`, `AddonForm.tsx`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **Why does `pb` connect `useCategories` to `order/api.ts`, `addon/api.ts`, `banner/api.ts`, `addon/api.ts`, `order/model.ts`, `Sushi Catalog UI`, `Meal Add-ons UI`, `HomePage.tsx`, `counts.ts`, `selectors.ts`, `invalidateProductRatings`, `FloatingActions.tsx`, `cn`, `category/api.ts`, `cn.ts`, `StickyBar.tsx`, `FloatingActions.tsx`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `formatPrice()` connect `AdminSidebar.tsx` to `order/api.ts`, `order/model.ts`, `MobileTabBar.tsx`, `store.ts`, `HomePage.tsx`, `CustomerDrawer.tsx`, `ProductCard.tsx`, `FloatingActions.tsx`, `ProductEditor.tsx`, `cn`, `selectors.ts`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _342 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `addon/api.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13 - nodes in this community are weakly interconnected._