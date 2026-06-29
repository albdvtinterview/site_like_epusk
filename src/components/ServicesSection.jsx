import { ArrowUpRight, Check } from 'lucide-react'
import { services } from '../data/content'
import { useUiStore } from '../store/useUiStore'
import { ImagePlaceholder } from './ImagePlaceholder'
import { SectionHeading } from './SectionHeading'

export function ServicesSection() {
  const openModal = useUiStore((state) => state.openModal)

  return (
    <section id="services" className="section-space bg-mist">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Инжиниринг"
          title="Услуги автоматизации"
          text="Подключаемся на любом этапе — от технического задания и обследования до сборки, программирования и запуска."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {services.map((item) => {
            const Icon = item.icon
            return (
              <article key={item.title} className="service-card group">
                <div className="overflow-hidden rounded-2xl">
                  <ImagePlaceholder label={item.slot} ratio="aspect-[16/8]" compact />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <div className="flex items-start justify-between gap-5">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-orange/10 text-orange"><Icon size={23} /></span>
                    <ArrowUpRight className="text-slate-300 transition group-hover:text-orange" />
                  </div>
                  <h3 className="mt-6 text-2xl font-black tracking-tight text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">{item.text}</p>
                  <p className="mt-5 flex items-center gap-2 text-sm font-bold text-navy"><Check size={17} className="text-orange" />{item.result}</p>
                  <button
                    type="button"
                    onClick={() => openModal({ type: 'detail', section: 'Услуга', item })}
                    className="mt-7 self-start text-link"
                  >
                    Обсудить задачу <ArrowUpRight size={17} />
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
