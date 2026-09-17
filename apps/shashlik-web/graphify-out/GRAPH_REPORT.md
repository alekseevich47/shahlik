# Graph Report - shashlik-web  (2026-09-17)

## Corpus Check
- 246 files · ~227,534 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1540 nodes · 4396 edges · 75 communities (67 shown, 8 thin omitted)
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
- mapFrontpadSettings
- files.ts
- getAccount
- counts.ts
- sonner
- CartTotals.tsx
- copy-vkid-sdk.mjs
- tailwind-merge
- class-variance-authority
- @radix-ui/react-popover
- @radix-ui/react-tooltip

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

## Communities (75 total, 8 thin omitted)

### Community 0 - "HomePage.tsx"
Cohesion: 0.10
Nodes (24): useAccount(), fetchBonus(), submitReferral(), useProfileBonus(), isActiveOrderStatus(), formatAddressLine(), AddressCard(), AddressesTab() (+16 more)

### Community 1 - "dependencies"
Cohesion: 0.10
Nodes (21): clsx, lucide-react, motion, dependencies, clsx, lucide-react, motion, @radix-ui/react-dialog (+13 more)

### Community 2 - "selectors.ts"
Cohesion: 0.13
Nodes (26): createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchAdminProducts(), fetchProductById() (+18 more)

### Community 4 - "cn"
Cohesion: 0.05
Nodes (73): OrderStatus, applyPricesJobKeys, asNumberList(), asStatusMap(), asStringList(), enqueueApplyPricesJob(), enqueueSyncJob(), fetchActiveSyncJobs() (+65 more)

### Community 5 - "CatalogTables.tsx"
Cohesion: 0.08
Nodes (37): adminReviewKeys, buildOrdersFilter(), createOrder(), CreateReviewInput, fetchAdminReviews(), fetchMyOrders(), fetchOrderById(), fetchOrders() (+29 more)

### Community 6 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, sharp, tailwindcss, @tailwindcss/vite, tw-animate-css, @types/node, @types/react, @types/react-dom (+15 more)

### Community 7 - "compilerOptions"
Cohesion: 0.07
Nodes (26): DOM, DOM.Iterable, ES2023, node, src, vite/client, vite.config.ts, compilerOptions (+18 more)

### Community 8 - "CustomerDrawer.tsx"
Cohesion: 0.05
Nodes (77): AccountAuth, AccountContext, AccountProvider(), isAbortError(), refreshAuth(), acceptAuthToken(), accountCacheKey(), accountKeys (+69 more)

### Community 9 - "formatPrice"
Cohesion: 0.16
Nodes (16): BadgeInput, badgeKeys, badgeMutations, BadgeRecord, fetchBadges(), mapBadge(), seedFallback(), useCreateBadge() (+8 more)

### Community 10 - "category/api.ts"
Cohesion: 0.10
Nodes (29): fetchActiveResendJobs(), useOrderJobs(), FrontpadJob, FrontpadJobKind, FrontpadJobStatus, isFrontpadWarning(), Order, ORDER_STATUS_FLOW (+21 more)

### Community 13 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 14 - "banner/api.ts"
Cohesion: 0.17
Nodes (18): calcCouponDiscount(), articleFor(), cartLineTitle(), findSize(), findVariant(), needsChooser(), nutritionForPortion(), nutritionOf() (+10 more)

### Community 15 - "product/model.ts"
Cohesion: 0.27
Nodes (8): isAddonStopped(), ResolvedLine, BonusEarnHint(), BonusEarnHintProps, CartLineRow(), CartLineRowProps, CartLineTitle(), CartLineTitleProps

### Community 16 - "AdminPage.tsx"
Cohesion: 0.27
Nodes (14): useMyOrders(), canUseStorage(), getLatestLocalOrderId(), isStoredOrder(), listLocalOrderIds(), load(), prune(), rememberLocalOrder() (+6 more)

### Community 17 - "products.ts"
Cohesion: 0.07
Nodes (29): ALL_CATEGORY, CategoryId, KNOWN_CATEGORY_IDS, KnownCategoryId, mapRating(), criterionScore(), criterionStars(), MeatIcon (+21 more)

### Community 18 - "crud.ts"
Cohesion: 0.06
Nodes (47): App(), applyQuality(), GraphicsContext, GraphicsContextValue, GraphicsProvider(), GraphicsQuality, readInitialQuality(), useGraphics() (+39 more)

### Community 19 - "ProductEditor.tsx"
Cohesion: 0.12
Nodes (28): useCustomerLedger(), buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams, CustomersPageResult (+20 more)

### Community 20 - "package.json"
Cohesion: 0.29
Nodes (7): scripts, build, copy:vk-sdk, dev, gen:pwa-icons, preview, typecheck

### Community 21 - "coupon/api.ts"
Cohesion: 0.13
Nodes (28): useActivityLogsPage(), useDeleteAddon(), AddonKind, COLUMNS, LogsSection(), AddonsSection(), KIND_FILTERS, STATUS_FILTERS (+20 more)

### Community 22 - "lucide-react"
Cohesion: 0.15
Nodes (17): addonKeys, addonMutations, AddonRecord, CreateAddonInput, fetchAddonById(), fetchAddonsByKind(), fetchExtras(), fetchSauces() (+9 more)

### Community 23 - "@radix-ui/react-dialog"
Cohesion: 0.13
Nodes (21): buildSeries(), buildTopProducts(), countByFilter(), DashboardData, dashboardKeys, DashboardSection(), dayKey(), fetchDashboard() (+13 more)

### Community 24 - "cn"
Cohesion: 0.27
Nodes (9): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+1 more)

### Community 25 - "banner/api.ts"
Cohesion: 0.44
Nodes (7): cellNutrition(), defaultNutritionFromSizes(), setCellNutrition(), ProductSize, ProductVariant, NutritionMatrix(), Props

### Community 26 - "tailwind-merge"
Cohesion: 0.13
Nodes (19): AppliedCoupon, CreateOrderInput, useCreateOrder(), DeliveryMode, OrderAddressParts, AddPayload, CartAddon, CartItem (+11 more)

### Community 27 - "@tanstack/react-query"
Cohesion: 0.23
Nodes (17): useBadges(), badgeLabel(), minPrice(), isProductStopped(), useStoppedArticles(), ProductCard(), ProductCardProps, ProductCardCompact() (+9 more)

### Community 28 - "zustand"
Cohesion: 0.40
Nodes (4): name, private, type, version

### Community 29 - "AdminSidebar.tsx"
Cohesion: 0.22
Nodes (11): CategoryIcon(), Props, fetchSettings(), mapSettings(), useSettings(), settingsFallback(), CheckoutDialog(), MobileHome() (+3 more)

### Community 30 - "staff/api.ts"
Cohesion: 0.08
Nodes (31): CreateStaffInput, fetchStaff(), mapStaff(), mapStaffRequired(), staffKeys, StaffMember, staffMutations, StaffRecord (+23 more)

### Community 31 - "product/model.ts"
Cohesion: 0.15
Nodes (15): clampScroll(), Edges, EdgeSide, prefersReducedMotion(), readEdges(), stepScrollLeft(), useScrollEdgeCues(), Glass() (+7 more)

### Community 32 - "StickyBar.tsx"
Cohesion: 0.19
Nodes (12): useCreateBanner(), useDeleteBanner(), useUpdateBanner(), Banner, banners, BannerForm(), Props, BannersSection() (+4 more)

### Community 33 - "DesktopHome.tsx"
Cohesion: 0.37
Nodes (11): useAccount(), fetchPublicBonusSettings(), usePublicBonusSettings(), publicBonusSettingsFallback(), useCartStore, CartPanel(), MODE_OPTIONS, CartPromo() (+3 more)

### Community 34 - "AddonForm.tsx"
Cohesion: 0.19
Nodes (17): productKeys, useProducts(), DEFAULT_CRITERIA, CriteriaScores, fetchRatedProductIds(), ratingKeys, ratingSubmitError(), submitProductRating() (+9 more)

### Community 35 - "cn.ts"
Cohesion: 0.19
Nodes (16): fetchSizeTemplates(), mapSizeTemplate(), seedFallback(), SizeTemplateInput, sizeTemplateKeys, sizeTemplateMutations, SizeTemplateRecord, useCreateSizeTemplate() (+8 more)

### Community 36 - "customer/api.ts"
Cohesion: 0.14
Nodes (14): useCartTotals(), CartToggle(), formatOrderSum(), Props, CheckoutPromoField(), ThemeToggle(), FloatingActions(), Props (+6 more)

### Community 37 - "OrdersSection.tsx"
Cohesion: 0.40
Nodes (4): outDir, root, sizes, srcPath

### Community 38 - "useAdminAuth"
Cohesion: 0.22
Nodes (9): imagesDarkFromProduct(), imagesFromProduct(), matchedTemplateId(), MEAT_OPTIONS, newId(), PreviewToggle(), ProductEditor(), Props (+1 more)

### Community 39 - "NutritionHint.tsx"
Cohesion: 0.18
Nodes (11): useCategories(), CartPanelState, useCartPanelStore, CartDock(), CatalogSection, DesktopHome(), Props, Options (+3 more)

### Community 40 - "button.tsx"
Cohesion: 0.11
Nodes (24): adjustBonus(), bonusKeys, BonusSettingsRecord, bulkSetBonusPercent(), fetchBonusSettings(), fetchCustomerLedger(), LedgerRecord, mapLedger() (+16 more)

### Community 41 - "lucide-react"
Cohesion: 0.23
Nodes (16): claimPwaInstallBonus(), detectInstallPlatform(), dismissPwaForever(), isPwaDismissedForever(), isPwaSoftCooldownActive(), isStandaloneDisplay(), markPwaInstalledOnDevice(), markPwaSoftDismissed() (+8 more)

### Community 42 - "react-dom"
Cohesion: 0.24
Nodes (11): useAdminReviews(), useDeleteReview(), useToggleReviewPublished(), ProductOption, ReviewFormProps, ReviewsSection(), STATUS_FILTERS, formatDate() (+3 more)

### Community 43 - "AdminPage.tsx"
Cohesion: 0.27
Nodes (8): SectionStub(), ADMIN_NAV, AdminNavItem, AdminRole, AdminSectionId, AdminSidebar(), PILL, Props

### Community 44 - "theme.tsx"
Cohesion: 0.14
Nodes (18): e(), e1(), e5(), e6(), eB(), eU(), n(), ns() (+10 more)

### Community 45 - "site.ts"
Cohesion: 0.15
Nodes (18): Category, HomeMobileTabBar(), catalogSectionId(), groupProductsByCategory(), Options, useCatalogScrollSpy(), useVitrineScroll(), CatalogCategorySection() (+10 more)

### Community 46 - "compress-image.ts"
Cohesion: 0.08
Nodes (27): SumRow(), FreshStamp(), STAMP_GLYPHS, cn(), Chip(), ChipProps, OptionCard(), OptionCardProps (+19 more)

### Community 47 - "lucide-react"
Cohesion: 0.15
Nodes (12): Addon, addons, extras, IMG, sauces, AddonRow(), formatWeight(), Props (+4 more)

### Community 48 - "react-easy-crop"
Cohesion: 0.33
Nodes (7): orderKeys, subscribeOrderStatus(), usePublicOrder(), repeatOrderIntoCart(), useLiveOrder(), OrderTrackPage(), RepeatButton()

### Community 49 - "sonner"
Cohesion: 0.20
Nodes (11): useCreateCategory(), useDeleteCategory(), useUpdateCategory(), loadDomMax(), CategoriesSection(), CategoryForm(), Props, CATEGORY_ICONS (+3 more)

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
Cohesion: 0.11
Nodes (30): useFrontpadStockArticles(), articleConflictMessage(), ArticleExclude, ArticleRef, cellLabel(), collectArticleConflicts(), isExcludedCell(), priceOf() (+22 more)

### Community 55 - "ProductPage.tsx"
Cohesion: 0.29
Nodes (8): fetchAddons(), useFrontpadStockRealtime(), CheckoutDialogState, useCheckoutDialogStore, HomePage(), PdpChromeState, usePdpChromeStore, MobileTab

### Community 57 - "surface.tsx"
Cohesion: 0.48
Nodes (6): calcBonusSpendCap(), calcCartEarn(), calcLineEarn(), clampPercent(), EarnLineInput, resolveEarnPercent()

### Community 58 - "coupon/api.ts"
Cohesion: 0.12
Nodes (26): checkPromo(), couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail (+18 more)

### Community 59 - "category/api.ts"
Cohesion: 0.22
Nodes (9): i(), nu(), o1(), oB(), oc(), od(), oi(), oz() (+1 more)

### Community 60 - "@radix-ui/react-slot"
Cohesion: 0.25
Nodes (8): AdminLogin(), AdminTopbar(), AdminTopbarProps, fetchNewOrdersCount(), newOrdersKey, useAdminAuth(), queryClient, QueryKey

### Community 61 - "crud.ts"
Cohesion: 0.09
Nodes (23): AddressSection(), AddressSectionProps, CheckoutDialogProps, PAYMENT_OPTIONS, CheckoutModeToggle(), CheckoutModeToggleProps, OPTIONS, CheckoutPromoFieldProps (+15 more)

### Community 62 - "FloatingActions.tsx"
Cohesion: 0.14
Nodes (21): useAddons(), useExtras(), useSauces(), frontpadStockKeys, useProductBySlug(), PRODUCT_ASPECT_RATIO, compositionOf(), fetchStoppedArticles() (+13 more)

### Community 65 - "mapFrontpadSettings"
Cohesion: 0.25
Nodes (8): a(), r(), tf(), tg(), to(), tr(), tW(), tz()

### Community 66 - "files.ts"
Cohesion: 0.16
Nodes (15): BANNER_ASPECT_RATIO, canvasToBlob(), CropArea, cropImageToFile(), loadImage(), readImageSize(), ALLOWED, BannerImageField() (+7 more)

### Community 67 - "getAccount"
Cohesion: 0.31
Nodes (8): useDeleteProduct(), hasMissingArticle(), applyFilteredReorder(), ProductsSection(), STATUS_FILTERS, move(), Props, SortableList()

### Community 68 - "counts.ts"
Cohesion: 0.17
Nodes (15): createBody(), updateBody(), bannerFormData(), bannerKeys, bannerMutations, BannerNote, BannerRecord, CreateBannerInput (+7 more)

### Community 69 - "sonner"
Cohesion: 0.26
Nodes (10): filenamesOf(), FileRecord, imageFilenames(), imageUrl(), imageUrls(), ToFormDataOptions, canvasToBlob(), compressImage() (+2 more)

### Community 70 - "CartTotals.tsx"
Cohesion: 0.12
Nodes (24): useCreateAddon(), useUpdateAddon(), useAdminProducts(), CartPromoProps, ProductEditorRoute(), AddonForm(), Props, DEFAULT_NUTRITION (+16 more)

### Community 71 - "copy-vkid-sdk.mjs"
Cohesion: 0.33
Nodes (4): dest, destDir, root, src

## Knowledge Gaps
- **390 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+385 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `compress-image.ts` to `HomePage.tsx`, `cn`, `formatPrice`, `category/api.ts`, `product/model.ts`, `products.ts`, `crud.ts`, `coupon/api.ts`, `@radix-ui/react-dialog`, `banner/api.ts`, `@tanstack/react-query`, `AdminSidebar.tsx`, `product/model.ts`, `StickyBar.tsx`, `DesktopHome.tsx`, `cn.ts`, `customer/api.ts`, `useAdminAuth`, `NutritionHint.tsx`, `AdminPage.tsx`, `site.ts`, `lucide-react`, `sonner`, `store.ts`, `coupon/api.ts`, `crud.ts`, `FloatingActions.tsx`, `files.ts`, `getAccount`, `CartTotals.tsx`?**
  _High betweenness centrality (0.127) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `tailwind-merge`, `pocketbase`, `class-variance-authority`, `selectors.ts`, `@radix-ui/react-popover`, `@radix-ui/react-tooltip`, `Sidebar.tsx`, `zustand`, `@radix-ui/react-tooltip`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **Why does `VitrineScrollProvider()` connect `selectors.ts` to `ProductPage.tsx`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `ProductEditor()` (e.g. with `e()` and `n()`) actually correct?**
  _`ProductEditor()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _390 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `HomePage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10052910052910052 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._