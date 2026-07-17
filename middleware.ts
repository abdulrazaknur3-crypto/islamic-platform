import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export const config = {
  matcher: ['/', '/(ar|en|ti)/:path*'],
};
