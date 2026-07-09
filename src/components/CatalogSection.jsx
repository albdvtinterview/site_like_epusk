import { useEffect, useMemo, useState } from 'react'
import { catalog as fallbackCatalog } from '../data/content'
import { catalogApi } from '../lib/api'
import { useUiStore } from '../store/useUiStore'
import { ContentImage } from './ContentImage'

const number = new Intl.NumberFormat('ru-RU')
const money = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})
const catalogApiEnabled = import.meta.env.VITE_CATALOG_API_ENABLED === 'true'
const productsPageSize = 24

export function CatalogSection() {
  const [categories, setCategories] = useState(fallbackCatalog)
  const [selectedCategorySlug, setSelectedCategorySlug] = useState(fallbackCatalog[0]?.slug || '')
  const [products, setProducts] = useState([])
  const [productsMeta, setProductsMeta] = useState({ total: 0, page: 1, pageSize: productsPageSize })
  const [productsLoading, setProductsLoading] = useState(false)
  const [productsError, setProductsError] = useState('')
  const [source, setSource] = useState('local')
  const openModal = useUiStore((state) => state.openModal)
  const search = useUiStore((state) => state.catalogSearch).trim().toLocaleLowerCase('ru')

  useEffect(() => {
    if (!catalogApiEnabled) return undefined

    let active = true
    catalogApi.categories()
      .then((rows) => {
        if (!active || !Array.isArray(rows) || !rows.length) return
        const merged = rows.map((row) => {
          const fallback = fallbackCatalog.find((item) => item.slug === row.slug) || {}
          return {
            ...fallback,
            ...row,
            title: row.name,
            short: row.description,
            slot: row.imageLabel,
          }
        })
        setCategories(merged)
        setSelectedCategorySlug((current) => (
          merged.some((item) => item.slug === current) ? current : merged[0]?.slug || ''
        ))
        setSource('database')
      })
      .catch(() => setSource('local'))
    return () => { active = false }
  }, [])

  useEffect(() => {
    if (!catalogApiEnabled) return
    setProductsMeta((current) => ({ ...current, page: 1 }))
    if (!selectedCategorySlug) {
      setProducts([])
      setProductsError('')
    }
  }, [search, selectedCategorySlug])

  useEffect(() => {
    if (!catalogApiEnabled || !selectedCategorySlug) return undefined

    let active = true
    setProductsLoading(true)
    setProductsError('')
    catalogApi.products({
      category: selectedCategorySlug,
      search,
      page: productsMeta.page,
      pageSize: productsPageSize,
    })
      .then((data) => {
        if (!active) return
        setProducts(Array.isArray(data?.items) ? data.items : [])
        setProductsMeta({
          total: Number(data?.total || 0),
          page: Number(data?.page || 1),
          pageSize: Number(data?.pageSize || productsPageSize),
        })
      })
      .catch((error) => {
        if (!active) return
        setProducts([])
        setProductsError(error.message)
      })
      .finally(() => {
        if (active) setProductsLoading(false)
      })

    return () => { active = false }
  }, [productsMeta.page, search, selectedCategorySlug])

  const visibleCategories = useMemo(() => categories.filter((item) => (
    !search || `${item.title} ${item.short}`.toLocaleLowerCase('ru').includes(search)
  )), [categories, search])
  const selectedCategory = categories.find((item) => item.slug === selectedCategorySlug)
  const totalPages = Math.max(1, Math.ceil(productsMeta.total / productsMeta.pageSize))

  return (
    <section id="catalog" className="pb-12 pt-5 md:pb-16 md:pt-8">
      <div className="container-shell">
        <div className="mb-7">
          <h2 className="text-2xl font-bold tracking-tight text-ink md:text-[28px]">Популярные категории</h2>
          <span className="sr-only">Источник каталога: {source === 'database' ? 'PostgreSQL' : 'локальные данные'}</span>
        </div>

        {visibleCategories.length ? (
          <div className="category-strip pb-3">
            {visibleCategories.map((item) => (
              <article key={item.slug} className="min-h-[315px] overflow-hidden rounded-xl bg-[#f7f7fb]">
                <button
                  type="button"
                  className={`group flex h-full w-full flex-col p-5 text-left ring-inset transition ${catalogApiEnabled && selectedCategorySlug === item.slug ? 'ring-2 ring-orange' : 'ring-0'}`}
                  onClick={() => {
                    if (catalogApiEnabled) {
                      setSelectedCategorySlug((current) => (current === item.slug ? '' : item.slug))
                    } else {
                      openModal({ type: 'detail', section: 'Каталог', item })
                    }
                  }}
                  aria-label={`Подробнее: ${item.title}`}
                  aria-pressed={catalogApiEnabled ? selectedCategorySlug === item.slug : undefined}
                >
                  <h3 className="min-h-12 text-[15px] font-black leading-5 text-ink">{item.title}</h3>
                  <p className="mt-1 text-xs text-slate-500">{number.format(item.productCount || 0)} товаров</p>
                  <div className="mt-auto w-full pt-5 transition duration-300 group-hover:-translate-y-1">
                    <ContentImage src={item.image} label={item.slot} ratio="aspect-[4/3]" compact />
                  </div>
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl bg-[#f7f7fb] p-8 text-center text-sm text-slate-500">По вашему запросу категорий не найдено.</div>
        )}

        {catalogApiEnabled && selectedCategorySlug && (
          <div className="mt-8">
            <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <h3 className="text-xl font-black text-ink">{selectedCategory?.title || 'Товары каталога'}</h3>
                <p className="mt-1 text-sm text-slate-500">
                  {productsLoading ? 'Загружаем товары из локальной базы' : `${number.format(productsMeta.total)} позиций в базе`}
                </p>
              </div>
              {productsMeta.total > productsMeta.pageSize && (
                <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                  <button
                    type="button"
                    className="rounded-lg border border-slate-200 px-3 py-2 disabled:opacity-40"
                    onClick={() => setProductsMeta((current) => ({ ...current, page: Math.max(1, current.page - 1) }))}
                    disabled={productsLoading || productsMeta.page <= 1}
                  >
                    Назад
                  </button>
                  <span>{productsMeta.page} / {totalPages}</span>
                  <button
                    type="button"
                    className="rounded-lg border border-slate-200 px-3 py-2 disabled:opacity-40"
                    onClick={() => setProductsMeta((current) => ({ ...current, page: Math.min(totalPages, current.page + 1) }))}
                    disabled={productsLoading || productsMeta.page >= totalPages}
                  >
                    Далее
                  </button>
                </div>
              )}
            </div>

            {productsError && (
              <div className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">
                Товары не загрузились из локального API: {productsError}
              </div>
            )}

            {!productsError && (
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} onRequest={() => openModal({ type: 'request', title: product.name })} />
                ))}
              </div>
            )}

            {!productsLoading && !productsError && !products.length && (
              <div className="rounded-xl bg-[#f7f7fb] p-8 text-center text-sm text-slate-500">По вашему запросу товаров не найдено.</div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

function ProductCard({ product, onRequest }) {
  const numericPrice = Number(product.price)
  const price = product.price === null || product.price === undefined || !Number.isFinite(numericPrice) || numericPrice <= 0
    ? 'Цена по запросу'
    : money.format(numericPrice)

  return (
    <article className="flex min-h-[220px] flex-col rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-bold text-slate-400">{product.categoryName} · {product.sku}</p>
          <h4 className="mt-2 line-clamp-3 text-[15px] font-black leading-5 text-ink">{product.name}</h4>
        </div>
        {product.availability && <span className="shrink-0 rounded-full bg-mist px-3 py-1 text-[11px] font-black text-slate-600">{product.availability}</span>}
      </div>
      <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-500">{product.shortDescription || 'Описание уточняется'}</p>
      <div className="mt-auto flex items-center justify-between gap-4 pt-5">
        <p className="text-lg font-black text-ink">{price}</p>
        <button type="button" className="rounded-lg border border-orange px-4 py-2 text-sm font-black text-orange transition hover:bg-orange hover:text-white" onClick={onRequest}>
          Запросить
        </button>
      </div>
    </article>
  )
}
