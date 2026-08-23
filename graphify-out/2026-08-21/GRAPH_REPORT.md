# Graph Report - shahlik  (2026-08-20)

## Corpus Check
- 140 files · ~1,351,894 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 960 nodes · 2521 edges · 56 communities (48 shown, 8 thin omitted)
- Extraction: 97% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 63 edges (avg confidence: 0.55)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a41af5a5`
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
- articles.ts
- order/model.ts
- BannerForm.tsx
- OrderDrawer.tsx
- addon/api.ts
- products.ts
- CustomerDrawer.tsx
- category/api.ts
- pb.ts
- package.json
- AdminSidebar.tsx
- category/model.ts
- NutritionHint.tsx
- invalidateProductRatings
- lucide-react
- motion
- pocketbase
- @radix-ui/react-slot
- sonner
- @tanstack/react-query
- zustand

## God Nodes (most connected - your core abstractions)
1. `cn()` - 97 edges
2. `formatPrice()` - 37 edges
3. `Button()` - 34 edges
4. `useCategories()` - 24 edges
5. `useAdminProducts()` - 20 edges
6. `ProductEditor()` - 19 edges
7. `Input()` - 19 edges
8. `Badge()` - 18 edges
9. `compilerOptions` - 18 edges
10. `settingsFallback()` - 17 edges

## Surprising Connections (you probably didn't know these)
- `Logo CMYK` --conceptually_related_to--> `figma-make-app`  [AMBIGUOUS]
  temp/логотип/лого CMYK.pdf → AGENTS.md
- `Logo RGB` --conceptually_related_to--> `figma-make-app`  [AMBIGUOUS]
  temp/логотип/лого RGB.pdf → AGENTS.md
- `collectArticleConflicts()` --indirect_call--> `product()`  [INFERRED]
  apps/shashlik-web/src/entities/product/lib/articles.ts → apps/shashlik-web/src/mocks/products.ts
- `articleConflictMessage()` --indirect_call--> `product()`  [INFERRED]
  apps/shashlik-web/src/entities/product/lib/articles.ts → apps/shashlik-web/src/mocks/products.ts
- `useAddProduct()` --indirect_call--> `product()`  [INFERRED]
  apps/shashlik-web/src/features/cart/lib/useAddProduct.ts → apps/shashlik-web/src/mocks/products.ts

## Import Cycles
- None detected.

## Communities (56 total, 8 thin omitted)

### Community 0 - "addon/api.ts"
Cohesion: 0.15
Nodes (18): fetchTags(), mapTag(), TagInput, tagKeys, tagMutations, TagRecord, tagsForCategory(), useCategoryTags() (+10 more)

### Community 1 - "UI Layout Components"
Cohesion: 0.07
Nodes (45): addonKeys, useExtras(), useSauces(), AppliedCoupon, calcCouponDiscount(), formatCouponValue(), useCreateOrder(), productKeys (+37 more)

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
Nodes (11): updateBody(), useCreateAddon(), useUpdateAddon(), Addon, AddonKind, addons, extras, IMG (+3 more)

### Community 6 - "Meal Add-ons UI"
Cohesion: 0.13
Nodes (24): adminProductKeys, createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchAdminProducts() (+16 more)

### Community 7 - "Checkout Flow UI"
Cohesion: 0.11
Nodes (18): API-правила (PB Rules), Env / инфра, `pb_hooks` (JSVM), TASK_DB — подключение PocketBase (сайт + админка) с прицелом на Frontpad, Архитектура, Зона БД — делаю сам (PocketBase Admin UI, `pb_hooks`, env), Зона кода — делает агент (после того как коллекции выше созданы), Коллекции (имена полей = 1:1 с `entities/*/model.ts`, где возможно) (+10 more)

### Community 8 - "package.json"
Cohesion: 0.12
Nodes (17): dependencies, class-variance-authority, clsx, @radix-ui/react-dialog, @radix-ui/react-tooltip, react, react-dom, react-router-dom (+9 more)

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
Nodes (62): checkPromo(), asNumberList(), asStatusMap(), asStringList(), enqueueSyncJob(), fetchActiveSyncJobs(), fetchFrontpadSettings(), fetchSettings() (+54 more)

### Community 21 - "product/api.ts"
Cohesion: 0.08
Nodes (72): useDeleteAddon(), useDeleteBanner(), useDeleteCategory(), useUpdateCategory(), useDeleteCoupon(), useCustomersPage(), useAdminReviews(), useDeleteReview() (+64 more)

### Community 22 - "ProductEditor.tsx"
Cohesion: 0.13
Nodes (15): DEFAULT_CRITERIA, MeatIcon, ProductBadge, ProductRating, ProductSize, ProductTag, ProductVariant, RatingCriterion (+7 more)

### Community 23 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 24 - "cn"
Cohesion: 0.15
Nodes (18): useBanners(), ProductCardCompact(), Props, FreshStamp(), STAMP_GLYPHS, cn(), ConfirmDialog(), scoreColor() (+10 more)

### Community 25 - "HomePage.tsx"
Cohesion: 0.21
Nodes (13): useCategories(), useProducts(), SearchDialog(), SearchDialogProps, HomePage(), MobileHome(), CategoryTiles(), Props (+5 more)

### Community 26 - "category/api.ts"
Cohesion: 0.05
Nodes (43): App(), readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), AdminGate(), AdminLogin (+35 more)

### Community 27 - "cn.ts"
Cohesion: 0.28
Nodes (5): CategoryIcon(), Props, BADGE_LABEL, SITE, SidebarProps

### Community 28 - "StickyBar.tsx"
Cohesion: 0.15
Nodes (14): ALL_TAG, TagFilterId, Props, Chip(), ChipProps, OptionCard(), OptionCardProps, Glass() (+6 more)

### Community 29 - "order/model.ts"
Cohesion: 0.20
Nodes (11): CartPanelState, useCartPanelStore, CartDock(), DesktopHome(), Props, Options, useInView(), useIsDesktop() (+3 more)

### Community 30 - "FloatingActions.tsx"
Cohesion: 0.16
Nodes (11): useTheme(), CartToggle(), formatOrderSum(), Props, ThemeToggle(), AdminTopbar(), FloatingActions(), Props (+3 more)

### Community 31 - "useCategories"
Cohesion: 0.07
Nodes (35): couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail, PromoCheckOk (+27 more)

### Community 32 - "order/api.ts"
Cohesion: 0.10
Nodes (30): adminReviewKeys, buildOrdersFilter(), createOrder(), CreateOrderInput, CreateReviewInput, fetchAdminReviews(), fetchOrderById(), fetchOrders() (+22 more)

### Community 33 - "customer/api.ts"
Cohesion: 0.16
Nodes (15): buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams, CustomersPageResult, fetchCustomerById() (+7 more)

### Community 34 - "banner/api.ts"
Cohesion: 0.18
Nodes (15): createBody(), bannerFormData(), bannerKeys, bannerMutations, BannerRecord, CreateBannerInput, fetchBannerById(), fetchBanners() (+7 more)

### Community 35 - "articles.ts"
Cohesion: 0.23
Nodes (12): useAddons(), useFrontpadStockArticles(), articleConflictMessage(), ArticleExclude, ArticleRef, cellLabel(), collectArticleConflicts(), isExcludedCell() (+4 more)

### Community 36 - "order/model.ts"
Cohesion: 0.15
Nodes (13): DeliveryMode, FrontpadJob, FrontpadJobKind, FrontpadJobStatus, Order, OrderAddressParts, OrderLineAddon, OrderLineSnapshot (+5 more)

### Community 37 - "BannerForm.tsx"
Cohesion: 0.20
Nodes (9): BannerNote, Banner, banners, Props, ALLOWED, formatMb(), IMAGE_MAX_BYTES, ImageField() (+1 more)

### Community 38 - "OrderDrawer.tsx"
Cohesion: 0.20
Nodes (13): fetchActiveResendJobs(), mapJob(), resendOrder(), useOrderJobs(), useResendOrder(), ORDER_STATUS_FLOW, ORDER_STATUS_LABEL, ORDER_STATUS_SOURCE_LABEL (+5 more)

### Community 39 - "addon/api.ts"
Cohesion: 0.24
Nodes (12): addonMutations, AddonRecord, CreateAddonInput, fetchAddonById(), fetchAddons(), fetchAddonsByKind(), fetchExtras(), fetchSauces() (+4 more)

### Community 40 - "products.ts"
Cohesion: 0.17
Nodes (9): useDuplicateProduct(), MEAT_VARIANTS, NUTRITION_BY_CATEGORY, product(), products, shawarma(), SHAWARMA_SIZES, Spec (+1 more)

### Community 41 - "CustomerDrawer.tsx"
Cohesion: 0.29
Nodes (11): useCustomer(), useUpdateCustomer(), useOrdersPage(), CustomerDrawer(), digitsOnly(), FormState, parseNonNeg(), Props (+3 more)

### Community 42 - "category/api.ts"
Cohesion: 0.24
Nodes (10): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+2 more)

### Community 43 - "pb.ts"
Cohesion: 0.24
Nodes (7): AdminPage(), adminCountKeys, AdminCounts, fetchAdminCounts(), useAdminCounts(), FileRecord, pb

### Community 44 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, preview, typecheck, type (+1 more)

### Community 45 - "AdminSidebar.tsx"
Cohesion: 0.27
Nodes (8): SectionStub(), ADMIN_NAV, AdminNavItem, AdminRole, AdminSectionId, AdminSidebar(), PILL, Props

### Community 46 - "category/model.ts"
Cohesion: 0.29
Nodes (5): Category, CategoryId, KNOWN_CATEGORY_IDS, KnownCategoryId, categories

### Community 47 - "NutritionHint.tsx"
Cohesion: 0.32
Nodes (5): ProductNutrition, formatGrams(), NutritionHint(), HintMark(), TooltipContent()

### Community 48 - "invalidateProductRatings"
Cohesion: 0.67
Nodes (4): invalidateProductRatings(), useCreateReview(), useUpdateReview(), ReviewForm()

## Ambiguous Edges - Review These
- `figma-make-app` → `Logo CMYK`  [AMBIGUOUS]
  temp/логотип/лого CMYK.pdf · relation: conceptually_related_to
- `figma-make-app` → `Logo RGB`  [AMBIGUOUS]
  temp/логотип/лого RGB.pdf · relation: conceptually_related_to

## Knowledge Gaps
- **294 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+289 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `figma-make-app` and `Logo CMYK`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `figma-make-app` and `Logo RGB`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `cn()` connect `cn` to `UI Layout Components`, `articles.ts`, `BannerForm.tsx`, `AdminSidebar.tsx`, `NutritionHint.tsx`, `FloatingActions.tsx`, `product/api.ts`, `ProductEditor.tsx`, `HomePage.tsx`, `cn.ts`, `StickyBar.tsx`, `FloatingActions.tsx`, `useCategories`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Why does `pb` connect `pb.ts` to `order/api.ts`, `customer/api.ts`, `banner/api.ts`, `articles.ts`, `addon/api.ts`, `Meal Add-ons UI`, `addon/api.ts`, `category/api.ts`, `FloatingActions.tsx`, `category/api.ts`, `useCategories`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `Button()` connect `product/api.ts` to `addon/api.ts`, `UI Layout Components`, `BannerForm.tsx`, `Sushi Catalog UI`, `OrderDrawer.tsx`, `CustomerDrawer.tsx`, `FloatingActions.tsx`, `ProductEditor.tsx`, `cn`, `category/api.ts`, `FloatingActions.tsx`, `useCategories`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _294 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `UI Layout Components` be split into smaller, more focused modules?**
  _Cohesion score 0.07268170426065163 - nodes in this community are weakly interconnected._