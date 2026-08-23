# Graph Report - shahlik  (2026-08-21)

## Corpus Check
- 143 files · ~1,353,913 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 992 nodes · 2575 edges · 48 communities (40 shown, 8 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 65 edges (avg confidence: 0.55)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ae7b367a`
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
- order/model.ts
- products.ts
- category/api.ts
- pb.ts
- package.json
- AdminSidebar.tsx
- lucide-react
- motion
- pocketbase
- @radix-ui/react-slot
- sonner
- @tanstack/react-query
- zustand

## God Nodes (most connected - your core abstractions)
1. `cn()` - 99 edges
2. `formatPrice()` - 37 edges
3. `Button()` - 33 edges
4. `useCategories()` - 22 edges
5. `ProductEditor()` - 19 edges
6. `pb` - 19 edges
7. `Input()` - 19 edges
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
- `SumRow()` --calls--> `cn()`  [EXTRACTED]
  apps/shashlik-web/src/features/cart/ui/CartPanel.tsx → apps/shashlik-web/src/shared/lib/cn.ts

## Import Cycles
- None detected.

## Communities (48 total, 8 thin omitted)

### Community 0 - "addon/api.ts"
Cohesion: 0.05
Nodes (57): useBanners(), useCategories(), useProducts(), needsChooser(), fetchTags(), mapTag(), TagInput, tagKeys (+49 more)

### Community 1 - "UI Layout Components"
Cohesion: 0.22
Nodes (16): articleFor(), cartLineTitle(), findSize(), findVariant(), hasMissingArticle(), priceOf(), SkuCell, skuMatrix() (+8 more)

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
Cohesion: 0.11
Nodes (27): adminProductKeys, createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchAdminProducts() (+19 more)

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
Cohesion: 0.05
Nodes (69): CategoryIcon(), Props, useCreateOrder(), OrderStatus, asNumberList(), asStatusMap(), asStringList(), enqueueSyncJob() (+61 more)

### Community 21 - "product/api.ts"
Cohesion: 0.07
Nodes (60): useDeleteAddon(), useDeleteBanner(), useCoupons(), useDeleteCoupon(), formatCouponValue(), Customer, CUSTOMER_FIELD_LIMITS, CustomerSortKey (+52 more)

### Community 22 - "ProductEditor.tsx"
Cohesion: 0.22
Nodes (10): CreateStaffInput, fetchStaff(), mapStaff(), mapStaffRequired(), staffKeys, StaffMember, staffMutations, StaffRecord (+2 more)

### Community 23 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 24 - "cn"
Cohesion: 0.06
Nodes (61): useAddons(), useCreateAddon(), useUpdateAddon(), useAdminProducts(), useCreateProduct(), useFrontpadStockArticles(), articleConflictMessage(), ArticleExclude (+53 more)

### Community 25 - "HomePage.tsx"
Cohesion: 0.22
Nodes (10): SearchDialogProps, AddonRow(), Props, formatPrice(), formatScore10(), formatScore5(), trimZero(), SIZES (+2 more)

### Community 26 - "category/api.ts"
Cohesion: 0.15
Nodes (11): AdminGate(), AdminLogin, AdminPage, AppRoutes(), EASE, EXIT_ABS, loadMotionFeatures(), AdminLogin() (+3 more)

### Community 27 - "cn.ts"
Cohesion: 0.20
Nodes (16): useDeleteProduct(), useToggleProductActive(), minPrice(), Product, ProductCard(), ProductCardProps, ProductCardCompact(), Props (+8 more)

### Community 28 - "StickyBar.tsx"
Cohesion: 0.27
Nodes (6): App(), ScrollToTop(), container, Glass(), GlassDefs(), GlassProps

### Community 29 - "order/model.ts"
Cohesion: 0.24
Nodes (9): collectionMutations(), CollectionMutationsConfig, FIELD_CODE_RU, invalidate(), listKeys(), MutationKeys, QueryKey, syncDetail() (+1 more)

### Community 30 - "FloatingActions.tsx"
Cohesion: 0.31
Nodes (7): readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), useTheme(), ThemeToggle()

### Community 31 - "useCategories"
Cohesion: 0.08
Nodes (26): checkPromo(), couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail (+18 more)

### Community 32 - "order/api.ts"
Cohesion: 0.05
Nodes (68): useCustomer(), useUpdateCustomer(), adminReviewKeys, buildOrdersFilter(), createOrder(), CreateOrderInput, CreateReviewInput, fetchActiveResendJobs() (+60 more)

### Community 33 - "customer/api.ts"
Cohesion: 0.20
Nodes (13): buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams, CustomersPageResult, fetchCustomerById() (+5 more)

### Community 34 - "banner/api.ts"
Cohesion: 0.06
Nodes (48): addonKeys, addonMutations, AddonRecord, CreateAddonInput, createBody(), fetchAddonById(), fetchAddons(), fetchAddonsByKind() (+40 more)

### Community 36 - "order/model.ts"
Cohesion: 0.15
Nodes (19): OrderLineSnapshot, buildSeries(), buildTopProducts(), countByFilter(), DashboardData, dashboardKeys, DashboardSection(), dayKey() (+11 more)

### Community 40 - "products.ts"
Cohesion: 0.10
Nodes (19): CategoryId, KnownCategoryId, DEFAULT_CRITERIA, MeatIcon, ProductBadge, ProductNutrition, ProductRating, ProductTag (+11 more)

### Community 42 - "category/api.ts"
Cohesion: 0.13
Nodes (20): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+12 more)

### Community 43 - "pb.ts"
Cohesion: 0.29
Nodes (6): AdminTopbar(), fetchNewOrdersCount(), newOrdersKey, pb, queryClient, QueryKey

### Community 44 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, preview, typecheck, type (+1 more)

### Community 45 - "AdminSidebar.tsx"
Cohesion: 0.18
Nodes (13): loadDomMax(), SectionStub(), ADMIN_NAV, AdminNavItem, AdminRole, AdminSectionId, AdminSidebar(), PILL (+5 more)

## Ambiguous Edges - Review These
- `figma-make-app` → `Logo CMYK`  [AMBIGUOUS]
  temp/логотип/лого CMYK.pdf · relation: conceptually_related_to
- `figma-make-app` → `Logo RGB`  [AMBIGUOUS]
  temp/логотип/лого RGB.pdf · relation: conceptually_related_to

## Knowledge Gaps
- **304 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+299 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `figma-make-app` and `Logo CMYK`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `figma-make-app` and `Logo RGB`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `cn()` connect `cn` to `addon/api.ts`, `UI Layout Components`, `category/api.ts`, `AdminSidebar.tsx`, `FloatingActions.tsx`, `product/api.ts`, `HomePage.tsx`, `cn.ts`, `StickyBar.tsx`, `FloatingActions.tsx`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **Why does `pb` connect `pb.ts` to `order/api.ts`, `customer/api.ts`, `banner/api.ts`, `addon/api.ts`, `order/model.ts`, `Sushi Catalog UI`, `Meal Add-ons UI`, `category/api.ts`, `AdminSidebar.tsx`, `FloatingActions.tsx`, `ProductEditor.tsx`, `cn`, `order/model.ts`, `useCategories`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `formatPrice()` connect `HomePage.tsx` to `addon/api.ts`, `order/api.ts`, `customer/api.ts`, `UI Layout Components`, `order/model.ts`, `FloatingActions.tsx`, `product/api.ts`, `cn`, `cn.ts`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _304 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `addon/api.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05387861084063616 - nodes in this community are weakly interconnected._