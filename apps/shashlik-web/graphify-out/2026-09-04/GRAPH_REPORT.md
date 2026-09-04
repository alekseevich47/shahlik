# Graph Report - shashlik-web  (2026-09-04)

## Corpus Check
- 205 files · ~190,657 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1405 nodes · 3914 edges · 81 communities (71 shown, 10 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 130 edges (avg confidence: 0.55)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0f23721c`
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
- files.ts
- getAccount
- counts.ts
- sonner
- select.tsx
- copy-vkid-sdk.mjs
- addons.ts
- size-template/model.ts
- invalidateProductRatings
- MobileTabBar.tsx
- clsx
- lucide-react
- motion
- @radix-ui/react-dialog
- react-router-dom

## God Nodes (most connected - your core abstractions)
1. `cn()` - 142 edges
2. `formatPrice()` - 52 edges
3. `Button()` - 45 edges
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

## Communities (81 total, 10 thin omitted)

### Community 0 - "HomePage.tsx"
Cohesion: 0.13
Nodes (24): submitReferral(), fetchMyOrders(), useMyOrders(), isActiveOrderStatus(), canUseStorage(), getLatestLocalOrderId(), isStoredOrder(), listLocalOrderIds() (+16 more)

### Community 1 - "dependencies"
Cohesion: 0.11
Nodes (19): class-variance-authority, lenis, dependencies, class-variance-authority, lenis, @radix-ui/react-popover, @radix-ui/react-slot, @radix-ui/react-tooltip (+11 more)

### Community 2 - "selectors.ts"
Cohesion: 0.09
Nodes (36): adminProductKeys, createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchAdminProducts() (+28 more)

### Community 4 - "cn"
Cohesion: 0.05
Nodes (76): OrderStatus, ApplyPricesJobResult, asRowList(), buildCells(), CashPriceCell, CashPricePlan, CashPriceStatus, cellDelta() (+68 more)

### Community 5 - "CatalogTables.tsx"
Cohesion: 0.10
Nodes (29): adminReviewKeys, buildOrdersFilter(), createOrder(), CreateOrderInput, CreateReviewInput, fetchActiveResendJobs(), fetchAdminReviews(), fetchOrders() (+21 more)

### Community 6 - "devDependencies"
Cohesion: 0.10
Nodes (21): devDependencies, tailwindcss, @tailwindcss/vite, tw-animate-css, @types/node, @types/react, @types/react-dom, typescript (+13 more)

### Community 7 - "compilerOptions"
Cohesion: 0.07
Nodes (26): DOM, DOM.Iterable, ES2023, node, src, vite/client, vite.config.ts, compilerOptions (+18 more)

### Community 8 - "CustomerDrawer.tsx"
Cohesion: 0.11
Nodes (39): accountCacheKey(), accountKeys, addAddress(), asId(), asString(), BonusResponse, getAccount(), isAppUserRecord() (+31 more)

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
Cohesion: 0.18
Nodes (14): GuardedSection(), AdminAuth, AdminAuthContext, AdminAuthProvider(), can(), isAbortError(), isStaffRecord(), MANAGER_UPDATE (+6 more)

### Community 15 - "product/model.ts"
Cohesion: 0.15
Nodes (22): checkPromo(), AppliedCoupon, calcCouponDiscount(), formatCouponValue(), addonFromCache(), CartTotals, productFromCache(), ResolvedAddon (+14 more)

### Community 16 - "AdminPage.tsx"
Cohesion: 0.19
Nodes (14): AccountAuth, AccountContext, AccountProvider(), isAbortError(), refreshAuth(), useAccount(), acceptAuthToken(), getClientAuthEpoch() (+6 more)

### Community 17 - "products.ts"
Cohesion: 0.10
Nodes (21): ALL_CATEGORY, CategoryId, KNOWN_CATEGORY_IDS, KnownCategoryId, needsChooser(), DEFAULT_CRITERIA, MeatIcon, Product (+13 more)

### Community 18 - "crud.ts"
Cohesion: 0.19
Nodes (14): AdminLogin(), AdminPage(), AdminTopbar(), AdminTopbarProps, fetchNewOrdersCount(), newOrdersKey, PhoneOnboardingProps, authErrorMessage() (+6 more)

### Community 19 - "ProductEditor.tsx"
Cohesion: 0.07
Nodes (46): adjustBonus(), bonusKeys, BonusSettingsRecord, bulkSetBonusPercent(), fetchBonusSettings(), fetchCustomerLedger(), LedgerRecord, mapLedger() (+38 more)

### Community 20 - "package.json"
Cohesion: 0.18
Nodes (10): name, private, scripts, build, copy:vk-sdk, dev, preview, typecheck (+2 more)

### Community 21 - "coupon/api.ts"
Cohesion: 0.15
Nodes (21): completeVkOneTap(), createVkOneTapSession(), resolveVkAppId(), attachVkOneTap(), detachVkOneTap(), isBenignVkError(), mountWidget(), remountWidget() (+13 more)

### Community 22 - "lucide-react"
Cohesion: 0.16
Nodes (21): addonKeys, addonMutations, AddonRecord, CreateAddonInput, createBody(), fetchAddonById(), fetchAddons(), fetchAddonsByKind() (+13 more)

### Community 23 - "@radix-ui/react-dialog"
Cohesion: 0.13
Nodes (21): buildSeries(), buildTopProducts(), countByFilter(), DashboardData, dashboardKeys, DashboardSection(), dayKey(), fetchDashboard() (+13 more)

### Community 24 - "cn"
Cohesion: 0.13
Nodes (19): useCreateProduct(), ProductNutrition, DEFAULT_NUTRITION, ProductCreateForm(), Props, CYR_MAP, slugFromName(), ALLOWED (+11 more)

### Community 25 - "banner/api.ts"
Cohesion: 0.22
Nodes (16): useBadges(), badgeLabel(), PRODUCT_ASPECT_RATIO, minPrice(), fetchStoppedArticles(), isProductStopped(), useStoppedArticles(), ProductCard() (+8 more)

### Community 26 - "tailwind-merge"
Cohesion: 0.22
Nodes (14): useFrontpadStockArticles(), articleConflictMessage(), ArticleExclude, ArticleRef, cellLabel(), collectArticleConflicts(), isExcludedCell(), priceOf() (+6 more)

### Community 28 - "zustand"
Cohesion: 0.18
Nodes (13): bannerKeys, bannerMutations, BannerRecord, CreateBannerInput, fetchBannerById(), fetchBanners(), mapBanner(), UpdateBannerInput (+5 more)

### Community 29 - "AdminSidebar.tsx"
Cohesion: 0.11
Nodes (14): DeliveryMode, CheckoutDialogProps, PAYMENT_OPTIONS, CheckoutModeToggle(), CheckoutModeToggleProps, OPTIONS, BADGES, CheckoutTrustBadges() (+6 more)

### Community 30 - "staff/api.ts"
Cohesion: 0.17
Nodes (18): CreateStaffInput, fetchStaff(), mapStaff(), mapStaffRequired(), staffKeys, StaffMember, staffMutations, StaffRecord (+10 more)

### Community 31 - "product/model.ts"
Cohesion: 0.21
Nodes (8): catalogSectionId(), CatalogCategorySection(), Props, ChipProps, OptionCard(), OptionCardProps, Props, STICKY_BAR

### Community 32 - "StickyBar.tsx"
Cohesion: 0.17
Nodes (24): KIND_FILTERS, STATUS_FILTERS, STATUS_FILTERS, PriceRow, ROW_FILTERS, STATUS_LABEL, STATUS_FILTERS, Column (+16 more)

### Community 33 - "DesktopHome.tsx"
Cohesion: 0.18
Nodes (11): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+3 more)

### Community 34 - "AddonForm.tsx"
Cohesion: 0.16
Nodes (24): useExtras(), useSauces(), articleFor(), cartLineTitle(), compositionOf(), findSize(), findVariant(), nutritionForPortion() (+16 more)

### Community 35 - "cn.ts"
Cohesion: 0.16
Nodes (11): repeatOrderIntoCart(), useLiveOrder(), OrderTrackPage(), RepeatButton(), LoginPanel(), VkOneTap(), VkOneTapProps, BADGE_LABEL (+3 more)

### Community 36 - "customer/api.ts"
Cohesion: 0.18
Nodes (10): useTheme(), CartToggle(), formatOrderSum(), Props, ThemeToggle(), FloatingActions(), Props, TONE (+2 more)

### Community 37 - "OrdersSection.tsx"
Cohesion: 0.09
Nodes (22): App(), readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), AdminGate(), AdminLogin (+14 more)

### Community 38 - "useAdminAuth"
Cohesion: 0.17
Nodes (16): cellNutrition(), defaultNutritionFromSizes(), setCellNutrition(), ProductSize, ProductVariant, imagesFromProduct(), matchedTemplateId(), MEAT_OPTIONS (+8 more)

### Community 39 - "NutritionHint.tsx"
Cohesion: 0.14
Nodes (12): CartPanelState, useCartPanelStore, CartDock(), loadDomMax(), CatalogSection, DesktopHome(), GRID_LAYOUT_TRANSITION, loadDomMax() (+4 more)

### Community 40 - "button.tsx"
Cohesion: 0.23
Nodes (8): ResolvedLine, CartLineTitle(), CartLineTitleProps, CheckoutLineRow(), SIZES, StepBtn(), Stepper(), StepperProps

### Community 41 - "lucide-react"
Cohesion: 0.23
Nodes (11): CategoryIcon(), Props, fetchSettings(), mapSettings(), useSettings(), settingsFallback(), CheckoutDialog(), AddressBar() (+3 more)

### Community 42 - "react-dom"
Cohesion: 0.18
Nodes (16): fetchTags(), mapTag(), TagInput, tagKeys, tagMutations, TagRecord, tagsForCategory(), useCategoryTags() (+8 more)

### Community 43 - "AdminPage.tsx"
Cohesion: 0.22
Nodes (12): useCustomersPage(), useAdminProducts(), ProductEditorRoute(), SectionStub(), ADMIN_NAV, AdminNavItem, AdminRole, AdminSectionId (+4 more)

### Community 44 - "theme.tsx"
Cohesion: 0.14
Nodes (18): e(), e1(), e5(), e6(), eB(), eU(), n(), ns() (+10 more)

### Community 45 - "site.ts"
Cohesion: 0.19
Nodes (14): useCategories(), useProducts(), CheckoutDialogState, useCheckoutDialogStore, SearchDialog(), SearchDialogProps, HomePage(), groupProductsByCategory() (+6 more)

### Community 46 - "compress-image.ts"
Cohesion: 0.24
Nodes (13): fetchSizeTemplates(), mapSizeTemplate(), seedFallback(), SizeTemplateInput, sizeTemplateKeys, sizeTemplateMutations, SizeTemplateRecord, useCreateSizeTemplate() (+5 more)

### Community 47 - "lucide-react"
Cohesion: 0.19
Nodes (11): HomeMobileTabBar(), Options, useCatalogScrollSpy(), LENIS_OPTIONS, Props, ScrollOptions, useVitrineScroll(), VitrineScrollApi (+3 more)

### Community 48 - "react-easy-crop"
Cohesion: 0.28
Nodes (6): fetchOrderById(), fetchPublicOrder(), orderKeys, usePublicOrder(), queryClient, QueryKey

### Community 49 - "sonner"
Cohesion: 0.14
Nodes (18): useDeleteAddon(), useDeleteBanner(), useCreateCategory(), useDeleteCategory(), useUpdateCategory(), AddonsSection(), BannersSection(), CategoriesSection() (+10 more)

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
Cohesion: 0.25
Nodes (7): BannerNote, useCreateBanner(), useUpdateBanner(), Banner, banners, BannerForm(), Props

### Community 54 - "store.ts"
Cohesion: 0.18
Nodes (14): fetchBonus(), useAccount(), useProfileBonus(), useCreateOrder(), OrderAddressParts, formatAddressLine(), PaymentMethod, savedToParts() (+6 more)

### Community 56 - "zustand"
Cohesion: 0.27
Nodes (9): canvasToBlob(), CropArea, cropImageToFile(), loadImage(), readImageSize(), ALLOWED, BannerImageField(), formatMb() (+1 more)

### Community 57 - "coupon/api.ts"
Cohesion: 0.17
Nodes (12): couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail, PromoCheckOk (+4 more)

### Community 58 - "coupon/api.ts"
Cohesion: 0.15
Nodes (13): useCoupons(), useCreateCoupon(), useDeleteCoupon(), useUpdateCoupon(), CouponForm(), KIND_OPTIONS, Props, toDateInput() (+5 more)

### Community 59 - "category/api.ts"
Cohesion: 0.22
Nodes (9): i(), nu(), o1(), oB(), oc(), od(), oi(), oz() (+1 more)

### Community 60 - "CashPricesPanel.tsx"
Cohesion: 0.31
Nodes (6): ALL_TAG, CategoryTag, TagFilterId, productTags, Props, SPRING

### Community 61 - "crud.ts"
Cohesion: 0.24
Nodes (11): useAdminReviews(), useDeleteReview(), useToggleReviewPublished(), ProductOption, ReviewFormProps, ReviewsSection(), STATUS_FILTERS, formatDate() (+3 more)

### Community 62 - "FloatingActions.tsx"
Cohesion: 0.12
Nodes (20): CartTotalsProps, SumRow(), PreviewToggle(), FreshStamp(), STAMP_GLYPHS, cn(), ConfirmDialog(), IconInput() (+12 more)

### Community 63 - "Sidebar.tsx"
Cohesion: 0.28
Nodes (8): collectionMutations(), CollectionMutationsConfig, FIELD_CODE_RU, invalidate(), listKeys(), MutationKeys, QueryKey, syncDetail()

### Community 64 - "OrderDetails.tsx"
Cohesion: 0.28
Nodes (12): useOrder(), useOrderJobs(), useResendOrder(), useUpdateOrderStatus(), isFrontpadWarning(), formatAddress(), moneyRow(), OrderDrawer() (+4 more)

### Community 65 - "mapFrontpadSettings"
Cohesion: 0.25
Nodes (8): a(), r(), tf(), tg(), to(), tr(), tW(), tz()

### Community 66 - "files.ts"
Cohesion: 0.22
Nodes (13): bannerFormData(), filenamesOf(), FileRecord, imageFilenames(), imageUrl(), imageUrls(), toFormData(), ToFormDataOptions (+5 more)

### Community 67 - "getAccount"
Cohesion: 0.43
Nodes (5): formatGrams(), NutritionHint(), useIsDesktop(), useIsWide(), useMediaQuery()

### Community 68 - "counts.ts"
Cohesion: 0.40
Nodes (5): adminCountKeys, AdminCounts, fetchAdminCounts(), useAdminCounts(), pb

### Community 70 - "select.tsx"
Cohesion: 0.38
Nodes (5): PopoverContent(), OptionData, parseOptions(), Select(), SelectProps

### Community 71 - "copy-vkid-sdk.mjs"
Cohesion: 0.33
Nodes (4): dest, destDir, root, src

### Community 72 - "addons.ts"
Cohesion: 0.33
Nodes (4): addons, extras, IMG, sauces

### Community 73 - "size-template/model.ts"
Cohesion: 0.60
Nodes (3): DEFAULT_SIZE_TEMPLATES, SizeTemplate, SIZE_TEMPLATES

### Community 74 - "invalidateProductRatings"
Cohesion: 0.67
Nodes (4): invalidateProductRatings(), useCreateReview(), useUpdateReview(), ReviewForm()

### Community 75 - "MobileTabBar.tsx"
Cohesion: 0.50
Nodes (3): MobileTabBar(), Props, TABS

## Knowledge Gaps
- **362 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+357 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `FloatingActions.tsx` to `HomePage.tsx`, `selectors.ts`, `cn`, `formatPrice`, `category/api.ts`, `product/model.ts`, `crud.ts`, `@radix-ui/react-dialog`, `cn`, `banner/api.ts`, `tailwind-merge`, `zustand`, `AdminSidebar.tsx`, `product/model.ts`, `StickyBar.tsx`, `AddonForm.tsx`, `customer/api.ts`, `OrdersSection.tsx`, `useAdminAuth`, `button.tsx`, `lucide-react`, `react-dom`, `AdminPage.tsx`, `site.ts`, `compress-image.ts`, `sonner`, `store.ts`, `zustand`, `coupon/api.ts`, `CashPricesPanel.tsx`, `select.tsx`, `MobileTabBar.tsx`?**
  _High betweenness centrality (0.128) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `sonner`, `clsx`, `lucide-react`, `motion`, `@radix-ui/react-dialog`, `react-router-dom`, `pocketbase`, `package.json`, `ProductPage.tsx`, `@tanstack/react-query`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **Why does `VitrineScrollProvider()` connect `lucide-react` to `dependencies`, `site.ts`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `ProductEditor()` (e.g. with `e()` and `n()`) actually correct?**
  _`ProductEditor()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _362 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `HomePage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13105413105413105 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._