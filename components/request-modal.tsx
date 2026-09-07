'use client'

import { useEffect, useMemo, useState } from 'react'
import { CheckCircle2, Loader2, MessageCircle, Send, X } from 'lucide-react'
import { services, WHATSAPP_NUMBER } from '@/lib/data'

export function RequestModal({
  open,
  onClose,
  initialService = '',
}: {
  open: boolean
  onClose: () => void
  initialService?: string
}) {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState<string | null>(null)
  const [service, setService] = useState(initialService)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [details, setDetails] = useState('')

  useEffect(() => {
    if (open) {
      setSubmitted(null)
      setService(initialService)
    }
  }, [open, initialService])

  const selectedService = useMemo(
    () => services.find((item) => item.id === service)?.name || 'خدمة أخرى',
    [service],
  )

  if (!open) return null

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    let trackingCode = ''
    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, city, service, details, source: 'website' }),
      })
      const result = (await response.json()) as { trackingCode?: string }
      trackingCode = result.trackingCode || ''
    } catch {
      // WhatsApp remains the resilient fallback channel.
    }

    setSubmitted(trackingCode || 'WHATSAPP')
    setLoading(false)

    const text = [
      'السلام عليكم، أرغب في طلب خدمة عبر موقع إنجازك.',
      `الاسم: ${name}`,
      `الجوال: ${phone}`,
      `المدينة: ${city}`,
      `الخدمة: ${selectedService}`,
      `تفاصيل مختصرة: ${details}`,
      trackingCode ? `رقم الطلب: ${trackingCode}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-[#071d2f]/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="طلب خدمة">
      <div className="relative max-h-[92vh] w-full max-w-[620px] overflow-y-auto rounded-[28px] bg-white p-6 shadow-2xl sm:p-8">
        <button onClick={onClose} className="absolute left-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200" aria-label="إغلاق">
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="py-10 text-center">
            <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" />
            <h2 className="mt-5 text-2xl font-bold text-[#0b2a4a]">تم تجهيز طلبك</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-600">تم فتح واتساب لإرسال التفاصيل مباشرة إلى فريق إنجازك. {submitted !== 'WHATSAPP' ? `رقم طلبك: ${submitted}` : ''}</p>
            <button onClick={onClose} className="mt-7 rounded-xl bg-[#0b2a4a] px-6 py-3 text-sm font-bold text-white">إغلاق</button>
          </div>
        ) : (
          <>
            <div className="pe-12">
              <span className="inline-flex rounded-full bg-[#fff4d6] px-3 py-1 text-xs font-bold text-[#8a641d]">ابدأ من هنا</span>
              <h2 className="mt-3 text-2xl font-bold text-[#0b2a4a]">اطلب خدمتك</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">بيانات قليلة فقط لتصل رسالتك للفريق بشكل منظم وواضح.</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-7 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-[#173d60]">
                الاسم
                <input required value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#d4a94f] focus:bg-white" placeholder="الاسم الكامل" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-[#173d60]">
                رقم الجوال
                <input required inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#d4a94f] focus:bg-white" placeholder="05xxxxxxxx" dir="ltr" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-[#173d60]">
                المدينة
                <input required value={city} onChange={(e) => setCity(e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#d4a94f] focus:bg-white" placeholder="مثال: الرياض" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-[#173d60]">
                نوع الخدمة
                <select required value={service} onChange={(e) => setService(e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#d4a94f] focus:bg-white">
                  <option value="">اختر الخدمة</option>
                  {services.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-semibold text-[#173d60] sm:col-span-2">
                وصف مختصر للمعاملة
                <textarea required rows={4} value={details} onChange={(e) => setDetails(e.target.value)} className="resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#d4a94f] focus:bg-white" placeholder="اشرح لنا المطلوب باختصار..." />
              </label>
              <button disabled={loading} className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#07834e] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-[#056f43] disabled:opacity-60 sm:col-span-2">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MessageCircle className="h-4 w-4" />}
                {loading ? 'جاري تجهيز الطلب...' : 'إرسال ومتابعة عبر واتساب'}
                {!loading && <Send className="h-4 w-4" />}
              </button>
              <p className="text-center text-[11px] leading-5 text-slate-400 sm:col-span-2">إرسال الطلب لا يعني قبول أو ضمان إنجاز أي إجراء من جهة حكومية؛ تتم مراجعة المتطلبات أولًا.</p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
