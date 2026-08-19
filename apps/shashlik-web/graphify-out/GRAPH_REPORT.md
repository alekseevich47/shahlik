# Graph Report - shashlik-web  (2026-08-18)

## Corpus Check
- 76 files · ~126,896 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 387 nodes · 888 edges · 13 communities (12 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.65)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `65f8c93e`
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

## God Nodes (most connected - your core abstractions)
1. `cn()` - 77 edges
2. `formatPrice()` - 21 edges
3. `compilerOptions` - 18 edges
4. `Product` - 12 edges
5. `minPrice()` - 11 edges
6. `useCartTotals()` - 11 edges
7. `useCartStore` - 11 edges
8. `categoryById()` - 9 edges
9. `ProductPage()` - 9 edges
10. `Button()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `SumRow()` --calls--> `cn()`  [EXTRACTED]
  src/features/cart/ui/CartPanel.tsx → src/shared/lib/cn.ts
- `StepBtn()` --calls--> `cn()`  [EXTRACTED]
  src/shared/ui/stepper.tsx → src/shared/lib/cn.ts
- `ProductEditor()` --calls--> `priceOf()`  [EXTRACTED]
  src/pages/admin/sections/ProductEditor.tsx → src/entities/product/lib.ts
- `ProductCard()` --calls--> `cn()`  [EXTRACTED]
  src/entities/product/ui/ProductCard.tsx → src/shared/lib/cn.ts
- `ProductCardCompact()` --calls--> `cn()`  [EXTRACTED]
  src/entities/product/ui/ProductCardCompact.tsx → src/shared/lib/cn.ts

## Import Cycles
- None detected.

## Communities (13 total, 1 thin omitted)

### Community 0 - "HomePage.tsx"
Cohesion: 0.09
Nodes (40): Category, CategoryId, minPrice(), needsChooser(), DEFAULT_CRITERIA, Product, ProductBadge, ProductRating (+32 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (47): class-variance-authority, clsx, lucide-react, motion, dependencies, class-variance-authority, clsx, lucide-react (+39 more)

### Community 2 - "selectors.ts"
Cohesion: 0.08
Nodes (26): Addon, AddonKind, MeatIcon, ProductNutrition, addons, extras, IMG, sauces (+18 more)

### Community 3 - "ProductPage.tsx"
Cohesion: 0.10
Nodes (26): DeliveryMode, cartLineTitle(), findSize(), findVariant(), priceOf(), CartTotals, ResolvedAddon, ResolvedLine (+18 more)

### Community 4 - "cn"
Cohesion: 0.13
Nodes (17): categories, productsByCategory(), HomePage(), DesktopHome(), Options, useInView(), useIsDesktop(), useIsWide() (+9 more)

### Community 5 - "CatalogTables.tsx"
Cohesion: 0.09
Nodes (29): Banner, Order, ORDER_STATUS_LABEL, OrderStatus, Review, banners, coupons, orders (+21 more)

### Community 6 - "devDependencies"
Cohesion: 0.07
Nodes (28): devDependencies, tailwindcss, @tailwindcss/vite, tw-animate-css, @types/node, @types/react, @types/react-dom, typescript (+20 more)

### Community 7 - "compilerOptions"
Cohesion: 0.07
Nodes (26): DOM, DOM.Iterable, ES2023, node, src, vite/client, vite.config.ts, compilerOptions (+18 more)

### Community 8 - "MobileHeader.tsx"
Cohesion: 0.10
Nodes (19): App(), readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), useTheme(), AdminPage (+11 more)

### Community 9 - "formatPrice"
Cohesion: 0.07
Nodes (43): CategoryIcon(), Props, ProductTag, CartPanelState, useCartPanelStore, CartDock(), CartToggle(), formatOrderSum() (+35 more)

## Knowledge Gaps
- **125 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+120 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `formatPrice` to `HomePage.tsx`, `selectors.ts`, `ProductPage.tsx`, `cn`, `CatalogTables.tsx`, `MobileHeader.tsx`?**
  _High betweenness centrality (0.138) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `devDependencies`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _125 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `HomePage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08525506638714186 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._
- **Should `selectors.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08408408408408409 - nodes in this community are weakly interconnected._
- **Should `ProductPage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10252100840336134 - nodes in this community are weakly interconnected._