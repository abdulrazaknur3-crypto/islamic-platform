import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const ts = useTranslations('site');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white/80">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-sm">
        <p>
          © {year} {ts('name')} — {t('rights')}
        </p>
        <p className="text-white/60">{ts('tagline')}</p>
      </div>
    </footer>
  );
}
