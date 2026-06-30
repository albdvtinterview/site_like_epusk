import { advantages } from '../data/content'

export function Advantages() {
  return (
    <section id="advantages" className="py-4 md:py-8">
      <div className="container-shell grid grid-cols-2 gap-3 lg:grid-cols-5">
        {advantages.map((item, index) => {
          const Icon = item.icon
          return (
            <div key={item.value} className={`rounded-xl bg-[#f7f7fb] p-5 md:p-7 ${index === 3 ? 'col-span-2 lg:col-span-2' : ''}`}>
              <Icon size={25} className="mb-10 text-ink" />
              <strong className="block text-lg font-black text-ink md:text-xl">{item.value}</strong>
              <span className="mt-2 block text-sm leading-5 text-slate-500">{item.label}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
