import { ArrowRight } from 'lucide-react'
import { catalog } from '../data/content'
import { useUiStore } from '../store/useUiStore'
import { ImagePlaceholder } from './ImagePlaceholder'
import { SectionHeading } from './SectionHeading'

export function CatalogSection() {
  const openModal = useUiStore((state) => state.openModal)

  return (
    <section id="catalog" className="section-space bg-white">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Каталог"
          title="Оборудование для промышленного привода"
          text="Собрали ключевые направления без перегруженного интернет-магазина. Откройте карточку — внутри назначение и параметры для подбора."
          action="Получить подбор"
          onAction={() => openModal({ type: 'request', title: 'Получить подбор оборудования' })}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {catalog.map((item, index) => {
            const Icon = item.icon
            return (
              <article key={item.title} className={`catalog-card ${index === 0 ? 'lg:col-span-2' : ''}`}>
                <button
                  type="button"
                  className="group flex h-full w-full flex-col text-left"
                  onClick={() => openModal({ type: 'detail', section: 'Каталог', item })}
                  aria-label={`Подробнее: ${item.title}`}
                >
                  <div className="mb-5 flex items-start justify-between gap-5">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-white">
                      <Icon size={22} />
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 transition group-hover:border-orange group-hover:bg-orange group-hover:text-white">
                      <ArrowRight size={17} />
                    </span>
                  </div>
                  <h3 className="max-w-md text-xl font-black tracking-tight text-ink">{item.title}</h3>
                  <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">{item.short}</p>
                  <div className="mt-5 w-full overflow-hidden rounded-2xl">
                    <ImagePlaceholder label={item.slot} ratio={index === 0 ? 'aspect-[16/7]' : 'aspect-[16/8]'} compact />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                </button>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
