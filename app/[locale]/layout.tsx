import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { locales, localeDirections, localeFonts, type Locale } from '@/src/config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'site' });
  return { title: t('name'), description: t('description') };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  const dir = localeDirections[locale] ?? 'ltr';
  const font = localeFonts[locale] ?? 'font-latin';

  return (
    <div lang={locale} dir={dir} className={font}>
      <NextIntlClientProvider messages={messages}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </NextIntlClientProvider>
    </div>
  );
}
