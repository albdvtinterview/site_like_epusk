import { ArrowRight, CheckCircle2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useUiStore } from '../store/useUiStore'
import { ImagePlaceholder } from './ImagePlaceholder'

export function Modal() {
  const modal = useUiStore((state) => state.modal)
  const closeModal = useUiStore((state) => state.closeModal)
  const openModal = useUiStore((state) => state.openModal)
  const [form, setForm] = useState({ name: '', contact: '', message: '' })

  useEffect(() => {
    if (!modal) return undefined
    const closeOnEscape = (event) => event.key === 'Escape' && closeModal()
    document.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = ''
    }
  }, [modal, closeModal])

  if (!modal) return null

  const item = modal.item
  const title = modal.title || item?.title
  const isDetail = modal.type === 'detail'

  const submit = (event) => {
    event.preventDefault()
    const subject = encodeURIComponent(`${title}: запрос с сайта`)
    const body = encodeURIComponent(`Имя: ${form.name}\nКонтакт: ${form.contact}\n\nКомментарий:\n${form.message}`)
    window.location.href = `mailto:zapros@epusk.ru?subject=${subject}&body=${body}`
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#071126]/75 p-3 backdrop-blur-sm" role="presentation" onMouseDown={closeModal}>
      <div
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[26px] bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-6 py-5 backdrop-blur">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-orange">{modal.section || 'Запрос'}</span>
          <button type="button" onClick={closeModal} className="grid h-10 w-10 place-items-center rounded-full bg-mist" aria-label="Закрыть">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 md:p-8">
          <h2 id="modal-title" className="text-3xl font-black tracking-tight text-ink">{title}</h2>
          {isDetail ? (
            <>
              <p className="mt-4 text-base leading-7 text-slate-600">{item.description || item.text}</p>
              <div className="mt-6 overflow-hidden rounded-2xl">
                <ImagePlaceholder label={item.slot} ratio="aspect-[16/8]" />
              </div>
              {item.tags && (
                <div className="mt-5 flex flex-wrap gap-2">{item.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}</div>
              )}
              {item.stats && (
                <div className="mt-5 flex flex-wrap gap-2">{item.stats.map((stat) => <span key={stat} className="tag">{stat}</span>)}</div>
              )}
              <button type="button" onClick={() => openModal({ type: 'request', title })} className="button-primary mt-7">
                Запросить консультацию <ArrowRight size={18} />
              </button>
            </>
          ) : (
            <form onSubmit={submit} className="mt-7">
              <p className="mb-6 flex items-start gap-2 rounded-2xl bg-mist p-4 text-sm leading-6 text-slate-600">
                <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-orange" />
                Заполните три поля — форма откроет готовое письмо в вашем почтовом приложении. Сервер и API не используются.
              </p>
              <label className="field-label">Ваше имя<input className="field" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
              <label className="field-label mt-5">Телефон или e-mail<input className="field" required value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} /></label>
              <label className="field-label mt-5">Комментарий<textarea className="field min-h-28 resize-y" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></label>
              <button type="submit" className="button-primary mt-6 w-full justify-center">Подготовить письмо <ArrowRight size={18} /></button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
