import { ExternalLink, MessageCircle, ShieldCheck } from 'lucide-react'
import { BrandMark } from '@/components/brand-mark'
import { TIKTOK_URL, WHATSAPP_NUMBER } from '@/lib/data'

export function Footer() {
  return (
    <footer className="bg-[#071f31] text-white">
      <div className="container-shell grid gap-8 py-10 md:grid-cols-[1.15fr_.85fr_.85fr]">
        <div>
          <BrandMark inverse />
          <p className="mt-5 max-w-md text-xs leading-6 text-white/60">إنجازك مكتب خدمات مستقل لمتابعة وتنظيم المعاملات. لا يمثل أي جهة حكومية، وتخضع الموافقات والنتائج النهائية للجهات المختصة.</p>
        </div>
        <div>
          <div className="text-sm font-bold">تواصل معنا</div>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="mt-4 flex items-center gap-2 text-sm text-white/70 hover:text-white"><MessageCircle className="h-4 w-4" /> 0590097275</a>
          <a href={TIKTOK_URL} target="_blank" rel="noreferrer" className="mt-3 flex items-center gap-2 text-sm text-white/70 hover:text-white">TikTok @mror_angazk <ExternalLink className="h-3.5 w-3.5" /></a>
        </div>
        <div>
          <div className="text-sm font-bold">الثقة والخصوصية</div>
          <div className="mt-4 flex items-start gap-2 text-xs leading-6 text-white/60"><ShieldCheck className="mt-1 h-4 w-4 shrink-0" /> نطلب الحد الأدنى اللازم من البيانات لخدمة المعاملة، مع ضوابط وصول للموظفين.</div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-[11px] text-white/40">© 2026 إنجازك لخدمات وتعقيب المعاملات — جميع الحقوق محفوظة.</div>
    </footer>
  )
}
