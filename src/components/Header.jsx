import { ArrowRight, Mail, MapPin, Menu, Phone, X } from 'lucide-react'
import { useUiStore } from '../store/useUiStore'
import { Logo } from './Logo'

const nav = [
  ['Каталог', '#catalog'],
  ['Услуги', '#services'],
  ['Проекты', '#projects'],
  ['О компании', '#about'],
  ['Контакты', '#contacts'],
]

export function Header() {
  const mobileMenuOpen = useUiStore((state) => state.mobileMenuOpen)
  const setMobileMenuOpen = useUiStore((state) => state.setMobileMenuOpen)
  const openModal = useUiStore((state) => state.openModal)

  const closeMenu = () => setMobileMenuOpen(false)

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="hidden border-b border-slate-100 lg:block">
        <div className="container-shell flex h-10 items-center justify-between text-xs font-medium text-slate-500">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2"><MapPin size={14} /> Москва</span>
            <span>Поставка промышленного оборудования по России</span>
          </div>
          <div className="flex items-center gap-5">
            <a className="hover:text-orange" href="mailto:zapros@epusk.ru"><Mail size={14} /> zapros@epusk.ru</a>
            <span>Пн–Пт, 09:00–18:00</span>
          </div>
        </div>
      </div>

      <div className="container-shell flex h-[76px] items-center justify-between gap-7">
        <Logo />

        <nav className="hidden items-center gap-7 xl:flex" aria-label="Основная навигация">
          {nav.map(([label, href]) => (
            <a key={href} href={href} className="nav-link">{label}</a>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-5 md:flex">
          <a href="tel:+74957752455" className="hidden items-center gap-2 font-bold text-ink lg:inline-flex">
            <Phone size={17} className="text-orange" />
            +7 (495) 775-24-55
          </a>
          <button
            type="button"
            onClick={() => openModal({ type: 'request', title: 'Быстрый запрос' })}
            className="button-primary !px-5 !py-3"
          >
            Оставить запрос <ArrowRight size={17} />
          </button>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 text-ink md:hidden"
          aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-slate-100 bg-white px-5 pb-6 md:hidden">
          <nav className="flex flex-col py-3" aria-label="Мобильная навигация">
            {nav.map(([label, href]) => (
              <a key={href} href={href} onClick={closeMenu} className="border-b border-slate-100 py-4 text-base font-bold text-ink">
                {label}
              </a>
            ))}
          </nav>
          <a href="tel:+74957752455" className="mb-4 flex items-center gap-2 font-bold text-ink">
            <Phone size={18} className="text-orange" /> +7 (495) 775-24-55
          </a>
          <button
            type="button"
            onClick={() => openModal({ type: 'request', title: 'Быстрый запрос' })}
            className="button-primary w-full justify-center"
          >
            Оставить запрос <ArrowRight size={18} />
          </button>
        </div>
      )}
    </header>
  )
}
