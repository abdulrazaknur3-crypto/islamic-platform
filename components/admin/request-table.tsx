import { MessageCircle, MoreHorizontal } from 'lucide-react'

export type AdminRequestRow = {
  id: string
  tracking_code: string
  customer_name: string
  phone: string
  city: string
  service_code: string
  status: string
  priority: string
  source: string
  created_at: string
}

const statusLabels: Record<string, string> = {
  new: 'جديد',
  under_review: 'قيد المراجعة',
  waiting_customer: 'بانتظار العميل',
  in_progress: 'قيد التنفيذ',
  completed: 'مكتمل',
  cancelled: 'ملغي',
}

const statusStyles: Record<string, string> = {
  new: 'bg-blue-50 text-blue-700',
  under_review: 'bg-amber-50 text-amber-700',
  waiting_customer: 'bg-orange-50 text-orange-700',
  in_progress: 'bg-violet-50 text-violet-700',
  completed: 'bg-emerald-50 text-emerald-700',
  cancelled: 'bg-slate-100 text-slate-500',
}

export function RequestTable({ rows }: { rows: AdminRequestRow[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><div><h2 className="text-base font-bold text-[#0b2a4a]">آخر الطلبات</h2><p className="mt-1 text-[11px] text-slate-400">الواردة من الموقع وواتساب</p></div><button className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-[#0b2a4a]">عرض الكل</button></div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[920px] text-right text-xs">
          <thead className="bg-[#f8fafb] text-[#587084]"><tr><th className="px-4 py-3">رقم الطلب</th><th className="px-4 py-3">العميل</th><th className="px-4 py-3">الخدمة</th><th className="px-4 py-3">المدينة</th><th className="px-4 py-3">الحالة</th><th className="px-4 py-3">المصدر</th><th className="px-4 py-3">التاريخ</th><th className="px-4 py-3">إجراء</th></tr></thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-slate-100 text-[#24445c] hover:bg-slate-50/70">
                <td className="px-4 py-3 font-semibold" dir="ltr">{row.tracking_code}</td>
                <td className="px-4 py-3"><div className="font-bold text-[#0b2a4a]">{row.customer_name}</div><div className="mt-1 text-[10px] text-slate-400" dir="ltr">{row.phone}</div></td>
                <td className="px-4 py-3">{row.service_code}</td>
                <td className="px-4 py-3">{row.city}</td>
                <td className="px-4 py-3"><span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyles[row.status] || 'bg-slate-100 text-slate-600'}`}>{statusLabels[row.status] || row.status}</span></td>
                <td className="px-4 py-3">{row.source === 'website' ? 'الموقع' : row.source}</td>
                <td className="px-4 py-3 text-slate-500">{new Intl.DateTimeFormat('ar-SA', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(row.created_at))}</td>
                <td className="px-4 py-3"><div className="flex items-center gap-2"><a href={`https://wa.me/${row.phone.replace(/\D/g, '').replace(/^0/, '966')}`} target="_blank" rel="noreferrer" className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-50 text-emerald-700"><MessageCircle className="h-4 w-4" /></a><button className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-slate-600"><MoreHorizontal className="h-4 w-4" /></button></div></td>
              </tr>
            ))}
            {!rows.length && <tr><td colSpan={8} className="px-6 py-16 text-center text-sm text-slate-400">لا توجد طلبات حتى الآن.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
