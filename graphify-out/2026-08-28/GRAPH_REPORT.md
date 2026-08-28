# Graph Report - shahlik  (2026-08-28)

## Corpus Check
- 199 files · ~1,428,113 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1499 nodes · 3915 edges · 96 communities (85 shown, 11 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 149 edges (avg confidence: 0.53)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `be706168`
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
- theme.tsx
- addons.ts
- react
- pocketbase
- react

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
- `AdminAuthProvider()` --indirect_call--> `logout()`  [INFERRED]
  apps/shashlik-web/src/shared/api/auth.tsx → apps/shashlik-web/src/entities/account/api.ts
- `resolveBadgeLabel()` --calls--> `badgeLabel()`  [EXTRACTED]
  apps/shashlik-web/src/shared/config/site.ts → apps/shashlik-web/src/entities/badge/model.ts
- `collectArticleConflicts()` --indirect_call--> `product()`  [INFERRED]
  apps/shashlik-web/src/entities/product/lib/articles.ts → apps/shashlik-web/src/mocks/products.ts

## Import Cycles
- None detected.

## Communities (96 total, 11 thin omitted)

### Community 0 - "addon/api.ts"
Cohesion: 0.14
Nodes (18): BadgeInput, badgeKeys, badgeMutations, BadgeRecord, fetchBadges(), mapBadge(), seedFallback(), useCreateBadge() (+10 more)

### Community 1 - "UI Layout Components"
Cohesion: 0.11
Nodes (27): adminReviewKeys, buildOrdersFilter(), createOrder(), CreateReviewInput, fetchActiveResendJobs(), fetchOrderById(), fetchOrders(), fetchOrdersPage() (+19 more)

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
Cohesion: 0.10
Nodes (30): useCreateCoupon(), Coupon, Props, Props, CouponForm(), KIND_OPTIONS, Props, toDateInput() (+22 more)

### Community 6 - "Meal Add-ons UI"
Cohesion: 0.15
Nodes (17): CreateStaffInput, fetchStaff(), mapStaff(), mapStaffRequired(), staffKeys, StaffMember, staffMutations, StaffRecord (+9 more)

### Community 7 - "Checkout Flow UI"
Cohesion: 0.11
Nodes (18): API-правила (PB Rules), Env / инфра, `pb_hooks` (JSVM), TASK_DB — подключение PocketBase (сайт + админка) с прицелом на Frontpad, Архитектура, Зона БД — делаю сам (PocketBase Admin UI, `pb_hooks`, env), Зона кода — делает агент (после того как коллекции выше созданы), Коллекции (имена полей = 1:1 с `entities/*/model.ts`, где возможно) (+10 more)

### Community 8 - "package.json"
Cohesion: 0.12
Nodes (17): dependencies, class-variance-authority, clsx, motion, @radix-ui/react-dialog, @radix-ui/react-slot, react-dom, react-easy-crop (+9 more)

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
Cohesion: 0.09
Nodes (34): asNumberList(), asStatusMap(), asStringList(), enqueueSyncJob(), fetchActiveSyncJobs(), fetchFrontpadSettings(), fetchStoppedStock(), FrontpadJobRecord (+26 more)

### Community 21 - "product/api.ts"
Cohesion: 0.07
Nodes (26): 1. env процесса `pocketbase` (systemd unit, `Environment=`), 2. Правки коллекций в `/_/` (и синхронно в `Tasks/schema.json`), 3. Rate limits PocketBase (`/_/` → Settings → Rate limits), 4. Настройки Frontpad (оператор), 5. Деплой `pb_hooks`, TASK_inter — интеграция с кассой Frontpad (боевая), Зона БД / инфры — делает владелец, агент не трогает, Зона кода — агент (+18 more)

### Community 22 - "ProductEditor.tsx"
Cohesion: 0.17
Nodes (14): useAdminProducts(), loadDomMax(), ProductEditorRoute(), SectionStub(), ADMIN_NAV, AdminNavItem, AdminRole, AdminSectionId (+6 more)

### Community 23 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 24 - "cn"
Cohesion: 0.10
Nodes (19): ALL_CATEGORY, Category, CategoryId, KNOWN_CATEGORY_IDS, KnownCategoryId, DEFAULT_CRITERIA, MeatIcon, ProductBadge (+11 more)

### Community 25 - "HomePage.tsx"
Cohesion: 0.21
Nodes (20): applyClientData(), backfillOrders(), bindPhoneToUser(), bonusFromCustomer(), createCustomer(), ensureCustomer(), fetchClientFromCash(), findAppUserByPhone() (+12 more)

### Community 26 - "category/api.ts"
Cohesion: 0.14
Nodes (23): useAddons(), useFrontpadStockArticles(), articleConflictMessage(), ArticleExclude, ArticleRef, cellLabel(), collectArticleConflicts(), isExcludedCell() (+15 more)

### Community 27 - "cn.ts"
Cohesion: 0.18
Nodes (14): GuardedSection(), AdminAuth, AdminAuthContext, AdminAuthProvider(), authErrorMessage(), can(), isAbortError(), isStaffRecord() (+6 more)

### Community 28 - "StickyBar.tsx"
Cohesion: 0.18
Nodes (10): useTheme(), CartToggle(), formatOrderSum(), Props, ThemeToggle(), FloatingActions(), Props, TONE (+2 more)

### Community 29 - "order/model.ts"
Cohesion: 0.16
Nodes (12): FrontpadJob, FrontpadJobKind, FrontpadJobStatus, Order, ORDER_STATUS_FLOW, ORDER_STATUS_SOURCE_LABEL, OrderLineAddon, OrderStatusSource (+4 more)

### Community 30 - "FloatingActions.tsx"
Cohesion: 0.16
Nodes (15): useCategories(), useProducts(), Product, SearchDialog(), SearchDialogProps, catalogSectionId(), groupProductsByCategory(), Options (+7 more)

### Community 31 - "useCategories"
Cohesion: 0.10
Nodes (28): CategoryIcon(), Props, fetchSettings(), mapSettings(), updateSettings(), useSettings(), useUpdateSettings(), settingsFallback() (+20 more)

### Community 32 - "order/api.ts"
Cohesion: 0.16
Nodes (16): buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams, CustomersPageResult, fetchCustomerById() (+8 more)

### Community 33 - "customer/api.ts"
Cohesion: 0.17
Nodes (28): articleFor(), assertArticleAvailable(), buildDescr(), buildNewOrderPayload(), calcCouponDiscount(), checkPromo(), countRecentOrdersByPhone(), findSize() (+20 more)

### Community 34 - "banner/api.ts"
Cohesion: 0.12
Nodes (26): adminProductKeys, createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchAdminProducts() (+18 more)

### Community 35 - "addon/api.ts"
Cohesion: 0.16
Nodes (30): addEmailsToRecord(), applyNames(), applyOAuthProfileBeforeSave(), asObject(), emailsFromYandexOAuth(), ensureCreateDataField(), ensureCreateDataPhone(), ensureCreateDataProfile() (+22 more)

### Community 36 - "order/model.ts"
Cohesion: 0.12
Nodes (24): buildSeries(), buildTopProducts(), countByFilter(), DashboardData, dashboardKeys, DashboardSection(), dayKey(), fetchDashboard() (+16 more)

### Community 37 - "articles.ts"
Cohesion: 0.08
Nodes (24): 1. Singleton-записи, 2. Новая auth-коллекция `app_users` (клиенты витрины), 3. Правки `orders`, 4. Правки `frontpad_settings`, 5. Правки `frontpad_jobs`, 6. Rate limits, TASK_order — профиль клиента, оформление заказа, витрина-модалка, Зона БД / инфры — делает владелец, агент не трогает (+16 more)

### Community 38 - "MobileTabBar.tsx"
Cohesion: 0.19
Nodes (22): bytesToBase64Url(), callbackUrl(), cryptoKey(), findExternalUser(), findOrCreateUser(), formEncode(), fromBase64Url(), getVkCredentials() (+14 more)

### Community 39 - "HomePage.tsx"
Cohesion: 0.36
Nodes (5): orderKeys, AdminTopbar(), fetchNewOrdersCount(), newOrdersKey, queryClient

### Community 40 - "MobileHome.tsx"
Cohesion: 0.11
Nodes (26): fetchTags(), mapTag(), TagInput, tagKeys, tagMutations, TagRecord, tagsForCategory(), useCategoryTags() (+18 more)

### Community 41 - "TagFilters.tsx"
Cohesion: 0.14
Nodes (19): useAccount(), fetchMyOrders(), useMyOrders(), isActiveOrderStatus(), formatAddressLine(), AddressCard(), AddressesTab(), allEmails() (+11 more)

### Community 42 - "webhook.js"
Cohesion: 0.52
Nodes (6): applyStatusChange(), constantTimeEqual(), handleStatusWebhook(), readQueryToken(), readWebhookBody(), verifyHookToken()

### Community 43 - "pb.ts"
Cohesion: 0.12
Nodes (28): articleFor(), ApplyPricesJobResult, asRowList(), buildCells(), CashPriceCell, CashPricePlan, CashPriceStatus, cellDelta() (+20 more)

### Community 44 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, preview, typecheck, type (+1 more)

### Community 45 - "AdminSidebar.tsx"
Cohesion: 0.18
Nodes (15): AccountAuth, AccountContext, AccountProvider(), isAbortError(), refreshAuth(), getClientAuthEpoch(), loginWithOAuth(), loginWithVkId() (+7 more)

### Community 46 - "CustomerDrawer.tsx"
Cohesion: 0.19
Nodes (11): ORDER_STATUS_LABEL, OrderStatus, frontpadSettingsKeys, FrontpadSettings, PriceSource, Settings, PRICE_SOURCE_OPTIONS, Props (+3 more)

### Community 47 - "order/model.ts"
Cohesion: 0.22
Nodes (11): useCreateCategory(), useDeleteCategory(), useUpdateCategory(), CategoriesSection(), CategoryForm(), Props, move(), Props (+3 more)

### Community 48 - "@radix-ui/react-slot"
Cohesion: 0.21
Nodes (9): App(), AppRoutes(), ScrollToTop(), container, BackgroundLocationState, backgroundOf(), Glass(), GlassDefs() (+1 more)

### Community 49 - "HomePage.tsx"
Cohesion: 0.15
Nodes (11): Addon, addons, extras, IMG, sauces, AddonRow(), Props, SIZES (+3 more)

### Community 50 - "invalidateProductRatings"
Cohesion: 0.20
Nodes (10): needsChooser(), useAddProduct(), CartPanelState, useCartPanelStore, CartDock(), DesktopHome(), Props, Options (+2 more)

### Community 51 - "ProductCard.tsx"
Cohesion: 0.26
Nodes (13): useBadges(), badgeLabel(), PRODUCT_ASPECT_RATIO, minPrice(), isProductStopped(), ProductCard(), ProductCardProps, ProductCardCompact() (+5 more)

### Community 52 - "@radix-ui/react-slot"
Cohesion: 0.50
Nodes (4): adminCountKeys, AdminCounts, fetchAdminCounts(), useAdminCounts()

### Community 54 - "@tanstack/react-query"
Cohesion: 0.13
Nodes (17): useDeleteProduct(), useDuplicateProduct(), useUpdateProduct(), hasMissingArticle(), product(), shawarma(), imagesFromProduct(), MEAT_OPTIONS (+9 more)

### Community 55 - "Sparkline.tsx"
Cohesion: 0.17
Nodes (16): DEFAULT_STATUS_MAP, buildHookUrl(), coerceJsonArray(), decodeByteJson(), getHookToken(), isArrayLike(), loadFrontpadSettings(), pad2() (+8 more)

### Community 56 - "CouponForm.tsx"
Cohesion: 0.18
Nodes (16): addonKeys, addonMutations, AddonRecord, CreateAddonInput, createBody(), fetchAddonById(), fetchAddons(), fetchAddonsByKind() (+8 more)

### Community 57 - "SettingsSection.tsx"
Cohesion: 0.24
Nodes (10): canvasToBlob(), CropArea, cropImageToFile(), loadImage(), readImageSize(), ALLOWED, formatMb(), MultiImageField() (+2 more)

### Community 58 - "AdminPage.tsx"
Cohesion: 0.11
Nodes (22): checkPromo(), couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail (+14 more)

### Community 59 - "send.js"
Cohesion: 0.40
Nodes (9): claimOrderSend(), createDryRunJob(), nowPb(), patchFrontpadSettings(), patchOrder(), patchSendFailure(), recordToOrder(), sendOrder() (+1 more)

### Community 60 - "localOrders.ts"
Cohesion: 0.18
Nodes (8): AdminLogin, AdminPage, AuthCallbackPage, EASE, EXIT_ABS, loadMotionFeatures(), OrderTrackPage, ProfilePage

### Community 61 - "jobs.js"
Cohesion: 0.24
Nodes (16): backoffMinutes(), buildKindFilter(), claimNextJob(), completeJob(), failJob(), formatPbDateTime(), isJobReady(), parseUpdatedMs() (+8 more)

### Community 62 - "http.js"
Cohesion: 0.36
Nodes (4): call(), extractWarnings(), formEncode(), maskSecret()

### Community 63 - "AddonForm.tsx"
Cohesion: 0.10
Nodes (40): useDeleteAddon(), AddonKind, useDeleteBanner(), useDeleteCoupon(), useUpdateCoupon(), AddonsSection(), KIND_FILTERS, BannersSection() (+32 more)

### Community 64 - "banner-image-field.tsx"
Cohesion: 0.15
Nodes (18): bannerFormData(), bannerKeys, bannerMutations, BannerNote, BannerRecord, CreateBannerInput, fetchBannerById(), fetchBanners() (+10 more)

### Community 65 - "@radix-ui/react-dialog"
Cohesion: 0.24
Nodes (9): OrderLineSnapshot, repeatOrderIntoCart(), useLiveOrder(), formatAddress(), LineRow(), OrderDetails(), Props, OrderTrackPage() (+1 more)

### Community 67 - "tailwind-merge"
Cohesion: 0.29
Nodes (9): fetchBonus(), useAccount(), useProfileBonus(), CreateOrderInput, useCreateOrder(), savedToParts(), useCheckout(), UseCheckoutArgs (+1 more)

### Community 68 - "CategoryForm.tsx"
Cohesion: 0.47
Nodes (4): useBanners(), BANNER_ASPECT_RATIO, HeroBanner(), HoverArrow()

### Community 69 - "sync.js"
Cohesion: 0.32
Nodes (13): formatPbDateTime(), isNoStopsResponse(), isProductsSyncAllowed(), listAllStock(), normalizeArticle(), parsePrice(), parseSaleFlag(), parseSyncDate() (+5 more)

### Community 70 - "HeroBanner.tsx"
Cohesion: 0.13
Nodes (31): AdminGate(), useUpdateCustomer(), useOrderJobs(), useOrdersPage(), useUpdateOrderStatus(), isFrontpadWarning(), AdminLogin(), AdminPage() (+23 more)

### Community 73 - "category/api.ts"
Cohesion: 0.18
Nodes (24): accountCacheKey(), accountKeys, addAddress(), asId(), asString(), BonusResponse, getAccount(), isAppUserRecord() (+16 more)

### Community 74 - "category/model.ts"
Cohesion: 0.22
Nodes (7): NewSavedAddress, OAuthProvider, ProfileBonus, SavedAddress, UpdateAccountInput, LoginPanel(), PROVIDERS

### Community 75 - "files.ts"
Cohesion: 0.12
Nodes (26): AppliedCoupon, calcCouponDiscount(), formatCouponValue(), DeliveryMode, OrderAddressParts, useFrontpadStockRealtime(), CartTotals, ResolvedAddon (+18 more)

### Community 76 - "AdminTopbar.tsx"
Cohesion: 0.27
Nodes (9): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+1 more)

### Community 77 - "NutritionHint.tsx"
Cohesion: 0.13
Nodes (24): useExtras(), useSauces(), frontpadStockKeys, useProductBySlug(), fetchStoppedArticles(), isAddonStopped(), isSizeStopped(), isSkuStopped() (+16 more)

### Community 78 - "class-variance-authority"
Cohesion: 0.42
Nodes (9): canUseStorage(), getLatestLocalOrderId(), isStoredOrder(), listLocalOrderIds(), load(), prune(), rememberLocalOrder(), save() (+1 more)

### Community 80 - "lucide-react"
Cohesion: 0.47
Nodes (9): applyPrices(), cloneSize(), cloneVariant(), listAll(), loadStockMap(), planProduct(), roundPrice(), sizeLabel() (+1 more)

### Community 81 - "@radix-ui/react-dialog"
Cohesion: 0.29
Nodes (7): fetchAdminReviews(), fetchReviewById(), fetchReviews(), mapReview(), useAdminReviews(), useReview(), useReviews()

### Community 82 - "theme.tsx"
Cohesion: 0.40
Nodes (6): invalidateProductRatings(), useCreateReview(), useDeleteReview(), useToggleReviewPublished(), useUpdateReview(), ReviewForm()

### Community 83 - "category/model.ts"
Cohesion: 0.36
Nodes (6): ProductNutrition, formatGrams(), NutritionHint(), useIsDesktop(), useIsWide(), useMediaQuery()

### Community 84 - "HeroBanner.tsx"
Cohesion: 0.40
Nodes (5): readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider()

### Community 91 - "theme.tsx"
Cohesion: 0.40
Nodes (5): GroupLabel(), Panel(), PanelProps, SectionTitle(), surfaceVariants

### Community 93 - "react"
Cohesion: 0.26
Nodes (10): filenamesOf(), FileRecord, imageFilenames(), imageUrl(), imageUrls(), ToFormDataOptions, canvasToBlob(), compressImage() (+2 more)

## Ambiguous Edges - Review These
- `figma-make-app` → `Logo CMYK`  [AMBIGUOUS]
  temp/логотип/лого CMYK.pdf · relation: conceptually_related_to
- `figma-make-app` → `Logo RGB`  [AMBIGUOUS]
  temp/логотип/лого RGB.pdf · relation: conceptually_related_to

## Knowledge Gaps
- **392 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+387 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `figma-make-app` and `Logo CMYK`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `figma-make-app` and `Logo RGB`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `cn()` connect `useCategories` to `addon/api.ts`, `Sushi Catalog UI`, `ProductEditor.tsx`, `category/api.ts`, `StickyBar.tsx`, `FloatingActions.tsx`, `order/model.ts`, `MobileHome.tsx`, `TagFilters.tsx`, `pb.ts`, `CustomerDrawer.tsx`, `order/model.ts`, `@radix-ui/react-slot`, `HomePage.tsx`, `ProductCard.tsx`, `@tanstack/react-query`, `SettingsSection.tsx`, `AddonForm.tsx`, `@radix-ui/react-dialog`, `CategoryForm.tsx`, `files.ts`, `NutritionHint.tsx`, `theme.tsx`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Why does `DEFAULT_STATUS_MAP` connect `Sparkline.tsx` to `FloatingActions.tsx`, `CustomerDrawer.tsx`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _392 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `addon/api.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13768115942028986 - nodes in this community are weakly interconnected._
- **Should `UI Layout Components` be split into smaller, more focused modules?**
  _Cohesion score 0.10846560846560846 - nodes in this community are weakly interconnected._