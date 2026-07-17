'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/src/supabase-browser';

type Counts = { articles: number; scholars: number; fatwas: number; library: number };

export default function AdminDashboard() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState('');
  const [counts, setCounts] = useState<Counts>({ articles: 0, scholars: 0, fatwas: 0, library: 0 });

  useEffect(() => {
    const supabase = createClient();
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/admin');
        return;
      }
      const { data: admin } = await supabase
        .from('admins')
        .select('user_id')
        .eq('user_id', user.id)
        .maybeSingle();
      if (!admin) {
        await supabase.auth.signOut();
        router.push('/admin');
        return;
      }
      setEmail(user.email ?? '');

      const [a, s, f, l] = await Promise.all([
        supabase.from('articles').select('id', { count: 'exact', head: true }),
        supabase.from('scholars').select('id', { count: 'exact', head: true }),
        supabase.from('fatwas').select('id', { count: 'exact', head: true }),
        supabase.from('library_items').select('id', { count: 'exact', head: true }),
      ]);
      setCounts({
        articles: a.count ?? 0,
        scholars: s.count ?? 0,
        fatwas: f.count ?? 0,
        library: l.count ?? 0,
      });
      setChecking(false);
    })();
  }, [router]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin');
  }

  if (checking) {
    return (
      <div dir="rtl" className="flex min-h-screen items-center justify-center bg-cream">
        <p className="text-sm text-earth-brown">جارٍ التحقق...</p>
      </div>
    );
  }

  const sections = [
    { key: 'articles', label: 'المقالات', icon: 'edit_note', count: counts.articles, href: '/admin/articles' },
    { key: 'scholars', label: 'المشايخ', icon: 'person', count: counts.scholars, href: '/admin/scholars' },
    { key: 'fatwas', label: 'الفتاوى', icon: 'quiz', count: counts.fatwas, href: '/admin/fatwas' },
    { key: 'library', label: 'المكتبة', icon: 'menu_book', count: counts.library, href: '/admin/library' },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-cream">
      <header className="border-b border-outline-variant/40 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-deep-sea">
              <span className="material-symbols-outlined text-white">shield_person</span>
            </span>
            <div>
              <p className="font-bold text-deep-sea">لوحة التحكم</p>
              <p className="text-xs text-earth-brown">{email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 rounded-lg border border-outline-variant/60 px-4 py-2 text-sm text-ink-text transition-colors hover:bg-cream"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            خروج
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="text-lg font-bold text-deep-sea">إدارة المحتوى</h2>
        <p className="mt-1 text-sm text-earth-brown">اختر القسم الذي تريد إدارته</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((s) => (
            <a
              key={s.key}
              href={s.href}
              className="rounded-2xl border border-outline-variant/40 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-cream text-deep-sea">
                <span className="material-symbols-outlined text-2xl">{s.icon}</span>
              </span>
              <p className="mt-4 text-lg font-bold text-deep-sea">{s.label}</p>
              <p className="mt-1 text-sm text-earth-brown">{s.count} عنصر</p>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
