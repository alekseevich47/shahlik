# Graph Report - shashlik-web  (2026-08-20)

## Corpus Check
- 135 files · ~157,875 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 854 nodes · 2404 edges · 34 communities (26 shown, 8 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 60 edges (avg confidence: 0.53)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a41af5a5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- HomePage.tsx
- dependencies
- selectors.ts
- ProductPage.tsx
- cn
- CatalogTables.tsx
- devDependencies
- compilerOptions
- CustomerDrawer.tsx
- formatPrice
- category/api.ts
- vite-env.d.ts
- gen-glass-noise.mjs
- banner/api.ts
- product/model.ts
- AdminPage.tsx
- products.ts
- crud.ts
- ProductEditor.tsx
- package.json
- coupon/api.ts
- lucide-react
- @radix-ui/react-dialog
- banner/api.ts
- tailwind-merge
- @tanstack/react-query
- zustand
- AdminSidebar.tsx
- product/model.ts
- AddonForm.tsx
- counts.ts
- lucide-react
- react-dom

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
- `ProductEditorRoute()` --calls--> `useAdminProducts()`  [EXTRACTED]
  src/pages/admin/AdminPage.tsx → src/entities/product/api.ts
- `useAddProduct()` --indirect_call--> `product()`  [INFERRED]
  src/features/cart/lib/useAddProduct.ts → src/mocks/products.ts
- `SumRow()` --calls--> `cn()`  [EXTRACTED]
  src/features/cart/ui/CartPanel.tsx → src/shared/lib/cn.ts
- `SearchDialog()` --indirect_call--> `product()`  [INFERRED]
  src/features/search/SearchDialog.tsx → src/mocks/products.ts
- `PreviewToggle()` --calls--> `cn()`  [EXTRACTED]
  src/pages/admin/sections/ProductEditor.tsx → src/shared/lib/cn.ts

## Import Cycles
- None detected.

## Communities (34 total, 8 thin omitted)

### Community 0 - "HomePage.tsx"
Cohesion: 0.06
Nodes (72): useDeleteAddon(), useDeleteBanner(), CategoryIcon(), Props, useCreateStaff(), CartToggle(), formatOrderSum(), Props (+64 more)

### Community 1 - "dependencies"
Cohesion: 0.12
Nodes (17): class-variance-authority, clsx, motion, dependencies, class-variance-authority, clsx, motion, pocketbase (+9 more)

### Community 2 - "selectors.ts"
Cohesion: 0.11
Nodes (28): adminProductKeys, createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchAdminProducts() (+20 more)

### Community 4 - "cn"
Cohesion: 0.07
Nodes (52): OrderStatus, asNumberList(), asStatusMap(), asStringList(), enqueueSyncJob(), fetchActiveSyncJobs(), fetchFrontpadSettings(), fetchStoppedStock() (+44 more)

### Community 5 - "CatalogTables.tsx"
Cohesion: 0.05
Nodes (63): adminReviewKeys, buildOrdersFilter(), createOrder(), CreateOrderInput, CreateReviewInput, fetchActiveResendJobs(), fetchAdminReviews(), fetchOrderById() (+55 more)

### Community 6 - "devDependencies"
Cohesion: 0.11
Nodes (19): devDependencies, tailwindcss, @tailwindcss/vite, tw-animate-css, @types/node, @types/react, @types/react-dom, typescript (+11 more)

### Community 7 - "compilerOptions"
Cohesion: 0.07
Nodes (26): DOM, DOM.Iterable, ES2023, node, src, vite/client, vite.config.ts, compilerOptions (+18 more)

### Community 8 - "CustomerDrawer.tsx"
Cohesion: 0.07
Nodes (45): buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams, CustomersPageResult, fetchCustomerById() (+37 more)

### Community 9 - "formatPrice"
Cohesion: 0.15
Nodes (18): fetchTags(), mapTag(), TagInput, tagKeys, tagMutations, TagRecord, tagsForCategory(), useCategoryTags() (+10 more)

### Community 10 - "category/api.ts"
Cohesion: 0.13
Nodes (19): useDeleteProduct(), useDuplicateProduct(), articleConflictMessage(), ArticleExclude, ArticleRef, cellLabel(), collectArticleConflicts(), isExcludedCell() (+11 more)

### Community 13 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 14 - "banner/api.ts"
Cohesion: 0.25
Nodes (5): AdminLogin, AdminPage, EASE, EXIT_ABS, loadMotionFeatures()

### Community 15 - "product/model.ts"
Cohesion: 0.12
Nodes (19): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+11 more)

### Community 16 - "AdminPage.tsx"
Cohesion: 0.19
Nodes (10): App(), readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), AppRoutes(), ScrollToTop() (+2 more)

### Community 17 - "products.ts"
Cohesion: 0.12
Nodes (17): CategoryId, KNOWN_CATEGORY_IDS, KnownCategoryId, DEFAULT_CRITERIA, ProductBadge, ProductRating, ProductSize, ProductTag (+9 more)

### Community 18 - "crud.ts"
Cohesion: 0.06
Nodes (46): minPrice(), MeatIcon, ProductCard(), ProductCardProps, ProductCardCompact(), Props, buildSeries(), buildTopProducts() (+38 more)

### Community 19 - "ProductEditor.tsx"
Cohesion: 0.16
Nodes (17): ProductNutrition, Props, Props, CYR_MAP, DEFAULT_NUTRITION, Props, ALLOWED, formatMb() (+9 more)

### Community 20 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, preview, typecheck, type (+1 more)

### Community 21 - "coupon/api.ts"
Cohesion: 0.12
Nodes (26): checkPromo(), couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail (+18 more)

### Community 22 - "lucide-react"
Cohesion: 0.05
Nodes (68): useBanners(), useCategories(), AppliedCoupon, calcCouponDiscount(), DeliveryMode, useProducts(), articleFor(), cartLineTitle() (+60 more)

### Community 25 - "banner/api.ts"
Cohesion: 0.06
Nodes (46): addonKeys, addonMutations, AddonRecord, CreateAddonInput, createBody(), fetchAddonById(), fetchAddons(), fetchAddonsByKind() (+38 more)

### Community 29 - "AdminSidebar.tsx"
Cohesion: 0.16
Nodes (15): AdminGate(), AdminLogin(), GuardedSection(), AdminAuth, authErrorMessage(), can(), isStaffRecord(), MANAGER_UPDATE (+7 more)

### Community 31 - "product/model.ts"
Cohesion: 0.25
Nodes (7): useTheme(), ThemeToggle(), AdminTopbar(), fetchNewOrdersCount(), newOrdersKey, MobileHeader(), Props

### Community 34 - "AddonForm.tsx"
Cohesion: 0.39
Nodes (8): useAddons(), useAdminProducts(), useFrontpadStockArticles(), AddonForm(), ArticleMatrix(), cellArticle(), Props, setCellArticle()

### Community 38 - "counts.ts"
Cohesion: 0.18
Nodes (13): AdminPage(), loadDomMax(), ProductEditorRoute(), SectionStub(), ADMIN_NAV, AdminNavItem, AdminRole, AdminSectionId (+5 more)

## Knowledge Gaps
- **250 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+245 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `HomePage.tsx` to `AddonForm.tsx`, `counts.ts`, `category/api.ts`, `product/model.ts`, `crud.ts`, `ProductEditor.tsx`, `coupon/api.ts`, `lucide-react`, `product/model.ts`?**
  _High betweenness centrality (0.093) - this node is a cross-community bridge._
- **Why does `pb` connect `banner/api.ts` to `selectors.ts`, `cn`, `CatalogTables.tsx`, `CustomerDrawer.tsx`, `formatPrice`, `category/api.ts`, `product/model.ts`, `crud.ts`, `coupon/api.ts`, `AdminSidebar.tsx`, `product/model.ts`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `formatPrice()` connect `crud.ts` to `HomePage.tsx`, `cn`, `CatalogTables.tsx`, `CustomerDrawer.tsx`, `category/api.ts`, `coupon/api.ts`, `lucide-react`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _250 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `HomePage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05863316200266514 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `selectors.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1103448275862069 - nodes in this community are weakly interconnected._