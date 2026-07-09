import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { assetUrl } from '../lib/assetUrl'
import { useUiStore } from '../store/useUiStore'

const slides = [
  {
    eyebrow: 'Промышленная автоматизация',
    title: 'Решение и оборудование АСУ ТП',
    text: 'Автоматизация и мониторинг процессов в различных областях',
    requestTitle: 'Быстрый запрос',
    image: assetUrl('images/hero/industrial-automation.webp'),
    imageLabel: 'Промышленная автоматизация',
  },
  {
    eyebrow: 'Шкафы управления',
    title: 'Комплектация и сборка систем управления',
    text: 'Подбираем автоматику, силовую часть и компоненты под технологические задачи объекта.',
    requestTitle: 'Запрос по шкафам управления',
    image: assetUrl('images/hero/automation-cabinets.webp'),
    imageLabel: 'Шкафы управления и промышленная автоматика',
  },
  {
    eyebrow: 'Частотные преобразователи',
    title: 'Электропривод для насосов, вентиляции и линий',
    text: 'Поставляем частотники, устройства плавного пуска и комплектующие для надежного управления двигателями.',
    requestTitle: 'Запрос по электроприводу',
    image: assetUrl('images/hero/frequency-drives.webp'),
    imageLabel: 'Частотные преобразователи в шкафу управления',
  },
  {
    eyebrow: 'Электродвигатели и редукторы',
    title: 'Приводные решения для производства',
    text: 'Подбираем электродвигатели, мотор-редукторы и узлы привода под нагрузку и режим работы.',
    requestTitle: 'Запрос по приводам',
    image: assetUrl('images/hero/electric-drives.webp'),
    imageLabel: 'Электродвигатели и мотор-редукторы',
  },
]

export function Hero() {
  const openModal = useUiStore((state) => state.openModal)
  const [activeSlide, setActiveSlide] = useState(0)
  const [paused, setPaused] = useState(false)
  const slide = slides[activeSlide]

  useEffect(() => {
    if (paused) return undefined

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 6000)

    return () => window.clearInterval(interval)
  }, [paused])

  const showPrevious = () => {
    setActiveSlide((current) => (current - 1 + slides.length) % slides.length)
  }

  const showNext = () => {
    setActiveSlide((current) => (current + 1) % slides.length)
  }

  return (
    <section id="top" className="bg-white py-6 md:py-8">
      <div className="container-shell">
        <div
          className="relative grid min-h-[270px] overflow-hidden rounded-2xl bg-[#063b70] text-white md:grid-cols-[1.2fr_.8fr]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="relative z-10 flex flex-col justify-center px-7 py-10 md:px-12 lg:px-16">
            <span className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-orange">{slide.eyebrow}</span>
            <h1 className="max-w-3xl text-3xl font-black leading-[1.08] md:text-4xl lg:text-[44px]">
              {slide.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-6 text-white/80 md:text-xl md:leading-8">
              {slide.text}
            </p>
            <button type="button" onClick={() => openModal({ type: 'request', title: slide.requestTitle })} className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-black text-orange">
              Обсудить задачу <ArrowRight size={17} />
            </button>

            <div className="mt-7 flex items-center gap-2" aria-label="Слайды">
                {slides.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    className={`h-2.5 rounded-full transition-all ${index === activeSlide ? 'w-8 bg-orange' : 'w-2.5 bg-white/35 hover:bg-white/60'}`}
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Показать слайд: ${item.eyebrow}`}
                    aria-current={index === activeSlide ? 'true' : undefined}
                  />
                ))}
            </div>
          </div>
          <div className="relative min-h-56 p-3 md:min-h-full md:p-0">
            <div className="absolute -left-10 top-0 hidden h-full w-28 -skew-x-12 bg-orange md:block" />
            <div className="relative h-full min-h-56 overflow-hidden rounded-xl bg-[#0b2748] md:rounded-none">
              {slides.map((item, index) => (
                <img
                  key={item.image}
                  src={item.image}
                  alt={item.imageLabel}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                  decoding="async"
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${index === activeSlide ? 'opacity-100' : 'opacity-0'}`}
                />
              ))}
            </div>
          </div>
          <button
            type="button"
            className="absolute left-0 top-1/2 z-20 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 pl-5 text-ink shadow-lg transition hover:bg-white"
            onClick={showPrevious}
            aria-label="Предыдущий слайд"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            className="absolute right-0 top-1/2 z-20 grid h-12 w-12 translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 pr-5 text-ink shadow-lg transition hover:bg-white"
            onClick={showNext}
            aria-label="Следующий слайд"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  )
}
