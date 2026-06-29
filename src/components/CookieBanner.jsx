import { X } from 'lucide-react'
import { useUiStore } from '../store/useUiStore'

export function CookieBanner() {
  const cookieAccepted = useUiStore((state) => state.cookieAccepted)
  const acceptCookies = useUiStore((state) => state.acceptCookies)

  if (cookieAccepted) return null

  return (
    <aside className="fixed bottom-4 left-4 right-4 z-40 mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:flex-row sm:items-center">
      <p className="text-sm leading-6 text-slate-600">
        Мы используем cookie только для сохранения настроек интерфейса. Сторонней аналитики в этой витрине нет.
      </p>
      <button type="button" onClick={acceptCookies} className="button-primary shrink-0 justify-center !px-5 !py-3">
        Понятно <X size={16} />
      </button>
    </aside>
  )
}
