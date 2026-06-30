CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(120) NOT NULL UNIQUE,
  name VARCHAR(180) NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  image_label VARCHAR(220) NOT NULL DEFAULT '',
  base_product_count INTEGER NOT NULL DEFAULT 0 CHECK (base_product_count >= 0),
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  name VARCHAR(220) NOT NULL,
  sku VARCHAR(120) NOT NULL UNIQUE,
  short_description TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS products_category_id_idx ON products(category_id);
CREATE INDEX IF NOT EXISTS products_is_active_idx ON products(is_active);

INSERT INTO categories (slug, name, description, image_label, base_product_count, sort_order)
VALUES
  ('chastotnye-preobrazovateli', 'Частотные преобразователи', 'Точное управление скоростью и моментом электродвигателя.', 'Фото частотного преобразователя', 11127, 10),
  ('ustroystva-plavnogo-puska', 'Устройства плавного пуска', 'Мягкий пуск оборудования без перегрузок и гидроударов.', 'Фото устройства плавного пуска', 1877, 20),
  ('elektrodvigateli', 'Электродвигатели', 'Надёжные двигатели для общепромышленных задач.', 'Фото электродвигателя', 6396, 30),
  ('promyshlennaya-avtomatika', 'Промышленная автоматика', 'Контроллеры, датчики и компоненты управления.', 'Фото промышленной автоматики', 2878, 40),
  ('motor-reduktory', 'Мотор-редукторы', 'Готовые приводные решения с нужным моментом.', 'Фото мотор-редуктора', 3297, 50),
  ('elektropitanie', 'Электропитание', 'Стабильное питание для ответственного оборудования.', 'Фото оборудования электропитания', 859, 60),
  ('tali', 'Тали', 'Подъёмное оборудование для цехов и складов.', 'Фото промышленной тали', 82, 70)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  image_label = EXCLUDED.image_label,
  sort_order = EXCLUDED.sort_order,
  updated_at = NOW();

INSERT INTO products (category_id, name, sku, short_description)
SELECT id, 'Преобразователь частоты общепромышленный', 'VFD-DEMO-001', 'Демонстрационная позиция каталога'
FROM categories WHERE slug = 'chastotnye-preobrazovateli'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO products (category_id, name, sku, short_description)
SELECT id, 'Устройство плавного пуска', 'SS-DEMO-001', 'Демонстрационная позиция каталога'
FROM categories WHERE slug = 'ustroystva-plavnogo-puska'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO products (category_id, name, sku, short_description)
SELECT id, 'Асинхронный электродвигатель', 'MOTOR-DEMO-001', 'Демонстрационная позиция каталога'
FROM categories WHERE slug = 'elektrodvigateli'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO products (category_id, name, sku, short_description)
SELECT id, 'Панель оператора', 'HMI-DEMO-001', 'Демонстрационная позиция каталога'
FROM categories WHERE slug = 'promyshlennaya-avtomatika'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO products (category_id, name, sku, short_description)
SELECT id, 'Цилиндрический мотор-редуктор', 'GEAR-DEMO-001', 'Демонстрационная позиция каталога'
FROM categories WHERE slug = 'motor-reduktory'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO products (category_id, name, sku, short_description)
SELECT id, 'Промышленный источник питания', 'POWER-DEMO-001', 'Демонстрационная позиция каталога'
FROM categories WHERE slug = 'elektropitanie'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO products (category_id, name, sku, short_description)
SELECT id, 'Электрическая канатная таль', 'HOIST-DEMO-001', 'Демонстрационная позиция каталога'
FROM categories WHERE slug = 'tali'
ON CONFLICT (sku) DO NOTHING;
