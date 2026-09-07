'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LockKeyhole, Loader2, LogIn, Mail } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const supabase = createClient()
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
      if (signInError) throw signInError
      router.replace('/admin')
      router.refresh()
    } catch {
      setError('تعذر تسجيل الدخول. تحقق من البريد وكلمة المرور.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="mt-7 grid gap-4">
      <label className="grid gap-2 text-sm font-semibold text-[#173d60]">البريد الإلكتروني
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-[#d4a94f] focus-within:bg-white"><Mail className="h-4 w-4 text-slate-400" /><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent py-3 outline-none" dir="ltr" /></div>
      </label>
      <label className="grid gap-2 text-sm font-semibold text-[#173d60]">كلمة المرور
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-[#d4a94f] focus-within:bg-white"><LockKeyhole className="h-4 w-4 text-slate-400" /><input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-transparent py-3 outline-none" dir="ltr" /></div>
      </label>
      {error && <div className="rounded-xl bg-red-50 px-4 py-3 text-xs font-semibold text-red-700">{error}</div>}
      <button disabled={loading} className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#0b2a4a] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#173d60] disabled:opacity-60">{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />} دخول لوحة التحكم</button>
    </form>
  )
}
