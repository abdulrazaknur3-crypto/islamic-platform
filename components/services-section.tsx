'use client'

import { useMemo, useState } from 'react'
import {
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  CarFront,
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
    <section id="services" className="bg-white py-16 sm:py-20">
      <div className="container-shell">
        <div className="text-center">
          <span className="text-sm font-bold text-[#b1842e]">اختر وابدأ</span>
          <h2 className="mt-2 text-3xl font-bold text-[#0b2a4a] sm:text-4xl">الخدمات الأكثر طلبًا</h2>
          <p className="mt-3 text-sm text-slate-500">اختر الخدمة التي تحتاجها، أو ابحث باسم معاملتك.</p>
        </div>

        <div className="mx-auto mt-8 flex max-w-3xl items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm focus-within:border-[#d4a94f] focus-within:bg-white">
          <Search className="h-5 w-5 text-slate-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full bg-transparent text-sm text-[#0b2a4a] outline-none" placeholder="ابحث عن معاملتك أو الخدمة المطلوبة... مثال: نقل ملكية، إقامة، سجل تجاري" />
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap]
            return (
              <button key={service.id} onClick={() => request(service.id)} className="group rounded-2xl border border-slate-200 bg-white p-5 text-start transition duration-300 hover:-translate-y-1 hover:border-[#d4a94f]/60 hover:shadow-[0_16px_36px_rgba(11,42,74,.08)]">
                <div className="flex items-start justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#f2f7f5] text-[#087a4b] transition group-hover:bg-[#087a4b] group-hover:text-white"><Icon className="h-6 w-6" /></div>
                  <span className="text-lg text-[#d4a94f] transition group-hover:translate-x-[-3px]">←</span>
                </div>
                <h3 className="mt-5 text-base font-bold text-[#0b2a4a]">{service.name}</h3>
                <p className="mt-2 text-xs leading-6 text-slate-500">{service.shortDescription}</p>
              </button>
            )
          })}
        </div>

        {!filtered.length && <div className="mt-8 rounded-2xl bg-[#fff8e8] p-6 text-center text-sm text-[#6e541e]">لم نعثر على اسم الخدمة. اشرح طلبك لنا عبر واتساب وسنحدد لك المسار المناسب.</div>}
      </div>

      <RequestModal open={open} onClose={() => setOpen(false)} initialService={selected} />
    </section>
  )
}
