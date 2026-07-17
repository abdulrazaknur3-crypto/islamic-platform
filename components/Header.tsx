import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('nav');
  const ts = useTranslations('site');
  const locale = useLocale();

  const links = [
    { href: `/${locale}/library`, label: t('library') },
    { href: `/${locale}/articles`, label: t('articles') },
    { href: `/${locale}/scholars`, label: t('scholars') },
    { href: `/${locale}/qa`, label: t('qa') },
    { href: `/${locale}/live`, label: t('live') },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-sand/40 bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href={`/${locale}`} className="flex items-center gap-2.5">
          <Image
            src="/logo-icon.png"
            alt={ts('name')}
            width={40}
            height={41}
            className="rounded-lg"
            priority
          />
          <span className="text-lg font-bold text-primary">{ts('name')}</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href={`/${locale}/login`}
            className="hidden rounded-full bg-primary px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:block"
          >
            {t('signIn')}
          </Link>
        </div>
      </div>
    </header>
  );
}
