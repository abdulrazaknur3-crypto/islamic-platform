import { redirect } from 'next/navigation';
import { defaultLocale } from '@/src/config';

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
