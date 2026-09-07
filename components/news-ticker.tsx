'use client'

import { ExternalLink, Megaphone } from 'lucide-react'
import type { NewsItem } from '@/lib/types'

export function NewsTicker({ items }: { items: NewsItem[] }) {
  const loop = [...items, ...items]
  return (
    <div className="relative overflow-hidden border-y border-[#d4ad54] bg-[#f6dda2] text-black shadow-[0_1px_0_rgba(255,255,255,.55)_inset]">
      <div className="container-shell flex h-[38px] items-stretch">
        <div className="relative z-10 flex shrink-0 items-center gap-2 border-l border-black/20 bg-[#f6dda2] pe-5 ps-2 text-[13px] font-black text-black">
          <Megaphone className="h-4 w-4" />
          آخر الأخبار
        </div>
        <div className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_left,transparent,black_6%,black_94%,transparent)]">
          <div className="news-track h-full items-center">
            {loop.map((item, index) => (
              <a
                key={`${item.id}-${index}`}
                href={item.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex h-[38px] shrink-0 items-center gap-3 px-7 text-[12px] font-bold transition hover:bg-black/5"
                title={`المصدر: ${item.sourceName}`}
              >
                <ExternalLink className="h-3.5 w-3.5 opacity-70 transition group-hover:opacity-100" />
                <span>{item.title}</span>
                <span className="mx-3 h-5 w-px bg-black/22" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
