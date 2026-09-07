import { Quote, Star } from 'lucide-react'
import { testimonials } from '@/lib/data'

export function Testimonials() {
  return (
    <section className="bg-[#fbfcfd] py-16">
      <div className="container-shell">
        <div className="text-center">
          <span className="text-sm font-bold text-[#b1842e]">الثقة تُبنى بالتجربة</span>
          <h2 className="mt-2 text-3xl font-bold text-[#0b2a4a]">آراء عملائنا</h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <Quote className="h-8 w-8 text-[#d9dee4]" />
              <p className="mt-4 min-h-[72px] text-sm leading-7 text-[#27465f]">{item.quote}</p>
              <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-4">
                <div><div className="text-sm font-bold text-[#0b2a4a]">{item.name}</div><div className="mt-1 text-xs text-slate-400">{item.role}</div></div>
                <div className="flex gap-0.5 text-[#d4a94f]" aria-label="5 من 5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
