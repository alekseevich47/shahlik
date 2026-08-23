# Graph Report - shashlik-web  (2026-08-23)

## Corpus Check
- 142 files · ~161,616 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 901 nodes · 2544 edges · 48 communities (40 shown, 8 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 64 edges (avg confidence: 0.53)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `72d5cd00`
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
- ReviewsSection.tsx
- theme.tsx
- site.ts
- compress-image.ts
- lucide-react

## God Nodes (most connected - your core abstractions)
1. `cn()` - 103 edges
2. `formatPrice()` - 37 edges
3. `Button()` - 35 edges
4. `ProductEditor()` - 23 edges
5. `useCategories()` - 22 edges
6. `pb` - 20 edges
7. `Input()` - 20 edges
8. `useAdminProducts()` - 18 edges
9. `compilerOptions` - 18 edges
10. `settingsFallback()` - 17 edges

## Surprising Connections (you probably didn't know these)
- `AdminGate()` --calls--> `useAdminAuth()`  [EXTRACTED]
  src/app/router.tsx → src/shared/api/auth.tsx
- `resolveBadgeLabel()` --calls--> `badgeLabel()`  [EXTRACTED]
  src/shared/config/site.ts → src/entities/badge/model.ts
- `useDuplicateProduct()` --indirect_call--> `product()`  [INFERRED]
  src/entities/product/api.ts → src/mocks/products.ts
- `collectArticleConflicts()` --indirect_call--> `product()`  [INFERRED]
  src/entities/product/lib/articles.ts → src/mocks/products.ts
- `articleConflictMessage()` --indirect_call--> `product()`  [INFERRED]
  src/entities/product/lib/articles.ts → src/mocks/products.ts

## Import Cycles
- None detected.

## Communities (48 total, 8 thin omitted)

### Community 0 - "HomePage.tsx"
Cohesion: 0.14
Nodes (20): updateBody(), updateProduct(), useDeleteProduct(), useToggleProductActive(), useUpdateProduct(), hasMissingArticle(), applyFilteredReorder(), ProductsSection() (+12 more)

### Community 1 - "dependencies"
Cohesion: 0.12
Nodes (17): class-variance-authority, clsx, motion, dependencies, class-variance-authority, clsx, motion, pocketbase (+9 more)

### Community 2 - "selectors.ts"
Cohesion: 0.11
Nodes (28): adminProductKeys, createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchProductById() (+20 more)

### Community 4 - "cn"
Cohesion: 0.09
Nodes (40): FrontpadJobStatus, asNumberList(), asStatusMap(), asStringList(), enqueueSyncJob(), fetchActiveSyncJobs(), fetchFrontpadSettings(), fetchStoppedStock() (+32 more)

### Community 5 - "CatalogTables.tsx"
Cohesion: 0.09
Nodes (33): adminReviewKeys, buildOrdersFilter(), createOrder(), CreateOrderInput, CreateReviewInput, fetchAdminReviews(), fetchOrderById(), fetchOrders() (+25 more)

### Community 6 - "devDependencies"
Cohesion: 0.11
Nodes (19): devDependencies, tailwindcss, @tailwindcss/vite, tw-animate-css, @types/node, @types/react, @types/react-dom, typescript (+11 more)

### Community 7 - "compilerOptions"
Cohesion: 0.07
Nodes (26): DOM, DOM.Iterable, ES2023, node, src, vite/client, vite.config.ts, compilerOptions (+18 more)

### Community 8 - "CustomerDrawer.tsx"
Cohesion: 0.11
Nodes (30): buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams, CustomersPageResult, fetchCustomerById() (+22 more)

### Community 9 - "formatPrice"
Cohesion: 0.18
Nodes (15): fetchTags(), mapTag(), TagInput, tagKeys, tagMutations, TagRecord, useCreateTag(), useDeleteTag() (+7 more)

### Community 10 - "category/api.ts"
Cohesion: 0.15
Nodes (22): fetchActiveResendJobs(), orderJobKeys, orderKeys, useOrderJobs(), ORDER_STATUS_FLOW, ORDER_STATUS_LABEL, ORDER_STATUS_SOURCE_LABEL, SearchDialog() (+14 more)

### Community 13 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 14 - "banner/api.ts"
Cohesion: 0.22
Nodes (6): AdminGate(), AdminLogin, AdminPage, EASE, EXIT_ABS, loadMotionFeatures()

### Community 15 - "product/model.ts"
Cohesion: 0.12
Nodes (21): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+13 more)

### Community 16 - "AdminPage.tsx"
Cohesion: 0.24
Nodes (7): App(), AppRoutes(), ScrollToTop(), container, Glass(), GlassDefs(), GlassProps

### Community 17 - "products.ts"
Cohesion: 0.10
Nodes (20): KnownCategoryId, DEFAULT_CRITERIA, MeatIcon, ProductBadge, ProductNutrition, ProductRating, ProductSize, ProductTag (+12 more)

### Community 18 - "crud.ts"
Cohesion: 0.14
Nodes (20): buildSeries(), buildTopProducts(), countByFilter(), DashboardData, dashboardKeys, DashboardSection(), dayKey(), fetchDashboard() (+12 more)

### Community 19 - "ProductEditor.tsx"
Cohesion: 0.16
Nodes (14): DEFAULT_NUTRITION, Props, ALLOWED, formatMb(), IMAGE_MAX_BYTES, ImageField(), ImageFieldProps, ALLOWED (+6 more)

### Community 20 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, preview, typecheck, type (+1 more)

### Community 21 - "coupon/api.ts"
Cohesion: 0.11
Nodes (28): couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail, PromoCheckOk (+20 more)

### Community 22 - "lucide-react"
Cohesion: 0.09
Nodes (33): addonKeys, useExtras(), useSauces(), useProductBySlug(), articleFor(), cartLineTitle(), findSize(), findVariant() (+25 more)

### Community 24 - "cn"
Cohesion: 0.13
Nodes (24): bannerFormData(), bannerKeys, bannerMutations, BannerNote, BannerRecord, CreateBannerInput, fetchBannerById(), fetchBanners() (+16 more)

### Community 25 - "banner/api.ts"
Cohesion: 0.12
Nodes (28): addonMutations, AddonRecord, CreateAddonInput, createBody(), fetchAddonById(), fetchAddons(), fetchAddonsByKind(), fetchExtras() (+20 more)

### Community 29 - "AdminSidebar.tsx"
Cohesion: 0.18
Nodes (14): GuardedSection(), AdminAuth, AdminAuthContext, AdminAuthProvider(), authErrorMessage(), can(), isAbortError(), isStaffRecord() (+6 more)

### Community 30 - "staff/api.ts"
Cohesion: 0.12
Nodes (25): CreateStaffInput, fetchStaff(), mapStaff(), mapStaffRequired(), staffKeys, StaffMember, staffMutations, StaffRecord (+17 more)

### Community 31 - "product/model.ts"
Cohesion: 0.21
Nodes (9): AdminPage(), AdminTopbar(), fetchNewOrdersCount(), newOrdersKey, adminCountKeys, AdminCounts, fetchAdminCounts(), useAdminCounts() (+1 more)

### Community 32 - "StickyBar.tsx"
Cohesion: 0.18
Nodes (12): tagsForCategory(), useCategoryTags(), ALL_TAG, CategoryTag, TagFilterId, productTags, Props, SPRING (+4 more)

### Community 33 - "DesktopHome.tsx"
Cohesion: 0.20
Nodes (11): CartPanelState, useCartPanelStore, CartDock(), DesktopHome(), Props, Options, useInView(), useIsDesktop() (+3 more)

### Community 34 - "AddonForm.tsx"
Cohesion: 0.19
Nodes (15): fetchAdminProducts(), useAdminProducts(), useFrontpadStockArticles(), articleConflictMessage(), ArticleExclude, ArticleRef, cellLabel(), collectArticleConflicts() (+7 more)

### Community 35 - "cn.ts"
Cohesion: 0.13
Nodes (15): DeliveryMode, FrontpadJob, FrontpadJobKind, Order, OrderAddressParts, OrderLineAddon, OrderLineSnapshot, OrderStatus (+7 more)

### Community 36 - "ProductCard.tsx"
Cohesion: 0.06
Nodes (61): BadgeInput, badgeKeys, badgeMutations, BadgeRecord, fetchBadges(), mapBadge(), seedFallback(), useBadges() (+53 more)

### Community 37 - "FloatingActions.tsx"
Cohesion: 0.32
Nodes (6): CartToggle(), formatOrderSum(), Props, FloatingActions(), Props, TONE

### Community 38 - "counts.ts"
Cohesion: 0.26
Nodes (9): loadDomMax(), SectionStub(), ADMIN_NAV, AdminNavItem, AdminRole, AdminSectionId, AdminSidebar(), PILL (+1 more)

### Community 39 - "articles.ts"
Cohesion: 0.21
Nodes (12): useCategories(), fetchProducts(), useProducts(), HomePage(), MobileHome(), Props, CategoryTiles(), Props (+4 more)

### Community 40 - "crud.ts"
Cohesion: 0.17
Nodes (13): checkPromo(), updateSettings(), CollectionMutationsConfig, FIELD_CODE_RU, invalidate(), listKeys(), MutationKeys, pbErrorMessage() (+5 more)

### Community 41 - "lucide-react"
Cohesion: 0.23
Nodes (12): CategoryIcon(), Props, fetchSettings(), mapSettings(), useSettings(), settingsFallback(), useCartTotals(), CartPanel() (+4 more)

### Community 43 - "ReviewsSection.tsx"
Cohesion: 0.23
Nodes (12): invalidateProductRatings(), useCreateReview(), useDeleteReview(), useToggleReviewPublished(), useUpdateReview(), ProductOption, ReviewForm(), ReviewFormProps (+4 more)

### Community 44 - "theme.tsx"
Cohesion: 0.31
Nodes (7): readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), useTheme(), ThemeToggle()

### Community 45 - "site.ts"
Cohesion: 0.25
Nodes (6): BADGE_LABEL, ORDER_RULES, resolveBadgeLabel(), SITE, MobileHeader(), Props

### Community 46 - "compress-image.ts"
Cohesion: 0.60
Nodes (4): canvasToBlob(), compressImage(), CompressOptions, loadImage()

## Knowledge Gaps
- **260 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+255 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `ProductCard.tsx` to `HomePage.tsx`, `StickyBar.tsx`, `AddonForm.tsx`, `FloatingActions.tsx`, `counts.ts`, `articles.ts`, `CustomerDrawer.tsx`, `lucide-react`, `ReviewsSection.tsx`, `theme.tsx`, `product/model.ts`, `AdminPage.tsx`, `crud.ts`, `ProductEditor.tsx`, `coupon/api.ts`, `lucide-react`, `cn`, `staff/api.ts`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **Why does `pb` connect `product/model.ts` to `selectors.ts`, `AddonForm.tsx`, `ProductCard.tsx`, `CatalogTables.tsx`, `cn`, `CustomerDrawer.tsx`, `formatPrice`, `crud.ts`, `product/model.ts`, `crud.ts`, `coupon/api.ts`, `cn`, `banner/api.ts`, `AdminSidebar.tsx`, `staff/api.ts`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Why does `Button()` connect `HomePage.tsx` to `ProductCard.tsx`, `cn`, `CustomerDrawer.tsx`, `formatPrice`, `category/api.ts`, `ReviewsSection.tsx`, `product/model.ts`, `ProductEditor.tsx`, `coupon/api.ts`, `lucide-react`, `cn`, `banner/api.ts`, `staff/api.ts`, `product/model.ts`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _260 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `HomePage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13666666666666666 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `selectors.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11182795698924732 - nodes in this community are weakly interconnected._