# Graph Report - shahlik  (2026-08-28)

## Corpus Check
- 199 files · ~1,427,507 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1485 nodes · 3870 edges · 91 communities (80 shown, 11 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 148 edges (avg confidence: 0.53)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `142341a4`
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
- localOrders.ts
- jobs.js
- http.js
- AddonForm.tsx
- banner-image-field.tsx
- @radix-ui/react-dialog
- react-router-dom
- tailwind-merge
- CategoryForm.tsx
- sync.js
- HeroBanner.tsx
- category/api.ts
- category/model.ts
- files.ts
- AdminTopbar.tsx
- NutritionHint.tsx
- class-variance-authority
- lucide-react
- @radix-ui/react-dialog
- theme.tsx
- category/model.ts
- HeroBanner.tsx
- tailwind-merge
- lucide-react
- @radix-ui/react-popover
- @radix-ui/react-tooltip
- zustand

## God Nodes (most connected - your core abstractions)
1. `cn()` - 119 edges
2. `formatPrice()` - 50 edges
3. `Button()` - 43 edges
4. `useCartTotals()` - 24 edges
5. `ProductEditor()` - 23 edges
6. `Input()` - 23 edges
7. `useCategories()` - 22 edges
8. `pb` - 21 edges
9. `useAdminProducts()` - 20 edges
10. `useConfirm()` - 19 edges

## Surprising Connections (you probably didn't know these)
- `Logo CMYK` --conceptually_related_to--> `figma-make-app`  [AMBIGUOUS]
  temp/логотип/лого CMYK.pdf → AGENTS.md
- `Logo RGB` --conceptually_related_to--> `figma-make-app`  [AMBIGUOUS]
  temp/логотип/лого RGB.pdf → AGENTS.md
- `toStatusMap()` --references--> `DEFAULT_STATUS_MAP`  [EXTRACTED]
  pb_hooks/lib/config.js → apps/shashlik-web/src/entities/settings/model.ts
- `AdminGate()` --calls--> `useAdminAuth()`  [EXTRACTED]
  apps/shashlik-web/src/app/router.tsx → apps/shashlik-web/src/shared/api/auth.tsx
- `AdminAuthProvider()` --indirect_call--> `logout()`  [INFERRED]
  apps/shashlik-web/src/shared/api/auth.tsx → apps/shashlik-web/src/entities/account/api.ts

## Import Cycles
- None detected.

## Communities (91 total, 11 thin omitted)

### Community 0 - "addon/api.ts"
Cohesion: 0.17
Nodes (15): BadgeInput, badgeKeys, badgeMutations, BadgeRecord, fetchBadges(), mapBadge(), seedFallback(), useCreateBadge() (+7 more)

### Community 1 - "UI Layout Components"
Cohesion: 0.09
Nodes (32): adminReviewKeys, buildOrdersFilter(), createOrder(), CreateOrderInput, CreateReviewInput, fetchAdminReviews(), fetchOrderById(), fetchOrders() (+24 more)

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
Cohesion: 0.21
Nodes (12): ProductOption, ReviewFormProps, STATUS_FILTERS, EmptyState(), Props, PhoneOnboarding(), PhoneOnboardingProps, Button() (+4 more)

### Community 6 - "Meal Add-ons UI"
Cohesion: 0.21
Nodes (11): CreateStaffInput, fetchStaff(), mapStaff(), mapStaffRequired(), staffKeys, StaffMember, staffMutations, StaffRecord (+3 more)

### Community 7 - "Checkout Flow UI"
Cohesion: 0.11
Nodes (18): API-правила (PB Rules), Env / инфра, `pb_hooks` (JSVM), TASK_DB — подключение PocketBase (сайт + админка) с прицелом на Frontpad, Архитектура, Зона БД — делаю сам (PocketBase Admin UI, `pb_hooks`, env), Зона кода — делает агент (после того как коллекции выше созданы), Коллекции (имена полей = 1:1 с `entities/*/model.ts`, где возможно) (+10 more)

### Community 8 - "package.json"
Cohesion: 0.12
Nodes (17): dependencies, class-variance-authority, clsx, motion, @radix-ui/react-dialog, react, react-dom, react-easy-crop (+9 more)

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
Cohesion: 0.14
Nodes (21): asStatusMap(), enqueueApplyPricesJob(), fetchActiveSyncJobs(), fetchApplyPricesJobs(), fetchFrontpadStock(), fetchStoppedStock(), FrontpadJobRecord, FrontpadSettingsRecord (+13 more)

### Community 21 - "product/api.ts"
Cohesion: 0.07
Nodes (26): 1. env процесса `pocketbase` (systemd unit, `Environment=`), 2. Правки коллекций в `/_/` (и синхронно в `Tasks/schema.json`), 3. Rate limits PocketBase (`/_/` → Settings → Rate limits), 4. Настройки Frontpad (оператор), 5. Деплой `pb_hooks`, TASK_inter — интеграция с кассой Frontpad (боевая), Зона БД / инфры — делает владелец, агент не трогает, Зона кода — агент (+18 more)

### Community 22 - "ProductEditor.tsx"
Cohesion: 0.18
Nodes (14): AdminLogin(), loadDomMax(), SectionStub(), ADMIN_NAV, AdminNavItem, AdminRole, AdminSectionId, AdminSidebar() (+6 more)

### Community 23 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 24 - "cn"
Cohesion: 0.09
Nodes (23): ALL_CATEGORY, CategoryId, KNOWN_CATEGORY_IDS, KnownCategoryId, needsChooser(), DEFAULT_CRITERIA, MeatIcon, ProductBadge (+15 more)

### Community 25 - "HomePage.tsx"
Cohesion: 0.21
Nodes (19): applyClientData(), backfillOrders(), bindPhoneToUser(), bonusFromCustomer(), createCustomer(), ensureCustomer(), fetchClientFromCash(), findAppUserByPhone() (+11 more)

### Community 26 - "category/api.ts"
Cohesion: 0.11
Nodes (26): useAddons(), useCreateAddon(), useUpdateAddon(), Addon, AddonKind, useAdminProducts(), useFrontpadStockArticles(), articleConflictMessage() (+18 more)

### Community 27 - "cn.ts"
Cohesion: 0.06
Nodes (38): App(), readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), useTheme(), AdminGate() (+30 more)

### Community 28 - "StickyBar.tsx"
Cohesion: 0.17
Nodes (12): couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail, PromoCheckOk (+4 more)

### Community 29 - "order/model.ts"
Cohesion: 0.12
Nodes (18): FrontpadJob, FrontpadJobKind, FrontpadJobStatus, Order, ORDER_STATUS_FLOW, ORDER_STATUS_LABEL, ORDER_STATUS_SOURCE_LABEL, OrderLineAddon (+10 more)

### Community 30 - "FloatingActions.tsx"
Cohesion: 0.29
Nodes (6): AddonRow(), Props, SIZES, StepBtn(), Stepper(), StepperProps

### Community 31 - "useCategories"
Cohesion: 0.15
Nodes (17): SumRow(), FreshStamp(), STAMP_GLYPHS, cn(), OptionCard(), PopoverContent(), OptionData, parseOptions() (+9 more)

### Community 32 - "order/api.ts"
Cohesion: 0.13
Nodes (23): buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams, CustomersPageResult, fetchCustomerById() (+15 more)

### Community 33 - "customer/api.ts"
Cohesion: 0.17
Nodes (28): articleFor(), assertArticleAvailable(), buildDescr(), buildNewOrderPayload(), calcCouponDiscount(), checkPromo(), countRecentOrdersByPhone(), findSize() (+20 more)

### Community 34 - "banner/api.ts"
Cohesion: 0.13
Nodes (21): adminProductKeys, createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchProductById() (+13 more)

### Community 35 - "addon/api.ts"
Cohesion: 0.20
Nodes (23): addEmailsToRecord(), applyNames(), applyOAuthProfileBeforeSave(), asObject(), emailsFromYandexOAuth(), extractVkProfile(), extractYandexProfile(), finalizeOAuthLogin() (+15 more)

### Community 36 - "order/model.ts"
Cohesion: 0.13
Nodes (20): OrderLineSnapshot, buildSeries(), buildTopProducts(), countByFilter(), DashboardData, dashboardKeys, dayKey(), fetchDashboard() (+12 more)

### Community 37 - "articles.ts"
Cohesion: 0.08
Nodes (24): 1. Singleton-записи, 2. Новая auth-коллекция `app_users` (клиенты витрины), 3. Правки `orders`, 4. Правки `frontpad_settings`, 5. Правки `frontpad_jobs`, 6. Rate limits, TASK_order — профиль клиента, оформление заказа, витрина-модалка, Зона БД / инфры — делает владелец, агент не трогает (+16 more)

### Community 38 - "MobileTabBar.tsx"
Cohesion: 0.19
Nodes (22): bytesToBase64Url(), callbackUrl(), cryptoKey(), findExternalUser(), findOrCreateUser(), formEncode(), fromBase64Url(), getVkCredentials() (+14 more)

### Community 39 - "HomePage.tsx"
Cohesion: 0.47
Nodes (3): orderKeys, queryClient, QueryKey

### Community 40 - "MobileHome.tsx"
Cohesion: 0.05
Nodes (55): useCategories(), fetchTags(), mapTag(), TagInput, tagKeys, tagMutations, TagRecord, tagsForCategory() (+47 more)

### Community 41 - "TagFilters.tsx"
Cohesion: 0.12
Nodes (23): useDeleteAddon(), useBanners(), useDeleteBanner(), AddonsSection(), KIND_FILTERS, BannersSection(), STATUS_FILTERS, Props (+15 more)

### Community 42 - "webhook.js"
Cohesion: 0.52
Nodes (6): applyStatusChange(), constantTimeEqual(), handleStatusWebhook(), readQueryToken(), readWebhookBody(), verifyHookToken()

### Community 43 - "pb.ts"
Cohesion: 0.16
Nodes (21): ApplyPricesJobResult, asRowList(), buildCells(), CashPriceCell, CashPricePlan, CashPriceStatus, cellDelta(), parseApplyPricesResult() (+13 more)

### Community 44 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, preview, typecheck, type (+1 more)

### Community 45 - "AdminSidebar.tsx"
Cohesion: 0.06
Nodes (51): AppliedCoupon, calcCouponDiscount(), formatCouponValue(), DeliveryMode, OrderAddressParts, useProducts(), fetchSettings(), mapSettings() (+43 more)

### Community 46 - "CustomerDrawer.tsx"
Cohesion: 0.29
Nodes (9): useCreateCategory(), useDeleteCategory(), useUpdateCategory(), Category, CategoriesSection(), CategoryForm(), Props, CATEGORY_ICONS (+1 more)

### Community 47 - "order/model.ts"
Cohesion: 0.27
Nodes (10): fetchAdminProducts(), fetchProducts(), mapProduct(), mapTagSlugs(), filenamesOf(), FileRecord, imageFilenames(), imageUrl() (+2 more)

### Community 49 - "HomePage.tsx"
Cohesion: 0.15
Nodes (18): fetchMyOrders(), useMyOrders(), isActiveOrderStatus(), repeatOrderIntoCart(), getLatestLocalOrderId(), useLiveOrder(), OrderTrackPage(), allEmails() (+10 more)

### Community 50 - "invalidateProductRatings"
Cohesion: 0.28
Nodes (8): collectionMutations(), CollectionMutationsConfig, FIELD_CODE_RU, invalidate(), listKeys(), MutationKeys, QueryKey, syncDetail()

### Community 51 - "ProductCard.tsx"
Cohesion: 0.18
Nodes (21): useBadges(), badgeLabel(), PRODUCT_ASPECT_RATIO, minPrice(), isProductStopped(), useStoppedArticles(), ProductCard(), ProductCardProps (+13 more)

### Community 52 - "@radix-ui/react-slot"
Cohesion: 0.16
Nodes (15): bannerKeys, bannerMutations, BannerRecord, CreateBannerInput, fetchBannerById(), fetchBanners(), mapBanner(), UpdateBannerInput (+7 more)

### Community 54 - "@tanstack/react-query"
Cohesion: 0.16
Nodes (14): useDeleteProduct(), useDuplicateProduct(), useUpdateProduct(), imagesFromProduct(), MEAT_OPTIONS, newId(), PreviewToggle(), ProductEditor() (+6 more)

### Community 55 - "Sparkline.tsx"
Cohesion: 0.18
Nodes (15): buildHookUrl(), coerceJsonArray(), decodeByteJson(), getHookToken(), isArrayLike(), loadFrontpadSettings(), pad2(), parseJsonField() (+7 more)

### Community 56 - "CouponForm.tsx"
Cohesion: 0.23
Nodes (12): addonKeys, addonMutations, AddonRecord, CreateAddonInput, fetchAddonById(), fetchAddons(), fetchAddonsByKind(), fetchExtras() (+4 more)

### Community 57 - "SettingsSection.tsx"
Cohesion: 0.16
Nodes (17): checkPromo(), enqueueSyncJob(), syncJobKeys, updateFrontpadSettings(), useEnqueueSyncJob(), useUpdateFrontpadSettings(), formatRemaining(), FrontpadPanel() (+9 more)

### Community 58 - "AdminPage.tsx"
Cohesion: 0.22
Nodes (12): useCoupons(), useCreateCoupon(), useDeleteCoupon(), useUpdateCoupon(), CouponForm(), KIND_OPTIONS, Props, toDateInput() (+4 more)

### Community 59 - "send.js"
Cohesion: 0.40
Nodes (9): claimOrderSend(), createDryRunJob(), nowPb(), patchFrontpadSettings(), patchOrder(), patchSendFailure(), recordToOrder(), sendOrder() (+1 more)

### Community 60 - "localOrders.ts"
Cohesion: 0.36
Nodes (9): UseCheckoutArgs, canUseStorage(), isStoredOrder(), listLocalOrderIds(), load(), prune(), rememberLocalOrder(), save() (+1 more)

### Community 61 - "jobs.js"
Cohesion: 0.24
Nodes (16): backoffMinutes(), buildKindFilter(), claimNextJob(), completeJob(), failJob(), formatPbDateTime(), isJobReady(), parseUpdatedMs() (+8 more)

### Community 62 - "http.js"
Cohesion: 0.36
Nodes (4): call(), extractWarnings(), formEncode(), maskSecret()

### Community 63 - "AddonForm.tsx"
Cohesion: 0.20
Nodes (13): useCustomersPage(), CustomersSection(), STATUS_FILTERS, Column, DataTable(), Props, SortDir, Props (+5 more)

### Community 64 - "banner-image-field.tsx"
Cohesion: 0.07
Nodes (36): BannerNote, BANNER_ASPECT_RATIO, Banner, useCreateProduct(), banners, Props, DEFAULT_NUTRITION, ProductCreateForm() (+28 more)

### Community 65 - "@radix-ui/react-dialog"
Cohesion: 0.12
Nodes (24): AccountAuth, AccountContext, AccountProvider(), isAbortError(), refreshAuth(), useAccount(), acceptAuthToken(), asId() (+16 more)

### Community 67 - "tailwind-merge"
Cohesion: 0.20
Nodes (8): fetchBonus(), subscribeAccount(), useAccount(), useProfileBonus(), CategoryIcon(), Props, BonusTab(), SidebarProps

### Community 69 - "sync.js"
Cohesion: 0.32
Nodes (13): formatPbDateTime(), isNoStopsResponse(), isProductsSyncAllowed(), listAllStock(), normalizeArticle(), parsePrice(), parseSaleFlag(), parseSyncDate() (+5 more)

### Community 70 - "HeroBanner.tsx"
Cohesion: 0.22
Nodes (15): fetchActiveResendJobs(), mapJob(), resendOrder(), useOrder(), useOrderJobs(), useResendOrder(), useUpdateOrderStatus(), isFrontpadWarning() (+7 more)

### Community 73 - "category/api.ts"
Cohesion: 0.19
Nodes (20): accountCacheKey(), accountKeys, addAddress(), BonusResponse, getAccount(), persistRecord(), removeAddress(), requireAccountId() (+12 more)

### Community 74 - "category/model.ts"
Cohesion: 0.16
Nodes (14): frontpadSettingsKeys, settingsKeys, updateSettings(), useUpdateSettings(), DEFAULT_STATUS_MAP, FrontpadSettings, FrontpadStockItem, PriceSource (+6 more)

### Community 75 - "files.ts"
Cohesion: 0.24
Nodes (10): useCreateStaff(), useDeleteStaff(), useRequestStaffPasswordReset(), useUpdateStaff(), ROLE_FILTERS, ROLE_LABEL, StaffCreateForm(), StaffSection() (+2 more)

### Community 76 - "AdminTopbar.tsx"
Cohesion: 0.27
Nodes (9): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+1 more)

### Community 77 - "NutritionHint.tsx"
Cohesion: 0.16
Nodes (23): useExtras(), useSauces(), useProductBySlug(), articleFor(), cartLineTitle(), findSize(), findVariant(), hasMissingArticle() (+15 more)

### Community 78 - "class-variance-authority"
Cohesion: 0.25
Nodes (6): LoginPanel(), PROVIDERS, BADGE_LABEL, ORDER_RULES, resolveBadgeLabel(), SITE

### Community 80 - "lucide-react"
Cohesion: 0.47
Nodes (9): applyPrices(), cloneSize(), cloneVariant(), listAll(), loadStockMap(), planProduct(), roundPrice(), sizeLabel() (+1 more)

### Community 81 - "@radix-ui/react-dialog"
Cohesion: 0.32
Nodes (8): createBody(), updateBody(), bannerFormData(), useCreateBanner(), useUpdateBanner(), BannerForm(), toFormData(), toUploadFormData()

### Community 82 - "theme.tsx"
Cohesion: 0.38
Nodes (7): invalidateProductRatings(), useCreateReview(), useDeleteReview(), useToggleReviewPublished(), useUpdateReview(), ReviewForm(), ReviewsSection()

### Community 84 - "HeroBanner.tsx"
Cohesion: 0.47
Nodes (6): asNumberList(), asStringList(), fetchFrontpadSettings(), mapFrontpadSettings(), useFrontpadSettings(), frontpadSettingsFallback()

## Ambiguous Edges - Review These
- `figma-make-app` → `Logo CMYK`  [AMBIGUOUS]
  temp/логотип/лого CMYK.pdf · relation: conceptually_related_to
- `figma-make-app` → `Logo RGB`  [AMBIGUOUS]
  temp/логотип/лого RGB.pdf · relation: conceptually_related_to

## Knowledge Gaps
- **393 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+388 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `figma-make-app` and `Logo CMYK`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `figma-make-app` and `Logo RGB`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `cn()` connect `useCategories` to `addon/api.ts`, `Sushi Catalog UI`, `ProductEditor.tsx`, `category/api.ts`, `cn.ts`, `order/model.ts`, `FloatingActions.tsx`, `order/model.ts`, `MobileHome.tsx`, `TagFilters.tsx`, `pb.ts`, `AdminSidebar.tsx`, `CustomerDrawer.tsx`, `HomePage.tsx`, `ProductCard.tsx`, `@tanstack/react-query`, `AdminPage.tsx`, `AddonForm.tsx`, `banner-image-field.tsx`, `tailwind-merge`, `files.ts`, `NutritionHint.tsx`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Why does `Button()` connect `Sushi Catalog UI` to `addon/api.ts`, `ProductEditor.tsx`, `category/api.ts`, `useCategories`, `order/api.ts`, `MobileHome.tsx`, `TagFilters.tsx`, `pb.ts`, `AdminSidebar.tsx`, `CustomerDrawer.tsx`, `HomePage.tsx`, `ProductCard.tsx`, `@tanstack/react-query`, `SettingsSection.tsx`, `AdminPage.tsx`, `AddonForm.tsx`, `banner-image-field.tsx`, `HeroBanner.tsx`, `category/model.ts`, `files.ts`, `NutritionHint.tsx`, `class-variance-authority`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `formatPrice()` connect `ProductCard.tsx` to `order/api.ts`, `order/model.ts`, `HeroBanner.tsx`, `TagFilters.tsx`, `pb.ts`, `AdminSidebar.tsx`, `NutritionHint.tsx`, `HomePage.tsx`, `@tanstack/react-query`, `SettingsSection.tsx`, `AdminPage.tsx`, `localOrders.ts`, `order/model.ts`, `FloatingActions.tsx`, `AddonForm.tsx`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _393 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `UI Layout Components` be split into smaller, more focused modules?**
  _Cohesion score 0.0946969696969697 - nodes in this community are weakly interconnected._