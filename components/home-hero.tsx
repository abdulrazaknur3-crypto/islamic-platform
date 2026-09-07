'use client'

import { useState } from 'react'
import { ArrowLeft, MapPin, MessageCircle, ShieldCheck, Users, Zap } from 'lucide-react'
import { BrandMark } from '@/components/brand-mark'
import { HeroPortalIllustration } from '@/components/hero-portal-illustration'
import { RequestModal } from '@/components/request-modal'
import { WHATSAPP_NUMBER } from '@/lib/data'

const trust = [
  [Users, 'فريق متخصص', 'خدمة منظمة بخبرة'],
  [ShieldCheck, 'خصوصية وأمان', 'بياناتك في أمان'],
  [Zap, 'متابعة مستمرة', 'حتى ظهور النتيجة'],
  [MapPin, 'خدمة واسعة', 'للأفراد والمنشآت'],
] as const

export function HomeHero() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="container-shell flex min-h-[82px] items-center justify-between gap-4">
          <BrandMark />
          <div className="flex items-center gap-2">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-xl border border-[#087a4b]/20 px-4 py-2.5 text-sm font-bold text-[#087a4b] transition hover:bg-emerald-50 sm:flex"><MessageCircle className="h-4 w-4" /> واتساب</a>
            <button onClick={() => setOpen(true)} className="rounded-xl bg-[#0b2a4a] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#123b5f]">اطلب خدمتك</button>
          </div>
        </div>
      </header>

      <section className="hero-grid relative overflow-hidden bg-gradient-to-b from-white to-[#f8fbfa]">
        <div className="container-shell grid min-h-[540px] items-center gap-10 py-12 lg:grid-cols-[1.04fr_.96fr] lg:py-8">
          <div className="relative z-10 order-2 lg:order-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#d6e4dd] bg-white px-4 py-2 text-xs font-bold text-[#087a4b] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> معاملات الأفراد والمنشآت
            </span>
            <h1 className="mt-5 text-[42px] font-bold leading-[1.28] tracking-tight text-[#0b2a4a] sm:text-[54px]">
              معاملتك علينا..<br /><span className="text-[#087a4b]">ووقتك لك</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#405b72]">مكتب متخصص في تنظيم ومتابعة معاملاتك لدى الجهات والمنصات الحكومية، بخطوات واضحة وتواصل مباشر وخصوصية عالية.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-[#087a4b] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-900/10 transition hover:-translate-y-0.5 hover:bg-[#056e43]"><MessageCircle className="h-5 w-5" /> اطلب الخدمة عبر واتساب</button>
              <a href="#services" className="inline-flex items-center gap-2 rounded-xl border border-[#0b2a4a]/20 bg-white px-6 py-3.5 text-sm font-bold text-[#0b2a4a] transition hover:border-[#d4a94f] hover:bg-[#fffaf0]">استعرض الخدمات <ArrowLeft className="h-4 w-4" /></a>
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {trust.map(([Icon, title, desc]) => (
                <div key={title} className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
                  <Icon className="h-5 w-5 text-[#0b2a4a]" />
                  <div className="mt-3 text-sm font-bold text-[#0b2a4a]">{title}</div>
                  <div className="mt-1 text-[11px] text-slate-500">{desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2"><HeroPortalIllustration /></div>
        </div>
      </section>

      <RequestModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
