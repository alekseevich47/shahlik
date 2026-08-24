# Graph Report - shashlik-web  (2026-08-24)

## Corpus Check
- 173 files · ~174,000 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1098 nodes · 3243 edges · 49 communities (40 shown, 9 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 81 edges (avg confidence: 0.54)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `91304cd2`
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
- files.ts
- articles.ts
- lucide-react
- react-dom
- category/api.ts
- site.ts
- compress-image.ts
- lucide-react
- react-easy-crop
- sonner
- banner/model.ts
- orders.ts

## God Nodes (most connected - your core abstractions)
1. `cn()` - 117 edges
2. `formatPrice()` - 50 edges
3. `Button()` - 42 edges
4. `useCartTotals()` - 24 edges
5. `ProductEditor()` - 23 edges
6. `useCategories()` - 22 edges
7. `Input()` - 22 edges
8. `pb` - 21 edges
9. `useAdminProducts()` - 20 edges
10. `useConfirm()` - 19 edges

## Surprising Connections (you probably didn't know these)
- `AdminGate()` --calls--> `useAdminAuth()`  [EXTRACTED]
  src/app/router.tsx → src/shared/api/auth.tsx
- `AdminAuthProvider()` --indirect_call--> `logout()`  [INFERRED]
  src/shared/api/auth.tsx → src/entities/account/api.ts
- `resolveBadgeLabel()` --calls--> `badgeLabel()`  [EXTRACTED]
  src/shared/config/site.ts → src/entities/badge/model.ts
- `useDuplicateProduct()` --indirect_call--> `product()`  [INFERRED]
  src/entities/product/api.ts → src/mocks/products.ts
- `collectArticleConflicts()` --indirect_call--> `product()`  [INFERRED]
  src/entities/product/lib/articles.ts → src/mocks/products.ts

## Import Cycles
- None detected.

## Communities (49 total, 9 thin omitted)

### Community 0 - "HomePage.tsx"
Cohesion: 0.06
Nodes (62): BadgeInput, badgeKeys, badgeMutations, BadgeRecord, fetchBadges(), mapBadge(), seedFallback(), useBadges() (+54 more)

### Community 1 - "dependencies"
Cohesion: 0.12
Nodes (17): clsx, motion, dependencies, clsx, motion, pocketbase, @radix-ui/react-dialog, @radix-ui/react-slot (+9 more)

### Community 2 - "selectors.ts"
Cohesion: 0.13
Nodes (26): createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchProductById(), fetchProductBySlug() (+18 more)

### Community 4 - "cn"
Cohesion: 0.11
Nodes (33): asNumberList(), asStatusMap(), asStringList(), enqueueApplyPricesJob(), enqueueSyncJob(), fetchActiveSyncJobs(), fetchApplyPricesJobs(), fetchFrontpadSettings() (+25 more)

### Community 5 - "CatalogTables.tsx"
Cohesion: 0.11
Nodes (23): adminReviewKeys, CreateOrderInput, CreateReviewInput, fetchActiveResendJobs(), fetchAdminReviews(), fetchReviewById(), fetchReviews(), FrontpadJobRecord (+15 more)

### Community 6 - "devDependencies"
Cohesion: 0.11
Nodes (19): devDependencies, tailwindcss, @tailwindcss/vite, tw-animate-css, @types/node, @types/react, @types/react-dom, typescript (+11 more)

### Community 7 - "compilerOptions"
Cohesion: 0.07
Nodes (26): DOM, DOM.Iterable, ES2023, node, src, vite/client, vite.config.ts, compilerOptions (+18 more)

### Community 8 - "CustomerDrawer.tsx"
Cohesion: 0.06
Nodes (68): AccountAuth, AccountContext, AccountProvider(), isAbortError(), refreshAuth(), useAccount(), accountKeys, addAddress() (+60 more)

### Community 9 - "formatPrice"
Cohesion: 0.10
Nodes (26): fetchTags(), mapTag(), TagInput, tagKeys, tagMutations, TagRecord, tagsForCategory(), useCategoryTags() (+18 more)

### Community 10 - "category/api.ts"
Cohesion: 0.14
Nodes (13): FrontpadJob, FrontpadJobKind, FrontpadJobStatus, ORDER_STATUS_FLOW, ORDER_STATUS_LABEL, ORDER_STATUS_SOURCE_LABEL, OrderLineAddon, OrderStatus (+5 more)

### Community 13 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 14 - "banner/api.ts"
Cohesion: 0.06
Nodes (40): App(), readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), useTheme(), AdminGate() (+32 more)

### Community 15 - "product/model.ts"
Cohesion: 0.10
Nodes (25): useBanners(), CategoryIcon(), Props, SumRow(), FreshStamp(), STAMP_GLYPHS, cn(), ConfirmDialog() (+17 more)

### Community 16 - "AdminPage.tsx"
Cohesion: 0.54
Nodes (6): fetchSettings(), mapSettings(), useSettings(), settingsFallback(), AddressBar(), PromoBanner()

### Community 17 - "products.ts"
Cohesion: 0.09
Nodes (23): CategoryId, DEFAULT_CRITERIA, MeatIcon, ProductBadge, ProductNutrition, ProductRating, ProductSize, ProductTag (+15 more)

### Community 18 - "crud.ts"
Cohesion: 0.13
Nodes (22): buildSeries(), buildTopProducts(), countByFilter(), DashboardData, dashboardKeys, DashboardSection(), dayKey(), fetchDashboard() (+14 more)

### Community 19 - "ProductEditor.tsx"
Cohesion: 0.13
Nodes (24): buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams, CustomersPageResult, fetchCustomerById() (+16 more)

### Community 20 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, preview, typecheck, type (+1 more)

### Community 21 - "coupon/api.ts"
Cohesion: 0.06
Nodes (56): checkPromo(), couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail (+48 more)

### Community 22 - "lucide-react"
Cohesion: 0.23
Nodes (9): Chip(), ChipProps, OptionCard(), OptionCardProps, Props, SPRING, TagFilters(), Props (+1 more)

### Community 23 - "@radix-ui/react-dialog"
Cohesion: 0.13
Nodes (14): SectionStub(), ADMIN_NAV, AdminNavItem, AdminRole, AdminSectionId, AdminSidebar(), PILL, Props (+6 more)

### Community 24 - "cn"
Cohesion: 0.06
Nodes (47): bannerFormData(), bannerKeys, bannerMutations, BannerNote, BannerRecord, CreateBannerInput, fetchBannerById(), fetchBanners() (+39 more)

### Community 25 - "banner/api.ts"
Cohesion: 0.16
Nodes (20): addonKeys, addonMutations, AddonRecord, CreateAddonInput, createBody(), fetchAddonById(), fetchAddons(), fetchAddonsByKind() (+12 more)

### Community 26 - "tailwind-merge"
Cohesion: 0.16
Nodes (14): Addon, AddonKind, articleConflictMessage(), ArticleExclude, ArticleRef, cellLabel(), collectArticleConflicts(), isExcludedCell() (+6 more)

### Community 28 - "zustand"
Cohesion: 0.15
Nodes (22): adminProductKeys, productKeys, ApplyPricesJobResult, asRowList(), buildCells(), CashPriceCell, CashPricePlan, CashPriceStatus (+14 more)

### Community 29 - "AdminSidebar.tsx"
Cohesion: 0.31
Nodes (9): useAddons(), fetchAdminProducts(), useAdminProducts(), useFrontpadStockArticles(), ProductEditorRoute(), ArticleMatrix(), cellArticle(), Props (+1 more)

### Community 30 - "staff/api.ts"
Cohesion: 0.33
Nodes (5): fetchOrderById(), fetchPublicOrder(), orderKeys, usePublicOrder(), queryClient

### Community 31 - "product/model.ts"
Cohesion: 0.28
Nodes (8): CollectionMutationsConfig, FIELD_CODE_RU, invalidate(), listKeys(), MutationKeys, QueryKey, syncDetail(), wrapError()

### Community 32 - "StickyBar.tsx"
Cohesion: 0.25
Nodes (8): buildOrdersFilter(), createOrder(), fetchOrders(), fetchOrdersPage(), mapOrder(), subscribeOrderStatus(), updateOrderStatus(), useOrders()

### Community 33 - "DesktopHome.tsx"
Cohesion: 0.15
Nodes (15): CartPanelState, useCartPanelStore, CartDock(), catalogSectionId(), groupProductsByCategory(), Options, useCatalogScrollSpy(), CatalogCategorySection() (+7 more)

### Community 34 - "AddonForm.tsx"
Cohesion: 0.14
Nodes (20): frontpadSettingsKeys, settingsKeys, stoppedStockKeys, syncJobKeys, useUpdateSettings(), formatRemaining(), FrontpadPanel(), parseDigitCodes() (+12 more)

### Community 35 - "cn.ts"
Cohesion: 0.24
Nodes (9): OrderLineSnapshot, repeatOrderIntoCart(), useLiveOrder(), formatAddress(), LineRow(), OrderDetails(), Props, OrderTrackPage() (+1 more)

### Community 36 - "ProductCard.tsx"
Cohesion: 0.05
Nodes (91): useDeleteAddon(), useDeleteBanner(), useDeleteCategory(), useCoupons(), useDeleteCoupon(), useCustomersPage(), invalidateProductRatings(), useCreateReview() (+83 more)

### Community 37 - "files.ts"
Cohesion: 0.32
Nodes (6): CartToggle(), formatOrderSum(), Props, FloatingActions(), Props, TONE

### Community 39 - "articles.ts"
Cohesion: 0.83
Nodes (3): useIsDesktop(), useIsWide(), useMediaQuery()

### Community 41 - "lucide-react"
Cohesion: 0.23
Nodes (12): useCategories(), useProducts(), needsChooser(), Product, ALL_TAG, TagFilterId, useAddProduct(), HomePage() (+4 more)

### Community 44 - "category/api.ts"
Cohesion: 0.10
Nodes (22): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+14 more)

### Community 52 - "banner/model.ts"
Cohesion: 0.29
Nodes (8): updateBody(), updateProduct(), useDeleteProduct(), useToggleProductActive(), useUpdateProduct(), hasMissingArticle(), applyFilteredReorder(), ProductsSection()

### Community 55 - "orders.ts"
Cohesion: 0.33
Nodes (5): Order, Review, coupons, orders, reviews

## Knowledge Gaps
- **293 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+288 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `product/model.ts` to `HomePage.tsx`, `cn.ts`, `ProductCard.tsx`, `files.ts`, `CustomerDrawer.tsx`, `formatPrice`, `lucide-react`, `category/api.ts`, `banner/api.ts`, `AdminPage.tsx`, `products.ts`, `crud.ts`, `coupon/api.ts`, `lucide-react`, `@radix-ui/react-dialog`, `cn`, `zustand`, `AdminSidebar.tsx`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Why does `formatPrice()` connect `coupon/api.ts` to `HomePage.tsx`, `AddonForm.tsx`, `cn.ts`, `ProductCard.tsx`, `CustomerDrawer.tsx`, `products.ts`, `crud.ts`, `ProductEditor.tsx`, `banner/model.ts`, `zustand`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `pb` connect `banner/api.ts` to `HomePage.tsx`, `selectors.ts`, `AddonForm.tsx`, `cn`, `CatalogTables.tsx`, `ProductCard.tsx`, `CustomerDrawer.tsx`, `formatPrice`, `category/api.ts`, `crud.ts`, `ProductEditor.tsx`, `coupon/api.ts`, `cn`, `banner/api.ts`, `tailwind-merge`, `product/model.ts`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _293 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `HomePage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.057813911472448055 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `selectors.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12807881773399016 - nodes in this community are weakly interconnected._