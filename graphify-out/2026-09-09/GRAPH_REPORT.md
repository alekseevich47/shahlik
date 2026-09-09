# Graph Report - shahlik  (2026-09-09)

## Corpus Check
- 251 files · ~1,505,747 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1927 nodes · 4895 edges · 102 communities (94 shown, 8 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 227 edges (avg confidence: 0.54)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `dcc06069`
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
- router.tsx
- ProductCard.tsx
- @radix-ui/react-slot
- sonner
- @tanstack/react-query
- Sparkline.tsx
- CouponForm.tsx
- SettingsSection.tsx
- invalidateProductRatings
- send.js
- banner-image-field.tsx
- jobs.js
- http.js
- AddonForm.tsx
- loginWithOAuth
- MobileHome.tsx
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
- a
- cn.ts
- copy-vkid-sdk.mjs
- CartLineRow.tsx
- VitrineScroll.tsx
- NutritionHint.tsx
- react
- sonner
- banner-image-field.tsx
- inspect-vk-sdk.mjs
- deploy.sh
- zustand
- AuthButtons.tsx
- Order
- addons.ts
- Sidebar.tsx
- select.tsx
- ProductsSection
- @radix-ui/react-popover

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

## Communities (102 total, 8 thin omitted)

### Community 0 - "addon/api.ts"
Cohesion: 0.18
Nodes (17): fetchSizeTemplates(), mapSizeTemplate(), seedFallback(), SizeTemplateInput, sizeTemplateKeys, sizeTemplateMutations, SizeTemplateRecord, useCreateSizeTemplate() (+9 more)

### Community 1 - "UI Layout Components"
Cohesion: 0.10
Nodes (30): adminReviewKeys, buildOrdersFilter(), createOrder(), CreateReviewInput, fetchAdminReviews(), fetchOrderById(), fetchOrders(), fetchOrdersPage() (+22 more)

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
Cohesion: 0.12
Nodes (25): useCustomerLedger(), buildCustomersFilter(), buildCustomersSort(), customerKeys, customerMutations, CustomerRecord, CustomersPageParams, CustomersPageResult (+17 more)

### Community 6 - "Meal Add-ons UI"
Cohesion: 0.11
Nodes (32): useAddons(), useFrontpadStockArticles(), articleFor(), articleConflictMessage(), ArticleExclude, ArticleRef, cellLabel(), collectArticleConflicts() (+24 more)

### Community 7 - "Checkout Flow UI"
Cohesion: 0.11
Nodes (18): API-правила (PB Rules), Env / инфра, `pb_hooks` (JSVM), TASK_DB — подключение PocketBase (сайт + админка) с прицелом на Frontpad, Архитектура, Зона БД — делаю сам (PocketBase Admin UI, `pb_hooks`, env), Зона кода — делает агент (после того как коллекции выше созданы), Коллекции (имена полей = 1:1 с `entities/*/model.ts`, где возможно) (+10 more)

### Community 8 - "package.json"
Cohesion: 0.08
Nodes (25): dependencies, class-variance-authority, clsx, lucide-react, motion, @radix-ui/react-dialog, @radix-ui/react-slot, @radix-ui/react-tooltip (+17 more)

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
Nodes (66): OrderStatus, applyPricesJobKeys, asNumberList(), asStatusMap(), asStringList(), enqueueApplyPricesJob(), enqueueSyncJob(), fetchActiveSyncJobs() (+58 more)

### Community 21 - "product/api.ts"
Cohesion: 0.07
Nodes (26): 1. env процесса `pocketbase` (systemd unit, `Environment=`), 2. Правки коллекций в `/_/` (и синхронно в `Tasks/schema.json`), 3. Rate limits PocketBase (`/_/` → Settings → Rate limits), 4. Настройки Frontpad (оператор), 5. Деплой `pb_hooks`, TASK_inter — интеграция с кассой Frontpad (боевая), Зона БД / инфры — делает владелец, агент не трогает, Зона кода — агент (+18 more)

### Community 22 - "ProductEditor.tsx"
Cohesion: 0.09
Nodes (29): activityLogKeys, ActivityLogsPage, ActivityRecord, fetchActivityLogsPage(), mapLog(), useActivityLogsPage(), ActivityActorType, ActivityLog (+21 more)

### Community 23 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 24 - "cn"
Cohesion: 0.16
Nodes (15): bannerFormData(), bannerKeys, bannerMutations, BannerNote, BannerRecord, CreateBannerInput, fetchBannerById(), fetchBanners() (+7 more)

### Community 25 - "HomePage.tsx"
Cohesion: 0.20
Nodes (20): applyClientData(), backfillOrders(), bindPhoneToUser(), bonusFromCustomer(), createCustomer(), ensureCustomer(), fetchClientFromCash(), findAppUserByPhone() (+12 more)

### Community 26 - "category/api.ts"
Cohesion: 0.06
Nodes (29): pocketbase, auth(), buildCompositionByVariant(), compositionBySlug, formatComposition(), nutritionBySlug, pb, repoRoot (+21 more)

### Community 27 - "cn.ts"
Cohesion: 0.06
Nodes (43): readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), useTheme(), useBanners(), CategoryIcon() (+35 more)

### Community 28 - "StickyBar.tsx"
Cohesion: 0.22
Nodes (10): lenis, isProductModalOpen(), LENIS_OPTIONS, Props, ScrollOptions, VitrineScrollApi, VitrineScrollContext, VitrineScrollProvider() (+2 more)

### Community 30 - "FloatingActions.tsx"
Cohesion: 0.16
Nodes (19): addonKeys, addonMutations, AddonRecord, CreateAddonInput, createBody(), fetchAddonById(), fetchAddons(), fetchAddonsByKind() (+11 more)

### Community 31 - "useCategories"
Cohesion: 0.31
Nodes (13): fetchPublicBonusSettings(), usePublicBonusSettings(), publicBonusSettingsFallback(), CartTotals(), CheckoutLineRow(), isPwaDismissedForever(), isPwaSoftCooldownActive(), isStandaloneDisplay() (+5 more)

### Community 32 - "order/api.ts"
Cohesion: 0.11
Nodes (24): adjustBonus(), bonusKeys, BonusSettingsRecord, bulkSetBonusPercent(), fetchBonusSettings(), fetchCustomerLedger(), LedgerRecord, mapLedger() (+16 more)

### Community 33 - "customer/api.ts"
Cohesion: 0.16
Nodes (29): articleFor(), assertArticleAvailable(), buildDescr(), buildNewOrderPayload(), calcCouponDiscount(), checkPromo(), countRecentOrdersByPhone(), findSize() (+21 more)

### Community 34 - "banner/api.ts"
Cohesion: 0.10
Nodes (30): adminProductKeys, createBody(), createProduct(), CreateProductInput, defaultRating(), duplicateProduct(), EMPTY_STATS, fetchAdminProducts() (+22 more)

### Community 35 - "addon/api.ts"
Cohesion: 0.14
Nodes (35): addEmailsToRecord(), applyNames(), applyOAuthNames(), applyOAuthProfileBeforeSave(), asObject(), emailsFromYandexOAuth(), ensureCreateDataField(), ensureCreateDataPhone() (+27 more)

### Community 36 - "order/model.ts"
Cohesion: 0.17
Nodes (15): BadgeInput, badgeKeys, badgeMutations, BadgeRecord, fetchBadges(), mapBadge(), seedFallback(), useCreateBadge() (+7 more)

### Community 37 - "articles.ts"
Cohesion: 0.08
Nodes (24): 1. Singleton-записи, 2. Новая auth-коллекция `app_users` (клиенты витрины), 3. Правки `orders`, 4. Правки `frontpad_settings`, 5. Правки `frontpad_jobs`, 6. Rate limits, TASK_order — профиль клиента, оформление заказа, витрина-модалка, Зона БД / инфры — делает владелец, агент не трогает (+16 more)

### Community 38 - "MobileTabBar.tsx"
Cohesion: 0.16
Nodes (27): bytesToBase64Url(), callbackUrl(), cryptoKey(), exchangeAuthCode(), findExternalUser(), findOrCreateUser(), formEncode(), fromBase64Url() (+19 more)

### Community 39 - "HomePage.tsx"
Cohesion: 0.18
Nodes (12): CreateStaffInput, fetchStaff(), mapStaff(), mapStaffRequired(), staffKeys, StaffMember, staffMutations, StaffRecord (+4 more)

### Community 40 - "MobileHome.tsx"
Cohesion: 0.18
Nodes (14): GuardedSection(), AdminAuth, AdminAuthContext, AdminAuthProvider(), authErrorMessage(), can(), isAbortError(), isStaffRecord() (+6 more)

### Community 41 - "TagFilters.tsx"
Cohesion: 0.11
Nodes (40): acceptAuthToken(), accountCacheKey(), accountKeys, addAddress(), asId(), asString(), BonusResponse, getAccount() (+32 more)

### Community 42 - "webhook.js"
Cohesion: 0.27
Nodes (14): applyStatusChange(), constantTimeEqual(), fieldOf(), fillFromObject(), findOrderByFrontpadId(), handleStatusWebhook(), hasHookFields(), jsonResult() (+6 more)

### Community 43 - "pb.ts"
Cohesion: 0.14
Nodes (22): completeVkOneTap(), createVkOneTapSession(), loginWithVkId(), resolveVkAppId(), attachVkOneTap(), detachVkOneTap(), isBenignVkError(), mountWidget() (+14 more)

### Community 44 - "package.json"
Cohesion: 0.18
Nodes (10): name, private, scripts, build, copy:vk-sdk, dev, preview, typecheck (+2 more)

### Community 45 - "AdminSidebar.tsx"
Cohesion: 0.18
Nodes (25): applyLedgerDelta(), applyLedgerDeltaTx(), calcOrderEarnAmount(), creditOrderEarn(), creditRegistrationBonus(), debitOrderSpend(), ensureReferralCode(), findLedgerByCustomerReason() (+17 more)

### Community 46 - "CustomerDrawer.tsx"
Cohesion: 0.12
Nodes (36): useBadges(), badgeLabel(), PRODUCT_ASPECT_RATIO, compositionOf(), minPrice(), fetchStoppedArticles(), isAddonStopped(), isProductStopped() (+28 more)

### Community 47 - "order/model.ts"
Cohesion: 0.15
Nodes (16): useCreateBanner(), useDeleteBanner(), useUpdateBanner(), BANNER_ASPECT_RATIO, BannerForm(), Props, BannersSection(), canvasToBlob() (+8 more)

### Community 48 - "@radix-ui/react-slot"
Cohesion: 0.24
Nodes (8): App(), AppRoutes(), ScrollToTop(), container, backgroundOf(), Glass(), GlassDefs(), GlassProps

### Community 49 - "HomePage.tsx"
Cohesion: 0.07
Nodes (28): 1.1. Включить API, 1.2. Артикулы товаров, 1.3. Разрешить менять цену в заказе извне (обязательно для совпадения сумм), 1.4. Справочники кодов (выпишите цифры на бумажку), 1.5. Бонусы самой кассы (Frontpad), 2.1. Главные тумблеры, 2.2. URL вебхука, 2.3. Коды оплаты и точка (+20 more)

### Community 50 - "router.tsx"
Cohesion: 0.17
Nodes (9): AdminGate(), AdminLogin, AdminPage, AuthCallbackPage, EASE, EXIT_ABS, loadMotionFeatures(), OrderTrackPage (+1 more)

### Community 51 - "ProductCard.tsx"
Cohesion: 0.18
Nodes (13): categoryKeys, categoryMutations, CategoryRecord, CreateCategoryInput, fetchCategories(), fetchCategoryById(), mapCategory(), UpdateCategoryInput (+5 more)

### Community 52 - "@radix-ui/react-slot"
Cohesion: 0.26
Nodes (10): filenamesOf(), FileRecord, imageFilenames(), imageUrl(), imageUrls(), ToFormDataOptions, canvasToBlob(), compressImage() (+2 more)

### Community 53 - "sonner"
Cohesion: 0.07
Nodes (41): useDeleteAddon(), useDeleteCategory(), useDeleteReview(), useToggleReviewPublished(), useAdminProducts(), useCreateProduct(), useDeleteProduct(), useToggleProductActive() (+33 more)

### Community 54 - "@tanstack/react-query"
Cohesion: 0.14
Nodes (18): e(), e1(), e5(), e6(), eB(), eU(), n(), ns() (+10 more)

### Community 55 - "Sparkline.tsx"
Cohesion: 0.18
Nodes (17): buildHookUrl(), coerceJsonArray(), coerceJsonObject(), copyDefaultStatusMap(), decodeByteJson(), getHookToken(), isArrayLike(), loadFrontpadSettings() (+9 more)

### Community 56 - "CouponForm.tsx"
Cohesion: 0.36
Nodes (6): ProductNutrition, formatGrams(), NutritionHint(), useIsDesktop(), useIsWide(), useMediaQuery()

### Community 57 - "SettingsSection.tsx"
Cohesion: 0.32
Nodes (5): ResolvedLine, BonusEarnHint(), BonusEarnHintProps, CartLineTitle(), CartLineTitleProps

### Community 58 - "invalidateProductRatings"
Cohesion: 0.67
Nodes (4): invalidateProductRatings(), useCreateReview(), useUpdateReview(), ReviewForm()

### Community 59 - "send.js"
Cohesion: 0.40
Nodes (9): claimOrderSend(), createDryRunJob(), nowPb(), patchFrontpadSettings(), patchOrder(), patchSendFailure(), recordToOrder(), sendOrder() (+1 more)

### Community 60 - "banner-image-field.tsx"
Cohesion: 0.12
Nodes (23): couponKeys, couponMutations, CouponRecord, CreateCouponInput, fetchCoupons(), mapCoupon(), PromoCheckFail, PromoCheckOk (+15 more)

### Community 61 - "jobs.js"
Cohesion: 0.24
Nodes (16): backoffMinutes(), buildKindFilter(), claimNextJob(), completeJob(), failJob(), formatPbDateTime(), isJobReady(), parseUpdatedMs() (+8 more)

### Community 62 - "http.js"
Cohesion: 0.36
Nodes (4): call(), extractWarnings(), formEncode(), maskSecret()

### Community 64 - "loginWithOAuth"
Cohesion: 0.15
Nodes (13): imagesDarkFromProduct(), imagesFromProduct(), matchedTemplateId(), MEAT_OPTIONS, newId(), PreviewToggle(), ProductEditor(), Props (+5 more)

### Community 65 - "MobileHome.tsx"
Cohesion: 0.11
Nodes (41): useCustomersPage(), cellDelta(), useDeleteStaff(), useRequestStaffPasswordReset(), useStaff(), useUpdateStaff(), COLUMNS, KIND_FILTERS (+33 more)

### Community 67 - "DesktopHome.tsx"
Cohesion: 0.10
Nodes (26): useCategories(), useProducts(), Product, CartPanelState, useCartPanelStore, CartDock(), HomeMobileTabBar(), HomePage() (+18 more)

### Community 68 - "StickyBar.tsx"
Cohesion: 0.17
Nodes (12): ng(), np(), o(), o2(), o3(), og(), ol(), os() (+4 more)

### Community 69 - "sync.js"
Cohesion: 0.32
Nodes (13): formatPbDateTime(), isNoStopsResponse(), isProductsSyncAllowed(), listAllStock(), normalizeArticle(), parsePrice(), parseSaleFlag(), parseSyncDate() (+5 more)

### Community 70 - "CartLineRow.tsx"
Cohesion: 0.17
Nodes (12): claimPwaInstallBonus(), detectInstallPlatform(), dismissPwaForever(), markPwaSoftDismissed(), BeforeInstallPromptEvent, InstallAppModal(), InstallAppModalProps, RegistrationBonusModal() (+4 more)

### Community 73 - "category/api.ts"
Cohesion: 0.13
Nodes (25): useAccount(), submitReferral(), fetchMyOrders(), useMyOrders(), isActiveOrderStatus(), canUseStorage(), getLatestLocalOrderId(), isStoredOrder() (+17 more)

### Community 74 - "account.tsx"
Cohesion: 0.70
Nodes (4): actorFromAuth(), hookCollectionWrite(), readRequestMeta(), write()

### Community 75 - "files.ts"
Cohesion: 0.22
Nodes (15): fetchActiveResendJobs(), mapJob(), resendOrder(), useOrder(), useOrderJobs(), useResendOrder(), useUpdateOrderStatus(), isFrontpadWarning() (+7 more)

### Community 76 - "getAccount"
Cohesion: 0.16
Nodes (19): fetchBonus(), useProfileBonus(), CreateOrderInput, OrderAddressParts, formatAddressLine(), PaymentMethod, savedToParts(), useCheckout() (+11 more)

### Community 77 - "NutritionHint.tsx"
Cohesion: 0.10
Nodes (31): AddonKind, useCreateCategory(), useUpdateCategory(), Props, CategoryForm(), Props, DEFAULT_NUTRITION, Props (+23 more)

### Community 78 - "router.tsx"
Cohesion: 0.22
Nodes (9): i(), nu(), o1(), oB(), oc(), od(), oi(), oz() (+1 more)

### Community 80 - "lucide-react"
Cohesion: 0.44
Nodes (9): applyPrices(), cloneSize(), cloneVariant(), listAll(), loadStockMap(), planProduct(), roundPrice(), sizeLabel() (+1 more)

### Community 82 - "a"
Cohesion: 0.25
Nodes (8): a(), r(), tf(), tg(), to(), tr(), tW(), tz()

### Community 86 - "cn.ts"
Cohesion: 0.24
Nodes (11): AccountAuth, AccountContext, AccountProvider(), isAbortError(), refreshAuth(), getClientAuthEpoch(), logout(), resetAccountCache() (+3 more)

### Community 88 - "copy-vkid-sdk.mjs"
Cohesion: 0.33
Nodes (4): dest, destDir, root, src

### Community 91 - "CartLineRow.tsx"
Cohesion: 0.29
Nodes (8): calcBonusSpendCap(), calcCartEarn(), calcLineEarn(), clampPercent(), EarnLineInput, resolveEarnPercent(), CartTotalsProps, SumRow()

### Community 93 - "VitrineScroll.tsx"
Cohesion: 0.10
Nodes (17): checkPromo(), BonusSpendBlock(), CheckoutDialogProps, PAYMENT_OPTIONS, CheckoutModeToggle(), CheckoutPromoField(), CheckoutPromoFieldProps, BADGES (+9 more)

### Community 95 - "NutritionHint.tsx"
Cohesion: 0.09
Nodes (26): ALL_CATEGORY, Category, CategoryId, KNOWN_CATEGORY_IDS, KnownCategoryId, cellNutrition(), defaultNutritionFromSizes(), setCellNutrition() (+18 more)

### Community 99 - "banner-image-field.tsx"
Cohesion: 0.08
Nodes (29): AppliedCoupon, calcCouponDiscount(), cartLineTitle(), findSize(), findVariant(), needsChooser(), useAddProduct(), addonFromCache() (+21 more)

### Community 100 - "inspect-vk-sdk.mjs"
Cohesion: 0.50
Nodes (3): idx, renderIdx, s

### Community 103 - "AuthButtons.tsx"
Cohesion: 0.24
Nodes (6): VkOneTap(), VkOneTapProps, AuthButtons(), AuthButtonsProps, LoginPanel(), SITE

### Community 104 - "Order"
Cohesion: 0.13
Nodes (14): DeliveryMode, FrontpadJob, FrontpadJobKind, FrontpadJobStatus, ORDER_STATUS_FLOW, ORDER_STATUS_SOURCE_LABEL, OrderLineAddon, OrderStatusSource (+6 more)

### Community 108 - "addons.ts"
Cohesion: 0.15
Nodes (11): Addon, addons, extras, IMG, sauces, AddonRow(), Props, SIZES (+3 more)

### Community 109 - "Sidebar.tsx"
Cohesion: 0.21
Nodes (11): Order, ORDER_STATUS_LABEL, OrderLineSnapshot, repeatOrderIntoCart(), useLiveOrder(), formatAddress(), LineRow(), OrderDetails() (+3 more)

### Community 110 - "select.tsx"
Cohesion: 0.21
Nodes (10): orderKeys, CollectionMutationsConfig, FIELD_CODE_RU, invalidate(), listKeys(), MutationKeys, QueryKey, syncDetail() (+2 more)

### Community 112 - "ProductsSection"
Cohesion: 0.10
Nodes (26): AdminCard(), Props, Props, StatCard(), cn(), Chip(), ChipProps, OptionCard() (+18 more)

## Ambiguous Edges - Review These
- `figma-make-app` → `Logo CMYK`  [AMBIGUOUS]
  temp/логотип/лого CMYK.pdf · relation: conceptually_related_to
- `figma-make-app` → `Logo RGB`  [AMBIGUOUS]
  temp/логотип/лого RGB.pdf · relation: conceptually_related_to

## Knowledge Gaps
- **489 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+484 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `figma-make-app` and `Logo CMYK`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `figma-make-app` and `Logo RGB`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `dependencies` connect `package.json` to `react`, `sonner`, `zustand`, `package.json`, `@radix-ui/react-popover`, `category/api.ts`, `StickyBar.tsx`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **Why does `VitrineScrollProvider()` connect `StickyBar.tsx` to `DesktopHome.tsx`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **Why does `lenis` connect `StickyBar.tsx` to `package.json`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `ProductEditor()` (e.g. with `e()` and `n()`) actually correct?**
  _`ProductEditor()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _489 weakly-connected nodes found - possible documentation gaps or missing edges._