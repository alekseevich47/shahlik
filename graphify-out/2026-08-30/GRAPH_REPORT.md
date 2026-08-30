# Graph Report - shahlik  (2026-08-30)

## Corpus Check
- 228 files · ~1,442,523 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1756 nodes · 4452 edges · 111 communities (100 shown, 11 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 197 edges (avg confidence: 0.54)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `373cd00c`
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
- CashPricesPanel.tsx
- DesktopHome.tsx
- StickyBar.tsx
- sync.js
- CartLineRow.tsx
- category/api.ts
- account.tsx
- files.ts
- AdminTopbar.tsx
- NutritionHint.tsx
- router.tsx
- lucide-react
- pbErrorMessage
- a
- AddonsSection.tsx
- ProductsSection.tsx
- prices.ts
- router.tsx
- files.ts
- copy-vkid-sdk.mjs
- zustand
- useCatalogScrollSpy.ts
- theme.tsx
- VitrineScroll.tsx
- useStoppedStock
- NutritionHint.tsx
- pocketbase
- query-client.ts
- FloatingActions.tsx
- banner-image-field.tsx
- inspect-vk-sdk.mjs
- deploy.sh
- lib.ts
- pb
- settings/model.ts
- invalidateProductRatings
- zustand
- lenis
- @radix-ui/react-dialog
- @radix-ui/react-popover
- react-easy-crop

## God Nodes (most connected - your core abstractions)
1. `cn()` - 142 edges
2. `formatPrice()` - 52 edges
3. `Button()` - 44 edges
4. `ProductEditor()` - 29 edges
5. `useCartTotals()` - 26 edges
6. `Input()` - 25 edges
7. `useCategories()` - 22 edges
8. `ProductView()` - 22 edges
9. `pb` - 22 edges
10. `n()` - 21 edges

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

## Communities (111 total, 11 thin omitted)

### Community 0 - "addon/api.ts"
Cohesion: 0.06
Nodes (43): fetchSizeTemplates(), mapSizeTemplate(), seedFallback(), SizeTemplateInput, sizeTemplateKeys, sizeTemplateMutations, SizeTemplateRecord, useCreateSizeTemplate() (+35 more)

### Community 1 - "UI Layout Components"
Cohesion: 0.10
Nodes (29): adminReviewKeys, buildOrdersFilter(), createOrder(), CreateOrderInput, CreateReviewInput, fetchAdminReviews(), fetchOrderById(), fetchOrders() (+21 more)

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
Cohesion: 0.16
Nodes (18): addonKeys, addonMutations, AddonRecord, CreateAddonInput, createBody(), fetchAddonById(), fetchAddons(), fetchAddonsByKind() (+10 more)

### Community 6 - "Meal Add-ons UI"
Cohesion: 0.15
Nodes (21): completeVkOneTap(), createVkOneTapSession(), resolveVkAppId(), attachVkOneTap(), detachVkOneTap(), isBenignVkError(), mountWidget(), remountWidget() (+13 more)

### Community 7 - "Checkout Flow UI"
Cohesion: 0.11
Nodes (18): API-правила (PB Rules), Env / инфра, `pb_hooks` (JSVM), TASK_DB — подключение PocketBase (сайт + админка) с прицелом на Frontpad, Архитектура, Зона БД — делаю сам (PocketBase Admin UI, `pb_hooks`, env), Зона кода — делает агент (после того как коллекции выше созданы), Коллекции (имена полей = 1:1 с `entities/*/model.ts`, где возможно) (+10 more)

### Community 8 - "package.json"
Cohesion: 0.11
Nodes (19): dependencies, class-variance-authority, clsx, lucide-react, motion, @radix-ui/react-slot, react-dom, react-router-dom (+11 more)

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
Nodes (67): OrderStatus, applyPricesJobKeys, asNumberList(), asStatusMap(), asStringList(), enqueueApplyPricesJob(), enqueueSyncJob(), fetchActiveSyncJobs() (+59 more)

### Community 21 - "product/api.ts"
Cohesion: 0.07
Nodes (26): 1. env процесса `pocketbase` (systemd unit, `Environment=`), 2. Правки коллекций в `/_/` (и синхронно в `Tasks/schema.json`), 3. Rate limits PocketBase (`/_/` → Settings → Rate limits), 4. Настройки Frontpad (оператор), 5. Деплой `pb_hooks`, TASK_inter — интеграция с кассой Frontpad (боевая), Зона БД / инфры — делает владелец, агент не трогает, Зона кода — агент (+18 more)

### Community 22 - "ProductEditor.tsx"
Cohesion: 0.24
Nodes (9): ProductNutrition, DEFAULT_NUTRITION, ProductCreateForm(), Props, PhoneOnboarding(), PhoneOnboardingProps, Field(), Input() (+1 more)

### Community 23 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 24 - "cn"
Cohesion: 0.09
Nodes (19): ALL_CATEGORY, Category, CategoryId, KNOWN_CATEGORY_IDS, KnownCategoryId, DEFAULT_CRITERIA, MeatIcon, ProductBadge (+11 more)

### Community 25 - "HomePage.tsx"
Cohesion: 0.20
Nodes (20): applyClientData(), backfillOrders(), bindPhoneToUser(), bonusFromCustomer(), createCustomer(), ensureCustomer(), fetchClientFromCash(), findAppUserByPhone() (+12 more)

### Community 26 - "category/api.ts"
Cohesion: 0.06
Nodes (29): pocketbase, auth(), buildCompositionByVariant(), compositionBySlug, formatComposition(), nutritionBySlug, pb, repoRoot (+21 more)

### Community 27 - "cn.ts"
Cohesion: 0.16
Nodes (21): useCustomer(), useUpdateCustomer(), useOrdersPage(), CustomerDrawer(), digitsOnly(), FormState, OrderHistoryRow(), parseNonNeg() (+13 more)

### Community 28 - "StickyBar.tsx"
Cohesion: 0.26
Nodes (11): useCategories(), useProducts(), useFrontpadStockRealtime(), SearchDialog(), SearchDialogProps, HomePage(), MobileHome(), CategoryTiles() (+3 more)

### Community 30 - "FloatingActions.tsx"
Cohesion: 0.14
Nodes (22): useBanners(), useDeleteBanner(), useCreateCategory(), useDeleteCategory(), useUpdateCategory(), BannersSection(), CategoriesSection(), CategoryForm() (+14 more)

### Community 31 - "useCategories"
Cohesion: 0.10
Nodes (25): CategoryIcon(), Props, OrderAddressParts, CartToggle(), formatOrderSum(), Props, CartTotalsProps, SumRow() (+17 more)

### Community 32 - "order/api.ts"
Cohesion: 0.14
Nodes (20): buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams, CustomersPageResult, fetchCustomerById() (+12 more)

### Community 33 - "customer/api.ts"
Cohesion: 0.16
Nodes (29): articleFor(), assertArticleAvailable(), buildDescr(), buildNewOrderPayload(), calcCouponDiscount(), checkPromo(), countRecentOrdersByPhone(), findSize() (+21 more)

### Community 34 - "banner/api.ts"
Cohesion: 0.12
Nodes (26): adminProductKeys, createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchAdminProducts() (+18 more)

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
Nodes (27): bytesToBase64Url(), callbackUrl(), cryptoKey(), exchangeAuthCode(), findExternalUser(), findOrCreateUser(), formEncode(), fromBase64Url() (+19 more)

### Community 39 - "HomePage.tsx"
Cohesion: 0.11
Nodes (18): readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), useTheme(), ThemeToggle(), SectionStub() (+10 more)

### Community 40 - "MobileHome.tsx"
Cohesion: 0.26
Nodes (12): fetchActiveResendJobs(), mapJob(), resendOrder(), useOrder(), useOrderJobs(), useResendOrder(), useUpdateOrderStatus(), isFrontpadWarning() (+4 more)

### Community 41 - "TagFilters.tsx"
Cohesion: 0.28
Nodes (12): checkPromo(), formatCouponValue(), useCartTotals(), useCartStore, CartPanel(), MODE_OPTIONS, CartPromo(), CartTotals() (+4 more)

### Community 42 - "webhook.js"
Cohesion: 0.52
Nodes (6): applyStatusChange(), constantTimeEqual(), handleStatusWebhook(), readQueryToken(), readWebhookBody(), verifyHookToken()

### Community 43 - "pb.ts"
Cohesion: 0.18
Nodes (13): cellNutrition(), defaultNutritionFromSizes(), setCellNutrition(), ProductSize, ProductVariant, imagesFromProduct(), matchedTemplateId(), MEAT_OPTIONS (+5 more)

### Community 44 - "package.json"
Cohesion: 0.18
Nodes (10): name, private, scripts, build, copy:vk-sdk, dev, preview, typecheck (+2 more)

### Community 45 - "AdminSidebar.tsx"
Cohesion: 0.33
Nodes (8): useAdminReviews(), useDeleteReview(), useToggleReviewPublished(), ProductOption, ReviewFormProps, ReviewsSection(), STATUS_FILTERS, formatDate()

### Community 46 - "CustomerDrawer.tsx"
Cohesion: 0.22
Nodes (12): useCreateStaff(), useDeleteStaff(), useRequestStaffPasswordReset(), useStaff(), useUpdateStaff(), ROLE_FILTERS, ROLE_LABEL, StaffCreateForm() (+4 more)

### Community 47 - "order/model.ts"
Cohesion: 0.14
Nodes (18): BadgeInput, badgeKeys, badgeMutations, BadgeRecord, fetchBadges(), mapBadge(), seedFallback(), useCreateBadge() (+10 more)

### Community 48 - "@radix-ui/react-slot"
Cohesion: 0.36
Nodes (11): useBadges(), badgeLabel(), PRODUCT_ASPECT_RATIO, minPrice(), isProductStopped(), useStoppedArticles(), ProductCard(), ProductCardProps (+3 more)

### Community 49 - "HomePage.tsx"
Cohesion: 0.21
Nodes (10): AdminLogin(), AdminPage(), loadDomMax(), AdminTopbar(), AdminTopbarProps, fetchNewOrdersCount(), newOrdersKey, useAdminAuth() (+2 more)

### Community 50 - "invalidateProductRatings"
Cohesion: 0.15
Nodes (25): accountCacheKey(), accountKeys, addAddress(), BonusResponse, getAccount(), loginWithVkId(), normalizeClientPhone(), openYandexOAuthPopup() (+17 more)

### Community 51 - "ProductCard.tsx"
Cohesion: 0.10
Nodes (19): couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail, PromoCheckOk (+11 more)

### Community 52 - "@radix-ui/react-slot"
Cohesion: 0.40
Nodes (3): LoginPanel(), VkOneTap(), VkOneTapProps

### Community 53 - "sonner"
Cohesion: 0.20
Nodes (12): productKeys, cartLineTitle(), findSize(), findVariant(), addonFromCache(), CartTotals, productFromCache(), ResolvedAddon (+4 more)

### Community 54 - "@tanstack/react-query"
Cohesion: 0.14
Nodes (18): e(), e1(), e5(), e6(), eB(), eU(), n(), ns() (+10 more)

### Community 55 - "Sparkline.tsx"
Cohesion: 0.18
Nodes (15): buildHookUrl(), coerceJsonArray(), decodeByteJson(), getHookToken(), isArrayLike(), loadFrontpadSettings(), pad2(), parseJsonField() (+7 more)

### Community 56 - "CouponForm.tsx"
Cohesion: 0.10
Nodes (16): DeliveryMode, CheckoutDialogProps, PAYMENT_OPTIONS, CheckoutModeToggle(), CheckoutModeToggleProps, OPTIONS, BADGES, CheckoutTrustBadges() (+8 more)

### Community 57 - "SettingsSection.tsx"
Cohesion: 0.17
Nodes (11): FrontpadJob, FrontpadJobKind, FrontpadJobStatus, ORDER_STATUS_FLOW, ORDER_STATUS_SOURCE_LABEL, OrderLineAddon, OrderStatusSource, Review (+3 more)

### Community 58 - "AdminPage.tsx"
Cohesion: 0.14
Nodes (21): mapRating(), useProductBySlug(), compositionOf(), isAddonStopped(), isSizeStopped(), isSkuStopped(), isVariantStopped(), criterionScore() (+13 more)

### Community 59 - "send.js"
Cohesion: 0.40
Nodes (9): claimOrderSend(), createDryRunJob(), nowPb(), patchFrontpadSettings(), patchOrder(), patchSendFailure(), recordToOrder(), sendOrder() (+1 more)

### Community 60 - "banner-image-field.tsx"
Cohesion: 0.15
Nodes (17): bannerFormData(), bannerKeys, bannerMutations, BannerNote, BannerRecord, CreateBannerInput, fetchBannerById(), fetchBanners() (+9 more)

### Community 61 - "jobs.js"
Cohesion: 0.24
Nodes (16): backoffMinutes(), buildKindFilter(), claimNextJob(), completeJob(), failJob(), formatPbDateTime(), isJobReady(), parseUpdatedMs() (+8 more)

### Community 62 - "http.js"
Cohesion: 0.36
Nodes (4): call(), extractWarnings(), formEncode(), maskSecret()

### Community 64 - "loginWithOAuth"
Cohesion: 0.22
Nodes (12): useCoupons(), useCreateCoupon(), useDeleteCoupon(), useUpdateCoupon(), CouponForm(), KIND_OPTIONS, Props, toDateInput() (+4 more)

### Community 65 - "MobileHome.tsx"
Cohesion: 0.21
Nodes (9): BANNER_ASPECT_RATIO, needsChooser(), Product, useAddProduct(), product(), groupProductsByCategory(), Props, HeroBanner() (+1 more)

### Community 66 - "CashPricesPanel.tsx"
Cohesion: 0.21
Nodes (13): cellDelta(), planAllCashPrices(), stockPriceMap, useApplyPricesJobs(), useEnqueueApplyPricesJob(), CashPricesPanel(), flattenPlans(), formatSigned() (+5 more)

### Community 67 - "DesktopHome.tsx"
Cohesion: 0.23
Nodes (8): CartPanelState, useCartPanelStore, CartDock(), DesktopHome(), Props, Options, useInView(), useSettling()

### Community 68 - "StickyBar.tsx"
Cohesion: 0.17
Nodes (12): ng(), np(), o(), o2(), o3(), og(), ol(), os() (+4 more)

### Community 69 - "sync.js"
Cohesion: 0.32
Nodes (13): formatPbDateTime(), isNoStopsResponse(), isProductsSyncAllowed(), listAllStock(), normalizeArticle(), parsePrice(), parseSaleFlag(), parseSyncDate() (+5 more)

### Community 70 - "CartLineRow.tsx"
Cohesion: 0.18
Nodes (10): ResolvedLine, CartLineTitle(), CartLineTitleProps, CheckoutLineRow(), AddonRow(), Props, SIZES, StepBtn() (+2 more)

### Community 73 - "category/api.ts"
Cohesion: 0.13
Nodes (24): fetchMyOrders(), useMyOrders(), isActiveOrderStatus(), formatAddressLine(), canUseStorage(), getLatestLocalOrderId(), isStoredOrder(), listLocalOrderIds() (+16 more)

### Community 74 - "account.tsx"
Cohesion: 0.23
Nodes (12): AccountAuth, AccountContext, AccountProvider(), isAbortError(), refreshAuth(), useAccount(), acceptAuthToken(), getClientAuthEpoch() (+4 more)

### Community 75 - "files.ts"
Cohesion: 0.22
Nodes (14): useFrontpadStockArticles(), articleConflictMessage(), ArticleExclude, ArticleRef, cellLabel(), collectArticleConflicts(), isExcludedCell(), priceOf() (+6 more)

### Community 76 - "AdminTopbar.tsx"
Cohesion: 0.23
Nodes (11): fetchBonus(), resetAccountCache(), subscribeAccount(), useAccount(), useProfileBonus(), useCreateOrder(), PaymentMethod, savedToParts() (+3 more)

### Community 77 - "NutritionHint.tsx"
Cohesion: 0.22
Nodes (10): ALL_TAG, TagFilterId, Chip(), Props, SPRING, TagFilters(), FloatingActions(), Props (+2 more)

### Community 78 - "router.tsx"
Cohesion: 0.22
Nodes (9): i(), nu(), o1(), oB(), oc(), od(), oi(), oz() (+1 more)

### Community 80 - "lucide-react"
Cohesion: 0.44
Nodes (9): applyPrices(), cloneSize(), cloneVariant(), listAll(), loadStockMap(), planProduct(), roundPrice(), sizeLabel() (+1 more)

### Community 81 - "pbErrorMessage"
Cohesion: 0.27
Nodes (14): asId(), asString(), isAppUserRecord(), linkPhone(), loginWithOAuth(), mapAddress(), mapAddresses(), mapAppUser() (+6 more)

### Community 82 - "a"
Cohesion: 0.25
Nodes (8): a(), r(), tf(), tg(), to(), tr(), tW(), tz()

### Community 83 - "AddonsSection.tsx"
Cohesion: 0.27
Nodes (11): useAddons(), useCreateAddon(), useDeleteAddon(), useUpdateAddon(), AddonKind, useAdminProducts(), ProductEditorRoute(), AddonForm() (+3 more)

### Community 84 - "ProductsSection.tsx"
Cohesion: 0.27
Nodes (10): useDeleteProduct(), useToggleProductActive(), useUpdateProduct(), hasMissingArticle(), ProductEditor(), applyFilteredReorder(), ProductsSection(), STATUS_FILTERS (+2 more)

### Community 85 - "prices.ts"
Cohesion: 0.26
Nodes (11): articleFor(), ApplyPricesJobResult, asRowList(), buildCells(), CashPriceCell, CashPricePlan, CashPriceStatus, parseApplyPricesResult() (+3 more)

### Community 86 - "router.tsx"
Cohesion: 0.05
Nodes (42): App(), AdminGate(), AdminLogin, AdminPage, AppRoutes(), AuthCallbackPage, EASE, EXIT_ABS (+34 more)

### Community 87 - "files.ts"
Cohesion: 0.26
Nodes (10): filenamesOf(), FileRecord, imageFilenames(), imageUrl(), imageUrls(), ToFormDataOptions, canvasToBlob(), compressImage() (+2 more)

### Community 88 - "copy-vkid-sdk.mjs"
Cohesion: 0.33
Nodes (4): dest, destDir, root, src

### Community 89 - "zustand"
Cohesion: 0.22
Nodes (7): Addon, fetchStoppedArticles(), stoppedArticlesKey, addons, extras, IMG, sauces

### Community 91 - "useCatalogScrollSpy.ts"
Cohesion: 0.27
Nodes (8): HomeMobileTabBar(), catalogSectionId(), Options, useCatalogScrollSpy(), useVitrineScroll(), CatalogCategorySection(), Props, STICKY_BAR

### Community 92 - "theme.tsx"
Cohesion: 0.27
Nodes (9): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+1 more)

### Community 93 - "VitrineScroll.tsx"
Cohesion: 0.29
Nodes (7): LENIS_OPTIONS, Props, ScrollOptions, VitrineScrollApi, VitrineScrollContext, VitrineScrollProvider(), VitrineScrollTarget

### Community 94 - "useStoppedStock"
Cohesion: 0.21
Nodes (11): Order, ORDER_STATUS_LABEL, OrderLineSnapshot, repeatOrderIntoCart(), useLiveOrder(), formatAddress(), LineRow(), OrderDetails() (+3 more)

### Community 95 - "NutritionHint.tsx"
Cohesion: 0.43
Nodes (5): formatGrams(), NutritionHint(), useIsDesktop(), useIsWide(), useMediaQuery()

### Community 97 - "query-client.ts"
Cohesion: 0.47
Nodes (3): orderKeys, queryClient, QueryKey

### Community 99 - "banner-image-field.tsx"
Cohesion: 0.13
Nodes (20): canvasToBlob(), CropArea, cropImageToFile(), loadImage(), readImageSize(), ALLOWED, BannerImageField(), formatMb() (+12 more)

### Community 100 - "inspect-vk-sdk.mjs"
Cohesion: 0.50
Nodes (3): idx, renderIdx, s

### Community 102 - "lib.ts"
Cohesion: 0.53
Nodes (5): nutritionForPortion(), nutritionOf(), parseWeightGrams(), scaleNutrition(), SkuCell

### Community 103 - "pb"
Cohesion: 0.40
Nodes (5): adminCountKeys, AdminCounts, fetchAdminCounts(), useAdminCounts(), pb

### Community 104 - "settings/model.ts"
Cohesion: 0.40
Nodes (5): GroupLabel(), Panel(), PanelProps, SectionTitle(), surfaceVariants

### Community 105 - "invalidateProductRatings"
Cohesion: 0.67
Nodes (4): invalidateProductRatings(), useCreateReview(), useUpdateReview(), ReviewForm()

## Ambiguous Edges - Review These
- `figma-make-app` → `Logo CMYK`  [AMBIGUOUS]
  temp/логотип/лого CMYK.pdf · relation: conceptually_related_to
- `figma-make-app` → `Logo RGB`  [AMBIGUOUS]
  temp/логотип/лого RGB.pdf · relation: conceptually_related_to

## Knowledge Gaps
- **449 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+444 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `figma-make-app` and `Logo CMYK`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `figma-make-app` and `Logo RGB`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `cn()` connect `useCategories` to `addon/api.ts`, `FloatingActions.tsx`, `ProductEditor.tsx`, `cn.ts`, `StickyBar.tsx`, `FloatingActions.tsx`, `order/api.ts`, `order/model.ts`, `HomePage.tsx`, `TagFilters.tsx`, `pb.ts`, `CustomerDrawer.tsx`, `order/model.ts`, `@radix-ui/react-slot`, `HomePage.tsx`, `sonner`, `CouponForm.tsx`, `AdminPage.tsx`, `loginWithOAuth`, `MobileHome.tsx`, `CashPricesPanel.tsx`, `CartLineRow.tsx`, `category/api.ts`, `files.ts`, `NutritionHint.tsx`, `ProductsSection.tsx`, `router.tsx`, `useStoppedStock`, `banner-image-field.tsx`, `settings/model.ts`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **Why does `dependencies` connect `package.json` to `pocketbase`, `FloatingActions.tsx`, `zustand`, `lenis`, `@radix-ui/react-dialog`, `package.json`, `@radix-ui/react-popover`, `react-easy-crop`, `category/api.ts`, `AddonForm.tsx`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Why does `VitrineScrollProvider()` connect `VitrineScroll.tsx` to `lenis`, `StickyBar.tsx`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `ProductEditor()` (e.g. with `e()` and `n()`) actually correct?**
  _`ProductEditor()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _449 weakly-connected nodes found - possible documentation gaps or missing edges._