#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

[[ -d node_modules ]] || npm ci

if [[ -f .env ]]; then
  set -a
  source .env
  set +a
fi

VITE_BASE_PATH=/ VITE_CATALOG_API_ENABLED=false npm run build
exec npm run preview -- --host 127.0.0.1 --port "${PREVIEW_PORT:-4173}"
