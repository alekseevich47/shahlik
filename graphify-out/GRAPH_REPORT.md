# Graph Report - shahlik  (2026-08-23)

## Corpus Check
- 152 files · ~1,358,156 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1041 nodes · 2721 edges · 69 communities (59 shown, 10 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 69 edges (avg confidence: 0.55)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `843b2049`
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
- OrderDrawer.tsx
- HomePage.tsx
- products.ts
- cn.ts
- category/api.ts
- pb.ts
- package.json
- AdminSidebar.tsx
- order/model.ts
- addon/model.ts
- BannersSection.tsx
- lucide-react
- motion
- pocketbase
- @radix-ui/react-slot
- sonner
- @tanstack/react-query
- zustand
- FloatingActions.tsx
- banner-image-field.tsx
- SettingsSection.tsx
- invalidateProductRatings
- ProductEditor.tsx
- router.tsx
- CartPanel.tsx
- store.ts
- theme.tsx
- @radix-ui/react-dialog
- react-router-dom
- tailwind-merge
- loadDomMax

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
- `resolveBadgeLabel()` --calls--> `badgeLabel()`  [EXTRACTED]
  apps/shashlik-web/src/shared/config/site.ts → apps/shashlik-web/src/entities/badge/model.ts
- `collectArticleConflicts()` --indirect_call--> `product()`  [INFERRED]
  apps/shashlik-web/src/entities/product/lib/articles.ts → apps/shashlik-web/src/mocks/products.ts

## Import Cycles
- None detected.

## Communities (69 total, 10 thin omitted)

### Community 0 - "addon/api.ts"
Cohesion: 0.14
Nodes (19): fetchTags(), mapTag(), TagInput, tagKeys, tagMutations, TagRecord, tagsForCategory(), useCategoryTags() (+11 more)

### Community 1 - "UI Layout Components"
Cohesion: 0.14
Nodes (21): useExtras(), useSauces(), useProductBySlug(), ResolvedLine, useCartStore, CartLineRow(), DashboardSection(), ProductPage() (+13 more)

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
Cohesion: 0.20
Nodes (13): GuardedSection(), AdminAuth, AdminAuthContext, AdminAuthProvider(), can(), isAbortError(), isStaffRecord(), MANAGER_UPDATE (+5 more)

### Community 6 - "Meal Add-ons UI"
Cohesion: 0.33
Nodes (8): fetchSettings(), mapSettings(), useSettings(), settingsFallback(), AddressBar(), PromoBanner(), Sidebar(), SidebarProps

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
Cohesion: 0.12
Nodes (30): asNumberList(), asStatusMap(), asStringList(), enqueueSyncJob(), fetchActiveSyncJobs(), fetchFrontpadSettings(), fetchStoppedStock(), FrontpadJobRecord (+22 more)

### Community 21 - "product/api.ts"
Cohesion: 0.17
Nodes (16): DEFAULT_NUTRITION, Props, Button(), ButtonProps, buttonVariants, ALLOWED, formatMb(), IMAGE_MAX_BYTES (+8 more)

### Community 22 - "ProductEditor.tsx"
Cohesion: 0.17
Nodes (14): StaffMember, useCreateStaff(), useDeleteStaff(), useRequestStaffPasswordReset(), useStaff(), useUpdateStaff(), ROLE_FILTERS, ROLE_LABEL (+6 more)

### Community 23 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 24 - "cn"
Cohesion: 0.20
Nodes (14): bannerFormData(), bannerKeys, bannerMutations, BannerNote, BannerRecord, CreateBannerInput, fetchBannerById(), fetchBanners() (+6 more)

### Community 25 - "HomePage.tsx"
Cohesion: 0.26
Nodes (10): filenamesOf(), FileRecord, imageFilenames(), imageUrl(), imageUrls(), ToFormDataOptions, canvasToBlob(), compressImage() (+2 more)

### Community 26 - "category/api.ts"
Cohesion: 0.18
Nodes (13): AdminLogin(), ProductOption, ReviewFormProps, STATUS_FILTERS, Props, Toolbar(), ToolbarFilter, authErrorMessage() (+5 more)

### Community 27 - "cn.ts"
Cohesion: 0.20
Nodes (13): AdminPage(), SectionStub(), ADMIN_NAV, AdminNavItem, AdminRole, AdminSectionId, AdminSidebar(), PILL (+5 more)

### Community 28 - "StickyBar.tsx"
Cohesion: 0.20
Nodes (16): articleFor(), cartLineTitle(), findSize(), findVariant(), needsChooser(), priceOf(), SkuCell, skuMatrix() (+8 more)

### Community 29 - "order/model.ts"
Cohesion: 0.14
Nodes (18): useBanners(), AdminCard(), Props, Props, StatCard(), FreshStamp(), STAMP_GLYPHS, cn() (+10 more)

### Community 30 - "FloatingActions.tsx"
Cohesion: 0.19
Nodes (12): CartPanelState, useCartPanelStore, CartDock(), HomePage(), DesktopHome(), Props, Options, useInView() (+4 more)

### Community 31 - "useCategories"
Cohesion: 0.17
Nodes (15): useCoupons(), useCreateCoupon(), useDeleteCoupon(), useUpdateCoupon(), Coupon, CouponForm(), KIND_OPTIONS, Props (+7 more)

### Community 32 - "order/api.ts"
Cohesion: 0.08
Nodes (42): checkPromo(), adminReviewKeys, buildOrdersFilter(), createOrder(), CreateOrderInput, CreateReviewInput, fetchAdminReviews(), fetchOrderById() (+34 more)

### Community 33 - "customer/api.ts"
Cohesion: 0.13
Nodes (24): buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams, CustomersPageResult, fetchCustomerById() (+16 more)

### Community 34 - "banner/api.ts"
Cohesion: 0.11
Nodes (26): adminProductKeys, createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchAdminProducts() (+18 more)

### Community 35 - "addon/api.ts"
Cohesion: 0.09
Nodes (33): addonKeys, addonMutations, AddonRecord, CreateAddonInput, createBody(), fetchAddonById(), fetchAddons(), fetchAddonsByKind() (+25 more)

### Community 36 - "order/model.ts"
Cohesion: 0.05
Nodes (50): couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail, PromoCheckOk (+42 more)

### Community 37 - "articles.ts"
Cohesion: 0.18
Nodes (10): Addon, AddonKind, addons, extras, IMG, sauces, Props, KIND_FILTERS (+2 more)

### Community 38 - "OrderDrawer.tsx"
Cohesion: 0.19
Nodes (16): fetchActiveResendJobs(), orderJobKeys, orderKeys, useOrderJobs(), ORDER_STATUS_FLOW, ORDER_STATUS_LABEL, ORDER_STATUS_SOURCE_LABEL, OrderStatus (+8 more)

### Community 39 - "HomePage.tsx"
Cohesion: 0.22
Nodes (10): useCategories(), ALL_TAG, TagFilterId, Props, CategoryTiles(), Props, MobileTab, MobileTabBar() (+2 more)

### Community 40 - "products.ts"
Cohesion: 0.09
Nodes (22): CategoryId, KnownCategoryId, useDuplicateProduct(), DEFAULT_CRITERIA, MeatIcon, ProductBadge, ProductNutrition, ProductRating (+14 more)

### Community 41 - "cn.ts"
Cohesion: 0.23
Nodes (10): OrderHistoryRow(), CustomersSection(), Column, DataTable(), Props, SortDir, formatDate(), Badge() (+2 more)

### Community 42 - "category/api.ts"
Cohesion: 0.13
Nodes (20): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+12 more)

### Community 43 - "pb.ts"
Cohesion: 0.19
Nodes (11): useTheme(), useCartTotals(), CartToggle(), formatOrderSum(), Props, ThemeToggle(), FloatingActions(), Props (+3 more)

### Community 44 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, preview, typecheck, type (+1 more)

### Community 45 - "AdminSidebar.tsx"
Cohesion: 0.17
Nodes (15): BadgeInput, badgeKeys, badgeMutations, BadgeRecord, fetchBadges(), mapBadge(), seedFallback(), useCreateBadge() (+7 more)

### Community 46 - "order/model.ts"
Cohesion: 0.16
Nodes (12): FrontpadJob, FrontpadJobKind, FrontpadJobStatus, Order, OrderAddressParts, OrderLineAddon, OrderLineSnapshot, OrderStatusSource (+4 more)

### Community 47 - "addon/model.ts"
Cohesion: 0.24
Nodes (7): App(), AppRoutes(), ScrollToTop(), container, Glass(), GlassDefs(), GlassProps

### Community 48 - "BannersSection.tsx"
Cohesion: 0.22
Nodes (10): useDeleteBanner(), useUpdateBanner(), Banner, banners, BannerForm(), Props, BannersSection(), move() (+2 more)

### Community 50 - "motion"
Cohesion: 0.29
Nodes (11): useBadges(), badgeLabel(), useProducts(), minPrice(), ProductCard(), ProductCardProps, ProductCardCompact(), Props (+3 more)

### Community 55 - "zustand"
Cohesion: 0.22
Nodes (11): useDeleteProduct(), useToggleProductActive(), useUpdateProduct(), hasMissingArticle(), applyFilteredReorder(), ProductsSection(), STATUS_FILTERS, Props (+3 more)

### Community 56 - "FloatingActions.tsx"
Cohesion: 0.17
Nodes (12): CategoryIcon(), Props, Chip(), ChipProps, OptionCard(), OptionCardProps, Props, SPRING (+4 more)

### Community 57 - "banner-image-field.tsx"
Cohesion: 0.24
Nodes (9): canvasToBlob(), CropArea, cropImageToFile(), loadImage(), readImageSize(), ALLOWED, BannerImageField(), formatMb() (+1 more)

### Community 58 - "SettingsSection.tsx"
Cohesion: 0.27
Nodes (9): frontpadSettingsKeys, settingsKeys, updateSettings(), useUpdateSettings(), parseNonNeg(), SettingsSection(), TabId, TABS (+1 more)

### Community 59 - "invalidateProductRatings"
Cohesion: 0.24
Nodes (8): DEFAULT_STATUS_MAP, FrontpadSettings, FrontpadStockItem, Settings, BADGE_LABEL, ORDER_RULES, resolveBadgeLabel(), SITE

### Community 60 - "ProductEditor.tsx"
Cohesion: 0.24
Nodes (6): imagesFromProduct(), MEAT_OPTIONS, newId(), PreviewToggle(), ProductEditor(), Props

### Community 61 - "router.tsx"
Cohesion: 0.22
Nodes (6): AdminGate(), AdminLogin, AdminPage, EASE, EXIT_ABS, loadMotionFeatures()

### Community 62 - "CartPanel.tsx"
Cohesion: 0.31
Nodes (7): formatCouponValue(), useCreateOrder(), CartPanel(), MODE_OPTIONS, SumRow(), Segmented(), SegmentedProps

### Community 63 - "store.ts"
Cohesion: 0.25
Nodes (5): DeliveryMode, AddPayload, CartAddon, CartItem, CartState

### Community 64 - "theme.tsx"
Cohesion: 0.40
Nodes (5): readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider()

## Ambiguous Edges - Review These
- `figma-make-app` → `Logo CMYK`  [AMBIGUOUS]
  temp/логотип/лого CMYK.pdf · relation: conceptually_related_to
- `figma-make-app` → `Logo RGB`  [AMBIGUOUS]
  temp/логотип/лого RGB.pdf · relation: conceptually_related_to

## Knowledge Gaps
- **315 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+310 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `figma-make-app` and `Logo CMYK`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `figma-make-app` and `Logo RGB`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `cn()` connect `order/model.ts` to `UI Layout Components`, `Meal Add-ons UI`, `product/api.ts`, `ProductEditor.tsx`, `category/api.ts`, `cn.ts`, `useCategories`, `addon/api.ts`, `articles.ts`, `HomePage.tsx`, `cn.ts`, `category/api.ts`, `pb.ts`, `AdminSidebar.tsx`, `addon/model.ts`, `BannersSection.tsx`, `motion`, `zustand`, `FloatingActions.tsx`, `banner-image-field.tsx`, `ProductEditor.tsx`, `CartPanel.tsx`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **Why does `pb` connect `order/model.ts` to `order/api.ts`, `customer/api.ts`, `banner/api.ts`, `addon/api.ts`, `addon/api.ts`, `Sushi Catalog UI`, `category/api.ts`, `AdminSidebar.tsx`, `FloatingActions.tsx`, `cn`, `HomePage.tsx`, `cn.ts`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Why does `formatPrice()` connect `UI Layout Components` to `customer/api.ts`, `addon/api.ts`, `order/model.ts`, `articles.ts`, `OrderDrawer.tsx`, `cn.ts`, `motion`, `FloatingActions.tsx`, `zustand`, `ProductEditor.tsx`, `CartPanel.tsx`, `useCategories`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _315 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `addon/api.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13768115942028986 - nodes in this community are weakly interconnected._