# Graph Report - shashlik-web  (2026-08-25)

## Corpus Check
- 173 files · ~174,372 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1102 nodes · 3256 edges · 68 communities (59 shown, 9 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 81 edges (avg confidence: 0.54)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b1e20771`
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
- button.tsx
- lucide-react
- react-dom
- AdminPage.tsx
- category/api.ts
- site.ts
- compress-image.ts
- lucide-react
- react-easy-crop
- sonner
- staff/api.ts
- auth.tsx
- banner-image-field.tsx
- selectors.ts
- store.ts
- ProductPage.tsx
- FrontpadPanel
- settingsFallback
- coupon/api.ts
- category/api.ts
- theme.tsx
- crud.ts
- FloatingActions.tsx
- pbErrorMessage
- Sidebar.tsx
- addons.ts
- surface.tsx
- invalidateProductRatings

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
- `AdminAuthProvider()` --indirect_call--> `logout()`  [INFERRED]
  src/shared/api/auth.tsx → src/entities/account/api.ts
- `useDuplicateProduct()` --indirect_call--> `product()`  [INFERRED]
  src/entities/product/api.ts → src/mocks/products.ts
- `useAddProduct()` --indirect_call--> `product()`  [INFERRED]
  src/features/cart/lib/useAddProduct.ts → src/mocks/products.ts
- `SearchDialog()` --indirect_call--> `product()`  [INFERRED]
  src/features/search/SearchDialog.tsx → src/mocks/products.ts
- `ProductsSection()` --indirect_call--> `product()`  [INFERRED]
  src/pages/admin/sections/products/ProductsSection.tsx → src/mocks/products.ts

## Import Cycles
- None detected.

## Communities (68 total, 9 thin omitted)

### Community 0 - "HomePage.tsx"
Cohesion: 0.14
Nodes (25): addonMutations, AddonRecord, CreateAddonInput, createBody(), fetchAddonById(), fetchAddons(), fetchAddonsByKind(), fetchExtras() (+17 more)

### Community 1 - "dependencies"
Cohesion: 0.12
Nodes (17): clsx, motion, dependencies, clsx, motion, pocketbase, @radix-ui/react-dialog, @radix-ui/react-slot (+9 more)

### Community 2 - "selectors.ts"
Cohesion: 0.10
Nodes (32): adminProductKeys, createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchAdminProducts() (+24 more)

### Community 4 - "cn"
Cohesion: 0.13
Nodes (23): applyPricesJobKeys, asNumberList(), asStatusMap(), asStringList(), fetchFrontpadSettings(), fetchFrontpadStock(), fetchStoppedStock(), FrontpadJobRecord (+15 more)

### Community 5 - "CatalogTables.tsx"
Cohesion: 0.09
Nodes (33): adminReviewKeys, buildOrdersFilter(), createOrder(), CreateOrderInput, CreateReviewInput, fetchActiveResendJobs(), fetchAdminReviews(), fetchMyOrders() (+25 more)

### Community 6 - "devDependencies"
Cohesion: 0.11
Nodes (19): devDependencies, tailwindcss, @tailwindcss/vite, tw-animate-css, @types/node, @types/react, @types/react-dom, typescript (+11 more)

### Community 7 - "compilerOptions"
Cohesion: 0.07
Nodes (26): DOM, DOM.Iterable, ES2023, node, src, vite/client, vite.config.ts, compilerOptions (+18 more)

### Community 8 - "CustomerDrawer.tsx"
Cohesion: 0.05
Nodes (76): AccountAuth, AccountContext, AccountProvider(), isAbortError(), refreshAuth(), useAccount(), acceptAuthToken(), accountCacheKey() (+68 more)

### Community 9 - "formatPrice"
Cohesion: 0.14
Nodes (19): fetchTags(), mapTag(), TagInput, tagKeys, tagMutations, TagRecord, tagsForCategory(), useCategoryTags() (+11 more)

### Community 10 - "category/api.ts"
Cohesion: 0.17
Nodes (11): FrontpadJob, FrontpadJobKind, FrontpadJobStatus, ORDER_STATUS_FLOW, ORDER_STATUS_SOURCE_LABEL, OrderLineAddon, OrderStatusSource, Review (+3 more)

### Community 13 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 14 - "banner/api.ts"
Cohesion: 0.11
Nodes (17): App(), AdminLogin, AdminPage, AppRoutes(), AuthCallbackPage, EASE, EXIT_ABS, loadMotionFeatures() (+9 more)

### Community 15 - "product/model.ts"
Cohesion: 0.21
Nodes (14): useFrontpadStockRealtime(), useCartTotals(), useCartStore, CartPanel(), MODE_OPTIONS, CartTotals(), SumRow(), CheckoutDialogState (+6 more)

### Community 16 - "AdminPage.tsx"
Cohesion: 0.19
Nodes (15): ApplyPricesJobResult, asRowList(), buildCells(), CashPriceCell, CashPricePlan, CashPriceStatus, cellDelta(), parseApplyPricesResult() (+7 more)

### Community 17 - "products.ts"
Cohesion: 0.10
Nodes (20): ALL_CATEGORY, Category, CategoryId, KNOWN_CATEGORY_IDS, KnownCategoryId, DEFAULT_CRITERIA, MeatIcon, ProductBadge (+12 more)

### Community 18 - "crud.ts"
Cohesion: 0.14
Nodes (16): useCreateProduct(), frontpadSettingsKeys, stoppedStockKeys, DEFAULT_NUTRITION, ProductCreateForm(), Props, parseDigitCodes(), PRICE_SOURCE_OPTIONS (+8 more)

### Community 19 - "ProductEditor.tsx"
Cohesion: 0.13
Nodes (23): buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams, CustomersPageResult, fetchCustomerById() (+15 more)

### Community 20 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, preview, typecheck, type (+1 more)

### Community 21 - "coupon/api.ts"
Cohesion: 0.18
Nodes (15): useCoupons(), useCreateCoupon(), useDeleteCoupon(), useUpdateCoupon(), Coupon, CouponForm(), KIND_OPTIONS, Props (+7 more)

### Community 22 - "lucide-react"
Cohesion: 0.19
Nodes (12): ALL_TAG, TagFilterId, Chip(), ChipProps, OptionCard(), OptionCardProps, Props, SPRING (+4 more)

### Community 23 - "@radix-ui/react-dialog"
Cohesion: 0.12
Nodes (23): buildSeries(), buildTopProducts(), countByFilter(), DashboardData, dashboardKeys, DashboardSection(), dayKey(), fetchDashboard() (+15 more)

### Community 24 - "cn"
Cohesion: 0.10
Nodes (23): bannerFormData(), bannerKeys, bannerMutations, BannerNote, BannerRecord, CreateBannerInput, fetchBannerById(), fetchBanners() (+15 more)

### Community 25 - "banner/api.ts"
Cohesion: 0.31
Nodes (11): frontpadStockKeys, fetchStoppedArticles(), isAddonStopped(), isSizeStopped(), isSkuStopped(), isVariantStopped(), stoppedArticlesKey, useStoppedArticles() (+3 more)

### Community 26 - "tailwind-merge"
Cohesion: 0.18
Nodes (16): useFrontpadStockArticles(), articleConflictMessage(), ArticleExclude, ArticleRef, cellLabel(), collectArticleConflicts(), isExcludedCell(), hasMissingArticle() (+8 more)

### Community 28 - "zustand"
Cohesion: 0.18
Nodes (20): useOrder(), useOrderJobs(), useResendOrder(), useUpdateOrderStatus(), isFrontpadWarning(), ORDER_STATUS_LABEL, OrderLineSnapshot, formatAddress() (+12 more)

### Community 29 - "AdminSidebar.tsx"
Cohesion: 0.12
Nodes (27): BadgeInput, badgeKeys, badgeMutations, BadgeRecord, fetchBadges(), mapBadge(), seedFallback(), useBadges() (+19 more)

### Community 30 - "staff/api.ts"
Cohesion: 0.21
Nodes (13): useCategories(), useProducts(), needsChooser(), Product, useAddProduct(), SearchDialog(), SearchDialogProps, groupProductsByCategory() (+5 more)

### Community 31 - "product/model.ts"
Cohesion: 0.11
Nodes (23): useDeleteProduct(), useDuplicateProduct(), useUpdateProduct(), PRODUCT_ASPECT_RATIO, imagesFromProduct(), MEAT_OPTIONS, newId(), PreviewToggle() (+15 more)

### Community 32 - "StickyBar.tsx"
Cohesion: 0.17
Nodes (24): KIND_FILTERS, STATUS_FILTERS, PriceRow, ROW_FILTERS, STATUS_LABEL, STATUS_FILTERS, ROLE_FILTERS, ROLE_LABEL (+16 more)

### Community 33 - "DesktopHome.tsx"
Cohesion: 0.19
Nodes (11): CartPanelState, useCartPanelStore, CartDock(), DesktopHome(), Props, Options, useInView(), useIsDesktop() (+3 more)

### Community 34 - "AddonForm.tsx"
Cohesion: 0.25
Nodes (9): useAdminReviews(), useDeleteReview(), useToggleReviewPublished(), ProductOption, ReviewFormProps, ReviewsSection(), STATUS_FILTERS, SheetContent() (+1 more)

### Community 35 - "cn.ts"
Cohesion: 0.48
Nodes (5): orderKeys, subscribeOrderStatus(), usePublicOrder(), useLiveOrder(), OrderTrackPage()

### Community 36 - "ProductCard.tsx"
Cohesion: 0.20
Nodes (11): move(), Props, SortableList(), cn(), ConfirmDialog(), ConfirmDialogProps, ConfirmOptions, Modal() (+3 more)

### Community 37 - "OrdersSection.tsx"
Cohesion: 0.16
Nodes (11): OrderStatus, DEFAULT_STATUS_MAP, FrontpadSettings, FrontpadStockItem, PriceSource, Settings, BADGE_LABEL, ORDER_RULES (+3 more)

### Community 38 - "useAdminAuth"
Cohesion: 0.24
Nodes (9): AdminGate(), AdminLogin(), AdminTopbar(), fetchNewOrdersCount(), newOrdersKey, useAdminAuth(), pb, queryClient (+1 more)

### Community 39 - "NutritionHint.tsx"
Cohesion: 0.32
Nodes (5): ProductNutrition, formatGrams(), NutritionHint(), HintMark(), TooltipContent()

### Community 40 - "button.tsx"
Cohesion: 0.17
Nodes (16): useCreateBanner(), useDeleteBanner(), useUpdateBanner(), formatCouponValue(), CartPromo(), CheckoutDialogProps, MODE_OPTIONS, BannerForm() (+8 more)

### Community 41 - "lucide-react"
Cohesion: 0.39
Nodes (5): catalogSectionId(), Options, useCatalogScrollSpy(), CatalogCategorySection(), Props

### Community 43 - "AdminPage.tsx"
Cohesion: 0.18
Nodes (13): useCustomersPage(), useAdminProducts(), loadDomMax(), ProductEditorRoute(), SectionStub(), ADMIN_NAV, AdminNavItem, AdminRole (+5 more)

### Community 44 - "category/api.ts"
Cohesion: 0.29
Nodes (9): useCreateCategory(), useDeleteCategory(), useUpdateCategory(), CategoriesSection(), CategoryForm(), Props, CATEGORY_ICONS, CategoryIconPath (+1 more)

### Community 50 - "staff/api.ts"
Cohesion: 0.16
Nodes (16): CreateStaffInput, fetchStaff(), mapStaff(), mapStaffRequired(), staffKeys, StaffMember, staffMutations, StaffRecord (+8 more)

### Community 51 - "auth.tsx"
Cohesion: 0.17
Nodes (15): GuardedSection(), AdminAuth, AdminAuthContext, AdminAuthProvider(), authErrorMessage(), can(), isAbortError(), isStaffRecord() (+7 more)

### Community 52 - "banner-image-field.tsx"
Cohesion: 0.19
Nodes (13): canvasToBlob(), compressImage(), CompressOptions, loadImage(), canvasToBlob(), CropArea, cropImageToFile(), loadImage() (+5 more)

### Community 53 - "selectors.ts"
Cohesion: 0.24
Nodes (13): addonKeys, productKeys, articleFor(), cartLineTitle(), findSize(), findVariant(), priceOf(), SkuCell (+5 more)

### Community 54 - "store.ts"
Cohesion: 0.15
Nodes (10): AppliedCoupon, calcCouponDiscount(), CouponKind, DeliveryMode, OrderAddressParts, AddPayload, CartAddon, CartItem (+2 more)

### Community 55 - "ProductPage.tsx"
Cohesion: 0.20
Nodes (9): ProductViewProps, AddonRow(), Props, FreshStamp(), STAMP_GLYPHS, SIZES, StepBtn(), Stepper() (+1 more)

### Community 56 - "FrontpadPanel"
Cohesion: 0.17
Nodes (13): enqueueApplyPricesJob(), enqueueSyncJob(), fetchActiveSyncJobs(), fetchApplyPricesJobs(), mapJob(), useActiveSyncJobs(), useApplyPricesJobs(), useEnqueueApplyPricesJob() (+5 more)

### Community 57 - "settingsFallback"
Cohesion: 0.33
Nodes (10): fetchSettings(), mapSettings(), useSettings(), settingsFallback(), CheckoutDialog(), parseNonNeg(), SettingsSection(), AddressBar() (+2 more)

### Community 58 - "coupon/api.ts"
Cohesion: 0.20
Nodes (10): couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail, PromoCheckOk (+2 more)

### Community 59 - "category/api.ts"
Cohesion: 0.27
Nodes (9): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+1 more)

### Community 60 - "theme.tsx"
Cohesion: 0.31
Nodes (7): readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), useTheme(), ThemeToggle()

### Community 61 - "crud.ts"
Cohesion: 0.28
Nodes (8): collectionMutations(), CollectionMutationsConfig, FIELD_CODE_RU, invalidate(), listKeys(), MutationKeys, QueryKey, syncDetail()

### Community 62 - "FloatingActions.tsx"
Cohesion: 0.32
Nodes (6): CartToggle(), formatOrderSum(), Props, FloatingActions(), Props, TONE

### Community 63 - "pbErrorMessage"
Cohesion: 0.29
Nodes (7): checkPromo(), updateFrontpadSettings(), updateSettings(), useUpdateFrontpadSettings(), useUpdateSettings(), pbErrorMessage(), wrapError()

### Community 64 - "Sidebar.tsx"
Cohesion: 0.40
Nodes (3): CategoryIcon(), Props, SidebarProps

### Community 65 - "addons.ts"
Cohesion: 0.33
Nodes (4): addons, extras, IMG, sauces

### Community 66 - "surface.tsx"
Cohesion: 0.40
Nodes (5): GroupLabel(), Panel(), PanelProps, SectionTitle(), surfaceVariants

### Community 67 - "invalidateProductRatings"
Cohesion: 0.67
Nodes (4): invalidateProductRatings(), useCreateReview(), useUpdateReview(), ReviewForm()

## Knowledge Gaps
- **293 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+288 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `ProductCard.tsx` to `selectors.ts`, `CustomerDrawer.tsx`, `banner/api.ts`, `product/model.ts`, `AdminPage.tsx`, `crud.ts`, `lucide-react`, `@radix-ui/react-dialog`, `cn`, `banner/api.ts`, `tailwind-merge`, `zustand`, `AdminSidebar.tsx`, `staff/api.ts`, `product/model.ts`, `StickyBar.tsx`, `AddonForm.tsx`, `NutritionHint.tsx`, `button.tsx`, `AdminPage.tsx`, `category/api.ts`, `banner-image-field.tsx`, `ProductPage.tsx`, `settingsFallback`, `theme.tsx`, `FloatingActions.tsx`, `Sidebar.tsx`, `surface.tsx`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Why does `formatPrice()` connect `zustand` to `StickyBar.tsx`, `HomePage.tsx`, `CustomerDrawer.tsx`, `button.tsx`, `AdminPage.tsx`, `product/model.ts`, `AdminPage.tsx`, `crud.ts`, `ProductEditor.tsx`, `coupon/api.ts`, `ProductPage.tsx`, `@radix-ui/react-dialog`, `FrontpadPanel`, `banner/api.ts`, `product/model.ts`, `AdminSidebar.tsx`, `staff/api.ts`, `settingsFallback`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Why does `pb` connect `useAdminAuth` to `HomePage.tsx`, `selectors.ts`, `tailwind-merge`, `cn`, `CatalogTables.tsx`, `CustomerDrawer.tsx`, `formatPrice`, `staff/api.ts`, `ProductEditor.tsx`, `auth.tsx`, `crud.ts`, `@radix-ui/react-dialog`, `cn`, `banner/api.ts`, `coupon/api.ts`, `category/api.ts`, `AdminSidebar.tsx`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _293 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `HomePage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13756613756613756 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `selectors.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10084033613445378 - nodes in this community are weakly interconnected._