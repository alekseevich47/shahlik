# Graph Report - shashlik-web  (2026-08-24)

## Corpus Check
- 166 files · ~170,251 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1053 nodes · 3075 edges · 55 communities (45 shown, 10 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 81 edges (avg confidence: 0.54)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `81a1fc93`
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
- counts.ts
- articles.ts
- crud.ts
- lucide-react
- react-dom
- ReviewsSection.tsx
- category/api.ts
- site.ts
- compress-image.ts
- lucide-react
- react-easy-crop
- sonner
- HeroBanner.tsx
- counts.ts
- banner/model.ts
- invalidateProductRatings
- SortableList.tsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 113 edges
2. `formatPrice()` - 45 edges
3. `Button()` - 39 edges
4. `useCartTotals()` - 24 edges
5. `ProductEditor()` - 23 edges
6. `useCategories()` - 22 edges
7. `pb` - 21 edges
8. `Input()` - 21 edges
9. `useAdminProducts()` - 20 edges
10. `useConfirm()` - 19 edges

## Surprising Connections (you probably didn't know these)
- `AccountProvider()` --indirect_call--> `logout()`  [INFERRED]
  src/app/providers/account.tsx → src/entities/account/api.ts
- `AdminGate()` --calls--> `useAdminAuth()`  [EXTRACTED]
  src/app/router.tsx → src/shared/api/auth.tsx
- `resolveBadgeLabel()` --calls--> `badgeLabel()`  [EXTRACTED]
  src/shared/config/site.ts → src/entities/badge/model.ts
- `useDuplicateProduct()` --indirect_call--> `product()`  [INFERRED]
  src/entities/product/api.ts → src/mocks/products.ts
- `planAllCashPrices()` --indirect_call--> `product()`  [INFERRED]
  src/entities/product/lib/prices.ts → src/mocks/products.ts

## Import Cycles
- None detected.

## Communities (55 total, 10 thin omitted)

### Community 0 - "HomePage.tsx"
Cohesion: 0.05
Nodes (69): useExtras(), useSauces(), Addon, AddonKind, BadgeInput, badgeKeys, badgeMutations, BadgeRecord (+61 more)

### Community 1 - "dependencies"
Cohesion: 0.12
Nodes (17): clsx, motion, dependencies, clsx, motion, pocketbase, @radix-ui/react-dialog, @radix-ui/react-slot (+9 more)

### Community 2 - "selectors.ts"
Cohesion: 0.11
Nodes (28): adminProductKeys, createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchAdminProducts() (+20 more)

### Community 4 - "cn"
Cohesion: 0.11
Nodes (31): asNumberList(), asStatusMap(), asStringList(), enqueueApplyPricesJob(), enqueueSyncJob(), fetchActiveSyncJobs(), fetchApplyPricesJobs(), fetchFrontpadSettings() (+23 more)

### Community 5 - "CatalogTables.tsx"
Cohesion: 0.09
Nodes (33): adminReviewKeys, buildOrdersFilter(), createOrder(), CreateReviewInput, fetchAdminReviews(), fetchMyOrders(), fetchOrderById(), fetchOrders() (+25 more)

### Community 6 - "devDependencies"
Cohesion: 0.11
Nodes (19): devDependencies, tailwindcss, @tailwindcss/vite, tw-animate-css, @types/node, @types/react, @types/react-dom, typescript (+11 more)

### Community 7 - "compilerOptions"
Cohesion: 0.07
Nodes (26): DOM, DOM.Iterable, ES2023, node, src, vite/client, vite.config.ts, compilerOptions (+18 more)

### Community 8 - "CustomerDrawer.tsx"
Cohesion: 0.07
Nodes (52): AccountAuth, AccountContext, AccountProvider(), isAbortError(), refreshAuth(), accountKeys, addAddress(), asId() (+44 more)

### Community 9 - "formatPrice"
Cohesion: 0.16
Nodes (17): fetchTags(), mapTag(), TagInput, tagKeys, tagMutations, TagRecord, tagsForCategory(), useCategoryTags() (+9 more)

### Community 10 - "category/api.ts"
Cohesion: 0.18
Nodes (16): fetchActiveResendJobs(), mapJob(), resendOrder(), useOrderJobs(), useResendOrder(), isFrontpadWarning(), ORDER_STATUS_FLOW, ORDER_STATUS_LABEL (+8 more)

### Community 13 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 14 - "banner/api.ts"
Cohesion: 0.06
Nodes (35): App(), readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), AdminGate(), AdminLogin (+27 more)

### Community 15 - "product/model.ts"
Cohesion: 0.13
Nodes (18): CategoryIcon(), Props, SumRow(), FreshStamp(), STAMP_GLYPHS, cn(), ConfirmDialog(), Modal() (+10 more)

### Community 16 - "AdminPage.tsx"
Cohesion: 0.33
Nodes (8): fetchSettings(), mapSettings(), useSettings(), settingsFallback(), AddressBar(), PromoBanner(), Sidebar(), SidebarProps

### Community 17 - "products.ts"
Cohesion: 0.06
Nodes (38): ALL_CATEGORY, Category, CategoryId, KNOWN_CATEGORY_IDS, KnownCategoryId, useFrontpadStockArticles(), articleConflictMessage(), ArticleExclude (+30 more)

### Community 18 - "crud.ts"
Cohesion: 0.13
Nodes (22): buildSeries(), buildTopProducts(), countByFilter(), DashboardData, dashboardKeys, DashboardSection(), dayKey(), fetchDashboard() (+14 more)

### Community 19 - "ProductEditor.tsx"
Cohesion: 0.15
Nodes (18): OrderStatus, frontpadSettingsKeys, settingsKeys, syncJobKeys, useUpdateSettings(), DEFAULT_STATUS_MAP, FrontpadSettings, FrontpadStockItem (+10 more)

### Community 20 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, preview, typecheck, type (+1 more)

### Community 21 - "coupon/api.ts"
Cohesion: 0.12
Nodes (20): couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail, PromoCheckOk (+12 more)

### Community 22 - "lucide-react"
Cohesion: 0.25
Nodes (12): formatCouponValue(), useCartTotals(), useCartStore, CartPanel(), MODE_OPTIONS, CartPromo(), CartTotals(), CheckoutDialogProps (+4 more)

### Community 23 - "@radix-ui/react-dialog"
Cohesion: 0.13
Nodes (14): SectionStub(), ADMIN_NAV, AdminNavItem, AdminRole, AdminSectionId, AdminSidebar(), PILL, Props (+6 more)

### Community 24 - "cn"
Cohesion: 0.18
Nodes (16): bannerFormData(), bannerKeys, bannerMutations, BannerNote, BannerRecord, CreateBannerInput, fetchBannerById(), fetchBanners() (+8 more)

### Community 25 - "banner/api.ts"
Cohesion: 0.18
Nodes (16): addonKeys, addonMutations, AddonRecord, CreateAddonInput, createBody(), fetchAddonById(), fetchAddons(), fetchAddonsByKind() (+8 more)

### Community 26 - "tailwind-merge"
Cohesion: 0.14
Nodes (22): buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams, CustomersPageResult, fetchCustomerById() (+14 more)

### Community 28 - "zustand"
Cohesion: 0.16
Nodes (21): ApplyPricesJobResult, asRowList(), buildCells(), CashPriceCell, CashPricePlan, CashPriceStatus, cellDelta(), parseApplyPricesResult() (+13 more)

### Community 29 - "AdminSidebar.tsx"
Cohesion: 0.17
Nodes (17): Props, DEFAULT_NUTRITION, Props, Button(), ButtonProps, buttonVariants, ALLOWED, formatMb() (+9 more)

### Community 30 - "staff/api.ts"
Cohesion: 0.27
Nodes (8): AdminLogin(), AdminTopbar(), fetchNewOrdersCount(), newOrdersKey, useAdminAuth(), pb, queryClient, QueryKey

### Community 31 - "product/model.ts"
Cohesion: 0.19
Nodes (11): useCreateCategory(), useUpdateCategory(), Props, CategoryForm(), Props, CATEGORY_ICONS, CategoryIconPath, Field() (+3 more)

### Community 32 - "StickyBar.tsx"
Cohesion: 0.36
Nodes (6): needsChooser(), Product, useAddProduct(), groupProductsByCategory(), MobileHome(), Props

### Community 33 - "DesktopHome.tsx"
Cohesion: 0.21
Nodes (9): CartPanelState, useCartPanelStore, CartDock(), DesktopHome(), Props, Options, useInView(), useSettling() (+1 more)

### Community 34 - "AddonForm.tsx"
Cohesion: 0.21
Nodes (11): checkPromo(), updateSettings(), CollectionMutationsConfig, FIELD_CODE_RU, invalidate(), listKeys(), MutationKeys, pbErrorMessage() (+3 more)

### Community 35 - "cn.ts"
Cohesion: 0.26
Nodes (8): ALL_TAG, CategoryTag, TagFilterId, productTags, Props, SPRING, TagFilters(), Props

### Community 36 - "ProductCard.tsx"
Cohesion: 0.05
Nodes (90): useAddons(), useDeleteAddon(), useDeleteBanner(), useDeleteCategory(), useCoupons(), useDeleteCoupon(), useCustomersPage(), useAdminReviews() (+82 more)

### Community 37 - "files.ts"
Cohesion: 0.26
Nodes (10): filenamesOf(), FileRecord, imageFilenames(), imageUrl(), imageUrls(), ToFormDataOptions, canvasToBlob(), compressImage() (+2 more)

### Community 38 - "counts.ts"
Cohesion: 0.25
Nodes (8): useTheme(), CartToggle(), formatOrderSum(), Props, ThemeToggle(), FloatingActions(), Props, TONE

### Community 39 - "articles.ts"
Cohesion: 0.22
Nodes (12): useCategories(), useProducts(), CheckoutDialogState, useCheckoutDialogStore, SearchDialog(), SearchDialogProps, HomePage(), useIsDesktop() (+4 more)

### Community 40 - "crud.ts"
Cohesion: 0.10
Nodes (18): DeliveryMode, FrontpadJob, FrontpadJobKind, FrontpadJobStatus, Order, OrderAddressParts, OrderLineAddon, OrderLineSnapshot (+10 more)

### Community 41 - "lucide-react"
Cohesion: 0.33
Nodes (6): catalogSectionId(), Options, useCatalogScrollSpy(), CatalogCategorySection(), Props, STICKY_BAR

### Community 43 - "ReviewsSection.tsx"
Cohesion: 0.27
Nodes (9): canvasToBlob(), CropArea, cropImageToFile(), loadImage(), readImageSize(), ALLOWED, BannerImageField(), formatMb() (+1 more)

### Community 44 - "category/api.ts"
Cohesion: 0.27
Nodes (9): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+1 more)

### Community 50 - "HeroBanner.tsx"
Cohesion: 0.47
Nodes (4): useBanners(), BANNER_ASPECT_RATIO, HeroBanner(), HoverArrow()

### Community 51 - "counts.ts"
Cohesion: 0.40
Nodes (5): AdminPage(), adminCountKeys, AdminCounts, fetchAdminCounts(), useAdminCounts()

### Community 53 - "invalidateProductRatings"
Cohesion: 0.67
Nodes (4): invalidateProductRatings(), useCreateReview(), useUpdateReview(), ReviewForm()

### Community 54 - "SortableList.tsx"
Cohesion: 0.67
Nodes (3): move(), Props, SortableList()

## Knowledge Gaps
- **285 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+280 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `product/model.ts` to `HomePage.tsx`, `selectors.ts`, `banner/api.ts`, `AdminPage.tsx`, `products.ts`, `crud.ts`, `lucide-react`, `@radix-ui/react-dialog`, `zustand`, `AdminSidebar.tsx`, `product/model.ts`, `DesktopHome.tsx`, `cn.ts`, `ProductCard.tsx`, `counts.ts`, `articles.ts`, `ReviewsSection.tsx`, `HeroBanner.tsx`, `SortableList.tsx`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Why does `pb` connect `staff/api.ts` to `HomePage.tsx`, `selectors.ts`, `AddonForm.tsx`, `cn`, `CatalogTables.tsx`, `ProductCard.tsx`, `files.ts`, `formatPrice`, `category/api.ts`, `banner/api.ts`, `products.ts`, `crud.ts`, `counts.ts`, `coupon/api.ts`, `cn`, `banner/api.ts`, `tailwind-merge`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `formatPrice()` connect `ProductCard.tsx` to `HomePage.tsx`, `articles.ts`, `CustomerDrawer.tsx`, `category/api.ts`, `crud.ts`, `ProductEditor.tsx`, `lucide-react`, `tailwind-merge`, `zustand`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _285 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `HomePage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05490296220633299 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `selectors.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10804597701149425 - nodes in this community are weakly interconnected._