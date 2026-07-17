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
    { href: `/${locale}/qa`, label: tn('qa') },
    { href: `/${locale}/live`, label: tn('live') },
    { href: `/${locale}/training`, label: tn('training') },
  ];

  const platform = [
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/contact`, label: tn('contact') },
    { href: `/${locale}/privacy`, label: t('privacy') },
    { href: `/${locale}/terms`, label: t('terms') },
  ];

  return (
    <footer className="w-full border-t border-outline-variant bg-parchment py-12">
      <div className="mx-auto grid max-w-container-max grid-cols-1 gap-6 px-4 md:grid-cols-3 lg:px-12">
        <div className="space-y-4">
          <span className="text-headline-lg text-deep-sea">{ts('name')}</span>
          <p className="max-w-xs text-body-md text-earth-brown">{t('mission')}</p>
          <div className="flex gap-4">
            <a className="text-deep-sea hover:text-shore-blue" href="#" aria-label="Website">
              <span className="material-symbols-outlined">public</span>
            </a>
            <a className="text-deep-sea hover:text-shore-blue" href="#" aria-label="Video">
              <span className="material-symbols-outlined">video_library</span>
            </a>
            <a className="text-deep-sea hover:text-shore-blue" href="#" aria-label="Audio">
              <span className="material-symbols-outlined">mic</span>
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h5 className="mb-4 text-label-sm font-bold text-deep-sea">{t('resources')}</h5>
            <ul className="space-y-2">
              {resources.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-label-sm text-earth-brown transition-colors hover:text-shore-blue"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="mb-4 text-label-sm font-bold text-deep-sea">{t('platform')}</h5>
            <ul className="space-y-2">
              {platform.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-label-sm text-earth-brown transition-colors hover:text-shore-blue"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="space-y-4">
          <h5 className="mb-4 text-label-sm font-bold text-deep-sea">{t('support')}</h5>
          <p className="text-label-sm text-earth-brown">{t('supportDesc')}</p>
          <Link
            href={`/${locale}/donate`}
            className="block w-full rounded-lg border border-shore-blue py-3 text-center text-label-sm text-shore-blue transition-all hover:bg-shore-blue hover:text-white"
          >
            {t('donate')}
          </Link>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-container-max border-t border-outline-variant/30 px-4 pt-8 text-center lg:px-12">
        <p className="text-label-sm text-earth-brown opacity-60">
          © {year} {ts('name')} — {t('rights')}
        </p>
      </div>
    </footer>
  );
}
