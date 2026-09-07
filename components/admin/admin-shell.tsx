import { BarChart3, Bell, FileText, Home, MessageSquareText, Newspaper, Settings, Users, UserRoundCog } from 'lucide-react'
import { BrandMark } from '@/components/brand-mark'
import { LogoutButton } from '@/components/admin/logout-button'

const nav = [
  [Home, 'الرئيسية'], [FileText, 'الطلبات'], [Users, 'العملاء'], [Newspaper, 'الأخبار'],
  [MessageSquareText, 'الرسائل'], [BarChart3, 'التقارير'], [UserRoundCog, 'الموظفون'], [Settings, 'الإعدادات'],
] as const

export function AdminShell({ children, role = 'المدير العام' }: { children: React.ReactNode; role?: string }) {
  return (
    <main className="min-h-screen bg-[#f4f7f9] lg:pe-[260px]">
      <aside className="fixed inset-y-0 right-0 z-30 hidden w-[260px] flex-col bg-gradient-to-b from-[#0b2f49] to-[#071f31] p-5 text-white lg:flex">
        <BrandMark inverse />
        <nav className="mt-10 grid gap-1.5">
          {nav.map(([Icon, label], index) => <div key={label} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold ${index === 1 ? 'bg-[#0a8b58] text-white' : 'text-white/70 hover:bg-white/5'}`}><Icon className="h-4 w-4" /> {label}</div>)}
        </nav>
        <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-full bg-[#f0d27b] font-bold text-[#0b2a4a]">أم</div><div><div className="text-sm font-bold">أبو مشاري</div><div className="text-[11px] text-white/50">{role}</div></div></div>
          <div className="mt-3 border-t border-white/10 pt-2"><LogoutButton /></div>
        </div>
      </aside>
      <div className="min-h-screen">
        <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur sm:px-8">
          <div><div className="text-lg font-bold text-[#0b2a4a]">استقبال الطلبات</div><div className="text-[11px] text-slate-400">إنجازك / لوحة العمليات</div></div>
          <div className="flex items-center gap-3"><button className="relative grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-[#0b2a4a]"><Bell className="h-4 w-4" /><span className="absolute -left-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-red-500 text-[9px] font-bold text-white">3</span></button><div className="hidden text-left sm:block"><div className="text-xs font-bold text-[#0b2a4a]">أبو مشاري</div><div className="text-[10px] text-slate-400">متصل الآن</div></div></div>
        </header>
        <div className="p-5 sm:p-8">{children}</div>
      </div>
    </main>
  )
}
