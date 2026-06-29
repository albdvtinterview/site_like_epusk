import { Zap } from 'lucide-react'

export function Logo({ light = false }) {
  return (
    <a href="#top" className="group flex items-center gap-3" aria-label="ЭНЕРГОПУСК — на главную">
      <span
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-transform group-hover:-rotate-3 ${
          light ? 'bg-white/10' : 'bg-navy'
        }`}
      >
        <Zap className="fill-orange text-orange" size={24} />
      </span>
      <span className="leading-none">
        <b className={`block text-lg font-black tracking-tight ${light ? 'text-white' : 'text-navy'}`}>
          ЭНЕРГОПУСК
        </b>
        <span className={`mt-1 block text-[9px] font-bold uppercase tracking-[0.2em] ${light ? 'text-white/55' : 'text-ink/45'}`}>
          промышленное оборудование
        </span>
      </span>
    </a>
  )
}
