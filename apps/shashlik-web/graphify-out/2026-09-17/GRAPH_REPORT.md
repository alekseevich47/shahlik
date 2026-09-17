# Graph Report - shashlik-web  (2026-09-17)

## Corpus Check
- 245 files · ~223,117 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1532 nodes · 4389 edges · 84 communities (75 shown, 9 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 134 edges (avg confidence: 0.55)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fd4a4779`
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
- Sidebar.tsx
- surface.tsx
- coupon/api.ts
- category/api.ts
- @radix-ui/react-slot
- crud.ts
- FloatingActions.tsx
- @radix-ui/react-tooltip
- OrderDetails.tsx
- mapFrontpadSettings
- files.ts
- getAccount
- counts.ts
- sonner
- CartTotals.tsx
- copy-vkid-sdk.mjs
- addons.ts
- invalidateProductRatings
- class-variance-authority
- tailwind-merge
- lucide-react
- App.tsx
- settings/model.ts
- class-variance-authority
- @radix-ui/react-popover
- @radix-ui/react-tooltip
- react-easy-crop
- zustand

## God Nodes (most connected - your core abstractions)
1. `cn()` - 162 edges
2. `formatPrice()` - 53 edges
3. `Button()` - 48 edges
4. `ProductEditor()` - 29 edges
5. `Input()` - 25 edges
6. `useAccount()` - 24 edges
7. `useCategories()` - 24 edges
8. `pb` - 23 edges
9. `n()` - 22 edges
10. `useCartTotals()` - 22 edges

## Surprising Connections (you probably didn't know these)
- `buildSizes()` --indirect_call--> `minPrice()`  [INFERRED]
  scripts/sync-products-from-cash.mjs → src/entities/product/lib.ts
- `normalizeDistribution()` --indirect_call--> `n()`  [INFERRED]
  src/entities/product/model.ts → public/vk/vkid-sdk.js
- `ProductEditor()` --indirect_call--> `n()`  [INFERRED]
  src/pages/admin/sections/ProductEditor.tsx → public/vk/vkid-sdk.js
- `FrontpadPanel()` --indirect_call--> `n()`  [INFERRED]
  src/pages/admin/sections/settings/FrontpadPanel.tsx → public/vk/vkid-sdk.js
- `FrontpadPanel()` --indirect_call--> `t()`  [INFERRED]
  src/pages/admin/sections/settings/FrontpadPanel.tsx → public/vk/vkid-sdk.js

## Import Cycles
- None detected.

## Communities (84 total, 9 thin omitted)

### Community 0 - "HomePage.tsx"
Cohesion: 0.15
Nodes (16): fetchBonus(), submitReferral(), useProfileBonus(), isActiveOrderStatus(), getLatestLocalOrderId(), BonusTab(), CurrentOrderTab(), EmptyBlock() (+8 more)

### Community 1 - "dependencies"
Cohesion: 0.11
Nodes (19): clsx, lucide-react, motion, dependencies, clsx, lucide-react, motion, @radix-ui/react-dialog (+11 more)

### Community 2 - "selectors.ts"
Cohesion: 0.12
Nodes (25): createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchAdminProducts(), fetchProductById() (+17 more)

### Community 4 - "cn"
Cohesion: 0.13
Nodes (25): applyPricesJobKeys, asNumberList(), asStatusMap(), asStringList(), enqueueApplyPricesJob(), fetchFrontpadSettings(), FrontpadJobRecord, FrontpadSettingsRecord (+17 more)

### Community 5 - "CatalogTables.tsx"
Cohesion: 0.09
Nodes (32): adminReviewKeys, buildOrdersFilter(), createOrder(), CreateOrderInput, CreateReviewInput, fetchActiveResendJobs(), fetchAdminReviews(), fetchMyOrders() (+24 more)

### Community 6 - "devDependencies"
Cohesion: 0.10
Nodes (21): devDependencies, tailwindcss, @tailwindcss/vite, tw-animate-css, @types/node, @types/react, @types/react-dom, typescript (+13 more)

### Community 7 - "compilerOptions"
Cohesion: 0.07
Nodes (26): DOM, DOM.Iterable, ES2023, node, src, vite/client, vite.config.ts, compilerOptions (+18 more)

### Community 8 - "CustomerDrawer.tsx"
Cohesion: 0.11
Nodes (42): accountCacheKey(), accountKeys, addAddress(), asId(), asString(), avatarFromYandexMeta(), BonusResponse, getAccount() (+34 more)

### Community 9 - "formatPrice"
Cohesion: 0.06
Nodes (38): BadgeInput, badgeKeys, badgeMutations, BadgeRecord, fetchBadges(), mapBadge(), seedFallback(), useCreateBadge() (+30 more)

### Community 10 - "category/api.ts"
Cohesion: 0.09
Nodes (23): DeliveryMode, FrontpadJob, FrontpadJobKind, FrontpadJobStatus, Order, ORDER_STATUS_FLOW, ORDER_STATUS_LABEL, ORDER_STATUS_SOURCE_LABEL (+15 more)

### Community 13 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 14 - "banner/api.ts"
Cohesion: 0.15
Nodes (21): completeVkOneTap(), createVkOneTapSession(), resolveVkAppId(), attachVkOneTap(), detachVkOneTap(), isBenignVkError(), mountWidget(), remountWidget() (+13 more)

### Community 15 - "product/model.ts"
Cohesion: 0.17
Nodes (16): frontpadSettingsKeys, stoppedStockKeys, syncJobKeys, formatRemaining(), FRONTPAD_STATUS_CODES, FRONTPAD_STATUS_LABEL, frontpadCodeLabel(), FrontpadPanel() (+8 more)

### Community 16 - "AdminPage.tsx"
Cohesion: 0.20
Nodes (14): useMyOrders(), canUseStorage(), isStoredOrder(), listLocalOrderIds(), load(), prune(), rememberLocalOrder(), save() (+6 more)

### Community 17 - "products.ts"
Cohesion: 0.11
Nodes (14): ALL_CATEGORY, CategoryId, KNOWN_CATEGORY_IDS, KnownCategoryId, ProductBadge, categories, MEAT_VARIANTS, NUTRITION_BY_CATEGORY (+6 more)

### Community 18 - "crud.ts"
Cohesion: 0.07
Nodes (39): applyQuality(), GraphicsContext, GraphicsContextValue, GraphicsProvider(), GraphicsQuality, readInitialQuality(), useGraphics(), readInitialTheme() (+31 more)

### Community 19 - "ProductEditor.tsx"
Cohesion: 0.10
Nodes (28): useCustomerLedger(), BonusHistoryReason(), BonusHistoryRow, BONUS_REASON_LABEL, buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations (+20 more)

### Community 20 - "package.json"
Cohesion: 0.18
Nodes (10): name, private, scripts, build, copy:vk-sdk, dev, preview, typecheck (+2 more)

### Community 21 - "coupon/api.ts"
Cohesion: 0.14
Nodes (29): AddonKind, useCustomersPage(), COLUMNS, LogsSection(), KIND_FILTERS, CustomersSection(), STATUS_FILTERS, PriceRow (+21 more)

### Community 22 - "lucide-react"
Cohesion: 0.18
Nodes (16): addonKeys, addonMutations, AddonRecord, CreateAddonInput, createBody(), fetchAddonById(), fetchAddonsByKind(), fetchExtras() (+8 more)

### Community 23 - "@radix-ui/react-dialog"
Cohesion: 0.13
Nodes (22): buildSeries(), buildTopProducts(), countByFilter(), DashboardData, dashboardKeys, DashboardSection(), dayKey(), fetchDashboard() (+14 more)

### Community 24 - "cn"
Cohesion: 0.21
Nodes (14): useAddons(), useFrontpadStockArticles(), articleConflictMessage(), ArticleExclude, ArticleRef, cellLabel(), collectArticleConflicts(), isExcludedCell() (+6 more)

### Community 25 - "banner/api.ts"
Cohesion: 0.15
Nodes (14): mapRating(), normalizeDistribution(), ProductNutrition, RatingCriterion, CriterionHint(), formatGrams(), NutritionHint(), useIsDesktop() (+6 more)

### Community 26 - "tailwind-merge"
Cohesion: 0.20
Nodes (15): useCreateOrder(), OrderAddressParts, formatAddressLine(), PaymentMethod, savedToParts(), useCheckout(), UseCheckoutArgs, AddressSection() (+7 more)

### Community 27 - "@tanstack/react-query"
Cohesion: 0.21
Nodes (16): useBadges(), badgeLabel(), PRODUCT_ASPECT_RATIO, minPrice(), isProductStopped(), useStoppedArticles(), ProductCard(), ProductCardProps (+8 more)

### Community 28 - "zustand"
Cohesion: 0.18
Nodes (14): GuardedSection(), AdminAuth, AdminAuthContext, AdminAuthProvider(), authErrorMessage(), can(), isAbortError(), isStaffRecord() (+6 more)

### Community 29 - "AdminSidebar.tsx"
Cohesion: 0.35
Nodes (10): fetchSettings(), mapSettings(), useSettings(), settingsFallback(), CheckoutDialog(), parseNonNeg(), SettingsSection(), MobileHome() (+2 more)

### Community 30 - "staff/api.ts"
Cohesion: 0.15
Nodes (17): CreateStaffInput, fetchStaff(), mapStaff(), mapStaffRequired(), staffKeys, StaffMember, staffMutations, StaffRecord (+9 more)

### Community 31 - "product/model.ts"
Cohesion: 0.12
Nodes (18): CategoryIcon(), Props, clampScroll(), Edges, EdgeSide, prefersReducedMotion(), readEdges(), stepScrollLeft() (+10 more)

### Community 32 - "StickyBar.tsx"
Cohesion: 0.18
Nodes (13): useDeleteAddon(), useDeleteBanner(), useUpdateBanner(), AddonsSection(), BannerForm(), BannersSection(), move(), Props (+5 more)

### Community 33 - "DesktopHome.tsx"
Cohesion: 0.12
Nodes (25): useAccount(), checkPromo(), AppliedCoupon, calcCouponDiscount(), formatCouponValue(), CartTotals, ResolvedAddon, useCartTotals() (+17 more)

### Community 34 - "AddonForm.tsx"
Cohesion: 0.19
Nodes (17): productKeys, useProducts(), DEFAULT_CRITERIA, CriteriaScores, fetchRatedProductIds(), ratingKeys, ratingSubmitError(), submitProductRating() (+9 more)

### Community 35 - "cn.ts"
Cohesion: 0.19
Nodes (16): fetchSizeTemplates(), mapSizeTemplate(), seedFallback(), SizeTemplateInput, sizeTemplateKeys, sizeTemplateMutations, SizeTemplateRecord, useCreateSizeTemplate() (+8 more)

### Community 36 - "customer/api.ts"
Cohesion: 0.11
Nodes (24): AccountAuth, AccountContext, AccountProvider(), isAbortError(), refreshAuth(), useAccount(), acceptAuthToken(), getClientAuthEpoch() (+16 more)

### Community 37 - "OrdersSection.tsx"
Cohesion: 0.17
Nodes (9): AdminGate(), AdminLogin, AdminPage, AuthCallbackPage, EASE, EXIT_ABS, loadMotionFeatures(), OrderTrackPage (+1 more)

### Community 38 - "useAdminAuth"
Cohesion: 0.15
Nodes (20): useDuplicateProduct(), cellNutrition(), defaultNutritionFromSizes(), setCellNutrition(), criterionScore(), criterionStars(), MeatIcon, ProductSize (+12 more)

### Community 39 - "NutritionHint.tsx"
Cohesion: 0.10
Nodes (20): needsChooser(), Product, useAddProduct(), CartPanelState, useCartPanelStore, CartDock(), CartLineTitleProps, HomeMobileTabBar() (+12 more)

### Community 40 - "button.tsx"
Cohesion: 0.12
Nodes (21): adjustBonus(), bonusKeys, BonusSettingsRecord, bulkSetBonusPercent(), fetchBonusSettings(), fetchCustomerLedger(), LedgerRecord, mapLedger() (+13 more)

### Community 41 - "lucide-react"
Cohesion: 0.20
Nodes (19): claimPwaInstallBonus(), fetchPublicBonusSettings(), usePublicBonusSettings(), publicBonusSettingsFallback(), CheckoutLineRow(), detectInstallPlatform(), dismissPwaForever(), isPwaDismissedForever() (+11 more)

### Community 42 - "react-dom"
Cohesion: 0.36
Nodes (7): useAdminReviews(), useDeleteReview(), useToggleReviewPublished(), ProductOption, ReviewFormProps, ReviewsSection(), STATUS_FILTERS

### Community 43 - "AdminPage.tsx"
Cohesion: 0.20
Nodes (12): useBonusSettings(), useUpdateBonusSettings(), loadDomMax(), SectionStub(), ADMIN_NAV, AdminNavItem, AdminRole, AdminSectionId (+4 more)

### Community 44 - "theme.tsx"
Cohesion: 0.14
Nodes (18): e(), e1(), e5(), e6(), eB(), eU(), n(), ns() (+10 more)

### Community 45 - "site.ts"
Cohesion: 0.13
Nodes (23): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+15 more)

### Community 46 - "compress-image.ts"
Cohesion: 0.08
Nodes (30): SumRow(), BADGES, CheckoutTrustBadges(), SafePaymentBanner(), SafePaymentBannerProps, Props, FreshStamp(), STAMP_GLYPHS (+22 more)

### Community 47 - "lucide-react"
Cohesion: 0.15
Nodes (12): Addon, addons, extras, IMG, sauces, AddonRow(), formatWeight(), Props (+4 more)

### Community 48 - "react-easy-crop"
Cohesion: 0.33
Nodes (7): orderKeys, subscribeOrderStatus(), usePublicOrder(), repeatOrderIntoCart(), useLiveOrder(), OrderTrackPage(), RepeatButton()

### Community 49 - "sonner"
Cohesion: 0.26
Nodes (10): useCreateCategory(), useDeleteCategory(), useUpdateCategory(), useAdminProducts(), ProductEditorRoute(), CategoriesSection(), CategoryForm(), Props (+2 more)

### Community 50 - "invalidateProductRatings"
Cohesion: 0.17
Nodes (12): ng(), np(), o(), o2(), o3(), og(), ol(), os() (+4 more)

### Community 51 - "pocketbase"
Cohesion: 0.06
Nodes (29): pocketbase, pocketbase, auth(), buildCompositionByVariant(), compositionBySlug, formatComposition(), nutritionBySlug, pb (+21 more)

### Community 52 - "@radix-ui/react-popover"
Cohesion: 0.25
Nodes (9): activityLogKeys, ActivityLogsPage, ActivityRecord, fetchActivityLogsPage(), mapLog(), useActivityLogsPage(), ActivityActorType, ActivityLog (+1 more)

### Community 53 - "selectors.ts"
Cohesion: 0.22
Nodes (10): lenis, lenis, isProductModalOpen(), LENIS_OPTIONS, Props, ScrollOptions, VitrineScrollApi, VitrineScrollContext (+2 more)

### Community 54 - "store.ts"
Cohesion: 0.18
Nodes (17): articleFor(), ApplyPricesJobResult, asRowList(), buildCells(), CashPriceCell, CashPricePlan, CashPriceStatus, cellDelta() (+9 more)

### Community 55 - "ProductPage.tsx"
Cohesion: 0.33
Nodes (7): fetchAddons(), useFrontpadStockRealtime(), CheckoutDialogState, useCheckoutDialogStore, HomePage(), PdpChromeState, usePdpChromeStore

### Community 56 - "Sidebar.tsx"
Cohesion: 0.32
Nodes (4): VkOneTap(), VkOneTapProps, AuthButtons(), AuthButtonsProps

### Community 57 - "surface.tsx"
Cohesion: 0.36
Nodes (7): calcBonusSpendCap(), calcCartEarn(), calcLineEarn(), clampPercent(), EarnLineInput, resolveEarnPercent(), CartTotalsProps

### Community 58 - "coupon/api.ts"
Cohesion: 0.17
Nodes (15): useCoupons(), useCreateCoupon(), useDeleteCoupon(), useUpdateCoupon(), Coupon, CouponForm(), KIND_OPTIONS, Props (+7 more)

### Community 59 - "category/api.ts"
Cohesion: 0.22
Nodes (9): i(), nu(), o1(), oB(), oc(), od(), oi(), oz() (+1 more)

### Community 60 - "@radix-ui/react-slot"
Cohesion: 0.25
Nodes (7): AdminPage(), adminCountKeys, AdminCounts, fetchAdminCounts(), useAdminCounts(), pb, QueryKey

### Community 61 - "crud.ts"
Cohesion: 0.16
Nodes (10): BonusEarnHint(), BonusEarnHintProps, BonusSpendBlock(), CheckoutDialogProps, PAYMENT_OPTIONS, RegistrationBonusModal(), RegistrationBonusModalProps, CoinIcon() (+2 more)

### Community 62 - "FloatingActions.tsx"
Cohesion: 0.13
Nodes (28): useExtras(), useSauces(), cartLineTitle(), compositionOf(), findSize(), findVariant(), hasMissingArticle(), nutritionForPortion() (+20 more)

### Community 63 - "@radix-ui/react-tooltip"
Cohesion: 0.29
Nodes (7): enqueueSyncJob(), fetchActiveSyncJobs(), fetchApplyPricesJobs(), mapJob(), useActiveSyncJobs(), useApplyPricesJobs(), useEnqueueSyncJob()

### Community 64 - "OrderDetails.tsx"
Cohesion: 0.25
Nodes (14): useOrder(), useOrderJobs(), useResendOrder(), useUpdateOrderStatus(), isFrontpadWarning(), AdminLogin(), formatAddress(), moneyRow() (+6 more)

### Community 65 - "mapFrontpadSettings"
Cohesion: 0.25
Nodes (8): a(), r(), tf(), tg(), to(), tr(), tW(), tz()

### Community 66 - "files.ts"
Cohesion: 0.13
Nodes (20): BANNER_ASPECT_RATIO, canvasToBlob(), compressImage(), CompressOptions, loadImage(), canvasToBlob(), CropArea, cropImageToFile() (+12 more)

### Community 67 - "getAccount"
Cohesion: 0.33
Nodes (7): updateBody(), updateProduct(), useDeleteProduct(), useToggleProductActive(), useUpdateProduct(), applyFilteredReorder(), ProductsSection()

### Community 68 - "counts.ts"
Cohesion: 0.16
Nodes (16): bannerFormData(), bannerKeys, bannerMutations, BannerNote, BannerRecord, CreateBannerInput, fetchBannerById(), fetchBanners() (+8 more)

### Community 69 - "sonner"
Cohesion: 0.43
Nodes (6): filenamesOf(), FileRecord, imageFilenames(), imageUrl(), imageUrls(), ToFormDataOptions

### Community 70 - "CartTotals.tsx"
Cohesion: 0.12
Nodes (25): useCreateProduct(), Props, Props, DEFAULT_NUTRITION, ProductCreateForm(), Props, TabId, TABS (+17 more)

### Community 71 - "copy-vkid-sdk.mjs"
Cohesion: 0.33
Nodes (4): dest, destDir, root, src

### Community 72 - "addons.ts"
Cohesion: 0.40
Nodes (5): fetchFrontpadStock(), fetchStoppedStock(), mapStock(), useFrontpadStock(), useStoppedStock()

### Community 73 - "invalidateProductRatings"
Cohesion: 0.67
Nodes (4): invalidateProductRatings(), useCreateReview(), useUpdateReview(), ReviewForm()

### Community 74 - "class-variance-authority"
Cohesion: 0.83
Nodes (3): formatScore10(), formatScore5(), trimZero()

### Community 78 - "App.tsx"
Cohesion: 0.31
Nodes (6): App(), AppRoutes(), ScrollToTop(), container, queryClient, backgroundOf()

### Community 80 - "settings/model.ts"
Cohesion: 0.25
Nodes (7): OrderStatus, DEFAULT_STATUS_MAP, FrontpadSettings, FrontpadStockItem, PriceSource, Settings, ORDER_RULES

## Knowledge Gaps
- **384 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+379 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `compress-image.ts` to `HomePage.tsx`, `selectors.ts`, `formatPrice`, `category/api.ts`, `AdminPage.tsx`, `crud.ts`, `coupon/api.ts`, `@radix-ui/react-dialog`, `cn`, `banner/api.ts`, `tailwind-merge`, `@tanstack/react-query`, `AdminSidebar.tsx`, `product/model.ts`, `StickyBar.tsx`, `DesktopHome.tsx`, `cn.ts`, `customer/api.ts`, `useAdminAuth`, `NutritionHint.tsx`, `button.tsx`, `AdminPage.tsx`, `site.ts`, `lucide-react`, `sonner`, `store.ts`, `surface.tsx`, `coupon/api.ts`, `crud.ts`, `FloatingActions.tsx`, `files.ts`, `CartTotals.tsx`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `tailwind-merge`, `lucide-react`, `pocketbase`, `class-variance-authority`, `package.json`, `selectors.ts`, `@radix-ui/react-popover`, `@radix-ui/react-tooltip`, `react-easy-crop`, `zustand`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Why does `VitrineScrollProvider()` connect `selectors.ts` to `ProductPage.tsx`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `ProductEditor()` (e.g. with `e()` and `n()`) actually correct?**
  _`ProductEditor()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _384 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `HomePage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14619883040935672 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._