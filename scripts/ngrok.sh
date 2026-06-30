#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

command -v ngrok >/dev/null || { echo "ngrok не установлен: https://ngrok.com/download"; exit 1; }

if [[ -f .env ]]; then
  set -a
  source .env
  set +a
fi

NGROK_ARGS=(http "http://127.0.0.1:${PREVIEW_PORT:-4173}")

if [[ -n "${NGROK_DOMAIN:-}" ]]; then
  NGROK_ARGS+=(--url "$NGROK_DOMAIN")
fi

exec ngrok "${NGROK_ARGS[@]}"
