# ЭНЕРГОПУСК

Витрина промышленного оборудования на React/Vite. Каталог хранится в PostgreSQL, управление товарами находится на `/admin`.

## Запуск одной командой

```bash
./scripts/dev.sh
```

Если Docker запущен, скрипт поднимет PostgreSQL, выполнит миграцию и запустит API. Без Docker запустится только фронтенд с резервными данными.

- сайт: `http://127.0.0.1:5173`;
- админка: `http://127.0.0.1:5173/admin`;
- API: `http://127.0.0.1:3001/api/health`.

Токен админки берётся из `ADMIN_TOKEN` в `.env`. При первом запуске `.env` создаётся из `.env.example`.

## Отдельные скрипты

```bash
./scripts/frontend.sh   # только React/Vite
./scripts/infra-up.sh   # запустить PostgreSQL
./scripts/migrate.sh    # создать таблицы и начальные данные
./scripts/backend.sh    # запустить Express API
./scripts/infra-down.sh # остановить PostgreSQL
```

## Production

```bash
export ADMIN_TOKEN='длинный-случайный-токен'
docker compose up --build
```

Production-сайт откроется на `http://localhost:3001`.

Изображения в витрине оставлены подписанными плейсхолдерами для последующей замены.
