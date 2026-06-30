import { ArrowRight } from 'lucide-react'
import { services } from '../data/content'
import { useUiStore } from '../store/useUiStore'
import { ImagePlaceholder } from './ImagePlaceholder'

export function ServicesSection() {
  const openModal = useUiStore((state) => state.openModal)

  return (
    <section id="services" className="py-14 md:py-20">
      <div className="container-shell">
        <div className="mb-7 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-ink md:text-[28px]">Услуги автоматизации</h2>
          <ArrowRight size={21} />
        </div>
        <div className="service-strip pb-3">
          {services.map((item) => (
            <article key={item.title} className="flex min-h-[410px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-3">
              <ImagePlaceholder label={item.slot} ratio="aspect-[4/3]" compact />
              <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
                <h3 className="text-base font-black leading-6 text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-5 text-slate-500">{item.text}</p>
                <button type="button" onClick={() => openModal({ type: 'detail', section: 'Услуга', item })} className="mt-auto w-fit rounded-md bg-orange px-4 py-2.5 text-sm font-black text-white">
                  Заказать услугу
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
