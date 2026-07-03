import { assetUrl } from '../lib/assetUrl'

export function Logo({ light = false }) {
  if (!light) {
    return (
      <a href="#top" className="group shrink-0" aria-label="Нова Энерго — на главную">
        <img
          src={assetUrl('images/brand/nova-energo-logo.png')}
          alt="Нова Энерго"
          width="2172"
          height="724"
          className="h-auto w-[170px] object-contain transition-transform group-hover:scale-[1.02] sm:w-[200px]"
        />
      </a>
    )
  }

  return (
    <a href="#top" className="group flex items-center gap-3" aria-label="Нова Энерго — на главную">
      <img
        src={assetUrl('images/brand/nova-energo-mark.png')}
        alt=""
        width="1254"
        height="1254"
        className="h-14 w-14 shrink-0 rounded-xl bg-white object-contain transition-transform group-hover:-rotate-3"
      />
      <span className="leading-none">
        <b className="block text-lg font-black tracking-tight text-white">
          НОВА ЭНЕРГО
        </b>
        <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.2em] text-white/55">
          промышленное оборудование
        </span>
      </span>
    </a>
  )
}
