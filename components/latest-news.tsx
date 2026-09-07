import Image from 'next/image'
import { ExternalLink, Newspaper } from 'lucide-react'
import type { NewsItem } from '@/lib/types'

const thumbs = ['/reference/news-thumb-1.svg', '/reference/news-thumb-2.svg', '/reference/news-thumb-3.svg', '/reference/news-thumb-4.svg']

export function LatestNews({ items }: { items: NewsItem[] }) {
  return (
    <section id="updates" className="bg-white py-14">
      <div className="container-shell">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="section-kicker">من المصدر</span>
            <h2 className="section-title mt-2">آخر تحديثات الجهات الحكومية</h2>
            <p className="mt-2 text-base font-medium text-slate-500">نربط الخبر بمصدره الرسمي حتى تتأكد من المعلومة بنفسك.</p>
          </div>
          <a href="https://www.my.gov.sa/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-[10px] border border-slate-200 bg-white px-4 py-2.5 text-xs font-extrabold text-[#0b2a4a] shadow-sm hover:border-[#d4a94f]"><Newspaper className="h-4 w-4" /> شاهد المصادر الرسمية</a>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {items.slice(0, 4).map((item, index) => (
            <a key={item.id} href={item.sourceUrl} target="_blank" rel="noreferrer" className="group overflow-hidden rounded-[12px] border border-slate-200 bg-white reference-card transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(11,42,74,.08)]">
              <div className="flex min-h-[150px]">
                <div className="relative w-[92px] shrink-0 overflow-hidden bg-slate-100">
                  <Image src={thumbs[index]} alt="" fill sizes="92px" className="object-cover" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-[#087a4b] px-3 py-1 text-[11px] font-extrabold text-white">{item.category}</span>
                    <span className="text-[11px] font-semibold text-slate-400">2024 سبتمبر</span>
                  </div>
                  <h3 className="mt-3 flex-1 text-[15px] font-extrabold leading-7 text-[#0b2a4a]">{item.title}</h3>
                  <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-extrabold text-[#087a4b]">
                    المصدر الرسمي <ExternalLink className="h-4 w-4 text-[#0b2a4a] transition group-hover:-translate-x-1" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
