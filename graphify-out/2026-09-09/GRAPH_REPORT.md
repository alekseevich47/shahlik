# Graph Report - shahlik  (2026-09-09)

## Corpus Check
- 251 files · ~1,505,456 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1923 nodes · 4886 edges · 121 communities (110 shown, 11 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 225 edges (avg confidence: 0.54)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b15ba5be`
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
- MobileHome.tsx
- account.tsx
- DesktopHome.tsx
- StickyBar.tsx
- sync.js
- CartLineRow.tsx
- category/api.ts
- account.tsx
- files.ts
- getAccount
- NutritionHint.tsx
- router.tsx
- lucide-react
- pbErrorMessage
- a
- AddonRow.tsx
- crud.ts
- cn.ts
- files.ts
- copy-vkid-sdk.mjs
- CartLineRow.tsx
- prices.ts
- VitrineScroll.tsx
- category/model.ts
- NutritionHint.tsx
- lenis
- react
- sonner
- banner-image-field.tsx
- inspect-vk-sdk.mjs
- deploy.sh
- zustand
- AuthButtons.tsx
- Order
- OrderDetails.tsx
- crud.ts
- invalidateProductRatings
- addons.ts
- Sidebar.tsx
- select.tsx
- router.tsx
- ProductsSection
- @radix-ui/react-tooltip
- tailwind-merge
- counts.ts
- clsx
- lenis
- @radix-ui/react-dialog
- @radix-ui/react-popover
- react-easy-crop

## God Nodes (most connected - your core abstractions)
1. `cn()` - 152 edges
2. `formatPrice()` - 53 edges
3. `Button()` - 46 edges
4. `ProductEditor()` - 29 edges
5. `useCartTotals()` - 26 edges
6. `Input()` - 25 edges
7. `ProductView()` - 23 edges
8. `pb` - 23 edges
9. `useCategories()` - 22 edges
10. `useCartStore` - 22 edges

## Surprising Connections (you probably didn't know these)
- `Logo CMYK` --conceptually_related_to--> `figma-make-app`  [AMBIGUOUS]
  temp/логотип/лого CMYK.pdf → AGENTS.md
- `Logo RGB` --conceptually_related_to--> `figma-make-app`  [AMBIGUOUS]
  temp/логотип/лого RGB.pdf → AGENTS.md
- `toArrayLike()` --indirect_call--> `a()`  [INFERRED]
  pb_hooks/lib/order.js → apps/shashlik-web/public/vk/vkid-sdk.js
- `toArray()` --indirect_call--> `a()`  [INFERRED]
  pb_hooks/lib/sync.js → apps/shashlik-web/public/vk/vkid-sdk.js
- `buildSizes()` --indirect_call--> `minPrice()`  [INFERRED]
  apps/shashlik-web/scripts/sync-products-from-cash.mjs → apps/shashlik-web/src/entities/product/lib.ts

## Import Cycles
- None detected.

## Communities (121 total, 11 thin omitted)

### Community 0 - "addon/api.ts"
Cohesion: 0.09
Nodes (28): couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail, PromoCheckOk (+20 more)

### Community 1 - "UI Layout Components"
Cohesion: 0.09
Nodes (33): adminReviewKeys, buildOrdersFilter(), createOrder(), CreateOrderInput, CreateReviewInput, fetchAdminReviews(), fetchMyOrders(), fetchOrderById() (+25 more)

### Community 2 - "NPM Dependencies"
Cohesion: 0.10
Nodes (21): devDependencies, tailwindcss, @tailwindcss/vite, tw-animate-css, @types/node, @types/react, @types/react-dom, typescript (+13 more)

### Community 3 - "TS Config Tooling"
Cohesion: 0.07
Nodes (26): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+18 more)

### Community 4 - "Figma Make Stack"
Cohesion: 0.14
Nodes (16): src/App.tsx, Default component exports, Figma Make, figma-make-app, src/index.css, index.html, src/main.tsx, oxfmt (+8 more)

### Community 5 - "Sushi Catalog UI"
Cohesion: 0.18
Nodes (12): bannerKeys, bannerMutations, BannerNote, BannerRecord, CreateBannerInput, fetchBannerById(), fetchBanners(), mapBanner() (+4 more)

### Community 6 - "Meal Add-ons UI"
Cohesion: 0.13
Nodes (25): useFrontpadStockArticles(), articleConflictMessage(), ArticleExclude, ArticleRef, cellLabel(), collectArticleConflicts(), isExcludedCell(), priceOf() (+17 more)

### Community 7 - "Checkout Flow UI"
Cohesion: 0.11
Nodes (18): API-правила (PB Rules), Env / инфра, `pb_hooks` (JSVM), TASK_DB — подключение PocketBase (сайт + админка) с прицелом на Frontpad, Архитектура, Зона БД — делаю сам (PocketBase Admin UI, `pb_hooks`, env), Зона кода — делает агент (после того как коллекции выше созданы), Коллекции (имена полей = 1:1 с `entities/*/model.ts`, где возможно) (+10 more)

### Community 8 - "package.json"
Cohesion: 0.11
Nodes (19): dependencies, class-variance-authority, lucide-react, motion, @radix-ui/react-slot, @radix-ui/react-tooltip, react-dom, react-router-dom (+11 more)

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
Nodes (26): applyPricesJobKeys, asNumberList(), asStatusMap(), asStringList(), fetchFrontpadSettings(), fetchFrontpadStock(), fetchSettings(), fetchStoppedStock() (+18 more)

### Community 21 - "product/api.ts"
Cohesion: 0.07
Nodes (26): 1. env процесса `pocketbase` (systemd unit, `Environment=`), 2. Правки коллекций в `/_/` (и синхронно в `Tasks/schema.json`), 3. Rate limits PocketBase (`/_/` → Settings → Rate limits), 4. Настройки Frontpad (оператор), 5. Деплой `pb_hooks`, TASK_inter — интеграция с кассой Frontpad (боевая), Зона БД / инфры — делает владелец, агент не трогает, Зона кода — агент (+18 more)

### Community 22 - "ProductEditor.tsx"
Cohesion: 0.19
Nodes (15): buildSeries(), buildTopProducts(), countByFilter(), DashboardData, dashboardKeys, DashboardSection(), dayKey(), fetchDashboard() (+7 more)

### Community 23 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 24 - "cn"
Cohesion: 0.16
Nodes (17): enqueueSyncJob(), fetchActiveSyncJobs(), stoppedStockKeys, syncJobKeys, useActiveSyncJobs(), useEnqueueSyncJob(), FrontpadSettings, PriceSource (+9 more)

### Community 25 - "HomePage.tsx"
Cohesion: 0.20
Nodes (20): applyClientData(), backfillOrders(), bindPhoneToUser(), bonusFromCustomer(), createCustomer(), ensureCustomer(), fetchClientFromCash(), findAppUserByPhone() (+12 more)

### Community 26 - "category/api.ts"
Cohesion: 0.06
Nodes (29): pocketbase, auth(), buildCompositionByVariant(), compositionBySlug, formatComposition(), nutritionBySlug, pb, repoRoot (+21 more)

### Community 27 - "cn.ts"
Cohesion: 0.09
Nodes (27): useCreateBanner(), useUpdateBanner(), BANNER_ASPECT_RATIO, BannerForm(), Props, canvasToBlob(), CropArea, cropImageToFile() (+19 more)

### Community 28 - "StickyBar.tsx"
Cohesion: 0.15
Nodes (15): HomeMobileTabBar(), catalogSectionId(), Options, useCatalogScrollSpy(), isProductModalOpen(), LENIS_OPTIONS, Props, ScrollOptions (+7 more)

### Community 30 - "FloatingActions.tsx"
Cohesion: 0.21
Nodes (14): addonKeys, addonMutations, AddonRecord, CreateAddonInput, fetchAddonById(), fetchAddons(), fetchAddonsByKind(), fetchExtras() (+6 more)

### Community 31 - "useCategories"
Cohesion: 0.19
Nodes (9): CartToggle(), formatOrderSum(), Props, ThemeToggle(), FloatingActions(), Props, TONE, MobileHeader() (+1 more)

### Community 32 - "order/api.ts"
Cohesion: 0.11
Nodes (25): adjustBonus(), bonusKeys, BonusSettingsRecord, bulkSetBonusPercent(), claimPwaInstallBonus(), fetchBonusSettings(), fetchCustomerLedger(), LedgerRecord (+17 more)

### Community 33 - "customer/api.ts"
Cohesion: 0.16
Nodes (29): articleFor(), assertArticleAvailable(), buildDescr(), buildNewOrderPayload(), calcCouponDiscount(), checkPromo(), countRecentOrdersByPhone(), findSize() (+21 more)

### Community 34 - "banner/api.ts"
Cohesion: 0.11
Nodes (28): adminProductKeys, createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchAdminProducts() (+20 more)

### Community 35 - "addon/api.ts"
Cohesion: 0.14
Nodes (35): addEmailsToRecord(), applyNames(), applyOAuthNames(), applyOAuthProfileBeforeSave(), asObject(), emailsFromYandexOAuth(), ensureCreateDataField(), ensureCreateDataPhone() (+27 more)

### Community 36 - "order/model.ts"
Cohesion: 0.18
Nodes (14): BadgeInput, badgeKeys, badgeMutations, BadgeRecord, fetchBadges(), mapBadge(), seedFallback(), useCreateBadge() (+6 more)

### Community 37 - "articles.ts"
Cohesion: 0.08
Nodes (24): 1. Singleton-записи, 2. Новая auth-коллекция `app_users` (клиенты витрины), 3. Правки `orders`, 4. Правки `frontpad_settings`, 5. Правки `frontpad_jobs`, 6. Rate limits, TASK_order — профиль клиента, оформление заказа, витрина-модалка, Зона БД / инфры — делает владелец, агент не трогает (+16 more)

### Community 38 - "MobileTabBar.tsx"
Cohesion: 0.16
Nodes (27): bytesToBase64Url(), callbackUrl(), cryptoKey(), exchangeAuthCode(), findExternalUser(), findOrCreateUser(), formEncode(), fromBase64Url() (+19 more)

### Community 39 - "HomePage.tsx"
Cohesion: 0.29
Nodes (11): invalidateProductRatings(), useCreateReview(), useDeleteReview(), useToggleReviewPublished(), useUpdateReview(), ProductOption, ReviewForm(), ReviewFormProps (+3 more)

### Community 40 - "MobileHome.tsx"
Cohesion: 0.15
Nodes (17): CreateStaffInput, fetchStaff(), mapStaff(), mapStaffRequired(), staffKeys, StaffMember, staffMutations, StaffRecord (+9 more)

### Community 41 - "TagFilters.tsx"
Cohesion: 0.13
Nodes (29): accountKeys, asId(), asString(), BonusResponse, linkPhone(), loginWithOAuth(), loginWithVkId(), mapAddress() (+21 more)

### Community 42 - "webhook.js"
Cohesion: 0.31
Nodes (12): applyStatusChange(), constantTimeEqual(), fieldOf(), findOrderByFrontpadId(), handleStatusWebhook(), hasAnyField(), mapFrontpadStatus(), parseFormBody() (+4 more)

### Community 43 - "pb.ts"
Cohesion: 0.15
Nodes (21): completeVkOneTap(), createVkOneTapSession(), resolveVkAppId(), attachVkOneTap(), detachVkOneTap(), isBenignVkError(), mountWidget(), remountWidget() (+13 more)

### Community 44 - "package.json"
Cohesion: 0.18
Nodes (10): name, private, scripts, build, copy:vk-sdk, dev, preview, typecheck (+2 more)

### Community 45 - "AdminSidebar.tsx"
Cohesion: 0.18
Nodes (25): applyLedgerDelta(), applyLedgerDeltaTx(), calcOrderEarnAmount(), creditOrderEarn(), creditRegistrationBonus(), debitOrderSpend(), ensureReferralCode(), findLedgerByCustomerReason() (+17 more)

### Community 46 - "CustomerDrawer.tsx"
Cohesion: 0.16
Nodes (18): compositionOf(), fetchStoppedArticles(), isAddonStopped(), isSizeStopped(), isSkuStopped(), isVariantStopped(), stoppedArticlesKey, useFrontpadStockRealtime() (+10 more)

### Community 47 - "order/model.ts"
Cohesion: 0.21
Nodes (10): useCreateCategory(), useDeleteCategory(), useUpdateCategory(), CategoriesSection(), CategoryForm(), Props, CATEGORY_ICONS, CategoryIconPath (+2 more)

### Community 48 - "@radix-ui/react-slot"
Cohesion: 0.20
Nodes (17): useBadges(), badgeLabel(), PRODUCT_ASPECT_RATIO, minPrice(), isProductStopped(), useStoppedArticles(), ProductCard(), ProductCardProps (+9 more)

### Community 49 - "HomePage.tsx"
Cohesion: 0.07
Nodes (28): 1.1. Включить API, 1.2. Артикулы товаров, 1.3. Разрешить менять цену в заказе извне (обязательно для совпадения сумм), 1.4. Справочники кодов (выпишите цифры на бумажку), 1.5. Бонусы самой кассы (Frontpad), 2.1. Главные тумблеры, 2.2. URL вебхука, 2.3. Коды оплаты и точка (+20 more)

### Community 50 - "invalidateProductRatings"
Cohesion: 0.22
Nodes (15): readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), useTheme(), useBanners(), oppositeThemeSrc() (+7 more)

### Community 51 - "ProductCard.tsx"
Cohesion: 0.21
Nodes (12): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+4 more)

### Community 52 - "@radix-ui/react-slot"
Cohesion: 0.25
Nodes (9): activityLogKeys, ActivityLogsPage, ActivityRecord, fetchActivityLogsPage(), mapLog(), useActivityLogsPage(), ActivityActorType, ActivityLog (+1 more)

### Community 53 - "sonner"
Cohesion: 0.19
Nodes (12): useCustomersPage(), loadDomMax(), SectionStub(), ADMIN_NAV, AdminNavItem, AdminRole, AdminSectionId, LogsSection() (+4 more)

### Community 54 - "@tanstack/react-query"
Cohesion: 0.14
Nodes (18): e(), e1(), e5(), e6(), eB(), eU(), n(), ns() (+10 more)

### Community 55 - "Sparkline.tsx"
Cohesion: 0.17
Nodes (16): DEFAULT_STATUS_MAP, buildHookUrl(), coerceJsonArray(), decodeByteJson(), getHookToken(), isArrayLike(), loadFrontpadSettings(), pad2() (+8 more)

### Community 56 - "CouponForm.tsx"
Cohesion: 0.17
Nodes (15): useProducts(), CartPanel(), MODE_OPTIONS, CheckoutDialogState, useCheckoutDialogStore, SearchDialog(), SearchDialogProps, HomePage() (+7 more)

### Community 57 - "SettingsSection.tsx"
Cohesion: 0.13
Nodes (18): CategoryIcon(), Props, AxisLock, useAxisLockedHorizontalScroll(), clampScroll(), Edges, EdgeSide, prefersReducedMotion() (+10 more)

### Community 58 - "AdminPage.tsx"
Cohesion: 0.22
Nodes (13): articleFor(), cartLineTitle(), findSize(), findVariant(), hasMissingArticle(), nutritionForPortion(), nutritionOf(), parseWeightGrams() (+5 more)

### Community 59 - "send.js"
Cohesion: 0.40
Nodes (9): claimOrderSend(), createDryRunJob(), nowPb(), patchFrontpadSettings(), patchOrder(), patchSendFailure(), recordToOrder(), sendOrder() (+1 more)

### Community 60 - "banner-image-field.tsx"
Cohesion: 0.23
Nodes (9): useCreateCoupon(), useUpdateCoupon(), Coupon, CouponForm(), KIND_OPTIONS, Props, toDateInput(), Switch() (+1 more)

### Community 61 - "jobs.js"
Cohesion: 0.24
Nodes (16): backoffMinutes(), buildKindFilter(), claimNextJob(), completeJob(), failJob(), formatPbDateTime(), isJobReady(), parseUpdatedMs() (+8 more)

### Community 62 - "http.js"
Cohesion: 0.36
Nodes (4): call(), extractWarnings(), formEncode(), maskSecret()

### Community 63 - "AddonForm.tsx"
Cohesion: 0.27
Nodes (12): accountCacheKey(), addAddress(), getAccount(), isAppUserRecord(), persistRecord(), removeAddress(), requireAccountId(), saveAddresses() (+4 more)

### Community 64 - "loginWithOAuth"
Cohesion: 0.14
Nodes (17): useAddons(), useCreateAddon(), useUpdateAddon(), AddonKind, useAdminProducts(), ProductEditorRoute(), AddonForm(), Props (+9 more)

### Community 65 - "MobileHome.tsx"
Cohesion: 0.12
Nodes (36): useDeleteAddon(), useDeleteBanner(), useCoupons(), useDeleteCoupon(), COLUMNS, AddonsSection(), KIND_FILTERS, BannersSection() (+28 more)

### Community 66 - "account.tsx"
Cohesion: 0.29
Nodes (9): useDeleteProduct(), useToggleProductActive(), useUpdateProduct(), applyFilteredReorder(), ProductsSection(), STATUS_FILTERS, move(), Props (+1 more)

### Community 67 - "DesktopHome.tsx"
Cohesion: 0.15
Nodes (13): CartPanelState, useCartPanelStore, CartDock(), AdminPage(), CatalogSection, DesktopHome(), Props, Options (+5 more)

### Community 68 - "StickyBar.tsx"
Cohesion: 0.17
Nodes (12): ng(), np(), o(), o2(), o3(), og(), ol(), os() (+4 more)

### Community 69 - "sync.js"
Cohesion: 0.32
Nodes (13): formatPbDateTime(), isNoStopsResponse(), isProductsSyncAllowed(), listAllStock(), normalizeArticle(), parsePrice(), parseSaleFlag(), parseSyncDate() (+5 more)

### Community 70 - "CartLineRow.tsx"
Cohesion: 0.16
Nodes (20): BonusEarnHintProps, detectInstallPlatform(), dismissPwaForever(), isPwaDismissedForever(), isPwaSoftCooldownActive(), isStandaloneDisplay(), markPwaInstalledOnDevice(), markPwaSoftDismissed() (+12 more)

### Community 73 - "category/api.ts"
Cohesion: 0.13
Nodes (24): fetchBonus(), submitReferral(), useProfileBonus(), isActiveOrderStatus(), formatAddressLine(), canUseStorage(), getLatestLocalOrderId(), isStoredOrder() (+16 more)

### Community 74 - "account.tsx"
Cohesion: 0.70
Nodes (4): actorFromAuth(), hookCollectionWrite(), readRequestMeta(), write()

### Community 75 - "files.ts"
Cohesion: 0.18
Nodes (15): fetchActiveResendJobs(), mapJob(), resendOrder(), useOrderJobs(), useResendOrder(), isFrontpadWarning(), ORDER_STATUS_FLOW, ORDER_STATUS_SOURCE_LABEL (+7 more)

### Community 76 - "getAccount"
Cohesion: 0.31
Nodes (11): useCreateOrder(), PaymentMethod, savedToParts(), useCheckout(), UseCheckoutArgs, CheckoutDialog(), formatPhoneInput(), isCompleteRuPhone() (+3 more)

### Community 77 - "NutritionHint.tsx"
Cohesion: 0.18
Nodes (14): useCreateProduct(), Props, DEFAULT_NUTRITION, ProductCreateForm(), Props, PhoneOnboardingProps, CYR_MAP, slugFromName() (+6 more)

### Community 78 - "router.tsx"
Cohesion: 0.22
Nodes (9): i(), nu(), o1(), oB(), oc(), od(), oi(), oz() (+1 more)

### Community 80 - "lucide-react"
Cohesion: 0.44
Nodes (9): applyPrices(), cloneSize(), cloneVariant(), listAll(), loadStockMap(), planProduct(), roundPrice(), sizeLabel() (+1 more)

### Community 81 - "pbErrorMessage"
Cohesion: 0.19
Nodes (12): frontpadSettingsKeys, settingsKeys, updateSettings(), useUpdateSettings(), Settings, parseNonNeg(), SettingsSection(), TabId (+4 more)

### Community 82 - "a"
Cohesion: 0.25
Nodes (8): a(), r(), tf(), tg(), to(), tr(), tW(), tz()

### Community 83 - "AddonRow.tsx"
Cohesion: 0.20
Nodes (13): cellNutrition(), defaultNutritionFromSizes(), setCellNutrition(), DEFAULT_CRITERIA, ProductNutrition, ProductRating, ProductSize, ProductVariant (+5 more)

### Community 84 - "crud.ts"
Cohesion: 0.24
Nodes (8): App(), AppRoutes(), ScrollToTop(), container, backgroundOf(), Glass(), GlassDefs(), GlassProps

### Community 86 - "cn.ts"
Cohesion: 0.21
Nodes (13): AccountAuth, AccountContext, AccountProvider(), isAbortError(), refreshAuth(), useAccount(), acceptAuthToken(), getClientAuthEpoch() (+5 more)

### Community 87 - "files.ts"
Cohesion: 0.26
Nodes (10): filenamesOf(), FileRecord, imageFilenames(), imageUrl(), imageUrls(), ToFormDataOptions, canvasToBlob(), compressImage() (+2 more)

### Community 88 - "copy-vkid-sdk.mjs"
Cohesion: 0.33
Nodes (4): dest, destDir, root, src

### Community 91 - "CartLineRow.tsx"
Cohesion: 0.21
Nodes (19): useAccount(), fetchPublicBonusSettings(), usePublicBonusSettings(), calcBonusSpendCap(), calcCartEarn(), calcLineEarn(), clampPercent(), EarnLineInput (+11 more)

### Community 92 - "prices.ts"
Cohesion: 0.22
Nodes (10): cellDelta(), stockPriceMap, enqueueApplyPricesJob(), fetchApplyPricesJobs(), mapJob(), useApplyPricesJobs(), useEnqueueApplyPricesJob(), CashPricesPanel() (+2 more)

### Community 93 - "VitrineScroll.tsx"
Cohesion: 0.16
Nodes (9): BonusSpendBlock(), CheckoutDialogProps, PAYMENT_OPTIONS, BADGES, CheckoutTrustBadges(), SafePaymentBanner(), SafePaymentBannerProps, FloatingField() (+1 more)

### Community 94 - "category/model.ts"
Cohesion: 0.26
Nodes (8): needsChooser(), Product, useAddProduct(), groupProductsByCategory(), MobileHome(), Props, PromoBanner(), PromoBannerData

### Community 95 - "NutritionHint.tsx"
Cohesion: 0.11
Nodes (15): ALL_CATEGORY, Category, CategoryId, KNOWN_CATEGORY_IDS, KnownCategoryId, ProductBadge, categories, MEAT_VARIANTS (+7 more)

### Community 96 - "lenis"
Cohesion: 0.12
Nodes (26): useCustomerLedger(), buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams, CustomersPageResult (+18 more)

### Community 99 - "banner-image-field.tsx"
Cohesion: 0.17
Nodes (17): checkPromo(), AppliedCoupon, calcCouponDiscount(), formatCouponValue(), OrderAddressParts, CartTotals, ResolvedAddon, useCartTotals() (+9 more)

### Community 100 - "inspect-vk-sdk.mjs"
Cohesion: 0.50
Nodes (3): idx, renderIdx, s

### Community 103 - "AuthButtons.tsx"
Cohesion: 0.27
Nodes (5): VkOneTap(), VkOneTapProps, AuthButtons(), AuthButtonsProps, LoginPanel()

### Community 104 - "Order"
Cohesion: 0.11
Nodes (20): DeliveryMode, FrontpadJob, FrontpadJobKind, FrontpadJobStatus, Order, ORDER_STATUS_LABEL, OrderLineAddon, OrderLineSnapshot (+12 more)

### Community 105 - "OrderDetails.tsx"
Cohesion: 0.33
Nodes (7): createBody(), updateBody(), bannerFormData(), updateBody(), updateProduct(), toFormData(), toUploadFormData()

### Community 106 - "crud.ts"
Cohesion: 0.25
Nodes (9): useSettings(), settingsFallback(), BADGE_LABEL, ORDER_RULES, resolveBadgeLabel(), SITE, AddressBar(), Sidebar() (+1 more)

### Community 107 - "invalidateProductRatings"
Cohesion: 0.18
Nodes (14): GuardedSection(), AdminAuth, AdminAuthContext, AdminAuthProvider(), authErrorMessage(), can(), isAbortError(), isStaffRecord() (+6 more)

### Community 108 - "addons.ts"
Cohesion: 0.15
Nodes (11): Addon, addons, extras, IMG, sauces, AddonRow(), Props, SIZES (+3 more)

### Community 109 - "Sidebar.tsx"
Cohesion: 0.26
Nodes (8): fetchPublicOrder(), orderKeys, usePublicOrder(), repeatOrderIntoCart(), useLiveOrder(), OrderTrackPage(), RepeatButton(), queryClient

### Community 110 - "select.tsx"
Cohesion: 0.27
Nodes (9): CollectionMutationsConfig, FIELD_CODE_RU, invalidate(), listKeys(), MutationKeys, pbErrorMessage(), QueryKey, syncDetail() (+1 more)

### Community 111 - "router.tsx"
Cohesion: 0.17
Nodes (9): AdminGate(), AdminLogin, AdminPage, AuthCallbackPage, EASE, EXIT_ABS, loadMotionFeatures(), OrderTrackPage (+1 more)

### Community 112 - "ProductsSection"
Cohesion: 0.10
Nodes (26): SumRow(), AddressSection(), AddressSectionProps, AdminCard(), Props, Props, StatCard(), cn() (+18 more)

### Community 113 - "@radix-ui/react-tooltip"
Cohesion: 0.38
Nodes (6): AdminLogin(), AdminTopbar(), AdminTopbarProps, fetchNewOrdersCount(), newOrdersKey, useAdminAuth()

### Community 114 - "tailwind-merge"
Cohesion: 0.60
Nodes (4): normalize(), Props, Sparkline(), toPath()

### Community 115 - "counts.ts"
Cohesion: 0.50
Nodes (4): adminCountKeys, AdminCounts, fetchAdminCounts(), useAdminCounts()

## Ambiguous Edges - Review These
- `figma-make-app` → `Logo CMYK`  [AMBIGUOUS]
  temp/логотип/лого CMYK.pdf · relation: conceptually_related_to
- `figma-make-app` → `Logo RGB`  [AMBIGUOUS]
  temp/логотип/лого RGB.pdf · relation: conceptually_related_to

## Knowledge Gaps
- **489 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+484 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `figma-make-app` and `Logo CMYK`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `figma-make-app` and `Logo RGB`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `dependencies` connect `package.json` to `react`, `sonner`, `zustand`, `package.json`, `clsx`, `lenis`, `@radix-ui/react-dialog`, `@radix-ui/react-popover`, `react-easy-crop`, `category/api.ts`?**
  _High betweenness centrality (0.080) - this node is a cross-community bridge._
- **Why does `VitrineScrollProvider()` connect `StickyBar.tsx` to `CouponForm.tsx`, `lenis`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **Why does `lenis` connect `lenis` to `package.json`, `StickyBar.tsx`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `ProductEditor()` (e.g. with `e()` and `n()`) actually correct?**
  _`ProductEditor()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _489 weakly-connected nodes found - possible documentation gaps or missing edges._