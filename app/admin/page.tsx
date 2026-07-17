'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/src/supabase-browser';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setError('');
    setLoading(true);
    const supabase = createClient();
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (authError || !data.user) {
      setError('البريد أو كلمة المرور غير صحيحة');
      setLoading(false);
      return;
    }
    // التحقق من كونه مشرفًا
    const { data: admin } = await supabase
      .from('admins')
      .select('user_id')
      .eq('user_id', data.user.id)
      .maybeSingle();
    if (!admin) {
      await supabase.auth.signOut();
      setError('هذا الحساب ليس لديه صلاحية الدخول');
      setLoading(false);
      return;
    }
    router.push('/admin/dashboard');
    router.refresh();
  }

  return (
    <div dir="rtl" className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="w-full max-w-sm rounded-2xl border border-outline-variant/40 bg-white p-8 shadow-sm">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-deep-sea">
            <span className="material-symbols-outlined text-3xl text-white">shield_person</span>
          </div>
          <h1 className="mt-4 text-xl font-bold text-deep-sea">لوحة تحكم المنصة</h1>
          <p className="mt-1 text-sm text-earth-brown">تسجيل دخول المشرفين</p>
        </div>

        <div className="mt-8 space-y-4">
          <div>
            <label className="text-sm font-medium text-ink-text">البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="mt-1 w-full rounded-lg border border-outline-variant/60 bg-white px-4 py-2.5 text-sm outline-none focus:border-shore-blue"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-ink-text">كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="mt-1 w-full rounded-lg border border-outline-variant/60 bg-white px-4 py-2.5 text-sm outline-none focus:border-shore-blue"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded-lg bg-deep-sea py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'جارٍ الدخول...' : 'دخول'}
          </button>
        </div>
      </div>
    </div>
  );
}
