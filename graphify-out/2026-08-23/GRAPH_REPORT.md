# Graph Report - shahlik  (2026-08-23)

## Corpus Check
- 152 files · ~1,357,941 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1042 nodes · 2726 edges · 56 communities (47 shown, 9 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 69 edges (avg confidence: 0.55)
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
- category/api.ts
- pb.ts
- package.json
- AdminSidebar.tsx
- lucide-react
- pocketbase
- @radix-ui/react-slot
- sonner
- @tanstack/react-query
- FloatingActions.tsx
- banner-image-field.tsx
- SettingsSection.tsx
- store.ts
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
- `useAddProduct()` --indirect_call--> `product()`  [INFERRED]
  apps/shashlik-web/src/features/cart/lib/useAddProduct.ts → apps/shashlik-web/src/mocks/products.ts
- `SearchDialog()` --indirect_call--> `product()`  [INFERRED]
  apps/shashlik-web/src/features/search/SearchDialog.tsx → apps/shashlik-web/src/mocks/products.ts

## Import Cycles
- None detected.

## Communities (56 total, 9 thin omitted)

### Community 0 - "addon/api.ts"
Cohesion: 0.16
Nodes (17): fetchTags(), mapTag(), TagInput, tagKeys, tagMutations, TagRecord, tagsForCategory(), useCategoryTags() (+9 more)

### Community 1 - "UI Layout Components"
Cohesion: 0.25
Nodes (8): needsChooser(), useAddProduct(), useCartStore, CartLineRow(), SIZES, StepBtn(), Stepper(), StepperProps

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
Nodes (29): App(), readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), AdminLogin, AdminPage (+21 more)

### Community 6 - "Meal Add-ons UI"
Cohesion: 0.40
Nodes (9): fetchSettings(), mapSettings(), useSettings(), settingsFallback(), useCartTotals(), CartPanel(), AddressBar(), PromoBanner() (+1 more)

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
Cohesion: 0.13
Nodes (23): OrderStatus, asNumberList(), asStatusMap(), asStringList(), fetchFrontpadSettings(), FrontpadJobRecord, FrontpadSettingsRecord, FrontpadStockRecord (+15 more)

### Community 21 - "product/api.ts"
Cohesion: 0.13
Nodes (16): MEAT_OPTIONS, Props, DEFAULT_NUTRITION, ProductCreateForm(), Props, CYR_MAP, slugFromName(), Textarea() (+8 more)

### Community 22 - "ProductEditor.tsx"
Cohesion: 0.15
Nodes (14): couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail, PromoCheckOk (+6 more)

### Community 23 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 24 - "cn"
Cohesion: 0.09
Nodes (30): bannerFormData(), bannerKeys, bannerMutations, BannerNote, BannerRecord, CreateBannerInput, fetchBannerById(), fetchBanners() (+22 more)

### Community 25 - "HomePage.tsx"
Cohesion: 0.24
Nodes (10): checkPromo(), CollectionMutationsConfig, FIELD_CODE_RU, invalidate(), listKeys(), MutationKeys, pbErrorMessage(), QueryKey (+2 more)

### Community 26 - "category/api.ts"
Cohesion: 0.23
Nodes (9): Props, Props, STATUS_OPTIONS, Button(), ButtonProps, buttonVariants, Field(), Input() (+1 more)

### Community 27 - "cn.ts"
Cohesion: 0.29
Nodes (6): AdminTopbar(), fetchNewOrdersCount(), newOrdersKey, pb, queryClient, QueryKey

### Community 28 - "StickyBar.tsx"
Cohesion: 0.06
Nodes (53): addonKeys, BadgeInput, badgeKeys, badgeMutations, BadgeRecord, fetchBadges(), mapBadge(), seedFallback() (+45 more)

### Community 29 - "order/model.ts"
Cohesion: 0.15
Nodes (18): useCreateOrder(), MODE_OPTIONS, SumRow(), PreviewToggle(), Props, Toolbar(), cn(), Chip() (+10 more)

### Community 30 - "FloatingActions.tsx"
Cohesion: 0.20
Nodes (11): CartPanelState, useCartPanelStore, CartDock(), DesktopHome(), Props, Options, useInView(), useIsDesktop() (+3 more)

### Community 31 - "useCategories"
Cohesion: 0.27
Nodes (7): useCreateCoupon(), CouponForm(), KIND_OPTIONS, Props, toDateInput(), SheetContent(), SheetContentProps

### Community 32 - "order/api.ts"
Cohesion: 0.05
Nodes (65): adminReviewKeys, buildOrdersFilter(), createOrder(), CreateOrderInput, CreateReviewInput, fetchActiveResendJobs(), fetchAdminReviews(), fetchOrderById() (+57 more)

### Community 33 - "customer/api.ts"
Cohesion: 0.05
Nodes (74): useCoupons(), useDeleteCoupon(), useUpdateCoupon(), formatCouponValue(), buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations (+66 more)

### Community 34 - "banner/api.ts"
Cohesion: 0.05
Nodes (60): CategoryId, KNOWN_CATEGORY_IDS, KnownCategoryId, createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct() (+52 more)

### Community 35 - "addon/api.ts"
Cohesion: 0.08
Nodes (44): addonMutations, AddonRecord, CreateAddonInput, createBody(), fetchAddonById(), fetchAddons(), fetchAddonsByKind(), fetchExtras() (+36 more)

### Community 36 - "order/model.ts"
Cohesion: 0.13
Nodes (21): buildSeries(), buildTopProducts(), countByFilter(), DashboardData, dashboardKeys, DashboardSection(), dayKey(), fetchDashboard() (+13 more)

### Community 37 - "articles.ts"
Cohesion: 0.25
Nodes (9): enqueueSyncJob(), fetchActiveSyncJobs(), fetchStoppedStock(), mapJob(), mapStock(), useActiveSyncJobs(), useEnqueueSyncJob(), useStoppedStock() (+1 more)

### Community 38 - "MobileTabBar.tsx"
Cohesion: 0.40
Nodes (4): MobileTab, MobileTabBar(), Props, TABS

### Community 39 - "HomePage.tsx"
Cohesion: 0.20
Nodes (14): useCategories(), useProducts(), ALL_TAG, TagFilterId, SearchDialog(), SearchDialogProps, HomePage(), MobileHome() (+6 more)

### Community 42 - "category/api.ts"
Cohesion: 0.07
Nodes (38): AdminGate(), categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory() (+30 more)

### Community 43 - "pb.ts"
Cohesion: 0.18
Nodes (10): useTheme(), CartToggle(), formatOrderSum(), Props, ThemeToggle(), FloatingActions(), Props, TONE (+2 more)

### Community 44 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, preview, typecheck, type (+1 more)

### Community 45 - "AdminSidebar.tsx"
Cohesion: 0.43
Nodes (5): useCreateBadge(), useDeleteBadge(), useUpdateBadge(), BadgeManagerDialog(), Props

### Community 56 - "FloatingActions.tsx"
Cohesion: 0.18
Nodes (9): CategoryIcon(), Props, SITE, Glass(), GlassProps, Props, STICKY_BAR, StickyBar() (+1 more)

### Community 57 - "banner-image-field.tsx"
Cohesion: 0.17
Nodes (14): canvasToBlob(), CropArea, cropImageToFile(), loadImage(), readImageSize(), ALLOWED, BannerImageField(), formatMb() (+6 more)

### Community 58 - "SettingsSection.tsx"
Cohesion: 0.27
Nodes (9): frontpadSettingsKeys, settingsKeys, updateSettings(), useUpdateSettings(), parseNonNeg(), SettingsSection(), TabId, TABS (+1 more)

### Community 63 - "store.ts"
Cohesion: 0.25
Nodes (5): DeliveryMode, AddPayload, CartAddon, CartItem, CartState

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
- **Why does `cn()` connect `order/model.ts` to `customer/api.ts`, `UI Layout Components`, `addon/api.ts`, `order/model.ts`, `Meal Add-ons UI`, `HomePage.tsx`, `MobileTabBar.tsx`, `category/api.ts`, `pb.ts`, `AdminSidebar.tsx`, `useCategories`, `product/api.ts`, `FloatingActions.tsx`, `cn`, `category/api.ts`, `StickyBar.tsx`, `banner-image-field.tsx`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **Why does `pb` connect `cn.ts` to `order/api.ts`, `customer/api.ts`, `banner/api.ts`, `addon/api.ts`, `addon/api.ts`, `order/model.ts`, `Sushi Catalog UI`, `category/api.ts`, `FloatingActions.tsx`, `ProductEditor.tsx`, `cn`, `HomePage.tsx`, `StickyBar.tsx`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `Button()` connect `category/api.ts` to `addon/api.ts`, `customer/api.ts`, `order/api.ts`, `addon/api.ts`, `banner/api.ts`, `category/api.ts`, `AdminSidebar.tsx`, `product/api.ts`, `cn`, `banner-image-field.tsx`, `SettingsSection.tsx`, `cn.ts`, `StickyBar.tsx`, `order/model.ts`, `useCategories`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _315 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `NPM Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._