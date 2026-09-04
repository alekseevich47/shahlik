# Graph Report - shashlik-web  (2026-09-04)

## Corpus Check
- 213 files · ~207,162 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1441 nodes · 4077 edges · 74 communities (64 shown, 10 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 131 edges (avg confidence: 0.55)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `146fee0a`
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
- coupon/api.ts
- category/api.ts
- crud.ts
- FloatingActions.tsx
- OrderDetails.tsx
- mapFrontpadSettings
- files.ts
- getAccount
- counts.ts
- sonner
- copy-vkid-sdk.mjs
- addons.ts
- invalidateProductRatings
- clsx
- lucide-react
- motion
- @radix-ui/react-dialog
- react-router-dom

## God Nodes (most connected - your core abstractions)
1. `cn()` - 146 edges
2. `formatPrice()` - 53 edges
3. `Button()` - 47 edges
4. `ProductEditor()` - 29 edges
5. `useCartTotals()` - 26 edges
6. `Input()` - 26 edges
7. `pb` - 24 edges
8. `useCategories()` - 22 edges
9. `ProductView()` - 22 edges
10. `n()` - 21 edges

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

## Communities (74 total, 10 thin omitted)

### Community 0 - "HomePage.tsx"
Cohesion: 0.13
Nodes (19): useAccount(), fetchBonus(), submitReferral(), useProfileBonus(), isActiveOrderStatus(), formatAddressLine(), AddressCard(), AddressesTab() (+11 more)

### Community 1 - "dependencies"
Cohesion: 0.11
Nodes (19): class-variance-authority, lenis, dependencies, class-variance-authority, lenis, @radix-ui/react-popover, @radix-ui/react-slot, @radix-ui/react-tooltip (+11 more)

### Community 2 - "selectors.ts"
Cohesion: 0.11
Nodes (27): adminProductKeys, createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchAdminProducts() (+19 more)

### Community 4 - "cn"
Cohesion: 0.06
Nodes (70): OrderStatus, applyPricesJobKeys, asNumberList(), asStatusMap(), asStringList(), enqueueApplyPricesJob(), enqueueSyncJob(), fetchActiveSyncJobs() (+62 more)

### Community 5 - "CatalogTables.tsx"
Cohesion: 0.10
Nodes (30): adminReviewKeys, buildOrdersFilter(), createOrder(), CreateReviewInput, fetchActiveResendJobs(), fetchAdminReviews(), fetchMyOrders(), fetchOrders() (+22 more)

### Community 6 - "devDependencies"
Cohesion: 0.10
Nodes (21): devDependencies, tailwindcss, @tailwindcss/vite, tw-animate-css, @types/node, @types/react, @types/react-dom, typescript (+13 more)

### Community 7 - "compilerOptions"
Cohesion: 0.07
Nodes (26): DOM, DOM.Iterable, ES2023, node, src, vite/client, vite.config.ts, compilerOptions (+18 more)

### Community 8 - "CustomerDrawer.tsx"
Cohesion: 0.13
Nodes (29): accountKeys, asId(), asString(), BonusResponse, linkPhone(), loginWithOAuth(), loginWithVkId(), mapAddress() (+21 more)

### Community 9 - "formatPrice"
Cohesion: 0.17
Nodes (15): BadgeInput, badgeKeys, badgeMutations, BadgeRecord, fetchBadges(), mapBadge(), seedFallback(), useCreateBadge() (+7 more)

### Community 10 - "category/api.ts"
Cohesion: 0.12
Nodes (18): FrontpadJob, FrontpadJobKind, FrontpadJobStatus, Order, ORDER_STATUS_FLOW, ORDER_STATUS_LABEL, ORDER_STATUS_SOURCE_LABEL, OrderLineAddon (+10 more)

### Community 13 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 14 - "banner/api.ts"
Cohesion: 0.12
Nodes (24): useDeleteBanner(), AdminLogin(), AdminPage(), GuardedSection(), BannersSection(), DashboardSection(), AdminTopbar(), AdminTopbarProps (+16 more)

### Community 15 - "product/model.ts"
Cohesion: 0.07
Nodes (41): addonKeys, checkPromo(), couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon() (+33 more)

### Community 16 - "AdminPage.tsx"
Cohesion: 0.27
Nodes (9): AccountAuth, AccountContext, AccountProvider(), isAbortError(), refreshAuth(), acceptAuthToken(), getClientAuthEpoch(), logout() (+1 more)

### Community 17 - "products.ts"
Cohesion: 0.12
Nodes (14): MeatIcon, ProductBadge, ProductNutrition, ProductTag, RatingCriterion, MEAT_VARIANTS, NUTRITION_BY_CATEGORY, products (+6 more)

### Community 18 - "crud.ts"
Cohesion: 0.15
Nodes (18): claimPwaInstallBonus(), BonusEarnHintProps, detectInstallPlatform(), dismissPwaForever(), isPwaDismissedForever(), isStandaloneDisplay(), markSessionShown(), wasSessionShown() (+10 more)

### Community 19 - "ProductEditor.tsx"
Cohesion: 0.07
Nodes (47): adjustBonus(), bonusKeys, BonusSettingsRecord, bulkSetBonusPercent(), fetchBonusSettings(), fetchCustomerLedger(), LedgerRecord, mapLedger() (+39 more)

### Community 20 - "package.json"
Cohesion: 0.18
Nodes (10): name, private, scripts, build, copy:vk-sdk, dev, preview, typecheck (+2 more)

### Community 21 - "coupon/api.ts"
Cohesion: 0.15
Nodes (21): completeVkOneTap(), createVkOneTapSession(), resolveVkAppId(), attachVkOneTap(), detachVkOneTap(), isBenignVkError(), mountWidget(), remountWidget() (+13 more)

### Community 22 - "lucide-react"
Cohesion: 0.15
Nodes (22): addonMutations, AddonRecord, CreateAddonInput, createBody(), fetchAddonById(), fetchAddons(), fetchAddonsByKind(), fetchExtras() (+14 more)

### Community 23 - "@radix-ui/react-dialog"
Cohesion: 0.14
Nodes (19): buildSeries(), buildTopProducts(), countByFilter(), DashboardData, dashboardKeys, dayKey(), fetchDashboard(), OrderSlice (+11 more)

### Community 24 - "cn"
Cohesion: 0.20
Nodes (11): Addon, AddonKind, articleConflictMessage(), ArticleExclude, ArticleRef, cellLabel(), collectArticleConflicts(), isExcludedCell() (+3 more)

### Community 25 - "banner/api.ts"
Cohesion: 0.23
Nodes (15): useBadges(), badgeLabel(), PRODUCT_ASPECT_RATIO, minPrice(), isProductStopped(), useStoppedArticles(), ProductCard(), ProductCardProps (+7 more)

### Community 26 - "tailwind-merge"
Cohesion: 0.17
Nodes (19): useFrontpadStockArticles(), articleFor(), priceOf(), ApplyPricesJobResult, asRowList(), buildCells(), CashPriceCell, CashPricePlan (+11 more)

### Community 28 - "zustand"
Cohesion: 0.06
Nodes (45): bannerFormData(), bannerKeys, bannerMutations, BannerNote, BannerRecord, CreateBannerInput, fetchBannerById(), fetchBanners() (+37 more)

### Community 29 - "AdminSidebar.tsx"
Cohesion: 0.09
Nodes (20): DeliveryMode, OrderAddressParts, AddressSection(), AddressSectionProps, BonusSpendBlock(), CheckoutDialogProps, PAYMENT_OPTIONS, CheckoutModeToggle() (+12 more)

### Community 30 - "staff/api.ts"
Cohesion: 0.17
Nodes (19): CreateStaffInput, fetchStaff(), mapStaff(), mapStaffRequired(), staffKeys, StaffMember, staffMutations, StaffRecord (+11 more)

### Community 31 - "product/model.ts"
Cohesion: 0.18
Nodes (11): Chip(), ChipProps, OptionCard(), OptionCardProps, Props, SPRING, TagFilters(), FloatingActions() (+3 more)

### Community 32 - "StickyBar.tsx"
Cohesion: 0.18
Nodes (22): useActivityLogsPage(), COLUMNS, LogsSection(), KIND_FILTERS, STATUS_FILTERS, STATUS_FILTERS, Column, DataTable() (+14 more)

### Community 33 - "DesktopHome.tsx"
Cohesion: 0.27
Nodes (9): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+1 more)

### Community 34 - "AddonForm.tsx"
Cohesion: 0.21
Nodes (17): useProductBySlug(), compositionOf(), fetchStoppedArticles(), isAddonStopped(), isSizeStopped(), isSkuStopped(), isVariantStopped(), stoppedArticlesKey (+9 more)

### Community 35 - "cn.ts"
Cohesion: 0.40
Nodes (3): LoginPanel(), VkOneTap(), VkOneTapProps

### Community 36 - "customer/api.ts"
Cohesion: 0.24
Nodes (11): cartLineTitle(), findSize(), findVariant(), hasMissingArticle(), needsChooser(), nutritionForPortion(), nutritionOf(), parseWeightGrams() (+3 more)

### Community 37 - "OrdersSection.tsx"
Cohesion: 0.05
Nodes (38): App(), readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), useTheme(), AdminGate() (+30 more)

### Community 38 - "useAdminAuth"
Cohesion: 0.18
Nodes (16): useDeleteProduct(), useUpdateProduct(), cellNutrition(), defaultNutritionFromSizes(), setCellNutrition(), ProductSize, ProductVariant, imagesFromProduct() (+8 more)

### Community 39 - "NutritionHint.tsx"
Cohesion: 0.14
Nodes (12): CartPanelState, useCartPanelStore, CartDock(), loadDomMax(), CatalogSection, DesktopHome(), GRID_LAYOUT_TRANSITION, loadDomMax() (+4 more)

### Community 40 - "button.tsx"
Cohesion: 0.17
Nodes (22): useAccount(), fetchPublicBonusSettings(), usePublicBonusSettings(), calcBonusSpendCap(), calcCartEarn(), calcLineEarn(), clampPercent(), EarnLineInput (+14 more)

### Community 41 - "lucide-react"
Cohesion: 0.27
Nodes (12): accountCacheKey(), addAddress(), getAccount(), isAppUserRecord(), persistRecord(), removeAddress(), requireAccountId(), saveAddresses() (+4 more)

### Community 42 - "react-dom"
Cohesion: 0.06
Nodes (44): fetchSizeTemplates(), mapSizeTemplate(), seedFallback(), SizeTemplateInput, sizeTemplateKeys, sizeTemplateMutations, SizeTemplateRecord, useCreateSizeTemplate() (+36 more)

### Community 43 - "AdminPage.tsx"
Cohesion: 0.13
Nodes (26): useDeleteAddon(), useCoupons(), useDeleteCoupon(), useAdminProducts(), useToggleProductActive(), cellDelta(), planAllCashPrices(), stockPriceMap (+18 more)

### Community 44 - "theme.tsx"
Cohesion: 0.14
Nodes (18): e(), e1(), e5(), e6(), eB(), eU(), n(), ns() (+10 more)

### Community 45 - "site.ts"
Cohesion: 0.21
Nodes (12): useCategories(), useProducts(), useAddProduct(), SearchDialog(), SearchDialogProps, product(), groupProductsByCategory(), MobileHome() (+4 more)

### Community 46 - "compress-image.ts"
Cohesion: 0.32
Nodes (11): canUseStorage(), getLatestLocalOrderId(), isStoredOrder(), listLocalOrderIds(), load(), prune(), rememberLocalOrder(), save() (+3 more)

### Community 47 - "lucide-react"
Cohesion: 0.29
Nodes (7): LENIS_OPTIONS, Props, ScrollOptions, VitrineScrollApi, VitrineScrollContext, VitrineScrollProvider(), VitrineScrollTarget

### Community 48 - "react-easy-crop"
Cohesion: 0.23
Nodes (9): fetchOrderById(), fetchPublicOrder(), orderKeys, usePublicOrder(), repeatOrderIntoCart(), useLiveOrder(), OrderTrackPage(), RepeatButton() (+1 more)

### Community 49 - "sonner"
Cohesion: 0.16
Nodes (17): useCreateCategory(), useDeleteCategory(), useUpdateCategory(), Category, CategoriesSection(), CategoryForm(), Props, move() (+9 more)

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
Cohesion: 0.27
Nodes (8): HomeMobileTabBar(), catalogSectionId(), Options, useCatalogScrollSpy(), useVitrineScroll(), CatalogCategorySection(), Props, STICKY_BAR

### Community 54 - "store.ts"
Cohesion: 0.25
Nodes (5): ALL_CATEGORY, CategoryId, KNOWN_CATEGORY_IDS, KnownCategoryId, categories

### Community 58 - "coupon/api.ts"
Cohesion: 0.17
Nodes (14): useCreateCoupon(), useUpdateCoupon(), CouponForm(), KIND_OPTIONS, Props, toDateInput(), DEFAULT_NUTRITION, Props (+6 more)

### Community 59 - "category/api.ts"
Cohesion: 0.22
Nodes (9): i(), nu(), o1(), oB(), oc(), od(), oi(), oz() (+1 more)

### Community 61 - "crud.ts"
Cohesion: 0.20
Nodes (13): useAdminReviews(), useDeleteReview(), useToggleReviewPublished(), OrderHistoryRow(), CustomersSection(), ProductOption, ReviewFormProps, ReviewsSection() (+5 more)

### Community 62 - "FloatingActions.tsx"
Cohesion: 0.09
Nodes (28): CategoryIcon(), Props, CartToggle(), formatOrderSum(), Props, CartTotalsProps, SumRow(), PreviewToggle() (+20 more)

### Community 64 - "OrderDetails.tsx"
Cohesion: 0.28
Nodes (12): useOrder(), useOrderJobs(), useResendOrder(), useUpdateOrderStatus(), isFrontpadWarning(), formatAddress(), moneyRow(), OrderDrawer() (+4 more)

### Community 65 - "mapFrontpadSettings"
Cohesion: 0.25
Nodes (8): a(), r(), tf(), tg(), to(), tr(), tW(), tz()

### Community 66 - "files.ts"
Cohesion: 0.43
Nodes (6): filenamesOf(), FileRecord, imageFilenames(), imageUrl(), imageUrls(), ToFormDataOptions

### Community 67 - "getAccount"
Cohesion: 0.33
Nodes (7): ALL_TAG, TagFilterId, HomePage(), useIsDesktop(), useIsWide(), useMediaQuery(), MobileTab

### Community 68 - "counts.ts"
Cohesion: 0.40
Nodes (5): adminCountKeys, AdminCounts, fetchAdminCounts(), useAdminCounts(), pb

### Community 71 - "copy-vkid-sdk.mjs"
Cohesion: 0.33
Nodes (4): dest, destDir, root, src

### Community 72 - "addons.ts"
Cohesion: 0.33
Nodes (4): addons, extras, IMG, sauces

### Community 74 - "invalidateProductRatings"
Cohesion: 0.67
Nodes (4): invalidateProductRatings(), useCreateReview(), useUpdateReview(), ReviewForm()

## Knowledge Gaps
- **368 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+363 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `FloatingActions.tsx` to `HomePage.tsx`, `cn`, `formatPrice`, `category/api.ts`, `product/model.ts`, `crud.ts`, `@radix-ui/react-dialog`, `banner/api.ts`, `tailwind-merge`, `zustand`, `AdminSidebar.tsx`, `product/model.ts`, `StickyBar.tsx`, `AddonForm.tsx`, `OrdersSection.tsx`, `useAdminAuth`, `button.tsx`, `react-dom`, `AdminPage.tsx`, `site.ts`, `sonner`, `coupon/api.ts`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `sonner`, `clsx`, `lucide-react`, `motion`, `@radix-ui/react-dialog`, `react-router-dom`, `pocketbase`, `package.json`, `ProductPage.tsx`, `@tanstack/react-query`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Why does `VitrineScrollProvider()` connect `lucide-react` to `dependencies`, `getAccount`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `ProductEditor()` (e.g. with `e()` and `n()`) actually correct?**
  _`ProductEditor()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _368 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `HomePage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._