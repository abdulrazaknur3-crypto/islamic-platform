import Image from 'next/image'

export function HeroPortalIllustration({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative mx-auto w-full ${compact ? 'max-w-[420px]' : 'max-w-[710px]'} select-none`} aria-hidden="true">
      <Image
        src="/reference/hero-visual.svg"
        alt=""
        width={510}
        height={365}
        priority
        sizes="(min-width: 1024px) 48vw, 92vw"
        className="h-auto w-full object-contain drop-shadow-[0_28px_50px_rgba(11,42,74,.16)]"
      />
    </div>
  )
}
