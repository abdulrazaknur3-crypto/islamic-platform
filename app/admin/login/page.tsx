import { BrandMark } from '@/components/brand-mark'
import { LoginForm } from '@/components/admin/login-form'
import { hasSupabaseConfig } from '@/lib/supabase/server'

export default function AdminLoginPage() {
  const configured = hasSupabaseConfig()
  return (
    <main className="grid min-h-screen place-items-center bg-[#f5f8fa] p-4">
      <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_24px_70px_rgba(11,42,74,.10)] sm:p-9">
        <BrandMark />
        <div className="mt-8"><div className="text-xs font-bold text-[#b1842e]">منطقة الموظفين</div><h1 className="mt-2 text-2xl font-bold text-[#0b2a4a]">دخول أبو مشاري</h1><p className="mt-2 text-sm leading-6 text-slate-500">لوحة استقبال ومتابعة الطلبات وإدارة الأخبار.</p></div>
        {configured ? <LoginForm /> : <div className="mt-7 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-6 text-amber-800">لم يتم ربط مشروع Supabase بعد. الواجهة جاهزة، وسيتم تفعيل تسجيل الدخول بمجرد إضافة متغيرات البيئة.</div>}
      </div>
    </main>
  )
}
