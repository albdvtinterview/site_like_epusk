#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

command -v docker >/dev/null || { echo "Docker не установлен"; exit 1; }
docker info >/dev/null 2>&1 || { echo "Docker не запущен"; exit 1; }

export ADMIN_TOKEN="${ADMIN_TOKEN:-local-development-token}"
docker compose up -d db
echo "PostgreSQL запущен на 127.0.0.1:5432"
