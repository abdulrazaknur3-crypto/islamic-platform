import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('nav');
  const ts = useTranslations('site');
  const locale = useLocale();

  const links = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/library`, label: t('library') },
    { href: `/${locale}/articles`, label: t('articles') },
    { href: `/${locale}/scholars`, label: t('scholars') },
    { href: `/${locale}/qa`, label: t('qa') },
    { href: `/${locale}/live`, label: t('live') },
  ];

  return (
    <header className="bg-primary text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sand text-lg font-bold text-primary">
            م
          </span>
          <span className="text-lg font-bold">{ts('name')}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/90 transition-colors hover:text-sand"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <LanguageSwitcher />
      </div>
    </header>
  );
}
