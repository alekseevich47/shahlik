# Graph Report - shahlik  (2026-08-24)

## Corpus Check
- 168 files · ~1,370,850 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1199 nodes · 3072 edges · 80 communities (71 shown, 9 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 103 edges (avg confidence: 0.54)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `135bd4cc`
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
- ReviewsSection
- AdminPage.tsx
- send.js
- selectors.ts
- jobs.js
- http.js
- AddonForm.tsx
- products.ts
- @radix-ui/react-dialog
- react-router-dom
- tailwind-merge
- addon/model.ts
- sync.js
- store.ts
- category/api.ts
- articles.ts
- counts.ts
- crud.ts
- NutritionHint.tsx
- toUploadFormData
- invalidateProductRatings

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

## Communities (80 total, 9 thin omitted)

### Community 0 - "addon/api.ts"
Cohesion: 0.14
Nodes (19): fetchTags(), mapTag(), TagInput, tagKeys, tagMutations, TagRecord, tagsForCategory(), useCategoryTags() (+11 more)

### Community 1 - "UI Layout Components"
Cohesion: 0.15
Nodes (21): useCoupons(), useDeleteCoupon(), useDeleteStaff(), useRequestStaffPasswordReset(), useStaff(), useUpdateStaff(), CouponsSection(), STATUS_FILTERS (+13 more)

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
Cohesion: 0.07
Nodes (30): App(), readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), AdminGate(), AdminLogin (+22 more)

### Community 6 - "Meal Add-ons UI"
Cohesion: 0.18
Nodes (12): CreateStaffInput, fetchStaff(), mapStaff(), mapStaffRequired(), staffKeys, StaffMember, staffMutations, StaffRecord (+4 more)

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
Nodes (56): asNumberList(), asStatusMap(), asStringList(), enqueueSyncJob(), fetchActiveSyncJobs(), fetchFrontpadSettings(), fetchSettings(), fetchStoppedStock() (+48 more)

### Community 21 - "product/api.ts"
Cohesion: 0.07
Nodes (26): 1. env процесса `pocketbase` (systemd unit, `Environment=`), 2. Правки коллекций в `/_/` (и синхронно в `Tasks/schema.json`), 3. Rate limits PocketBase (`/_/` → Settings → Rate limits), 4. Настройки Frontpad (оператор), 5. Деплой `pb_hooks`, TASK_inter — интеграция с кассой Frontpad (боевая), Зона БД / инфры — делает владелец, агент не трогает, Зона кода — агент (+18 more)

### Community 22 - "ProductEditor.tsx"
Cohesion: 0.20
Nodes (13): useAdminProducts(), useCreateProduct(), useToggleProductActive(), loadDomMax(), ProductEditorRoute(), DEFAULT_NUTRITION, ProductCreateForm(), Props (+5 more)

### Community 23 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 24 - "cn"
Cohesion: 0.13
Nodes (21): useAddons(), useDeleteProduct(), useDuplicateProduct(), useFrontpadStockArticles(), useUpdateProduct(), MeatIcon, ProductBadge, ProductSize (+13 more)

### Community 25 - "HomePage.tsx"
Cohesion: 0.18
Nodes (10): useTheme(), CartToggle(), formatOrderSum(), Props, ThemeToggle(), FloatingActions(), Props, TONE (+2 more)

### Community 26 - "category/api.ts"
Cohesion: 0.21
Nodes (14): addonKeys, addonMutations, AddonRecord, CreateAddonInput, fetchAddonById(), fetchAddons(), fetchAddonsByKind(), fetchExtras() (+6 more)

### Community 27 - "cn.ts"
Cohesion: 0.36
Nodes (8): mapProduct(), mapTagSlugs(), filenamesOf(), FileRecord, imageFilenames(), imageUrl(), imageUrls(), ToFormDataOptions

### Community 28 - "StickyBar.tsx"
Cohesion: 0.16
Nodes (13): couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail, PromoCheckOk (+5 more)

### Community 29 - "order/model.ts"
Cohesion: 0.21
Nodes (17): useProductBySlug(), articleFor(), fetchStoppedArticles(), isAddonStopped(), isSizeStopped(), isSkuStopped(), isVariantStopped(), stoppedArticlesKey (+9 more)

### Community 30 - "FloatingActions.tsx"
Cohesion: 0.16
Nodes (15): BadgeInput, badgeKeys, badgeMutations, BadgeRecord, fetchBadges(), mapBadge(), seedFallback(), useCreateBadge() (+7 more)

### Community 31 - "useCategories"
Cohesion: 0.29
Nodes (6): AdminTopbar(), fetchNewOrdersCount(), newOrdersKey, pb, queryClient, QueryKey

### Community 32 - "order/api.ts"
Cohesion: 0.09
Nodes (30): adminReviewKeys, buildOrdersFilter(), CreateOrderInput, CreateReviewInput, fetchActiveResendJobs(), fetchAdminReviews(), fetchOrderById(), fetchOrders() (+22 more)

### Community 33 - "customer/api.ts"
Cohesion: 0.17
Nodes (28): articleFor(), assertArticleAvailable(), buildDescr(), buildNewOrderPayload(), calcCouponDiscount(), checkPromo(), countRecentOrdersByPhone(), findSize() (+20 more)

### Community 34 - "banner/api.ts"
Cohesion: 0.12
Nodes (21): adminProductKeys, createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchAdminProducts() (+13 more)

### Community 35 - "addon/api.ts"
Cohesion: 0.15
Nodes (17): bannerFormData(), bannerKeys, bannerMutations, BannerNote, BannerRecord, CreateBannerInput, fetchBannerById(), fetchBanners() (+9 more)

### Community 36 - "order/model.ts"
Cohesion: 0.13
Nodes (22): buildSeries(), buildTopProducts(), countByFilter(), DashboardData, dashboardKeys, DashboardSection(), dayKey(), fetchDashboard() (+14 more)

### Community 38 - "MobileTabBar.tsx"
Cohesion: 0.15
Nodes (21): useDeleteBanner(), useCreateCategory(), useDeleteCategory(), useUpdateCategory(), BannersSection(), CategoriesSection(), CategoryForm(), Props (+13 more)

### Community 39 - "HomePage.tsx"
Cohesion: 0.15
Nodes (12): CartPanelState, useCartPanelStore, CartDock(), catalogSectionId(), Options, CatalogCategorySection(), Props, Props (+4 more)

### Community 40 - "MobileHome.tsx"
Cohesion: 0.21
Nodes (12): useBanners(), useCategories(), useAddProduct(), groupProductsByCategory(), useCatalogScrollSpy(), DesktopHome(), MobileHome(), Props (+4 more)

### Community 41 - "TagFilters.tsx"
Cohesion: 0.16
Nodes (11): ALL_CATEGORY, Category, CategoryId, KNOWN_CATEGORY_IDS, KnownCategoryId, ALL_TAG, TagFilterId, categories (+3 more)

### Community 42 - "webhook.js"
Cohesion: 0.52
Nodes (6): applyStatusChange(), constantTimeEqual(), handleStatusWebhook(), readQueryToken(), readWebhookBody(), verifyHookToken()

### Community 43 - "pb.ts"
Cohesion: 0.21
Nodes (13): useAdminReviews(), useDeleteReview(), useToggleReviewPublished(), ProductOption, ReviewFormProps, ReviewsSection(), STATUS_FILTERS, Props (+5 more)

### Community 44 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, preview, typecheck, type (+1 more)

### Community 45 - "AdminSidebar.tsx"
Cohesion: 0.11
Nodes (34): useUpdateCustomer(), useOrder(), useOrderJobs(), useOrdersPage(), useResendOrder(), useUpdateOrderStatus(), ORDER_STATUS_LABEL, AdminLogin() (+26 more)

### Community 46 - "CustomerDrawer.tsx"
Cohesion: 0.11
Nodes (24): CategoryIcon(), Props, PreviewToggle(), FreshStamp(), STAMP_GLYPHS, cn(), Chip(), ChipProps (+16 more)

### Community 47 - "order/model.ts"
Cohesion: 0.14
Nodes (14): FrontpadJob, FrontpadJobKind, FrontpadJobStatus, Order, ORDER_STATUS_FLOW, ORDER_STATUS_SOURCE_LABEL, OrderLineAddon, OrderLineSnapshot (+6 more)

### Community 49 - "HomePage.tsx"
Cohesion: 0.21
Nodes (12): fetchProducts(), useProducts(), SearchDialog(), SearchDialogProps, HomePage(), useIsDesktop(), useIsWide(), useMediaQuery() (+4 more)

### Community 50 - "invalidateProductRatings"
Cohesion: 0.16
Nodes (16): buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams, CustomersPageResult, fetchCustomerById() (+8 more)

### Community 51 - "ProductCard.tsx"
Cohesion: 0.28
Nodes (12): useBadges(), badgeLabel(), PRODUCT_ASPECT_RATIO, minPrice(), isProductStopped(), ProductCard(), ProductCardProps, ProductCardCompact() (+4 more)

### Community 52 - "@radix-ui/react-slot"
Cohesion: 0.11
Nodes (24): BANNER_ASPECT_RATIO, canvasToBlob(), compressImage(), CompressOptions, loadImage(), canvasToBlob(), CropArea, cropImageToFile() (+16 more)

### Community 55 - "Sparkline.tsx"
Cohesion: 0.19
Nodes (12): DEFAULT_STATUS_MAP, buildHookUrl(), getHookToken(), loadFrontpadSettings(), pad2(), parseJsonField(), readDateField(), readPbDateTime() (+4 more)

### Community 56 - "CouponForm.tsx"
Cohesion: 0.20
Nodes (9): useCreateCoupon(), useUpdateCoupon(), Props, CouponForm(), KIND_OPTIONS, Props, toDateInput(), SheetContent() (+1 more)

### Community 58 - "AdminPage.tsx"
Cohesion: 0.26
Nodes (9): useCreateAddon(), useDeleteAddon(), useUpdateAddon(), AddonKind, AddonForm(), Props, AddonsSection(), KIND_FILTERS (+1 more)

### Community 59 - "send.js"
Cohesion: 0.40
Nodes (9): claimOrderSend(), createDryRunJob(), nowPb(), patchFrontpadSettings(), patchOrder(), patchSendFailure(), recordToOrder(), sendOrder() (+1 more)

### Community 60 - "selectors.ts"
Cohesion: 0.19
Nodes (16): calcCouponDiscount(), cartLineTitle(), findSize(), findVariant(), hasMissingArticle(), needsChooser(), priceOf(), SkuCell (+8 more)

### Community 61 - "jobs.js"
Cohesion: 0.24
Nodes (16): backoffMinutes(), buildKindFilter(), claimNextJob(), completeJob(), failJob(), formatPbDateTime(), isJobReady(), parseUpdatedMs() (+8 more)

### Community 62 - "http.js"
Cohesion: 0.43
Nodes (4): call(), extractWarnings(), formEncode(), maskSecret()

### Community 63 - "AddonForm.tsx"
Cohesion: 0.21
Nodes (10): checkPromo(), formatCouponValue(), createOrder(), useCreateOrder(), updateSettings(), CartPanel(), MODE_OPTIONS, SumRow() (+2 more)

### Community 64 - "products.ts"
Cohesion: 0.18
Nodes (8): MEAT_VARIANTS, NUTRITION_BY_CATEGORY, product(), products, shawarma(), SHAWARMA_SIZES, Spec, STOCK

### Community 68 - "addon/model.ts"
Cohesion: 0.22
Nodes (7): Addon, addons, extras, IMG, sauces, AddonRow(), Props

### Community 69 - "sync.js"
Cohesion: 0.32
Nodes (13): formatPbDateTime(), isNoStopsResponse(), isProductsSyncAllowed(), listAllStock(), normalizeArticle(), parsePrice(), parseSaleFlag(), parseSyncDate() (+5 more)

### Community 70 - "store.ts"
Cohesion: 0.20
Nodes (7): DeliveryMode, OrderAddressParts, AddPayload, CartAddon, CartItem, CartState, EMPTY_ADDRESS_PARTS

### Community 73 - "category/api.ts"
Cohesion: 0.27
Nodes (9): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+1 more)

### Community 74 - "articles.ts"
Cohesion: 0.36
Nodes (7): articleConflictMessage(), ArticleExclude, ArticleRef, cellLabel(), collectArticleConflicts(), isExcludedCell(), skuMatrix()

### Community 75 - "counts.ts"
Cohesion: 0.50
Nodes (4): adminCountKeys, AdminCounts, fetchAdminCounts(), useAdminCounts()

### Community 76 - "crud.ts"
Cohesion: 0.28
Nodes (8): collectionMutations(), CollectionMutationsConfig, FIELD_CODE_RU, invalidate(), listKeys(), MutationKeys, QueryKey, syncDetail()

### Community 77 - "NutritionHint.tsx"
Cohesion: 0.32
Nodes (5): ProductNutrition, formatGrams(), NutritionHint(), HintMark(), TooltipContent()

### Community 78 - "toUploadFormData"
Cohesion: 0.40
Nodes (5): createBody(), updateBody(), updateBody(), updateProduct(), toUploadFormData()

### Community 79 - "invalidateProductRatings"
Cohesion: 0.67
Nodes (4): invalidateProductRatings(), useCreateReview(), useUpdateReview(), ReviewForm()

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
- **Why does `cn()` connect `CustomerDrawer.tsx` to `UI Layout Components`, `FloatingActions.tsx`, `ProductEditor.tsx`, `cn`, `HomePage.tsx`, `order/model.ts`, `FloatingActions.tsx`, `order/model.ts`, `MobileTabBar.tsx`, `MobileHome.tsx`, `TagFilters.tsx`, `pb.ts`, `AdminSidebar.tsx`, `HomePage.tsx`, `ProductCard.tsx`, `@radix-ui/react-slot`, `CouponForm.tsx`, `AdminPage.tsx`, `AddonForm.tsx`, `NutritionHint.tsx`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **Why does `pb` connect `useCategories` to `order/api.ts`, `addon/api.ts`, `banner/api.ts`, `addon/api.ts`, `order/model.ts`, `Sushi Catalog UI`, `Meal Add-ons UI`, `category/api.ts`, `articles.ts`, `counts.ts`, `crud.ts`, `invalidateProductRatings`, `FloatingActions.tsx`, `category/api.ts`, `cn.ts`, `StickyBar.tsx`, `order/model.ts`, `FloatingActions.tsx`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `formatPrice()` connect `AdminSidebar.tsx` to `UI Layout Components`, `order/model.ts`, `addon/model.ts`, `HomePage.tsx`, `ProductCard.tsx`, `FloatingActions.tsx`, `ProductEditor.tsx`, `cn`, `AdminPage.tsx`, `order/model.ts`, `AddonForm.tsx`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _342 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `addon/api.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13768115942028986 - nodes in this community are weakly interconnected._