# Graph Report - shahlik  (2026-08-23)

## Corpus Check
- 156 files · ~1,358,568 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1054 nodes · 2763 edges · 57 communities (48 shown, 9 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 70 edges (avg confidence: 0.56)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `41bfbdbe`
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
- articles.ts
- files.ts
- category/api.ts
- pb.ts
- package.json
- AdminSidebar.tsx
- CustomerDrawer.tsx
- order/model.ts
- lucide-react
- invalidateProductRatings
- pocketbase
- @radix-ui/react-slot
- sonner
- @tanstack/react-query
- @radix-ui/react-dialog
- react-router-dom
- tailwind-merge

## God Nodes (most connected - your core abstractions)
1. `cn()` - 105 edges
2. `formatPrice()` - 37 edges
3. `Button()` - 36 edges
4. `ProductEditor()` - 23 edges
5. `useCategories()` - 22 edges
6. `pb` - 20 edges
7. `Input()` - 20 edges
8. `useAdminProducts()` - 18 edges
9. `compilerOptions` - 18 edges
10. `settingsFallback()` - 17 edges

## Surprising Connections (you probably didn't know these)
- `Logo CMYK` --conceptually_related_to--> `figma-make-app`  [AMBIGUOUS]
  temp/логотип/лого CMYK.pdf → AGENTS.md
- `Logo RGB` --conceptually_related_to--> `figma-make-app`  [AMBIGUOUS]
  temp/логотип/лого RGB.pdf → AGENTS.md
- `AdminGate()` --calls--> `useAdminAuth()`  [EXTRACTED]
  apps/shashlik-web/src/app/router.tsx → apps/shashlik-web/src/shared/api/auth.tsx
- `ProductEditorRoute()` --calls--> `useAdminProducts()`  [EXTRACTED]
  apps/shashlik-web/src/pages/admin/AdminPage.tsx → apps/shashlik-web/src/entities/product/api.ts
- `useDuplicateProduct()` --indirect_call--> `product()`  [INFERRED]
  apps/shashlik-web/src/entities/product/api.ts → apps/shashlik-web/src/mocks/products.ts

## Import Cycles
- None detected.

## Communities (57 total, 9 thin omitted)

### Community 0 - "addon/api.ts"
Cohesion: 0.14
Nodes (19): fetchTags(), mapTag(), TagInput, tagKeys, tagMutations, TagRecord, tagsForCategory(), useCategoryTags() (+11 more)

### Community 1 - "UI Layout Components"
Cohesion: 0.10
Nodes (20): ALL_CATEGORY, Category, CategoryId, KNOWN_CATEGORY_IDS, KnownCategoryId, DEFAULT_CRITERIA, ProductBadge, ProductRating (+12 more)

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
Cohesion: 0.06
Nodes (34): App(), readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), useTheme(), AdminGate() (+26 more)

### Community 6 - "Meal Add-ons UI"
Cohesion: 0.18
Nodes (18): calcCouponDiscount(), articleFor(), cartLineTitle(), findSize(), findVariant(), priceOf(), SkuCell, addonFromCache() (+10 more)

### Community 7 - "Checkout Flow UI"
Cohesion: 0.11
Nodes (18): API-правила (PB Rules), Env / инфра, `pb_hooks` (JSVM), TASK_DB — подключение PocketBase (сайт + админка) с прицелом на Frontpad, Архитектура, Зона БД — делаю сам (PocketBase Admin UI, `pb_hooks`, env), Зона кода — делает агент (после того как коллекции выше созданы), Коллекции (имена полей = 1:1 с `entities/*/model.ts`, где возможно) (+10 more)

### Community 8 - "package.json"
Cohesion: 0.12
Nodes (17): dependencies, class-variance-authority, clsx, motion, @radix-ui/react-tooltip, react, react-dom, react-easy-crop (+9 more)

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
Cohesion: 0.07
Nodes (45): CategoryIcon(), Props, FrontpadJob, FrontpadJobKind, FrontpadJobStatus, asNumberList(), asStatusMap(), asStringList() (+37 more)

### Community 21 - "product/api.ts"
Cohesion: 0.15
Nodes (14): AppliedCoupon, formatCouponValue(), useCreateOrder(), DeliveryMode, ResolvedLine, AddPayload, CartAddon, CartItem (+6 more)

### Community 22 - "ProductEditor.tsx"
Cohesion: 0.13
Nodes (21): couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail, PromoCheckOk (+13 more)

### Community 23 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 24 - "cn"
Cohesion: 0.07
Nodes (36): bannerFormData(), bannerKeys, bannerMutations, BannerNote, BannerRecord, CreateBannerInput, fetchBannerById(), fetchBanners() (+28 more)

### Community 25 - "HomePage.tsx"
Cohesion: 0.21
Nodes (11): checkPromo(), collectionMutations(), CollectionMutationsConfig, FIELD_CODE_RU, invalidate(), listKeys(), MutationKeys, pbErrorMessage() (+3 more)

### Community 26 - "category/api.ts"
Cohesion: 0.14
Nodes (16): updateBody(), updateProduct(), useDeleteProduct(), useToggleProductActive(), useUpdateProduct(), hasMissingArticle(), MeatIcon, imagesFromProduct() (+8 more)

### Community 27 - "cn.ts"
Cohesion: 0.29
Nodes (6): AdminTopbar(), fetchNewOrdersCount(), newOrdersKey, pb, queryClient, QueryKey

### Community 28 - "StickyBar.tsx"
Cohesion: 0.13
Nodes (23): BadgeInput, badgeKeys, badgeMutations, BadgeRecord, fetchBadges(), mapBadge(), seedFallback(), useBadges() (+15 more)

### Community 29 - "order/model.ts"
Cohesion: 0.15
Nodes (11): Addon, addons, extras, IMG, sauces, AddonRow(), Props, SIZES (+3 more)

### Community 30 - "FloatingActions.tsx"
Cohesion: 0.24
Nodes (11): useActiveSyncJobs(), useEnqueueSyncJob(), useStoppedStock(), useUpdateFrontpadSettings(), FrontpadPanel(), Props, STATUS_OPTIONS, formatDateTime() (+3 more)

### Community 31 - "useCategories"
Cohesion: 0.15
Nodes (17): CreateStaffInput, fetchStaff(), mapStaff(), mapStaffRequired(), staffKeys, StaffMember, staffMutations, StaffRecord (+9 more)

### Community 32 - "order/api.ts"
Cohesion: 0.10
Nodes (30): adminReviewKeys, buildOrdersFilter(), createOrder(), CreateOrderInput, CreateReviewInput, fetchActiveResendJobs(), fetchAdminReviews(), fetchOrderById() (+22 more)

### Community 33 - "customer/api.ts"
Cohesion: 0.06
Nodes (80): useCreateAddon(), useDeleteAddon(), useUpdateAddon(), AddonKind, BANNER_ASPECT_RATIO, useCreateCategory(), useDeleteCategory(), useUpdateCategory() (+72 more)

### Community 34 - "banner/api.ts"
Cohesion: 0.13
Nodes (24): adminProductKeys, createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchAdminProducts() (+16 more)

### Community 35 - "addon/api.ts"
Cohesion: 0.21
Nodes (14): addonKeys, addonMutations, AddonRecord, CreateAddonInput, fetchAddonById(), fetchAddons(), fetchAddonsByKind(), fetchExtras() (+6 more)

### Community 36 - "order/model.ts"
Cohesion: 0.13
Nodes (20): OrderLineSnapshot, buildSeries(), buildTopProducts(), countByFilter(), DashboardData, dashboardKeys, dayKey(), fetchDashboard() (+12 more)

### Community 37 - "articles.ts"
Cohesion: 0.16
Nodes (16): buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams, CustomersPageResult, fetchCustomerById() (+8 more)

### Community 38 - "MobileTabBar.tsx"
Cohesion: 0.20
Nodes (16): orderJobKeys, orderKeys, useOrder(), useOrderJobs(), useResendOrder(), useUpdateOrderStatus(), AdminLogin(), formatAddress() (+8 more)

### Community 39 - "HomePage.tsx"
Cohesion: 0.06
Nodes (57): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+49 more)

### Community 40 - "articles.ts"
Cohesion: 0.23
Nodes (13): useAddons(), useFrontpadStockArticles(), articleConflictMessage(), ArticleExclude, ArticleRef, cellLabel(), collectArticleConflicts(), isExcludedCell() (+5 more)

### Community 41 - "files.ts"
Cohesion: 0.19
Nodes (14): createBody(), updateBody(), filenamesOf(), FileRecord, imageFilenames(), imageUrl(), imageUrls(), toFormData() (+6 more)

### Community 42 - "category/api.ts"
Cohesion: 0.47
Nodes (5): canvasToBlob(), CropArea, cropImageToFile(), loadImage(), readImageSize()

### Community 44 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, preview, typecheck, type (+1 more)

### Community 45 - "AdminSidebar.tsx"
Cohesion: 0.40
Nodes (3): SITE, MobileHeader(), Props

### Community 46 - "CustomerDrawer.tsx"
Cohesion: 0.17
Nodes (18): useUpdateCustomer(), useOrdersPage(), ProductCardCompact(), Props, CustomerDrawer(), digitsOnly(), FormState, OrderHistoryRow() (+10 more)

### Community 47 - "order/model.ts"
Cohesion: 0.16
Nodes (12): Order, ORDER_STATUS_FLOW, ORDER_STATUS_LABEL, ORDER_STATUS_SOURCE_LABEL, OrderAddressParts, OrderLineAddon, OrderStatus, OrderStatusSource (+4 more)

### Community 49 - "lucide-react"
Cohesion: 0.12
Nodes (17): ProductNutrition, RatingOverlay(), FreshStamp(), STAMP_GLYPHS, formatGrams(), NutritionHint(), pluralize(), scoreColor() (+9 more)

### Community 50 - "invalidateProductRatings"
Cohesion: 0.38
Nodes (7): invalidateProductRatings(), useCreateReview(), useDeleteReview(), useToggleReviewPublished(), useUpdateReview(), ReviewForm(), ReviewsSection()

## Ambiguous Edges - Review These
- `figma-make-app` → `Logo CMYK`  [AMBIGUOUS]
  temp/логотип/лого CMYK.pdf · relation: conceptually_related_to
- `figma-make-app` → `Logo RGB`  [AMBIGUOUS]
  temp/логотип/лого RGB.pdf · relation: conceptually_related_to

## Knowledge Gaps
- **318 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+313 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `figma-make-app` and `Logo CMYK`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `figma-make-app` and `Logo RGB`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `cn()` connect `customer/api.ts` to `order/model.ts`, `Sushi Catalog UI`, `Meal Add-ons UI`, `HomePage.tsx`, `articles.ts`, `CustomerDrawer.tsx`, `lucide-react`, `FloatingActions.tsx`, `product/api.ts`, `cn`, `category/api.ts`, `StickyBar.tsx`, `order/model.ts`, `FloatingActions.tsx`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Why does `pb` connect `cn.ts` to `order/api.ts`, `addon/api.ts`, `banner/api.ts`, `addon/api.ts`, `order/model.ts`, `articles.ts`, `Sushi Catalog UI`, `HomePage.tsx`, `articles.ts`, `files.ts`, `FloatingActions.tsx`, `ProductEditor.tsx`, `cn`, `HomePage.tsx`, `StickyBar.tsx`, `useCategories`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Why does `Button()` connect `customer/api.ts` to `addon/api.ts`, `MobileTabBar.tsx`, `CustomerDrawer.tsx`, `lucide-react`, `product/api.ts`, `ProductEditor.tsx`, `category/api.ts`, `cn.ts`, `StickyBar.tsx`, `FloatingActions.tsx`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _318 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `addon/api.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13768115942028986 - nodes in this community are weakly interconnected._