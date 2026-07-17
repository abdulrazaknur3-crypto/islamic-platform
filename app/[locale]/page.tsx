import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function HomePage({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale);
  const t = useTranslations('home');

  return (
    <>
      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2">
          <div>
            <Image
              src="/logo-icon.png"
              alt=""
              width={72}
              height={74}
              className="rounded-xl border border-sand/40 bg-white p-1"
              priority
            />
            <h1 className="mt-6 text-4xl font-bold leading-snug text-primary md:text-5xl">
              {t('heroTitle')}
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
              {t('heroSubtitle')}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={`/${params.locale}/library`}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
              >
                <span className="material-symbols-outlined text-xl">school</span>
                {t('exploreLibrary')}
              </Link>
              <Link
                href={`/${params.locale}/qa`}
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-white px-6 py-3 font-medium text-primary transition-colors hover:bg-primary/5"
              >
                <span className="material-symbols-outlined text-xl">contact_support</span>
                {t('askQuestion')}
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl bg-primary p-8 text-white">
              <p className="text-sm font-medium text-sand">{t('live.badge')}</p>
              <h3 className="mt-2 text-2xl font-bold">{t('live.title')}</h3>
              <p className="mt-2 text-sm text-white/80">{t('live.desc')}</p>
              <Link
                href={`/${params.locale}/live`}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-sand px-5 py-2.5 text-sm font-semibold text-primary transition-opacity hover:opacity-90"
              >
                <span className="material-symbols-outlined text-xl">videocam</span>
                {t('live.join')}
              </Link>
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-sand/50 bg-white p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream text-primary">
                <span className="material-symbols-outlined">podcasts</span>
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">{t('audio.title')}</p>
                <p className="text-xs text-ink-soft">{t('audio.desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-primary">{t('latestTitle')}</h2>
            <p className="mt-1 text-sm text-ink-soft">{t('latestSubtitle')}</p>
          </div>
          <Link
            href={`/${params.locale}/library`}
            className="inline-flex items-center gap-1 text-sm font-medium text-secondary hover:text-primary"
          >
            {t('viewAll')}
            <span className="material-symbols-outlined text-lg rtl:-scale-x-100">arrow_forward</span>
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(['readable', 'audio2', 'video', 'articles', 'qa', 'live2'] as const).map((key) => (
            <Link
              key={key}
              href={`/${params.locale}/${t(`sections.${key}.href`)}`}
              className="group rounded-2xl border border-sand/40 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-cream text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <span className="material-symbols-outlined text-2xl">
                  {t(`sections.${key}.icon`)}
                </span>
              </span>
              <h3 className="mt-4 text-lg font-bold text-primary">
                {t(`sections.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {t(`sections.${key}.desc`)}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-primary">{t('circles.title')}</h2>
            <p className="mt-3 max-w-xl leading-relaxed text-ink-soft">{t('circles.desc')}</p>
            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3 rounded-xl border border-sand/50 bg-white p-4">
                <span className="material-symbols-outlined mt-0.5 text-primary">groups</span>
                <div>
                  <p className="text-sm font-semibold text-ink">{t('circles.community')}</p>
                  <p className="text-xs text-ink-soft">{t('circles.communityDesc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-sand/50 bg-white p-4">
                <span className="material-symbols-outlined mt-0.5 text-primary">verified</span>
                <div>
                  <p className="text-sm font-semibold text-ink">{t('circles.scholars')}</p>
                  <p className="text-xs text-ink-soft">{t('circles.scholarsDesc')}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-secondary p-10 text-center text-white">
            <span className="material-symbols-outlined text-5xl text-sand">auto_stories</span>
            <p className="mt-4 text-xl font-semibold leading-relaxed">{t('circles.quote')}</p>
          </div>
        </div>
      </section>

      <section className="bg-primary">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center text-white">
          <span className="material-symbols-outlined text-4xl text-sand">mail</span>
          <h2 className="mt-3 text-2xl font-bold">{t('newsletterTitle')}</h2>
          <p className="mt-2 text-sm text-white/80">{t('newsletterSubtitle')}</p>
          <div className="mx-auto mt-6 flex max-w-md gap-2">
            <input
              type="email"
              placeholder={t('newsletterPlaceholder')}
              className="w-full rounded-full border-0 bg-white px-5 py-3 text-sm text-ink outline-none"
            />
            <button className="whitespace-nowrap rounded-full bg-sand px-6 py-3 text-sm font-semibold text-primary transition-opacity hover:opacity-90">
              {t('newsletterButton')}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
