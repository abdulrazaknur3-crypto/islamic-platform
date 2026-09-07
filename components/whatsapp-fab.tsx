import { MessageCircle } from 'lucide-react'
import { WHATSAPP_NUMBER } from '@/lib/data'

export function WhatsAppFab() {
  return (
    <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" aria-label="تواصل عبر واتساب" className="pulse-ring fixed bottom-5 left-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#10a866] text-white shadow-[0_14px_34px_rgba(16,168,102,.35)] transition hover:scale-105">
      <MessageCircle className="h-6 w-6" />
    </a>
  )
}
