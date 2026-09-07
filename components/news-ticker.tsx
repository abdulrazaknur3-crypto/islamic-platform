'use client'

import { ExternalLink, Megaphone } from 'lucide-react'
import type { NewsItem } from '@/lib/types'

export function NewsTicker({ items }: { items: NewsItem[] }) {
  const loop = [...items, ...items]
  return (
    <div className="relative overflow-hidden border-y border-[#d8b85d]/60 bg-[#f6dda2] text-[#171717]">
      <div className="container-shell flex min-h-12 items-stretch">
        <div className="relative z-10 flex shrink-0 items-center gap-2 bg-[#f6dda2] px-1 pe-5 text-sm font-bold">
          <Megaphone className="h-4 w-4" />
          آخر الأخبار
        </div>
        <div className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_left,transparent,black_8%,black_92%,transparent)]">
          <div className="news-track h-full items-center">
            {loop.map((item, index) => (
              <a
                key={`${item.id}-${index}`}
                href={item.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex h-12 shrink-0 items-center gap-3 px-6 text-[13px] font-medium transition hover:bg-black/5"
                title={`المصدر: ${item.sourceName}`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#7b5b16]" />
                <span>{item.title}</span>
                <ExternalLink className="h-3.5 w-3.5 opacity-60 transition group-hover:opacity-100" />
                <span className="mx-2 h-5 w-px bg-black/20" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
