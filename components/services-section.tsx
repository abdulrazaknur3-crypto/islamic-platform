'use client'

import { useMemo, useState } from 'react'
import {
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  CarFront,
  FileText,
  Fingerprint,
  LayoutGrid,
  Scale,
  Search,
  ShieldCheck,
} from 'lucide-react'
import { services } from '@/lib/data'
import { RequestModal } from '@/components/request-modal'

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

export function ServicesSection() {
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

  function request(serviceId: string) {
    setSelected(serviceId)
    setOpen(true)
  }

  return (
    <section id="services" className="bg-white py-14 sm:py-16">
      <div className="container-shell">
        <div className="text-center">
          <span className="section-kicker">اختر وابدأ</span>
          <h2 className="section-title mt-2">الخدمات الأكثر طلبًا</h2>
          <p className="mt-3 text-base font-medium text-slate-500">اختر الخدمة التي تحتاجها ودع الباقي علينا</p>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
          {filtered.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap]
            return (
              <button key={service.id} onClick={() => request(service.id)} className="group rounded-[12px] border border-slate-200 bg-white px-4 py-5 text-center reference-card transition duration-300 hover:-translate-y-1 hover:border-[#d4a94f] hover:shadow-[0_16px_35px_rgba(11,42,74,.09)]">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-[18px] bg-[#f2f8f5] text-[#087a4b] transition group-hover:bg-[#087a4b] group-hover:text-white"><Icon className="h-8 w-8" /></div>
                <h3 className="mt-4 text-[17px] font-extrabold text-[#0b2a4a]">{service.name}</h3>
              </button>
            )
          })}
        </div>

        <div className="mx-auto mt-6 grid max-w-6xl gap-4 lg:grid-cols-[1fr_1.2fr]">
          <div className="flex items-center gap-3 rounded-[12px] border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-500 shadow-sm">
            <FileText className="h-5 w-5 text-[#173d60]" /> مثال: نقل كفالة، إصدار إقامة، تجديد رخصة القيادة، فتح سجل تجاري ...
          </div>
          <label className="flex items-center gap-3 rounded-[12px] border border-slate-200 bg-white px-5 py-4 shadow-sm focus-within:border-[#d4a94f]">
            <Search className="h-6 w-6 text-slate-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full bg-transparent text-base font-medium text-[#0b2a4a] outline-none" placeholder="ابحث عن معاملتك أو الخدمة المطلوبة ..." />
          </label>
        </div>
      </div>
      <RequestModal open={open} initialService={selected} onClose={() => setOpen(false)} />
    </section>
  )
}
