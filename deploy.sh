#!/usr/bin/env bash
# Деплой витрины + pb_hooks на прод (VM с PocketBase).
# Запускать на сервере из /var/www/shashlik или: bash deploy.sh

set -euo pipefail

ROOT="/var/www/shashlik"
WEB="$ROOT/apps/shashlik-web"
PB_HOOKS_SRC="$ROOT/pb_hooks"
PB_HOOKS_DST="/opt/pocketbase/pb_hooks"

echo "==> git pull ($ROOT)"
cd "$ROOT"
git pull

echo "==> frontend: pnpm install + build"
cd "$WEB"
pnpm install
pnpm build

echo "==> pb_hooks -> $PB_HOOKS_DST"
sudo rsync -av "$PB_HOOKS_SRC/" "$PB_HOOKS_DST/"

echo "==> restart pocketbase"
sudo systemctl daemon-reload
sudo systemctl restart pocketbase

echo "==> готово: $(date -Iseconds)"
