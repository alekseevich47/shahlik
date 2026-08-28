# Graph Report - shahlik  (2026-08-28)

## Corpus Check
- 203 files · ~1,429,987 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1547 nodes · 4030 edges · 94 communities (86 shown, 8 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 151 edges (avg confidence: 0.53)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3b8b1436`
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
- getAccount
- localOrders.ts
- useCatalogScrollSpy.ts
- CategoryForm.tsx
- tailwind-merge
- lucide-react
- @radix-ui/react-popover
- @radix-ui/react-tooltip
- zustand
- NutritionHint.tsx
- theme.tsx
- query-client.ts

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
- `toStatusMap()` --references--> `DEFAULT_STATUS_MAP`  [EXTRACTED]
  pb_hooks/lib/config.js → apps/shashlik-web/src/entities/settings/model.ts
- `AccountProvider()` --indirect_call--> `loginWithOAuth()`  [INFERRED]
  apps/shashlik-web/src/app/providers/account.tsx → apps/shashlik-web/src/entities/account/api.ts
- `AdminGate()` --calls--> `useAdminAuth()`  [EXTRACTED]
  apps/shashlik-web/src/app/router.tsx → apps/shashlik-web/src/shared/api/auth.tsx

## Import Cycles
- None detected.

## Communities (94 total, 8 thin omitted)

### Community 0 - "addon/api.ts"
Cohesion: 0.17
Nodes (15): BadgeInput, badgeKeys, badgeMutations, BadgeRecord, fetchBadges(), mapBadge(), seedFallback(), useCreateBadge() (+7 more)

### Community 1 - "UI Layout Components"
Cohesion: 0.08
Nodes (38): adminReviewKeys, buildOrdersFilter(), createOrder(), CreateReviewInput, fetchActiveResendJobs(), fetchAdminReviews(), fetchMyOrders(), fetchOrderById() (+30 more)

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
Cohesion: 0.05
Nodes (55): bannerFormData(), bannerKeys, bannerMutations, BannerNote, BannerRecord, CreateBannerInput, fetchBannerById(), fetchBanners() (+47 more)

### Community 6 - "Meal Add-ons UI"
Cohesion: 0.16
Nodes (16): CreateStaffInput, fetchStaff(), mapStaff(), mapStaffRequired(), staffKeys, StaffMember, staffMutations, StaffRecord (+8 more)

### Community 7 - "Checkout Flow UI"
Cohesion: 0.11
Nodes (18): API-правила (PB Rules), Env / инфра, `pb_hooks` (JSVM), TASK_DB — подключение PocketBase (сайт + админка) с прицелом на Frontpad, Архитектура, Зона БД — делаю сам (PocketBase Admin UI, `pb_hooks`, env), Зона кода — делает агент (после того как коллекции выше созданы), Коллекции (имена полей = 1:1 с `entities/*/model.ts`, где возможно) (+10 more)

### Community 8 - "package.json"
Cohesion: 0.09
Nodes (23): dependencies, class-variance-authority, clsx, lucide-react, motion, @radix-ui/react-slot, react-dom, react-easy-crop (+15 more)

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
Cohesion: 0.12
Nodes (25): checkPromo(), applyPricesJobKeys, enqueueApplyPricesJob(), enqueueSyncJob(), fetchActiveSyncJobs(), fetchApplyPricesJobs(), fetchFrontpadStock(), fetchStoppedStock() (+17 more)

### Community 21 - "product/api.ts"
Cohesion: 0.07
Nodes (26): 1. env процесса `pocketbase` (systemd unit, `Environment=`), 2. Правки коллекций в `/_/` (и синхронно в `Tasks/schema.json`), 3. Rate limits PocketBase (`/_/` → Settings → Rate limits), 4. Настройки Frontpad (оператор), 5. Деплой `pb_hooks`, TASK_inter — интеграция с кассой Frontpad (боевая), Зона БД / инфры — делает владелец, агент не трогает, Зона кода — агент (+18 more)

### Community 22 - "ProductEditor.tsx"
Cohesion: 0.23
Nodes (10): loadDomMax(), ProductEditorRoute(), SectionStub(), ADMIN_NAV, AdminNavItem, AdminRole, AdminSectionId, AdminSidebar() (+2 more)

### Community 23 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 24 - "cn"
Cohesion: 0.09
Nodes (23): useCategories(), needsChooser(), DEFAULT_CRITERIA, MeatIcon, Product, ProductBadge, ProductRating, ProductSize (+15 more)

### Community 25 - "HomePage.tsx"
Cohesion: 0.20
Nodes (20): applyClientData(), backfillOrders(), bindPhoneToUser(), bonusFromCustomer(), createCustomer(), ensureCustomer(), fetchClientFromCash(), findAppUserByPhone() (+12 more)

### Community 26 - "category/api.ts"
Cohesion: 0.12
Nodes (25): useAddons(), useAdminProducts(), useFrontpadStockArticles(), articleConflictMessage(), ArticleExclude, ArticleRef, cellLabel(), collectArticleConflicts() (+17 more)

### Community 27 - "cn.ts"
Cohesion: 0.17
Nodes (15): GuardedSection(), AdminAuth, AdminAuthContext, AdminAuthProvider(), authErrorMessage(), can(), isAbortError(), isStaffRecord() (+7 more)

### Community 28 - "StickyBar.tsx"
Cohesion: 0.16
Nodes (13): readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), useTheme(), CartToggle(), formatOrderSum() (+5 more)

### Community 29 - "order/model.ts"
Cohesion: 0.13
Nodes (14): FrontpadJob, FrontpadJobKind, FrontpadJobStatus, ORDER_STATUS_FLOW, ORDER_STATUS_SOURCE_LABEL, OrderLineAddon, OrderStatus, OrderStatusSource (+6 more)

### Community 30 - "FloatingActions.tsx"
Cohesion: 0.18
Nodes (13): AdminTopbar(), fetchNewOrdersCount(), newOrdersKey, CollectionMutationsConfig, FIELD_CODE_RU, invalidate(), listKeys(), MutationKeys (+5 more)

### Community 31 - "useCategories"
Cohesion: 0.15
Nodes (17): SumRow(), FreshStamp(), STAMP_GLYPHS, cn(), OptionCard(), PopoverContent(), OptionData, parseOptions() (+9 more)

### Community 32 - "order/api.ts"
Cohesion: 0.13
Nodes (24): buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams, CustomersPageResult, fetchCustomerById() (+16 more)

### Community 33 - "customer/api.ts"
Cohesion: 0.17
Nodes (28): articleFor(), assertArticleAvailable(), buildDescr(), buildNewOrderPayload(), calcCouponDiscount(), checkPromo(), countRecentOrdersByPhone(), findSize() (+20 more)

### Community 34 - "banner/api.ts"
Cohesion: 0.10
Nodes (32): adminProductKeys, createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchAdminProducts() (+24 more)

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
Cohesion: 0.16
Nodes (17): fetchTags(), mapTag(), TagInput, tagKeys, tagMutations, TagRecord, tagsForCategory(), useCategoryTags() (+9 more)

### Community 40 - "MobileHome.tsx"
Cohesion: 0.21
Nodes (16): addAddress(), fetchBonus(), getAccount(), removeAddress(), saveAddresses(), setDefaultAddress(), updateAddress(), useAccount() (+8 more)

### Community 41 - "TagFilters.tsx"
Cohesion: 0.17
Nodes (19): completeVkOneTap(), loginWithVkId(), createVkPkce(), randomAlphabet(), resolveVkAppId(), attachVkOneTap(), detachVkOneTapHost(), ensureVkConfig() (+11 more)

### Community 42 - "webhook.js"
Cohesion: 0.52
Nodes (6): applyStatusChange(), constantTimeEqual(), handleStatusWebhook(), readQueryToken(), readWebhookBody(), verifyHookToken()

### Community 43 - "pb.ts"
Cohesion: 0.24
Nodes (12): ApplyPricesJobResult, asRowList(), buildCells(), CashPriceCell, CashPricePlan, CashPriceStatus, parseApplyPricesResult(), planAllCashPrices() (+4 more)

### Community 44 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, preview, typecheck, type (+1 more)

### Community 45 - "AdminSidebar.tsx"
Cohesion: 0.33
Nodes (8): fetchSettings(), mapSettings(), useSettings(), settingsFallback(), AddressBar(), PromoBanner(), Sidebar(), SidebarProps

### Community 46 - "CustomerDrawer.tsx"
Cohesion: 0.11
Nodes (30): useDeleteAddon(), useCreateCategory(), useUpdateCategory(), AddonsSection(), KIND_FILTERS, CategoryForm(), Props, STATUS_FILTERS (+22 more)

### Community 47 - "order/model.ts"
Cohesion: 0.21
Nodes (13): useCoupons(), useDeleteCoupon(), CouponsSection(), STATUS_FILTERS, OrderHistoryRow(), CustomersSection(), Column, DataTable() (+5 more)

### Community 48 - "@radix-ui/react-slot"
Cohesion: 0.16
Nodes (12): orderKeys, subscribeOrderStatus(), usePublicOrder(), repeatOrderIntoCart(), useLiveOrder(), OrderTrackPage(), RepeatButton(), LoginPanel() (+4 more)

### Community 49 - "HomePage.tsx"
Cohesion: 0.15
Nodes (24): useExtras(), useSauces(), frontpadStockKeys, useProductBySlug(), articleFor(), cartLineTitle(), findSize(), findVariant() (+16 more)

### Community 50 - "invalidateProductRatings"
Cohesion: 0.17
Nodes (27): accountCacheKey(), accountKeys, asId(), asString(), BonusResponse, isAppUserRecord(), linkPhone(), loginWithOAuth() (+19 more)

### Community 51 - "ProductCard.tsx"
Cohesion: 0.20
Nodes (15): formatCouponValue(), useCartTotals(), useCartStore, CartLineRow(), CartPanel(), MODE_OPTIONS, CartPromo(), CartTotals() (+7 more)

### Community 52 - "@radix-ui/react-slot"
Cohesion: 0.26
Nodes (14): useBadges(), badgeLabel(), PRODUCT_ASPECT_RATIO, minPrice(), isProductStopped(), useStoppedArticles(), ProductCard(), ProductCardProps (+6 more)

### Community 53 - "sonner"
Cohesion: 0.21
Nodes (13): cellDelta(), useApplyPricesJobs(), useEnqueueApplyPricesJob(), useFrontpadStock(), CashPricesPanel(), flattenPlans(), formatSigned(), PriceRow (+5 more)

### Community 54 - "@tanstack/react-query"
Cohesion: 0.18
Nodes (14): frontpadSettingsKeys, stoppedStockKeys, syncJobKeys, FrontpadSettings, PriceSource, formatRemaining(), FrontpadPanel(), parseDigitCodes() (+6 more)

### Community 55 - "Sparkline.tsx"
Cohesion: 0.18
Nodes (15): buildHookUrl(), coerceJsonArray(), decodeByteJson(), getHookToken(), isArrayLike(), loadFrontpadSettings(), pad2(), parseJsonField() (+7 more)

### Community 56 - "CouponForm.tsx"
Cohesion: 0.17
Nodes (17): addonKeys, addonMutations, AddonRecord, CreateAddonInput, createBody(), fetchAddonById(), fetchAddons(), fetchAddonsByKind() (+9 more)

### Community 57 - "SettingsSection.tsx"
Cohesion: 0.36
Nodes (10): canUseStorage(), getLatestLocalOrderId(), isStoredOrder(), listLocalOrderIds(), load(), prune(), rememberLocalOrder(), save() (+2 more)

### Community 58 - "AdminPage.tsx"
Cohesion: 0.12
Nodes (20): couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail, PromoCheckOk (+12 more)

### Community 59 - "send.js"
Cohesion: 0.40
Nodes (9): claimOrderSend(), createDryRunJob(), nowPb(), patchFrontpadSettings(), patchOrder(), patchSendFailure(), recordToOrder(), sendOrder() (+1 more)

### Community 60 - "banner-image-field.tsx"
Cohesion: 0.22
Nodes (9): lenis, LENIS_OPTIONS, Props, ScrollOptions, VitrineScrollApi, VitrineScrollContext, VitrineScrollProvider(), VitrineScrollTarget (+1 more)

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
Cohesion: 0.15
Nodes (11): Addon, addons, extras, IMG, sauces, AddonRow(), Props, SIZES (+3 more)

### Community 65 - "@radix-ui/react-dialog"
Cohesion: 0.15
Nodes (17): AddonKind, AdminLogin(), Props, ProductOption, ReviewFormProps, STATUS_FILTERS, ROLE_FILTERS, ROLE_LABEL (+9 more)

### Community 66 - "react-router-dom"
Cohesion: 0.31
Nodes (7): HomeMobileTabBar(), catalogSectionId(), Options, useCatalogScrollSpy(), useVitrineScroll(), CatalogCategorySection(), Props

### Community 67 - "DesktopHome.tsx"
Cohesion: 0.22
Nodes (9): CartPanelState, useCartPanelStore, CartDock(), groupProductsByCategory(), DesktopHome(), Props, Options, useInView() (+1 more)

### Community 68 - "StickyBar.tsx"
Cohesion: 0.31
Nodes (6): ALL_TAG, CategoryTag, TagFilterId, productTags, Props, SPRING

### Community 69 - "sync.js"
Cohesion: 0.32
Nodes (13): formatPbDateTime(), isNoStopsResponse(), isProductsSyncAllowed(), listAllStock(), normalizeArticle(), parsePrice(), parseSaleFlag(), parseSyncDate() (+5 more)

### Community 70 - "HeroBanner.tsx"
Cohesion: 0.16
Nodes (24): useOrder(), useOrderJobs(), useResendOrder(), useUpdateOrderStatus(), isFrontpadWarning(), Order, ORDER_STATUS_LABEL, OrderLineSnapshot (+16 more)

### Community 73 - "category/api.ts"
Cohesion: 0.12
Nodes (20): AppUser, NewSavedAddress, OAuthProvider, ProfileBonus, SavedAddress, UpdateAccountInput, useMyOrders(), isActiveOrderStatus() (+12 more)

### Community 74 - "App.tsx"
Cohesion: 0.11
Nodes (17): App(), AdminGate(), AdminLogin, AdminPage, AppRoutes(), AuthCallbackPage, EASE, EXIT_ABS (+9 more)

### Community 75 - "files.ts"
Cohesion: 0.14
Nodes (13): DeliveryMode, OrderAddressParts, addonFromCache(), CartTotals, productFromCache(), ResolvedAddon, ResolvedLine, resolveLine() (+5 more)

### Community 76 - "AdminTopbar.tsx"
Cohesion: 0.15
Nodes (15): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+7 more)

### Community 77 - "NutritionHint.tsx"
Cohesion: 0.25
Nodes (6): ALL_CATEGORY, Category, CategoryId, KNOWN_CATEGORY_IDS, KnownCategoryId, categories

### Community 78 - "router.tsx"
Cohesion: 0.31
Nodes (8): settingsKeys, useUpdateSettings(), Settings, parseNonNeg(), SettingsSection(), TabId, TABS, useCollectionRealtime()

### Community 80 - "lucide-react"
Cohesion: 0.47
Nodes (9): applyPrices(), cloneSize(), cloneVariant(), listAll(), loadStockMap(), planProduct(), roundPrice(), sizeLabel() (+1 more)

### Community 81 - "getAccount"
Cohesion: 0.32
Nodes (8): asNumberList(), asStatusMap(), asStringList(), fetchFrontpadSettings(), mapFrontpadSettings(), ORDER_STATUSES, useFrontpadSettings(), frontpadSettingsFallback()

### Community 82 - "localOrders.ts"
Cohesion: 0.33
Nodes (5): CategoryIcon(), Props, Props, STICKY_BAR, StickyBar()

### Community 83 - "useCatalogScrollSpy.ts"
Cohesion: 0.18
Nodes (11): useProducts(), CheckoutDialogState, useCheckoutDialogStore, HomePage(), MobileHome(), MobileHeader(), Props, MobileTab (+3 more)

### Community 84 - "CategoryForm.tsx"
Cohesion: 0.38
Nodes (5): DEFAULT_NUTRITION, ProductCreateForm(), Props, CYR_MAP, slugFromName()

### Community 91 - "NutritionHint.tsx"
Cohesion: 0.36
Nodes (6): ProductNutrition, formatGrams(), NutritionHint(), useIsDesktop(), useIsWide(), useMediaQuery()

## Ambiguous Edges - Review These
- `figma-make-app` → `Logo CMYK`  [AMBIGUOUS]
  temp/логотип/лого CMYK.pdf · relation: conceptually_related_to
- `figma-make-app` → `Logo RGB`  [AMBIGUOUS]
  temp/логотип/лого RGB.pdf · relation: conceptually_related_to

## Knowledge Gaps
- **401 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+396 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `figma-make-app` and `Logo CMYK`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `figma-make-app` and `Logo RGB`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `VitrineScrollProvider()` connect `banner-image-field.tsx` to `useCatalogScrollSpy.ts`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **Why does `dependencies` connect `package.json` to `package.json`, `theme.tsx`, `tailwind-merge`, `lucide-react`, `@radix-ui/react-popover`, `@radix-ui/react-tooltip`, `zustand`, `banner-image-field.tsx`, `query-client.ts`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **Why does `lenis` connect `banner-image-field.tsx` to `package.json`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _401 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `UI Layout Components` be split into smaller, more focused modules?**
  _Cohesion score 0.08367071524966262 - nodes in this community are weakly interconnected._