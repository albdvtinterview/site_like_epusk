import { ArrowDown, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useUiStore } from '../store/useUiStore'
import { ImagePlaceholder } from './ImagePlaceholder'

export function Hero() {
  const openModal = useUiStore((state) => state.openModal)

  return (
    <section id="top" className="relative overflow-hidden bg-navy text-white">
      <div className="absolute -left-32 top-12 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-orange/15 blur-3xl" />
      <div className="container-shell relative grid min-h-[640px] items-stretch lg:grid-cols-[1.05fr_.95fr]">
        <div className="flex flex-col justify-center py-16 pr-0 lg:py-24 lg:pr-14">
          <p className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-orange">
            <span className="h-2 w-2 rounded-full bg-orange" />
            Инженерный подход с 2006 года
          </p>
          <h1 className="max-w-3xl text-4xl font-black leading-[1.04] tracking-[-0.04em] sm:text-5xl lg:text-[64px]">
            Привод и автоматика для вашего производства
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/70">
            Подбираем оборудование, проектируем системы управления и доводим решение до стабильного запуска на объекте.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => openModal({ type: 'request', title: 'Подобрать оборудование' })}
              className="button-primary justify-center"
            >
              Подобрать оборудование <ArrowRight size={19} />
            </button>
            <a href="#catalog" className="button-secondary-dark justify-center">
              Смотреть каталог <ArrowDown size={18} />
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium text-white/70">
            {['Подбор инженером', 'Официальная гарантия', 'Доставка по России'].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <CheckCircle2 size={17} className="text-orange" /> {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative min-h-[360px] pb-10 lg:min-h-0 lg:py-12">
          <div className="h-full overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-3 shadow-2xl shadow-black/20">
            <ImagePlaceholder label="Главный баннер — инженер и промышленное оборудование, 1600×1000" ratio="h-full min-h-[330px] lg:min-h-0" />
          </div>
          <div className="absolute bottom-5 left-4 rounded-2xl bg-white p-4 text-ink shadow-card lg:bottom-8 lg:-left-8">
            <p className="text-2xl font-black text-navy">17+</p>
            <p className="mt-1 text-xs font-semibold text-slate-500">проверенных брендов</p>
          </div>
        </div>
      </div>
    </section>
  )
}
