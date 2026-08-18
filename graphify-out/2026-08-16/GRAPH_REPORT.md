# Graph Report - shahlik  (2026-08-16)

## Corpus Check
- 29 files · ~1,058,380 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 357 nodes · 469 edges · 32 communities (23 shown, 9 thin omitted)
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
- AdminPage.tsx
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
- package.json
- sort
- App
- formatSizePrices
- sort

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 17 edges
2. `Product` - 11 edges
3. `Addon` - 10 edges
4. `figma-make-app` - 10 edges
5. `AdminPage()` - 9 edges
6. `CartItem` - 9 edges
7. `Ваш заказ checkout screen` - 9 edges
8. `С этим товаром выбирают` - 9 edges
9. `sort()` - 8 edges
10. `groupProducts()` - 8 edges

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

## Communities (32 total, 9 thin omitted)

### Community 0 - "App Pages Shell"
Cohesion: 0.04
Nodes (19): Addon, ADDONS0, Banner, BANNERS0, C, CartItem, CatalogLS, Category (+11 more)

### Community 1 - "UI Layout Components"
Cohesion: 0.09
Nodes (23): seedProducts, ShawarmaSpec, U, pillBtn, Props, Props, Props, Props (+15 more)

### Community 2 - "NPM Dependencies"
Cohesion: 0.11
Nodes (19): oxfmt, devDependencies, oxfmt, tailwindcss, @tailwindcss/vite, @types/node, @types/react, @types/react-dom (+11 more)

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

### Community 27 - "package.json"
Cohesion: 0.12
Nodes (15): dependencies, react, react-dom, name, private, scripts, build, dev (+7 more)

### Community 28 - "sort"
Cohesion: 0.46
Nodes (8): AdminPage(), applyGroupOrder(), groupKeyOf(), groupProducts(), renumberCategory(), reorderArray(), reorderGroups(), reorderVariants()

### Community 29 - "App"
Cohesion: 0.50
Nodes (4): App(), loadCatalog(), saveCatalog(), uid()

### Community 30 - "formatSizePrices"
Cohesion: 0.50
Nodes (4): formatCardPrices(), HomePage(), needsChooser(), PCard()

### Community 31 - "sort"
Cohesion: 0.40
Nodes (5): Banners(), CategoryStrip(), reorderOrdered(), SizeModal(), sort()

## Ambiguous Edges - Review These
- `figma-make-app` → `Logo CMYK`  [AMBIGUOUS]
  temp/логотип/лого CMYK.pdf · relation: conceptually_related_to
- `figma-make-app` → `Logo RGB`  [AMBIGUOUS]
  temp/логотип/лого RGB.pdf · relation: conceptually_related_to

## Knowledge Gaps
- **102 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+97 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `figma-make-app` and `Logo CMYK`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `figma-make-app` and `Logo RGB`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `FLink()` connect `package.json` to `UI Layout Components`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _102 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App Pages Shell` be split into smaller, more focused modules?**
  _Cohesion score 0.038461538461538464 - nodes in this community are weakly interconnected._
- **Should `UI Layout Components` be split into smaller, more focused modules?**
  _Cohesion score 0.08865248226950355 - nodes in this community are weakly interconnected._
- **Should `NPM Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._