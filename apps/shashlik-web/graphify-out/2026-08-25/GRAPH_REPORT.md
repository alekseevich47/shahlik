# Graph Report - shashlik-web  (2026-08-24)

## Corpus Check
- 173 files · ~174,070 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1099 nodes · 3244 edges · 45 communities (36 shown, 9 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 81 edges (avg confidence: 0.54)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9d3f45e4`
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
- ProductCard.tsx
- lucide-react
- react-dom
- category/api.ts
- site.ts
- compress-image.ts
- lucide-react
- react-easy-crop
- sonner

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

## Communities (45 total, 9 thin omitted)

### Community 0 - "HomePage.tsx"
Cohesion: 0.06
Nodes (64): BadgeInput, badgeKeys, badgeMutations, BadgeRecord, fetchBadges(), mapBadge(), seedFallback(), useBadges() (+56 more)

### Community 1 - "dependencies"
Cohesion: 0.12
Nodes (17): clsx, motion, dependencies, clsx, motion, pocketbase, @radix-ui/react-dialog, @radix-ui/react-slot (+9 more)

### Community 2 - "selectors.ts"
Cohesion: 0.11
Nodes (29): createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchAdminProducts(), fetchProductById() (+21 more)

### Community 4 - "cn"
Cohesion: 0.05
Nodes (73): CategoryIcon(), Props, OrderStatus, applyPricesJobKeys, asNumberList(), asStatusMap(), asStringList(), enqueueApplyPricesJob() (+65 more)

### Community 5 - "CatalogTables.tsx"
Cohesion: 0.09
Nodes (32): adminReviewKeys, buildOrdersFilter(), createOrder(), CreateOrderInput, CreateReviewInput, fetchAdminReviews(), fetchOrderById(), fetchOrders() (+24 more)

### Community 6 - "devDependencies"
Cohesion: 0.11
Nodes (19): devDependencies, tailwindcss, @tailwindcss/vite, tw-animate-css, @types/node, @types/react, @types/react-dom, typescript (+11 more)

### Community 7 - "compilerOptions"
Cohesion: 0.07
Nodes (26): DOM, DOM.Iterable, ES2023, node, src, vite/client, vite.config.ts, compilerOptions (+18 more)

### Community 8 - "CustomerDrawer.tsx"
Cohesion: 0.08
Nodes (45): AccountAuth, AccountContext, AccountProvider(), isAbortError(), refreshAuth(), useAccount(), accountKeys, addAddress() (+37 more)

### Community 9 - "formatPrice"
Cohesion: 0.17
Nodes (17): fetchTags(), mapTag(), TagInput, tagKeys, tagMutations, TagRecord, tagsForCategory(), useCategoryTags() (+9 more)

### Community 10 - "category/api.ts"
Cohesion: 0.14
Nodes (16): FrontpadJob, FrontpadJobKind, FrontpadJobStatus, Order, ORDER_STATUS_LABEL, OrderLineAddon, OrderLineSnapshot, OrderStatusSource (+8 more)

### Community 13 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 14 - "banner/api.ts"
Cohesion: 0.05
Nodes (44): App(), AdminGate(), AdminLogin, AdminPage, AppRoutes(), AuthCallbackPage, EASE, EXIT_ABS (+36 more)

### Community 15 - "product/model.ts"
Cohesion: 0.17
Nodes (15): useProducts(), useFrontpadStockRealtime(), CheckoutDialogState, useCheckoutDialogStore, SearchDialog(), SearchDialogProps, HomePage(), MobileHome() (+7 more)

### Community 16 - "AdminPage.tsx"
Cohesion: 0.13
Nodes (19): checkPromo(), couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail (+11 more)

### Community 17 - "products.ts"
Cohesion: 0.08
Nodes (25): ALL_CATEGORY, Category, CategoryId, KNOWN_CATEGORY_IDS, KnownCategoryId, DEFAULT_CRITERIA, MeatIcon, ProductBadge (+17 more)

### Community 18 - "crud.ts"
Cohesion: 0.05
Nodes (47): readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), useTheme(), CartToggle(), formatOrderSum() (+39 more)

### Community 19 - "ProductEditor.tsx"
Cohesion: 0.08
Nodes (33): buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams, CustomersPageResult, fetchCustomerById() (+25 more)

### Community 20 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, preview, typecheck, type (+1 more)

### Community 21 - "coupon/api.ts"
Cohesion: 0.09
Nodes (41): AppliedCoupon, calcCouponDiscount(), formatCouponValue(), useCreateOrder(), DeliveryMode, OrderAddressParts, addonFromCache(), CartTotals (+33 more)

### Community 22 - "lucide-react"
Cohesion: 0.17
Nodes (12): ALL_TAG, TagFilterId, productTags, Chip(), ChipProps, OptionCard(), OptionCardProps, Props (+4 more)

### Community 23 - "@radix-ui/react-dialog"
Cohesion: 0.13
Nodes (14): SectionStub(), ADMIN_NAV, AdminNavItem, AdminRole, AdminSectionId, AdminSidebar(), PILL, Props (+6 more)

### Community 24 - "cn"
Cohesion: 0.06
Nodes (46): bannerFormData(), bannerKeys, bannerMutations, BannerNote, BannerRecord, CreateBannerInput, fetchBannerById(), fetchBanners() (+38 more)

### Community 25 - "banner/api.ts"
Cohesion: 0.18
Nodes (17): addonKeys, addonMutations, AddonRecord, CreateAddonInput, createBody(), fetchAddonById(), fetchAddons(), fetchAddonsByKind() (+9 more)

### Community 26 - "tailwind-merge"
Cohesion: 0.16
Nodes (18): useAddons(), useCreateAddon(), useUpdateAddon(), Addon, AddonKind, useFrontpadStockArticles(), articleConflictMessage(), ArticleExclude (+10 more)

### Community 28 - "zustand"
Cohesion: 0.16
Nodes (16): fetchActiveResendJobs(), mapJob(), resendOrder(), useOrderJobs(), useResendOrder(), isFrontpadWarning(), ORDER_STATUS_FLOW, ORDER_STATUS_SOURCE_LABEL (+8 more)

### Community 29 - "AdminSidebar.tsx"
Cohesion: 0.16
Nodes (15): linkPhone(), fetchMyOrders(), useMyOrders(), isActiveOrderStatus(), getLatestLocalOrderId(), AddressCard(), CurrentOrderTab(), EmptyBlock() (+7 more)

### Community 30 - "staff/api.ts"
Cohesion: 0.47
Nodes (8): canUseStorage(), isStoredOrder(), listLocalOrderIds(), load(), prune(), rememberLocalOrder(), save(), StoredOrder

### Community 31 - "product/model.ts"
Cohesion: 0.33
Nodes (6): AdminPage(), adminCountKeys, AdminCounts, fetchAdminCounts(), useAdminCounts(), pb

### Community 32 - "StickyBar.tsx"
Cohesion: 0.33
Nodes (4): addons, extras, IMG, sauces

### Community 33 - "DesktopHome.tsx"
Cohesion: 0.22
Nodes (9): CartPanelState, useCartPanelStore, CartDock(), groupProductsByCategory(), DesktopHome(), Props, Options, useInView() (+1 more)

### Community 34 - "AddonForm.tsx"
Cohesion: 0.67
Nodes (4): invalidateProductRatings(), useCreateReview(), useUpdateReview(), ReviewForm()

### Community 35 - "cn.ts"
Cohesion: 0.27
Nodes (8): orderKeys, subscribeOrderStatus(), usePublicOrder(), repeatOrderIntoCart(), useLiveOrder(), OrderTrackPage(), RepeatButton(), queryClient

### Community 36 - "ProductCard.tsx"
Cohesion: 0.06
Nodes (94): useDeleteAddon(), useDeleteBanner(), useCategories(), useDeleteCategory(), useCoupons(), useDeleteCoupon(), useCustomersPage(), useAdminReviews() (+86 more)

### Community 41 - "lucide-react"
Cohesion: 0.23
Nodes (8): catalogSectionId(), Options, useCatalogScrollSpy(), CatalogCategorySection(), Props, Props, CategoryTiles(), Props

### Community 44 - "category/api.ts"
Cohesion: 0.16
Nodes (15): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+7 more)

## Knowledge Gaps
- **293 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+288 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `crud.ts` to `HomePage.tsx`, `cn`, `ProductCard.tsx`, `lucide-react`, `category/api.ts`, `formatPrice`, `category/api.ts`, `banner/api.ts`, `product/model.ts`, `ProductEditor.tsx`, `coupon/api.ts`, `lucide-react`, `@radix-ui/react-dialog`, `cn`, `tailwind-merge`, `zustand`, `AdminSidebar.tsx`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **Why does `pb` connect `product/model.ts` to `HomePage.tsx`, `selectors.ts`, `cn`, `CatalogTables.tsx`, `ProductCard.tsx`, `CustomerDrawer.tsx`, `formatPrice`, `category/api.ts`, `banner/api.ts`, `AdminPage.tsx`, `crud.ts`, `ProductEditor.tsx`, `cn`, `banner/api.ts`, `tailwind-merge`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `formatPrice()` connect `coupon/api.ts` to `HomePage.tsx`, `ProductCard.tsx`, `cn`, `category/api.ts`, `product/model.ts`, `crud.ts`, `ProductEditor.tsx`, `zustand`, `AdminSidebar.tsx`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _293 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `HomePage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06265822784810127 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `selectors.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11491935483870967 - nodes in this community are weakly interconnected._