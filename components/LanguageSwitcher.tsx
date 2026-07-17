'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales, localeNames, type Locale } from '@/src/config';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  function switchTo(next: Locale) {
    setOpen(false);
    const segments = pathname.split('/');
    segments[1] = next;
    router.push(segments.join('/') || `/${next}`);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Language"
        aria-expanded={open}
        className="text-on-surface-variant transition-all hover:text-shore-blue"
      >
        <span className="material-symbols-outlined">language</span>
      </button>
      {open && (
        <div className="absolute top-full z-50 mt-2 w-40 overflow-hidden rounded-lg border border-outline-variant/30 bg-white shadow-lg ltr:right-0 rtl:left-0">
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => switchTo(l)}
              className={`flex w-full items-center justify-between px-4 py-2.5 text-label-sm transition-colors hover:bg-parchment ${
                l === locale ? 'font-bold text-deep-sea' : 'text-on-surface-variant'
              }`}
            >
              {localeNames[l]}
              {l === locale && (
                <span className="material-symbols-outlined text-[18px] text-shore-blue">check</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
