'use client'

import { useMemo, useState } from 'react'
import {
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  CarFront,
  CheckCircle2,
  ClipboardCheck,
  Cog,
  ExternalLink,
  Fingerprint,
  LayoutGrid,
  List,
  MapPin,
  MessageCircle,
  MessageCircleMore,
  Quote,
  Scale,
  Search,
  Send,
  ShieldCheck,
  Star,
  Users,
  Zap,
  Check,
  FileCheck2,
} from 'lucide-react'
import { BrandMark } from '@/components/brand-mark'
import { SaudiSkyline } from '@/components/saudi-skyline'
import { NewsTicker } from '@/components/news-ticker'
import { RequestModal } from '@/components/request-modal'
import { WhatsAppFab } from '@/components/whatsapp-fab'
import { processSteps, services, testimonials, TIKTOK_URL, WHATSAPP_NUMBER } from '@/lib/data'
import type { NewsItem } from '@/lib/types'

const iconMap = {
  CarFront,
  BookOpenCheck,
  Fingerprint,
  BriefcaseBusiness,
  Building2,
  Scale,
  ShieldCheck,
  LayoutGrid,
} as const

const trust = [
  [Users, 'فريق متخصص', 'من ذوي الخبرة'],
  [ShieldCheck, 'خصوصية وأمان', 'بياناتك في أيدٍ أمينة'],
  [Zap, 'متابعة سريعة ومستمرة', 'حتى صدور النتيجة'],
  [MapPin, 'خدمة في جميع مناطق المملكة', 'حضوريًا وعن بُعد'],
] as const

const processIcons = [Send, ClipboardCheck, MessageCircleMore, Cog, CheckCircle2]

export function ReferenceHome({ news }: { news: NewsItem[] }) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState('')
  const [open, setOpen] = useState(false)

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return services
    return services.filter((service) =>
      [service.name, service.shortDescription, ...service.keywords].join(' ').toLowerCase().includes(needle),
    )
  }, [query])

  function request(serviceId = '') {
    setSelected(serviceId)
    setOpen(true)
  }

  return (
    <main>
      <section className="seasonal-banner" aria-label="موسم اليوم الوطني السعودي 96">
        <div className="seasonal-banner__flag" aria-hidden="true" />
        <SaudiSkyline className="seasonal-banner__skyline" />
        <div className="container-shell seasonal-banner__inner">
          <div className="seasonal-banner__brand"><BrandMark inverse /></div>
          <div className="seasonal-banner__message">
            <div className="seasonal-banner__script">معًا.. في كل خطوة</div>
            <div className="seasonal-banner__copy">كل معاملة نخدمها.. هي خدمة لوطن أعظم</div>
          </div>
          <div className="seasonal-banner__year"><strong>96</strong><span>عامًا من المجد والإنجاز<br />ووطنًا مصدر فخرنا</span></div>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="seasonal-banner__phone"><MessageCircle />0590097275</a>
        </div>
      </section>

      <NewsTicker items={news} />

      <section className="reference-hero">
        <div className="container-shell reference-hero__grid">
          <div className="reference-hero__content">
            <div className="reference-hero__brand"><BrandMark /></div>
            <h1 className="reference-hero__title">معاملتك علينا..<span>ووقتك لك</span></h1>
            <p className="reference-hero__lead">مكتب متخصص في متابعة وإنجاز جميع المعاملات لدى الدوائر الحكومية للأفراد وقطاع الأعمال بخبرة وموثوقية عالية.</p>
            <div className="reference-hero__actions">
              <button onClick={() => request()} className="btn-reference btn-reference--green"><MessageCircle className="h-5 w-5" /> اطلب الخدمة عبر واتساب</button>
              <a href="#services" className="btn-reference btn-reference--outline">استعرض الخدمات <List className="h-5 w-5" /></a>
            </div>
            <div className="reference-trust">
              {trust.map(([Icon, title, desc]) => (
                <div key={title} className="reference-trust__item">
                  <Icon className="reference-trust__icon" />
                  <div><div className="reference-trust__title">{title}</div><div className="reference-trust__desc">{desc}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="reference-hero__visual" aria-hidden="true">
            <div className="hero-art">
              <div className="hero-art__poster"><span>خدمة وطن</span><strong>لأجل الوطن</strong><div>96</div></div>
              <div className="hero-art__papers"><i /><i /><i /><b>إنجازك</b><em>تم الإنجاز</em></div>
              <div className="hero-art__laptop">
                <div className="hero-art__screen">
                  <div className="hero-art__screen-head"><small>منصة إنجازك</small><strong>معاملاتك بكل سهولة</strong></div>
                  {['تقديم الطلب','متابعة الإجراءات','استلام النتيجة'].map((text) => <div className="hero-art__row" key={text}><span>{text}</span><Check /></div>)}
                </div>
              </div>
              <div className="hero-art__phone">
                <div className="hero-art__speaker" />
                <strong>إنجازك</strong>
                {['أسرع','أسهل','أكثر أمانًا','معك دائمًا'].map((text) => <div className="hero-art__phone-row" key={text}><Check />{text}</div>)}
                <div className="hero-art__phone-chat"><MessageCircle /></div>
              </div>
              <div className="hero-art__stamp"><FileCheck2 /> تم الإنجاز</div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="reference-section reference-services">
        <div className="container-shell">
          <div className="reference-heading"><span className="reference-heading__line" /><h2>الخدمات الأكثر طلبًا</h2><span className="reference-heading__line" /></div>
          <p className="reference-subtitle">اختر الخدمة التي تحتاجها ودع الباقي علينا</p>
          <div className="reference-services__grid">
            {filtered.slice(0, 8).map((service) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap]
              return (
                <button key={service.id} onClick={() => request(service.id)} className="reference-service-card">
                  <span className="reference-service-card__icon"><Icon /></span>
                  <span className="reference-service-card__name">{service.name}</span>
                </button>
              )
            })}
          </div>
          <label className="reference-search">
            <Search className="h-5 w-5" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ابحث عن معاملتك أو الخدمة المطلوبة ..." aria-label="ابحث عن معاملة" />
            <span className="reference-search__example">مثال: نقل كفالة، إصدار إقامة، تجديد رخصة القيادة، فتح سجل تجاري ...</span>
          </label>
          {!filtered.length && <div className="mt-5 rounded-xl border border-[#ead8ad] bg-[#fff8e8] p-4 text-center text-sm text-[#6e541e]">لم نعثر على اسم الخدمة. أرسل تفاصيل معاملتك عبر واتساب وسنحدد لك الإجراء المناسب.</div>}
        </div>
      </section>

      <section className="reference-section reference-process">
        <div className="container-shell">
          <div className="reference-heading"><span className="reference-heading__line" /><h2>كيف نخدمك؟</h2><span className="reference-heading__line" /></div>
          <p className="reference-subtitle">خطوات بسيطة .. لنتائج مضمونة</p>
          <div className="reference-process__steps">
            {processSteps.map(([title, description], index) => {
              const Icon = processIcons[index]
              return (
                <div key={title} className="reference-process__step">
                  <div className="reference-process__circle"><Icon /><span>{index + 1}</span></div>
                  <h3>{title}</h3><p>{description}</p>
                  {index < processSteps.length - 1 && <b className="reference-process__arrow">‹</b>}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="updates" className="reference-section reference-updates">
        <div className="container-shell">
          <div className="reference-updates__top">
            <span className="reference-source-button">عرض جميع الأخبار</span>
            <div className="reference-heading reference-heading--compact"><span className="reference-heading__line" /><h2>آخر تحديثات الجهات الحكومية</h2><span className="reference-heading__line" /></div>
            <span className="reference-source-button">شاهد المصادر الرسمية</span>
          </div>
          <div className="reference-news-grid">
            {news.slice(0, 4).map((item, index) => (
              <a key={item.id} href={item.sourceUrl} target="_blank" rel="noreferrer" className="reference-news-card">
                <div className={`reference-news-card__visual reference-news-card__visual--${index + 1}`}><span>{item.category}</span><ExternalLink className="h-4 w-4" /></div>
                <div className="reference-news-card__body"><div className="reference-news-card__meta">{item.sourceName}</div><h3>{item.title}</h3><div className="reference-news-card__source">المصدر الرسمي <ExternalLink className="h-3.5 w-3.5" /></div></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="reference-section reference-testimonials">
        <div className="container-shell">
          <div className="reference-heading"><span className="reference-heading__line" /><h2>آراء عملائنا</h2><span className="reference-heading__line" /></div>
          <p className="reference-subtitle">ثقة عملائنا هي سر استمرارنا</p>
          <div className="reference-testimonials__grid">
            {testimonials.map((item, index) => (
              <article key={item.id} className="reference-testimonial">
                <Quote className="reference-testimonial__quote" />
                <p>{item.quote}</p>
                <div className="reference-testimonial__bottom">
                  <div className={`reference-avatar avatar--${index + 1}`} aria-hidden="true">{item.name.charAt(0)}</div>
                  <div className="reference-testimonial__person"><strong>{item.name}</strong><span>{item.role}</span></div>
                  <div className="reference-testimonial__stars" aria-label="5 من 5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="fill-current" />)}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="reference-closing">
        <div className="reference-closing__city" aria-hidden="true" />
        <div className="container-shell reference-closing__inner">
          <div className="reference-closing__copy"><h2>جاهز ننجز معاملاتك؟</h2><p>تواصل معنا الآن عبر واتساب وابدأ رحلتك نحو إنجاز أسرع</p></div>
          <div className="reference-closing__buttons">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="reference-whatsapp-number"><MessageCircle /> 0590097275</a>
            <button onClick={() => request()} className="reference-whatsapp-action"><MessageCircle /> اطلب الخدمة الآن</button>
          </div>
        </div>
      </section>

      <footer className="reference-footer">
        <div className="container-shell reference-footer__grid">
          <div className="reference-footer__brand"><BrandMark inverse /><p>إنجازك مكتب متخصص في متابعة وتعقيب المعاملات للأفراد والمنشآت، بخبرة ووضوح ومتابعة مستمرة.</p></div>
          <div><h3>لماذا إنجازك؟</h3><div className="reference-footer__points"><span><Star /> خبرة عملية</span><span><ShieldCheck /> خصوصية وأمان</span><span><MessageCircle /> دعم عبر واتساب</span><span><MapPin /> جميع المناطق</span></div></div>
          <div><h3>تواصل معنا</h3><a className="reference-footer__link" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer"><MessageCircle /> 0590097275</a><a className="reference-footer__link" href={TIKTOK_URL} target="_blank" rel="noreferrer">TikTok @mror_angazk <ExternalLink /></a></div>
          <a href={TIKTOK_URL} target="_blank" rel="noreferrer" className="reference-tiktok-card"><strong>TikTok</strong><span>@mror_angazk</span><small>محتوى معرفي ونصائح وخدمات يومية</small></a>
        </div>
        <div className="reference-footer__bottom"><div className="container-shell">سياسة الخصوصية &nbsp;&nbsp; | &nbsp;&nbsp; الشروط والأحكام <span>© 2026 إنجازك — جميع الحقوق محفوظة</span></div></div>
      </footer>

      <RequestModal open={open} onClose={() => setOpen(false)} initialService={selected} />
      <WhatsAppFab />
    </main>
  )
}
