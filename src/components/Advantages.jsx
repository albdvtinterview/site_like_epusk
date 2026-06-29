import { advantages } from '../data/content'

export function Advantages() {
  return (
    <section className="border-y border-slate-200 bg-mist py-10 md:py-14">
      <div className="container-shell grid grid-cols-2 gap-4 lg:grid-cols-4">
        {advantages.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.value} className="rounded-2xl border border-white bg-white/80 p-5 md:p-7">
              <Icon size={24} className="mb-6 text-orange" />
              <strong className="block text-xl font-black text-navy md:text-2xl">{item.value}</strong>
              <span className="mt-2 block text-sm leading-5 text-slate-500">{item.label}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
