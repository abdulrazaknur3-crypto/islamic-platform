import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

const sectionKeys = ['readable', 'audio', 'video', 'articles', 'qa', 'live'] as const;

const sectionIcons: Record<(typeof sectionKeys)[number], string> = {
  readable: '📖',
  audio: '🎧',
  video: '🎬',
  articles: '✍️',
  qa: '💬',
  live: '🎙️',
};

const sectionHrefs: Record<(typeof sectionKeys)[number], string> = {
  readable: 'library?type=book',
  audio: 'library?type=audio',
  video: 'library?type=video',
  articles: 'articles',
  qa: 'qa',
  live: 'live',
};

export default function HomePage({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale);
  const t = useTranslations('home');

  return (
    <>
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="text-4xl font-bold leading-snug md:text-5xl">
            {t('heroTitle')}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">
            {t('heroSubtitle')}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={`/${params.locale}/library`}
              className="rounded-full bg-sand px-6 py-3 font-medium text-primary transition-opacity hover:opacity-90"
            >
              {t('exploreLibrary')}
            </Link>
            <Link
              href={`/${params.locale}/qa`}
              className="rounded-full border border-white/40 px-6 py-3 font-medium text-white transition-colors hover:bg-white/10"
            >
              {t('askQuestion')}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sectionKeys.map((key) => (
            <Link
              key={key}
              href={`/${params.locale}/${sectionHrefs[key]}`}
              className="rounded-2xl border border-sand/40 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <span className="text-3xl">{sectionIcons[key]}</span>
              <h3 className="mt-4 text-lg font-bold text-primary">
                {t(`sections.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm text-ink/70">
                {t(`sections.${key}.desc`)}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-secondary/10">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-primary">
            {t('newsletterTitle')}
          </h2>
          <p className="mt-2 text-ink/70">{t('newsletterSubtitle')}</p>
          <div className="mx-auto mt-6 flex max-w-md gap-2">
            <input
              type="email"
              placeholder={t('newsletterPlaceholder')}
              className="w-full rounded-full border border-sand/60 bg-white px-5 py-3 text-sm outline-none focus:border-secondary"
            />
            <button className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90">
              {t('newsletterButton')}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
