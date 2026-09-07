export function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <div className="flex items-center gap-3" aria-label="إنجازك Injazak">
      <div className="relative h-11 w-8" aria-hidden="true">
        <span className={`absolute right-0 top-0 block h-3 w-7 -skew-x-[28deg] rounded-full ${inverse ? 'bg-[#e8c56e]' : 'bg-[#d4a94f]'}`} />
        <span className={`absolute right-1 top-3.5 block h-3 w-6 -skew-x-[28deg] rounded-full ${inverse ? 'bg-[#e8c56e]' : 'bg-[#d4a94f]'}`} />
        <span className={`absolute right-2 top-7 block h-3 w-5 -skew-x-[28deg] rounded-full ${inverse ? 'bg-[#e8c56e]' : 'bg-[#d4a94f]'}`} />
      </div>
      <div className="leading-none">
        <div className={`text-[28px] font-bold tracking-tight ${inverse ? 'text-white' : 'text-[#0b2a4a]'}`}>إنجازك</div>
        <div className={`mt-1 text-[10px] font-medium ${inverse ? 'text-white/70' : 'text-[#47637c]'}`}>لخدمات وتعقيب المعاملات</div>
      </div>
    </div>
  )
}
