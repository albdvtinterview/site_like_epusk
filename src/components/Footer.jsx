import { Mail, MapPin, Phone } from 'lucide-react'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer id="footer" className="bg-[#0c1931] py-12 text-white">
      <div className="container-shell grid gap-10 border-b border-white/10 pb-10 md:grid-cols-2 lg:grid-cols-[1.4fr_.8fr_.8fr_1.1fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/50">
            Промышленное оборудование, электропривод и автоматизация технологических процессов.
          </p>
        </div>
        <div>
          <h3 className="footer-title">Разделы</h3>
          <div className="footer-links">
            <a href="#catalog">Каталог</a><a href="#services">Услуги</a><a href="#projects">Проекты</a>
          </div>
        </div>
        <div>
          <h3 className="footer-title">Компания</h3>
          <div className="footer-links">
            <a href="#footer">О компании</a><a href="mailto:zapros@epusk.ru">Контакты</a><a href="/admin">Управление каталогом</a>
          </div>
        </div>
        <div>
          <h3 className="footer-title">Контакты</h3>
          <div className="footer-links">
            <a href="tel:+74957752455"><Phone size={15} /> +7 (495) 775-24-55</a>
            <a href="mailto:zapros@epusk.ru"><Mail size={15} /> zapros@epusk.ru</a>
            <span><MapPin size={15} /> Москва</span>
          </div>
        </div>
      </div>
      <div className="container-shell flex flex-col gap-3 pt-7 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
        <span>© 2006–2026 ЭНЕРГОПУСК</span>
        <span>Информация на сайте не является публичной офертой</span>
      </div>
    </footer>
  )
}
