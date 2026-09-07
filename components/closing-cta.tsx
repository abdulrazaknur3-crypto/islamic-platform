import Image from 'next/image'
import { MessageCircle } from 'lucide-react'
import { WHATSAPP_NUMBER } from '@/lib/data'

export function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-l from-[#064d3b] via-[#07583f] to-[#0b2a4a] text-white">
      <Image src="/reference/cta-visual.svg" alt="" fill sizes="100vw" className="object-cover opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-l from-[#064d3b]/85 via-[#064d3b]/60 to-[#0b2a4a]/70" />
      <div className="container-shell relative flex flex-col items-start justify-between gap-6 py-9 md:flex-row md:items-center">
        <div className="max-w-2xl"><div className="text-4xl font-black tracking-[-.04em]">جاهز ننجز معاملتك؟</div><div className="mt-3 text-base font-semibold text-white/85">تواصل معنا الآن عبر واتساب وابدأ رحلتك نحو إنجاز أسرع وأسهل</div></div>
        <div className="flex flex-wrap gap-3">
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="pulse-ring inline-flex items-center gap-3 rounded-[10px] bg-[#09955b] px-8 py-4 text-base font-extrabold text-white shadow-lg"><MessageCircle className="h-6 w-6" /> اطلب الخدمة الآن</a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-[10px] border border-white/40 bg-white/10 px-8 py-4 text-base font-extrabold text-white backdrop-blur"><MessageCircle className="h-6 w-6" /> 0590097275</a>
        </div>
      </div>
    </section>
  )
}
