# Graph Report - shashlik-web  (2026-08-20)

## Corpus Check
- 136 files · ~158,670 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 865 nodes · 2426 edges · 43 communities (35 shown, 8 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 60 edges (avg confidence: 0.53)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f57f14d9`
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
- cn
- banner/api.ts
- tailwind-merge
- @tanstack/react-query
- zustand
- AdminSidebar.tsx
- staff/api.ts
- product/model.ts
- StickyBar.tsx
- DesktopHome.tsx
- AddonForm.tsx
- cn.ts
- ProductCard.tsx
- FloatingActions.tsx
- counts.ts
- articles.ts
- crud.ts
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
- `useDuplicateProduct()` --indirect_call--> `product()`  [INFERRED]
  src/entities/product/api.ts → src/mocks/products.ts
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

## Communities (43 total, 8 thin omitted)

### Community 0 - "HomePage.tsx"
Cohesion: 0.08
Nodes (63): useDeleteAddon(), useDeleteBanner(), useUpdateBanner(), useDeleteCategory(), useCoupons(), useDeleteCoupon(), useUpdateCoupon(), useCustomersPage() (+55 more)

### Community 1 - "dependencies"
Cohesion: 0.12
Nodes (17): clsx, lucide-react, motion, dependencies, clsx, lucide-react, motion, pocketbase (+9 more)

### Community 2 - "selectors.ts"
Cohesion: 0.14
Nodes (23): createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchAdminProducts(), fetchProductById() (+15 more)

### Community 4 - "cn"
Cohesion: 0.07
Nodes (58): checkPromo(), OrderStatus, asNumberList(), asStatusMap(), asStringList(), enqueueSyncJob(), fetchActiveSyncJobs(), fetchFrontpadSettings() (+50 more)

### Community 5 - "CatalogTables.tsx"
Cohesion: 0.06
Nodes (58): adminReviewKeys, buildOrdersFilter(), createOrder(), CreateOrderInput, CreateReviewInput, fetchActiveResendJobs(), fetchAdminReviews(), fetchOrderById() (+50 more)

### Community 6 - "devDependencies"
Cohesion: 0.11
Nodes (19): devDependencies, tailwindcss, @tailwindcss/vite, tw-animate-css, @types/node, @types/react, @types/react-dom, typescript (+11 more)

### Community 7 - "compilerOptions"
Cohesion: 0.07
Nodes (26): DOM, DOM.Iterable, ES2023, node, src, vite/client, vite.config.ts, compilerOptions (+18 more)

### Community 8 - "CustomerDrawer.tsx"
Cohesion: 0.12
Nodes (24): buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams, CustomersPageResult, fetchCustomerById() (+16 more)

### Community 9 - "formatPrice"
Cohesion: 0.16
Nodes (18): fetchTags(), mapTag(), TagInput, tagKeys, tagMutations, TagRecord, tagsForCategory(), useCategoryTags() (+10 more)

### Community 10 - "category/api.ts"
Cohesion: 0.15
Nodes (16): useCategories(), updateBody(), updateProduct(), useDeleteProduct(), useToggleProductActive(), useUpdateProduct(), SearchDialog(), BADGE_OPTIONS (+8 more)

### Community 13 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 14 - "banner/api.ts"
Cohesion: 0.18
Nodes (9): AdminGate(), AdminLogin, AdminPage, AppRoutes(), EASE, EXIT_ABS, loadMotionFeatures(), AdminLogin() (+1 more)

### Community 15 - "product/model.ts"
Cohesion: 0.10
Nodes (22): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+14 more)

### Community 16 - "AdminPage.tsx"
Cohesion: 0.21
Nodes (9): App(), readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), ScrollToTop(), container (+1 more)

### Community 17 - "products.ts"
Cohesion: 0.11
Nodes (19): CategoryId, KNOWN_CATEGORY_IDS, KnownCategoryId, DEFAULT_CRITERIA, MeatIcon, Product, ProductBadge, ProductNutrition (+11 more)

### Community 18 - "crud.ts"
Cohesion: 0.13
Nodes (22): buildSeries(), buildTopProducts(), countByFilter(), DashboardData, dashboardKeys, DashboardSection(), dayKey(), fetchDashboard() (+14 more)

### Community 19 - "ProductEditor.tsx"
Cohesion: 0.23
Nodes (11): Props, CYR_MAP, DEFAULT_NUTRITION, Props, ALLOWED, formatMb(), IMAGE_MAX_BYTES, ImageField() (+3 more)

### Community 20 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, preview, typecheck, type (+1 more)

### Community 21 - "coupon/api.ts"
Cohesion: 0.11
Nodes (21): couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail, PromoCheckOk (+13 more)

### Community 22 - "lucide-react"
Cohesion: 0.07
Nodes (48): AppliedCoupon, calcCouponDiscount(), formatCouponValue(), useCreateOrder(), DeliveryMode, productKeys, useProducts(), articleFor() (+40 more)

### Community 24 - "cn"
Cohesion: 0.14
Nodes (16): cn(), ConfirmDialog(), Select(), SIZES, StepBtn(), Stepper(), StepperProps, GroupLabel() (+8 more)

### Community 25 - "banner/api.ts"
Cohesion: 0.05
Nodes (52): addonKeys, addonMutations, AddonRecord, CreateAddonInput, createBody(), fetchAddonById(), fetchAddons(), fetchAddonsByKind() (+44 more)

### Community 29 - "AdminSidebar.tsx"
Cohesion: 0.18
Nodes (14): GuardedSection(), AdminAuth, AdminAuthContext, AdminAuthProvider(), authErrorMessage(), can(), isAbortError(), isStaffRecord() (+6 more)

### Community 30 - "staff/api.ts"
Cohesion: 0.15
Nodes (17): CreateStaffInput, fetchStaff(), mapStaff(), mapStaffRequired(), staffKeys, StaffMember, staffMutations, StaffRecord (+9 more)

### Community 31 - "product/model.ts"
Cohesion: 0.29
Nodes (6): AdminTopbar(), fetchNewOrdersCount(), newOrdersKey, pb, queryClient, QueryKey

### Community 32 - "StickyBar.tsx"
Cohesion: 0.17
Nodes (12): CategoryIcon(), Props, TagFilterId, Chip(), ChipProps, OptionCardProps, Glass(), GlassProps (+4 more)

### Community 33 - "DesktopHome.tsx"
Cohesion: 0.21
Nodes (10): CartPanelState, useCartPanelStore, CartDock(), DesktopHome(), Props, Options, useInView(), useSettling() (+2 more)

### Community 34 - "AddonForm.tsx"
Cohesion: 0.36
Nodes (8): useAddons(), useAdminProducts(), useFrontpadStockArticles(), ProductEditorRoute(), ArticleMatrix(), cellArticle(), Props, setCellArticle()

### Community 35 - "cn.ts"
Cohesion: 0.23
Nodes (7): FreshStamp(), STAMP_GLYPHS, formatGrams(), NutritionHint(), OptionCard(), HintMark(), TooltipContent()

### Community 36 - "ProductCard.tsx"
Cohesion: 0.30
Nodes (9): minPrice(), ProductCard(), ProductCardProps, ProductCardCompact(), Props, BADGE_LABEL, scoreColor(), ScoreValue() (+1 more)

### Community 37 - "FloatingActions.tsx"
Cohesion: 0.25
Nodes (8): useTheme(), CartToggle(), formatOrderSum(), Props, ThemeToggle(), FloatingActions(), Props, TONE

### Community 38 - "counts.ts"
Cohesion: 0.27
Nodes (8): SectionStub(), ADMIN_NAV, AdminNavItem, AdminRole, AdminSectionId, AdminSidebar(), PILL, Props

### Community 39 - "articles.ts"
Cohesion: 0.29
Nodes (8): articleConflictMessage(), ArticleExclude, ArticleRef, cellLabel(), collectArticleConflicts(), isExcludedCell(), product(), shawarma()

### Community 40 - "crud.ts"
Cohesion: 0.28
Nodes (8): collectionMutations(), CollectionMutationsConfig, FIELD_CODE_RU, invalidate(), listKeys(), MutationKeys, QueryKey, syncDetail()

## Knowledge Gaps
- **253 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+248 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `StickyBar.tsx`, `HomePage.tsx`, `AddonForm.tsx`, `cn.ts`, `ProductCard.tsx`, `FloatingActions.tsx`, `counts.ts`, `DesktopHome.tsx`, `CustomerDrawer.tsx`, `cn`, `category/api.ts`, `product/model.ts`, `crud.ts`, `ProductEditor.tsx`, `coupon/api.ts`, `lucide-react`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **Why does `pb` connect `product/model.ts` to `selectors.ts`, `cn`, `CatalogTables.tsx`, `articles.ts`, `CustomerDrawer.tsx`, `formatPrice`, `crud.ts`, `product/model.ts`, `crud.ts`, `coupon/api.ts`, `banner/api.ts`, `AdminSidebar.tsx`, `staff/api.ts`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Why does `formatPrice()` connect `lucide-react` to `HomePage.tsx`, `cn.ts`, `ProductCard.tsx`, `CatalogTables.tsx`, `cn`, `CustomerDrawer.tsx`, `category/api.ts`, `crud.ts`, `banner/api.ts`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _253 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `HomePage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08011204481792718 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `selectors.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13666666666666666 - nodes in this community are weakly interconnected._