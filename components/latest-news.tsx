import { ExternalLink, Newspaper } from 'lucide-react'
import type { NewsItem } from '@/lib/types'

export function LatestNews({ items }: { items: NewsItem[] }) {
  return (
    <section id="updates" className="bg-white py-16">
      <div className="container-shell">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-bold text-[#b1842e]">من المصدر</span>
            <h2 className="mt-2 text-3xl font-bold text-[#0b2a4a]">آخر تحديثات الجهات الحكومية</h2>
            <p className="mt-2 text-sm text-slate-500">نربط الخبر بمصدره الرسمي حتى تتأكد من المعلومة بنفسك.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#f5f8fa] px-4 py-2 text-xs font-semibold text-[#47637c]"><Newspaper className="h-4 w-4" /> محتوى قابل للتحديث من لوحة الإدارة</div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {items.slice(0, 4).map((item, index) => (
            <a key={item.id} href={item.sourceUrl} target="_blank" rel="noreferrer" className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(11,42,74,.08)]">
              <div className={`h-28 p-5 ${index % 2 === 0 ? 'bg-gradient-to-br from-[#0c6148] to-[#0b2a4a]' : 'bg-gradient-to-br from-[#163d5d] to-[#0b2a4a]'}`}>
                <span className="inline-flex rounded-full bg-white/12 px-3 py-1 text-[11px] font-bold text-white">{item.category}</span>
                <div className="mt-7 flex items-end justify-between text-white/70"><span className="text-xs">{item.sourceName}</span><ExternalLink className="h-4 w-4" /></div>
              </div>
              <div className="p-5">
                <h3 className="min-h-[62px] text-sm font-bold leading-7 text-[#0b2a4a]">{item.title}</h3>
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-[#087a4b]">
                  المصدر الرسمي <span className="transition group-hover:-translate-x-1">←</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
