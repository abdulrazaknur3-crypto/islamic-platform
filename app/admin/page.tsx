import { redirect } from 'next/navigation'
import { Clock3, FileCheck2, FilePlus2, Users } from 'lucide-react'
import { AdminShell } from '@/components/admin/admin-shell'
import { RequestTable, type AdminRequestRow } from '@/components/admin/request-table'
import { createClient, hasSupabaseConfig } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  if (!hasSupabaseConfig()) redirect('/admin/login')

  const supabase = await createClient()
  const { data: authData } = await supabase.auth.getUser()
  if (!authData.user) redirect('/admin/login')

  const [{ data: profile }, { data: requestRows }] = await Promise.all([
    supabase.from('profiles').select('full_name,role').eq('id', authData.user.id).maybeSingle(),
    supabase.from('requests').select('id,tracking_code,customer_name,phone,city,service_code,status,priority,source,created_at').order('created_at', { ascending: false }).limit(20),
  ])

  const rows = (requestRows || []) as AdminRequestRow[]
  const newCount = rows.filter((row) => row.status === 'new').length
  const inProgress = rows.filter((row) => ['under_review', 'in_progress'].includes(row.status)).length
  const waiting = rows.filter((row) => row.status === 'waiting_customer').length
  const completed = rows.filter((row) => row.status === 'completed').length

  const cards = [
    [FilePlus2, 'طلبات جديدة', newCount, 'bg-blue-50 text-blue-700'],
    [Clock3, 'قيد التنفيذ', inProgress, 'bg-amber-50 text-amber-700'],
    [Users, 'بانتظار العميل', waiting, 'bg-orange-50 text-orange-700'],
    [FileCheck2, 'مكتملة', completed, 'bg-emerald-50 text-emerald-700'],
  ] as const

  return (
    <AdminShell role={profile?.role === 'admin' ? 'المدير العام' : profile?.role || 'موظف'}>
      <section className="rounded-[24px] bg-gradient-to-l from-[#0a664c] via-[#0a4b45] to-[#123b5a] p-6 text-white shadow-lg sm:p-8">
        <div className="text-xs font-semibold text-[#f2d680]">لوحة العمليات</div>
        <h1 className="mt-2 text-3xl font-bold">مرحبًا {profile?.full_name || 'أبو مشاري'} 👋</h1>
        <p className="mt-2 text-sm text-white/70">من هنا تستقبل الطلبات وتتابع الحالات وتدير أخبار الشريط المتحرك.</p>
      </section>
      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(([Icon, label, value, style]) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between"><div><div className="text-xs font-semibold text-slate-500">{label}</div><div className="mt-2 text-3xl font-bold text-[#0b2a4a]">{value}</div></div><div className={`grid h-11 w-11 place-items-center rounded-xl ${style}`}><Icon className="h-5 w-5" /></div></div></div>)}
      </section>
      <section className="mt-6"><RequestTable rows={rows} /></section>
    </AdminShell>
  )
}
