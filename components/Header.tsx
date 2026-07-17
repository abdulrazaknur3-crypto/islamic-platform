import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('nav');
  const ts = useTranslations('site');
  const locale = useLocale();

  const links = [
    { href: `/${locale}/library`, label: t('library'), active: true },
    { href: `/${locale}/qa`, label: t('qa'), active: false },
    { href: `/${locale}/live`, label: t('live'), active: false },
    { href: `/${locale}/training`, label: t('training'), active: false },
    { href: `/${locale}/circles`, label: t('circles'), active: false },
  ];

  return (
    <header className="glass-nav fixed top-0 z-50 h-20 w-full border-b border-outline-variant/30">
      <div className="mx-auto flex h-full w-full max-w-container-max items-center justify-between px-4 lg:px-12">
        <div className="flex items-center gap-8">
          <Link href={`/${locale}`} className="flex items-center gap-2.5">
            <Image
              src="/logo-icon.png"
              alt={ts('name')}
              width={40}
              height={41}
              priority
            />
            <span className="text-xl font-bold text-deep-sea">{ts('name')}</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            {links.map((link) =>
              link.active ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="border-b-2 border-shore-blue pb-1 text-label-sm font-bold text-shore-blue"
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-label-sm text-on-surface-variant transition-colors hover:text-deep-sea"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden items-center rounded-full border border-outline-variant/20 bg-surface-container-low px-4 py-2 lg:flex">
            <span className="material-symbols-outlined text-[20px] text-outline">search</span>
            <input
              className="w-40 border-none bg-transparent text-label-sm outline-none placeholder:text-outline"
              placeholder={t('searchPlaceholder')}
              type="text"
            />
          </div>
          <LanguageSwitcher />
          <button
            aria-label={t('account')}
            className="hidden text-on-surface-variant transition-all hover:text-shore-blue sm:block"
          >
            <span className="material-symbols-outlined">account_circle</span>
          </button>
          <Link
            href={`/${locale}/login`}
            className="hidden rounded-lg bg-deep-sea px-6 py-2.5 text-label-sm text-white transition-all hover:opacity-90 active:scale-95 sm:block"
          >
            {t('signIn')}
          </Link>
        </div>
      </div>
    </header>
  );
}
