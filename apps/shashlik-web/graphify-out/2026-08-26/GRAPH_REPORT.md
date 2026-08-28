# Graph Report - shashlik-web  (2026-08-26)

## Corpus Check
- 174 files · ~175,238 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1111 nodes · 3278 edges · 66 communities (56 shown, 10 thin omitted)
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
- `AdminAuthProvider()` --indirect_call--> `logout()`  [INFERRED]
  src/shared/api/auth.tsx → src/entities/account/api.ts
- `resolveBadgeLabel()` --calls--> `badgeLabel()`  [EXTRACTED]
  src/shared/config/site.ts → src/entities/badge/model.ts
- `useDuplicateProduct()` --indirect_call--> `product()`  [INFERRED]
  src/entities/product/api.ts → src/mocks/products.ts
- `collectArticleConflicts()` --indirect_call--> `product()`  [INFERRED]
  src/entities/product/lib/articles.ts → src/mocks/products.ts
- `articleConflictMessage()` --indirect_call--> `product()`  [INFERRED]
  src/entities/product/lib/articles.ts → src/mocks/products.ts

## Import Cycles
- None detected.

## Communities (66 total, 10 thin omitted)

### Community 0 - "HomePage.tsx"
Cohesion: 0.13
Nodes (16): linkPhone(), fetchMyOrders(), useMyOrders(), isActiveOrderStatus(), formatAddressLine(), AddressCard(), CurrentOrderTab(), EmptyBlock() (+8 more)

### Community 1 - "dependencies"
Cohesion: 0.12
Nodes (17): clsx, lucide-react, motion, dependencies, clsx, lucide-react, motion, @radix-ui/react-dialog (+9 more)

### Community 2 - "selectors.ts"
Cohesion: 0.06
Nodes (57): bannerFormData(), bannerKeys, bannerMutations, BannerNote, BannerRecord, CreateBannerInput, fetchBannerById(), fetchBanners() (+49 more)

### Community 4 - "cn"
Cohesion: 0.12
Nodes (23): applyPricesJobKeys, enqueueApplyPricesJob(), fetchActiveSyncJobs(), fetchApplyPricesJobs(), fetchFrontpadStock(), fetchStoppedStock(), FrontpadJobRecord, FrontpadSettingsRecord (+15 more)

### Community 5 - "CatalogTables.tsx"
Cohesion: 0.09
Nodes (33): adminReviewKeys, createOrder(), CreateOrderInput, CreateReviewInput, fetchActiveResendJobs(), fetchAdminReviews(), fetchOrderById(), fetchOrders() (+25 more)

### Community 6 - "devDependencies"
Cohesion: 0.11
Nodes (19): devDependencies, tailwindcss, @tailwindcss/vite, tw-animate-css, @types/node, @types/react, @types/react-dom, typescript (+11 more)

### Community 7 - "compilerOptions"
Cohesion: 0.07
Nodes (26): DOM, DOM.Iterable, ES2023, node, src, vite/client, vite.config.ts, compilerOptions (+18 more)

### Community 8 - "CustomerDrawer.tsx"
Cohesion: 0.16
Nodes (22): accountKeys, asId(), asString(), BonusResponse, mapAddress(), mapAddresses(), mapAppUser(), persistRecord() (+14 more)

### Community 9 - "formatPrice"
Cohesion: 0.07
Nodes (35): BadgeInput, badgeKeys, badgeMutations, BadgeRecord, fetchBadges(), mapBadge(), seedFallback(), useCreateBadge() (+27 more)

### Community 10 - "category/api.ts"
Cohesion: 0.14
Nodes (18): DeliveryMode, FrontpadJobKind, FrontpadJobStatus, isFrontpadWarning(), Order, ORDER_STATUS_FLOW, ORDER_STATUS_LABEL, ORDER_STATUS_SOURCE_LABEL (+10 more)

### Community 13 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 14 - "banner/api.ts"
Cohesion: 0.18
Nodes (14): GuardedSection(), AdminAuth, AdminAuthContext, AdminAuthProvider(), authErrorMessage(), can(), isAbortError(), isStaffRecord() (+6 more)

### Community 15 - "product/model.ts"
Cohesion: 0.23
Nodes (14): useProducts(), useCartTotals(), useCartStore, CartPanel(), MODE_OPTIONS, CartPromo(), CartTotals(), CheckoutDialogState (+6 more)

### Community 16 - "AdminPage.tsx"
Cohesion: 0.22
Nodes (13): AccountAuth, AccountContext, AccountProvider(), isAbortError(), refreshAuth(), accountCacheKey(), isAppUserRecord(), loginWithOAuth() (+5 more)

### Community 17 - "products.ts"
Cohesion: 0.10
Nodes (19): DEFAULT_CRITERIA, MeatIcon, ProductBadge, ProductNutrition, ProductRating, ProductSize, ProductTag, ProductVariant (+11 more)

### Community 18 - "crud.ts"
Cohesion: 0.22
Nodes (12): CheckoutDialogProps, MODE_OPTIONS, Props, DEFAULT_NUTRITION, Props, Button(), ButtonProps, buttonVariants (+4 more)

### Community 19 - "ProductEditor.tsx"
Cohesion: 0.19
Nodes (14): buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams, CustomersPageResult, fetchCustomerById() (+6 more)

### Community 20 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, preview, typecheck, type (+1 more)

### Community 21 - "coupon/api.ts"
Cohesion: 0.25
Nodes (8): useCreateCategory(), useUpdateCategory(), CategoryForm(), Props, CATEGORY_ICONS, CategoryIconPath, SheetContent(), SheetContentProps

### Community 22 - "lucide-react"
Cohesion: 0.11
Nodes (23): addonMutations, AddonRecord, CreateAddonInput, createBody(), fetchAddonById(), fetchAddons(), fetchAddonsByKind(), fetchExtras() (+15 more)

### Community 23 - "@radix-ui/react-dialog"
Cohesion: 0.12
Nodes (23): buildSeries(), buildTopProducts(), countByFilter(), DashboardData, dashboardKeys, DashboardSection(), dayKey(), fetchDashboard() (+15 more)

### Community 24 - "cn"
Cohesion: 0.11
Nodes (22): BANNER_ASPECT_RATIO, Props, canvasToBlob(), CropArea, cropImageToFile(), loadImage(), readImageSize(), ALLOWED (+14 more)

### Community 25 - "banner/api.ts"
Cohesion: 0.15
Nodes (23): useBadges(), badgeLabel(), PRODUCT_ASPECT_RATIO, minPrice(), isProductStopped(), ProductCard(), ProductCardProps, ProductCardCompact() (+15 more)

### Community 26 - "tailwind-merge"
Cohesion: 0.12
Nodes (27): useAddons(), useFrontpadStockArticles(), articleConflictMessage(), ArticleExclude, ArticleRef, cellLabel(), collectArticleConflicts(), isExcludedCell() (+19 more)

### Community 28 - "zustand"
Cohesion: 0.20
Nodes (13): useUpdateCustomer(), Customer, CUSTOMER_FIELD_LIMITS, buildOrdersFilter(), fetchOrdersPage(), useOrdersPage(), CustomerDrawer(), digitsOnly() (+5 more)

### Community 29 - "AdminSidebar.tsx"
Cohesion: 0.15
Nodes (12): OrderStatus, DEFAULT_STATUS_MAP, FrontpadSettings, FrontpadStockItem, PriceSource, Settings, BADGE_LABEL, ORDER_RULES (+4 more)

### Community 30 - "staff/api.ts"
Cohesion: 0.17
Nodes (15): CreateStaffInput, fetchStaff(), mapStaff(), mapStaffRequired(), staffKeys, StaffMember, staffMutations, StaffRecord (+7 more)

### Community 31 - "product/model.ts"
Cohesion: 0.21
Nodes (11): ALL_TAG, TagFilterId, Chip(), ChipProps, OptionCard(), OptionCardProps, Props, SPRING (+3 more)

### Community 32 - "StickyBar.tsx"
Cohesion: 0.07
Nodes (75): useDeleteAddon(), useDeleteBanner(), useDeleteCategory(), useCoupons(), useDeleteCoupon(), useUpdateCoupon(), formatCouponValue(), invalidateProductRatings() (+67 more)

### Community 33 - "DesktopHome.tsx"
Cohesion: 0.13
Nodes (18): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+10 more)

### Community 34 - "AddonForm.tsx"
Cohesion: 0.16
Nodes (22): articleFor(), cartLineTitle(), findSize(), findVariant(), SkuCell, fetchStoppedArticles(), isAddonStopped(), isSizeStopped() (+14 more)

### Community 35 - "cn.ts"
Cohesion: 0.33
Nodes (7): orderKeys, subscribeOrderStatus(), usePublicOrder(), repeatOrderIntoCart(), useLiveOrder(), OrderTrackPage(), RepeatButton()

### Community 36 - "customer/api.ts"
Cohesion: 0.29
Nodes (7): useTheme(), CartToggle(), formatOrderSum(), Props, ThemeToggle(), Props, TONE

### Community 37 - "OrdersSection.tsx"
Cohesion: 0.15
Nodes (11): AdminGate(), AdminLogin, AdminPage, AuthCallbackPage, EASE, EXIT_ABS, loadMotionFeatures(), OrderTrackPage (+3 more)

### Community 38 - "useAdminAuth"
Cohesion: 0.24
Nodes (8): App(), AppRoutes(), ScrollToTop(), container, backgroundOf(), Glass(), GlassDefs(), GlassProps

### Community 39 - "NutritionHint.tsx"
Cohesion: 0.19
Nodes (11): CartPanelState, useCartPanelStore, CartDock(), DesktopHome(), Props, Options, useInView(), useIsDesktop() (+3 more)

### Community 40 - "button.tsx"
Cohesion: 0.24
Nodes (9): addonKeys, productKeys, addonFromCache(), CartTotals, productFromCache(), ResolvedAddon, ResolvedLine, resolveLine() (+1 more)

### Community 41 - "lucide-react"
Cohesion: 0.27
Nodes (12): fetchSettings(), mapSettings(), updateSettings(), useSettings(), useUpdateSettings(), settingsFallback(), CheckoutDialog(), parseNonNeg() (+4 more)

### Community 42 - "react-dom"
Cohesion: 0.42
Nodes (9): canUseStorage(), getLatestLocalOrderId(), isStoredOrder(), listLocalOrderIds(), load(), prune(), rememberLocalOrder(), save() (+1 more)

### Community 43 - "AdminPage.tsx"
Cohesion: 0.27
Nodes (8): SectionStub(), ADMIN_NAV, AdminNavItem, AdminRole, AdminSectionId, AdminSidebar(), PILL, Props

### Community 44 - "theme.tsx"
Cohesion: 0.40
Nodes (5): readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider()

### Community 45 - "site.ts"
Cohesion: 0.31
Nodes (7): needsChooser(), Product, useAddProduct(), groupProductsByCategory(), MobileHome(), Props, HeroBanner()

### Community 47 - "lucide-react"
Cohesion: 0.25
Nodes (6): ALL_CATEGORY, Category, CategoryId, KNOWN_CATEGORY_IDS, KnownCategoryId, categories

### Community 48 - "react-easy-crop"
Cohesion: 0.33
Nodes (6): AdminTopbar(), fetchNewOrdersCount(), newOrdersKey, pb, queryClient, QueryKey

### Community 49 - "sonner"
Cohesion: 0.33
Nodes (6): catalogSectionId(), Options, useCatalogScrollSpy(), CatalogCategorySection(), Props, STICKY_BAR

### Community 50 - "invalidateProductRatings"
Cohesion: 0.38
Nodes (6): useAccount(), acceptAuthToken(), AuthCallbackPage(), AddressesTab(), DataTab(), ProfilePage()

### Community 54 - "store.ts"
Cohesion: 0.15
Nodes (16): addAddress(), fetchBonus(), getAccount(), subscribeAccount(), useAccount(), useProfileBonus(), useCreateOrder(), OrderAddressParts (+8 more)

### Community 57 - "coupon/api.ts"
Cohesion: 0.15
Nodes (14): couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail, PromoCheckOk (+6 more)

### Community 58 - "coupon/api.ts"
Cohesion: 0.14
Nodes (17): useCreateCoupon(), frontpadSettingsKeys, CouponForm(), KIND_OPTIONS, Props, toDateInput(), parseDigitCodes(), PRICE_SOURCE_OPTIONS (+9 more)

### Community 59 - "category/api.ts"
Cohesion: 0.20
Nodes (11): checkPromo(), enqueueSyncJob(), updateFrontpadSettings(), useEnqueueSyncJob(), useUpdateFrontpadSettings(), formatRemaining(), FrontpadPanel(), productsSyncGate() (+3 more)

### Community 61 - "crud.ts"
Cohesion: 0.32
Nodes (7): CollectionMutationsConfig, FIELD_CODE_RU, invalidate(), listKeys(), MutationKeys, QueryKey, syncDetail()

### Community 62 - "FloatingActions.tsx"
Cohesion: 0.13
Nodes (19): SumRow(), FreshStamp(), STAMP_GLYPHS, cn(), ConfirmDialog(), Modal(), ModalProps, PopoverContent() (+11 more)

### Community 63 - "Sidebar.tsx"
Cohesion: 0.40
Nodes (3): CategoryIcon(), Props, SidebarProps

### Community 64 - "OrderDetails.tsx"
Cohesion: 0.28
Nodes (8): OrderLineSnapshot, formatAddress(), LineRow(), OrderDetails(), Props, OrdersSection(), statusFromSearch(), formatDateTime()

### Community 65 - "mapFrontpadSettings"
Cohesion: 0.32
Nodes (8): asNumberList(), asStatusMap(), asStringList(), fetchFrontpadSettings(), mapFrontpadSettings(), ORDER_STATUSES, useFrontpadSettings(), frontpadSettingsFallback()

## Knowledge Gaps
- **297 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+292 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `FloatingActions.tsx` to `HomePage.tsx`, `selectors.ts`, `formatPrice`, `product/model.ts`, `crud.ts`, `coupon/api.ts`, `@radix-ui/react-dialog`, `cn`, `banner/api.ts`, `tailwind-merge`, `product/model.ts`, `StickyBar.tsx`, `DesktopHome.tsx`, `AddonForm.tsx`, `customer/api.ts`, `useAdminAuth`, `lucide-react`, `AdminPage.tsx`, `site.ts`, `coupon/api.ts`, `Sidebar.tsx`, `OrderDetails.tsx`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Why does `formatPrice()` connect `banner/api.ts` to `OrderDetails.tsx`, `StickyBar.tsx`, `AddonForm.tsx`, `HomePage.tsx`, `lucide-react`, `category/api.ts`, `product/model.ts`, `crud.ts`, `store.ts`, `@radix-ui/react-dialog`, `coupon/api.ts`, `category/api.ts`, `zustand`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Why does `Button()` connect `crud.ts` to `StickyBar.tsx`, `HomePage.tsx`, `AddonForm.tsx`, `cn.ts`, `formatPrice`, `category/api.ts`, `product/model.ts`, `react-easy-crop`, `coupon/api.ts`, `cn`, `banner/api.ts`, `coupon/api.ts`, `zustand`, `FloatingActions.tsx`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _297 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `HomePage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13157894736842105 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `selectors.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.056051587301587304 - nodes in this community are weakly interconnected._