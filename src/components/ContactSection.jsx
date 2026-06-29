import { ArrowRight, Clock3, Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'

export function ContactSection() {
  const [form, setForm] = useState({ name: '', contact: '', task: '' })
  const [sent, setSent] = useState(false)

  const change = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))

  const submit = (event) => {
    event.preventDefault()
    const subject = encodeURIComponent(`Запрос с сайта от ${form.name}`)
    const body = encodeURIComponent(`Имя: ${form.name}\nКонтакт: ${form.contact}\n\nЗадача:\n${form.task}`)
    setSent(true)
    window.location.href = `mailto:zapros@epusk.ru?subject=${subject}&body=${body}`
  }

  return (
    <section id="contacts" className="section-space bg-mist">
      <div className="container-shell grid overflow-hidden rounded-[32px] bg-navy text-white lg:grid-cols-[.9fr_1.1fr]">
        <div className="p-7 md:p-12 lg:p-14">
          <p className="eyebrow !text-orange">Связаться с нами</p>
          <h2 className="text-3xl font-black leading-tight tracking-[-0.03em] md:text-5xl">Обсудим вашу задачу?</h2>
          <p className="mt-5 max-w-md leading-7 text-white/65">
            Пришлите краткое описание — инженер уточнит параметры и предложит следующий шаг.
          </p>
          <div className="mt-10 space-y-5">
            <a className="contact-link" href="tel:+74957752455"><Phone size={19} /> +7 (495) 775-24-55</a>
            <a className="contact-link" href="mailto:zapros@epusk.ru"><Mail size={19} /> zapros@epusk.ru</a>
            <p className="contact-link"><Clock3 size={19} /> Пн–Пт, 09:00–18:00</p>
            <p className="contact-link items-start"><MapPin size={19} className="mt-1 shrink-0" /> Москва, Киевское шоссе, 22-й км</p>
          </div>
        </div>
        <form onSubmit={submit} className="m-3 rounded-[26px] bg-white p-6 text-ink md:m-5 md:p-9 lg:p-11">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="field-label">
              Ваше имя
              <input className="field" name="name" value={form.name} onChange={change} placeholder="Александр" required />
            </label>
            <label className="field-label">
              Телефон или e-mail
              <input className="field" name="contact" value={form.contact} onChange={change} placeholder="+7 999 000-00-00" required />
            </label>
          </div>
          <label className="field-label mt-5">
            Кратко о задаче
            <textarea className="field min-h-32 resize-y" name="task" value={form.task} onChange={change} placeholder="Какое оборудование нужно подобрать?" required />
          </label>
          <p className="mt-4 text-xs leading-5 text-slate-400">
            Форма не отправляет данные на сервер: после нажатия откроется ваше почтовое приложение с готовым письмом.
          </p>
          <button type="submit" className="button-primary mt-6 w-full justify-center sm:w-auto">
            Подготовить письмо <ArrowRight size={18} />
          </button>
          {sent && <p className="mt-4 text-sm font-semibold text-emerald-600">Письмо подготовлено в вашем почтовом приложении.</p>}
        </form>
      </div>
    </section>
  )
}
