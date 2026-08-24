# Graph Report - shahlik  (2026-08-24)

## Corpus Check
- 187 files · ~1,381,703 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1371 nodes · 3542 edges · 86 communities (77 shown, 9 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 126 edges (avg confidence: 0.54)
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
- theme.tsx
- category/model.ts
- HeroBanner.tsx
- tailwind-merge

## God Nodes (most connected - your core abstractions)
1. `cn()` - 113 edges
2. `formatPrice()` - 45 edges
3. `Button()` - 39 edges
4. `useCartTotals()` - 24 edges
5. `ProductEditor()` - 23 edges
6. `useCategories()` - 22 edges
7. `pb` - 21 edges
8. `Input()` - 21 edges
9. `useAdminProducts()` - 20 edges
10. `useConfirm()` - 19 edges

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

## Communities (86 total, 9 thin omitted)

### Community 0 - "addon/api.ts"
Cohesion: 0.08
Nodes (35): BadgeInput, badgeKeys, badgeMutations, BadgeRecord, fetchBadges(), mapBadge(), seedFallback(), useCreateBadge() (+27 more)

### Community 1 - "UI Layout Components"
Cohesion: 0.09
Nodes (35): adminReviewKeys, buildOrdersFilter(), CreateReviewInput, fetchAdminReviews(), fetchMyOrders(), fetchOrderById(), fetchOrders(), fetchOrdersPage() (+27 more)

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
Cohesion: 0.19
Nodes (13): useCoupons(), useDeleteCoupon(), useCustomersPage(), useAdminReviews(), useDeleteReview(), useToggleReviewPublished(), CouponsSection(), CustomersSection() (+5 more)

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
Nodes (66): checkPromo(), OrderStatus, applyPricesJobKeys, asNumberList(), asStatusMap(), asStringList(), enqueueApplyPricesJob(), enqueueSyncJob() (+58 more)

### Community 21 - "product/api.ts"
Cohesion: 0.07
Nodes (26): 1. env процесса `pocketbase` (systemd unit, `Environment=`), 2. Правки коллекций в `/_/` (и синхронно в `Tasks/schema.json`), 3. Rate limits PocketBase (`/_/` → Settings → Rate limits), 4. Настройки Frontpad (оператор), 5. Деплой `pb_hooks`, TASK_inter — интеграция с кассой Frontpad (боевая), Зона БД / инфры — делает владелец, агент не трогает, Зона кода — агент (+18 more)

### Community 22 - "ProductEditor.tsx"
Cohesion: 0.18
Nodes (13): useDeleteAddon(), useDeleteBanner(), loadDomMax(), SectionStub(), ADMIN_NAV, AdminNavItem, AdminRole, AdminSectionId (+5 more)

### Community 23 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 24 - "cn"
Cohesion: 0.13
Nodes (14): DEFAULT_CRITERIA, MeatIcon, ProductBadge, ProductRating, ProductSize, ProductTag, ProductVariant, RatingCriterion (+6 more)

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
Nodes (28): fetchActiveResendJobs(), mapJob(), resendOrder(), useOrderJobs(), useResendOrder(), FrontpadJob, FrontpadJobKind, FrontpadJobStatus (+20 more)

### Community 30 - "FloatingActions.tsx"
Cohesion: 0.16
Nodes (14): ProductViewProps, RatingOverlay(), AddonRow(), Props, formatScore10(), formatScore5(), pluralize(), trimZero() (+6 more)

### Community 31 - "useCategories"
Cohesion: 0.08
Nodes (30): SumRow(), MEAT_OPTIONS, PreviewToggle(), Props, AdminCard(), Props, Props, StatCard() (+22 more)

### Community 32 - "order/api.ts"
Cohesion: 0.13
Nodes (24): buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams, CustomersPageResult, fetchCustomerById() (+16 more)

### Community 33 - "customer/api.ts"
Cohesion: 0.17
Nodes (28): articleFor(), assertArticleAvailable(), buildDescr(), buildNewOrderPayload(), calcCouponDiscount(), checkPromo(), countRecentOrdersByPhone(), findSize() (+20 more)

### Community 34 - "banner/api.ts"
Cohesion: 0.11
Nodes (26): adminProductKeys, createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchAdminProducts() (+18 more)

### Community 35 - "addon/api.ts"
Cohesion: 0.24
Nodes (13): addonKeys, productKeys, articleFor(), cartLineTitle(), findSize(), findVariant(), priceOf(), SkuCell (+5 more)

### Community 36 - "order/model.ts"
Cohesion: 0.17
Nodes (17): OrderLineSnapshot, buildSeries(), buildTopProducts(), countByFilter(), DashboardData, dashboardKeys, DashboardSection(), dayKey() (+9 more)

### Community 37 - "articles.ts"
Cohesion: 0.08
Nodes (24): 1. Singleton-записи, 2. Новая auth-коллекция `app_users` (клиенты витрины), 3. Правки `orders`, 4. Правки `frontpad_settings`, 5. Правки `frontpad_jobs`, 6. Rate limits, TASK_order — профиль клиента, оформление заказа, витрина-модалка, Зона БД / инфры — делает владелец, агент не трогает (+16 more)

### Community 38 - "MobileTabBar.tsx"
Cohesion: 0.21
Nodes (9): App(), AppRoutes(), ScrollToTop(), container, BackgroundLocationState, backgroundOf(), Glass(), GlassDefs() (+1 more)

### Community 39 - "HomePage.tsx"
Cohesion: 0.24
Nodes (8): AdminPage(), adminCountKeys, AdminCounts, fetchAdminCounts(), useAdminCounts(), pb, resolvePbBaseUrl(), QueryKey

### Community 40 - "MobileHome.tsx"
Cohesion: 0.06
Nodes (48): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+40 more)

### Community 41 - "TagFilters.tsx"
Cohesion: 0.24
Nodes (11): useDeleteProduct(), useToggleProductActive(), useUpdateProduct(), hasMissingArticle(), applyFilteredReorder(), ProductsSection(), STATUS_FILTERS, ConfirmDialog() (+3 more)

### Community 42 - "webhook.js"
Cohesion: 0.52
Nodes (6): applyStatusChange(), constantTimeEqual(), handleStatusWebhook(), readQueryToken(), readWebhookBody(), verifyHookToken()

### Community 43 - "pb.ts"
Cohesion: 0.19
Nodes (16): ApplyPricesJobResult, asRowList(), buildCells(), CashPriceCell, CashPricePlan, CashPriceStatus, cellDelta(), parseApplyPricesResult() (+8 more)

### Community 44 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, preview, typecheck, type (+1 more)

### Community 45 - "AdminSidebar.tsx"
Cohesion: 0.24
Nodes (13): formatCouponValue(), useCartTotals(), useCartStore, CartPanel(), MODE_OPTIONS, CartPromo(), CartTotals(), formatAddressLine() (+5 more)

### Community 46 - "CustomerDrawer.tsx"
Cohesion: 0.22
Nodes (11): useCreateCategory(), useDeleteCategory(), useUpdateCategory(), CategoriesSection(), CategoryForm(), Props, move(), Props (+3 more)

### Community 47 - "order/model.ts"
Cohesion: 0.22
Nodes (13): bannerFormData(), filenamesOf(), FileRecord, imageFilenames(), imageUrl(), imageUrls(), toFormData(), ToFormDataOptions (+5 more)

### Community 49 - "HomePage.tsx"
Cohesion: 0.22
Nodes (11): useProducts(), useFrontpadStockRealtime(), CheckoutDialogState, useCheckoutDialogStore, HomePage(), MobileHome(), MobileHeader(), MobileTab (+3 more)

### Community 50 - "invalidateProductRatings"
Cohesion: 0.32
Nodes (7): CollectionMutationsConfig, FIELD_CODE_RU, invalidate(), listKeys(), MutationKeys, QueryKey, syncDetail()

### Community 51 - "ProductCard.tsx"
Cohesion: 0.25
Nodes (17): useBadges(), badgeLabel(), PRODUCT_ASPECT_RATIO, minPrice(), isProductStopped(), ProductCard(), ProductCardProps, ProductCardCompact() (+9 more)

### Community 52 - "@radix-ui/react-slot"
Cohesion: 0.18
Nodes (12): bannerKeys, bannerMutations, BannerNote, BannerRecord, CreateBannerInput, fetchBannerById(), fetchBanners(), mapBanner() (+4 more)

### Community 55 - "Sparkline.tsx"
Cohesion: 0.17
Nodes (16): DEFAULT_STATUS_MAP, buildHookUrl(), coerceJsonArray(), decodeByteJson(), getHookToken(), isArrayLike(), loadFrontpadSettings(), pad2() (+8 more)

### Community 56 - "CouponForm.tsx"
Cohesion: 0.17
Nodes (18): addonMutations, AddonRecord, CreateAddonInput, createBody(), fetchAddonById(), fetchAddons(), fetchAddonsByKind(), fetchExtras() (+10 more)

### Community 57 - "SettingsSection.tsx"
Cohesion: 0.17
Nodes (9): DeliveryMode, OrderAddressParts, needsChooser(), useAddProduct(), AddPayload, CartAddon, CartItem, CartState (+1 more)

### Community 58 - "AdminPage.tsx"
Cohesion: 0.22
Nodes (6): AdminGate(), AdminLogin, AdminPage, EASE, EXIT_ABS, loadMotionFeatures()

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
Cohesion: 0.17
Nodes (27): KIND_FILTERS, STATUS_FILTERS, STATUS_FILTERS, PriceRow, ROW_FILTERS, STATUS_LABEL, ROLE_FILTERS, ROLE_LABEL (+19 more)

### Community 64 - "banner-image-field.tsx"
Cohesion: 0.12
Nodes (23): AddonKind, useCreateBanner(), useUpdateBanner(), useAdminProducts(), useCreateProduct(), ProductEditorRoute(), Props, BannerForm() (+15 more)

### Community 65 - "@radix-ui/react-dialog"
Cohesion: 0.27
Nodes (9): AccountAuth, AccountContext, AccountProvider(), isAbortError(), refreshAuth(), isAppUserRecord(), loginWithOAuth(), logout() (+1 more)

### Community 67 - "tailwind-merge"
Cohesion: 0.25
Nodes (10): fetchBonus(), subscribeAccount(), useAccount(), useProfileBonus(), createOrder(), CreateOrderInput, useCreateOrder(), savedToParts() (+2 more)

### Community 69 - "sync.js"
Cohesion: 0.32
Nodes (13): formatPbDateTime(), isNoStopsResponse(), isProductsSyncAllowed(), listAllStock(), normalizeArticle(), parsePrice(), parseSaleFlag(), parseSyncDate() (+5 more)

### Community 70 - "HeroBanner.tsx"
Cohesion: 0.48
Nodes (6): useAddons(), useFrontpadStockArticles(), ArticleMatrix(), cellArticle(), Props, setCellArticle()

### Community 73 - "category/api.ts"
Cohesion: 0.17
Nodes (23): accountKeys, addAddress(), asId(), asString(), BonusResponse, getAccount(), mapAddress(), mapAddresses() (+15 more)

### Community 74 - "category/model.ts"
Cohesion: 0.32
Nodes (5): ProductNutrition, formatGrams(), NutritionHint(), HintMark(), TooltipContent()

### Community 75 - "files.ts"
Cohesion: 0.27
Nodes (9): canvasToBlob(), CropArea, cropImageToFile(), loadImage(), readImageSize(), ALLOWED, BannerImageField(), formatMb() (+1 more)

### Community 76 - "AdminTopbar.tsx"
Cohesion: 0.47
Nodes (4): AdminTopbar(), fetchNewOrdersCount(), newOrdersKey, queryClient

### Community 77 - "NutritionHint.tsx"
Cohesion: 0.17
Nodes (15): Addon, fetchStoppedArticles(), isAddonStopped(), isSizeStopped(), isSkuStopped(), isVariantStopped(), stoppedArticlesKey, useStoppedArticles() (+7 more)

### Community 80 - "lucide-react"
Cohesion: 0.47
Nodes (9): applyPrices(), cloneSize(), cloneVariant(), listAll(), loadStockMap(), planProduct(), roundPrice(), sizeLabel() (+1 more)

### Community 82 - "theme.tsx"
Cohesion: 0.31
Nodes (7): readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), useTheme(), ThemeToggle()

### Community 83 - "category/model.ts"
Cohesion: 0.25
Nodes (6): ALL_CATEGORY, Category, CategoryId, KNOWN_CATEGORY_IDS, KnownCategoryId, categories

### Community 84 - "HeroBanner.tsx"
Cohesion: 0.47
Nodes (4): useBanners(), BANNER_ASPECT_RATIO, HeroBanner(), HoverArrow()

## Ambiguous Edges - Review These
- `figma-make-app` → `Logo CMYK`  [AMBIGUOUS]
  temp/логотип/лого CMYK.pdf · relation: conceptually_related_to
- `figma-make-app` → `Logo RGB`  [AMBIGUOUS]
  temp/логотип/лого RGB.pdf · relation: conceptually_related_to

## Knowledge Gaps
- **380 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+375 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `figma-make-app` and `Logo CMYK`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `figma-make-app` and `Logo RGB`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `cn()` connect `useCategories` to `addon/api.ts`, `FloatingActions.tsx`, `ProductEditor.tsx`, `FloatingActions.tsx`, `banner/api.ts`, `MobileTabBar.tsx`, `MobileHome.tsx`, `TagFilters.tsx`, `pb.ts`, `AdminSidebar.tsx`, `CustomerDrawer.tsx`, `HomePage.tsx`, `ProductCard.tsx`, `AddonForm.tsx`, `banner-image-field.tsx`, `HeroBanner.tsx`, `category/model.ts`, `files.ts`, `NutritionHint.tsx`, `theme.tsx`, `HeroBanner.tsx`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Why does `formatPrice()` connect `ProductCard.tsx` to `order/api.ts`, `tailwind-merge`, `order/model.ts`, `Sushi Catalog UI`, `TagFilters.tsx`, `pb.ts`, `AdminSidebar.tsx`, `NutritionHint.tsx`, `FloatingActions.tsx`, `ProductEditor.tsx`, `useCategories`, `order/model.ts`, `FloatingActions.tsx`, `AddonForm.tsx`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `pb` connect `HomePage.tsx` to `addon/api.ts`, `order/api.ts`, `UI Layout Components`, `banner/api.ts`, `order/model.ts`, `Meal Add-ons UI`, `MobileHome.tsx`, `AdminTopbar.tsx`, `NutritionHint.tsx`, `order/model.ts`, `invalidateProductRatings`, `@radix-ui/react-slot`, `FloatingActions.tsx`, `CouponForm.tsx`, `category/api.ts`, `cn.ts`, `StickyBar.tsx`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _380 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `addon/api.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07575757575757576 - nodes in this community are weakly interconnected._