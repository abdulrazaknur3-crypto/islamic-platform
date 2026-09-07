import { MessageCircle } from 'lucide-react'
import { SaudiSkyline } from '@/components/saudi-skyline'
import { WHATSAPP_NUMBER } from '@/lib/data'

export function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-l from-[#064d3b] via-[#07583f] to-[#0b2a4a] text-white">
      <SaudiSkyline className="absolute bottom-0 left-0 h-full w-[52%] opacity-25" />
      <div className="container-shell relative flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
        <div><div className="text-3xl font-bold">جاهز ننجز معاملتك؟</div><div className="mt-2 text-sm text-white/70">ابدأ برسالة بسيطة على واتساب، وسنوضح لك الإجراء والخطوات.</div></div>
        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="pulse-ring inline-flex items-center gap-3 rounded-xl bg-[#09955b] px-6 py-3.5 text-sm font-bold text-white shadow-lg"><MessageCircle className="h-5 w-5" /> 0590097275</a>
      </div>
    </section>
  )
}
