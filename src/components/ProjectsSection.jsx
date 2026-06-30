import { ArrowRight } from 'lucide-react'
import { projects } from '../data/content'
import { useUiStore } from '../store/useUiStore'
import { ImagePlaceholder } from './ImagePlaceholder'

export function ProjectsSection() {
  const openModal = useUiStore((state) => state.openModal)

  return (
    <section id="projects" className="pb-16 pt-6 md:pb-20 md:pt-10">
      <div className="container-shell">
        <div className="mb-7 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-ink md:text-[28px]">Проекты</h2>
          <ArrowRight size={21} />
        </div>
        <div className="project-strip pb-3">
          {projects.map((item) => (
            <article key={item.title} className="group min-w-0 cursor-pointer" onClick={() => openModal({ type: 'detail', section: 'Проект', item })}>
              <ImagePlaceholder label={item.slot} ratio="aspect-[4/3] rounded-xl" compact />
              <p className="mt-4 text-xs text-slate-400">Проекты</p>
              <h3 className="mt-1 text-lg font-bold leading-6 text-ink transition group-hover:text-orange">{item.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
