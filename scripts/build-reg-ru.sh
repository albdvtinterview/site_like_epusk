#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RELEASE_DIR="$ROOT_DIR/release"
ARCHIVE_PATH="$RELEASE_DIR/nova-energo-reg-ru.zip"

cd "$ROOT_DIR"
[[ -d node_modules ]] || npm ci

VITE_CATALOG_API_ENABLED=false npm run build
mkdir -p "$RELEASE_DIR"

cd "$ROOT_DIR/dist"
zip -FS -q -r "$ARCHIVE_PATH" .

echo "Архив REG.RU готов: $ARCHIVE_PATH"
