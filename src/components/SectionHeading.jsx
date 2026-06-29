import { ArrowUpRight } from 'lucide-react'

export function SectionHeading({ eyebrow, title, text, action, onAction }) {
  return (
    <div className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="section-title">{title}</h2>
        {text && <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">{text}</p>}
      </div>
      {action && (
        <button type="button" onClick={onAction} className="text-link shrink-0">
          {action}
          <ArrowUpRight size={18} />
        </button>
      )}
    </div>
  )
}
