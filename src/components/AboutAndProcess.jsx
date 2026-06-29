import { CheckCircle2 } from 'lucide-react'
import { steps } from '../data/content'
import { ImagePlaceholder } from './ImagePlaceholder'
import { SectionHeading } from './SectionHeading'

export function AboutAndProcess() {
  return (
    <>
      <section id="about" className="section-space overflow-hidden bg-navy text-white">
        <div className="container-shell grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow !text-orange">О компании</p>
            <h2 className="section-title !text-white">Инженеры, которые говорят на языке производства</h2>
            <p className="mt-6 text-lg leading-8 text-white/65">
              ЭНЕРГОПУСК объединяет поставку оборудования и инженерную компетенцию. Мы проверяем совместимость компонентов, учитываем режим работы и отвечаем за целостность решения.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {['Технический подбор', 'Проверенные производители', 'Проектная документация', 'Поддержка после запуска'].map((item) => (
                <span key={item} className="flex items-center gap-3 text-sm font-bold text-white/85">
                  <CheckCircle2 size={18} className="text-orange" /> {item}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-3">
            <ImagePlaceholder label="Фото команды или инженерного отдела, 1200×900" ratio="aspect-[4/3]" />
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-shell">
          <SectionHeading eyebrow="Как работаем" title="Понятный путь от задачи до запуска" />
          <div className="grid gap-px overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-4">
            {steps.map(([number, title, text]) => (
              <div key={number} className="bg-white p-6 md:p-8">
                <span className="text-sm font-black text-orange">{number}</span>
                <h3 className="mt-12 text-xl font-black text-ink">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
