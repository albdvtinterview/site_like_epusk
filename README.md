# НОВА ЭНЕРГО

Витрина промышленного оборудования на React/Vite. Production-сборка работает автономно на статическом хостинге. Подключение каталога к PostgreSQL доступно только в локальном режиме через `VITE_CATALOG_API_ENABLED=true`.

## Запуск одной командой

```bash
./scripts/dev.sh
```

Если Docker запущен, скрипт поднимет PostgreSQL, выполнит миграцию и запустит API. Без Docker запустится только фронтенд с резервными данными.

- сайт: `http://127.0.0.1:5173`;
- API: `http://127.0.0.1:3001/api/health`.

Публичные ссылки и маршрут админки временно отключены. Серверный код сохранён для будущего переноса на VPS и внедрения авторизации через защищённую серверную сессию.

## Настройка `.env`

```bash
cp .env.example .env
openssl rand -hex 32
```

Результат второй команды укажите как `ADMIN_TOKEN` в `.env`. Токен ngrok берётся в личном кабинете ngrok и указывается как `NGROK_AUTHTOKEN`. `NGROK_DOMAIN` заполняется только при наличии закреплённого домена ngrok.

- `DATABASE_URL` — подключение Express к PostgreSQL;
- `DB_SSL` — `true` только для внешней БД, которая требует SSL;
- `ADMIN_TOKEN` — временный серверный токен старого API, не добавлять в переменные `VITE_*`;
- `PORT` — порт Express API;
- `FRONTEND_PORT` — порт Vite в режиме разработки;
- `PREVIEW_PORT` — порт локальной production-проверки;
- `VITE_CATALOG_API_ENABLED` — `true` для локальной БД, `false` для статической витрины;
- `VITE_BASE_PATH` — базовый URL сборки: `/` для REG.RU и `/site_like_epusk/` для GitHub Pages;
- `NGROK_AUTHTOKEN` — секрет агента ngrok;
- `NGROK_DOMAIN` — необязательный закреплённый адрес ngrok.

Файл `.env` уже исключён из Git. Его нельзя загружать вместе со статической сборкой или передавать заказчику.

## Отдельные скрипты

```bash
./scripts/frontend.sh   # только React/Vite
./scripts/infra-up.sh   # запустить PostgreSQL
./scripts/migrate.sh    # создать таблицы и начальные данные
./scripts/backend.sh    # запустить Express API
./scripts/infra-down.sh # остановить PostgreSQL
```

## Проверка production-сборки через ngrok

В двух терминалах:

```bash
./scripts/preview.sh
./scripts/ngrok.sh
```

Первый скрипт собирает автономную витрину и запускает её на `http://127.0.0.1:4173`. Второй публикует этот порт через HTTPS-адрес ngrok.

## Production на REG.RU Host-Lite

```bash
./scripts/build-reg-ru.sh
```

Готовый файл появится в `release/nova-energo-reg-ru.zip`. Загрузите его в корневой каталог сайта и распакуйте там. В архив не попадают исходники, `.env`, `server`, `node_modules` или Docker-конфиги.

Витрина использует подготовленные WebP-изображения из `public/images`.

## GitHub Pages

Workflow `.github/workflows/deploy-pages.yml` автоматически собирает статическую витрину с базовым путём `/site_like_epusk/` и публикует только папку `dist`.

В настройках репозитория выберите `Settings → Pages → Build and deployment → Source → GitHub Actions`. После push в `main` сайт будет доступен по адресу `https://albdvtinterview.github.io/site_like_epusk/`.
