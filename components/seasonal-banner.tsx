import { MessageCircle, Sparkles } from 'lucide-react'
import { SaudiSkyline } from '@/components/saudi-skyline'
import { WHATSAPP_NUMBER } from '@/lib/data'

export function SeasonalBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-l from-[#063f32] via-[#07553f] to-[#092f36] text-white">
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,#d7b45f_0_1px,transparent_1px)] [background-size:22px_22px]" />
      <SaudiSkyline className="pointer-events-none absolute bottom-0 left-[10%] h-[115%] w-[55%] opacity-45" />
      <div className="container-shell relative flex min-h-[118px] items-center justify-between gap-6 py-5">
        <div className="flex items-center gap-5">
          <div className="hidden h-20 w-px bg-white/15 sm:block" />
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#f2d680]"><Sparkles className="h-4 w-4" /> موسم اليوم الوطني السعودي</div>
            <div className="mt-1 flex items-end gap-3">
              <span className="text-5xl font-bold leading-none text-[#f0d27b]">96</span>
              <div className="pb-1"><div className="text-lg font-bold">كل معاملة نخدمها.. هي خدمة لوطن أعظم</div><div className="mt-1 text-xs text-white/70">معًا لمستقبل أكثر إنجازًا</div></div>
            </div>
          </div>
        </div>
        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold backdrop-blur transition hover:bg-white/15 md:flex">
          <MessageCircle className="h-4 w-4" /> 0590097275
        </a>
      </div>
    </section>
  )
}
