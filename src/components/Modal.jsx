import { ArrowRight, CheckCircle2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useUiStore } from '../store/useUiStore'
import { ContentImage } from './ContentImage'

const money = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

export function Modal() {
  const modal = useUiStore((state) => state.modal)
  const closeModal = useUiStore((state) => state.closeModal)
  const openModal = useUiStore((state) => state.openModal)
  const [form, setForm] = useState({ name: '', contact: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

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

  useEffect(() => {
    setSubmitted(false)
  }, [modal])

  if (!modal) return null

  const item = modal.item
  const title = modal.title || item?.title || item?.name
  const isDetail = modal.type === 'detail'
  const isProduct = modal.type === 'product'
  const numericPrice = Number(item?.price)
  const productPrice = item?.price === null || item?.price === undefined || !Number.isFinite(numericPrice) || numericPrice <= 0
    ? 'Цена по запросу'
    : money.format(numericPrice)

  const submit = (event) => {
    event.preventDefault()
    setSubmitted(true)
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
          {isProduct ? (
            <>
              <div className="mt-5 grid gap-3 rounded-2xl bg-mist p-4 text-sm sm:grid-cols-2">
                <ProductInfo label="Категория" value={item.categoryName} />
                <ProductInfo label="Артикул" value={item.sku} />
                <ProductInfo label="Наличие" value={item.availability || 'Уточнить'} />
                <ProductInfo label="Цена" value={productPrice} />
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-black uppercase tracking-[0.14em] text-slate-400">Описание</h3>
                <p className="mt-3 whitespace-pre-wrap text-base leading-7 text-slate-600">
                  {item.shortDescription || 'Подробное описание уточняется.'}
                </p>
              </div>
              <button type="button" onClick={() => openModal({ type: 'request', title })} className="button-primary mt-7">
                Запросить товар <ArrowRight size={18} />
              </button>
            </>
          ) : isDetail ? (
            <>
              <p className="mt-4 text-base leading-7 text-slate-600">{item.description || item.text}</p>
              <div className="mt-6 overflow-hidden rounded-2xl">
                <ContentImage src={item.image} label={item.slot} ratio="aspect-[16/8]" />
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
                Форма заявки будет подключена позже. Сейчас можно связаться по телефону +7 911 747-10-10.
              </p>
              {submitted && <div className="mb-5 rounded-xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">Форма пока не отправляет заявки. Позвоните нам, и мы обработаем запрос вручную.</div>}
              <label className="field-label">Ваше имя<input className="field" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
              <label className="field-label mt-5">Телефон<input className="field" required value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} /></label>
              <label className="field-label mt-5">Комментарий<textarea className="field min-h-28 resize-y" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></label>
              <button type="submit" className="button-primary mt-6 w-full justify-center">Проверить заявку <ArrowRight size={18} /></button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

function ProductInfo({ label, value }) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">{label}</p>
      <p className="mt-1 break-words font-bold text-ink">{value || 'Уточнить'}</p>
    </div>
  )
}
