# Graph Report - shahlik  (2026-08-20)

## Corpus Check
- 92 files · ~1,320,932 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 560 nodes · 1180 edges · 23 communities (21 shown, 2 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 26 edges (avg confidence: 0.59)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3b945625`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
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
- DesktopHome.tsx
- gen-glass-noise.mjs
- pb.ts

## God Nodes (most connected - your core abstractions)
1. `cn()` - 77 edges
2. `formatPrice()` - 21 edges
3. `compilerOptions` - 18 edges
4. `useCategories()` - 14 edges
5. `Product` - 13 edges
6. `useCartTotals()` - 13 edges
7. `minPrice()` - 11 edges
8. `useCartStore` - 11 edges
9. `ProductPage()` - 11 edges
10. `useProducts()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `Logo CMYK` --conceptually_related_to--> `figma-make-app`  [AMBIGUOUS]
  temp/логотип/лого CMYK.pdf → AGENTS.md
- `Logo RGB` --conceptually_related_to--> `figma-make-app`  [AMBIGUOUS]
  temp/логотип/лого RGB.pdf → AGENTS.md
- `useAddProduct()` --indirect_call--> `product()`  [INFERRED]
  apps/shashlik-web/src/features/cart/lib/useAddProduct.ts → apps/shashlik-web/src/mocks/products.ts
- `SearchDialog()` --indirect_call--> `product()`  [INFERRED]
  apps/shashlik-web/src/features/search/SearchDialog.tsx → apps/shashlik-web/src/mocks/products.ts
- `HoverArrow()` --calls--> `cn()`  [EXTRACTED]
  apps/shashlik-web/src/widgets/hero/HeroBanner.tsx → apps/shashlik-web/src/shared/lib/cn.ts

## Import Cycles
- None detected.

## Communities (23 total, 2 thin omitted)

### Community 1 - "UI Layout Components"
Cohesion: 0.07
Nodes (40): addonKeys, AddonRecord, fetchAddonById(), fetchAddons(), fetchAddonsByKind(), fetchExtras(), fetchSauces(), mapAddon() (+32 more)

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
Cohesion: 0.06
Nodes (54): useCreateOrder(), priceOf(), MeatIcon, CartPanel(), MODE_OPTIONS, SumRow(), PreviewToggle(), ProductEditor() (+46 more)

### Community 6 - "Meal Add-ons UI"
Cohesion: 0.05
Nodes (50): Banner, categoryKeys, CategoryRecord, fetchCategories(), fetchCategoryById(), mapCategory(), useCategory(), Category (+42 more)

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
Nodes (24): App(), readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), useTheme(), AdminPage (+16 more)

### Community 22 - "DesktopHome.tsx"
Cohesion: 0.06
Nodes (62): useCategories(), CategoryIcon(), Props, fetchProductById(), fetchProductBySlug(), fetchProducts(), fetchProductsByCategory(), mapProduct() (+54 more)

### Community 23 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 24 - "pb.ts"
Cohesion: 0.09
Nodes (29): bannerKeys, BannerRecord, fetchBannerById(), fetchBanners(), mapBanner(), useBanner(), useBanners(), createOrder() (+21 more)

## Ambiguous Edges - Review These
- `figma-make-app` → `Logo CMYK`  [AMBIGUOUS]
  temp/логотип/лого CMYK.pdf · relation: conceptually_related_to
- `figma-make-app` → `Logo RGB`  [AMBIGUOUS]
  temp/логотип/лого RGB.pdf · relation: conceptually_related_to

## Knowledge Gaps
- **162 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+157 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `figma-make-app` and `Logo CMYK`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `figma-make-app` and `Logo RGB`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `cn()` connect `Sushi Catalog UI` to `UI Layout Components`, `Meal Add-ons UI`, `FloatingActions.tsx`, `DesktopHome.tsx`, `pb.ts`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Why does `Product` connect `DesktopHome.tsx` to `UI Layout Components`, `Sushi Catalog UI`, `Meal Add-ons UI`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Why does `formatPrice()` connect `Sushi Catalog UI` to `UI Layout Components`, `DesktopHome.tsx`, `Meal Add-ons UI`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _162 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `UI Layout Components` be split into smaller, more focused modules?**
  _Cohesion score 0.06901960784313725 - nodes in this community are weakly interconnected._