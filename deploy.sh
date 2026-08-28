#!/usr/bin/env bash
# Деплой: git pull → сборка витрины → pb_hooks → рестарт PocketBase.
#
# По умолчанию корень — каталог, где лежит deploy.sh (можно переопределить).
#
#   ./deploy.sh
#   DEPLOY_ROOT=/var/www/shashlik ./deploy.sh
#   SKIP_GIT=1 ./deploy.sh          # без git pull
#   SKIP_PB=1 ./deploy.sh           # только фронт (без pb_hooks и рестарта PB)
#
# Переменные (все необязательны):
#   DEPLOY_ROOT      — корень репозитория (default: каталог deploy.sh)
#   WEB_DIR          — apps/shashlik-web
#   PB_HOOKS_SRC     — pb_hooks/
#   PB_HOOKS_DST     — /opt/pocketbase/pb_hooks
#   PB_SERVICE       — systemd unit (default: pocketbase)
#   PB_URL           — health-check URL (default: http://127.0.0.1:8090)
#   SKIP_GIT=1       — не делать git pull
#   SKIP_PB=1        — не rsync pb_hooks и не рестартить PB

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="${DEPLOY_ROOT:-$SCRIPT_DIR}"
WEB="${WEB_DIR:-$ROOT/apps/shashlik-web}"
PB_HOOKS_SRC="${PB_HOOKS_SRC:-$ROOT/pb_hooks}"
PB_HOOKS_DST="${PB_HOOKS_DST:-/opt/pocketbase/pb_hooks}"
PB_SERVICE="${PB_SERVICE:-pocketbase}"
PB_URL="${PB_URL:-http://127.0.0.1:8090}"
PB_HEALTH_RETRIES="${PB_HEALTH_RETRIES:-30}"
PB_HEALTH_INTERVAL="${PB_HEALTH_INTERVAL:-1}"

wait_for_pocketbase() {
  local attempt=1

  echo "==> проверка PocketBase ($PB_SERVICE + ${PB_URL}/api/health)"
  while (( attempt <= PB_HEALTH_RETRIES )); do
    if sudo systemctl is-active --quiet "$PB_SERVICE"; then
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
  sudo systemctl status "$PB_SERVICE" --no-pager -l || true
  exit 1
}

if [[ ! -d "$WEB" ]]; then
  echo "ОШИБКА: не найден каталог витрины: $WEB" >&2
  exit 1
fi

if [[ "${SKIP_GIT:-0}" != "1" ]]; then
  echo "==> git pull ($ROOT)"
  cd "$ROOT"
  if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    git pull
  else
    echo "    (не git-репозиторий — пропуск)"
  fi
else
  cd "$ROOT"
fi

echo "==> frontend: pnpm install + build ($WEB)"
cd "$WEB"
pnpm install
pnpm build

if [[ "${SKIP_PB:-0}" == "1" ]]; then
  echo "==> SKIP_PB=1 — pb_hooks и PocketBase пропущены"
  echo "==> готово: $(date -Iseconds)"
  exit 0
fi

if [[ ! -d "$PB_HOOKS_SRC" ]]; then
  echo "ОШИБКА: не найден $PB_HOOKS_SRC" >&2
  exit 1
fi

echo "==> pb_hooks -> $PB_HOOKS_DST"
sudo rsync -av "$PB_HOOKS_SRC/" "$PB_HOOKS_DST/"

echo "==> restart $PB_SERVICE"
sudo systemctl daemon-reload
sudo systemctl restart "$PB_SERVICE"

wait_for_pocketbase

echo "==> готово: $(date -Iseconds)"
