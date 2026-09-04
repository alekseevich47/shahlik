# Graph Report - shashlik-web  (2026-08-26)

## Corpus Check
- 174 files · ~175,179 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1111 nodes · 3275 edges · 70 communities (60 shown, 10 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 81 edges (avg confidence: 0.54)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ef4c5e07`
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

## God Nodes (most connected - your core abstractions)
1. `cn()` - 119 edges
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
- `AdminGate()` --calls--> `useAdminAuth()`  [EXTRACTED]
  src/app/router.tsx → src/shared/api/auth.tsx
- `AdminAuthProvider()` --indirect_call--> `logout()`  [INFERRED]
  src/shared/api/auth.tsx → src/entities/account/api.ts
- `resolveBadgeLabel()` --calls--> `badgeLabel()`  [EXTRACTED]
  src/shared/config/site.ts → src/entities/badge/model.ts
- `useDuplicateProduct()` --indirect_call--> `product()`  [INFERRED]
  src/entities/product/api.ts → src/mocks/products.ts
- `collectArticleConflicts()` --indirect_call--> `product()`  [INFERRED]
  src/entities/product/lib/articles.ts → src/mocks/products.ts

## Import Cycles
- None detected.

## Communities (70 total, 10 thin omitted)

### Community 0 - "HomePage.tsx"
Cohesion: 0.20
Nodes (13): useMyOrders(), isActiveOrderStatus(), formatAddressLine(), getLatestLocalOrderId(), AddressCard(), CurrentOrderTab(), EmptyBlock(), GuestCurrentOrder() (+5 more)

### Community 1 - "dependencies"
Cohesion: 0.12
Nodes (17): class-variance-authority, clsx, lucide-react, motion, dependencies, class-variance-authority, clsx, lucide-react (+9 more)

### Community 2 - "selectors.ts"
Cohesion: 0.11
Nodes (28): adminProductKeys, createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchAdminProducts() (+20 more)

### Community 4 - "cn"
Cohesion: 0.12
Nodes (23): applyPricesJobKeys, enqueueApplyPricesJob(), fetchActiveSyncJobs(), fetchApplyPricesJobs(), fetchFrontpadStock(), fetchStoppedStock(), FrontpadJobRecord, FrontpadSettingsRecord (+15 more)

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
Cohesion: 0.15
Nodes (19): accountKeys, asId(), asString(), BonusResponse, linkPhone(), mapAddress(), mapAddresses(), mapAppUser() (+11 more)

### Community 9 - "formatPrice"
Cohesion: 0.06
Nodes (42): BadgeInput, badgeKeys, badgeMutations, BadgeRecord, fetchBadges(), mapBadge(), seedFallback(), useCreateBadge() (+34 more)

### Community 10 - "category/api.ts"
Cohesion: 0.15
Nodes (12): DeliveryMode, FrontpadJob, FrontpadJobKind, FrontpadJobStatus, ORDER_STATUS_FLOW, ORDER_STATUS_SOURCE_LABEL, OrderLineAddon, OrderStatusSource (+4 more)

### Community 13 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 14 - "banner/api.ts"
Cohesion: 0.20
Nodes (13): AdminAuth, AdminAuthContext, AdminAuthProvider(), authErrorMessage(), can(), isAbortError(), isStaffRecord(), MANAGER_UPDATE (+5 more)

### Community 15 - "product/model.ts"
Cohesion: 0.23
Nodes (14): useProducts(), useCartTotals(), useCartStore, CartPanel(), MODE_OPTIONS, CartPromo(), CartTotals(), CheckoutDialogState (+6 more)

### Community 16 - "AdminPage.tsx"
Cohesion: 0.20
Nodes (13): AccountAuth, AccountContext, AccountProvider(), isAbortError(), refreshAuth(), loginWithOAuth(), loginWithVkId(), logout() (+5 more)

### Community 17 - "products.ts"
Cohesion: 0.10
Nodes (20): SkuCell, DEFAULT_CRITERIA, MeatIcon, ProductBadge, ProductNutrition, ProductRating, ProductSize, ProductTag (+12 more)

### Community 18 - "crud.ts"
Cohesion: 0.22
Nodes (12): CheckoutDialogProps, MODE_OPTIONS, Props, DEFAULT_NUTRITION, Props, Button(), ButtonProps, buttonVariants (+4 more)

### Community 19 - "ProductEditor.tsx"
Cohesion: 0.12
Nodes (25): buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams, CustomersPageResult, fetchCustomerById() (+17 more)

### Community 20 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, preview, typecheck, type (+1 more)

### Community 21 - "coupon/api.ts"
Cohesion: 0.25
Nodes (8): useCreateCategory(), useUpdateCategory(), CategoryForm(), Props, CATEGORY_ICONS, CategoryIconPath, SheetContent(), SheetContentProps

### Community 22 - "lucide-react"
Cohesion: 0.12
Nodes (21): addonMutations, AddonRecord, CreateAddonInput, createBody(), fetchAddonById(), fetchAddons(), fetchAddonsByKind(), fetchExtras() (+13 more)

### Community 23 - "@radix-ui/react-dialog"
Cohesion: 0.11
Nodes (25): buildSeries(), buildTopProducts(), countByFilter(), DashboardData, dashboardKeys, DashboardSection(), dayKey(), fetchDashboard() (+17 more)

### Community 24 - "cn"
Cohesion: 0.11
Nodes (22): BANNER_ASPECT_RATIO, Props, canvasToBlob(), CropArea, cropImageToFile(), loadImage(), readImageSize(), ALLOWED (+14 more)

### Community 25 - "banner/api.ts"
Cohesion: 0.15
Nodes (21): useBadges(), badgeLabel(), PRODUCT_ASPECT_RATIO, minPrice(), isProductStopped(), ProductCard(), ProductCardProps, ProductCardCompact() (+13 more)

### Community 26 - "tailwind-merge"
Cohesion: 0.19
Nodes (16): useAddons(), useFrontpadStockArticles(), articleConflictMessage(), ArticleExclude, ArticleRef, cellLabel(), collectArticleConflicts(), isExcludedCell() (+8 more)

### Community 28 - "zustand"
Cohesion: 0.14
Nodes (19): bannerFormData(), bannerKeys, bannerMutations, BannerNote, BannerRecord, CreateBannerInput, fetchBannerById(), fetchBanners() (+11 more)

### Community 29 - "AdminSidebar.tsx"
Cohesion: 0.15
Nodes (12): OrderStatus, DEFAULT_STATUS_MAP, FrontpadSettings, FrontpadStockItem, PriceSource, Settings, BADGE_LABEL, ORDER_RULES (+4 more)

### Community 30 - "staff/api.ts"
Cohesion: 0.17
Nodes (19): CreateStaffInput, fetchStaff(), mapStaff(), mapStaffRequired(), staffKeys, StaffMember, staffMutations, StaffRecord (+11 more)

### Community 31 - "product/model.ts"
Cohesion: 0.18
Nodes (13): ALL_TAG, TagFilterId, Chip(), ChipProps, OptionCard(), OptionCardProps, Props, SPRING (+5 more)

### Community 32 - "StickyBar.tsx"
Cohesion: 0.17
Nodes (19): KIND_FILTERS, STATUS_FILTERS, PriceRow, ROW_FILTERS, STATUS_LABEL, Column, DataTable(), Props (+11 more)

### Community 33 - "DesktopHome.tsx"
Cohesion: 0.21
Nodes (12): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+4 more)

### Community 34 - "AddonForm.tsx"
Cohesion: 0.15
Nodes (23): useExtras(), useSauces(), cartLineTitle(), findSize(), findVariant(), fetchStoppedArticles(), isAddonStopped(), isSizeStopped() (+15 more)

### Community 35 - "cn.ts"
Cohesion: 0.21
Nodes (11): Order, ORDER_STATUS_LABEL, OrderLineSnapshot, repeatOrderIntoCart(), useLiveOrder(), formatAddress(), LineRow(), OrderDetails() (+3 more)

### Community 36 - "customer/api.ts"
Cohesion: 0.29
Nodes (7): useTheme(), CartToggle(), formatOrderSum(), Props, ThemeToggle(), Props, TONE

### Community 37 - "OrdersSection.tsx"
Cohesion: 0.09
Nodes (22): App(), readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), AdminGate(), AdminLogin (+14 more)

### Community 38 - "useAdminAuth"
Cohesion: 0.18
Nodes (18): articleFor(), ApplyPricesJobResult, asRowList(), buildCells(), CashPriceCell, CashPricePlan, CashPriceStatus, cellDelta() (+10 more)

### Community 39 - "NutritionHint.tsx"
Cohesion: 0.17
Nodes (12): CartPanelState, useCartPanelStore, CartDock(), DesktopHome(), Props, Options, useInView(), useIsDesktop() (+4 more)

### Community 40 - "button.tsx"
Cohesion: 0.24
Nodes (9): addonKeys, productKeys, addonFromCache(), CartTotals, productFromCache(), ResolvedAddon, ResolvedLine, resolveLine() (+1 more)

### Community 41 - "lucide-react"
Cohesion: 0.27
Nodes (12): fetchSettings(), mapSettings(), updateSettings(), useSettings(), useUpdateSettings(), settingsFallback(), CheckoutDialog(), parseNonNeg() (+4 more)

### Community 42 - "react-dom"
Cohesion: 0.47
Nodes (8): canUseStorage(), isStoredOrder(), listLocalOrderIds(), load(), prune(), rememberLocalOrder(), save(), StoredOrder

### Community 43 - "AdminPage.tsx"
Cohesion: 0.27
Nodes (8): SectionStub(), ADMIN_NAV, AdminNavItem, AdminRole, AdminSectionId, AdminSidebar(), PILL, Props

### Community 44 - "theme.tsx"
Cohesion: 0.17
Nodes (15): useDeleteAddon(), useAdminProducts(), useDeleteProduct(), useToggleProductActive(), useUpdateProduct(), GuardedSection(), loadDomMax(), ProductEditorRoute() (+7 more)

### Community 45 - "site.ts"
Cohesion: 0.21
Nodes (11): needsChooser(), Product, useAddProduct(), catalogSectionId(), groupProductsByCategory(), Options, useCatalogScrollSpy(), CatalogCategorySection() (+3 more)

### Community 47 - "lucide-react"
Cohesion: 0.25
Nodes (6): ALL_CATEGORY, Category, CategoryId, KNOWN_CATEGORY_IDS, KnownCategoryId, categories

### Community 48 - "react-easy-crop"
Cohesion: 0.36
Nodes (5): orderKeys, AdminTopbar(), fetchNewOrdersCount(), newOrdersKey, queryClient

### Community 49 - "sonner"
Cohesion: 0.21
Nodes (12): useDeleteBanner(), useDeleteCategory(), BannersSection(), CategoriesSection(), EmptyState(), Props, move(), Props (+4 more)

### Community 50 - "invalidateProductRatings"
Cohesion: 0.47
Nodes (5): useAccount(), acceptAuthToken(), AuthCallbackPage(), AddressesTab(), DataTab()

### Community 54 - "store.ts"
Cohesion: 0.15
Nodes (14): fetchBonus(), subscribeAccount(), useAccount(), useProfileBonus(), useCreateOrder(), OrderAddressParts, AddPayload, CartAddon (+6 more)

### Community 57 - "coupon/api.ts"
Cohesion: 0.15
Nodes (14): couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail, PromoCheckOk (+6 more)

### Community 58 - "coupon/api.ts"
Cohesion: 0.14
Nodes (17): useCreateCoupon(), frontpadSettingsKeys, CouponForm(), KIND_OPTIONS, Props, toDateInput(), parseDigitCodes(), PRICE_SOURCE_OPTIONS (+9 more)

### Community 59 - "category/api.ts"
Cohesion: 0.20
Nodes (11): checkPromo(), enqueueSyncJob(), updateFrontpadSettings(), useEnqueueSyncJob(), useUpdateFrontpadSettings(), formatRemaining(), FrontpadPanel(), productsSyncGate() (+3 more)

### Community 60 - "CashPricesPanel.tsx"
Cohesion: 0.29
Nodes (10): useCoupons(), useDeleteCoupon(), useUpdateCoupon(), formatCouponValue(), CouponsSection(), STATUS_FILTERS, formatDate(), formatScore10() (+2 more)

### Community 61 - "crud.ts"
Cohesion: 0.29
Nodes (11): invalidateProductRatings(), useAdminReviews(), useCreateReview(), useDeleteReview(), useToggleReviewPublished(), useUpdateReview(), ProductOption, ReviewForm() (+3 more)

### Community 62 - "FloatingActions.tsx"
Cohesion: 0.13
Nodes (19): SumRow(), FreshStamp(), STAMP_GLYPHS, cn(), ConfirmDialog(), Modal(), ModalProps, PopoverContent() (+11 more)

### Community 63 - "Sidebar.tsx"
Cohesion: 0.40
Nodes (3): CategoryIcon(), Props, SidebarProps

### Community 64 - "OrderDetails.tsx"
Cohesion: 0.25
Nodes (14): useOrder(), useOrderJobs(), useResendOrder(), useUpdateOrderStatus(), isFrontpadWarning(), AdminLogin(), formatAddress(), moneyRow() (+6 more)

### Community 65 - "mapFrontpadSettings"
Cohesion: 0.32
Nodes (8): asNumberList(), asStatusMap(), asStringList(), fetchFrontpadSettings(), mapFrontpadSettings(), ORDER_STATUSES, useFrontpadSettings(), frontpadSettingsFallback()

### Community 66 - "files.ts"
Cohesion: 0.26
Nodes (10): filenamesOf(), FileRecord, imageFilenames(), imageUrl(), imageUrls(), ToFormDataOptions, canvasToBlob(), compressImage() (+2 more)

### Community 67 - "getAccount"
Cohesion: 0.39
Nodes (9): accountCacheKey(), addAddress(), getAccount(), isAppUserRecord(), removeAddress(), saveAddresses(), setDefaultAddress(), updateAddress() (+1 more)

### Community 68 - "counts.ts"
Cohesion: 0.40
Nodes (5): AdminPage(), adminCountKeys, AdminCounts, fetchAdminCounts(), useAdminCounts()

## Knowledge Gaps
- **297 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+292 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `FloatingActions.tsx` to `HomePage.tsx`, `selectors.ts`, `formatPrice`, `product/model.ts`, `crud.ts`, `coupon/api.ts`, `@radix-ui/react-dialog`, `cn`, `banner/api.ts`, `tailwind-merge`, `product/model.ts`, `StickyBar.tsx`, `DesktopHome.tsx`, `AddonForm.tsx`, `cn.ts`, `customer/api.ts`, `OrdersSection.tsx`, `useAdminAuth`, `NutritionHint.tsx`, `lucide-react`, `AdminPage.tsx`, `sonner`, `coupon/api.ts`, `Sidebar.tsx`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Why does `formatPrice()` connect `useAdminAuth` to `StickyBar.tsx`, `OrderDetails.tsx`, `AddonForm.tsx`, `cn.ts`, `HomePage.tsx`, `lucide-react`, `theme.tsx`, `product/model.ts`, `crud.ts`, `ProductEditor.tsx`, `store.ts`, `@radix-ui/react-dialog`, `banner/api.ts`, `coupon/api.ts`, `category/api.ts`, `CashPricesPanel.tsx`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Why does `Button()` connect `crud.ts` to `HomePage.tsx`, `CustomerDrawer.tsx`, `formatPrice`, `product/model.ts`, `ProductEditor.tsx`, `coupon/api.ts`, `cn`, `banner/api.ts`, `staff/api.ts`, `StickyBar.tsx`, `AddonForm.tsx`, `cn.ts`, `theme.tsx`, `react-easy-crop`, `sonner`, `coupon/api.ts`, `CashPricesPanel.tsx`, `crud.ts`, `FloatingActions.tsx`, `OrderDetails.tsx`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _297 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `selectors.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10804597701149425 - nodes in this community are weakly interconnected._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.11956521739130435 - nodes in this community are weakly interconnected._