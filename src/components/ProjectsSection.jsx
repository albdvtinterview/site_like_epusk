import { ArrowRight } from 'lucide-react'
import { projects } from '../data/content'
import { useUiStore } from '../store/useUiStore'
import { ImagePlaceholder } from './ImagePlaceholder'
import { SectionHeading } from './SectionHeading'

export function ProjectsSection() {
  const openModal = useUiStore((state) => state.openModal)

  return (
    <section id="projects" className="section-space bg-white">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Практика"
          title="Проекты, которые работают"
          text="Показываем не просто оборудование, а результат его применения в технологическом процессе."
          action="Обсудить свой проект"
          onAction={() => openModal({ type: 'request', title: 'Обсудить проект' })}
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {projects.map((item) => (
            <article key={item.title} className="project-card group">
              <div className="overflow-hidden rounded-2xl">
                <ImagePlaceholder label={item.slot} ratio="aspect-[16/10]" compact />
              </div>
              <div className="flex flex-1 flex-col pt-6">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-orange">{item.type}</span>
                <h3 className="mt-3 text-2xl font-black tracking-tight text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">{item.text}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.stats.map((stat) => <span key={stat} className="tag">{stat}</span>)}
                </div>
                <button
                  type="button"
                  onClick={() => openModal({ type: 'detail', section: 'Проект', item })}
                  className="mt-7 flex items-center justify-between border-t border-slate-200 pt-5 text-sm font-black text-navy"
                >
                  Смотреть кейс
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-mist transition group-hover:bg-orange group-hover:text-white"><ArrowRight size={17} /></span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
