import { CheckCircle2, ClipboardCheck, Cog, MessageCircleMore, Send } from 'lucide-react'
import { processSteps } from '@/lib/data'

const icons = [Send, ClipboardCheck, MessageCircleMore, Cog, CheckCircle2]

export function ProcessSection() {
  return (
    <section className="border-y border-slate-100 bg-[#fbfcfd] py-16">
      <div className="container-shell">
        <div className="text-center">
          <span className="text-sm font-bold text-[#b1842e]">خطوات واضحة</span>
          <h2 className="mt-2 text-3xl font-bold text-[#0b2a4a]">كيف نخدمك؟</h2>
          <p className="mt-2 text-sm text-slate-500">مسار بسيط وواضح من أول تواصل حتى إغلاق الطلب.</p>
        </div>
        <div className="relative mt-11 grid gap-7 md:grid-cols-5">
          <div className="absolute left-[8%] right-[8%] top-7 hidden h-px bg-gradient-to-l from-transparent via-[#d9c17f] to-transparent md:block" />
          {processSteps.map(([title, description], index) => {
            const Icon = icons[index]
            return (
              <div key={title} className="relative text-center">
                <div className="relative z-10 mx-auto grid h-14 w-14 place-items-center rounded-full border border-[#d8e2e8] bg-white text-[#0b2a4a] shadow-sm">
                  <Icon className="h-5 w-5" />
                  <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-[#c89535] text-[10px] font-bold text-white">{index + 1}</span>
                </div>
                <h3 className="mt-4 text-sm font-bold text-[#0b2a4a]">{title}</h3>
                <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
