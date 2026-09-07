'use client'

import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function LogoutButton() {
  const router = useRouter()
  return <button onClick={async () => { const supabase = createClient(); await supabase.auth.signOut(); router.replace('/admin/login'); router.refresh() }} className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-white/10"><LogOut className="h-4 w-4" /> تسجيل الخروج</button>
}
