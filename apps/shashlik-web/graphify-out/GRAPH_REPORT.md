# Graph Report - shashlik-web  (2026-09-08)

## Corpus Check
- 218 files · ~216,990 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1460 nodes · 4122 edges · 79 communities (70 shown, 9 thin omitted)
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
- CartTotals.tsx
- copy-vkid-sdk.mjs
- addons.ts
- invalidateProductRatings
- class-variance-authority
- @radix-ui/react-popover
- tailwind-merge
- lucide-react
- zustand

## God Nodes (most connected - your core abstractions)
1. `cn()` - 148 edges
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

## Communities (79 total, 9 thin omitted)

### Community 0 - "HomePage.tsx"
Cohesion: 0.13
Nodes (24): fetchBonus(), submitReferral(), useProfileBonus(), isActiveOrderStatus(), canUseStorage(), getLatestLocalOrderId(), isStoredOrder(), listLocalOrderIds() (+16 more)

### Community 1 - "dependencies"
Cohesion: 0.11
Nodes (19): clsx, lucide-react, motion, dependencies, clsx, lucide-react, motion, @radix-ui/react-dialog (+11 more)

### Community 2 - "selectors.ts"
Cohesion: 0.10
Nodes (31): createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchAdminProducts(), fetchProductById() (+23 more)

### Community 4 - "cn"
Cohesion: 0.06
Nodes (57): OrderStatus, applyPricesJobKeys, asNumberList(), asStatusMap(), asStringList(), enqueueApplyPricesJob(), enqueueSyncJob(), fetchActiveSyncJobs() (+49 more)

### Community 5 - "CatalogTables.tsx"
Cohesion: 0.09
Nodes (35): adminReviewKeys, buildOrdersFilter(), createOrder(), CreateReviewInput, fetchActiveResendJobs(), fetchAdminReviews(), fetchMyOrders(), fetchOrderById() (+27 more)

### Community 6 - "devDependencies"
Cohesion: 0.10
Nodes (21): devDependencies, tailwindcss, @tailwindcss/vite, tw-animate-css, @types/node, @types/react, @types/react-dom, typescript (+13 more)

### Community 7 - "compilerOptions"
Cohesion: 0.07
Nodes (26): DOM, DOM.Iterable, ES2023, node, src, vite/client, vite.config.ts, compilerOptions (+18 more)

### Community 8 - "CustomerDrawer.tsx"
Cohesion: 0.13
Nodes (35): accountCacheKey(), accountKeys, addAddress(), asId(), asString(), BonusResponse, getAccount(), isAppUserRecord() (+27 more)

### Community 9 - "formatPrice"
Cohesion: 0.17
Nodes (15): BadgeInput, badgeKeys, badgeMutations, BadgeRecord, fetchBadges(), mapBadge(), seedFallback(), useCreateBadge() (+7 more)

### Community 10 - "category/api.ts"
Cohesion: 0.17
Nodes (11): FrontpadJob, FrontpadJobKind, FrontpadJobStatus, ORDER_STATUS_FLOW, ORDER_STATUS_SOURCE_LABEL, OrderLineAddon, OrderStatusSource, Review (+3 more)

### Community 13 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 14 - "banner/api.ts"
Cohesion: 0.24
Nodes (9): collectionMutations(), CollectionMutationsConfig, FIELD_CODE_RU, invalidate(), listKeys(), MutationKeys, QueryKey, syncDetail() (+1 more)

### Community 15 - "product/model.ts"
Cohesion: 0.19
Nodes (19): useAccount(), fetchPublicBonusSettings(), usePublicBonusSettings(), calcBonusSpendCap(), calcCartEarn(), calcLineEarn(), clampPercent(), EarnLineInput (+11 more)

### Community 16 - "AdminPage.tsx"
Cohesion: 0.23
Nodes (12): AccountAuth, AccountContext, AccountProvider(), isAbortError(), refreshAuth(), useAccount(), acceptAuthToken(), getClientAuthEpoch() (+4 more)

### Community 17 - "products.ts"
Cohesion: 0.10
Nodes (17): ALL_CATEGORY, Category, CategoryId, KNOWN_CATEGORY_IDS, KnownCategoryId, useDuplicateProduct(), ProductBadge, ProductTag (+9 more)

### Community 18 - "crud.ts"
Cohesion: 0.19
Nodes (15): claimPwaInstallBonus(), detectInstallPlatform(), dismissPwaForever(), isPwaDismissedForever(), isStandaloneDisplay(), markSessionShown(), wasSessionShown(), EngagementHost() (+7 more)

### Community 19 - "ProductEditor.tsx"
Cohesion: 0.12
Nodes (26): useAdjustBonus(), useCustomerLedger(), buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams (+18 more)

### Community 20 - "package.json"
Cohesion: 0.18
Nodes (10): name, private, scripts, build, copy:vk-sdk, dev, preview, typecheck (+2 more)

### Community 21 - "coupon/api.ts"
Cohesion: 0.15
Nodes (21): completeVkOneTap(), createVkOneTapSession(), resolveVkAppId(), attachVkOneTap(), detachVkOneTap(), isBenignVkError(), mountWidget(), remountWidget() (+13 more)

### Community 22 - "lucide-react"
Cohesion: 0.12
Nodes (23): addonKeys, addonMutations, AddonRecord, CreateAddonInput, fetchAddonById(), fetchAddons(), fetchAddonsByKind(), fetchExtras() (+15 more)

### Community 23 - "@radix-ui/react-dialog"
Cohesion: 0.13
Nodes (22): buildSeries(), buildTopProducts(), countByFilter(), DashboardData, dashboardKeys, DashboardSection(), dayKey(), fetchDashboard() (+14 more)

### Community 24 - "cn"
Cohesion: 0.13
Nodes (26): useFrontpadStockArticles(), articleFor(), articleConflictMessage(), ArticleExclude, ArticleRef, cellLabel(), collectArticleConflicts(), isExcludedCell() (+18 more)

### Community 25 - "banner/api.ts"
Cohesion: 0.24
Nodes (15): useBadges(), badgeLabel(), PRODUCT_ASPECT_RATIO, minPrice(), isProductStopped(), useStoppedArticles(), ProductCard(), ProductCardProps (+7 more)

### Community 26 - "tailwind-merge"
Cohesion: 0.13
Nodes (21): adjustBonus(), bonusKeys, BonusSettingsRecord, bulkSetBonusPercent(), fetchBonusSettings(), fetchCustomerLedger(), LedgerRecord, mapLedger() (+13 more)

### Community 27 - "@tanstack/react-query"
Cohesion: 0.22
Nodes (13): useCreateProduct(), DEFAULT_NUTRITION, ProductCreateForm(), Props, TabId, TABS, PhoneOnboardingProps, Button() (+5 more)

### Community 28 - "zustand"
Cohesion: 0.23
Nodes (10): BANNER_ASPECT_RATIO, canvasToBlob(), CropArea, cropImageToFile(), loadImage(), readImageSize(), ALLOWED, BannerImageField() (+2 more)

### Community 29 - "AdminSidebar.tsx"
Cohesion: 0.11
Nodes (15): DeliveryMode, BonusSpendBlock(), CheckoutDialogProps, PAYMENT_OPTIONS, CheckoutModeToggle(), CheckoutModeToggleProps, OPTIONS, BADGES (+7 more)

### Community 30 - "staff/api.ts"
Cohesion: 0.17
Nodes (15): CreateStaffInput, fetchStaff(), mapStaff(), mapStaffRequired(), staffKeys, StaffMember, staffMutations, StaffRecord (+7 more)

### Community 31 - "product/model.ts"
Cohesion: 0.11
Nodes (21): CategoryIcon(), Props, TagFilterId, AxisLock, useAxisLockedHorizontalScroll(), clampScroll(), Edges, EdgeSide (+13 more)

### Community 32 - "StickyBar.tsx"
Cohesion: 0.17
Nodes (22): useCreateStaff(), COLUMNS, KIND_FILTERS, STATUS_FILTERS, ROLE_FILTERS, ROLE_LABEL, StaffCreateForm(), Column (+14 more)

### Community 33 - "DesktopHome.tsx"
Cohesion: 0.17
Nodes (16): useProducts(), useCartTotals(), CartPanel(), MODE_OPTIONS, CartPromo(), CheckoutDialogState, useCheckoutDialogStore, SearchDialog() (+8 more)

### Community 34 - "AddonForm.tsx"
Cohesion: 0.19
Nodes (16): cartLineTitle(), findSize(), findVariant(), needsChooser(), nutritionForPortion(), nutritionOf(), parseWeightGrams(), scaleNutrition() (+8 more)

### Community 35 - "cn.ts"
Cohesion: 0.19
Nodes (16): fetchSizeTemplates(), mapSizeTemplate(), seedFallback(), SizeTemplateInput, sizeTemplateKeys, sizeTemplateMutations, SizeTemplateRecord, useCreateSizeTemplate() (+8 more)

### Community 36 - "customer/api.ts"
Cohesion: 0.32
Nodes (6): CartToggle(), formatOrderSum(), Props, FloatingActions(), Props, TONE

### Community 37 - "OrdersSection.tsx"
Cohesion: 0.06
Nodes (39): App(), readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), useTheme(), AdminGate() (+31 more)

### Community 38 - "useAdminAuth"
Cohesion: 0.17
Nodes (17): cellNutrition(), defaultNutritionFromSizes(), setCellNutrition(), MeatIcon, ProductNutrition, ProductSize, ProductVariant, RatingCriterion (+9 more)

### Community 39 - "NutritionHint.tsx"
Cohesion: 0.18
Nodes (10): CartPanelState, useCartPanelStore, CartDock(), groupProductsByCategory(), CatalogSection, DesktopHome(), Props, Options (+2 more)

### Community 40 - "button.tsx"
Cohesion: 0.20
Nodes (11): bannerFormData(), BannerNote, useCreateBanner(), useUpdateBanner(), BannerForm(), Props, ALLOWED, formatMb() (+3 more)

### Community 41 - "lucide-react"
Cohesion: 0.20
Nodes (10): AppUser, NewSavedAddress, OAuthProvider, ProfileBonus, SavedAddress, UpdateAccountInput, formatAddressLine(), AddressSection() (+2 more)

### Community 42 - "react-dom"
Cohesion: 0.13
Nodes (20): fetchTags(), mapTag(), TagInput, tagKeys, tagMutations, TagRecord, tagsForCategory(), useCategoryTags() (+12 more)

### Community 43 - "AdminPage.tsx"
Cohesion: 0.16
Nodes (14): useActivityLogsPage(), useCustomersPage(), loadDomMax(), ProductEditorRoute(), SectionStub(), ADMIN_NAV, AdminNavItem, AdminRole (+6 more)

### Community 44 - "theme.tsx"
Cohesion: 0.14
Nodes (18): e(), e1(), e5(), e6(), eB(), eU(), n(), ns() (+10 more)

### Community 45 - "site.ts"
Cohesion: 0.19
Nodes (15): fetchSettings(), mapSettings(), updateSettings(), useSettings(), useUpdateSettings(), settingsFallback(), CheckoutDialog(), parseNonNeg() (+7 more)

### Community 46 - "compress-image.ts"
Cohesion: 0.16
Nodes (17): SumRow(), Props, cn(), Chip(), ChipProps, OptionCard(), OptionCardProps, PopoverContent() (+9 more)

### Community 47 - "lucide-react"
Cohesion: 0.13
Nodes (17): lenis, lenis, HomeMobileTabBar(), catalogSectionId(), Options, useCatalogScrollSpy(), LENIS_OPTIONS, Props (+9 more)

### Community 48 - "react-easy-crop"
Cohesion: 0.29
Nodes (8): orderKeys, subscribeOrderStatus(), usePublicOrder(), Order, repeatOrderIntoCart(), useLiveOrder(), OrderTrackPage(), RepeatButton()

### Community 49 - "sonner"
Cohesion: 0.21
Nodes (12): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+4 more)

### Community 50 - "invalidateProductRatings"
Cohesion: 0.17
Nodes (12): ng(), np(), o(), o2(), o3(), og(), ol(), os() (+4 more)

### Community 51 - "pocketbase"
Cohesion: 0.06
Nodes (29): pocketbase, pocketbase, auth(), buildCompositionByVariant(), compositionBySlug, formatComposition(), nutritionBySlug, pb (+21 more)

### Community 52 - "@radix-ui/react-popover"
Cohesion: 0.24
Nodes (9): activityLogKeys, ActivityLogsPage, ActivityRecord, fetchActivityLogsPage(), mapLog(), ActivityActorType, ActivityLog, ACTOR_TYPE_LABEL (+1 more)

### Community 53 - "selectors.ts"
Cohesion: 0.23
Nodes (10): canvasToBlob(), compressImage(), CompressOptions, loadImage(), ALLOWED, formatMb(), multiImageDiff(), MultiImageField() (+2 more)

### Community 54 - "store.ts"
Cohesion: 0.12
Nodes (23): useDeleteAddon(), useDeleteBanner(), useDeleteCategory(), useAdminProducts(), cellDelta(), stockPriceMap, AddonsSection(), BannersSection() (+15 more)

### Community 55 - "ProductPage.tsx"
Cohesion: 0.25
Nodes (8): useCreateCategory(), useUpdateCategory(), CategoryForm(), Props, CATEGORY_ICONS, CategoryIconPath, SheetContent(), SheetContentProps

### Community 56 - "Sidebar.tsx"
Cohesion: 0.27
Nodes (5): VkOneTap(), VkOneTapProps, AuthButtons(), AuthButtonsProps, LoginPanel()

### Community 57 - "surface.tsx"
Cohesion: 0.22
Nodes (6): OrderAddressParts, AddPayload, CartAddon, CartItem, CartState, EMPTY_ADDRESS_PARTS

### Community 58 - "coupon/api.ts"
Cohesion: 0.09
Nodes (27): checkPromo(), couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail (+19 more)

### Community 59 - "category/api.ts"
Cohesion: 0.22
Nodes (9): i(), nu(), o1(), oB(), oc(), od(), oi(), oz() (+1 more)

### Community 60 - "@radix-ui/react-slot"
Cohesion: 0.31
Nodes (6): AdminTopbar(), AdminTopbarProps, fetchNewOrdersCount(), newOrdersKey, queryClient, QueryKey

### Community 61 - "crud.ts"
Cohesion: 0.17
Nodes (16): useDeleteCoupon(), useAdminReviews(), useDeleteReview(), useToggleReviewPublished(), CouponsSection(), STATUS_FILTERS, ProductOption, ReviewFormProps (+8 more)

### Community 62 - "FloatingActions.tsx"
Cohesion: 0.10
Nodes (32): useExtras(), useSauces(), frontpadStockKeys, useProductBySlug(), compositionOf(), fetchStoppedArticles(), isAddonStopped(), isSizeStopped() (+24 more)

### Community 64 - "OrderDetails.tsx"
Cohesion: 0.16
Nodes (22): useOrder(), useOrderJobs(), useResendOrder(), useUpdateOrderStatus(), isFrontpadWarning(), ORDER_STATUS_LABEL, OrderLineSnapshot, formatAddress() (+14 more)

### Community 65 - "mapFrontpadSettings"
Cohesion: 0.25
Nodes (8): a(), r(), tf(), tg(), to(), tr(), tW(), tz()

### Community 66 - "files.ts"
Cohesion: 0.25
Nodes (10): createBody(), updateBody(), filenamesOf(), FileRecord, imageFilenames(), imageUrl(), imageUrls(), toFormData() (+2 more)

### Community 67 - "getAccount"
Cohesion: 0.43
Nodes (5): formatGrams(), NutritionHint(), useIsDesktop(), useIsWide(), useMediaQuery()

### Community 68 - "counts.ts"
Cohesion: 0.16
Nodes (14): bannerKeys, bannerMutations, BannerRecord, CreateBannerInput, fetchBannerById(), fetchBanners(), mapBanner(), UpdateBannerInput (+6 more)

### Community 70 - "CartTotals.tsx"
Cohesion: 0.38
Nodes (4): BonusEarnHint(), BonusEarnHintProps, CartTotalsProps, CoinIcon()

### Community 71 - "copy-vkid-sdk.mjs"
Cohesion: 0.33
Nodes (4): dest, destDir, root, src

### Community 72 - "addons.ts"
Cohesion: 0.40
Nodes (5): AdminPage(), adminCountKeys, AdminCounts, fetchAdminCounts(), useAdminCounts()

### Community 73 - "invalidateProductRatings"
Cohesion: 0.67
Nodes (4): invalidateProductRatings(), useCreateReview(), useUpdateReview(), ReviewForm()

## Knowledge Gaps
- **375 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+370 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `compress-image.ts` to `HomePage.tsx`, `cn`, `formatPrice`, `product/model.ts`, `crud.ts`, `@radix-ui/react-dialog`, `cn`, `banner/api.ts`, `@tanstack/react-query`, `zustand`, `AdminSidebar.tsx`, `product/model.ts`, `StickyBar.tsx`, `DesktopHome.tsx`, `cn.ts`, `customer/api.ts`, `OrdersSection.tsx`, `useAdminAuth`, `button.tsx`, `lucide-react`, `AdminPage.tsx`, `site.ts`, `sonner`, `selectors.ts`, `store.ts`, `ProductPage.tsx`, `coupon/api.ts`, `crud.ts`, `FloatingActions.tsx`, `OrderDetails.tsx`, `counts.ts`, `CartTotals.tsx`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **Why does `VitrineScrollProvider()` connect `lucide-react` to `DesktopHome.tsx`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `sonner`, `class-variance-authority`, `@radix-ui/react-popover`, `tailwind-merge`, `lucide-react`, `zustand`, `lucide-react`, `pocketbase`, `package.json`, `@radix-ui/react-tooltip`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `ProductEditor()` (e.g. with `e()` and `n()`) actually correct?**
  _`ProductEditor()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _375 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `HomePage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12535612535612536 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._