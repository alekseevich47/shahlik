# Graph Report - shashlik-web  (2026-09-08)

## Corpus Check
- 217 files · ~217,125 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1452 nodes · 4117 edges · 78 communities (68 shown, 10 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 129 edges (avg confidence: 0.55)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `da92574e`
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

## God Nodes (most connected - your core abstractions)
1. `cn()` - 152 edges
2. `formatPrice()` - 53 edges
3. `Button()` - 46 edges
4. `ProductEditor()` - 29 edges
5. `useCartTotals()` - 26 edges
6. `Input()` - 25 edges
7. `pb` - 23 edges
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

## Communities (78 total, 10 thin omitted)

### Community 0 - "HomePage.tsx"
Cohesion: 0.13
Nodes (24): submitReferral(), fetchMyOrders(), useMyOrders(), isActiveOrderStatus(), formatAddressLine(), canUseStorage(), getLatestLocalOrderId(), isStoredOrder() (+16 more)

### Community 1 - "dependencies"
Cohesion: 0.11
Nodes (19): class-variance-authority, lenis, dependencies, class-variance-authority, lenis, @radix-ui/react-popover, @radix-ui/react-slot, @radix-ui/react-tooltip (+11 more)

### Community 2 - "selectors.ts"
Cohesion: 0.10
Nodes (35): createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchProductById(), fetchProductBySlug() (+27 more)

### Community 4 - "cn"
Cohesion: 0.12
Nodes (27): applyPricesJobKeys, asNumberList(), asStatusMap(), asStringList(), fetchFrontpadSettings(), fetchFrontpadStock(), fetchSettings(), fetchStoppedStock() (+19 more)

### Community 5 - "CatalogTables.tsx"
Cohesion: 0.09
Nodes (31): adminReviewKeys, buildOrdersFilter(), createOrder(), CreateOrderInput, CreateReviewInput, fetchActiveResendJobs(), fetchAdminReviews(), fetchOrderById() (+23 more)

### Community 6 - "devDependencies"
Cohesion: 0.10
Nodes (21): devDependencies, tailwindcss, @tailwindcss/vite, tw-animate-css, @types/node, @types/react, @types/react-dom, typescript (+13 more)

### Community 7 - "compilerOptions"
Cohesion: 0.07
Nodes (26): DOM, DOM.Iterable, ES2023, node, src, vite/client, vite.config.ts, compilerOptions (+18 more)

### Community 8 - "CustomerDrawer.tsx"
Cohesion: 0.12
Nodes (30): accountKeys, asId(), asString(), BonusResponse, fetchBonus(), linkPhone(), loginWithOAuth(), loginWithVkId() (+22 more)

### Community 9 - "formatPrice"
Cohesion: 0.20
Nodes (14): BadgeInput, badgeKeys, badgeMutations, BadgeRecord, fetchBadges(), mapBadge(), seedFallback(), useBadges() (+6 more)

### Community 10 - "category/api.ts"
Cohesion: 0.12
Nodes (18): FrontpadJob, FrontpadJobKind, FrontpadJobStatus, Order, ORDER_STATUS_FLOW, ORDER_STATUS_LABEL, ORDER_STATUS_SOURCE_LABEL, OrderLineAddon (+10 more)

### Community 13 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 14 - "banner/api.ts"
Cohesion: 0.23
Nodes (9): CollectionMutationsConfig, FIELD_CODE_RU, invalidate(), listKeys(), MutationKeys, QueryKey, syncDetail(), queryClient (+1 more)

### Community 15 - "product/model.ts"
Cohesion: 0.12
Nodes (21): OrderStatus, fetchActiveSyncJobs(), frontpadSettingsKeys, stoppedStockKeys, syncJobKeys, useActiveSyncJobs(), DEFAULT_STATUS_MAP, FrontpadSettings (+13 more)

### Community 16 - "AdminPage.tsx"
Cohesion: 0.17
Nodes (16): AccountAuth, AccountContext, AccountProvider(), isAbortError(), refreshAuth(), useAccount(), acceptAuthToken(), getClientAuthEpoch() (+8 more)

### Community 17 - "products.ts"
Cohesion: 0.11
Nodes (14): ALL_CATEGORY, Category, CategoryId, KNOWN_CATEGORY_IDS, KnownCategoryId, categories, MEAT_VARIANTS, NUTRITION_BY_CATEGORY (+6 more)

### Community 18 - "crud.ts"
Cohesion: 0.23
Nodes (14): readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), useTheme(), oppositeThemeSrc(), resolveThemeSrc() (+6 more)

### Community 19 - "ProductEditor.tsx"
Cohesion: 0.11
Nodes (32): useCustomerLedger(), buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams, CustomersPageResult (+24 more)

### Community 20 - "package.json"
Cohesion: 0.18
Nodes (10): name, private, scripts, build, copy:vk-sdk, dev, preview, typecheck (+2 more)

### Community 21 - "coupon/api.ts"
Cohesion: 0.15
Nodes (21): completeVkOneTap(), createVkOneTapSession(), resolveVkAppId(), attachVkOneTap(), detachVkOneTap(), isBenignVkError(), mountWidget(), remountWidget() (+13 more)

### Community 22 - "lucide-react"
Cohesion: 0.10
Nodes (28): addonMutations, AddonRecord, CreateAddonInput, createBody(), fetchAddonById(), fetchAddons(), fetchAddonsByKind(), fetchExtras() (+20 more)

### Community 23 - "@radix-ui/react-dialog"
Cohesion: 0.13
Nodes (22): buildSeries(), buildTopProducts(), countByFilter(), DashboardData, dashboardKeys, DashboardSection(), dayKey(), fetchDashboard() (+14 more)

### Community 24 - "cn"
Cohesion: 0.22
Nodes (13): useAddons(), useFrontpadStockArticles(), articleConflictMessage(), ArticleExclude, ArticleRef, cellLabel(), collectArticleConflicts(), isExcludedCell() (+5 more)

### Community 25 - "banner/api.ts"
Cohesion: 0.21
Nodes (14): PRODUCT_ASPECT_RATIO, minPrice(), isProductStopped(), ProductCard(), ProductCardProps, ProductCardCompact(), Props, SearchDialog() (+6 more)

### Community 26 - "tailwind-merge"
Cohesion: 0.06
Nodes (59): adjustBonus(), bonusKeys, BonusSettingsRecord, bulkSetBonusPercent(), claimPwaInstallBonus(), fetchBonusSettings(), fetchCustomerLedger(), fetchPublicBonusSettings() (+51 more)

### Community 27 - "@tanstack/react-query"
Cohesion: 0.23
Nodes (10): parseNonNeg(), SettingsSection(), TabId, TABS, PhoneOnboardingProps, Field(), Input(), Textarea() (+2 more)

### Community 28 - "zustand"
Cohesion: 0.18
Nodes (14): GuardedSection(), AdminAuth, AdminAuthContext, AdminAuthProvider(), authErrorMessage(), can(), isAbortError(), isStaffRecord() (+6 more)

### Community 29 - "AdminSidebar.tsx"
Cohesion: 0.26
Nodes (8): CategoryIcon(), Props, useSettings(), settingsFallback(), CheckoutDialog(), AddressBar(), Sidebar(), SidebarProps

### Community 30 - "staff/api.ts"
Cohesion: 0.15
Nodes (17): CreateStaffInput, fetchStaff(), mapStaff(), mapStaffRequired(), staffKeys, StaffMember, staffMutations, StaffRecord (+9 more)

### Community 31 - "product/model.ts"
Cohesion: 0.16
Nodes (15): AxisLock, useAxisLockedHorizontalScroll(), clampScroll(), Edges, EdgeSide, prefersReducedMotion(), readEdges(), stepScrollLeft() (+7 more)

### Community 32 - "StickyBar.tsx"
Cohesion: 0.15
Nodes (31): COLUMNS, KIND_FILTERS, STATUS_FILTERS, STATUS_FILTERS, STATUS_FILTERS, ProductOption, ReviewFormProps, STATUS_FILTERS (+23 more)

### Community 33 - "DesktopHome.tsx"
Cohesion: 0.21
Nodes (14): formatCouponValue(), useCartTotals(), useCartStore, CartPanel(), MODE_OPTIONS, CartPromo(), CartTotals(), CheckoutPromoField() (+6 more)

### Community 34 - "AddonForm.tsx"
Cohesion: 0.31
Nodes (8): addonKeys, productKeys, priceOf(), addonFromCache(), CartTotals, productFromCache(), ResolvedAddon, resolveLine()

### Community 35 - "cn.ts"
Cohesion: 0.19
Nodes (16): fetchSizeTemplates(), mapSizeTemplate(), seedFallback(), SizeTemplateInput, sizeTemplateKeys, sizeTemplateMutations, SizeTemplateRecord, useCreateSizeTemplate() (+8 more)

### Community 36 - "customer/api.ts"
Cohesion: 0.32
Nodes (6): CartToggle(), formatOrderSum(), Props, FloatingActions(), Props, TONE

### Community 37 - "OrdersSection.tsx"
Cohesion: 0.11
Nodes (17): App(), AdminGate(), AdminLogin, AdminPage, AppRoutes(), AuthCallbackPage, EASE, EXIT_ABS (+9 more)

### Community 38 - "useAdminAuth"
Cohesion: 0.14
Nodes (21): cellNutrition(), defaultNutritionFromSizes(), setCellNutrition(), DEFAULT_CRITERIA, MeatIcon, ProductBadge, ProductNutrition, ProductRating (+13 more)

### Community 39 - "NutritionHint.tsx"
Cohesion: 0.19
Nodes (9): CartPanelState, useCartPanelStore, CartDock(), CatalogSection, DesktopHome(), Props, Options, useInView() (+1 more)

### Community 40 - "button.tsx"
Cohesion: 0.27
Nodes (12): accountCacheKey(), addAddress(), getAccount(), isAppUserRecord(), persistRecord(), removeAddress(), requireAccountId(), saveAddresses() (+4 more)

### Community 41 - "lucide-react"
Cohesion: 0.36
Nodes (6): badgeLabel(), DEFAULT_BADGES, ProductBadgeDef, BADGE_SEED, BADGE_LABEL, resolveBadgeLabel()

### Community 42 - "react-dom"
Cohesion: 0.22
Nodes (9): useDeleteCategory(), fetchAdminProducts(), useAdminProducts(), useDeleteProduct(), hasMissingArticle(), ProductEditorRoute(), CategoriesSection(), applyFilteredReorder() (+1 more)

### Community 43 - "AdminPage.tsx"
Cohesion: 0.17
Nodes (14): AdminPage(), loadDomMax(), SectionStub(), ADMIN_NAV, AdminNavItem, AdminRole, AdminSectionId, AdminSidebar() (+6 more)

### Community 44 - "theme.tsx"
Cohesion: 0.14
Nodes (18): e(), e1(), e5(), e6(), eB(), eU(), n(), ns() (+10 more)

### Community 45 - "site.ts"
Cohesion: 0.16
Nodes (16): useCategories(), useProducts(), needsChooser(), useFrontpadStockRealtime(), Product, useAddProduct(), CheckoutDialogState, useCheckoutDialogStore (+8 more)

### Community 46 - "compress-image.ts"
Cohesion: 0.06
Nodes (45): checkPromo(), BonusEarnHint(), BonusEarnHintProps, CartTotalsProps, SumRow(), AddressSection(), AddressSectionProps, CheckoutDialogProps (+37 more)

### Community 47 - "lucide-react"
Cohesion: 0.27
Nodes (8): HomeMobileTabBar(), catalogSectionId(), Options, useCatalogScrollSpy(), useVitrineScroll(), CatalogCategorySection(), Props, STICKY_BAR

### Community 48 - "react-easy-crop"
Cohesion: 0.33
Nodes (7): orderKeys, subscribeOrderStatus(), usePublicOrder(), repeatOrderIntoCart(), useLiveOrder(), OrderTrackPage(), RepeatButton()

### Community 49 - "sonner"
Cohesion: 0.27
Nodes (9): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+1 more)

### Community 50 - "invalidateProductRatings"
Cohesion: 0.17
Nodes (12): ng(), np(), o(), o2(), o3(), og(), ol(), os() (+4 more)

### Community 51 - "pocketbase"
Cohesion: 0.06
Nodes (29): pocketbase, pocketbase, auth(), buildCompositionByVariant(), compositionBySlug, formatComposition(), nutritionBySlug, pb (+21 more)

### Community 52 - "@radix-ui/react-popover"
Cohesion: 0.23
Nodes (10): activityLogKeys, ActivityLogsPage, ActivityRecord, fetchActivityLogsPage(), mapLog(), useActivityLogsPage(), ActivityActorType, ActivityLog (+2 more)

### Community 53 - "selectors.ts"
Cohesion: 0.29
Nodes (7): LENIS_OPTIONS, Props, ScrollOptions, VitrineScrollApi, VitrineScrollContext, VitrineScrollProvider(), VitrineScrollTarget

### Community 54 - "store.ts"
Cohesion: 0.15
Nodes (25): adminProductKeys, articleFor(), ApplyPricesJobResult, asRowList(), buildCells(), CashPriceCell, CashPricePlan, CashPriceStatus (+17 more)

### Community 55 - "ProductPage.tsx"
Cohesion: 0.25
Nodes (8): useCreateCategory(), useUpdateCategory(), CategoryForm(), Props, CATEGORY_ICONS, CategoryIconPath, SheetContent(), SheetContentProps

### Community 56 - "Sidebar.tsx"
Cohesion: 0.24
Nodes (6): VkOneTap(), VkOneTapProps, AuthButtons(), AuthButtonsProps, LoginPanel(), SITE

### Community 57 - "surface.tsx"
Cohesion: 0.18
Nodes (8): AppliedCoupon, DeliveryMode, OrderAddressParts, AddPayload, CartAddon, CartItem, CartState, EMPTY_ADDRESS_PARTS

### Community 58 - "coupon/api.ts"
Cohesion: 0.12
Nodes (22): couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail, PromoCheckOk (+14 more)

### Community 59 - "category/api.ts"
Cohesion: 0.22
Nodes (9): i(), nu(), o1(), oB(), oc(), od(), oi(), oz() (+1 more)

### Community 60 - "@radix-ui/react-slot"
Cohesion: 0.24
Nodes (7): ThemeToggle(), AdminTopbar(), AdminTopbarProps, fetchNewOrdersCount(), newOrdersKey, MobileHeader(), Props

### Community 61 - "crud.ts"
Cohesion: 0.20
Nodes (11): BonusSpendBlock(), AddonRow(), Props, formatPrice(), formatScore10(), formatScore5(), trimZero(), SIZES (+3 more)

### Community 62 - "FloatingActions.tsx"
Cohesion: 0.12
Nodes (26): frontpadStockKeys, mapRating(), cartLineTitle(), compositionOf(), findSize(), findVariant(), nutritionForPortion(), nutritionOf() (+18 more)

### Community 63 - "@radix-ui/react-tooltip"
Cohesion: 0.33
Nodes (7): enqueueApplyPricesJob(), enqueueSyncJob(), fetchApplyPricesJobs(), mapJob(), useEnqueueSyncJob(), pbErrorMessage(), wrapError()

### Community 64 - "OrderDetails.tsx"
Cohesion: 0.25
Nodes (14): useOrder(), useOrderJobs(), useResendOrder(), useUpdateOrderStatus(), isFrontpadWarning(), AdminLogin(), formatAddress(), moneyRow() (+6 more)

### Community 65 - "mapFrontpadSettings"
Cohesion: 0.25
Nodes (8): a(), r(), tf(), tg(), to(), tr(), tW(), tz()

### Community 67 - "getAccount"
Cohesion: 0.43
Nodes (5): formatGrams(), NutritionHint(), useIsDesktop(), useIsWide(), useMediaQuery()

### Community 68 - "counts.ts"
Cohesion: 0.05
Nodes (54): bannerFormData(), bannerKeys, bannerMutations, BannerNote, BannerRecord, CreateBannerInput, fetchBannerById(), fetchBanners() (+46 more)

### Community 71 - "copy-vkid-sdk.mjs"
Cohesion: 0.33
Nodes (4): dest, destDir, root, src

### Community 73 - "invalidateProductRatings"
Cohesion: 0.38
Nodes (7): invalidateProductRatings(), useCreateReview(), useDeleteReview(), useToggleReviewPublished(), useUpdateReview(), ReviewForm(), ReviewsSection()

## Knowledge Gaps
- **366 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+361 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `compress-image.ts` to `HomePage.tsx`, `selectors.ts`, `formatPrice`, `category/api.ts`, `crud.ts`, `ProductEditor.tsx`, `@radix-ui/react-dialog`, `cn`, `banner/api.ts`, `tailwind-merge`, `@tanstack/react-query`, `AdminSidebar.tsx`, `product/model.ts`, `StickyBar.tsx`, `DesktopHome.tsx`, `cn.ts`, `customer/api.ts`, `OrdersSection.tsx`, `useAdminAuth`, `AdminPage.tsx`, `site.ts`, `store.ts`, `ProductPage.tsx`, `@radix-ui/react-slot`, `crud.ts`, `FloatingActions.tsx`, `counts.ts`?**
  _High betweenness centrality (0.139) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `files.ts`, `sonner`, `CartTotals.tsx`, `addons.ts`, `class-variance-authority`, `@radix-ui/react-popover`, `tailwind-merge`, `lucide-react`, `pocketbase`, `package.json`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Why does `VitrineScrollProvider()` connect `selectors.ts` to `dependencies`, `site.ts`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `ProductEditor()` (e.g. with `e()` and `n()`) actually correct?**
  _`ProductEditor()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _366 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `HomePage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13105413105413105 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._