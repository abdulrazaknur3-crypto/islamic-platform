'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales, localeNames, type Locale } from '@/src/config';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchTo(next: Locale) {
    const segments = pathname.split('/');
    segments[1] = next;
    router.push(segments.join('/') || `/${next}`);
  }

  return (
    <div className="flex items-center gap-1 rounded-full bg-white/10 p-1">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => switchTo(l)}
          className={`rounded-full px-3 py-1 text-sm transition-colors ${
            l === locale
              ? 'bg-sand text-primary font-medium'
              : 'text-white/80 hover:bg-white/10'
          }`}
        >
          {localeNames[l]}
        </button>
      ))}
    </div>
  );
}
