import { NextResponse } from 'next/server'
import { createClient, hasSupabaseConfig } from '@/lib/supabase/server'

function clean(value: unknown, max = 500) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function trackingCode() {
  const now = new Date()
  const stamp = now.toISOString().slice(2, 10).replaceAll('-', '')
  const random = Math.floor(1000 + Math.random() * 9000)
  return `ANG-${stamp}-${random}`
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null
  if (!body) return NextResponse.json({ error: 'invalid_request' }, { status: 400 })

  const payload = {
    customer_name: clean(body.name, 120),
    phone: clean(body.phone, 30),
    city: clean(body.city, 80),
    service_code: clean(body.service, 80),
    details: clean(body.details, 1500),
    source: clean(body.source, 40) || 'website',
  }

  if (!payload.customer_name || !payload.phone || !payload.city || !payload.service_code || !payload.details) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 400 })
  }

  const code = trackingCode()

  if (!hasSupabaseConfig()) {
    return NextResponse.json({ trackingCode: code, persisted: false }, { status: 202 })
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.from('requests').insert({
      tracking_code: code,
      ...payload,
      status: 'new',
      priority: 'normal',
    })

    if (error) {
      console.error('request_insert_failed', error.message)
      return NextResponse.json({ trackingCode: code, persisted: false }, { status: 202 })
    }

    return NextResponse.json({ trackingCode: code, persisted: true }, { status: 201 })
  } catch (error) {
    console.error('request_insert_exception', error)
    return NextResponse.json({ trackingCode: code, persisted: false }, { status: 202 })
  }
}
