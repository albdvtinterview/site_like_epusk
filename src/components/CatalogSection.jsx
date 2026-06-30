import { ArrowRight } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { catalog as fallbackCatalog } from '../data/content'
import { catalogApi } from '../lib/api'
import { useUiStore } from '../store/useUiStore'
import { ImagePlaceholder } from './ImagePlaceholder'

const number = new Intl.NumberFormat('ru-RU')

export function CatalogSection() {
  const [categories, setCategories] = useState(fallbackCatalog)
  const [source, setSource] = useState('local')
  const openModal = useUiStore((state) => state.openModal)
  const search = useUiStore((state) => state.catalogSearch).trim().toLocaleLowerCase('ru')

  useEffect(() => {
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
        setSource('database')
      })
      .catch(() => setSource('local'))
    return () => { active = false }
  }, [])

  const visibleCategories = useMemo(() => categories.filter((item) => (
    !search || `${item.title} ${item.short}`.toLocaleLowerCase('ru').includes(search)
  )), [categories, search])

  return (
    <section id="catalog" className="pb-12 pt-5 md:pb-16 md:pt-8">
      <div className="container-shell">
        <div className="mb-7 flex items-end justify-between gap-5">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink md:text-[28px]">Популярные категории</h2>
            <span className="sr-only">Источник каталога: {source === 'database' ? 'PostgreSQL' : 'локальные данные'}</span>
          </div>
          <a href="/admin" className="hidden items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-orange md:inline-flex">Управление каталогом <ArrowRight size={16} /></a>
        </div>

        {visibleCategories.length ? (
          <div className="category-strip pb-3">
            {visibleCategories.map((item) => (
              <article key={item.slug} className="min-h-[315px] overflow-hidden rounded-xl bg-[#f7f7fb]">
                <button
                  type="button"
                  className="group flex h-full w-full flex-col p-5 text-left"
                  onClick={() => openModal({ type: 'detail', section: 'Каталог', item })}
                  aria-label={`Подробнее: ${item.title}`}
                >
                  <h3 className="min-h-12 text-[15px] font-black leading-5 text-ink">{item.title}</h3>
                  <p className="mt-1 text-xs text-slate-500">{number.format(item.productCount || 0)} товаров</p>
                  <div className="mt-auto w-full pt-5 transition duration-300 group-hover:-translate-y-1">
                    <ImagePlaceholder label={item.slot} ratio="aspect-[4/3]" compact />
                  </div>
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl bg-[#f7f7fb] p-8 text-center text-sm text-slate-500">По вашему запросу категорий не найдено.</div>
        )}
      </div>
    </section>
  )
}
