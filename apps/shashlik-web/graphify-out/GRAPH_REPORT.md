# Graph Report - shashlik-web  (2026-08-26)

## Corpus Check
- 174 files · ~174,822 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1109 nodes · 3273 edges · 69 communities (59 shown, 10 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 81 edges (avg confidence: 0.54)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1b0faab2`
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
- coupon/api.ts
- category/api.ts
- CashPricesPanel.tsx
- crud.ts
- FloatingActions.tsx
- Sidebar.tsx
- OrderDetails.tsx
- mapFrontpadSettings
- addons.ts
- image-field.tsx
- counts.ts

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

## Communities (69 total, 10 thin omitted)

### Community 0 - "HomePage.tsx"
Cohesion: 0.13
Nodes (20): createBody(), updateBody(), bannerFormData(), bannerKeys, bannerMutations, BannerNote, BannerRecord, CreateBannerInput (+12 more)

### Community 1 - "dependencies"
Cohesion: 0.12
Nodes (17): class-variance-authority, clsx, lucide-react, motion, dependencies, class-variance-authority, clsx, lucide-react (+9 more)

### Community 2 - "selectors.ts"
Cohesion: 0.10
Nodes (32): adminProductKeys, createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchAdminProducts() (+24 more)

### Community 4 - "cn"
Cohesion: 0.12
Nodes (23): applyPricesJobKeys, asStatusMap(), enqueueApplyPricesJob(), enqueueSyncJob(), fetchActiveSyncJobs(), fetchApplyPricesJobs(), fetchFrontpadStock(), fetchStoppedStock() (+15 more)

### Community 5 - "CatalogTables.tsx"
Cohesion: 0.10
Nodes (29): adminReviewKeys, buildOrdersFilter(), createOrder(), CreateReviewInput, fetchActiveResendJobs(), fetchAdminReviews(), fetchOrderById(), fetchOrders() (+21 more)

### Community 6 - "devDependencies"
Cohesion: 0.11
Nodes (19): devDependencies, tailwindcss, @tailwindcss/vite, tw-animate-css, @types/node, @types/react, @types/react-dom, typescript (+11 more)

### Community 7 - "compilerOptions"
Cohesion: 0.07
Nodes (26): DOM, DOM.Iterable, ES2023, node, src, vite/client, vite.config.ts, compilerOptions (+18 more)

### Community 8 - "CustomerDrawer.tsx"
Cohesion: 0.05
Nodes (73): AccountAuth, AccountContext, AccountProvider(), isAbortError(), refreshAuth(), useAccount(), acceptAuthToken(), accountCacheKey() (+65 more)

### Community 9 - "formatPrice"
Cohesion: 0.08
Nodes (35): BadgeInput, badgeKeys, badgeMutations, BadgeRecord, fetchBadges(), mapBadge(), seedFallback(), useCreateBadge() (+27 more)

### Community 10 - "category/api.ts"
Cohesion: 0.15
Nodes (13): DeliveryMode, FrontpadJob, FrontpadJobKind, FrontpadJobStatus, Order, ORDER_STATUS_FLOW, ORDER_STATUS_SOURCE_LABEL, OrderLineAddon (+5 more)

### Community 13 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 14 - "banner/api.ts"
Cohesion: 0.18
Nodes (14): GuardedSection(), AdminAuth, AdminAuthContext, AdminAuthProvider(), authErrorMessage(), can(), isAbortError(), isStaffRecord() (+6 more)

### Community 15 - "product/model.ts"
Cohesion: 0.19
Nodes (10): useProducts(), CheckoutDialogState, useCheckoutDialogStore, HomePage(), MobileHeader(), Props, MobileTab, MobileTabBar() (+2 more)

### Community 16 - "AdminPage.tsx"
Cohesion: 0.24
Nodes (12): ApplyPricesJobResult, asRowList(), buildCells(), CashPriceCell, CashPricePlan, CashPriceStatus, parseApplyPricesResult(), planAllCashPrices() (+4 more)

### Community 17 - "products.ts"
Cohesion: 0.11
Nodes (14): ALL_CATEGORY, Category, CategoryId, KNOWN_CATEGORY_IDS, KnownCategoryId, ProductTag, categories, MEAT_VARIANTS (+6 more)

### Community 18 - "crud.ts"
Cohesion: 0.18
Nodes (13): useCreateProduct(), frontpadSettingsKeys, DEFAULT_NUTRITION, DEFAULT_SIZE, ProductCreateForm(), Props, TabId, TABS (+5 more)

### Community 19 - "ProductEditor.tsx"
Cohesion: 0.12
Nodes (26): buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams, CustomersPageResult, fetchCustomerById() (+18 more)

### Community 20 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, preview, typecheck, type (+1 more)

### Community 21 - "coupon/api.ts"
Cohesion: 0.16
Nodes (17): useCreateCategory(), useDeleteCategory(), useUpdateCategory(), useAdminProducts(), ProductEditorRoute(), CategoriesSection(), CategoryForm(), Props (+9 more)

### Community 22 - "lucide-react"
Cohesion: 0.17
Nodes (19): addonKeys, addonMutations, AddonRecord, CreateAddonInput, fetchAddonById(), fetchAddons(), fetchAddonsByKind(), fetchExtras() (+11 more)

### Community 23 - "@radix-ui/react-dialog"
Cohesion: 0.13
Nodes (22): buildSeries(), buildTopProducts(), countByFilter(), DashboardData, dashboardKeys, DashboardSection(), dayKey(), fetchDashboard() (+14 more)

### Community 24 - "cn"
Cohesion: 0.14
Nodes (19): canvasToBlob(), compressImage(), CompressOptions, loadImage(), canvasToBlob(), CropArea, cropImageToFile(), loadImage() (+11 more)

### Community 25 - "banner/api.ts"
Cohesion: 0.23
Nodes (17): useBadges(), badgeLabel(), PRODUCT_ASPECT_RATIO, minPrice(), isProductStopped(), useStoppedArticles(), ProductCard(), ProductCardProps (+9 more)

### Community 26 - "tailwind-merge"
Cohesion: 0.22
Nodes (13): useFrontpadStockArticles(), articleConflictMessage(), ArticleExclude, ArticleRef, cellLabel(), collectArticleConflicts(), isExcludedCell(), product() (+5 more)

### Community 28 - "zustand"
Cohesion: 0.14
Nodes (23): useOrder(), useOrderJobs(), useResendOrder(), useUpdateOrderStatus(), isFrontpadWarning(), ORDER_STATUS_LABEL, OrderStatus, stoppedStockKeys (+15 more)

### Community 29 - "AdminSidebar.tsx"
Cohesion: 0.22
Nodes (8): DEFAULT_STATUS_MAP, FrontpadSettings, FrontpadStockItem, PriceSource, Settings, BADGE_LABEL, ORDER_RULES, resolveBadgeLabel()

### Community 30 - "staff/api.ts"
Cohesion: 0.18
Nodes (12): CreateStaffInput, fetchStaff(), mapStaff(), mapStaffRequired(), staffKeys, StaffMember, staffMutations, StaffRecord (+4 more)

### Community 31 - "product/model.ts"
Cohesion: 0.15
Nodes (12): DEFAULT_CRITERIA, MeatIcon, ProductBadge, ProductRating, ProductSize, ProductVariant, RatingCriterion, imagesFromProduct() (+4 more)

### Community 32 - "StickyBar.tsx"
Cohesion: 0.14
Nodes (26): useDeleteAddon(), useDeleteBanner(), useAdminReviews(), useDeleteReview(), useToggleReviewPublished(), AddonsSection(), KIND_FILTERS, BannersSection() (+18 more)

### Community 33 - "DesktopHome.tsx"
Cohesion: 0.06
Nodes (47): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+39 more)

### Community 34 - "AddonForm.tsx"
Cohesion: 0.23
Nodes (15): useExtras(), useSauces(), articleFor(), priceOf(), skuMatrix(), fetchStoppedArticles(), isAddonStopped(), isSizeStopped() (+7 more)

### Community 35 - "cn.ts"
Cohesion: 0.33
Nodes (7): orderKeys, subscribeOrderStatus(), usePublicOrder(), repeatOrderIntoCart(), useLiveOrder(), OrderTrackPage(), RepeatButton()

### Community 36 - "customer/api.ts"
Cohesion: 0.19
Nodes (13): useDeleteStaff(), useRequestStaffPasswordReset(), useStaff(), useUpdateStaff(), AdminLogin(), AdminPage(), loadDomMax(), CustomersSection() (+5 more)

### Community 37 - "OrdersSection.tsx"
Cohesion: 0.17
Nodes (9): AdminGate(), AdminLogin, AdminPage, AuthCallbackPage, EASE, EXIT_ABS, loadMotionFeatures(), OrderTrackPage (+1 more)

### Community 38 - "useAdminAuth"
Cohesion: 0.18
Nodes (10): App(), AppRoutes(), ScrollToTop(), container, backgroundOf(), Glass(), GlassDefs(), GlassProps (+2 more)

### Community 39 - "NutritionHint.tsx"
Cohesion: 0.36
Nodes (6): ProductNutrition, formatGrams(), NutritionHint(), useIsDesktop(), useIsWide(), useMediaQuery()

### Community 40 - "button.tsx"
Cohesion: 0.24
Nodes (12): cartLineTitle(), findSize(), findVariant(), hasMissingArticle(), needsChooser(), SkuCell, Product, addonFromCache() (+4 more)

### Community 41 - "lucide-react"
Cohesion: 0.29
Nodes (11): fetchSettings(), mapSettings(), updateSettings(), useSettings(), useUpdateSettings(), settingsFallback(), parseNonNeg(), SettingsSection() (+3 more)

### Community 42 - "react-dom"
Cohesion: 0.20
Nodes (10): ResolvedLine, AddonRow(), Props, formatScore10(), formatScore5(), trimZero(), SIZES, StepBtn() (+2 more)

### Community 43 - "AdminPage.tsx"
Cohesion: 0.27
Nodes (8): SectionStub(), ADMIN_NAV, AdminNavItem, AdminRole, AdminSectionId, PILL, Props, SITE

### Community 44 - "theme.tsx"
Cohesion: 0.40
Nodes (5): readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider()

### Community 45 - "site.ts"
Cohesion: 0.38
Nodes (5): fetchBanners(), useBanners(), BANNER_ASPECT_RATIO, HeroBanner(), HoverArrow()

### Community 47 - "lucide-react"
Cohesion: 0.33
Nodes (7): updateBody(), updateProduct(), useDeleteProduct(), useToggleProductActive(), useUpdateProduct(), applyFilteredReorder(), ProductsSection()

### Community 48 - "react-easy-crop"
Cohesion: 0.36
Nodes (6): useTheme(), ThemeToggle(), AdminTopbar(), fetchNewOrdersCount(), newOrdersKey, pb

### Community 50 - "invalidateProductRatings"
Cohesion: 0.67
Nodes (4): invalidateProductRatings(), useCreateReview(), useUpdateReview(), ReviewForm()

### Community 54 - "store.ts"
Cohesion: 0.13
Nodes (25): AppliedCoupon, calcCouponDiscount(), formatCouponValue(), CreateOrderInput, useCreateOrder(), OrderAddressParts, useCartTotals(), AddPayload (+17 more)

### Community 57 - "coupon/api.ts"
Cohesion: 0.18
Nodes (11): couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail, PromoCheckOk (+3 more)

### Community 58 - "coupon/api.ts"
Cohesion: 0.20
Nodes (14): useCoupons(), useCreateCoupon(), useDeleteCoupon(), useUpdateCoupon(), Coupon, CouponForm(), KIND_OPTIONS, Props (+6 more)

### Community 59 - "category/api.ts"
Cohesion: 0.18
Nodes (11): checkPromo(), updateFrontpadSettings(), useUpdateFrontpadSettings(), formatRemaining(), FrontpadPanel(), parseDigitCodes(), productsSyncGate(), splitTokens() (+3 more)

### Community 60 - "CashPricesPanel.tsx"
Cohesion: 0.29
Nodes (10): cellDelta(), useApplyPricesJobs(), useEnqueueApplyPricesJob(), useFrontpadStock(), CashPricesPanel(), flattenPlans(), formatSigned(), PriceRow (+2 more)

### Community 61 - "crud.ts"
Cohesion: 0.27
Nodes (8): CollectionMutationsConfig, FIELD_CODE_RU, invalidate(), listKeys(), MutationKeys, QueryKey, syncDetail(), queryClient

### Community 62 - "FloatingActions.tsx"
Cohesion: 0.13
Nodes (18): SumRow(), FreshStamp(), STAMP_GLYPHS, cn(), ConfirmDialog(), ConfirmDialogProps, ConfirmOptions, Modal() (+10 more)

### Community 63 - "Sidebar.tsx"
Cohesion: 0.40
Nodes (3): CategoryIcon(), Props, SidebarProps

### Community 64 - "OrderDetails.tsx"
Cohesion: 0.40
Nodes (5): OrderLineSnapshot, formatAddress(), LineRow(), OrderDetails(), Props

### Community 65 - "mapFrontpadSettings"
Cohesion: 0.47
Nodes (6): asNumberList(), asStringList(), fetchFrontpadSettings(), mapFrontpadSettings(), useFrontpadSettings(), frontpadSettingsFallback()

### Community 66 - "addons.ts"
Cohesion: 0.33
Nodes (4): addons, extras, IMG, sauces

### Community 67 - "image-field.tsx"
Cohesion: 0.40
Nodes (5): ALLOWED, formatMb(), IMAGE_MAX_BYTES, ImageField(), ImageFieldProps

### Community 68 - "counts.ts"
Cohesion: 0.50
Nodes (4): adminCountKeys, AdminCounts, fetchAdminCounts(), useAdminCounts()

## Knowledge Gaps
- **296 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+291 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `FloatingActions.tsx` to `selectors.ts`, `CustomerDrawer.tsx`, `formatPrice`, `product/model.ts`, `crud.ts`, `coupon/api.ts`, `@radix-ui/react-dialog`, `cn`, `banner/api.ts`, `tailwind-merge`, `zustand`, `product/model.ts`, `StickyBar.tsx`, `DesktopHome.tsx`, `AddonForm.tsx`, `customer/api.ts`, `useAdminAuth`, `lucide-react`, `react-dom`, `AdminPage.tsx`, `site.ts`, `react-easy-crop`, `store.ts`, `coupon/api.ts`, `CashPricesPanel.tsx`, `Sidebar.tsx`, `OrderDetails.tsx`, `image-field.tsx`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **Why does `formatPrice()` connect `store.ts` to `OrderDetails.tsx`, `StickyBar.tsx`, `AddonForm.tsx`, `customer/api.ts`, `CustomerDrawer.tsx`, `react-dom`, `CashPricesPanel.tsx`, `lucide-react`, `ProductEditor.tsx`, `@radix-ui/react-dialog`, `banner/api.ts`, `coupon/api.ts`, `category/api.ts`, `zustand`, `product/model.ts`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Why does `Button()` connect `coupon/api.ts` to `HomePage.tsx`, `CustomerDrawer.tsx`, `formatPrice`, `crud.ts`, `ProductEditor.tsx`, `lucide-react`, `cn`, `banner/api.ts`, `zustand`, `product/model.ts`, `StickyBar.tsx`, `AddonForm.tsx`, `cn.ts`, `customer/api.ts`, `react-easy-crop`, `store.ts`, `coupon/api.ts`, `CashPricesPanel.tsx`, `FloatingActions.tsx`, `image-field.tsx`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _296 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `HomePage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `selectors.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09915966386554621 - nodes in this community are weakly interconnected._