# Graph Report - shashlik-web  (2026-09-17)

## Corpus Check
- 242 files · ~222,104 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1512 nodes · 4342 edges · 88 communities (79 shown, 9 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 134 edges (avg confidence: 0.55)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `315043b0`
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
- @radix-ui/react-popover
- tailwind-merge
- lucide-react
- App.tsx
- OrderDetails.tsx
- settings/model.ts
- image-field.tsx
- ThemePeekButton.tsx
- class-variance-authority
- @radix-ui/react-popover
- @radix-ui/react-tooltip
- react-easy-crop
- zustand

## God Nodes (most connected - your core abstractions)
1. `cn()` - 161 edges
2. `formatPrice()` - 53 edges
3. `Button()` - 48 edges
4. `ProductEditor()` - 29 edges
5. `useCartTotals()` - 26 edges
6. `Input()` - 25 edges
7. `useAccount()` - 24 edges
8. `useCategories()` - 24 edges
9. `ProductView()` - 23 edges
10. `pb` - 23 edges

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

## Communities (88 total, 9 thin omitted)

### Community 0 - "HomePage.tsx"
Cohesion: 0.17
Nodes (14): useAccount(), submitReferral(), isActiveOrderStatus(), formatAddressLine(), AddressCard(), AddressesTab(), CurrentOrderTab(), DataTab() (+6 more)

### Community 1 - "dependencies"
Cohesion: 0.11
Nodes (19): clsx, lucide-react, motion, dependencies, clsx, lucide-react, motion, @radix-ui/react-dialog (+11 more)

### Community 2 - "selectors.ts"
Cohesion: 0.11
Nodes (33): createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchAdminProducts(), fetchProductById() (+25 more)

### Community 4 - "cn"
Cohesion: 0.14
Nodes (22): applyPricesJobKeys, asNumberList(), asStatusMap(), asStringList(), fetchFrontpadSettings(), fetchFrontpadStock(), fetchStoppedStock(), FrontpadJobRecord (+14 more)

### Community 5 - "CatalogTables.tsx"
Cohesion: 0.08
Nodes (36): adminReviewKeys, buildOrdersFilter(), createOrder(), CreateOrderInput, CreateReviewInput, fetchActiveResendJobs(), fetchAdminReviews(), fetchMyOrders() (+28 more)

### Community 6 - "devDependencies"
Cohesion: 0.10
Nodes (21): devDependencies, tailwindcss, @tailwindcss/vite, tw-animate-css, @types/node, @types/react, @types/react-dom, typescript (+13 more)

### Community 7 - "compilerOptions"
Cohesion: 0.07
Nodes (26): DOM, DOM.Iterable, ES2023, node, src, vite/client, vite.config.ts, compilerOptions (+18 more)

### Community 8 - "CustomerDrawer.tsx"
Cohesion: 0.06
Nodes (73): AccountAuth, AccountContext, AccountProvider(), isAbortError(), refreshAuth(), acceptAuthToken(), accountCacheKey(), accountKeys (+65 more)

### Community 9 - "formatPrice"
Cohesion: 0.07
Nodes (57): useExtras(), useSauces(), BadgeInput, badgeKeys, badgeMutations, BadgeRecord, fetchBadges(), mapBadge() (+49 more)

### Community 10 - "category/api.ts"
Cohesion: 0.15
Nodes (12): FrontpadJob, FrontpadJobKind, FrontpadJobStatus, ORDER_STATUS_FLOW, ORDER_STATUS_SOURCE_LABEL, ORDER_STATUSES, OrderLineAddon, OrderStatusSource (+4 more)

### Community 13 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 14 - "banner/api.ts"
Cohesion: 0.28
Nodes (8): collectionMutations(), CollectionMutationsConfig, FIELD_CODE_RU, invalidate(), listKeys(), MutationKeys, QueryKey, syncDetail()

### Community 15 - "product/model.ts"
Cohesion: 0.16
Nodes (17): fetchActiveSyncJobs(), stoppedStockKeys, syncJobKeys, useActiveSyncJobs(), formatRemaining(), FRONTPAD_STATUS_CODES, FRONTPAD_STATUS_LABEL, frontpadCodeLabel() (+9 more)

### Community 16 - "AdminPage.tsx"
Cohesion: 0.35
Nodes (7): useAccount(), useMyOrders(), getLocalOrderCount(), subscribeLocalOrders(), useHasPlacedOrder(), Sidebar(), SidebarProps

### Community 17 - "products.ts"
Cohesion: 0.12
Nodes (14): ALL_CATEGORY, CategoryId, KNOWN_CATEGORY_IDS, KnownCategoryId, useDuplicateProduct(), ProductBadge, MEAT_VARIANTS, NUTRITION_BY_CATEGORY (+6 more)

### Community 18 - "crud.ts"
Cohesion: 0.23
Nodes (14): readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), useTheme(), oppositeThemeSrc(), resolveThemeSrc() (+6 more)

### Community 19 - "ProductEditor.tsx"
Cohesion: 0.17
Nodes (15): buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams, CustomersPageResult, fetchCustomerById() (+7 more)

### Community 20 - "package.json"
Cohesion: 0.18
Nodes (10): name, private, scripts, build, copy:vk-sdk, dev, preview, typecheck (+2 more)

### Community 21 - "coupon/api.ts"
Cohesion: 0.15
Nodes (19): useCreateStaff(), useDeleteStaff(), useRequestStaffPasswordReset(), useStaff(), useUpdateStaff(), OrderHistoryRow(), CustomersSection(), ROLE_FILTERS (+11 more)

### Community 22 - "lucide-react"
Cohesion: 0.11
Nodes (24): addonKeys, addonMutations, AddonRecord, CreateAddonInput, createBody(), fetchAddonById(), fetchAddons(), fetchAddonsByKind() (+16 more)

### Community 23 - "@radix-ui/react-dialog"
Cohesion: 0.13
Nodes (22): buildSeries(), buildTopProducts(), countByFilter(), DashboardData, dashboardKeys, DashboardSection(), dayKey(), fetchDashboard() (+14 more)

### Community 24 - "cn"
Cohesion: 0.22
Nodes (14): useFrontpadStockArticles(), articleConflictMessage(), ArticleExclude, ArticleRef, cellLabel(), collectArticleConflicts(), isExcludedCell(), priceOf() (+6 more)

### Community 25 - "banner/api.ts"
Cohesion: 0.20
Nodes (11): mapRating(), criterionScore(), criterionStars(), MeatIcon, normalizeDistribution(), ProductRating, RatingCriterion, CriterionHint() (+3 more)

### Community 26 - "tailwind-merge"
Cohesion: 0.12
Nodes (28): fetchBonus(), useProfileBonus(), fetchPublicBonusSettings(), usePublicBonusSettings(), calcBonusSpendCap(), calcCartEarn(), calcLineEarn(), clampPercent() (+20 more)

### Community 27 - "@tanstack/react-query"
Cohesion: 0.39
Nodes (5): AdminLogin(), PhoneOnboarding(), PhoneOnboardingProps, Field(), Input()

### Community 28 - "zustand"
Cohesion: 0.18
Nodes (14): GuardedSection(), AdminAuth, AdminAuthContext, AdminAuthProvider(), authErrorMessage(), can(), isAbortError(), isStaffRecord() (+6 more)

### Community 29 - "AdminSidebar.tsx"
Cohesion: 0.24
Nodes (13): fetchSettings(), frontpadSettingsKeys, mapSettings(), settingsKeys, useSettings(), useUpdateSettings(), settingsFallback(), CheckoutDialog() (+5 more)

### Community 30 - "staff/api.ts"
Cohesion: 0.22
Nodes (10): CreateStaffInput, fetchStaff(), mapStaff(), mapStaffRequired(), staffKeys, StaffMember, staffMutations, StaffRecord (+2 more)

### Community 31 - "product/model.ts"
Cohesion: 0.15
Nodes (15): CategoryIcon(), Props, clampScroll(), Edges, EdgeSide, prefersReducedMotion(), readEdges(), stepScrollLeft() (+7 more)

### Community 32 - "StickyBar.tsx"
Cohesion: 0.14
Nodes (27): useDeleteAddon(), useDeleteBanner(), hasMissingArticle(), AddonForm(), AddonsSection(), KIND_FILTERS, BannersSection(), applyFilteredReorder() (+19 more)

### Community 33 - "DesktopHome.tsx"
Cohesion: 0.10
Nodes (28): checkPromo(), formatCouponValue(), cartLineTitle(), findSize(), findVariant(), addonFromCache(), CartTotals, productFromCache() (+20 more)

### Community 34 - "AddonForm.tsx"
Cohesion: 0.18
Nodes (18): Order, productKeys, DEFAULT_CRITERIA, CriteriaScores, fetchRatedProductIds(), ratingKeys, ratingSubmitError(), submitProductRating() (+10 more)

### Community 35 - "cn.ts"
Cohesion: 0.19
Nodes (16): fetchSizeTemplates(), mapSizeTemplate(), seedFallback(), SizeTemplateInput, sizeTemplateKeys, sizeTemplateMutations, SizeTemplateRecord, useCreateSizeTemplate() (+8 more)

### Community 36 - "customer/api.ts"
Cohesion: 0.19
Nodes (9): CartToggle(), formatOrderSum(), Props, ThemeToggle(), FloatingActions(), Props, TONE, MobileHeader() (+1 more)

### Community 37 - "OrdersSection.tsx"
Cohesion: 0.17
Nodes (9): AdminGate(), AdminLogin, AdminPage, AuthCallbackPage, EASE, EXIT_ABS, loadMotionFeatures(), OrderTrackPage (+1 more)

### Community 38 - "useAdminAuth"
Cohesion: 0.14
Nodes (19): useDeleteProduct(), cellNutrition(), defaultNutritionFromSizes(), setCellNutrition(), ProductSize, ProductVariant, imagesDarkFromProduct(), imagesFromProduct() (+11 more)

### Community 39 - "NutritionHint.tsx"
Cohesion: 0.19
Nodes (9): CartPanelState, useCartPanelStore, CartDock(), CatalogSection, DesktopHome(), Props, Options, useInView() (+1 more)

### Community 40 - "button.tsx"
Cohesion: 0.19
Nodes (16): adjustBonus(), bonusKeys, BonusSettingsRecord, bulkSetBonusPercent(), fetchBonusSettings(), fetchCustomerLedger(), LedgerRecord, mapLedger() (+8 more)

### Community 41 - "lucide-react"
Cohesion: 0.23
Nodes (16): claimPwaInstallBonus(), detectInstallPlatform(), dismissPwaForever(), isPwaDismissedForever(), isPwaSoftCooldownActive(), isStandaloneDisplay(), markPwaInstalledOnDevice(), markPwaSoftDismissed() (+8 more)

### Community 42 - "react-dom"
Cohesion: 0.21
Nodes (12): useDeleteCategory(), useAdminReviews(), useDeleteReview(), useToggleReviewPublished(), useAdminProducts(), loadDomMax(), ProductEditorRoute(), CategoriesSection() (+4 more)

### Community 43 - "AdminPage.tsx"
Cohesion: 0.17
Nodes (12): SectionStub(), ADMIN_NAV, AdminNavItem, AdminRole, AdminSectionId, AdminSidebar(), PILL, Props (+4 more)

### Community 44 - "theme.tsx"
Cohesion: 0.14
Nodes (18): e(), e1(), e5(), e6(), eB(), eU(), n(), ns() (+10 more)

### Community 45 - "site.ts"
Cohesion: 0.19
Nodes (11): Category, categories, groupProductsByCategory(), FavoritesCategoryChips(), Props, ScrollSection(), useAxisLockedHorizontalScroll(), CategoryTiles() (+3 more)

### Community 46 - "compress-image.ts"
Cohesion: 0.07
Nodes (29): OrderAddressParts, AddressSection(), AddressSectionProps, FreshStamp(), STAMP_GLYPHS, cn(), ChipProps, OptionCard() (+21 more)

### Community 47 - "lucide-react"
Cohesion: 0.39
Nodes (5): catalogSectionId(), Options, useCatalogScrollSpy(), CatalogCategorySection(), Props

### Community 48 - "react-easy-crop"
Cohesion: 0.33
Nodes (7): orderKeys, subscribeOrderStatus(), usePublicOrder(), repeatOrderIntoCart(), useLiveOrder(), OrderTrackPage(), RepeatButton()

### Community 49 - "sonner"
Cohesion: 0.13
Nodes (19): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+11 more)

### Community 50 - "invalidateProductRatings"
Cohesion: 0.17
Nodes (12): ng(), np(), o(), o2(), o3(), og(), ol(), os() (+4 more)

### Community 51 - "pocketbase"
Cohesion: 0.06
Nodes (29): pocketbase, pocketbase, auth(), buildCompositionByVariant(), compositionBySlug, formatComposition(), nutritionBySlug, pb (+21 more)

### Community 52 - "@radix-ui/react-popover"
Cohesion: 0.19
Nodes (13): activityLogKeys, ActivityLogsPage, ActivityRecord, fetchActivityLogsPage(), mapLog(), useActivityLogsPage(), ActivityActorType, ActivityLog (+5 more)

### Community 53 - "selectors.ts"
Cohesion: 0.22
Nodes (10): lenis, lenis, isProductModalOpen(), LENIS_OPTIONS, Props, ScrollOptions, VitrineScrollApi, VitrineScrollContext (+2 more)

### Community 54 - "store.ts"
Cohesion: 0.23
Nodes (13): articleFor(), ApplyPricesJobResult, asRowList(), buildCells(), CashPriceCell, CashPricePlan, CashPriceStatus, parseApplyPricesResult() (+5 more)

### Community 55 - "ProductPage.tsx"
Cohesion: 0.27
Nodes (11): useCategories(), useProducts(), CheckoutDialogState, useCheckoutDialogStore, SearchDialog(), SearchDialogProps, HomeMobileTabBar(), HomePage() (+3 more)

### Community 56 - "Sidebar.tsx"
Cohesion: 0.27
Nodes (5): VkOneTap(), VkOneTapProps, AuthButtons(), AuthButtonsProps, LoginPanel()

### Community 57 - "surface.tsx"
Cohesion: 0.11
Nodes (15): DeliveryMode, BonusSpendBlock(), CheckoutDialogProps, PAYMENT_OPTIONS, CheckoutModeToggle(), CheckoutModeToggleProps, OPTIONS, BADGES (+7 more)

### Community 58 - "coupon/api.ts"
Cohesion: 0.10
Nodes (28): couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail, PromoCheckOk (+20 more)

### Community 59 - "category/api.ts"
Cohesion: 0.22
Nodes (9): i(), nu(), o1(), oB(), oc(), od(), oi(), oz() (+1 more)

### Community 60 - "@radix-ui/react-slot"
Cohesion: 0.29
Nodes (7): AdminTopbar(), AdminTopbarProps, fetchNewOrdersCount(), newOrdersKey, pb, queryClient, QueryKey

### Community 61 - "crud.ts"
Cohesion: 0.24
Nodes (7): BonusEarnHintProps, CartTotalsProps, SumRow(), RegistrationBonusModalProps, CoinIcon(), Modal(), ModalProps

### Community 62 - "FloatingActions.tsx"
Cohesion: 0.29
Nodes (9): needsChooser(), nutritionForPortion(), nutritionOf(), parseWeightGrams(), scaleNutrition(), SkuCell, Product, ProductNutrition (+1 more)

### Community 63 - "@radix-ui/react-tooltip"
Cohesion: 0.29
Nodes (8): enqueueApplyPricesJob(), enqueueSyncJob(), fetchApplyPricesJobs(), mapJob(), updateSettings(), useEnqueueSyncJob(), pbErrorMessage(), wrapError()

### Community 64 - "OrderDetails.tsx"
Cohesion: 0.19
Nodes (21): useOrder(), useOrderJobs(), useResendOrder(), useUpdateOrderStatus(), isFrontpadWarning(), AdminPage(), formatAddress(), moneyRow() (+13 more)

### Community 65 - "mapFrontpadSettings"
Cohesion: 0.25
Nodes (8): a(), r(), tf(), tg(), to(), tr(), tW(), tz()

### Community 66 - "files.ts"
Cohesion: 0.23
Nodes (10): BANNER_ASPECT_RATIO, canvasToBlob(), CropArea, cropImageToFile(), loadImage(), readImageSize(), ALLOWED, BannerImageField() (+2 more)

### Community 67 - "getAccount"
Cohesion: 0.43
Nodes (5): formatGrams(), NutritionHint(), useIsDesktop(), useIsWide(), useMediaQuery()

### Community 68 - "counts.ts"
Cohesion: 0.15
Nodes (18): bannerFormData(), bannerKeys, bannerMutations, BannerNote, BannerRecord, CreateBannerInput, fetchBannerById(), fetchBanners() (+10 more)

### Community 69 - "sonner"
Cohesion: 0.29
Nodes (11): useAdjustBonus(), useCustomerLedger(), useCustomer(), useUpdateCustomer(), useOrdersPage(), CustomerDrawer(), digitsOnly(), FormState (+3 more)

### Community 70 - "CartTotals.tsx"
Cohesion: 0.24
Nodes (8): useCreateProduct(), DEFAULT_NUTRITION, ProductCreateForm(), Props, Textarea(), PhotoTheme, PhotoThemeToggle(), Props

### Community 71 - "copy-vkid-sdk.mjs"
Cohesion: 0.33
Nodes (4): dest, destDir, root, src

### Community 72 - "addons.ts"
Cohesion: 0.29
Nodes (10): cellDelta(), useApplyPricesJobs(), useEnqueueApplyPricesJob(), useFrontpadStock(), CashPricesPanel(), flattenPlans(), formatSigned(), PriceRow (+2 more)

### Community 73 - "invalidateProductRatings"
Cohesion: 0.38
Nodes (10): canUseStorage(), getLatestLocalOrderId(), isStoredOrder(), listLocalOrderIds(), load(), prune(), rememberLocalOrder(), save() (+2 more)

### Community 74 - "class-variance-authority"
Cohesion: 0.25
Nodes (9): canvasToBlob(), compressImage(), CompressOptions, loadImage(), ALLOWED, formatMb(), MultiImageField(), MultiImageItem (+1 more)

### Community 75 - "@radix-ui/react-popover"
Cohesion: 0.22
Nodes (7): BonusHistoryReason(), BonusHistoryRow, BONUS_REASON_LABEL, BonusLedgerEntry, BonusLedgerReason, BonusSettings, PublicBonusSettings

### Community 78 - "App.tsx"
Cohesion: 0.39
Nodes (5): App(), AppRoutes(), ScrollToTop(), container, backgroundOf()

### Community 79 - "OrderDetails.tsx"
Cohesion: 0.33
Nodes (6): ORDER_STATUS_LABEL, OrderLineSnapshot, formatAddress(), LineRow(), OrderDetails(), Props

### Community 80 - "settings/model.ts"
Cohesion: 0.29
Nodes (6): OrderStatus, DEFAULT_STATUS_MAP, FrontpadSettings, FrontpadStockItem, PriceSource, Settings

### Community 81 - "image-field.tsx"
Cohesion: 0.40
Nodes (5): ALLOWED, formatMb(), IMAGE_MAX_BYTES, ImageField(), ImageFieldProps

### Community 82 - "ThemePeekButton.tsx"
Cohesion: 0.60
Nodes (4): markSessionPlayed(), Phase, sessionAlreadyPlayed(), ThemePeekButton()

## Knowledge Gaps
- **376 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+371 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `compress-image.ts` to `HomePage.tsx`, `formatPrice`, `AdminPage.tsx`, `crud.ts`, `coupon/api.ts`, `@radix-ui/react-dialog`, `cn`, `banner/api.ts`, `tailwind-merge`, `@tanstack/react-query`, `AdminSidebar.tsx`, `product/model.ts`, `StickyBar.tsx`, `DesktopHome.tsx`, `AddonForm.tsx`, `cn.ts`, `customer/api.ts`, `useAdminAuth`, `AdminPage.tsx`, `site.ts`, `sonner`, `@radix-ui/react-popover`, `surface.tsx`, `coupon/api.ts`, `crud.ts`, `files.ts`, `CartTotals.tsx`, `addons.ts`, `class-variance-authority`, `OrderDetails.tsx`, `image-field.tsx`, `ThemePeekButton.tsx`?**
  _High betweenness centrality (0.134) - this node is a cross-community bridge._
- **Why does `VitrineScrollProvider()` connect `selectors.ts` to `ProductPage.tsx`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `tailwind-merge`, `lucide-react`, `pocketbase`, `class-variance-authority`, `package.json`, `selectors.ts`, `@radix-ui/react-popover`, `@radix-ui/react-tooltip`, `react-easy-crop`, `zustand`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `ProductEditor()` (e.g. with `e()` and `n()`) actually correct?**
  _`ProductEditor()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _376 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `selectors.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10634920634920635 - nodes in this community are weakly interconnected._