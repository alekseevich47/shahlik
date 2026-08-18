# Graph Report - shahlik  (2026-08-17)

## Corpus Check
- 29 files · ~1,336,661 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 384 nodes · 518 edges · 31 communities (22 shown, 9 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.88)
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
- Sushi Market Header
- Frontpad API
- Logo Variant B
- Logo Transparent
- Logo Emblem
- Logo Black Variant
- Brand Typography
- Brand Logo Core
- Brand Color Palette
- Vite Figma Plugins
- analyze-routes Script
- deploy Script
- deploy-preview Script
- dev Script
- format Script
- install Script
- langserver Script
- sort
- App
- formatSizePrices
- sort
- clampHalf

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 17 edges
2. `Product` - 11 edges
3. `groupProducts()` - 10 edges
4. `Addon` - 10 edges
5. `figma-make-app` - 10 edges
6. `AdminPage()` - 9 edges
7. `CartItem` - 9 edges
8. `Ваш заказ checkout screen` - 9 edges
9. `С этим товаром выбирают` - 9 edges
10. `sort()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Logo CMYK` --conceptually_related_to--> `figma-make-app`  [AMBIGUOUS]
  temp/логотип/лого CMYK.pdf → AGENTS.md
- `Logo RGB` --conceptually_related_to--> `figma-make-app`  [AMBIGUOUS]
  temp/логотип/лого RGB.pdf → AGENTS.md
- `Vite HTML shell` --semantically_similar_to--> `index.html`  [INFERRED] [semantically similar]
  index.html → AGENTS.md
- `/src/main.tsx module script` --conceptually_related_to--> `src/main.tsx`  [INFERRED]
  index.html → AGENTS.md
- `#root` --shares_data_with--> `src/main.tsx`  [INFERRED]
  index.html → AGENTS.md

## Import Cycles
- None detected.

## Communities (31 total, 9 thin omitted)

### Community 0 - "App Pages Shell"
Cohesion: 0.03
Nodes (22): Addon, AddonKind, ADDONS0, Banner, BANNERS0, C, CartItem, CatalogLS (+14 more)

### Community 1 - "UI Layout Components"
Cohesion: 0.06
Nodes (29): seedProducts, seedRaw, ShawarmaSpec, U, pillBtn, Props, Props, Props (+21 more)

### Community 2 - "NPM Dependencies"
Cohesion: 0.06
Nodes (34): oxfmt, dependencies, react, react-dom, devDependencies, oxfmt, tailwindcss, @tailwindcss/vite (+26 more)

### Community 3 - "TS Config Tooling"
Cohesion: 0.08
Nodes (24): DOM, DOM.Iterable, ES2020, node, src, vite.config.ts, compilerOptions, allowImportingTsExtensions (+16 more)

### Community 4 - "Figma Make Stack"
Cohesion: 0.13
Nodes (19): src/App.tsx, Default component exports, Figma Make, figma-make-app, src/index.css, index.html, src/main.tsx, oxfmt (+11 more)

### Community 5 - "Sushi Catalog UI"
Cohesion: 0.18
Nodes (14): Весенняя улица, 28, Акиюки 220 ₽, Cart line items, Sushi catalog browsing with live cart, Роллы category nav, 463 ₽ К оформлению, White-red food UI palette, Доставка / Самовывоз (+6 more)

### Community 6 - "Meal Add-ons UI"
Cohesion: 0.16
Nodes (14): Добавить, Палочки, Васаби, имбирь, соевый соус, палочки, Вилка, Имбирь, 8 ₽, 22 ₽, Quantity stepper − 1 + (+6 more)

### Community 7 - "Checkout Flow UI"
Cohesion: 0.19
Nodes (13): Добавить к заказу? carousel, Палочки, Васаби, имбирь, соевый соус, палочки, Вилка 8 ₽, Весенняя улица, 28, 463 ₽ К оформлению, Ваш заказ checkout screen, Доставка и оплата summary (+5 more)

### Community 9 - "Sushi Market Header"
Cohesion: 0.21
Nodes (12): Весенняя улица, 28, суши-маркет, Корзина (3), Product category nav, Кемерово, White-red UI palette, Header navigation bar, С днём рождения! Популярный дуэт в подарок (+4 more)

### Community 10 - "Frontpad API"
Cohesion: 0.33
Nodes (11): API Frontpad, change_status webhook, get_certificate, get_client, get_products, get_stops, new_order, Product article (артикул) (+3 more)

### Community 11 - "Logo Variant B"
Cohesion: 0.31
Nodes (10): Decorative banner frame, Шашлыковский, EST. 2024, Grilled-meat food brand, Шашлыковский logo B (no background), Logo variant B transparent, Bearded chef mascot, White line-art monochrome (+2 more)

### Community 12 - "Logo Transparent"
Cohesion: 0.27
Nodes (10): Шашлыковский, Orange-black-red palette, EST. 2024, Grilled-meat food brand, Шашлыковский logo without background, Bearded chef mascot, Orange decorative plaque, Shashlik skewers (+2 more)

### Community 13 - "Logo Emblem"
Cohesion: 0.31
Nodes (9): Шашлыковский, Orange-black-red palette, EST. 2024, Grilled-meat food brand, Шашлыковский brand logo emblem, Bearded chef mascot, Orange decorative plaque, Shashlik skewers (+1 more)

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

### Community 28 - "sort"
Cohesion: 0.20
Nodes (16): AdminPage(), applyGroupOrder(), Banners(), CategoryStrip(), criteriaOf(), GroupEditForm(), groupKeyOf(), groupProducts() (+8 more)

### Community 29 - "App"
Cohesion: 0.50
Nodes (4): App(), loadCatalog(), saveCatalog(), uid()

### Community 30 - "formatSizePrices"
Cohesion: 0.24
Nodes (12): color10(), color5(), fmtScore(), formatCardPrices(), HeaderSearch(), hexRgb(), lerpHex(), overall10() (+4 more)

### Community 31 - "sort"
Cohesion: 0.67
Nodes (3): AForm(), isSauce(), SizeModal()

## Ambiguous Edges - Review These
- `figma-make-app` → `Logo CMYK`  [AMBIGUOUS]
  temp/логотип/лого CMYK.pdf · relation: conceptually_related_to
- `figma-make-app` → `Logo RGB`  [AMBIGUOUS]
  temp/логотип/лого RGB.pdf · relation: conceptually_related_to

## Knowledge Gaps
- **108 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+103 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `figma-make-app` and `Logo CMYK`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `figma-make-app` and `Logo RGB`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `FLink()` connect `NPM Dependencies` to `UI Layout Components`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _108 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App Pages Shell` be split into smaller, more focused modules?**
  _Cohesion score 0.03389830508474576 - nodes in this community are weakly interconnected._
- **Should `UI Layout Components` be split into smaller, more focused modules?**
  _Cohesion score 0.05913461538461538 - nodes in this community are weakly interconnected._
- **Should `NPM Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05714285714285714 - nodes in this community are weakly interconnected._