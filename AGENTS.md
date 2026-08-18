# Шашлыковский

Рабочий сайт — **`apps/shashlik-web`**. Канон архитектуры и правил правок: [`.cursor/rules/stack_new.mdc`](.cursor/rules/stack_new.mdc).

## Dev

```bash
cd apps/shashlik-web
pnpm dev
```

Сервер: `http://localhost:5273`. Корневого Vite больше нет.

## Структура

- `apps/shashlik-web/src` — приложение (React 19 + Vite 8 + Tailwind v4)
- `apps/shashlik-web/public` — фото, иконки, логотип
- `temp/` — исходники медиа и выгрузки кассы, не бандл
- Frontpad: [`.cursor/rules/API.mdc`](.cursor/rules/API.mdc) (пока не подключён)

Страницы: `src/pages/home`, `src/pages/product`, `src/pages/admin`. Default export только у страниц.

Только `.ts` / `.tsx`. Цвета — токены в `src/styles/globals.css`, не сырые hex.
