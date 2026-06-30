#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [[ ! -f .env ]]; then
  echo "Файл .env не найден. Выполните: cp .env.example .env"
  exit 1
fi

set -a
source .env
set +a

npm run db:migrate
