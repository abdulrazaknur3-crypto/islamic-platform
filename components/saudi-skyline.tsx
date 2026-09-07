export function SaudiSkyline({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 720 210" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="city" x1="0" x2="0" y1="20" y2="210" gradientUnits="userSpaceOnUse">
          <stop stopColor="#224f62" />
          <stop offset="1" stopColor="#083443" />
        </linearGradient>
        <linearGradient id="cityGold" x1="0" x2="0" y1="0" y2="1">
          <stop stopColor="#dfbf6e" />
          <stop offset="1" stopColor="#a97b26" />
        </linearGradient>
      </defs>
      <path d="M0 188H720V210H0z" fill="#083443" />
      <path d="M40 126h30v62H40zM76 102h26v86H76zM112 140h48v48h-48zM178 89h35v99h-35zM224 132h38v56h-38zM274 110h31v78h-31zM318 145h52v43h-52zM522 128h35v60h-35zM568 102h28v86h-28zM608 136h44v52h-44zM661 116h30v72h-30z" fill="url(#city)" opacity=".9" />
      <path d="M404 32l30 28-9 128h-59l-8-128 30-28h16z" fill="url(#city)" />
      <path d="M376 67h41l-7 31h-28z" fill="#d8c08a" opacity=".9" />
      <path d="M459 42h52l-6 146h-40l-6-146z" fill="url(#city)" />
      <path d="M468 53h34l-2 20h-30l-2-20z" fill="url(#cityGold)" opacity=".9" />
      <path d="M314 64h26l-5 124h-16l-5-124z" fill="url(#city)" />
      <path d="M325 20l8 44h-16l8-44z" fill="#d4a94f" />
      <g opacity=".72" stroke="#d4a94f" strokeWidth="2">
        <path d="M28 188c10-25 15-44 14-68" />
        <path d="M42 121c-11-9-19-11-26-7M43 122c8-12 18-17 28-14M42 121c-2-13-8-20-17-25M43 120c8-7 13-16 14-27" />
        <path d="M696 188c-4-27-3-46 4-67" />
        <path d="M700 121c-9-10-18-14-27-11M701 121c10-10 20-13 30-9M700 120c1-13 7-21 17-27" />
      </g>
    </svg>
  )
}
