# Graph Report - shashlik-web  (2026-08-26)

## Corpus Check
- 173 files · ~174,445 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1103 nodes · 3257 edges · 57 communities (48 shown, 9 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 81 edges (avg confidence: 0.54)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2d74cc3a`
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
- OrdersSection.tsx
- useAdminAuth
- NutritionHint.tsx
- button.tsx
- lucide-react
- react-dom
- AdminPage.tsx
- site.ts
- compress-image.ts
- lucide-react
- react-easy-crop
- sonner
- selectors.ts
- store.ts
- ProductPage.tsx
- settingsFallback
- coupon/api.ts
- category/api.ts
- crud.ts
- FloatingActions.tsx
- addons.ts

## God Nodes (most connected - your core abstractions)
1. `cn()` - 117 edges
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

## Communities (57 total, 9 thin omitted)

### Community 0 - "HomePage.tsx"
Cohesion: 0.15
Nodes (22): addonKeys, addonMutations, AddonRecord, CreateAddonInput, createBody(), fetchAddonById(), fetchAddons(), fetchAddonsByKind() (+14 more)

### Community 1 - "dependencies"
Cohesion: 0.12
Nodes (17): clsx, motion, dependencies, clsx, motion, pocketbase, @radix-ui/react-dialog, @radix-ui/react-slot (+9 more)

### Community 2 - "selectors.ts"
Cohesion: 0.14
Nodes (23): createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchAdminProducts(), fetchProductById() (+15 more)

### Community 4 - "cn"
Cohesion: 0.11
Nodes (26): checkPromo(), applyPricesJobKeys, enqueueApplyPricesJob(), enqueueSyncJob(), fetchActiveSyncJobs(), fetchApplyPricesJobs(), fetchFrontpadStock(), fetchStoppedStock() (+18 more)

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
Cohesion: 0.06
Nodes (71): AccountAuth, AccountContext, AccountProvider(), isAbortError(), refreshAuth(), useAccount(), acceptAuthToken(), accountCacheKey() (+63 more)

### Community 9 - "formatPrice"
Cohesion: 0.14
Nodes (19): fetchTags(), mapTag(), TagInput, tagKeys, tagMutations, TagRecord, tagsForCategory(), useCategoryTags() (+11 more)

### Community 10 - "category/api.ts"
Cohesion: 0.16
Nodes (12): FrontpadJob, FrontpadJobKind, FrontpadJobStatus, Order, ORDER_STATUS_FLOW, ORDER_STATUS_SOURCE_LABEL, OrderLineAddon, OrderStatusSource (+4 more)

### Community 13 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 14 - "banner/api.ts"
Cohesion: 0.06
Nodes (41): App(), readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), useTheme(), AdminGate() (+33 more)

### Community 15 - "product/model.ts"
Cohesion: 0.16
Nodes (13): useProducts(), useFrontpadStockRealtime(), CheckoutDialogState, useCheckoutDialogStore, SearchDialog(), SearchDialogProps, HomePage(), MobileHeader() (+5 more)

### Community 16 - "AdminPage.tsx"
Cohesion: 0.19
Nodes (16): ApplyPricesJobResult, asRowList(), buildCells(), CashPriceCell, CashPricePlan, CashPriceStatus, cellDelta(), parseApplyPricesResult() (+8 more)

### Community 17 - "products.ts"
Cohesion: 0.10
Nodes (20): CategoryId, KnownCategoryId, needsChooser(), DEFAULT_CRITERIA, MeatIcon, Product, ProductBadge, ProductRating (+12 more)

### Community 18 - "crud.ts"
Cohesion: 0.19
Nodes (14): frontpadSettingsKeys, stoppedStockKeys, syncJobKeys, updateFrontpadSettings(), useUpdateFrontpadSettings(), formatRemaining(), FrontpadPanel(), parseDigitCodes() (+6 more)

### Community 19 - "ProductEditor.tsx"
Cohesion: 0.12
Nodes (25): buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams, CustomersPageResult, fetchCustomerById() (+17 more)

### Community 20 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, preview, typecheck, type (+1 more)

### Community 21 - "coupon/api.ts"
Cohesion: 0.32
Nodes (8): asNumberList(), asStatusMap(), asStringList(), fetchFrontpadSettings(), mapFrontpadSettings(), ORDER_STATUSES, useFrontpadSettings(), frontpadSettingsFallback()

### Community 22 - "lucide-react"
Cohesion: 0.14
Nodes (17): useCategories(), ALL_TAG, TagFilterId, Props, Chip(), ChipProps, OptionCard(), OptionCardProps (+9 more)

### Community 23 - "@radix-ui/react-dialog"
Cohesion: 0.12
Nodes (23): OrderLineSnapshot, buildSeries(), buildTopProducts(), countByFilter(), DashboardData, dashboardKeys, DashboardSection(), dayKey() (+15 more)

### Community 24 - "cn"
Cohesion: 0.06
Nodes (44): bannerFormData(), bannerKeys, bannerMutations, BannerNote, BannerRecord, CreateBannerInput, fetchBannerById(), fetchBanners() (+36 more)

### Community 25 - "banner/api.ts"
Cohesion: 0.15
Nodes (27): useExtras(), useSauces(), useBadges(), badgeLabel(), frontpadStockKeys, useProductBySlug(), PRODUCT_ASPECT_RATIO, minPrice() (+19 more)

### Community 26 - "tailwind-merge"
Cohesion: 0.22
Nodes (13): useFrontpadStockArticles(), articleConflictMessage(), ArticleExclude, ArticleRef, cellLabel(), collectArticleConflicts(), isExcludedCell(), skuMatrix() (+5 more)

### Community 28 - "zustand"
Cohesion: 0.28
Nodes (12): useOrder(), useOrderJobs(), useResendOrder(), useUpdateOrderStatus(), isFrontpadWarning(), formatAddress(), moneyRow(), OrderDrawer() (+4 more)

### Community 29 - "AdminSidebar.tsx"
Cohesion: 0.17
Nodes (15): BadgeInput, badgeKeys, badgeMutations, BadgeRecord, fetchBadges(), mapBadge(), seedFallback(), useCreateBadge() (+7 more)

### Community 30 - "staff/api.ts"
Cohesion: 0.43
Nodes (6): filenamesOf(), FileRecord, imageFilenames(), imageUrl(), imageUrls(), ToFormDataOptions

### Community 31 - "product/model.ts"
Cohesion: 0.17
Nodes (14): useAdminProducts(), useDeleteProduct(), useDuplicateProduct(), useUpdateProduct(), ProductEditorRoute(), imagesFromProduct(), MEAT_OPTIONS, newId() (+6 more)

### Community 32 - "StickyBar.tsx"
Cohesion: 0.06
Nodes (80): useDeleteAddon(), useDeleteBanner(), useDeleteCategory(), useCoupons(), useDeleteCoupon(), invalidateProductRatings(), useAdminReviews(), useCreateReview() (+72 more)

### Community 33 - "DesktopHome.tsx"
Cohesion: 0.18
Nodes (12): CartPanelState, useCartPanelStore, CartDock(), groupProductsByCategory(), DesktopHome(), Props, Options, useInView() (+4 more)

### Community 34 - "AddonForm.tsx"
Cohesion: 0.40
Nodes (5): ORDER_STATUS_LABEL, formatAddress(), LineRow(), OrderDetails(), Props

### Community 35 - "cn.ts"
Cohesion: 0.23
Nodes (9): orderKeys, subscribeOrderStatus(), usePublicOrder(), repeatOrderIntoCart(), useLiveOrder(), OrderTrackPage(), RepeatButton(), queryClient (+1 more)

### Community 37 - "OrdersSection.tsx"
Cohesion: 0.17
Nodes (11): OrderStatus, DEFAULT_STATUS_MAP, FrontpadSettings, FrontpadStockItem, PriceSource, Settings, BADGE_LABEL, ORDER_RULES (+3 more)

### Community 38 - "useAdminAuth"
Cohesion: 0.32
Nodes (6): AdminPage(), adminCountKeys, AdminCounts, fetchAdminCounts(), useAdminCounts(), pb

### Community 39 - "NutritionHint.tsx"
Cohesion: 0.32
Nodes (5): ProductNutrition, formatGrams(), NutritionHint(), HintMark(), TooltipContent()

### Community 40 - "button.tsx"
Cohesion: 0.36
Nodes (6): DEFAULT_NUTRITION, Props, Field(), Input(), Textarea(), MultiImageItem

### Community 41 - "lucide-react"
Cohesion: 0.33
Nodes (6): catalogSectionId(), Options, useCatalogScrollSpy(), CatalogCategorySection(), Props, MobileHome()

### Community 43 - "AdminPage.tsx"
Cohesion: 0.27
Nodes (8): SectionStub(), ADMIN_NAV, AdminNavItem, AdminRole, AdminSectionId, AdminSidebar(), PILL, Props

### Community 53 - "selectors.ts"
Cohesion: 0.27
Nodes (10): articleFor(), cartLineTitle(), findSize(), findVariant(), hasMissingArticle(), priceOf(), SkuCell, addonFromCache() (+2 more)

### Community 54 - "store.ts"
Cohesion: 0.12
Nodes (28): AppliedCoupon, calcCouponDiscount(), formatCouponValue(), useCreateOrder(), DeliveryMode, OrderAddressParts, CartTotals, ResolvedAddon (+20 more)

### Community 55 - "ProductPage.tsx"
Cohesion: 0.23
Nodes (10): isAddonStopped(), ResolvedLine, CartLineRow(), AddonRow(), Props, formatPrice(), SIZES, StepBtn() (+2 more)

### Community 57 - "settingsFallback"
Cohesion: 0.24
Nodes (14): fetchSettings(), mapSettings(), updateSettings(), useSettings(), useUpdateSettings(), settingsFallback(), parseNonNeg(), SettingsSection() (+6 more)

### Community 58 - "coupon/api.ts"
Cohesion: 0.12
Nodes (20): couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail, PromoCheckOk (+12 more)

### Community 59 - "category/api.ts"
Cohesion: 0.12
Nodes (19): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+11 more)

### Community 61 - "crud.ts"
Cohesion: 0.28
Nodes (8): collectionMutations(), CollectionMutationsConfig, FIELD_CODE_RU, invalidate(), listKeys(), MutationKeys, QueryKey, syncDetail()

### Community 62 - "FloatingActions.tsx"
Cohesion: 0.09
Nodes (23): CategoryIcon(), Props, CartToggle(), formatOrderSum(), Props, SumRow(), PreviewToggle(), FreshStamp() (+15 more)

### Community 65 - "addons.ts"
Cohesion: 0.33
Nodes (4): addons, extras, IMG, sauces

## Knowledge Gaps
- **294 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+289 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `FloatingActions.tsx` to `CustomerDrawer.tsx`, `banner/api.ts`, `product/model.ts`, `AdminPage.tsx`, `lucide-react`, `@radix-ui/react-dialog`, `cn`, `banner/api.ts`, `tailwind-merge`, `AdminSidebar.tsx`, `product/model.ts`, `StickyBar.tsx`, `AddonForm.tsx`, `OrdersSection.tsx`, `NutritionHint.tsx`, `button.tsx`, `AdminPage.tsx`, `store.ts`, `ProductPage.tsx`, `settingsFallback`, `coupon/api.ts`, `category/api.ts`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **Why does `Button()` connect `StickyBar.tsx` to `HomePage.tsx`, `cn.ts`, `button.tsx`, `formatPrice`, `CustomerDrawer.tsx`, `settingsFallback`, `banner/api.ts`, `crud.ts`, `ProductEditor.tsx`, `store.ts`, `cn`, `banner/api.ts`, `coupon/api.ts`, `category/api.ts`, `zustand`, `AdminSidebar.tsx`, `FloatingActions.tsx`, `product/model.ts`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `pb` connect `useAdminAuth` to `HomePage.tsx`, `StickyBar.tsx`, `selectors.ts`, `tailwind-merge`, `cn`, `CatalogTables.tsx`, `cn.ts`, `formatPrice`, `banner/api.ts`, `ProductEditor.tsx`, `crud.ts`, `@radix-ui/react-dialog`, `cn`, `banner/api.ts`, `coupon/api.ts`, `category/api.ts`, `AdminSidebar.tsx`, `staff/api.ts`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _294 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `selectors.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13666666666666666 - nodes in this community are weakly interconnected._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.11396011396011396 - nodes in this community are weakly interconnected._