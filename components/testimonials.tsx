import Image from 'next/image'
import { Quote, Star } from 'lucide-react'
import { testimonials } from '@/lib/data'

const avatars = ['/reference/avatar-1.svg', '/reference/avatar-2.svg', '/reference/avatar-3.svg']

export function Testimonials() {
  return (
    <section className="bg-[#fbfcfd] py-14">
      <div className="container-shell">
        <div className="text-center">
          <span className="section-kicker">الثقة تُبنى بالتجربة</span>
          <h2 className="section-title mt-2">آراء عملائنا</h2>
          <p className="mt-2 text-base font-medium text-slate-500">ثقة عملائنا هي سر استمرارنا</p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <article key={item.id} className="rounded-[12px] border border-slate-200 bg-white p-7 reference-card">
              <Quote className="h-10 w-10 text-[#d9dee4]" />
              <p className="mt-4 min-h-[86px] text-base font-semibold leading-8 text-[#27465f]">{item.quote}</p>
              <div className="mt-6 flex items-end justify-between border-t border-slate-100 pt-5">
                <div className="flex items-center gap-3">
                  <Image src={avatars[index]} alt="" width={58} height={58} className="rounded-full border border-slate-100" />
                  <div><div className="text-lg font-extrabold text-[#0b2a4a]">{item.name}</div><div className="mt-1 text-sm font-medium text-slate-400">{item.role}</div></div>
                </div>
                <div className="flex gap-0.5 text-[#d4a94f]" aria-label="5 من 5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
