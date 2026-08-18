# Graph Report - shahlik  (2026-08-18)

## Corpus Check
- 72 files · ~1,303,553 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 438 nodes · 923 edges · 20 communities (19 shown, 1 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.76)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `15ba8c22`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- App Pages Shell
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

## God Nodes (most connected - your core abstractions)
1. `cn()` - 70 edges
2. `formatPrice()` - 23 edges
3. `compilerOptions` - 18 edges
4. `useCartStore` - 13 edges
5. `Product` - 12 edges
6. `minPrice()` - 11 edges
7. `useCartTotals()` - 11 edges
8. `figma-make-app` - 10 edges
9. `categoryById()` - 9 edges
10. `Button()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Logo CMYK` --conceptually_related_to--> `figma-make-app`  [AMBIGUOUS]
  temp/логотип/лого CMYK.pdf → AGENTS.md
- `Logo RGB` --conceptually_related_to--> `figma-make-app`  [AMBIGUOUS]
  temp/логотип/лого RGB.pdf → AGENTS.md
- `SumRow()` --calls--> `cn()`  [EXTRACTED]
  apps/shashlik-web/src/features/cart/ui/CartPanel.tsx → apps/shashlik-web/src/shared/lib/cn.ts
- `StepBtn()` --calls--> `cn()`  [EXTRACTED]
  apps/shashlik-web/src/shared/ui/stepper.tsx → apps/shashlik-web/src/shared/lib/cn.ts
- `Logo CMYK` --semantically_similar_to--> `Logo RGB`  [INFERRED] [semantically similar]
  temp/логотип/лого CMYK.pdf → temp/логотип/лого RGB.pdf

## Import Cycles
- None detected.

## Communities (20 total, 1 thin omitted)

### Community 0 - "App Pages Shell"
Cohesion: 0.06
Nodes (52): minPrice(), ProductCard(), ProductCardProps, ProductCardCompact(), Props, PreviewToggle(), ProductEditor(), Props (+44 more)

### Community 1 - "UI Layout Components"
Cohesion: 0.08
Nodes (41): Addon, AddonKind, cartLineTitle(), findSize(), findVariant(), priceOf(), CartTotals, ResolvedAddon (+33 more)

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
Nodes (40): Category, CategoryId, needsChooser(), DEFAULT_CRITERIA, MeatIcon, Product, ProductBadge, ProductRating (+32 more)

### Community 6 - "Meal Add-ons UI"
Cohesion: 0.10
Nodes (28): Banner, DeliveryMode, Order, ORDER_STATUS_LABEL, OrderStatus, Review, banners, coupons (+20 more)

### Community 7 - "Checkout Flow UI"
Cohesion: 0.09
Nodes (19): App(), readInitialTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider(), useTheme(), AdminPage (+11 more)

### Community 8 - "package.json"
Cohesion: 0.04
Nodes (47): dependencies, class-variance-authority, clsx, lucide-react, motion, @radix-ui/react-accordion, @radix-ui/react-dialog, @radix-ui/react-dropdown-menu (+39 more)

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

## Ambiguous Edges - Review These
- `figma-make-app` → `Logo CMYK`  [AMBIGUOUS]
  temp/логотип/лого CMYK.pdf · relation: conceptually_related_to
- `figma-make-app` → `Logo RGB`  [AMBIGUOUS]
  temp/логотип/лого RGB.pdf · relation: conceptually_related_to

## Knowledge Gaps
- **128 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+123 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `figma-make-app` and `Logo CMYK`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `figma-make-app` and `Logo RGB`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `cn()` connect `App Pages Shell` to `UI Layout Components`, `Sushi Catalog UI`, `Meal Add-ons UI`, `Checkout Flow UI`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Why does `dependencies` connect `package.json` to `NPM Dependencies`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _128 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App Pages Shell` be split into smaller, more focused modules?**
  _Cohesion score 0.05985915492957746 - nodes in this community are weakly interconnected._
- **Should `UI Layout Components` be split into smaller, more focused modules?**
  _Cohesion score 0.08376623376623377 - nodes in this community are weakly interconnected._