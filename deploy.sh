#!/usr/bin/env bash
# Деплой витрины + pb_hooks на прод (VM с PocketBase).
# Запускать на сервере из /var/www/shashlik или: bash deploy.sh

set -euo pipefail

ROOT="/var/www/shashlik"
WEB="$ROOT/apps/shashlik-web"
PB_HOOKS_SRC="$ROOT/pb_hooks"
PB_HOOKS_DST="/opt/pocketbase/pb_hooks"
PB_URL="http://127.0.0.1:8090"
PB_HEALTH_RETRIES=30
PB_HEALTH_INTERVAL=1

wait_for_pocketbase() {
  local attempt=1

  echo "==> проверка PocketBase (systemd + ${PB_URL}/api/health)"
  while (( attempt <= PB_HEALTH_RETRIES )); do
    if sudo systemctl is-active --quiet pocketbase; then
      if response="$(curl -fsS "${PB_URL}/api/health" 2>/dev/null)"; then
        if [[ "$response" == *'"code":200'* ]]; then
          echo "PocketBase OK: $response"
          return 0
        fi
      fi
    fi
    sleep "$PB_HEALTH_INTERVAL"
    attempt=$((attempt + 1))
  done

  echo "ОШИБКА: PocketBase не ответил за ${PB_HEALTH_RETRIES}с" >&2
  sudo systemctl status pocketbase --no-pager -l || true
  exit 1
}

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

wait_for_pocketbase

echo "==> готово: $(date -Iseconds)"
