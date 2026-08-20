# Graph Report - shahlik  (2026-08-20)

## Corpus Check
- 112 files · ~1,331,836 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 703 nodes · 1453 edges · 32 communities (31 shown, 1 thin omitted)
- Extraction: 97% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 36 edges (avg confidence: 0.57)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a41af5a5`
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

## God Nodes (most connected - your core abstractions)
1. `cn()` - 93 edges
2. `formatPrice()` - 21 edges
3. `useCategories()` - 19 edges
4. `compilerOptions` - 18 edges
5. `3. Зона кода — шаги` - 17 edges
6. `Button()` - 16 edges
7. `useCartTotals()` - 13 edges
8. `Product` - 12 edges
9. `ProductEditor()` - 12 edges
10. `pb` - 12 edges

## Surprising Connections (you probably didn't know these)
- `Logo CMYK` --conceptually_related_to--> `figma-make-app`  [AMBIGUOUS]
  temp/логотип/лого CMYK.pdf → AGENTS.md
- `Logo RGB` --conceptually_related_to--> `figma-make-app`  [AMBIGUOUS]
  temp/логотип/лого RGB.pdf → AGENTS.md
- `useAddProduct()` --indirect_call--> `product()`  [INFERRED]
  apps/shashlik-web/src/features/cart/lib/useAddProduct.ts → apps/shashlik-web/src/mocks/products.ts
- `SumRow()` --calls--> `cn()`  [EXTRACTED]
  apps/shashlik-web/src/features/cart/ui/CartPanel.tsx → apps/shashlik-web/src/shared/lib/cn.ts
- `SearchDialog()` --indirect_call--> `product()`  [INFERRED]
  apps/shashlik-web/src/features/search/SearchDialog.tsx → apps/shashlik-web/src/mocks/products.ts

## Import Cycles
- None detected.

## Communities (32 total, 1 thin omitted)

### Community 0 - "addon/api.ts"
Cohesion: 0.15
Nodes (18): fetchTags(), mapTag(), TagInput, tagKeys, tagMutations, TagRecord, tagsForCategory(), useCategoryTags() (+10 more)

### Community 1 - "UI Layout Components"
Cohesion: 0.06
Nodes (49): adminReviewKeys, createOrder(), CreateOrderInput, fetchAdminReviews(), fetchOrderById(), fetchOrders(), fetchReviewById(), fetchReviews() (+41 more)

### Community 2 - "NPM Dependencies"
Cohesion: 0.07
Nodes (28): devDependencies, tailwindcss, @tailwindcss/vite, tw-animate-css, @types/node, @types/react, @types/react-dom, typescript (+20 more)

### Community 3 - "TS Config Tooling"
Cohesion: 0.07
Nodes (26): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+18 more)

### Community 4 - "Figma Make Stack"
Cohesion: 0.14
Nodes (16): src/App.tsx, Default component exports, Figma Make, figma-make-app, src/index.css, index.html, src/main.tsx, oxfmt (+8 more)

### Community 5 - "Sushi Catalog UI"
Cohesion: 0.08
Nodes (34): addonKeys, AddonRecord, fetchAddonById(), fetchAddons(), fetchAddonsByKind(), fetchExtras(), fetchSauces(), mapAddon() (+26 more)

### Community 6 - "Meal Add-ons UI"
Cohesion: 0.06
Nodes (46): categoryKeys, CategoryRecord, fetchCategories(), fetchCategoryById(), mapCategory(), useCategory(), Category, CategoryId (+38 more)

### Community 7 - "Checkout Flow UI"
Cohesion: 0.11
Nodes (18): API-правила (PB Rules), Env / инфра, `pb_hooks` (JSVM), TASK_DB — подключение PocketBase (сайт + админка) с прицелом на Frontpad, Архитектура, Зона БД — делаю сам (PocketBase Admin UI, `pb_hooks`, env), Зона кода — делает агент (после того как коллекции выше созданы), Коллекции (имена полей = 1:1 с `entities/*/model.ts`, где возможно) (+10 more)

### Community 8 - "package.json"
Cohesion: 0.06
Nodes (31): dependencies, class-variance-authority, clsx, lucide-react, motion, pocketbase, @radix-ui/react-dialog, @radix-ui/react-slot (+23 more)

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
Cohesion: 0.07
Nodes (29): bannerKeys, BannerRecord, fetchBannerById(), fetchBanners(), mapBanner(), useBanner(), useBanners(), Banner (+21 more)

### Community 21 - "product/api.ts"
Cohesion: 0.08
Nodes (43): useAddons(), useAdminReviews(), useOrders(), useAdminProducts(), minPrice(), ProductCard(), ProductCardProps, ProductCardCompact() (+35 more)

### Community 22 - "ProductEditor.tsx"
Cohesion: 0.08
Nodes (26): PreviewToggle(), Props, AdminCard(), Props, EmptyState(), Props, move(), Props (+18 more)

### Community 23 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 24 - "cn"
Cohesion: 0.12
Nodes (17): Props, SectionShell(), Props, SkeletonRows(), cn(), Select(), SheetContent(), SheetContentProps (+9 more)

### Community 25 - "HomePage.tsx"
Cohesion: 0.19
Nodes (13): useProducts(), ALL_TAG, TagFilterId, HomePage(), MobileHome(), Props, Props, SPRING (+5 more)

### Community 26 - "category/api.ts"
Cohesion: 0.07
Nodes (32): App(), readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), useTheme(), AdminGate() (+24 more)

### Community 27 - "cn.ts"
Cohesion: 0.23
Nodes (7): CategoryIcon(), Props, ORDER_RULES, SITE, AddressBar(), PromoBanner(), SidebarProps

### Community 28 - "StickyBar.tsx"
Cohesion: 0.22
Nodes (8): Chip(), ChipProps, OptionCard(), OptionCardProps, Glass(), GlassProps, Props, STICKY_BAR

### Community 29 - "order/model.ts"
Cohesion: 0.17
Nodes (14): needsChooser(), Product, useAddProduct(), CartPanelState, useCartPanelStore, CartDock(), DesktopHome(), Props (+6 more)

### Community 30 - "FloatingActions.tsx"
Cohesion: 0.32
Nodes (6): CartToggle(), formatOrderSum(), Props, FloatingActions(), Props, TONE

### Community 31 - "useCategories"
Cohesion: 0.40
Nodes (5): useCategories(), CategoryTiles(), Props, StickyBar(), Sidebar()

## Ambiguous Edges - Review These
- `figma-make-app` → `Logo CMYK`  [AMBIGUOUS]
  temp/логотип/лого CMYK.pdf · relation: conceptually_related_to
- `figma-make-app` → `Logo RGB`  [AMBIGUOUS]
  temp/логотип/лого RGB.pdf · relation: conceptually_related_to

## Knowledge Gaps
- **226 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+221 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `figma-make-app` and `Logo CMYK`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `figma-make-app` and `Logo RGB`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `cn()` connect `cn` to `UI Layout Components`, `Sushi Catalog UI`, `Meal Add-ons UI`, `product/api.ts`, `ProductEditor.tsx`, `HomePage.tsx`, `category/api.ts`, `cn.ts`, `StickyBar.tsx`, `FloatingActions.tsx`, `useCategories`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Why does `pb` connect `FloatingActions.tsx` to `addon/api.ts`, `UI Layout Components`, `Sushi Catalog UI`, `Meal Add-ons UI`, `category/api.ts`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `Button()` connect `ProductEditor.tsx` to `addon/api.ts`, `UI Layout Components`, `Sushi Catalog UI`, `product/api.ts`, `cn`, `category/api.ts`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _226 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `UI Layout Components` be split into smaller, more focused modules?**
  _Cohesion score 0.05683060109289618 - nodes in this community are weakly interconnected._