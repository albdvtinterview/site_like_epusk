import { ArrowRight } from 'lucide-react'
import { useUiStore } from '../store/useUiStore'
import { ImagePlaceholder } from './ImagePlaceholder'

export function Hero() {
  const openModal = useUiStore((state) => state.openModal)

  return (
    <section id="top" className="bg-white py-6 md:py-8">
      <div className="container-shell">
        <div className="relative grid min-h-[270px] overflow-hidden rounded-2xl bg-[#162b52] text-white md:grid-cols-[1.2fr_.8fr]">
          <div className="relative z-10 flex flex-col justify-center px-7 py-10 md:px-12 lg:px-16">
            <span className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-orange">Промышленная автоматизация</span>
            <h1 className="max-w-3xl text-3xl font-black leading-[1.08] tracking-[-0.025em] md:text-4xl lg:text-[44px]">
              Решение и оборудование АСУ ТП
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-6 text-white/80 md:text-xl md:leading-8">
              Автоматизация и мониторинг процессов в различных областях
            </p>
            <button type="button" onClick={() => openModal({ type: 'request', title: 'Быстрый запрос' })} className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-black text-orange">
              Обсудить задачу <ArrowRight size={17} />
            </button>
          </div>
          <div className="relative min-h-56 p-3 md:min-h-full md:p-0">
            <div className="absolute -left-10 top-0 hidden h-full w-28 -skew-x-12 bg-orange md:block" />
            <ImagePlaceholder label="Баннер промышленной автоматизации, 1600×600" ratio="h-full min-h-56 rounded-xl md:rounded-none" compact />
          </div>
        </div>
      </div>
    </section>
  )
}
