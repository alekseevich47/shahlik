# Graph Report - shashlik-web  (2026-09-17)

## Corpus Check
- 246 files · ~227,777 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1544 nodes · 4405 edges · 85 communities (77 shown, 8 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 134 edges (avg confidence: 0.55)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1463ad98`
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
- router.tsx
- mapFrontpadSettings
- files.ts
- getAccount
- counts.ts
- sonner
- CartTotals.tsx
- copy-vkid-sdk.mjs
- DisplaySettingsModal.tsx
- getAccount
- crud.ts
- stock.ts
- tailwind-merge
- AddressSection.tsx
- ThemePeekButton.tsx
- graphics.tsx
- BadgeManagerDialog.tsx
- AdminCard.tsx
- lucide-react
- @radix-ui/react-popover
- @radix-ui/react-tooltip

## God Nodes (most connected - your core abstractions)
1. `cn()` - 162 edges
2. `formatPrice()` - 52 edges
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

## Communities (85 total, 8 thin omitted)

### Community 0 - "HomePage.tsx"
Cohesion: 0.12
Nodes (25): fetchBonus(), submitReferral(), useProfileBonus(), isActiveOrderStatus(), formatAddressLine(), canUseStorage(), getLatestLocalOrderId(), isStoredOrder() (+17 more)

### Community 1 - "dependencies"
Cohesion: 0.10
Nodes (21): class-variance-authority, clsx, motion, dependencies, class-variance-authority, clsx, motion, @radix-ui/react-dialog (+13 more)

### Community 2 - "selectors.ts"
Cohesion: 0.12
Nodes (26): adminProductKeys, createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchAdminProducts() (+18 more)

### Community 4 - "cn"
Cohesion: 0.06
Nodes (63): OrderStatus, applyPricesJobKeys, asNumberList(), asStatusMap(), asStringList(), enqueueApplyPricesJob(), enqueueSyncJob(), fetchActiveSyncJobs() (+55 more)

### Community 5 - "CatalogTables.tsx"
Cohesion: 0.09
Nodes (31): adminReviewKeys, buildOrdersFilter(), createOrder(), CreateOrderInput, CreateReviewInput, fetchActiveResendJobs(), fetchAdminReviews(), fetchMyOrders() (+23 more)

### Community 6 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, sharp, tailwindcss, @tailwindcss/vite, tw-animate-css, @types/node, @types/react, @types/react-dom (+15 more)

### Community 7 - "compilerOptions"
Cohesion: 0.07
Nodes (26): DOM, DOM.Iterable, ES2023, node, src, vite/client, vite.config.ts, compilerOptions (+18 more)

### Community 8 - "CustomerDrawer.tsx"
Cohesion: 0.13
Nodes (30): accountKeys, asId(), asString(), avatarFromYandexMeta(), BonusResponse, linkPhone(), loginWithOAuth(), loginWithVkId() (+22 more)

### Community 9 - "formatPrice"
Cohesion: 0.17
Nodes (20): BadgeInput, badgeKeys, badgeMutations, BadgeRecord, fetchBadges(), mapBadge(), seedFallback(), useBadges() (+12 more)

### Community 10 - "category/api.ts"
Cohesion: 0.11
Nodes (18): FrontpadJob, FrontpadJobKind, FrontpadJobStatus, ORDER_STATUS_FLOW, ORDER_STATUS_LABEL, ORDER_STATUS_SOURCE_LABEL, ORDER_STATUSES, OrderLineAddon (+10 more)

### Community 13 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 14 - "banner/api.ts"
Cohesion: 0.22
Nodes (14): cartLineTitle(), findSize(), findVariant(), hasMissingArticle(), nutritionForPortion(), nutritionOf(), parseWeightGrams(), scaleNutrition() (+6 more)

### Community 15 - "product/model.ts"
Cohesion: 0.15
Nodes (21): completeVkOneTap(), createVkOneTapSession(), resolveVkAppId(), attachVkOneTap(), detachVkOneTap(), isBenignVkError(), mountWidget(), remountWidget() (+13 more)

### Community 16 - "AdminPage.tsx"
Cohesion: 0.19
Nodes (20): useOrder(), useOrderJobs(), useResendOrder(), useUpdateOrderStatus(), isFrontpadWarning(), formatAddress(), moneyRow(), OrderDrawer() (+12 more)

### Community 17 - "products.ts"
Cohesion: 0.10
Nodes (15): ALL_CATEGORY, CategoryId, KNOWN_CATEGORY_IDS, KnownCategoryId, useDuplicateProduct(), ProductBadge, categories, MEAT_VARIANTS (+7 more)

### Community 18 - "crud.ts"
Cohesion: 0.31
Nodes (10): useBanners(), oppositeThemeSrc(), resolveThemeSrc(), isProductModalOpen(), prefetch(), scheduleIdle(), ThemeAwareImage(), ThemeAwareImageProps (+2 more)

### Community 19 - "ProductEditor.tsx"
Cohesion: 0.11
Nodes (27): useCustomerLedger(), buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams, CustomersPageResult (+19 more)

### Community 20 - "package.json"
Cohesion: 0.29
Nodes (7): scripts, build, copy:vk-sdk, dev, gen:pwa-icons, preview, typecheck

### Community 21 - "coupon/api.ts"
Cohesion: 0.15
Nodes (27): COLUMNS, KIND_FILTERS, STATUS_FILTERS, STATUS_FILTERS, Column, DataTable(), Props, SortDir (+19 more)

### Community 22 - "lucide-react"
Cohesion: 0.13
Nodes (21): addonKeys, addonMutations, AddonRecord, CreateAddonInput, createBody(), fetchAddonById(), fetchAddonsByKind(), fetchExtras() (+13 more)

### Community 23 - "@radix-ui/react-dialog"
Cohesion: 0.18
Nodes (17): buildSeries(), buildTopProducts(), countByFilter(), DashboardData, dashboardKeys, DashboardSection(), dayKey(), fetchDashboard() (+9 more)

### Community 24 - "cn"
Cohesion: 0.27
Nodes (9): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+1 more)

### Community 25 - "banner/api.ts"
Cohesion: 0.20
Nodes (14): AccountAuth, AccountContext, AccountProvider(), isAbortError(), refreshAuth(), useAccount(), acceptAuthToken(), getClientAuthEpoch() (+6 more)

### Community 26 - "tailwind-merge"
Cohesion: 0.18
Nodes (8): AppliedCoupon, DeliveryMode, OrderAddressParts, AddPayload, CartAddon, CartItem, CartState, EMPTY_ADDRESS_PARTS

### Community 27 - "@tanstack/react-query"
Cohesion: 0.17
Nodes (15): needsChooser(), isAddonStopped(), Product, useAddProduct(), useCartStore, CartLineRow(), CartLineRowProps, CartLineTitle() (+7 more)

### Community 28 - "zustand"
Cohesion: 0.40
Nodes (4): name, private, type, version

### Community 29 - "AdminSidebar.tsx"
Cohesion: 0.23
Nodes (14): useAccount(), useMyOrders(), fetchSettings(), mapSettings(), useSettings(), settingsFallback(), CheckoutDialog(), getLocalOrderCount() (+6 more)

### Community 30 - "staff/api.ts"
Cohesion: 0.16
Nodes (20): CreateStaffInput, fetchStaff(), mapStaff(), mapStaffRequired(), staffKeys, StaffMember, staffMutations, StaffRecord (+12 more)

### Community 31 - "product/model.ts"
Cohesion: 0.15
Nodes (15): CategoryIcon(), Props, clampScroll(), Edges, EdgeSide, prefersReducedMotion(), readEdges(), stepScrollLeft() (+7 more)

### Community 32 - "StickyBar.tsx"
Cohesion: 0.17
Nodes (9): VkOneTap(), VkOneTapProps, AuthButtons(), AuthButtonsProps, LoginPanel(), BADGE_LABEL, ORDER_RULES, resolveBadgeLabel() (+1 more)

### Community 33 - "DesktopHome.tsx"
Cohesion: 0.25
Nodes (8): checkPromo(), formatCouponValue(), CartPromo(), CartPromoProps, CheckoutPromoField(), CheckoutPromoFieldProps, FloatingField(), FloatingFieldProps

### Community 34 - "AddonForm.tsx"
Cohesion: 0.19
Nodes (17): productKeys, useProducts(), DEFAULT_CRITERIA, CriteriaScores, fetchRatedProductIds(), ratingKeys, ratingSubmitError(), submitProductRating() (+9 more)

### Community 35 - "cn.ts"
Cohesion: 0.19
Nodes (16): fetchSizeTemplates(), mapSizeTemplate(), seedFallback(), SizeTemplateInput, sizeTemplateKeys, sizeTemplateMutations, SizeTemplateRecord, useCreateSizeTemplate() (+8 more)

### Community 36 - "customer/api.ts"
Cohesion: 0.38
Nodes (4): useTheme(), ThemeToggle(), MobileHeader(), Props

### Community 37 - "OrdersSection.tsx"
Cohesion: 0.40
Nodes (4): outDir, root, sizes, srcPath

### Community 38 - "useAdminAuth"
Cohesion: 0.16
Nodes (17): cellNutrition(), defaultNutritionFromSizes(), setCellNutrition(), ProductSize, ProductVariant, imagesDarkFromProduct(), imagesFromProduct(), matchedTemplateId() (+9 more)

### Community 39 - "NutritionHint.tsx"
Cohesion: 0.18
Nodes (8): CartPanelState, useCartPanelStore, CartDock(), CatalogSection, Props, Options, useInView(), useSettling()

### Community 40 - "button.tsx"
Cohesion: 0.06
Nodes (62): adjustBonus(), bonusKeys, BonusSettingsRecord, bulkSetBonusPercent(), claimPwaInstallBonus(), fetchBonusSettings(), fetchCustomerLedger(), fetchPublicBonusSettings() (+54 more)

### Community 41 - "lucide-react"
Cohesion: 0.26
Nodes (12): cellDelta(), planAllCashPrices(), stockPriceMap, useApplyPricesJobs(), useEnqueueApplyPricesJob(), useFrontpadStock(), CashPricesPanel(), flattenPlans() (+4 more)

### Community 42 - "react-dom"
Cohesion: 0.20
Nodes (15): useCoupons(), useDeleteCoupon(), invalidateProductRatings(), useAdminReviews(), useCreateReview(), useDeleteReview(), useToggleReviewPublished(), useUpdateReview() (+7 more)

### Community 43 - "AdminPage.tsx"
Cohesion: 0.12
Nodes (20): useActivityLogsPage(), useDeleteAddon(), useDeleteBanner(), useDeleteCategory(), useAdminProducts(), loadDomMax(), ProductEditorRoute(), SectionStub() (+12 more)

### Community 44 - "theme.tsx"
Cohesion: 0.14
Nodes (18): e(), e1(), e5(), e6(), eB(), eU(), n(), ns() (+10 more)

### Community 45 - "site.ts"
Cohesion: 0.16
Nodes (18): useCategories(), Category, catalogSectionId(), groupProductsByCategory(), Options, useCatalogScrollSpy(), CatalogCategorySection(), Props (+10 more)

### Community 46 - "compress-image.ts"
Cohesion: 0.07
Nodes (28): CartToggle(), formatOrderSum(), Props, SumRow(), FreshStamp(), STAMP_GLYPHS, cn(), Chip() (+20 more)

### Community 47 - "lucide-react"
Cohesion: 0.14
Nodes (13): Addon, AddonKind, addons, extras, IMG, sauces, AddonRow(), formatWeight() (+5 more)

### Community 48 - "react-easy-crop"
Cohesion: 0.29
Nodes (8): orderKeys, subscribeOrderStatus(), usePublicOrder(), Order, repeatOrderIntoCart(), useLiveOrder(), OrderTrackPage(), RepeatButton()

### Community 49 - "sonner"
Cohesion: 0.36
Nodes (6): useCreateCategory(), useUpdateCategory(), CategoryForm(), Props, CATEGORY_ICONS, CategoryIconPath

### Community 50 - "invalidateProductRatings"
Cohesion: 0.17
Nodes (12): ng(), np(), o(), o2(), o3(), og(), ol(), os() (+4 more)

### Community 51 - "pocketbase"
Cohesion: 0.06
Nodes (29): pocketbase, pocketbase, auth(), buildCompositionByVariant(), compositionBySlug, formatComposition(), nutritionBySlug, pb (+21 more)

### Community 52 - "@radix-ui/react-popover"
Cohesion: 0.27
Nodes (8): activityLogKeys, ActivityLogsPage, ActivityRecord, fetchActivityLogsPage(), mapLog(), ActivityActorType, ActivityLog, ACTOR_TYPE_LABEL

### Community 53 - "selectors.ts"
Cohesion: 0.22
Nodes (10): lenis, lenis, isProductModalOpen(), LENIS_OPTIONS, Props, ScrollOptions, VitrineScrollApi, VitrineScrollContext (+2 more)

### Community 54 - "store.ts"
Cohesion: 0.13
Nodes (25): useFrontpadStockArticles(), articleFor(), articleConflictMessage(), ArticleExclude, ArticleRef, cellLabel(), collectArticleConflicts(), isExcludedCell() (+17 more)

### Community 55 - "ProductPage.tsx"
Cohesion: 0.14
Nodes (20): fetchAddons(), calcCouponDiscount(), useFrontpadStockRealtime(), useCartTotals(), CartPanel(), MODE_OPTIONS, CheckoutDialogState, useCheckoutDialogStore (+12 more)

### Community 57 - "surface.tsx"
Cohesion: 0.24
Nodes (8): App(), AppRoutes(), ScrollToTop(), container, backgroundOf(), Glass(), GlassDefs(), GlassProps

### Community 58 - "coupon/api.ts"
Cohesion: 0.14
Nodes (18): couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail, PromoCheckOk (+10 more)

### Community 59 - "category/api.ts"
Cohesion: 0.22
Nodes (9): i(), nu(), o1(), oB(), oc(), od(), oi(), oz() (+1 more)

### Community 60 - "@radix-ui/react-slot"
Cohesion: 0.13
Nodes (20): AdminLogin(), GuardedSection(), AdminTopbar(), AdminTopbarProps, fetchNewOrdersCount(), newOrdersKey, AdminAuth, AdminAuthContext (+12 more)

### Community 61 - "crud.ts"
Cohesion: 0.09
Nodes (21): BonusEarnHint(), BonusEarnHintProps, BonusSpendBlock(), CheckoutDialogProps, PAYMENT_OPTIONS, CheckoutModeToggle(), CheckoutModeToggleProps, OPTIONS (+13 more)

### Community 62 - "FloatingActions.tsx"
Cohesion: 0.14
Nodes (18): mapRating(), PRODUCT_ASPECT_RATIO, criterionScore(), criterionStars(), MeatIcon, normalizeDistribution(), ProductNutrition, RatingCriterion (+10 more)

### Community 64 - "router.tsx"
Cohesion: 0.17
Nodes (9): AdminGate(), AdminLogin, AdminPage, AuthCallbackPage, EASE, EXIT_ABS, loadMotionFeatures(), OrderTrackPage (+1 more)

### Community 65 - "mapFrontpadSettings"
Cohesion: 0.25
Nodes (8): a(), r(), tf(), tg(), to(), tr(), tW(), tz()

### Community 66 - "files.ts"
Cohesion: 0.16
Nodes (15): BANNER_ASPECT_RATIO, canvasToBlob(), CropArea, cropImageToFile(), loadImage(), readImageSize(), ALLOWED, BannerImageField() (+7 more)

### Community 67 - "getAccount"
Cohesion: 0.33
Nodes (7): updateBody(), updateProduct(), useDeleteProduct(), useToggleProductActive(), useUpdateProduct(), applyFilteredReorder(), ProductsSection()

### Community 68 - "counts.ts"
Cohesion: 0.15
Nodes (18): bannerFormData(), bannerKeys, bannerMutations, BannerNote, BannerRecord, CreateBannerInput, fetchBannerById(), fetchBanners() (+10 more)

### Community 69 - "sonner"
Cohesion: 0.26
Nodes (10): filenamesOf(), FileRecord, imageFilenames(), imageUrl(), imageUrls(), ToFormDataOptions, canvasToBlob(), compressImage() (+2 more)

### Community 70 - "CartTotals.tsx"
Cohesion: 0.12
Nodes (21): useCreateProduct(), Props, Props, DEFAULT_NUTRITION, ProductCreateForm(), Props, PhoneOnboardingProps, CYR_MAP (+13 more)

### Community 71 - "copy-vkid-sdk.mjs"
Cohesion: 0.33
Nodes (4): dest, destDir, root, src

### Community 72 - "DisplaySettingsModal.tsx"
Cohesion: 0.21
Nodes (10): useGraphics(), readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), DisplaySettingsModal(), DisplaySettingsModalProps (+2 more)

### Community 73 - "getAccount"
Cohesion: 0.27
Nodes (12): accountCacheKey(), addAddress(), getAccount(), isAppUserRecord(), persistRecord(), removeAddress(), requireAccountId(), saveAddresses() (+4 more)

### Community 74 - "crud.ts"
Cohesion: 0.23
Nodes (9): CollectionMutationsConfig, FIELD_CODE_RU, invalidate(), listKeys(), MutationKeys, QueryKey, syncDetail(), queryClient (+1 more)

### Community 75 - "stock.ts"
Cohesion: 0.25
Nodes (10): useAddons(), useExtras(), useSauces(), compositionOf(), fetchStoppedArticles(), isSizeStopped(), isSkuStopped(), isVariantStopped() (+2 more)

### Community 77 - "AddressSection.tsx"
Cohesion: 0.27
Nodes (7): AddressSection(), AddressSectionProps, PopoverContent(), OptionData, parseOptions(), Select(), SelectProps

### Community 78 - "ThemePeekButton.tsx"
Cohesion: 0.33
Nodes (9): lerp(), markSessionPlayed(), Phase, phaseToReveal(), positionsForReveal(), revealToPhase(), sessionAlreadyPlayed(), SPRING (+1 more)

### Community 79 - "graphics.tsx"
Cohesion: 0.38
Nodes (6): applyQuality(), GraphicsContext, GraphicsContextValue, GraphicsProvider(), GraphicsQuality, readInitialQuality()

### Community 80 - "BadgeManagerDialog.tsx"
Cohesion: 0.43
Nodes (5): useCreateBadge(), useDeleteBadge(), useUpdateBadge(), BadgeManagerDialog(), Props

### Community 81 - "AdminCard.tsx"
Cohesion: 0.40
Nodes (4): AdminCard(), Props, Props, StatCard()

## Knowledge Gaps
- **390 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+385 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `compress-image.ts` to `HomePage.tsx`, `selectors.ts`, `cn`, `formatPrice`, `category/api.ts`, `AdminPage.tsx`, `crud.ts`, `coupon/api.ts`, `@tanstack/react-query`, `AdminSidebar.tsx`, `product/model.ts`, `DesktopHome.tsx`, `cn.ts`, `customer/api.ts`, `useAdminAuth`, `button.tsx`, `lucide-react`, `AdminPage.tsx`, `site.ts`, `lucide-react`, `sonner`, `store.ts`, `ProductPage.tsx`, `surface.tsx`, `crud.ts`, `FloatingActions.tsx`, `files.ts`, `CartTotals.tsx`, `stock.ts`, `AddressSection.tsx`, `ThemePeekButton.tsx`, `BadgeManagerDialog.tsx`, `AdminCard.tsx`?**
  _High betweenness centrality (0.151) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `tailwind-merge`, `lucide-react`, `pocketbase`, `@radix-ui/react-popover`, `selectors.ts`, `@radix-ui/react-tooltip`, `Sidebar.tsx`, `zustand`, `@radix-ui/react-tooltip`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Why does `VitrineScrollProvider()` connect `selectors.ts` to `ProductPage.tsx`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `ProductEditor()` (e.g. with `e()` and `n()`) actually correct?**
  _`ProductEditor()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _390 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `HomePage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12433862433862433 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._