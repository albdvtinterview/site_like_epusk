#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

[[ -d node_modules ]] || npm install
[[ -f .env ]] || cp .env.example .env

API_PID=""
FRONTEND_PID=""

cleanup() {
  [[ -n "$API_PID" ]] && kill "$API_PID" 2>/dev/null || true
  [[ -n "$FRONTEND_PID" ]] && kill "$FRONTEND_PID" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

if command -v docker >/dev/null && docker info >/dev/null 2>&1; then
  ./scripts/infra-up.sh
  for _ in {1..20}; do
    if docker compose exec -T db pg_isready -U energopusk -d energopusk >/dev/null 2>&1; then
      break
    fi
    sleep 1
  done
  ./scripts/migrate.sh
  ./scripts/backend.sh &
  API_PID=$!
else
  echo "Docker не запущен: витрина откроется с локальными данными, API и /admin будут недоступны."
fi

./scripts/frontend.sh &
FRONTEND_PID=$!

echo "Витрина: http://127.0.0.1:${FRONTEND_PORT:-5173}"
echo "Админка: http://127.0.0.1:${FRONTEND_PORT:-5173}/admin"
wait "$FRONTEND_PID"
