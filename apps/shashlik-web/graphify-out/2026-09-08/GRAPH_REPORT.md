# Graph Report - shashlik-web  (2026-09-08)

## Corpus Check
- 216 files · ~211,181 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1449 nodes · 4102 edges · 74 communities (67 shown, 7 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 131 edges (avg confidence: 0.55)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f028fd8b`
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
- copy-vkid-sdk.mjs
- addons.ts
- lucide-react
- @radix-ui/react-dialog

## God Nodes (most connected - your core abstractions)
1. `cn()` - 146 edges
2. `formatPrice()` - 53 edges
3. `Button()` - 47 edges
4. `ProductEditor()` - 29 edges
5. `useCartTotals()` - 26 edges
6. `Input()` - 26 edges
7. `pb` - 24 edges
8. `useCategories()` - 22 edges
9. `useCartStore` - 22 edges
10. `ProductView()` - 22 edges

## Surprising Connections (you probably didn't know these)
- `buildSizes()` --indirect_call--> `minPrice()`  [INFERRED]
  scripts/sync-products-from-cash.mjs → src/entities/product/lib.ts
- `ProductEditor()` --indirect_call--> `n()`  [INFERRED]
  src/pages/admin/sections/ProductEditor.tsx → public/vk/vkid-sdk.js
- `FrontpadPanel()` --indirect_call--> `n()`  [INFERRED]
  src/pages/admin/sections/settings/FrontpadPanel.tsx → public/vk/vkid-sdk.js
- `FrontpadPanel()` --indirect_call--> `t()`  [INFERRED]
  src/pages/admin/sections/settings/FrontpadPanel.tsx → public/vk/vkid-sdk.js
- `ProductEditor()` --indirect_call--> `e()`  [INFERRED]
  src/pages/admin/sections/ProductEditor.tsx → public/vk/vkid-sdk.js

## Import Cycles
- None detected.

## Communities (74 total, 7 thin omitted)

### Community 0 - "HomePage.tsx"
Cohesion: 0.13
Nodes (24): submitReferral(), isActiveOrderStatus(), formatAddressLine(), canUseStorage(), getLatestLocalOrderId(), isStoredOrder(), listLocalOrderIds(), load() (+16 more)

### Community 1 - "dependencies"
Cohesion: 0.09
Nodes (23): class-variance-authority, clsx, motion, dependencies, class-variance-authority, clsx, motion, @radix-ui/react-popover (+15 more)

### Community 2 - "selectors.ts"
Cohesion: 0.11
Nodes (29): adminProductKeys, createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchAdminProducts() (+21 more)

### Community 4 - "cn"
Cohesion: 0.14
Nodes (23): applyPricesJobKeys, asNumberList(), asStatusMap(), asStringList(), fetchFrontpadSettings(), fetchFrontpadStock(), fetchStoppedStock(), FrontpadJobRecord (+15 more)

### Community 5 - "CatalogTables.tsx"
Cohesion: 0.09
Nodes (34): adminReviewKeys, buildOrdersFilter(), createOrder(), CreateReviewInput, fetchAdminReviews(), fetchMyOrders(), fetchOrderById(), fetchOrders() (+26 more)

### Community 6 - "devDependencies"
Cohesion: 0.10
Nodes (21): devDependencies, tailwindcss, @tailwindcss/vite, tw-animate-css, @types/node, @types/react, @types/react-dom, typescript (+13 more)

### Community 7 - "compilerOptions"
Cohesion: 0.07
Nodes (26): DOM, DOM.Iterable, ES2023, node, src, vite/client, vite.config.ts, compilerOptions (+18 more)

### Community 8 - "CustomerDrawer.tsx"
Cohesion: 0.13
Nodes (27): accountCacheKey(), accountKeys, addAddress(), BonusResponse, getAccount(), loginWithVkId(), normalizeClientPhone(), openYandexOAuthPopup() (+19 more)

### Community 9 - "formatPrice"
Cohesion: 0.17
Nodes (15): BadgeInput, badgeKeys, badgeMutations, BadgeRecord, fetchBadges(), mapBadge(), seedFallback(), useCreateBadge() (+7 more)

### Community 10 - "category/api.ts"
Cohesion: 0.10
Nodes (22): DeliveryMode, FrontpadJob, FrontpadJobKind, FrontpadJobStatus, Order, ORDER_STATUS_FLOW, ORDER_STATUS_LABEL, ORDER_STATUS_SOURCE_LABEL (+14 more)

### Community 13 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 14 - "banner/api.ts"
Cohesion: 0.13
Nodes (17): orderKeys, AdminTopbar(), AdminTopbarProps, fetchNewOrdersCount(), newOrdersKey, collectionMutations(), CollectionMutationsConfig, FIELD_CODE_RU (+9 more)

### Community 15 - "product/model.ts"
Cohesion: 0.06
Nodes (68): fetchBonus(), useAccount(), useProfileBonus(), fetchPublicBonusSettings(), usePublicBonusSettings(), calcBonusSpendCap(), calcCartEarn(), calcLineEarn() (+60 more)

### Community 16 - "AdminPage.tsx"
Cohesion: 0.23
Nodes (12): AccountAuth, AccountContext, AccountProvider(), isAbortError(), refreshAuth(), useAccount(), acceptAuthToken(), getClientAuthEpoch() (+4 more)

### Community 17 - "products.ts"
Cohesion: 0.11
Nodes (19): CategoryId, KnownCategoryId, needsChooser(), MeatIcon, Product, ProductBadge, ProductNutrition, ProductRating (+11 more)

### Community 18 - "crud.ts"
Cohesion: 0.07
Nodes (32): VkOneTap(), VkOneTapProps, claimPwaInstallBonus(), detectInstallPlatform(), dismissPwaForever(), isPwaDismissedForever(), isStandaloneDisplay(), markSessionShown() (+24 more)

### Community 19 - "ProductEditor.tsx"
Cohesion: 0.06
Nodes (48): adjustBonus(), bonusKeys, BonusSettingsRecord, bulkSetBonusPercent(), fetchBonusSettings(), fetchCustomerLedger(), LedgerRecord, mapLedger() (+40 more)

### Community 20 - "package.json"
Cohesion: 0.18
Nodes (10): name, private, scripts, build, copy:vk-sdk, dev, preview, typecheck (+2 more)

### Community 21 - "coupon/api.ts"
Cohesion: 0.15
Nodes (21): completeVkOneTap(), createVkOneTapSession(), resolveVkAppId(), attachVkOneTap(), detachVkOneTap(), isBenignVkError(), mountWidget(), remountWidget() (+13 more)

### Community 22 - "lucide-react"
Cohesion: 0.15
Nodes (22): addonKeys, addonMutations, AddonRecord, CreateAddonInput, createBody(), fetchAddonById(), fetchAddons(), fetchAddonsByKind() (+14 more)

### Community 23 - "@radix-ui/react-dialog"
Cohesion: 0.13
Nodes (21): buildSeries(), buildTopProducts(), countByFilter(), DashboardData, dashboardKeys, DashboardSection(), dayKey(), fetchDashboard() (+13 more)

### Community 24 - "cn"
Cohesion: 0.22
Nodes (14): useFrontpadStockArticles(), articleConflictMessage(), ArticleExclude, ArticleRef, cellLabel(), collectArticleConflicts(), isExcludedCell(), priceOf() (+6 more)

### Community 25 - "banner/api.ts"
Cohesion: 0.33
Nodes (12): useBadges(), badgeLabel(), PRODUCT_ASPECT_RATIO, minPrice(), isProductStopped(), useStoppedArticles(), ProductCard(), ProductCardProps (+4 more)

### Community 26 - "tailwind-merge"
Cohesion: 0.24
Nodes (12): ApplyPricesJobResult, asRowList(), buildCells(), CashPriceCell, CashPricePlan, CashPriceStatus, parseApplyPricesResult(), planAllCashPrices() (+4 more)

### Community 27 - "@tanstack/react-query"
Cohesion: 0.13
Nodes (20): useCreateBanner(), useDeleteBanner(), useUpdateBanner(), Banner, banners, AdminLogin(), BannerForm(), Props (+12 more)

### Community 28 - "zustand"
Cohesion: 0.10
Nodes (25): BANNER_ASPECT_RATIO, canvasToBlob(), compressImage(), CompressOptions, loadImage(), canvasToBlob(), CropArea, cropImageToFile() (+17 more)

### Community 29 - "AdminSidebar.tsx"
Cohesion: 0.11
Nodes (20): BonusEarnHintProps, SumRow(), BADGES, CheckoutTrustBadges(), SafePaymentBanner(), SafePaymentBannerProps, cn(), CoinIcon() (+12 more)

### Community 30 - "staff/api.ts"
Cohesion: 0.21
Nodes (11): CreateStaffInput, fetchStaff(), mapStaff(), mapStaffRequired(), staffKeys, StaffMember, staffMutations, StaffRecord (+3 more)

### Community 31 - "product/model.ts"
Cohesion: 0.16
Nodes (15): ALL_TAG, TagFilterId, AxisLock, useAxisLockedHorizontalScroll(), Chip(), ChipProps, OptionCardProps, Glass() (+7 more)

### Community 32 - "StickyBar.tsx"
Cohesion: 0.13
Nodes (28): useActivityLogsPage(), useCustomersPage(), cellDelta(), COLUMNS, LogsSection(), KIND_FILTERS, CustomersSection(), STATUS_FILTERS (+20 more)

### Community 33 - "DesktopHome.tsx"
Cohesion: 0.15
Nodes (18): OrderStatus, fetchActiveSyncJobs(), stoppedStockKeys, syncJobKeys, useActiveSyncJobs(), DEFAULT_STATUS_MAP, FrontpadSettings, FrontpadStockItem (+10 more)

### Community 34 - "AddonForm.tsx"
Cohesion: 0.15
Nodes (21): mapRating(), articleFor(), cartLineTitle(), compositionOf(), findSize(), findVariant(), hasMissingArticle(), nutritionForPortion() (+13 more)

### Community 35 - "cn.ts"
Cohesion: 0.19
Nodes (16): fetchSizeTemplates(), mapSizeTemplate(), seedFallback(), SizeTemplateInput, sizeTemplateKeys, sizeTemplateMutations, SizeTemplateRecord, useCreateSizeTemplate() (+8 more)

### Community 36 - "customer/api.ts"
Cohesion: 0.16
Nodes (13): readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), useTheme(), CartToggle(), formatOrderSum() (+5 more)

### Community 37 - "OrdersSection.tsx"
Cohesion: 0.07
Nodes (30): App(), AdminGate(), AdminLogin, AdminPage, AppRoutes(), AuthCallbackPage, EASE, EXIT_ABS (+22 more)

### Community 38 - "useAdminAuth"
Cohesion: 0.18
Nodes (15): useDeleteProduct(), cellNutrition(), defaultNutritionFromSizes(), setCellNutrition(), ProductSize, ProductVariant, imagesFromProduct(), matchedTemplateId() (+7 more)

### Community 39 - "NutritionHint.tsx"
Cohesion: 0.14
Nodes (13): useBanners(), CartPanelState, useCartPanelStore, CartDock(), CatalogSection, DesktopHome(), Props, Options (+5 more)

### Community 40 - "button.tsx"
Cohesion: 0.19
Nodes (12): frontpadSettingsKeys, settingsKeys, updateSettings(), useUpdateSettings(), Settings, parseNonNeg(), SettingsSection(), TabId (+4 more)

### Community 41 - "lucide-react"
Cohesion: 0.27
Nodes (14): asId(), asString(), isAppUserRecord(), linkPhone(), loginWithOAuth(), mapAddress(), mapAddresses(), mapAppUser() (+6 more)

### Community 42 - "react-dom"
Cohesion: 0.16
Nodes (17): fetchTags(), mapTag(), TagInput, tagKeys, tagMutations, TagRecord, tagsForCategory(), useCategoryTags() (+9 more)

### Community 43 - "AdminPage.tsx"
Cohesion: 0.18
Nodes (15): useCategories(), useAdminProducts(), useCreateProduct(), loadDomMax(), ProductEditorRoute(), DEFAULT_NUTRITION, ProductCreateForm(), Props (+7 more)

### Community 44 - "theme.tsx"
Cohesion: 0.14
Nodes (18): e(), e1(), e5(), e6(), eB(), eU(), n(), ns() (+10 more)

### Community 45 - "site.ts"
Cohesion: 0.35
Nodes (8): fetchSettings(), mapSettings(), useSettings(), settingsFallback(), groupProductsByCategory(), MobileHome(), Props, AddressBar()

### Community 46 - "compress-image.ts"
Cohesion: 0.21
Nodes (9): AddressSection(), AddressSectionProps, FloatingField(), FloatingFieldProps, PopoverContent(), OptionData, parseOptions(), Select() (+1 more)

### Community 47 - "lucide-react"
Cohesion: 0.22
Nodes (9): lenis, lenis, LENIS_OPTIONS, Props, ScrollOptions, VitrineScrollApi, VitrineScrollContext, VitrineScrollProvider() (+1 more)

### Community 48 - "react-easy-crop"
Cohesion: 0.53
Nodes (4): repeatOrderIntoCart(), useLiveOrder(), OrderTrackPage(), RepeatButton()

### Community 49 - "sonner"
Cohesion: 0.12
Nodes (21): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+13 more)

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
Cohesion: 0.31
Nodes (7): HomeMobileTabBar(), catalogSectionId(), Options, useCatalogScrollSpy(), useVitrineScroll(), CatalogCategorySection(), Props

### Community 54 - "store.ts"
Cohesion: 0.24
Nodes (11): useDeleteAddon(), useCreateStaff(), useDeleteStaff(), useRequestStaffPasswordReset(), useUpdateStaff(), AddonsSection(), ROLE_FILTERS, ROLE_LABEL (+3 more)

### Community 55 - "ProductPage.tsx"
Cohesion: 0.24
Nodes (10): enqueueApplyPricesJob(), enqueueSyncJob(), fetchApplyPricesJobs(), mapJob(), useApplyPricesJobs(), useEnqueueApplyPricesJob(), useEnqueueSyncJob(), CashPricesPanel() (+2 more)

### Community 56 - "Sidebar.tsx"
Cohesion: 0.29
Nodes (4): CategoryIcon(), Props, Sidebar(), SidebarProps

### Community 57 - "surface.tsx"
Cohesion: 0.40
Nodes (5): GroupLabel(), Panel(), PanelProps, SectionTitle(), surfaceVariants

### Community 58 - "coupon/api.ts"
Cohesion: 0.12
Nodes (25): couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail, PromoCheckOk (+17 more)

### Community 59 - "category/api.ts"
Cohesion: 0.22
Nodes (9): i(), nu(), o1(), oB(), oc(), od(), oi(), oz() (+1 more)

### Community 61 - "crud.ts"
Cohesion: 0.24
Nodes (10): useAdminReviews(), useDeleteReview(), useToggleReviewPublished(), ProductOption, ReviewFormProps, ReviewsSection(), STATUS_FILTERS, formatScore10() (+2 more)

### Community 62 - "FloatingActions.tsx"
Cohesion: 0.14
Nodes (13): useProductBySlug(), ProductModal(), ProductPage(), ProductViewProps, FreshStamp(), STAMP_GLYPHS, OptionCard(), SIZES (+5 more)

### Community 64 - "OrderDetails.tsx"
Cohesion: 0.21
Nodes (16): fetchActiveResendJobs(), mapJob(), resendOrder(), useOrder(), useOrderJobs(), useResendOrder(), useUpdateOrderStatus(), isFrontpadWarning() (+8 more)

### Community 65 - "mapFrontpadSettings"
Cohesion: 0.25
Nodes (8): a(), r(), tf(), tg(), to(), tr(), tW(), tz()

### Community 66 - "files.ts"
Cohesion: 0.31
Nodes (9): bannerFormData(), filenamesOf(), FileRecord, imageFilenames(), imageUrl(), imageUrls(), toFormData(), ToFormDataOptions (+1 more)

### Community 67 - "getAccount"
Cohesion: 0.36
Nodes (6): AdminPage(), formatGrams(), NutritionHint(), useIsDesktop(), useIsWide(), useMediaQuery()

### Community 68 - "counts.ts"
Cohesion: 0.17
Nodes (14): bannerKeys, bannerMutations, BannerNote, BannerRecord, CreateBannerInput, fetchBannerById(), fetchBanners(), mapBanner() (+6 more)

### Community 71 - "copy-vkid-sdk.mjs"
Cohesion: 0.33
Nodes (4): dest, destDir, root, src

### Community 72 - "addons.ts"
Cohesion: 0.22
Nodes (7): Addon, addons, extras, IMG, sauces, AddonRow(), Props

## Knowledge Gaps
- **371 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+366 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `AdminSidebar.tsx` to `HomePage.tsx`, `formatPrice`, `category/api.ts`, `product/model.ts`, `crud.ts`, `ProductEditor.tsx`, `@radix-ui/react-dialog`, `cn`, `banner/api.ts`, `@tanstack/react-query`, `zustand`, `product/model.ts`, `StickyBar.tsx`, `AddonForm.tsx`, `cn.ts`, `customer/api.ts`, `useAdminAuth`, `NutritionHint.tsx`, `button.tsx`, `AdminPage.tsx`, `site.ts`, `compress-image.ts`, `sonner`, `ProductPage.tsx`, `Sidebar.tsx`, `surface.tsx`, `coupon/api.ts`, `FloatingActions.tsx`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **Why does `VitrineScrollProvider()` connect `lucide-react` to `product/model.ts`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `sonner`, `lucide-react`, `@radix-ui/react-dialog`, `lucide-react`, `pocketbase`, `package.json`, `@radix-ui/react-slot`, `@radix-ui/react-tooltip`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `ProductEditor()` (e.g. with `e()` and `n()`) actually correct?**
  _`ProductEditor()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _371 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `HomePage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1282051282051282 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._