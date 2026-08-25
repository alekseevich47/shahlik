# Graph Report - shashlik-web  (2026-08-25)

## Corpus Check
- 173 files · ~174,141 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1100 nodes · 3247 edges · 48 communities (39 shown, 9 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 81 edges (avg confidence: 0.54)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1d652b51`
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
- OrdersSection.tsx
- useAdminAuth
- NutritionHint.tsx
- lucide-react
- react-dom
- category/api.ts
- site.ts
- compress-image.ts
- lucide-react
- react-easy-crop
- sonner

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
- `ProductEditorRoute()` --calls--> `useAdminProducts()`  [EXTRACTED]
  src/pages/admin/AdminPage.tsx → src/entities/product/api.ts
- `collectArticleConflicts()` --indirect_call--> `product()`  [INFERRED]
  src/entities/product/lib/articles.ts → src/mocks/products.ts

## Import Cycles
- None detected.

## Communities (48 total, 9 thin omitted)

### Community 0 - "HomePage.tsx"
Cohesion: 0.21
Nodes (17): useBadges(), badgeLabel(), PRODUCT_ASPECT_RATIO, minPrice(), isProductStopped(), useStoppedArticles(), ProductCard(), ProductCardProps (+9 more)

### Community 1 - "dependencies"
Cohesion: 0.12
Nodes (17): clsx, motion, dependencies, clsx, motion, pocketbase, @radix-ui/react-dialog, @radix-ui/react-slot (+9 more)

### Community 2 - "selectors.ts"
Cohesion: 0.06
Nodes (57): addonMutations, AddonRecord, CreateAddonInput, createBody(), fetchAddonById(), fetchAddons(), fetchAddonsByKind(), fetchExtras() (+49 more)

### Community 4 - "cn"
Cohesion: 0.06
Nodes (58): checkPromo(), asNumberList(), asStatusMap(), asStringList(), enqueueApplyPricesJob(), enqueueSyncJob(), fetchActiveSyncJobs(), fetchApplyPricesJobs() (+50 more)

### Community 5 - "CatalogTables.tsx"
Cohesion: 0.11
Nodes (27): adminReviewKeys, createOrder(), CreateOrderInput, CreateReviewInput, fetchAdminReviews(), fetchOrderById(), fetchOrders(), fetchPublicOrder() (+19 more)

### Community 6 - "devDependencies"
Cohesion: 0.11
Nodes (19): devDependencies, tailwindcss, @tailwindcss/vite, tw-animate-css, @types/node, @types/react, @types/react-dom, typescript (+11 more)

### Community 7 - "compilerOptions"
Cohesion: 0.07
Nodes (26): DOM, DOM.Iterable, ES2023, node, src, vite/client, vite.config.ts, compilerOptions (+18 more)

### Community 8 - "CustomerDrawer.tsx"
Cohesion: 0.06
Nodes (69): AccountAuth, AccountContext, AccountProvider(), isAbortError(), refreshAuth(), useAccount(), accountCacheKey(), accountKeys (+61 more)

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
Cohesion: 0.06
Nodes (30): App(), readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), useTheme(), AdminGate() (+22 more)

### Community 15 - "product/model.ts"
Cohesion: 0.29
Nodes (8): HomePage(), useIsDesktop(), useIsWide(), useMediaQuery(), MobileTab, MobileTabBar(), Props, TABS

### Community 16 - "AdminPage.tsx"
Cohesion: 0.15
Nodes (22): adminProductKeys, ApplyPricesJobResult, asRowList(), buildCells(), CashPriceCell, CashPricePlan, CashPriceStatus, cellDelta() (+14 more)

### Community 17 - "products.ts"
Cohesion: 0.11
Nodes (17): CategoryId, KnownCategoryId, SkuCell, DEFAULT_CRITERIA, MeatIcon, ProductBadge, ProductRating, ProductSize (+9 more)

### Community 18 - "crud.ts"
Cohesion: 0.06
Nodes (47): CategoryIcon(), Props, fetchSettings(), mapSettings(), updateSettings(), useSettings(), useUpdateSettings(), settingsFallback() (+39 more)

### Community 19 - "ProductEditor.tsx"
Cohesion: 0.06
Nodes (52): buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams, CustomersPageResult, fetchCustomerById() (+44 more)

### Community 20 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, preview, typecheck, type (+1 more)

### Community 21 - "coupon/api.ts"
Cohesion: 0.05
Nodes (69): addonKeys, couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail (+61 more)

### Community 22 - "lucide-react"
Cohesion: 0.16
Nodes (13): ALL_TAG, TagFilterId, Chip(), ChipProps, OptionCard(), OptionCardProps, Props, SPRING (+5 more)

### Community 23 - "@radix-ui/react-dialog"
Cohesion: 0.05
Nodes (50): AdminPage(), GuardedSection(), loadDomMax(), ProductEditorRoute(), SectionStub(), ADMIN_NAV, AdminNavItem, AdminRole (+42 more)

### Community 24 - "cn"
Cohesion: 0.06
Nodes (46): bannerFormData(), bannerKeys, bannerMutations, BannerNote, BannerRecord, CreateBannerInput, fetchBannerById(), fetchBanners() (+38 more)

### Community 25 - "banner/api.ts"
Cohesion: 0.19
Nodes (19): useExtras(), useSauces(), useProductBySlug(), articleFor(), cartLineTitle(), findSize(), findVariant(), priceOf() (+11 more)

### Community 26 - "tailwind-merge"
Cohesion: 0.24
Nodes (12): useFrontpadStockArticles(), articleConflictMessage(), ArticleExclude, ArticleRef, cellLabel(), collectArticleConflicts(), isExcludedCell(), skuMatrix() (+4 more)

### Community 28 - "zustand"
Cohesion: 0.21
Nodes (13): fetchActiveResendJobs(), mapJob(), resendOrder(), updateOrderStatus(), useOrderJobs(), useResendOrder(), useUpdateOrderStatus(), ORDER_STATUS_FLOW (+5 more)

### Community 29 - "AdminSidebar.tsx"
Cohesion: 0.16
Nodes (16): BadgeInput, badgeKeys, badgeMutations, BadgeRecord, fetchBadges(), mapBadge(), seedFallback(), useCreateBadge() (+8 more)

### Community 30 - "staff/api.ts"
Cohesion: 0.21
Nodes (12): useCategories(), useProducts(), needsChooser(), Product, useAddProduct(), groupProductsByCategory(), MobileHome(), Props (+4 more)

### Community 31 - "product/model.ts"
Cohesion: 0.16
Nodes (12): useDuplicateProduct(), product(), shawarma(), imagesFromProduct(), MEAT_OPTIONS, newId(), PreviewToggle(), ProductEditor() (+4 more)

### Community 32 - "StickyBar.tsx"
Cohesion: 0.26
Nodes (11): useAdminProducts(), useDeleteProduct(), useToggleProductActive(), useUpdateProduct(), hasMissingArticle(), ProductCreateForm(), applyFilteredReorder(), ProductsSection() (+3 more)

### Community 33 - "DesktopHome.tsx"
Cohesion: 0.23
Nodes (8): CartPanelState, useCartPanelStore, CartDock(), DesktopHome(), Props, Options, useInView(), useSettling()

### Community 34 - "AddonForm.tsx"
Cohesion: 0.22
Nodes (13): invalidateProductRatings(), useCreateReview(), useDeleteReview(), useToggleReviewPublished(), useUpdateReview(), ProductOption, ReviewForm(), ReviewFormProps (+5 more)

### Community 35 - "cn.ts"
Cohesion: 0.53
Nodes (4): repeatOrderIntoCart(), useLiveOrder(), OrderTrackPage(), RepeatButton()

### Community 36 - "ProductCard.tsx"
Cohesion: 0.18
Nodes (11): EmptyState(), Props, move(), Props, SortableList(), Button(), ButtonProps, buttonVariants (+3 more)

### Community 37 - "OrdersSection.tsx"
Cohesion: 0.27
Nodes (9): buildOrdersFilter(), fetchOrdersPage(), orderJobKeys, useOrdersPage(), isFrontpadWarning(), OrderStatus, OrdersSection(), STATUS_FILTERS (+1 more)

### Community 38 - "useAdminAuth"
Cohesion: 0.33
Nodes (6): orderKeys, AdminTopbar(), fetchNewOrdersCount(), newOrdersKey, useAdminAuth(), queryClient

### Community 39 - "NutritionHint.tsx"
Cohesion: 0.32
Nodes (5): ProductNutrition, formatGrams(), NutritionHint(), HintMark(), TooltipContent()

### Community 41 - "lucide-react"
Cohesion: 0.39
Nodes (5): catalogSectionId(), Options, useCatalogScrollSpy(), CatalogCategorySection(), Props

### Community 44 - "category/api.ts"
Cohesion: 0.12
Nodes (22): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+14 more)

## Knowledge Gaps
- **293 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+288 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `crud.ts` to `HomePage.tsx`, `CustomerDrawer.tsx`, `formatPrice`, `category/api.ts`, `banner/api.ts`, `product/model.ts`, `AdminPage.tsx`, `ProductEditor.tsx`, `coupon/api.ts`, `lucide-react`, `@radix-ui/react-dialog`, `cn`, `banner/api.ts`, `tailwind-merge`, `AdminSidebar.tsx`, `staff/api.ts`, `product/model.ts`, `StickyBar.tsx`, `AddonForm.tsx`, `ProductCard.tsx`, `NutritionHint.tsx`, `category/api.ts`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Why does `pb` connect `@radix-ui/react-dialog` to `selectors.ts`, `cn`, `CatalogTables.tsx`, `useAdminAuth`, `CustomerDrawer.tsx`, `formatPrice`, `category/api.ts`, `ProductEditor.tsx`, `coupon/api.ts`, `cn`, `banner/api.ts`, `tailwind-merge`, `AdminSidebar.tsx`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Why does `Button()` connect `ProductCard.tsx` to `HomePage.tsx`, `selectors.ts`, `cn`, `CustomerDrawer.tsx`, `formatPrice`, `AdminPage.tsx`, `crud.ts`, `ProductEditor.tsx`, `coupon/api.ts`, `cn`, `banner/api.ts`, `zustand`, `AdminSidebar.tsx`, `product/model.ts`, `StickyBar.tsx`, `AddonForm.tsx`, `cn.ts`, `OrdersSection.tsx`, `useAdminAuth`, `category/api.ts`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _293 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `selectors.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06013986013986014 - nodes in this community are weakly interconnected._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.061343204653622425 - nodes in this community are weakly interconnected._