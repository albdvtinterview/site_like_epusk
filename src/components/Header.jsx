import {
  Activity,
  BatteryCharging,
  Cog,
  Construction,
  Grid3X3,
  Mail,
  Menu,
  PanelsTopLeft,
  Phone,
  Search,
  Settings2,
  X,
} from 'lucide-react'
import { useUiStore } from '../store/useUiStore'
import { Logo } from './Logo'

const topNav = [
  ['Услуги', '#services'],
  ['Проекты', '#projects'],
  ['Доставка и оплата', '#advantages'],
  ['Компания', '#footer'],
]

const categoryNav = [
  ['Частотники', Activity],
  ['Устройства плавного пуска', Settings2],
  ['Электродвигатели', Cog],
  ['Промышленная автоматика', PanelsTopLeft],
  ['Мотор-редукторы', Grid3X3],
  ['Электропитание', BatteryCharging],
  ['Тали', Construction],
]

export function Header() {
  const mobileMenuOpen = useUiStore((state) => state.mobileMenuOpen)
  const setMobileMenuOpen = useUiStore((state) => state.setMobileMenuOpen)
  const openModal = useUiStore((state) => state.openModal)
  const catalogSearch = useUiStore((state) => state.catalogSearch)
  const setCatalogSearch = useUiStore((state) => state.setCatalogSearch)

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="hidden border-b border-slate-100 lg:block">
        <div className="container-shell flex h-10 items-center justify-between text-xs font-semibold text-slate-600">
          <nav className="flex items-center gap-6" aria-label="Дополнительная навигация">
            <span className="inline-flex items-center gap-1.5 font-bold text-ink">Санкт-Петербург</span>
            {topNav.map(([label, href]) => <a key={label} className="transition hover:text-orange" href={href}>{label}</a>)}
          </nav>
          <div className="flex items-center gap-5">
            <a href="tel:+79117471010" className="font-black text-ink">+7 911 747-10-10</a>
            <a href="mailto:zapros@epusk.ru" className="font-bold text-ink">zapros@epusk.ru</a>
          </div>
        </div>
      </div>

      <div className="container-shell flex h-[82px] items-center gap-4 lg:gap-5">
        <Logo />
        <a href="#catalog" className="ml-auto hidden h-12 items-center gap-3 rounded-lg bg-navy px-5 text-sm font-black text-white lg:inline-flex">
          <Grid3X3 size={18} /> Каталог
        </a>
        <label className="relative hidden min-w-0 flex-1 lg:block">
          <span className="sr-only">Поиск по каталогу</span>
          <input
            value={catalogSearch}
            onChange={(event) => setCatalogSearch(event.target.value)}
            onFocus={() => document.querySelector('#catalog')?.scrollIntoView({ behavior: 'smooth' })}
            className="h-12 w-full rounded-lg border border-slate-300 bg-white pl-4 pr-12 text-sm outline-none transition focus:border-slate-500"
            placeholder="Поиск по каталогу"
          />
          <Search size={21} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink" />
        </label>
        <div className="hidden shrink-0 items-center gap-5 xl:flex">
          <a href="tel:+79117471010" className="flex items-center gap-2 text-sm font-black text-ink"><Phone size={18} /> Позвонить</a>
          <button type="button" onClick={() => openModal({ type: 'request', title: 'Быстрый запрос' })} className="rounded-lg border border-orange px-5 py-3 text-sm font-black text-orange transition hover:bg-orange hover:text-white">Быстрый запрос</button>
        </div>
        <button
          type="button"
          className="ml-auto grid h-11 w-11 place-items-center rounded-lg border border-slate-200 lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <nav className="container-shell hidden h-14 items-center gap-7 overflow-hidden border-t border-slate-100 lg:flex" aria-label="Категории каталога">
        {categoryNav.map(([label, Icon]) => (
          <a href="#catalog" key={label} className="flex shrink-0 items-center gap-2 whitespace-nowrap text-sm font-semibold text-ink transition hover:text-orange">
            <Icon size={19} className="text-navy" /> {label}
          </a>
        ))}
      </nav>

      {mobileMenuOpen && (
        <div className="absolute left-0 right-0 top-full border-t border-slate-100 bg-white px-5 pb-6 shadow-xl lg:hidden">
          <label className="relative my-4 block">
            <span className="sr-only">Поиск по каталогу</span>
            <input value={catalogSearch} onChange={(event) => setCatalogSearch(event.target.value)} className="h-12 w-full rounded-lg border border-slate-300 pl-4 pr-11 text-sm" placeholder="Поиск по каталогу" />
            <Search size={19} className="absolute right-4 top-1/2 -translate-y-1/2" />
          </label>
          <nav className="grid gap-0" aria-label="Мобильная навигация">
            {[['Каталог', '#catalog'], ...topNav].map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMobileMenuOpen(false)} className="border-b border-slate-100 py-3.5 text-sm font-bold text-ink">{label}</a>
            ))}
          </nav>
          <div className="mt-5 flex items-center justify-between gap-3">
            <a href="tel:+79117471010" className="inline-flex items-center gap-2 text-sm font-black"><Phone size={17} />+7 911 747-10-10</a>
            <a href="mailto:zapros@epusk.ru" aria-label="Написать на почту"><Mail size={19} /></a>
          </div>
        </div>
      )}
    </header>
  )
}
