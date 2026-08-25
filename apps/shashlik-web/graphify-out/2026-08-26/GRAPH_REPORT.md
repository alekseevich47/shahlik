# Graph Report - shashlik-web  (2026-08-26)

## Corpus Check
- 174 files · ~174,760 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1107 nodes · 3266 edges · 60 communities (50 shown, 10 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 81 edges (avg confidence: 0.54)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5c869518`
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
- customer/api.ts
- OrdersSection.tsx
- useAdminAuth
- NutritionHint.tsx
- button.tsx
- lucide-react
- react-dom
- AdminPage.tsx
- theme.tsx
- site.ts
- compress-image.ts
- lucide-react
- react-easy-crop
- sonner
- invalidateProductRatings
- pocketbase
- @radix-ui/react-popover
- selectors.ts
- store.ts
- ProductPage.tsx
- zustand
- coupon/api.ts
- category/api.ts
- FloatingActions.tsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 119 edges
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
- `planAllCashPrices()` --indirect_call--> `product()`  [INFERRED]
  src/entities/product/lib/prices.ts → src/mocks/products.ts

## Import Cycles
- None detected.

## Communities (60 total, 10 thin omitted)

### Community 0 - "HomePage.tsx"
Cohesion: 0.05
Nodes (59): addonKeys, addonMutations, AddonRecord, CreateAddonInput, createBody(), fetchAddonById(), fetchAddons(), fetchAddonsByKind() (+51 more)

### Community 1 - "dependencies"
Cohesion: 0.12
Nodes (17): class-variance-authority, clsx, lucide-react, motion, dependencies, class-variance-authority, clsx, lucide-react (+9 more)

### Community 2 - "selectors.ts"
Cohesion: 0.11
Nodes (26): adminProductKeys, createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchAdminProducts() (+18 more)

### Community 4 - "cn"
Cohesion: 0.06
Nodes (66): checkPromo(), OrderStatus, applyPricesJobKeys, asNumberList(), asStatusMap(), asStringList(), enqueueApplyPricesJob(), enqueueSyncJob() (+58 more)

### Community 5 - "CatalogTables.tsx"
Cohesion: 0.10
Nodes (30): adminReviewKeys, buildOrdersFilter(), createOrder(), CreateOrderInput, CreateReviewInput, fetchAdminReviews(), fetchMyOrders(), fetchOrderById() (+22 more)

### Community 6 - "devDependencies"
Cohesion: 0.11
Nodes (19): devDependencies, tailwindcss, @tailwindcss/vite, tw-animate-css, @types/node, @types/react, @types/react-dom, typescript (+11 more)

### Community 7 - "compilerOptions"
Cohesion: 0.07
Nodes (26): DOM, DOM.Iterable, ES2023, node, src, vite/client, vite.config.ts, compilerOptions (+18 more)

### Community 8 - "CustomerDrawer.tsx"
Cohesion: 0.06
Nodes (72): AccountAuth, AccountContext, AccountProvider(), isAbortError(), refreshAuth(), useAccount(), acceptAuthToken(), accountCacheKey() (+64 more)

### Community 9 - "formatPrice"
Cohesion: 0.15
Nodes (18): fetchTags(), mapTag(), TagInput, tagKeys, tagMutations, TagRecord, tagsForCategory(), useCategoryTags() (+10 more)

### Community 10 - "category/api.ts"
Cohesion: 0.14
Nodes (17): FrontpadJob, FrontpadJobKind, FrontpadJobStatus, Order, ORDER_STATUS_LABEL, OrderLineAddon, OrderLineSnapshot, OrderStatusSource (+9 more)

### Community 13 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 14 - "banner/api.ts"
Cohesion: 0.18
Nodes (14): GuardedSection(), AdminAuth, AdminAuthContext, AdminAuthProvider(), authErrorMessage(), can(), isAbortError(), isStaffRecord() (+6 more)

### Community 15 - "product/model.ts"
Cohesion: 0.26
Nodes (10): useProducts(), HomePage(), MobileHome(), useIsDesktop(), useIsWide(), useMediaQuery(), MobileTab, MobileTabBar() (+2 more)

### Community 16 - "AdminPage.tsx"
Cohesion: 0.17
Nodes (21): ApplyPricesJobResult, asRowList(), buildCells(), CashPriceCell, CashPricePlan, CashPriceStatus, cellDelta(), parseApplyPricesResult() (+13 more)

### Community 17 - "products.ts"
Cohesion: 0.12
Nodes (14): DEFAULT_CRITERIA, MeatIcon, ProductBadge, ProductRating, ProductTag, ProductVariant, RatingCriterion, MEAT_VARIANTS (+6 more)

### Community 18 - "crud.ts"
Cohesion: 0.17
Nodes (15): useCreateProduct(), DEFAULT_NUTRITION, ProductCreateForm(), Props, STATUS_FILTERS, move(), Props, SortableList() (+7 more)

### Community 19 - "ProductEditor.tsx"
Cohesion: 0.15
Nodes (17): useCustomersPage(), useUpdateCustomer(), Customer, CUSTOMER_FIELD_LIMITS, CustomerSortKey, useOrdersPage(), CustomerDrawer(), digitsOnly() (+9 more)

### Community 20 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, preview, typecheck, type (+1 more)

### Community 21 - "coupon/api.ts"
Cohesion: 0.16
Nodes (15): useDeleteAddon(), useDeleteBanner(), useCreateCategory(), useDeleteCategory(), useUpdateCategory(), useAdminProducts(), loadDomMax(), ProductEditorRoute() (+7 more)

### Community 22 - "lucide-react"
Cohesion: 0.13
Nodes (16): ALL_TAG, CategoryTag, TagFilterId, productTags, Chip(), ChipProps, OptionCard(), OptionCardProps (+8 more)

### Community 23 - "@radix-ui/react-dialog"
Cohesion: 0.14
Nodes (20): buildSeries(), buildTopProducts(), countByFilter(), DashboardData, dashboardKeys, DashboardSection(), dayKey(), fetchDashboard() (+12 more)

### Community 24 - "cn"
Cohesion: 0.12
Nodes (23): canvasToBlob(), compressImage(), CompressOptions, loadImage(), canvasToBlob(), CropArea, cropImageToFile(), loadImage() (+15 more)

### Community 25 - "banner/api.ts"
Cohesion: 0.22
Nodes (16): useBadges(), badgeLabel(), PRODUCT_ASPECT_RATIO, minPrice(), isProductStopped(), ProductCard(), ProductCardProps, ProductCardCompact() (+8 more)

### Community 26 - "tailwind-merge"
Cohesion: 0.21
Nodes (13): useFrontpadStockArticles(), articleConflictMessage(), ArticleExclude, ArticleRef, cellLabel(), collectArticleConflicts(), isExcludedCell(), ProductSize (+5 more)

### Community 28 - "zustand"
Cohesion: 0.20
Nodes (14): fetchActiveResendJobs(), mapJob(), resendOrder(), useOrderJobs(), useResendOrder(), isFrontpadWarning(), ORDER_STATUS_FLOW, ORDER_STATUS_SOURCE_LABEL (+6 more)

### Community 29 - "AdminSidebar.tsx"
Cohesion: 0.14
Nodes (18): BadgeInput, badgeKeys, badgeMutations, BadgeRecord, fetchBadges(), mapBadge(), seedFallback(), useCreateBadge() (+10 more)

### Community 30 - "staff/api.ts"
Cohesion: 0.17
Nodes (15): CreateStaffInput, fetchStaff(), mapStaff(), mapStaffRequired(), staffKeys, StaffMember, staffMutations, StaffRecord (+7 more)

### Community 31 - "product/model.ts"
Cohesion: 0.23
Nodes (8): useDeleteProduct(), imagesFromProduct(), MEAT_OPTIONS, newId(), PreviewToggle(), ProductEditor(), Props, multiImageDiff()

### Community 32 - "StickyBar.tsx"
Cohesion: 0.17
Nodes (23): useCreateStaff(), KIND_FILTERS, STATUS_FILTERS, STATUS_FILTERS, ROLE_FILTERS, ROLE_LABEL, StaffCreateForm(), Column (+15 more)

### Community 33 - "DesktopHome.tsx"
Cohesion: 0.18
Nodes (12): needsChooser(), Product, useAddProduct(), CartPanelState, useCartPanelStore, CartDock(), groupProductsByCategory(), DesktopHome() (+4 more)

### Community 34 - "AddonForm.tsx"
Cohesion: 0.18
Nodes (10): useTheme(), CartToggle(), formatOrderSum(), Props, ThemeToggle(), FloatingActions(), Props, TONE (+2 more)

### Community 35 - "cn.ts"
Cohesion: 0.26
Nodes (8): fetchPublicOrder(), orderKeys, usePublicOrder(), repeatOrderIntoCart(), useLiveOrder(), OrderTrackPage(), RepeatButton(), queryClient

### Community 36 - "customer/api.ts"
Cohesion: 0.22
Nodes (12): buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams, CustomersPageResult, fetchCustomerById() (+4 more)

### Community 37 - "OrdersSection.tsx"
Cohesion: 0.17
Nodes (9): AdminGate(), AdminLogin, AdminPage, AuthCallbackPage, EASE, EXIT_ABS, loadMotionFeatures(), OrderTrackPage (+1 more)

### Community 38 - "useAdminAuth"
Cohesion: 0.33
Nodes (6): App(), AppRoutes(), ScrollToTop(), container, backgroundOf(), GlassDefs()

### Community 39 - "NutritionHint.tsx"
Cohesion: 0.50
Nodes (3): ProductNutrition, formatGrams(), NutritionHint()

### Community 40 - "button.tsx"
Cohesion: 0.24
Nodes (11): useAdminReviews(), useDeleteReview(), useToggleReviewPublished(), ProductOption, ReviewFormProps, ReviewsSection(), STATUS_FILTERS, useConfirm() (+3 more)

### Community 41 - "lucide-react"
Cohesion: 0.26
Nodes (7): catalogSectionId(), Options, useCatalogScrollSpy(), CatalogCategorySection(), Props, Props, AddressBar()

### Community 42 - "react-dom"
Cohesion: 0.25
Nodes (6): ALL_CATEGORY, Category, CategoryId, KNOWN_CATEGORY_IDS, KnownCategoryId, categories

### Community 43 - "AdminPage.tsx"
Cohesion: 0.27
Nodes (8): SectionStub(), ADMIN_NAV, AdminNavItem, AdminRole, AdminSectionId, AdminSidebar(), PILL, Props

### Community 44 - "theme.tsx"
Cohesion: 0.40
Nodes (5): readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider()

### Community 45 - "site.ts"
Cohesion: 0.47
Nodes (4): useBanners(), BANNER_ASPECT_RATIO, HeroBanner(), HoverArrow()

### Community 47 - "lucide-react"
Cohesion: 0.40
Nodes (6): updateBody(), updateProduct(), useToggleProductActive(), useUpdateProduct(), applyFilteredReorder(), ProductsSection()

### Community 48 - "react-easy-crop"
Cohesion: 0.47
Nodes (5): AdminLogin(), AdminTopbar(), fetchNewOrdersCount(), newOrdersKey, useAdminAuth()

### Community 50 - "invalidateProductRatings"
Cohesion: 0.67
Nodes (4): invalidateProductRatings(), useCreateReview(), useUpdateReview(), ReviewForm()

### Community 54 - "store.ts"
Cohesion: 0.06
Nodes (69): AppliedCoupon, calcCouponDiscount(), formatCouponValue(), useCreateOrder(), DeliveryMode, OrderAddressParts, articleFor(), cartLineTitle() (+61 more)

### Community 58 - "coupon/api.ts"
Cohesion: 0.13
Nodes (21): couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail, PromoCheckOk (+13 more)

### Community 59 - "category/api.ts"
Cohesion: 0.21
Nodes (12): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+4 more)

### Community 62 - "FloatingActions.tsx"
Cohesion: 0.11
Nodes (21): CategoryIcon(), Props, SumRow(), FreshStamp(), STAMP_GLYPHS, cn(), ConfirmDialog(), Modal() (+13 more)

## Knowledge Gaps
- **295 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+290 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `FloatingActions.tsx` to `selectors.ts`, `CustomerDrawer.tsx`, `category/api.ts`, `product/model.ts`, `AdminPage.tsx`, `crud.ts`, `ProductEditor.tsx`, `coupon/api.ts`, `lucide-react`, `@radix-ui/react-dialog`, `cn`, `banner/api.ts`, `tailwind-merge`, `AdminSidebar.tsx`, `product/model.ts`, `StickyBar.tsx`, `AddonForm.tsx`, `button.tsx`, `lucide-react`, `AdminPage.tsx`, `site.ts`, `store.ts`, `category/api.ts`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Why does `formatPrice()` connect `store.ts` to `StickyBar.tsx`, `cn`, `CustomerDrawer.tsx`, `category/api.ts`, `lucide-react`, `AdminPage.tsx`, `crud.ts`, `ProductEditor.tsx`, `coupon/api.ts`, `@radix-ui/react-dialog`, `banner/api.ts`, `coupon/api.ts`, `zustand`, `product/model.ts`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Why does `Button()` connect `crud.ts` to `HomePage.tsx`, `cn`, `CustomerDrawer.tsx`, `formatPrice`, `AdminPage.tsx`, `ProductEditor.tsx`, `coupon/api.ts`, `cn`, `banner/api.ts`, `zustand`, `AdminSidebar.tsx`, `product/model.ts`, `StickyBar.tsx`, `cn.ts`, `button.tsx`, `react-easy-crop`, `store.ts`, `coupon/api.ts`, `FloatingActions.tsx`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _295 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `HomePage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05086071987480438 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `selectors.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11375661375661375 - nodes in this community are weakly interconnected._