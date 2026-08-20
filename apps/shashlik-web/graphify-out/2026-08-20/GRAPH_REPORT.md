# Graph Report - shashlik-web  (2026-08-20)

## Corpus Check
- 136 files · ~158,035 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 854 nodes · 2427 edges · 43 communities (35 shown, 8 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 59 edges (avg confidence: 0.53)
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
- DashboardSection.tsx
- banner/api.ts
- tailwind-merge
- @tanstack/react-query
- zustand
- AdminSidebar.tsx
- order/model.ts
- product/model.ts
- OrderDrawer.tsx
- staff/api.ts
- AddonForm.tsx
- settingsFallback
- SettingsSection.tsx
- addons.ts
- counts.ts
- crud.ts
- invalidateProductRatings
- lucide-react
- react-dom

## God Nodes (most connected - your core abstractions)
1. `cn()` - 99 edges
2. `formatPrice()` - 39 edges
3. `Button()` - 34 edges
4. `useCategories()` - 24 edges
5. `useAdminProducts()` - 20 edges
6. `ProductEditor()` - 19 edges
7. `Input()` - 19 edges
8. `pb` - 18 edges
9. `Badge()` - 18 edges
10. `compilerOptions` - 18 edges

## Surprising Connections (you probably didn't know these)
- `AdminGate()` --calls--> `useAdminAuth()`  [EXTRACTED]
  src/app/router.tsx → src/shared/api/auth.ts
- `useDuplicateProduct()` --indirect_call--> `product()`  [INFERRED]
  src/entities/product/api.ts → src/mocks/products.ts
- `useAddProduct()` --indirect_call--> `product()`  [INFERRED]
  src/features/cart/lib/useAddProduct.ts → src/mocks/products.ts
- `SumRow()` --calls--> `cn()`  [EXTRACTED]
  src/features/cart/ui/CartPanel.tsx → src/shared/lib/cn.ts
- `SearchDialog()` --indirect_call--> `product()`  [INFERRED]
  src/features/search/SearchDialog.tsx → src/mocks/products.ts

## Import Cycles
- None detected.

## Communities (43 total, 8 thin omitted)

### Community 0 - "HomePage.tsx"
Cohesion: 0.08
Nodes (65): useDeleteAddon(), useDeleteBanner(), useDeleteCategory(), useCoupons(), useDeleteCoupon(), useCustomersPage(), useAdminReviews(), useDeleteReview() (+57 more)

### Community 1 - "dependencies"
Cohesion: 0.12
Nodes (17): class-variance-authority, clsx, motion, dependencies, class-variance-authority, clsx, motion, pocketbase (+9 more)

### Community 2 - "selectors.ts"
Cohesion: 0.11
Nodes (27): adminProductKeys, createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchAdminProducts() (+19 more)

### Community 4 - "cn"
Cohesion: 0.10
Nodes (36): OrderStatus, asNumberList(), asStatusMap(), asStringList(), enqueueSyncJob(), fetchActiveSyncJobs(), fetchFrontpadSettings(), fetchStoppedStock() (+28 more)

### Community 5 - "CatalogTables.tsx"
Cohesion: 0.10
Nodes (29): adminReviewKeys, buildOrdersFilter(), createOrder(), CreateOrderInput, CreateReviewInput, fetchAdminReviews(), fetchOrderById(), fetchOrders() (+21 more)

### Community 6 - "devDependencies"
Cohesion: 0.11
Nodes (19): devDependencies, tailwindcss, @tailwindcss/vite, tw-animate-css, @types/node, @types/react, @types/react-dom, typescript (+11 more)

### Community 7 - "compilerOptions"
Cohesion: 0.07
Nodes (26): DOM, DOM.Iterable, ES2023, node, src, vite/client, vite.config.ts, compilerOptions (+18 more)

### Community 8 - "CustomerDrawer.tsx"
Cohesion: 0.13
Nodes (24): buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams, CustomersPageResult, fetchCustomerById() (+16 more)

### Community 9 - "formatPrice"
Cohesion: 0.15
Nodes (18): fetchTags(), mapTag(), TagInput, tagKeys, tagMutations, TagRecord, tagsForCategory(), useCategoryTags() (+10 more)

### Community 10 - "category/api.ts"
Cohesion: 0.20
Nodes (14): useAddons(), useFrontpadStockArticles(), articleConflictMessage(), ArticleExclude, ArticleRef, cellLabel(), collectArticleConflicts(), isExcludedCell() (+6 more)

### Community 13 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 14 - "banner/api.ts"
Cohesion: 0.18
Nodes (17): addonKeys, addonMutations, AddonRecord, CreateAddonInput, createBody(), fetchAddonById(), fetchAddons(), fetchAddonsByKind() (+9 more)

### Community 15 - "product/model.ts"
Cohesion: 0.13
Nodes (17): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+9 more)

### Community 16 - "AdminPage.tsx"
Cohesion: 0.11
Nodes (16): App(), readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), AdminGate(), AdminLogin (+8 more)

### Community 17 - "products.ts"
Cohesion: 0.13
Nodes (16): CategoryId, KNOWN_CATEGORY_IDS, KnownCategoryId, DEFAULT_CRITERIA, ProductBadge, ProductRating, ProductSize, ProductTag (+8 more)

### Community 18 - "crud.ts"
Cohesion: 0.06
Nodes (48): useTheme(), CategoryIcon(), Props, MeatIcon, ALL_TAG, TagFilterId, CartToggle(), formatOrderSum() (+40 more)

### Community 19 - "ProductEditor.tsx"
Cohesion: 0.12
Nodes (21): useCreateProduct(), ProductNutrition, AdminLogin(), BADGE_OPTIONS, MEAT_OPTIONS, newId(), PreviewToggle(), Props (+13 more)

### Community 20 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, preview, typecheck, type (+1 more)

### Community 21 - "coupon/api.ts"
Cohesion: 0.11
Nodes (21): checkPromo(), couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail (+13 more)

### Community 22 - "lucide-react"
Cohesion: 0.06
Nodes (54): useBanners(), useCategories(), useProducts(), articleFor(), cartLineTitle(), findSize(), findVariant(), hasMissingArticle() (+46 more)

### Community 24 - "DashboardSection.tsx"
Cohesion: 0.13
Nodes (21): buildSeries(), buildTopProducts(), countByFilter(), DashboardData, dashboardKeys, DashboardSection(), dayKey(), fetchDashboard() (+13 more)

### Community 25 - "banner/api.ts"
Cohesion: 0.14
Nodes (17): bannerKeys, bannerMutations, BannerRecord, CreateBannerInput, fetchBannerById(), fetchBanners(), mapBanner(), UpdateBannerInput (+9 more)

### Community 29 - "AdminSidebar.tsx"
Cohesion: 0.19
Nodes (11): GuardedSection(), AdminAuth, authErrorMessage(), can(), isStaffRecord(), MANAGER_UPDATE, MANAGER_VIEW, readUser() (+3 more)

### Community 30 - "order/model.ts"
Cohesion: 0.13
Nodes (14): FrontpadJob, FrontpadJobKind, FrontpadJobStatus, Order, ORDER_STATUS_FLOW, ORDER_STATUS_LABEL, ORDER_STATUS_SOURCE_LABEL, OrderAddressParts (+6 more)

### Community 31 - "product/model.ts"
Cohesion: 0.12
Nodes (21): AppliedCoupon, calcCouponDiscount(), formatCouponValue(), DeliveryMode, CartTotals, ResolvedAddon, ResolvedLine, useCartTotals() (+13 more)

### Community 32 - "OrderDrawer.tsx"
Cohesion: 0.24
Nodes (14): fetchActiveResendJobs(), mapJob(), resendOrder(), useOrder(), useOrderJobs(), useResendOrder(), useUpdateOrderStatus(), formatAddress() (+6 more)

### Community 33 - "staff/api.ts"
Cohesion: 0.19
Nodes (14): CreateStaffInput, fetchStaff(), mapStaff(), mapStaffRequired(), staffKeys, StaffMember, staffMutations, StaffRecord (+6 more)

### Community 34 - "AddonForm.tsx"
Cohesion: 0.20
Nodes (10): useCreateAddon(), useUpdateAddon(), Addon, AddonKind, addons, extras, IMG, sauces (+2 more)

### Community 35 - "settingsFallback"
Cohesion: 0.29
Nodes (9): fetchSettings(), mapSettings(), useSettings(), settingsFallback(), SITE, AddressBar(), PromoBanner(), Sidebar() (+1 more)

### Community 36 - "SettingsSection.tsx"
Cohesion: 0.23
Nodes (10): settingsKeys, useUpdateSettings(), FrontpadPanel(), parseNonNeg(), SettingsSection(), TabId, TABS, queryClient (+2 more)

### Community 37 - "addons.ts"
Cohesion: 0.24
Nodes (8): bannerFormData(), BannerNote, useCreateBanner(), useUpdateBanner(), Banner, banners, BannerForm(), Props

### Community 38 - "counts.ts"
Cohesion: 0.27
Nodes (8): SectionStub(), ADMIN_NAV, AdminNavItem, AdminRole, AdminSectionId, AdminSidebar(), PILL, Props

### Community 39 - "crud.ts"
Cohesion: 0.24
Nodes (9): collectionMutations(), CollectionMutationsConfig, FIELD_CODE_RU, invalidate(), listKeys(), MutationKeys, QueryKey, syncDetail() (+1 more)

### Community 40 - "invalidateProductRatings"
Cohesion: 0.67
Nodes (4): invalidateProductRatings(), useCreateReview(), useUpdateReview(), ReviewForm()

## Knowledge Gaps
- **249 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+244 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `crud.ts` to `HomePage.tsx`, `settingsFallback`, `counts.ts`, `category/api.ts`, `product/model.ts`, `ProductEditor.tsx`, `coupon/api.ts`, `lucide-react`, `DashboardSection.tsx`, `product/model.ts`?**
  _High betweenness centrality (0.093) - this node is a cross-community bridge._
- **Why does `pb` connect `banner/api.ts` to `staff/api.ts`, `selectors.ts`, `cn`, `CatalogTables.tsx`, `SettingsSection.tsx`, `crud.ts`, `CustomerDrawer.tsx`, `formatPrice`, `category/api.ts`, `banner/api.ts`, `product/model.ts`, `coupon/api.ts`, `DashboardSection.tsx`, `AdminSidebar.tsx`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Why does `formatPrice()` connect `lucide-react` to `HomePage.tsx`, `OrderDrawer.tsx`, `cn`, `SettingsSection.tsx`, `CustomerDrawer.tsx`, `crud.ts`, `ProductEditor.tsx`, `DashboardSection.tsx`, `product/model.ts`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _249 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `HomePage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07993730407523511 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `selectors.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11330049261083744 - nodes in this community are weakly interconnected._