# Graph Report - shahlik  (2026-08-20)

## Corpus Check
- 94 files · ~1,321,802 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 574 nodes · 1237 edges · 26 communities (24 shown, 2 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 28 edges (avg confidence: 0.59)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3b945625`
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
- Logo Emblem
- Logo Black Variant
- Brand Typography
- Brand Logo Core
- Brand Color Palette
- Vite Figma Plugins
- FloatingActions.tsx
- product/api.ts
- DesktopHome.tsx
- gen-glass-noise.mjs
- pb.ts
- FloatingActions.tsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 77 edges
2. `useCategories()` - 21 edges
3. `formatPrice()` - 21 edges
4. `compilerOptions` - 18 edges
5. `useProducts()` - 15 edges
6. `Product` - 13 edges
7. `useCartTotals()` - 13 edges
8. `minPrice()` - 11 edges
9. `useCartStore` - 11 edges
10. `ProductEditor()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `Logo CMYK` --conceptually_related_to--> `figma-make-app`  [AMBIGUOUS]
  temp/логотип/лого CMYK.pdf → AGENTS.md
- `Logo RGB` --conceptually_related_to--> `figma-make-app`  [AMBIGUOUS]
  temp/логотип/лого RGB.pdf → AGENTS.md
- `useUpdateProduct()` --indirect_call--> `product()`  [INFERRED]
  apps/shashlik-web/src/entities/product/api.ts → apps/shashlik-web/src/mocks/products.ts
- `useAddProduct()` --indirect_call--> `product()`  [INFERRED]
  apps/shashlik-web/src/features/cart/lib/useAddProduct.ts → apps/shashlik-web/src/mocks/products.ts
- `SumRow()` --calls--> `cn()`  [EXTRACTED]
  apps/shashlik-web/src/features/cart/ui/CartPanel.tsx → apps/shashlik-web/src/shared/lib/cn.ts

## Import Cycles
- None detected.

## Communities (26 total, 2 thin omitted)

### Community 0 - "addon/api.ts"
Cohesion: 0.13
Nodes (18): addonKeys, AddonRecord, fetchAddonById(), fetchAddons(), fetchAddonsByKind(), fetchExtras(), fetchSauces(), mapAddon() (+10 more)

### Community 1 - "UI Layout Components"
Cohesion: 0.06
Nodes (48): createOrder(), CreateOrderInput, fetchOrderById(), fetchOrders(), fetchReviewById(), fetchReviews(), mapOrder(), mapReview() (+40 more)

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
Cohesion: 0.05
Nodes (69): useUpdateProduct(), minPrice(), needsChooser(), DEFAULT_CRITERIA, MeatIcon, Product, ProductNutrition, ProductSize (+61 more)

### Community 6 - "Meal Add-ons UI"
Cohesion: 0.10
Nodes (18): categoryKeys, CategoryRecord, fetchCategories(), fetchCategoryById(), mapCategory(), useCategory(), Category, CategoryId (+10 more)

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
Nodes (28): App(), readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), useTheme(), AdminGate() (+20 more)

### Community 21 - "product/api.ts"
Cohesion: 0.20
Nodes (15): deleteProduct(), fetchProductById(), fetchProductBySlug(), fetchProducts(), fetchProductsByCategory(), mapProduct(), productKeys, ProductRecord (+7 more)

### Community 22 - "DesktopHome.tsx"
Cohesion: 0.07
Nodes (39): useCategories(), CategoryIcon(), Props, ProductTag, useAddProduct(), CartPanelState, useCartPanelStore, CartDock() (+31 more)

### Community 23 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 24 - "pb.ts"
Cohesion: 0.10
Nodes (28): useAddons(), bannerKeys, BannerRecord, fetchBannerById(), fetchBanners(), mapBanner(), useBanner(), useBanners() (+20 more)

### Community 25 - "FloatingActions.tsx"
Cohesion: 0.32
Nodes (6): CartToggle(), formatOrderSum(), Props, FloatingActions(), Props, TONE

## Ambiguous Edges - Review These
- `figma-make-app` → `Logo CMYK`  [AMBIGUOUS]
  temp/логотип/лого CMYK.pdf · relation: conceptually_related_to
- `figma-make-app` → `Logo RGB`  [AMBIGUOUS]
  temp/логотип/лого RGB.pdf · relation: conceptually_related_to

## Knowledge Gaps
- **170 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+165 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `figma-make-app` and `Logo CMYK`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `figma-make-app` and `Logo RGB`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `cn()` connect `Sushi Catalog UI` to `UI Layout Components`, `FloatingActions.tsx`, `DesktopHome.tsx`, `pb.ts`, `FloatingActions.tsx`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **Why does `Product` connect `Sushi Catalog UI` to `UI Layout Components`, `Meal Add-ons UI`, `product/api.ts`, `DesktopHome.tsx`, `pb.ts`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **Why does `useCategories()` connect `DesktopHome.tsx` to `pb.ts`, `Sushi Catalog UI`, `Meal Add-ons UI`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _170 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `addon/api.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13438735177865613 - nodes in this community are weakly interconnected._