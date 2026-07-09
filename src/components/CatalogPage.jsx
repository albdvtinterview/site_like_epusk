import { ArrowLeft, ChevronLeft, ChevronRight, Search, SlidersHorizontal } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { catalog as fallbackCatalog } from '../data/content'
import { catalogApi } from '../lib/api'
import { useUiStore } from '../store/useUiStore'

const number = new Intl.NumberFormat('ru-RU')
const money = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})
const catalogApiEnabled = import.meta.env.VITE_CATALOG_API_ENABLED === 'true'
const pageSize = 24
const availabilityOptions = ['В наличии', 'Мало', 'Уточнить']

export function CatalogPage({ categorySlug = '' }) {
  const openModal = useUiStore((state) => state.openModal)
  const search = useUiStore((state) => state.catalogSearch)
  const setSearch = useUiStore((state) => state.setCatalogSearch)
  const [categories, setCategories] = useState(fallbackCatalog)
  const [products, setProducts] = useState([])
  const [meta, setMeta] = useState({ total: 0, page: 1, pageSize })
  const [availability, setAvailability] = useState('')
  const [priceMode, setPriceMode] = useState('all')
  const [sort, setSort] = useState('price-asc')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!catalogApiEnabled) return undefined

    let active = true
    catalogApi.categories()
      .then((rows) => {
        if (!active || !Array.isArray(rows) || !rows.length) return
        setCategories(rows.map((row) => {
          const fallback = fallbackCatalog.find((item) => item.slug === row.slug) || {}
          return {
            ...fallback,
            ...row,
            title: row.name,
            short: row.description,
          }
        }))
      })
      .catch(() => setCategories(fallbackCatalog))

    return () => { active = false }
  }, [])

  useEffect(() => {
    setMeta((current) => ({ ...current, page: 1 }))
  }, [availability, categorySlug, priceMode, search, sort])

  useEffect(() => {
    if (!catalogApiEnabled) {
      setError('Каталог товаров доступен при включенном локальном API.')
      return undefined
    }

    let active = true
    setLoading(true)
    setError('')
    catalogApi.products({
      category: categorySlug,
      search: search.trim(),
      availability,
      priceMode,
      sort,
      page: meta.page,
      pageSize,
    })
      .then((data) => {
        if (!active) return
        setProducts(Array.isArray(data?.items) ? data.items : [])
        setMeta({
          total: Number(data?.total || 0),
          page: Number(data?.page || 1),
          pageSize: Number(data?.pageSize || pageSize),
        })
      })
      .catch((requestError) => {
        if (!active) return
        setProducts([])
        setError(requestError.message)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => { active = false }
  }, [availability, categorySlug, meta.page, priceMode, search, sort])

  const selectedCategory = useMemo(
    () => categories.find((category) => category.slug === categorySlug),
    [categories, categorySlug],
  )
  const totalPages = Math.max(1, Math.ceil(meta.total / meta.pageSize))
  const title = selectedCategory?.title || 'Каталог товаров'

  return (
    <main className="bg-[#f4f7fb] pb-16">
      <section className="border-b border-slate-200 bg-white py-6">
        <div className="container-shell">
          <a href="#top" className="inline-flex items-center gap-2 text-sm font-black text-slate-500 transition hover:text-orange">
            <ArrowLeft size={17} /> На главную
          </a>
          <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-orange">Каталог НоваЭнерго</p>
              <h1 className="mt-2 text-3xl font-black leading-tight text-ink md:text-4xl">{title}</h1>
              <p className="mt-2 text-sm text-slate-500">
                {loading ? 'Загружаем товары из PostgreSQL' : `${number.format(meta.total)} позиций найдено`}
              </p>
            </div>
            <label className="relative block w-full lg:max-w-md">
              <span className="sr-only">Поиск по товарам</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="h-12 w-full rounded-lg border border-slate-300 bg-white pl-4 pr-12 text-sm outline-none transition focus:border-navy"
                placeholder="Поиск по названию, артикулу или описанию"
              />
              <Search size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" />
            </label>
          </div>
        </div>
      </section>

      <section className="container-shell grid gap-5 py-6 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-4">
          <div className="mb-4 flex items-center gap-2 text-sm font-black text-ink">
            <SlidersHorizontal size={18} className="text-orange" /> Фильтры
          </div>

          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-slate-400">Категория</p>
            <div className="grid gap-1">
              <a href="#/catalog" className={`rounded-lg px-3 py-2.5 text-sm font-bold transition ${!categorySlug ? 'bg-navy text-white' : 'text-ink hover:bg-mist'}`}>
                Все товары
              </a>
              {categories.map((category) => (
                <a
                  key={category.slug}
                  href={`#/catalog/${category.slug}`}
                  className={`rounded-lg px-3 py-2.5 text-sm font-bold transition ${category.slug === categorySlug ? 'bg-navy text-white' : 'text-ink hover:bg-mist'}`}
                >
                  <span>{category.title}</span>
                  <span className="ml-1 text-xs opacity-60">{number.format(category.productCount || 0)}</span>
                </a>
              ))}
            </div>
          </div>

          <label className="field-label mt-5">
            Наличие
            <select className="field" value={availability} onChange={(event) => setAvailability(event.target.value)}>
              <option value="">Любое</option>
              {availabilityOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </label>

          <label className="field-label mt-4">
            Цена
            <select className="field" value={priceMode} onChange={(event) => setPriceMode(event.target.value)}>
              <option value="all">Все</option>
              <option value="priced">С ценой</option>
              <option value="request">Цена по запросу</option>
            </select>
          </label>

          <label className="field-label mt-4">
            Сортировка
            <select className="field" value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="price-asc">Сначала дешевле</option>
              <option value="price-desc">Сначала дороже</option>
              <option value="name">По названию</option>
            </select>
          </label>
        </aside>

        <div className="min-w-0">
          {error && (
            <div className="rounded-xl bg-red-50 p-5 text-sm font-semibold text-red-700">
              Товары не загрузились: {error}
            </div>
          )}

          {!error && (
            <>
              <div className="mb-4 flex flex-col justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center">
                <span className="text-sm font-bold text-slate-500">
                  {loading ? 'Обновляем список' : `${number.format(meta.total)} товаров`}
                </span>
                <Pagination
                  page={meta.page}
                  totalPages={totalPages}
                  loading={loading}
                  onPrev={() => setMeta((current) => ({ ...current, page: Math.max(1, current.page - 1) }))}
                  onNext={() => setMeta((current) => ({ ...current, page: Math.min(totalPages, current.page + 1) }))}
                />
              </div>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOpen={() => openModal({ type: 'product', section: 'Товар', item: product })}
                    onRequest={() => openModal({ type: 'request', title: product.name })}
                  />
                ))}
              </div>

              {!loading && !products.length && (
                <div className="rounded-xl bg-white p-8 text-center text-sm text-slate-500">По выбранным фильтрам товаров не найдено.</div>
              )}

              {meta.total > meta.pageSize && (
                <div className="mt-5 flex justify-end">
                  <Pagination
                    page={meta.page}
                    totalPages={totalPages}
                    loading={loading}
                    onPrev={() => setMeta((current) => ({ ...current, page: Math.max(1, current.page - 1) }))}
                    onNext={() => setMeta((current) => ({ ...current, page: Math.min(totalPages, current.page + 1) }))}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  )
}

function ProductCard({ product, onOpen, onRequest }) {
  const numericPrice = Number(product.price)
  const price = product.price === null || product.price === undefined || !Number.isFinite(numericPrice) || numericPrice <= 0
    ? 'Цена по запросу'
    : money.format(numericPrice)

  return (
    <article className="flex min-h-[220px] flex-col rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-bold text-slate-400">{product.categoryName} · {product.sku}</p>
          <h2 className="mt-2 line-clamp-3 text-[15px] font-black leading-5 text-ink">{product.name}</h2>
        </div>
        {product.availability && <span className="shrink-0 rounded-full bg-mist px-3 py-1 text-[11px] font-black text-slate-600">{product.availability}</span>}
      </div>
      <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-500">{product.shortDescription || 'Описание уточняется'}</p>
      <div className="mt-auto grid gap-3 pt-5 sm:grid-cols-[auto_1fr] sm:items-center">
        <p className="text-lg font-black text-ink">{price}</p>
        <div className="grid min-w-0 grid-cols-2 gap-2">
          <button type="button" className="min-w-0 rounded-lg border border-slate-200 px-3 py-2 text-sm font-black text-ink transition hover:border-orange hover:text-orange" onClick={onOpen}>
            Подробнее
          </button>
          <button type="button" className="min-w-0 rounded-lg border border-orange px-3 py-2 text-sm font-black text-orange transition hover:bg-orange hover:text-white" onClick={onRequest}>
            Запросить
          </button>
        </div>
      </div>
    </article>
  )
}

function Pagination({ page, totalPages, loading, onPrev, onNext }) {
  return (
    <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
      <button
        type="button"
        className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white disabled:opacity-40"
        onClick={onPrev}
        disabled={loading || page <= 1}
        aria-label="Предыдущая страница"
      >
        <ChevronLeft size={18} />
      </button>
      <span className="min-w-20 text-center">{page} / {totalPages}</span>
      <button
        type="button"
        className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white disabled:opacity-40"
        onClick={onNext}
        disabled={loading || page >= totalPages}
        aria-label="Следующая страница"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}
