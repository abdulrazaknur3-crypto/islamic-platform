import { Check, FileCheck2, MessageCircleMore } from 'lucide-react'

function MiniRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-[#0b2a4a] shadow-sm">
      <span className="font-semibold">{children}</span>
      <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-50 text-emerald-700"><Check className="h-3.5 w-3.5" /></span>
    </div>
  )
}

export function HeroPortalIllustration() {
  return (
    <div className="relative mx-auto min-h-[430px] w-full max-w-[560px]" aria-hidden="true">
      <div className="absolute left-1/2 top-4 h-72 w-72 -translate-x-1/2 rounded-full bg-[#e7cf91]/25 blur-3xl" />

      <div className="absolute right-3 top-8 z-20 w-[132px] rounded-[22px] bg-gradient-to-b from-[#0a5d40] to-[#073c2e] p-4 text-white shadow-2xl rotate-[-2deg]">
        <div className="text-xs font-semibold text-[#f4d980]">خدمة وطن</div>
        <div className="mt-1 text-xl font-bold leading-tight">لأجل الوطن</div>
        <div className="mt-7 h-px bg-white/20" />
        <div className="mt-7 text-[11px] leading-5 text-white/80">متابعة أوضح<br />وتجربة أسهل</div>
        <div className="mt-12 text-3xl font-bold text-[#e7c464]">96</div>
      </div>

      <div className="absolute left-4 top-16 z-10 w-[410px] rounded-[26px] border-[7px] border-[#18354a] bg-[#10283a] p-2 shadow-[0_30px_70px_rgba(11,42,74,.24)] sm:left-7">
        <div className="rounded-[17px] bg-[#f7fafb] p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] text-slate-400">منصة إنجازك</div>
              <div className="mt-1 text-lg font-bold text-[#0b2a4a]">معاملاتك بكل سهولة</div>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#0a7d50] text-white"><FileCheck2 className="h-5 w-5" /></div>
          </div>
          <div className="mt-5 grid gap-2.5">
            <MiniRow>تقديم الطلب</MiniRow>
            <MiniRow>متابعة الإجراءات</MiniRow>
            <MiniRow>استلام النتيجة</MiniRow>
          </div>
          <div className="mt-5 rounded-xl bg-[#eef5f2] px-3 py-3 text-[11px] text-[#315e50]">كل تحديث على معاملتك يظهر لك بوضوح.</div>
        </div>
      </div>

      <div className="float-soft absolute bottom-0 left-[44%] z-30 w-[150px] rounded-[28px] border-[7px] border-[#152b39] bg-white p-3 shadow-[0_24px_55px_rgba(11,42,74,.28)]">
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-[#132b3b]/30" />
        <div className="mb-3 text-center text-sm font-bold text-[#0b2a4a]">إنجازك</div>
        <div className="space-y-2">
          {['أسرع', 'أسهل', 'أكثر أمانًا'].map((text) => (
            <div key={text} className="flex items-center gap-2 rounded-lg bg-emerald-50 p-2 text-[10px] font-semibold text-emerald-800">
              <Check className="h-3 w-3" /> {text}
            </div>
          ))}
        </div>
        <div className="mt-4 grid place-items-center rounded-xl bg-[#0a7d50] py-3 text-white"><MessageCircleMore className="h-4 w-4" /></div>
      </div>

      <div className="absolute bottom-3 right-1 z-0 w-[250px] rotate-[3deg] rounded-2xl border border-slate-200 bg-white p-4 shadow-lg">
        <div className="mb-3 flex items-center justify-between"><span className="h-2 w-20 rounded bg-slate-200" /><span className="h-7 w-7 rounded-full bg-emerald-100" /></div>
        <div className="space-y-2"><span className="block h-2 w-full rounded bg-slate-100" /><span className="block h-2 w-4/5 rounded bg-slate-100" /><span className="block h-2 w-2/3 rounded bg-slate-100" /></div>
        <div className="mt-5 inline-flex rotate-[-8deg] rounded-md border-2 border-emerald-700 px-3 py-1 text-sm font-extrabold text-emerald-700">تم الإنجاز</div>
      </div>
    </div>
  )
}
