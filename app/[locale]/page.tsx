/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Image from 'next/image';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { demoImages, demoLiveSession, demoScholarQuote, pick } from '@/src/demo-data';
import { getFeaturedArticle, getLatestAudio, getLatestFatwa } from '@/src/db';

export const revalidate = 60;

export default async function HomePage({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale);
  const locale = params.locale;
  const t = await getTranslations({ locale, namespace: 'home' });
  const [article, audio, fatwa] = await Promise.all([
    getFeaturedArticle(),
    getLatestAudio(),
    getLatestFatwa(),
  ]);

  return (
    <div className="pt-20">
      <section className="relative flex min-h-0 items-center overflow-hidden bg-background">
        <div className="relative z-10 mx-auto grid max-w-container-max grid-cols-1 items-center gap-12 px-4 py-8 lg:grid-cols-2 lg:px-12">
          <div className="space-y-6">
            <Image
              src="/logo-icon.png"
              alt={t('brandLine')}
              width={192}
              height={197}
              className="h-44 w-44 object-contain"
              priority
            />
            <div className="space-y-4">
              <h1 className="text-3xl font-bold leading-tight text-deep-sea md:text-display-lg">
                {t('brandLine')}
                <span className="mt-2 block text-xl font-semibold text-earth-brown md:text-headline-lg">
                  {t('brandTrilingual')}
                </span>
              </h1>
              <p className="max-w-xl text-body-lg text-on-surface-variant">{t('heroSubtitle')}</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${locale}/training`}
                className="flex h-[48px] items-center gap-2 rounded-lg bg-deep-sea px-8 text-label-sm text-white transition-colors hover:bg-shore-blue"
              >
                <span className="material-symbols-outlined">school</span>
                {t('exploreCourses')}
              </Link>
              <Link
                href={`/${locale}/library`}
                className="flex h-[48px] items-center gap-2 rounded-lg border-2 border-shore-blue px-8 text-label-sm text-shore-blue transition-colors hover:bg-shore-blue/5"
              >
                <span className="material-symbols-outlined">auto_stories</span>
                {t('readLibrary')}
              </Link>
            </div>
          </div>

          <div className="relative mb-8">
            <div className="aspect-square overflow-hidden rounded-full border-8 border-white bg-surface-container-highest shadow-xl">
              <img
                className="h-full w-full object-cover"
                alt={t('heroImageAlt')}
                src={demoImages.heroLibrary}
              />
            </div>
            <div className="live-pulse absolute -bottom-6 max-w-xs rounded-xl border border-white/50 bg-dune-gold p-6 text-ink-text shadow-lg ltr:-right-2 rtl:-left-2 lg:ltr:-right-6 lg:rtl:-left-6">
              <div className="mb-2 flex items-center gap-3">
                <span className="h-3 w-3 animate-ping rounded-full bg-red-600"></span>
                <span className="text-label-sm font-bold uppercase tracking-wider">
                  {t('live.badge')}
                </span>
              </div>
              <h3 className="mb-3 text-title-md leading-tight text-ink-text">
                {pick(demoLiveSession.title, locale)}
              </h3>
              <Link
                href={`/${locale}/live`}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-deep-sea py-2 text-label-sm text-white"
              >
                <span className="material-symbols-outlined text-[18px]">videocam</span>
                {t('live.join')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-container-max px-4 lg:px-12">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="mb-2 text-headline-lg text-deep-sea">{t('latestLabel')}</h2>
              <p className="text-body-md text-earth-brown">{t('latestTitle')}</p>
            </div>
            <Link
              href={`/${locale}/library`}
              className="flex items-center gap-1 text-label-sm text-shore-blue hover:underline"
            >
              {t('viewAll')}
              <span className="material-symbols-outlined ltr:hidden">arrow_back</span>
              <span className="material-symbols-outlined rtl:hidden">arrow_forward</span>
            </Link>
          </div>

          <div className="grid h-auto grid-cols-1 grid-rows-2 gap-6 md:h-[600px] md:grid-cols-12">
            <div className="bento-card flex flex-col justify-between rounded-xl border border-outline-variant/30 bg-parchment p-8 md:col-span-6 md:row-span-2">
              <div>
                <span className="mb-6 inline-block rounded-full bg-deep-sea/10 px-3 py-1 text-label-sm text-deep-sea">
                  {t('featuredBadge')}
                </span>
                <h3 className="mb-4 text-[32px] font-bold leading-snug text-deep-sea">
                  {pick(article.title, locale)}
                </h3>
                <p className="mb-6 text-body-md text-on-surface-variant">
                  {pick(article.excerpt, locale)}
                </p>
                {article.id && (
                  <Link
                    href={`/${locale}/articles/${article.id}`}
                    className="inline-flex items-center gap-1 text-label-sm font-semibold text-shore-blue hover:text-deep-sea"
                  >
                    {t('readMore')}
                    <span className="material-symbols-outlined text-lg ltr:hidden">arrow_back</span>
                    <span className="material-symbols-outlined text-lg rtl:hidden">arrow_forward</span>
                  </Link>
                )}
              </div>
              <div className="flex items-center gap-4 pt-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-shore-blue/20 text-lg font-bold text-deep-sea">
                  {pick(article.author, locale).replace(/^(الشيخ|Sheikh|ሸኽ)\s*/, '').charAt(0) || '؟'}
                </span>
                <div>
                  <p className="text-label-sm text-deep-sea">
                    {pick(article.author, locale)}
                  </p>
                  <p className="text-[12px] text-earth-brown">
                    {pick(article.dateDisplay, locale)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bento-card relative flex flex-col justify-between overflow-hidden rounded-xl bg-deep-sea p-8 text-white md:col-span-6">
              <div className="absolute top-0 p-8 opacity-20 ltr:left-0 rtl:right-0">
                <span className="material-symbols-outlined text-[80px]">podcasts</span>
              </div>
              <div className="relative z-10">
                <span className="mb-4 inline-block rounded-full bg-white/20 px-3 py-1 text-label-sm text-white">
                  {t('newAudioBadge')}
                </span>
                <h3 className="mb-2 text-title-md">{pick(audio.title, locale)}</h3>
              </div>
              <div className="relative z-10 flex items-center justify-between">
                <button
                  aria-label={t('play')}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-dune-gold text-ink-text shadow-md transition-transform hover:scale-105"
                >
                  <span className="material-symbols-outlined">play_arrow</span>
                </button>
                <span className="text-label-sm opacity-80">
                  {pick(audio.durationDisplay, locale)}
                </span>
              </div>
            </div>

            <div className="bento-card flex flex-col justify-between rounded-xl border border-outline-variant/30 bg-surface-container p-6 md:col-span-3">
              <span className="material-symbols-outlined mb-4 text-shore-blue">quiz</span>
              <div>
                <h4 className="mb-2 text-title-md text-deep-sea">
                  {pick(fatwa.category, locale)}
                </h4>
                <p className="line-clamp-3 text-label-sm text-on-surface-variant">
                  {pick(fatwa.excerpt, locale)}
                </p>
              </div>
              <Link
                href={`/${locale}/qa`}
                className="mt-4 text-label-sm text-deep-sea underline"
              >
                {t('readAnswer')}
              </Link>
            </div>

            <div className="bento-card flex flex-col justify-between rounded-xl border border-dune-gold/30 bg-dune-gold/10 p-6 md:col-span-3">
              <span className="material-symbols-outlined mb-4 text-earth-brown">school</span>
              <div>
                <h4 className="mb-1 text-title-md text-earth-brown">{t('trainingPortal')}</h4>
                <p className="text-label-sm text-earth-brown opacity-80">{t('trainingDesc')}</p>
              </div>
              <Link
                href={`/${locale}/training`}
                className="mt-4 w-full rounded-lg border border-earth-brown/40 py-2 text-center text-label-sm text-earth-brown transition-colors hover:bg-earth-brown hover:text-white"
              >
                {t('enterPlatform')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-parchment py-14">
        <div className="mx-auto max-w-container-max px-4 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="mb-6 text-headline-lg text-deep-sea">{t('circles.title')}</h2>
              <p className="mb-8 text-body-lg text-on-surface-variant">{t('circles.desc')}</p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-lg bg-white p-4 shadow-sm">
                  <span className="material-symbols-outlined rounded-md bg-shore-blue/10 p-2 text-shore-blue">
                    groups
                  </span>
                  <div>
                    <h4 className="text-label-sm uppercase tracking-tight text-deep-sea">
                      {t('circles.community')}
                    </h4>
                    <p className="text-body-md text-earth-brown">{t('circles.communityDesc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-lg bg-white p-4 shadow-sm">
                  <span className="material-symbols-outlined rounded-md bg-shore-blue/10 p-2 text-shore-blue">
                    verified_user
                  </span>
                  <div>
                    <h4 className="text-label-sm uppercase tracking-tight text-deep-sea">
                      {t('circles.scholars')}
                    </h4>
                    <p className="text-body-md text-earth-brown">{t('circles.scholarsDesc')}</p>
                  </div>
                </div>
              </div>
              <Link
                href={`/${locale}/circles`}
                className="mt-10 inline-block rounded-lg bg-deep-sea px-10 py-4 text-label-sm text-white transition-all hover:shadow-xl"
              >
                {t('circles.joinToday')}
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="h-64 overflow-hidden rounded-xl border border-outline-variant/30 bg-white">
                  <img
                    className="h-full w-full object-cover"
                    alt={t('scholarImageAlt')}
                    src={demoImages.scholar}
                  />
                </div>
                <div className="flex h-48 items-center justify-center overflow-hidden rounded-xl bg-shore-blue p-6 text-center text-white">
                  <p className="text-title-md">{pick(demoScholarQuote.text, locale)}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-48 overflow-hidden rounded-xl bg-dune-gold">
                  <img
                    className="h-full w-full object-cover"
                    alt={t('patternImageAlt')}
                    src={demoImages.woodPattern}
                  />
                </div>
                <div className="h-64 overflow-hidden rounded-xl border border-outline-variant/30 bg-white">
                  <img
                    className="h-full w-full object-cover"
                    alt={t('studentsImageAlt')}
                    src={demoImages.students}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-deep-sea py-14">
        <div className="mx-auto max-w-container-max px-4 text-center lg:px-12">
          <div className="mx-auto max-w-2xl space-y-6">
            <span className="material-symbols-outlined text-[48px] text-dune-gold">mail</span>
            <h2 className="text-3xl font-bold text-white md:text-display-lg">
              {t('newsletterTitle')}
            </h2>
            <p className="text-body-lg text-on-primary-container">{t('newsletterSubtitle')}</p>
            <div className="flex flex-col gap-4 md:flex-row">
              <input
                className="h-[56px] flex-grow rounded-lg border-none bg-white/95 px-6 text-body-md text-ink-text outline-none focus:ring-2 focus:ring-shore-blue"
                placeholder={t('newsletterPlaceholder')}
                type="email"
              />
              <button className="h-[56px] rounded-lg bg-dune-gold px-10 font-bold text-ink-text transition-colors hover:bg-white">
                {t('newsletterButton')}
              </button>
            </div>
            <p className="text-label-sm text-on-primary-container opacity-60">
              {t('newsletterPrivacy')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
