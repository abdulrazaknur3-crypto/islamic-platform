import Image from 'next/image'

export function SeasonalBanner() {
  return (
    <section className="relative overflow-hidden bg-[#063f32]">
      <div className="relative h-[118px] w-full sm:h-[140px] lg:h-[166px]">
        <Image
          src="/reference/seasonal-banner.svg"
          alt="موسم اليوم الوطني السعودي 96 - إنجازك لخدمات وتعقيب المعاملات"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  )
}
