# Graph Report - shashlik-web  (2026-08-20)

## Corpus Check
- 86 files · ~132,108 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 465 nodes · 1086 edges · 15 communities (13 shown, 2 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 22 edges (avg confidence: 0.54)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3b945625`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- HomePage.tsx
- dependencies
- selectors.ts
- ProductPage.tsx
- cn
- CatalogTables.tsx
- devDependencies
- compilerOptions
- MobileHeader.tsx
- formatPrice
- ADMIN_BANNER_ICON
- vite-env.d.ts
- gen-glass-noise.mjs
- banner/api.ts

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
- `useAddProduct()` --indirect_call--> `product()`  [INFERRED]
  src/features/cart/lib/useAddProduct.ts → src/mocks/products.ts
- `SumRow()` --calls--> `cn()`  [EXTRACTED]
  src/features/cart/ui/CartPanel.tsx → src/shared/lib/cn.ts
- `SearchDialog()` --indirect_call--> `product()`  [INFERRED]
  src/features/search/SearchDialog.tsx → src/mocks/products.ts
- `StepBtn()` --calls--> `cn()`  [EXTRACTED]
  src/shared/ui/stepper.tsx → src/shared/lib/cn.ts
- `useCartTotals()` --calls--> `useAddons()`  [EXTRACTED]
  src/features/cart/model/selectors.ts → src/entities/addon/api.ts

## Import Cycles
- None detected.

## Communities (15 total, 2 thin omitted)

### Community 0 - "HomePage.tsx"
Cohesion: 0.10
Nodes (40): useAddons(), useBanners(), useCategories(), useOrders(), useReviews(), useProducts(), minPrice(), Product (+32 more)

### Community 1 - "dependencies"
Cohesion: 0.06
Nodes (31): class-variance-authority, clsx, lucide-react, motion, dependencies, class-variance-authority, clsx, lucide-react (+23 more)

### Community 2 - "selectors.ts"
Cohesion: 0.06
Nodes (42): categoryKeys, CategoryRecord, fetchCategories(), fetchCategoryById(), mapCategory(), useCategory(), Category, CategoryId (+34 more)

### Community 3 - "ProductPage.tsx"
Cohesion: 0.06
Nodes (50): addonKeys, AddonRecord, fetchAddonById(), fetchAddons(), fetchAddonsByKind(), fetchExtras(), fetchSauces(), mapAddon() (+42 more)

### Community 4 - "cn"
Cohesion: 0.07
Nodes (34): needsChooser(), ProductTag, useAddProduct(), CartPanelState, useCartPanelStore, CartDock(), HomePage(), DesktopHome() (+26 more)

### Community 5 - "CatalogTables.tsx"
Cohesion: 0.12
Nodes (23): createOrder(), CreateOrderInput, fetchOrderById(), fetchOrders(), fetchReviewById(), fetchReviews(), mapOrder(), mapReview() (+15 more)

### Community 6 - "devDependencies"
Cohesion: 0.07
Nodes (28): devDependencies, tailwindcss, @tailwindcss/vite, tw-animate-css, @types/node, @types/react, @types/react-dom, typescript (+20 more)

### Community 7 - "compilerOptions"
Cohesion: 0.07
Nodes (26): DOM, DOM.Iterable, ES2023, node, src, vite/client, vite.config.ts, compilerOptions (+18 more)

### Community 8 - "MobileHeader.tsx"
Cohesion: 0.08
Nodes (22): App(), readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), useTheme(), AdminPage (+14 more)

### Community 9 - "formatPrice"
Cohesion: 0.07
Nodes (42): CategoryIcon(), Props, CartToggle(), formatOrderSum(), Props, PreviewToggle(), Props, AdminCard() (+34 more)

### Community 13 - "gen-glass-noise.mjs"
Cohesion: 0.17
Nodes (14): channelX, channelY, chunk(), crc32(), encodePng(), filterScanlines(), fractal(), makeRandom() (+6 more)

### Community 14 - "banner/api.ts"
Cohesion: 0.27
Nodes (8): bannerKeys, BannerRecord, fetchBannerById(), fetchBanners(), mapBanner(), useBanner(), Banner, banners

## Knowledge Gaps
- **141 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+136 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `formatPrice` to `HomePage.tsx`, `MobileHeader.tsx`, `ProductPage.tsx`, `cn`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **Why does `Product` connect `HomePage.tsx` to `formatPrice`, `selectors.ts`, `ProductPage.tsx`, `cn`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Why does `useCategories()` connect `HomePage.tsx` to `formatPrice`, `selectors.ts`, `cn`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _141 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `HomePage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1027450980392157 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
- **Should `selectors.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06127946127946128 - nodes in this community are weakly interconnected._