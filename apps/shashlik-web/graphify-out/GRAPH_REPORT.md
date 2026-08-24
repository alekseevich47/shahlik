# Graph Report - shashlik-web  (2026-08-24)

## Corpus Check
- 173 files · ~173,928 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1097 nodes · 3238 edges · 57 communities (47 shown, 10 thin omitted)
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
- orders.ts
- EmptyState.tsx

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
- `ProductEditorRoute()` --calls--> `useAdminProducts()`  [EXTRACTED]
  src/pages/admin/AdminPage.tsx → src/entities/product/api.ts
- `useDuplicateProduct()` --indirect_call--> `product()`  [INFERRED]
  src/entities/product/api.ts → src/mocks/products.ts
- `collectArticleConflicts()` --indirect_call--> `product()`  [INFERRED]
  src/entities/product/lib/articles.ts → src/mocks/products.ts

## Import Cycles
- None detected.

## Communities (57 total, 10 thin omitted)

### Community 0 - "HomePage.tsx"
Cohesion: 0.06
Nodes (67): BadgeInput, badgeKeys, badgeMutations, BadgeRecord, fetchBadges(), mapBadge(), seedFallback(), useBadges() (+59 more)

### Community 1 - "dependencies"
Cohesion: 0.12
Nodes (17): clsx, motion, dependencies, clsx, motion, pocketbase, @radix-ui/react-dialog, @radix-ui/react-slot (+9 more)

### Community 2 - "selectors.ts"
Cohesion: 0.15
Nodes (21): createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchAdminProducts(), fetchProductById() (+13 more)

### Community 4 - "cn"
Cohesion: 0.12
Nodes (29): asNumberList(), asStatusMap(), asStringList(), enqueueApplyPricesJob(), enqueueSyncJob(), fetchActiveSyncJobs(), fetchApplyPricesJobs(), fetchFrontpadSettings() (+21 more)

### Community 5 - "CatalogTables.tsx"
Cohesion: 0.10
Nodes (29): adminReviewKeys, buildOrdersFilter(), createOrder(), CreateOrderInput, CreateReviewInput, fetchOrderById(), fetchOrders(), fetchOrdersPage() (+21 more)

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
Cohesion: 0.09
Nodes (28): fetchTags(), mapTag(), TagInput, tagKeys, tagMutations, TagRecord, tagsForCategory(), useCategoryTags() (+20 more)

### Community 10 - "category/api.ts"
Cohesion: 0.14
Nodes (23): fetchActiveResendJobs(), mapJob(), orderJobKeys, resendOrder(), useOrderJobs(), useResendOrder(), FrontpadJob, FrontpadJobKind (+15 more)

### Community 13 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 14 - "banner/api.ts"
Cohesion: 0.07
Nodes (34): App(), readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), AdminGate(), AdminLogin (+26 more)

### Community 15 - "product/model.ts"
Cohesion: 0.06
Nodes (45): useTheme(), CategoryIcon(), Props, CartToggle(), formatOrderSum(), Props, SumRow(), ThemeToggle() (+37 more)

### Community 16 - "AdminPage.tsx"
Cohesion: 0.19
Nodes (14): fetchSettings(), mapSettings(), useSettings(), DEFAULT_STATUS_MAP, FrontpadSettings, FrontpadStockItem, PriceSource, Settings (+6 more)

### Community 17 - "products.ts"
Cohesion: 0.13
Nodes (16): CategoryId, DEFAULT_CRITERIA, ProductBadge, ProductNutrition, ProductRating, ProductSize, ProductTag, ProductVariant (+8 more)

### Community 18 - "crud.ts"
Cohesion: 0.14
Nodes (20): buildSeries(), buildTopProducts(), countByFilter(), DashboardData, dashboardKeys, DashboardSection(), dayKey(), fetchDashboard() (+12 more)

### Community 19 - "ProductEditor.tsx"
Cohesion: 0.23
Nodes (10): frontpadSettingsKeys, settingsKeys, useUpdateSettings(), parseNonNeg(), SettingsSection(), TabId, TABS, useCollectionRealtime() (+2 more)

### Community 20 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, preview, typecheck, type (+1 more)

### Community 21 - "coupon/api.ts"
Cohesion: 0.12
Nodes (26): checkPromo(), couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail (+18 more)

### Community 22 - "lucide-react"
Cohesion: 0.18
Nodes (17): addonKeys, calcCouponDiscount(), productKeys, priceOf(), addonFromCache(), CartTotals, productFromCache(), ResolvedAddon (+9 more)

### Community 23 - "@radix-ui/react-dialog"
Cohesion: 0.23
Nodes (10): loadDomMax(), ProductEditorRoute(), SectionStub(), ADMIN_NAV, AdminNavItem, AdminRole, AdminSectionId, AdminSidebar() (+2 more)

### Community 24 - "cn"
Cohesion: 0.15
Nodes (20): bannerFormData(), bannerKeys, bannerMutations, BannerNote, BannerRecord, CreateBannerInput, fetchBannerById(), fetchBanners() (+12 more)

### Community 25 - "banner/api.ts"
Cohesion: 0.11
Nodes (30): addonMutations, AddonRecord, CreateAddonInput, createBody(), fetchAddonById(), fetchAddons(), fetchAddonsByKind(), fetchExtras() (+22 more)

### Community 26 - "tailwind-merge"
Cohesion: 0.21
Nodes (14): useAdminProducts(), useFrontpadStockArticles(), articleConflictMessage(), ArticleExclude, ArticleRef, cellLabel(), collectArticleConflicts(), isExcludedCell() (+6 more)

### Community 28 - "zustand"
Cohesion: 0.15
Nodes (22): adminProductKeys, ApplyPricesJobResult, asRowList(), buildCells(), CashPriceCell, CashPricePlan, CashPriceStatus, cellDelta() (+14 more)

### Community 29 - "AdminSidebar.tsx"
Cohesion: 0.18
Nodes (13): DEFAULT_NUTRITION, Props, ALLOWED, formatMb(), IMAGE_MAX_BYTES, ImageField(), ImageFieldProps, ALLOWED (+5 more)

### Community 30 - "staff/api.ts"
Cohesion: 0.29
Nodes (7): orderKeys, AdminLogin(), AdminTopbar(), fetchNewOrdersCount(), newOrdersKey, useAdminAuth(), queryClient

### Community 31 - "product/model.ts"
Cohesion: 0.32
Nodes (5): Props, CATEGORY_ICONS, CategoryIconPath, SheetContent(), SheetContentProps

### Community 32 - "StickyBar.tsx"
Cohesion: 0.24
Nodes (9): CheckoutDialogProps, MODE_OPTIONS, Props, Button(), ButtonProps, buttonVariants, Field(), Input() (+1 more)

### Community 33 - "DesktopHome.tsx"
Cohesion: 0.18
Nodes (12): needsChooser(), Product, useAddProduct(), CartPanelState, useCartPanelStore, CartDock(), groupProductsByCategory(), DesktopHome() (+4 more)

### Community 34 - "AddonForm.tsx"
Cohesion: 0.22
Nodes (14): syncJobKeys, useActiveSyncJobs(), useEnqueueSyncJob(), useStoppedStock(), useUpdateFrontpadSettings(), formatRemaining(), FrontpadPanel(), parseDigitCodes() (+6 more)

### Community 35 - "cn.ts"
Cohesion: 0.22
Nodes (11): Order, OrderLineSnapshot, repeatOrderIntoCart(), useLiveOrder(), formatAddress(), LineRow(), OrderDetails(), Props (+3 more)

### Community 36 - "ProductCard.tsx"
Cohesion: 0.06
Nodes (53): buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams, CustomersPageResult, fetchCustomerById() (+45 more)

### Community 37 - "files.ts"
Cohesion: 0.43
Nodes (6): filenamesOf(), FileRecord, imageFilenames(), imageUrl(), imageUrls(), ToFormDataOptions

### Community 38 - "counts.ts"
Cohesion: 0.18
Nodes (7): MeatIcon, RatingCriterion, imagesFromProduct(), MEAT_OPTIONS, newId(), PreviewToggle(), Props

### Community 39 - "articles.ts"
Cohesion: 0.18
Nodes (14): useProducts(), useFrontpadStockRealtime(), ALL_TAG, TagFilterId, CheckoutDialogState, useCheckoutDialogStore, HomePage(), useIsDesktop() (+6 more)

### Community 40 - "crud.ts"
Cohesion: 0.15
Nodes (13): AppliedCoupon, useCreateOrder(), DeliveryMode, OrderAddressParts, AddPayload, CartAddon, CartItem, CartState (+5 more)

### Community 41 - "lucide-react"
Cohesion: 0.19
Nodes (12): useCategories(), catalogSectionId(), Options, useCatalogScrollSpy(), CatalogCategorySection(), Props, MobileHome(), Props (+4 more)

### Community 43 - "ReviewsSection.tsx"
Cohesion: 0.19
Nodes (13): canvasToBlob(), compressImage(), CompressOptions, loadImage(), canvasToBlob(), CropArea, cropImageToFile(), loadImage() (+5 more)

### Community 44 - "category/api.ts"
Cohesion: 0.15
Nodes (15): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+7 more)

### Community 50 - "HeroBanner.tsx"
Cohesion: 0.50
Nodes (3): BANNER_ASPECT_RATIO, HeroBanner(), HoverArrow()

### Community 51 - "counts.ts"
Cohesion: 0.31
Nodes (8): useDeleteCategory(), useUpdateCategory(), CategoriesSection(), CategoryForm(), ConfirmDialog(), ConfirmDialogProps, ConfirmOptions, useConfirm()

### Community 52 - "banner/model.ts"
Cohesion: 0.33
Nodes (9): updateBody(), updateProduct(), useDeleteProduct(), useToggleProductActive(), useUpdateProduct(), hasMissingArticle(), applyFilteredReorder(), ProductsSection() (+1 more)

### Community 53 - "invalidateProductRatings"
Cohesion: 0.19
Nodes (15): fetchAdminReviews(), invalidateProductRatings(), useAdminReviews(), useCreateReview(), useDeleteReview(), useToggleReviewPublished(), useUpdateReview(), ProductOption (+7 more)

### Community 54 - "SortableList.tsx"
Cohesion: 0.29
Nodes (5): ALL_CATEGORY, Category, KNOWN_CATEGORY_IDS, KnownCategoryId, categories

### Community 55 - "orders.ts"
Cohesion: 0.40
Nodes (4): Review, coupons, orders, reviews

## Knowledge Gaps
- **293 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+288 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `product/model.ts` to `HomePage.tsx`, `CustomerDrawer.tsx`, `AdminPage.tsx`, `crud.ts`, `ProductEditor.tsx`, `coupon/api.ts`, `lucide-react`, `@radix-ui/react-dialog`, `tailwind-merge`, `zustand`, `AdminSidebar.tsx`, `product/model.ts`, `StickyBar.tsx`, `cn.ts`, `ProductCard.tsx`, `counts.ts`, `articles.ts`, `lucide-react`, `ReviewsSection.tsx`, `HeroBanner.tsx`, `counts.ts`, `invalidateProductRatings`, `EmptyState.tsx`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **Why does `formatPrice()` connect `HomePage.tsx` to `StickyBar.tsx`, `AddonForm.tsx`, `cn.ts`, `ProductCard.tsx`, `counts.ts`, `crud.ts`, `CustomerDrawer.tsx`, `category/api.ts`, `crud.ts`, `banner/model.ts`, `coupon/api.ts`, `lucide-react`, `banner/api.ts`, `zustand`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `pb` connect `HomePage.tsx` to `selectors.ts`, `ProductCard.tsx`, `CatalogTables.tsx`, `cn`, `files.ts`, `formatPrice`, `category/api.ts`, `banner/api.ts`, `crud.ts`, `coupon/api.ts`, `cn`, `banner/api.ts`, `tailwind-merge`, `staff/api.ts`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _293 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `HomePage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.057711950970377936 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.11954022988505747 - nodes in this community are weakly interconnected._