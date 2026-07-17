import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { getArticleById } from '@/src/db';
import { pick } from '@/src/demo-data';

export const revalidate = 60;

export default async function ArticlePage({
  params,
}: {
  params: { locale: string; id: string };
}) {
  unstable_setRequestLocale(params.locale);
  const locale = params.locale;
  const t = await getTranslations({ locale, namespace: 'article' });
  const article = await getArticleById(params.id);

  if (!article) notFound();

  const body = pick(article.body, locale);
  const paragraphs = body.split('\n').filter((p) => p.trim().length > 0);

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <Link
        href={`/${locale}`}
        className="inline-flex items-center gap-1 text-label-sm text-shore-blue hover:text-deep-sea"
      >
        <span className="material-symbols-outlined text-lg ltr:-scale-x-100">arrow_forward</span>
        {t('backHome')}
      </Link>

      <div className="mt-6">
        <span className="inline-block rounded-full bg-deep-sea/10 px-3 py-1 text-label-sm text-deep-sea">
          {t('badge')}
        </span>
      </div>

      <h1 className="mt-4 text-3xl font-bold leading-snug text-deep-sea md:text-headline-lg">
        {pick(article.title, locale)}
      </h1>

      <div className="mt-4 flex items-center gap-3 border-b border-outline-variant/40 pb-6">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-shore-blue/15 text-lg font-bold text-deep-sea">
          {pick(article.author, locale).replace(/^(الشيخ|Sheikh|ሸኽ)\s*/, '').charAt(0) || '؟'}
        </span>
        <div>
          <p className="text-label-sm font-semibold text-deep-sea">
            {pick(article.author, locale)}
          </p>
          <p className="text-[12px] text-earth-brown">{pick(article.dateDisplay, locale)}</p>
        </div>
      </div>

      <div className="mt-8 space-y-5 text-body-lg leading-loose text-ink-text">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </article>
  );
}
