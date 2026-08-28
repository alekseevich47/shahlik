# Graph Report - shahlik  (2026-08-28)

## Corpus Check
- 204 files · ~1,430,402 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1548 nodes · 4035 edges · 87 communities (77 shown, 10 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 151 edges (avg confidence: 0.53)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6f3c346b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- addon/api.ts
- UI Layout Components
- NPM Dependencies
- TS Config Tooling
- Figma Make Stack
- Sushi Catalog UI
- Meal Add-ons UI
- Checkout Flow UI
- package.json
- Frontpad API
- Logo Variant B
- Logo Transparent
- 3. Зона кода — шаги
- Logo Black Variant
- Brand Typography
- Brand Logo Core
- Brand Color Palette
- Vite Figma Plugins
- FloatingActions.tsx
- product/api.ts
- ProductEditor.tsx
- gen-glass-noise.mjs
- cn
- HomePage.tsx
- category/api.ts
- cn.ts
- StickyBar.tsx
- order/model.ts
- FloatingActions.tsx
- useCategories
- order/api.ts
- customer/api.ts
- banner/api.ts
- addon/api.ts
- order/model.ts
- articles.ts
- MobileTabBar.tsx
- HomePage.tsx
- MobileHome.tsx
- TagFilters.tsx
- webhook.js
- pb.ts
- package.json
- AdminSidebar.tsx
- CustomerDrawer.tsx
- order/model.ts
- @radix-ui/react-slot
- HomePage.tsx
- invalidateProductRatings
- ProductCard.tsx
- @radix-ui/react-slot
- sonner
- @tanstack/react-query
- Sparkline.tsx
- CouponForm.tsx
- SettingsSection.tsx
- AdminPage.tsx
- send.js
- banner-image-field.tsx
- jobs.js
- http.js
- AddonForm.tsx
- loginWithOAuth
- @radix-ui/react-dialog
- react-router-dom
- DesktopHome.tsx
- StickyBar.tsx
- sync.js
- HeroBanner.tsx
- category/api.ts
- App.tsx
- files.ts
- AdminTopbar.tsx
- NutritionHint.tsx
- router.tsx
- lucide-react
- lucide-react
- @radix-ui/react-popover
- zustand
- NutritionHint.tsx
- theme.tsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 119 edges
2. `formatPrice()` - 50 edges
3. `Button()` - 43 edges
4. `useCartTotals()` - 24 edges
5. `ProductEditor()` - 24 edges
6. `Input()` - 23 edges
7. `useCategories()` - 22 edges
8. `pb` - 21 edges
9. `useAdminProducts()` - 20 edges
10. `ProductView()` - 20 edges

## Surprising Connections (you probably didn't know these)
- `Logo CMYK` --conceptually_related_to--> `figma-make-app`  [AMBIGUOUS]
  temp/логотип/лого CMYK.pdf → AGENTS.md
- `Logo RGB` --conceptually_related_to--> `figma-make-app`  [AMBIGUOUS]
  temp/логотип/лого RGB.pdf → AGENTS.md
- `AccountProvider()` --indirect_call--> `loginWithOAuth()`  [INFERRED]
  apps/shashlik-web/src/app/providers/account.tsx → apps/shashlik-web/src/entities/account/api.ts
- `AdminGate()` --calls--> `useAdminAuth()`  [EXTRACTED]
  apps/shashlik-web/src/app/router.tsx → apps/shashlik-web/src/shared/api/auth.tsx
- `AdminAuthProvider()` --indirect_call--> `logout()`  [INFERRED]
  apps/shashlik-web/src/shared/api/auth.tsx → apps/shashlik-web/src/entities/account/api.ts

## Import Cycles
- None detected.

## Communities (87 total, 10 thin omitted)

### Community 0 - "addon/api.ts"
Cohesion: 0.13
Nodes (22): fetchTags(), mapTag(), TagInput, tagKeys, tagMutations, TagRecord, tagsForCategory(), useCategoryTags() (+14 more)

### Community 1 - "UI Layout Components"
Cohesion: 0.10
Nodes (30): adminReviewKeys, buildOrdersFilter(), createOrder(), CreateOrderInput, CreateReviewInput, fetchAdminReviews(), fetchOrderById(), fetchOrders() (+22 more)

### Community 2 - "NPM Dependencies"
Cohesion: 0.11
Nodes (19): devDependencies, tailwindcss, @tailwindcss/vite, tw-animate-css, @types/node, @types/react, @types/react-dom, typescript (+11 more)

### Community 3 - "TS Config Tooling"
Cohesion: 0.07
Nodes (26): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+18 more)

### Community 4 - "Figma Make Stack"
Cohesion: 0.14
Nodes (16): src/App.tsx, Default component exports, Figma Make, figma-make-app, src/index.css, index.html, src/main.tsx, oxfmt (+8 more)

### Community 5 - "Sushi Catalog UI"
Cohesion: 0.11
Nodes (26): bannerFormData(), bannerKeys, bannerMutations, BannerNote, BannerRecord, CreateBannerInput, fetchBannerById(), fetchBanners() (+18 more)

### Community 6 - "Meal Add-ons UI"
Cohesion: 0.17
Nodes (15): CreateStaffInput, fetchStaff(), mapStaff(), mapStaffRequired(), staffKeys, StaffMember, staffMutations, StaffRecord (+7 more)

### Community 7 - "Checkout Flow UI"
Cohesion: 0.11
Nodes (18): API-правила (PB Rules), Env / инфра, `pb_hooks` (JSVM), TASK_DB — подключение PocketBase (сайт + админка) с прицелом на Frontpad, Архитектура, Зона БД — делаю сам (PocketBase Admin UI, `pb_hooks`, env), Зона кода — делает агент (после того как коллекции выше созданы), Коллекции (имена полей = 1:1 с `entities/*/model.ts`, где возможно) (+10 more)

### Community 8 - "package.json"
Cohesion: 0.11
Nodes (19): dependencies, class-variance-authority, lenis, motion, pocketbase, @radix-ui/react-tooltip, react-dom, react-easy-crop (+11 more)

### Community 10 - "Frontpad API"
Cohesion: 0.33
Nodes (11): API Frontpad, change_status webhook, get_certificate, get_client, get_products, get_stops, new_order, Product article (артикул) (+3 more)

### Community 11 - "Logo Variant B"
Cohesion: 0.31
Nodes (10): Decorative banner frame, Шашлыковский, EST. 2024, Grilled-meat food brand, Шашлыковский logo B (no background), Logo variant B transparent, Bearded chef mascot, White line-art monochrome (+2 more)

### Community 12 - "Logo Transparent"
Cohesion: 0.27
Nodes (10): Шашлыковский, Orange-black-red palette, EST. 2024, Grilled-meat food brand, Шашлыковский logo without background, Bearded chef mascot, Orange decorative plaque, Shashlik skewers (+2 more)

### Community 13 - "3. Зона кода — шаги"
Cohesion: 0.07
Nodes (27): 1. Инварианты (нарушение = баг), 2.1 Правки существующих коллекций, 2.2 Новые коллекции, 2.3 Правила доступа (PB Rules), 2.4 `pb_hooks`, 2. Зона БД — делает владелец, 3. Зона кода — шаги, 4. Карта файлов (что открывать под задачу) (+19 more)

### Community 14 - "Logo Black Variant"
Cohesion: 0.31
Nodes (9): Шашлыковский, Decorative plaque, EST. 2024, Grilled-meat food brand, Шашлыковский black logo (no background), Bearded chef mascot, Monochrome black variant, Shashlik skewers (+1 more)

### Community 15 - "Brand Typography"
Cohesion: 0.39
Nodes (8): Шашлыковский, EST. 2024, Akademische schmalfette, MisterK, Script + condensed serif pairing, Шашлыковский logo specimen, ШРИФТЫ, ШРИФТЫ — brand typography specimen

### Community 16 - "Brand Logo Core"
Cohesion: 0.52
Nodes (7): Шашлыковский, EST. 2024, Grilled-meat food brand, Шашлыковский brand logo, Bearded chef mascot, Orange decorative banner, Shashlik skewers

### Community 17 - "Brand Color Palette"
Cohesion: 0.47
Nodes (6): черный, Orange #EF7F1A, Brand color palette, Red #C30D0E, белый, RGB/HEX/CMYK dual specs

### Community 20 - "FloatingActions.tsx"
Cohesion: 0.06
Nodes (64): checkPromo(), OrderStatus, applyPricesJobKeys, asNumberList(), asStatusMap(), asStringList(), enqueueApplyPricesJob(), enqueueSyncJob() (+56 more)

### Community 21 - "product/api.ts"
Cohesion: 0.07
Nodes (26): 1. env процесса `pocketbase` (systemd unit, `Environment=`), 2. Правки коллекций в `/_/` (и синхронно в `Tasks/schema.json`), 3. Rate limits PocketBase (`/_/` → Settings → Rate limits), 4. Настройки Frontpad (оператор), 5. Деплой `pb_hooks`, TASK_inter — интеграция с кассой Frontpad (боевая), Зона БД / инфры — делает владелец, агент не трогает, Зона кода — агент (+18 more)

### Community 22 - "ProductEditor.tsx"
Cohesion: 0.13
Nodes (20): useCreateProduct(), ProductNutrition, Props, Props, DEFAULT_NUTRITION, ProductCreateForm(), Props, PhoneOnboardingProps (+12 more)

### Community 23 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 24 - "cn"
Cohesion: 0.14
Nodes (13): DEFAULT_CRITERIA, ProductBadge, ProductRating, ProductSize, ProductTag, ProductVariant, RatingCriterion, MEAT_VARIANTS (+5 more)

### Community 25 - "HomePage.tsx"
Cohesion: 0.20
Nodes (20): applyClientData(), backfillOrders(), bindPhoneToUser(), bonusFromCustomer(), createCustomer(), ensureCustomer(), fetchClientFromCash(), findAppUserByPhone() (+12 more)

### Community 26 - "category/api.ts"
Cohesion: 0.16
Nodes (14): useDeleteProduct(), useDuplicateProduct(), useUpdateProduct(), imagesFromProduct(), MEAT_OPTIONS, newId(), PreviewToggle(), ProductEditor() (+6 more)

### Community 27 - "cn.ts"
Cohesion: 0.18
Nodes (14): GuardedSection(), AdminAuth, AdminAuthContext, AdminAuthProvider(), authErrorMessage(), can(), isAbortError(), isStaffRecord() (+6 more)

### Community 28 - "StickyBar.tsx"
Cohesion: 0.14
Nodes (16): BANNER_ASPECT_RATIO, canvasToBlob(), CropArea, cropImageToFile(), loadImage(), readImageSize(), ALLOWED, BannerImageField() (+8 more)

### Community 29 - "order/model.ts"
Cohesion: 0.17
Nodes (15): BadgeInput, badgeKeys, badgeMutations, BadgeRecord, fetchBadges(), mapBadge(), seedFallback(), useCreateBadge() (+7 more)

### Community 30 - "FloatingActions.tsx"
Cohesion: 0.32
Nodes (7): CollectionMutationsConfig, FIELD_CODE_RU, invalidate(), listKeys(), MutationKeys, QueryKey, syncDetail()

### Community 31 - "useCategories"
Cohesion: 0.10
Nodes (27): useTheme(), CartToggle(), formatOrderSum(), Props, SumRow(), ThemeToggle(), FreshStamp(), STAMP_GLYPHS (+19 more)

### Community 32 - "order/api.ts"
Cohesion: 0.12
Nodes (24): buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams, CustomersPageResult, fetchCustomerById() (+16 more)

### Community 33 - "customer/api.ts"
Cohesion: 0.17
Nodes (28): articleFor(), assertArticleAvailable(), buildDescr(), buildNewOrderPayload(), calcCouponDiscount(), checkPromo(), countRecentOrdersByPhone(), findSize() (+20 more)

### Community 34 - "banner/api.ts"
Cohesion: 0.12
Nodes (25): adminProductKeys, createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchAdminProducts() (+17 more)

### Community 35 - "addon/api.ts"
Cohesion: 0.14
Nodes (35): addEmailsToRecord(), applyNames(), applyOAuthNames(), applyOAuthProfileBeforeSave(), asObject(), emailsFromYandexOAuth(), ensureCreateDataField(), ensureCreateDataPhone() (+27 more)

### Community 36 - "order/model.ts"
Cohesion: 0.13
Nodes (21): buildSeries(), buildTopProducts(), countByFilter(), DashboardData, dashboardKeys, DashboardSection(), dayKey(), fetchDashboard() (+13 more)

### Community 37 - "articles.ts"
Cohesion: 0.08
Nodes (24): 1. Singleton-записи, 2. Новая auth-коллекция `app_users` (клиенты витрины), 3. Правки `orders`, 4. Правки `frontpad_settings`, 5. Правки `frontpad_jobs`, 6. Rate limits, TASK_order — профиль клиента, оформление заказа, витрина-модалка, Зона БД / инфры — делает владелец, агент не трогает (+16 more)

### Community 38 - "MobileTabBar.tsx"
Cohesion: 0.16
Nodes (26): bytesToBase64Url(), callbackUrl(), cryptoKey(), exchangeAuthCode(), findExternalUser(), findOrCreateUser(), formEncode(), fromBase64Url() (+18 more)

### Community 39 - "HomePage.tsx"
Cohesion: 0.29
Nodes (7): AdminTopbar(), AdminTopbarProps, fetchNewOrdersCount(), newOrdersKey, pb, queryClient, QueryKey

### Community 40 - "MobileHome.tsx"
Cohesion: 0.29
Nodes (11): accountCacheKey(), addAddress(), getAccount(), persistRecord(), removeAddress(), requireAccountId(), saveAddresses(), setDefaultAddress() (+3 more)

### Community 41 - "TagFilters.tsx"
Cohesion: 0.17
Nodes (18): completeVkOneTap(), loginWithVkId(), createVkPkce(), randomAlphabet(), resolveVkAppId(), attachVkOneTap(), getPkce(), isBenignVkError() (+10 more)

### Community 42 - "webhook.js"
Cohesion: 0.52
Nodes (6): applyStatusChange(), constantTimeEqual(), handleStatusWebhook(), readQueryToken(), readWebhookBody(), verifyHookToken()

### Community 43 - "pb.ts"
Cohesion: 0.18
Nodes (16): useAddons(), useFrontpadStockArticles(), articleConflictMessage(), ArticleExclude, ArticleRef, cellLabel(), collectArticleConflicts(), isExcludedCell() (+8 more)

### Community 44 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, preview, typecheck, type (+1 more)

### Community 45 - "AdminSidebar.tsx"
Cohesion: 0.12
Nodes (15): useCategories(), CategoryIcon(), Props, BADGE_LABEL, ORDER_RULES, resolveBadgeLabel(), Chip(), ChipProps (+7 more)

### Community 46 - "CustomerDrawer.tsx"
Cohesion: 0.05
Nodes (98): useDeleteAddon(), useBanners(), useDeleteBanner(), useUpdateBanner(), useDeleteCategory(), useCoupons(), useDeleteCoupon(), useCustomersPage() (+90 more)

### Community 47 - "order/model.ts"
Cohesion: 0.33
Nodes (8): fetchBonus(), useAccount(), useProfileBonus(), useCreateOrder(), savedToParts(), useCheckout(), UseCheckoutArgs, BonusTab()

### Community 48 - "@radix-ui/react-slot"
Cohesion: 0.33
Nodes (7): orderKeys, subscribeOrderStatus(), usePublicOrder(), repeatOrderIntoCart(), useLiveOrder(), OrderTrackPage(), RepeatButton()

### Community 49 - "HomePage.tsx"
Cohesion: 0.11
Nodes (15): Addon, AddonKind, frontpadStockKeys, fetchStoppedArticles(), stoppedArticlesKey, addons, extras, IMG (+7 more)

### Community 50 - "invalidateProductRatings"
Cohesion: 0.14
Nodes (29): accountKeys, asId(), asString(), BonusResponse, isAppUserRecord(), linkPhone(), loginWithOAuth(), mapAddress() (+21 more)

### Community 51 - "ProductCard.tsx"
Cohesion: 0.33
Nodes (4): LoginPanel(), VkOneTap(), VkOneTapProps, SITE

### Community 52 - "@radix-ui/react-slot"
Cohesion: 0.36
Nodes (11): useBadges(), badgeLabel(), PRODUCT_ASPECT_RATIO, minPrice(), isProductStopped(), useStoppedArticles(), ProductCard(), ProductCardProps (+3 more)

### Community 55 - "Sparkline.tsx"
Cohesion: 0.17
Nodes (16): DEFAULT_STATUS_MAP, buildHookUrl(), coerceJsonArray(), decodeByteJson(), getHookToken(), isArrayLike(), loadFrontpadSettings(), pad2() (+8 more)

### Community 56 - "CouponForm.tsx"
Cohesion: 0.16
Nodes (18): addonKeys, addonMutations, AddonRecord, CreateAddonInput, createBody(), fetchAddonById(), fetchAddons(), fetchAddonsByKind() (+10 more)

### Community 58 - "AdminPage.tsx"
Cohesion: 0.06
Nodes (54): couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail, PromoCheckOk (+46 more)

### Community 59 - "send.js"
Cohesion: 0.40
Nodes (9): claimOrderSend(), createDryRunJob(), nowPb(), patchFrontpadSettings(), patchOrder(), patchSendFailure(), recordToOrder(), sendOrder() (+1 more)

### Community 60 - "banner-image-field.tsx"
Cohesion: 0.15
Nodes (17): useProducts(), useFrontpadStockRealtime(), CheckoutDialogState, useCheckoutDialogStore, SearchDialog(), SearchDialogProps, HomeMobileTabBar(), HomePage() (+9 more)

### Community 61 - "jobs.js"
Cohesion: 0.24
Nodes (16): backoffMinutes(), buildKindFilter(), claimNextJob(), completeJob(), failJob(), formatPbDateTime(), isJobReady(), parseUpdatedMs() (+8 more)

### Community 62 - "http.js"
Cohesion: 0.36
Nodes (4): call(), extractWarnings(), formEncode(), maskSecret()

### Community 63 - "AddonForm.tsx"
Cohesion: 0.23
Nodes (12): AccountAuth, AccountContext, AccountProvider(), isAbortError(), refreshAuth(), useAccount(), acceptAuthToken(), getClientAuthEpoch() (+4 more)

### Community 64 - "loginWithOAuth"
Cohesion: 0.17
Nodes (20): useProductBySlug(), articleFor(), cartLineTitle(), findSize(), findVariant(), hasMissingArticle(), SkuCell, skuMatrix() (+12 more)

### Community 65 - "@radix-ui/react-dialog"
Cohesion: 0.40
Nodes (5): AdminPage(), adminCountKeys, AdminCounts, fetchAdminCounts(), useAdminCounts()

### Community 66 - "react-router-dom"
Cohesion: 0.23
Nodes (8): catalogSectionId(), Options, useCatalogScrollSpy(), CatalogCategorySection(), Props, Props, CategoryTiles(), Props

### Community 67 - "DesktopHome.tsx"
Cohesion: 0.15
Nodes (14): needsChooser(), Product, useAddProduct(), CartPanelState, useCartPanelStore, CartDock(), groupProductsByCategory(), DesktopHome() (+6 more)

### Community 69 - "sync.js"
Cohesion: 0.32
Nodes (13): formatPbDateTime(), isNoStopsResponse(), isProductsSyncAllowed(), listAllStock(), normalizeArticle(), parsePrice(), parseSaleFlag(), parseSyncDate() (+5 more)

### Community 70 - "HeroBanner.tsx"
Cohesion: 0.18
Nodes (16): fetchActiveResendJobs(), mapJob(), resendOrder(), useOrderJobs(), useResendOrder(), isFrontpadWarning(), ORDER_STATUS_FLOW, ORDER_STATUS_SOURCE_LABEL (+8 more)

### Community 73 - "category/api.ts"
Cohesion: 0.13
Nodes (25): fetchMyOrders(), useMyOrders(), isActiveOrderStatus(), formatAddressLine(), canUseStorage(), getLatestLocalOrderId(), isStoredOrder(), listLocalOrderIds() (+17 more)

### Community 74 - "App.tsx"
Cohesion: 0.14
Nodes (13): AdminGate(), AdminLogin, AdminPage, AppRoutes(), AuthCallbackPage, EASE, EXIT_ABS, loadMotionFeatures() (+5 more)

### Community 75 - "files.ts"
Cohesion: 0.14
Nodes (17): FrontpadJob, FrontpadJobKind, FrontpadJobStatus, Order, ORDER_STATUS_LABEL, OrderLineAddon, OrderLineSnapshot, OrderStatusSource (+9 more)

### Community 76 - "AdminTopbar.tsx"
Cohesion: 0.11
Nodes (21): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+13 more)

### Community 77 - "NutritionHint.tsx"
Cohesion: 0.24
Nodes (8): App(), readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), container, GlassDefs()

### Community 80 - "lucide-react"
Cohesion: 0.47
Nodes (9): applyPrices(), cloneSize(), cloneVariant(), listAll(), loadStockMap(), planProduct(), roundPrice(), sizeLabel() (+1 more)

### Community 91 - "NutritionHint.tsx"
Cohesion: 0.43
Nodes (5): formatGrams(), NutritionHint(), useIsDesktop(), useIsWide(), useMediaQuery()

## Ambiguous Edges - Review These
- `figma-make-app` → `Logo CMYK`  [AMBIGUOUS]
  temp/логотип/лого CMYK.pdf · relation: conceptually_related_to
- `figma-make-app` → `Logo RGB`  [AMBIGUOUS]
  temp/логотип/лого RGB.pdf · relation: conceptually_related_to

## Knowledge Gaps
- **402 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+397 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `figma-make-app` and `Logo CMYK`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `figma-make-app` and `Logo RGB`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `VitrineScrollProvider()` connect `banner-image-field.tsx` to `package.json`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **Why does `dependencies` connect `package.json` to `zustand`, `StickyBar.tsx`, `package.json`, `router.tsx`, `sonner`, `lucide-react`, `@tanstack/react-query`, `@radix-ui/react-popover`, `SettingsSection.tsx`, `theme.tsx`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **Why does `lenis` connect `package.json` to `banner-image-field.tsx`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _402 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `addon/api.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12698412698412698 - nodes in this community are weakly interconnected._