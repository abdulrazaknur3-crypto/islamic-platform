export const locales = ['ar', 'en', 'ti'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ar';

export const localeNames: Record<Locale, string> = {
  ar: 'العربية',
  en: 'English',
  ti: 'ትግርኛ',
};

export const localeDirections: Record<Locale, 'rtl' | 'ltr'> = {
  ar: 'rtl',
  en: 'ltr',
  ti: 'ltr',
};

export const localeFonts: Record<Locale, string> = {
  ar: 'font-arabic',
  en: 'font-latin',
  ti: 'font-ethiopic',
};
