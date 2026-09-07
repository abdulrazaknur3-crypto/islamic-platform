import { ExternalLink, Headphones, MapPin, ShieldCheck, Star, Zap } from 'lucide-react'
import { BrandMark } from '@/components/brand-mark'
import { TIKTOK_URL, WHATSAPP_NUMBER } from '@/lib/data'

const benefits = [
  [MapPin, 'المملكة العربية السعودية', 'جميع المناطق'],
  [Headphones, 'دعم عبر واتساب', 'تواصل مباشر'],
  [ShieldCheck, 'مصداقية وأمان', 'بياناتك محفوظة'],
  [Zap, 'سرعة وإنجاز', 'متابعة منظمة'],
  [Star, 'خبرة عملية', 'في إجراءات المعاملات'],
] as const

export function Footer() {
  return (
    <footer className="bg-[#071f31] text-white">
      <div className="container-shell grid gap-8 border-b border-white/10 py-9 lg:grid-cols-[1fr_1.15fr_1fr]">
        <div className="rounded-[16px] bg-white/[.035] p-5">
          <div className="text-2xl font-black">تابعنا على تيك توك</div>
          <a href={TIKTOK_URL} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-2 text-lg font-extrabold text-white">@mror_angazk <ExternalLink className="h-4 w-4" /></a>
          <p className="mt-2 text-sm font-medium text-white/60">محتوى معرفي ونصائح وخدمات يومية</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-5">
          {benefits.map(([Icon, title, desc]) => (
            <div key={title} className="text-center">
              <Icon className="mx-auto h-6 w-6 text-white/85" />
              <div className="mt-3 text-sm font-extrabold">{title}</div>
              <div className="mt-1 text-xs text-white/50">{desc}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start gap-5 lg:items-end">
          <BrandMark inverse />
          <p className="max-w-md text-xs leading-6 text-white/60 lg:text-left">إنجازك مكتب خدمات مستقل لمتابعة وتنظيم المعاملات. لا يمثل أي جهة حكومية، وتخضع الموافقات والنتائج النهائية للجهات المختصة.</p>
        </div>
      </div>
      <div className="container-shell flex flex-col items-center justify-between gap-3 py-5 text-[12px] text-white/50 md:flex-row">
        <div className="flex gap-5"><span>سياسة الخصوصية</span><span>الشروط والأحكام</span></div>
        <div>© 2026 إنجازك لخدمات وتعقيب المعاملات — جميع الحقوق محفوظة.</div>
        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="font-bold text-white/70">0590097275</a>
      </div>
    </footer>
  )
}
