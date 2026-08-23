# Graph Report - shahlik  (2026-08-23)

## Corpus Check
- 153 files · ~1,358,249 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1046 nodes · 2746 edges · 60 communities (51 shown, 9 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 70 edges (avg confidence: 0.56)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `619623c9`
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
- category/model.ts
- lucide-react
- invalidateProductRatings
- pocketbase
- @radix-ui/react-slot
- sonner
- @tanstack/react-query
- class-variance-authority
- FloatingActions.tsx
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
- `useDuplicateProduct()` --indirect_call--> `product()`  [INFERRED]
  apps/shashlik-web/src/entities/product/api.ts → apps/shashlik-web/src/mocks/products.ts
- `collectArticleConflicts()` --indirect_call--> `product()`  [INFERRED]
  apps/shashlik-web/src/entities/product/lib/articles.ts → apps/shashlik-web/src/mocks/products.ts
- `articleConflictMessage()` --indirect_call--> `product()`  [INFERRED]
  apps/shashlik-web/src/entities/product/lib/articles.ts → apps/shashlik-web/src/mocks/products.ts

## Import Cycles
- None detected.

## Communities (60 total, 9 thin omitted)

### Community 0 - "addon/api.ts"
Cohesion: 0.14
Nodes (19): fetchTags(), mapTag(), TagInput, tagKeys, tagMutations, TagRecord, tagsForCategory(), useCategoryTags() (+11 more)

### Community 1 - "UI Layout Components"
Cohesion: 0.12
Nodes (15): DEFAULT_CRITERIA, MeatIcon, ProductBadge, ProductRating, ProductSize, ProductTag, ProductVariant, RatingCriterion (+7 more)

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
Cohesion: 0.06
Nodes (52): addonKeys, AppliedCoupon, calcCouponDiscount(), Coupon, CouponKind, formatCouponValue(), useCreateOrder(), DeliveryMode (+44 more)

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
Nodes (53): CategoryIcon(), Props, checkPromo(), ORDER_STATUS_LABEL, asNumberList(), asStatusMap(), asStringList(), enqueueSyncJob() (+45 more)

### Community 21 - "product/api.ts"
Cohesion: 0.18
Nodes (14): useCreateProduct(), DEFAULT_NUTRITION, ProductCreateForm(), Props, ALLOWED, formatMb(), IMAGE_MAX_BYTES, ImageField() (+6 more)

### Community 22 - "ProductEditor.tsx"
Cohesion: 0.20
Nodes (11): couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail, PromoCheckOk (+3 more)

### Community 23 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 24 - "cn"
Cohesion: 0.09
Nodes (30): bannerFormData(), bannerKeys, bannerMutations, BannerNote, BannerRecord, CreateBannerInput, fetchBannerById(), fetchBanners() (+22 more)

### Community 25 - "HomePage.tsx"
Cohesion: 0.20
Nodes (10): CollectionMutationsConfig, FIELD_CODE_RU, invalidate(), listKeys(), MutationKeys, QueryKey, syncDetail(), pb (+2 more)

### Community 26 - "category/api.ts"
Cohesion: 0.15
Nodes (15): updateBody(), updateProduct(), useDeleteProduct(), useToggleProductActive(), useUpdateProduct(), hasMissingArticle(), imagesFromProduct(), MEAT_OPTIONS (+7 more)

### Community 27 - "cn.ts"
Cohesion: 0.15
Nodes (12): AdminGate(), AdminLogin, AdminPage, AppRoutes(), EASE, EXIT_ABS, loadMotionFeatures(), AdminLogin() (+4 more)

### Community 28 - "StickyBar.tsx"
Cohesion: 0.12
Nodes (26): BadgeInput, badgeKeys, badgeMutations, BadgeRecord, fetchBadges(), mapBadge(), seedFallback(), useBadges() (+18 more)

### Community 29 - "order/model.ts"
Cohesion: 0.16
Nodes (13): ALL_TAG, CategoryTag, TagFilterId, productTags, Chip(), ChipProps, OptionCard(), OptionCardProps (+5 more)

### Community 30 - "FloatingActions.tsx"
Cohesion: 0.19
Nodes (11): CartPanelState, useCartPanelStore, CartDock(), DesktopHome(), Props, Options, useInView(), useIsDesktop() (+3 more)

### Community 31 - "useCategories"
Cohesion: 0.15
Nodes (17): CreateStaffInput, fetchStaff(), mapStaff(), mapStaffRequired(), staffKeys, StaffMember, staffMutations, StaffRecord (+9 more)

### Community 32 - "order/api.ts"
Cohesion: 0.10
Nodes (28): adminReviewKeys, buildOrdersFilter(), createOrder(), CreateOrderInput, CreateReviewInput, fetchAdminReviews(), fetchOrderById(), fetchOrders() (+20 more)

### Community 33 - "customer/api.ts"
Cohesion: 0.06
Nodes (91): useDeleteAddon(), useDeleteBanner(), useCreateCategory(), useDeleteCategory(), useUpdateCategory(), useCreateCoupon(), useDeleteCoupon(), useUpdateCoupon() (+83 more)

### Community 34 - "banner/api.ts"
Cohesion: 0.14
Nodes (22): adminProductKeys, createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchAdminProducts() (+14 more)

### Community 35 - "addon/api.ts"
Cohesion: 0.09
Nodes (29): addonMutations, AddonRecord, CreateAddonInput, createBody(), fetchAddonById(), fetchAddons(), fetchAddonsByKind(), fetchExtras() (+21 more)

### Community 36 - "order/model.ts"
Cohesion: 0.12
Nodes (23): OrderLineSnapshot, buildSeries(), buildTopProducts(), countByFilter(), DashboardData, dashboardKeys, DashboardSection(), dayKey() (+15 more)

### Community 37 - "articles.ts"
Cohesion: 0.17
Nodes (15): buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams, CustomersPageResult, fetchCustomerById() (+7 more)

### Community 38 - "MobileTabBar.tsx"
Cohesion: 0.18
Nodes (16): fetchActiveResendJobs(), mapJob(), resendOrder(), updateOrderStatus(), useOrderJobs(), useResendOrder(), useUpdateOrderStatus(), ORDER_STATUS_FLOW (+8 more)

### Community 39 - "HomePage.tsx"
Cohesion: 0.21
Nodes (14): useCategories(), useProducts(), needsChooser(), Product, useAddProduct(), SearchDialog(), SearchDialogProps, product() (+6 more)

### Community 40 - "articles.ts"
Cohesion: 0.23
Nodes (13): useAddons(), useFrontpadStockArticles(), articleConflictMessage(), ArticleExclude, ArticleRef, cellLabel(), collectArticleConflicts(), isExcludedCell() (+5 more)

### Community 41 - "files.ts"
Cohesion: 0.23
Nodes (12): filenamesOf(), FileRecord, imageFilenames(), imageUrl(), imageUrls(), toFormData(), ToFormDataOptions, toUploadFormData() (+4 more)

### Community 42 - "category/api.ts"
Cohesion: 0.27
Nodes (9): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+1 more)

### Community 43 - "pb.ts"
Cohesion: 0.32
Nodes (6): CartToggle(), formatOrderSum(), Props, FloatingActions(), Props, TONE

### Community 44 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, preview, typecheck, type (+1 more)

### Community 45 - "AdminSidebar.tsx"
Cohesion: 0.21
Nodes (9): readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), useTheme(), ThemeToggle(), MobileHeader() (+1 more)

### Community 46 - "CustomerDrawer.tsx"
Cohesion: 0.26
Nodes (12): useCustomer(), useUpdateCustomer(), useOrdersPage(), CustomerDrawer(), digitsOnly(), FormState, parseNonNeg(), Props (+4 more)

### Community 47 - "order/model.ts"
Cohesion: 0.18
Nodes (11): FrontpadJob, FrontpadJobKind, FrontpadJobStatus, Order, OrderAddressParts, OrderLineAddon, OrderStatusSource, Review (+3 more)

### Community 48 - "category/model.ts"
Cohesion: 0.25
Nodes (6): ALL_CATEGORY, Category, CategoryId, KNOWN_CATEGORY_IDS, KnownCategoryId, categories

### Community 49 - "lucide-react"
Cohesion: 0.32
Nodes (5): ProductNutrition, formatGrams(), NutritionHint(), HintMark(), TooltipContent()

### Community 50 - "invalidateProductRatings"
Cohesion: 0.67
Nodes (4): invalidateProductRatings(), useCreateReview(), useUpdateReview(), ReviewForm()

### Community 56 - "FloatingActions.tsx"
Cohesion: 0.27
Nodes (6): App(), ScrollToTop(), container, Glass(), GlassDefs(), GlassProps

## Ambiguous Edges - Review These
- `figma-make-app` → `Logo CMYK`  [AMBIGUOUS]
  temp/логотип/лого CMYK.pdf · relation: conceptually_related_to
- `figma-make-app` → `Logo RGB`  [AMBIGUOUS]
  temp/логотип/лого RGB.pdf · relation: conceptually_related_to

## Knowledge Gaps
- **315 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+310 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `figma-make-app` and `Logo CMYK`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `figma-make-app` and `Logo RGB`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `cn()` connect `customer/api.ts` to `addon/api.ts`, `FloatingActions.tsx`, `order/model.ts`, `Meal Add-ons UI`, `HomePage.tsx`, `articles.ts`, `pb.ts`, `AdminSidebar.tsx`, `lucide-react`, `FloatingActions.tsx`, `product/api.ts`, `cn`, `category/api.ts`, `StickyBar.tsx`, `order/model.ts`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **Why does `pb` connect `HomePage.tsx` to `order/api.ts`, `addon/api.ts`, `banner/api.ts`, `addon/api.ts`, `order/model.ts`, `articles.ts`, `Sushi Catalog UI`, `articles.ts`, `files.ts`, `category/api.ts`, `FloatingActions.tsx`, `ProductEditor.tsx`, `cn`, `cn.ts`, `StickyBar.tsx`, `useCategories`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `Button()` connect `customer/api.ts` to `addon/api.ts`, `Meal Add-ons UI`, `MobileTabBar.tsx`, `CustomerDrawer.tsx`, `FloatingActions.tsx`, `product/api.ts`, `cn`, `category/api.ts`, `cn.ts`, `StickyBar.tsx`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _315 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `addon/api.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1422924901185771 - nodes in this community are weakly interconnected._