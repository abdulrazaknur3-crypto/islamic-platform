'use client'

import { useState } from 'react'
import { ArrowLeft, CheckCircle2, MapPin, MessageCircle, ShieldCheck, Users, Zap } from 'lucide-react'
import { BrandMark } from '@/components/brand-mark'
import { HeroPortalIllustration } from '@/components/hero-portal-illustration'
import { RequestModal } from '@/components/request-modal'
import { WHATSAPP_NUMBER } from '@/lib/data'

const trust = [
  [Users, 'فريق متخصص', 'من ذوي الخبرة'],
  [ShieldCheck, 'خصوصية وأمان', 'بياناتك في أيدٍ أمينة'],
  [Zap, 'متابعة سريعة ومستمرة', 'حتى صدور النتيجة'],
  [MapPin, 'خدمة في جميع مناطق المملكة', 'حضوريًا وعن بُعد'],
] as const

export function HomeHero() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="border-b border-slate-100 bg-white/96 backdrop-blur">
        <div className="container-shell flex min-h-[74px] items-center justify-between gap-4">
          <BrandMark />
          <div className="flex items-center gap-2">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-[10px] border border-[#0b2a4a]/20 bg-white px-4 py-2.5 text-sm font-extrabold text-[#0b2a4a] transition hover:border-[#087a4b]/30 hover:bg-emerald-50 sm:flex"><MessageCircle className="h-4 w-4 text-[#087a4b]" /> واتساب</a>
            <button onClick={() => setOpen(true)} className="rounded-[10px] bg-[#0b2a4a] px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-[#123b5f]">اطلب خدمتك</button>
          </div>
        </div>
      </header>

      <section className="hero-grid relative overflow-hidden bg-gradient-to-b from-white to-[#f8fbfa]">
        <div className="container-shell grid min-h-[560px] items-center gap-8 py-8 lg:grid-cols-[1.03fr_.97fr] lg:py-0">
          <div className="relative z-10 order-2 lg:order-2">
            <div className="hidden lg:block"><HeroPortalIllustration /></div>
            <div className="lg:hidden"><HeroPortalIllustration compact /></div>
          </div>

          <div className="relative z-10 order-1 text-center lg:order-1 lg:text-right">
            <BrandMark />
            <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#d6e4dd] bg-white px-4 py-2 text-xs font-extrabold text-[#087a4b] shadow-sm">
              <CheckCircle2 className="h-4 w-4" /> معاملات الأفراد والمنشآت
            </span>
            <h1 className="mt-5 text-[42px] font-black leading-[1.18] tracking-[-.055em] text-[#0b2a4a] sm:text-[58px] lg:text-[68px]">
              معاملتك علينا..<br /><span className="text-[#087a4b]">ووقتك لك</span>
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg font-semibold leading-9 text-[#183a57]/90 lg:mx-0">مكتب متخصص في متابعة وإنجاز جميع المعاملات الحكومية للأفراد وقطاع الأعمال بخبرة وموثوقية عالية.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-[10px] bg-[#087a4b] px-8 py-4 text-base font-extrabold text-white shadow-lg shadow-emerald-900/10 transition hover:-translate-y-0.5 hover:bg-[#056e43]"><MessageCircle className="h-5 w-5" /> اطلب الخدمة عبر واتساب</button>
              <a href="#services" className="inline-flex items-center gap-2 rounded-[10px] border border-[#0b2a4a]/30 bg-white px-8 py-4 text-base font-extrabold text-[#0b2a4a] transition hover:border-[#d4a94f] hover:bg-[#fffaf0]">استعرض الخدمات <ArrowLeft className="h-4 w-4" /></a>
            </div>

            <div className="mt-10 grid gap-0 overflow-hidden rounded-[14px] border border-slate-200 bg-white/88 shadow-[0_14px_34px_rgba(11,42,74,.07)] sm:grid-cols-2 xl:grid-cols-4">
              {trust.map(([Icon, title, desc]) => (
                <div key={title} className="border-b border-slate-100 p-5 text-center sm:border-s xl:border-b-0">
                  <Icon className="mx-auto h-8 w-8 text-[#0b2a4a]" />
                  <div className="mt-3 text-base font-extrabold text-[#0b2a4a]">{title}</div>
                  <div className="mt-1 text-sm font-medium text-[#536b80]">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <RequestModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
