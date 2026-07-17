import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const tn = useTranslations('nav');
  const ts = useTranslations('site');
  const locale = useLocale();
  const year = new Date().getFullYear();

  const resources = [
    { href: `/${locale}/library`, label: tn('library') },
    { href: `/${locale}/articles`, label: tn('articles') },
    { href: `/${locale}/qa`, label: tn('qa') },
    { href: `/${locale}/live`, label: tn('live') },
  ];

  const platform = [
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/contact`, label: tn('contact') },
    { href: `/${locale}/privacy`, label: t('privacy') },
  ];

  return (
    <footer className="border-t border-sand/40 bg-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-primary">{ts('name')}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
            {ts('description')}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">{t('resources')}</p>
          <ul className="mt-3 space-y-2">
            {resources.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-ink-soft hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">{t('platform')}</p>
          <ul className="mt-3 space-y-2">
            {platform.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-ink-soft hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-sand/40">
        <p className="mx-auto max-w-6xl px-4 py-5 text-center text-xs text-ink-soft">
          © {year} {ts('name')} — {t('rights')}
        </p>
      </div>
    </footer>
  );
}
