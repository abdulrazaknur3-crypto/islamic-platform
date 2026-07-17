'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/src/supabase-browser';
import { useAdminGuard } from '../use-admin-guard';
import { Field, TextArea, Toggle, ScholarSelect } from '../components';
import { AdminShell, empty } from '../shell';

type Fatwa = {
  id: string;
  category: string;
  question_ar: string | null; question_en: string | null; question_ti: string | null;
  answer_ar: string | null; answer_en: string | null; answer_ti: string | null;
  scholar_id: string | null;
  is_published: boolean;
};

const blank = {
  category: 'general',
  question_ar: '', question_en: '', question_ti: '',
  answer_ar: '', answer_en: '', answer_ti: '',
  scholar_id: '', is_published: false,
};

export default function FatwasAdmin() {
  const ready = useAdminGuard();
  const [rows, setRows] = useState<Fatwa[]>([]);
  const [scholars, setScholars] = useState<{ id: string; name_ar: string }[]>([]);
  const [editing, setEditing] = useState<(typeof blank & { id?: string }) | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const supabase = createClient();
    const [f, s] = await Promise.all([
      supabase.from('fatwas').select('*').order('published_at', { ascending: false }),
      supabase.from('scholars').select('id,name_ar').order('name_ar'),
    ]);
    setRows((f.data as Fatwa[]) ?? []);
    setScholars((s.data as { id: string; name_ar: string }[]) ?? []);
  }, []);

  useEffect(() => { if (ready) load(); }, [ready, load]);

  async function save() {
    if (!editing) return;
    setSaving(true);
    const supabase = createClient();
    const payload = {
      category: editing.category || 'general',
      question_ar: empty(editing.question_ar), question_en: empty(editing.question_en), question_ti: empty(editing.question_ti),
      answer_ar: empty(editing.answer_ar), answer_en: empty(editing.answer_en), answer_ti: empty(editing.answer_ti),
      scholar_id: editing.scholar_id || null,
      is_published: editing.is_published,
      published_at: editing.is_published ? new Date().toISOString() : null,
    };
    if (editing.id) await supabase.from('fatwas').update(payload).eq('id', editing.id);
    else await supabase.from('fatwas').insert(payload);
    setSaving(false);
    setEditing(null);
    load();
  }

  async function remove(id: string) {
    if (!confirm('هل تريد حذف هذه الفتوى؟')) return;
    const supabase = createClient();
    await supabase.from('fatwas').delete().eq('id', id);
    load();
  }

  if (!ready) return null;

  return (
    <AdminShell title="الفتاوى" onAdd={() => setEditing({ ...blank })}>
      {editing ? (
        <div className="space-y-4 rounded-2xl border border-outline-variant/40 bg-white p-6">
          <Field label="التصنيف" value={editing.category} dir="rtl" onChange={(v) => setEditing({ ...editing, category: v })} />
          <div className="grid gap-4 sm:grid-cols-3">
            <TextArea label="السؤال (عربي)" value={editing.question_ar} dir="rtl" rows={3} onChange={(v) => setEditing({ ...editing, question_ar: v })} />
            <TextArea label="السؤال (إنجليزي)" value={editing.question_en} dir="ltr" rows={3} onChange={(v) => setEditing({ ...editing, question_en: v })} />
            <TextArea label="السؤال (تجريني)" value={editing.question_ti} dir="ltr" rows={3} onChange={(v) => setEditing({ ...editing, question_ti: v })} />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <TextArea label="الجواب (عربي)" value={editing.answer_ar} dir="rtl" rows={5} onChange={(v) => setEditing({ ...editing, answer_ar: v })} />
            <TextArea label="الجواب (إنجليزي)" value={editing.answer_en} dir="ltr" rows={5} onChange={(v) => setEditing({ ...editing, answer_en: v })} />
            <TextArea label="الجواب (تجريني)" value={editing.answer_ti} dir="ltr" rows={5} onChange={(v) => setEditing({ ...editing, answer_ti: v })} />
          </div>
          <ScholarSelect label="الشيخ المجيب" value={editing.scholar_id} scholars={scholars} onChange={(v) => setEditing({ ...editing, scholar_id: v })} />
          <Toggle label="منشور" checked={editing.is_published} onChange={(v) => setEditing({ ...editing, is_published: v })} />
          <div className="flex gap-3 pt-2">
            <button onClick={save} disabled={saving || !editing.question_ar} className="rounded-lg bg-deep-sea px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-50">
              {saving ? 'جارٍ الحفظ...' : 'حفظ'}
            </button>
            <button onClick={() => setEditing(null)} className="rounded-lg border border-outline-variant/60 px-6 py-2.5 text-sm text-ink-text">إلغاء</button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {rows.length === 0 && <p className="text-sm text-earth-brown">لا توجد فتاوى بعد.</p>}
          {rows.map((r) => (
            <div key={r.id} className="flex items-center justify-between rounded-xl border border-outline-variant/40 bg-white p-4">
              <div>
                <p className="text-sm font-semibold text-deep-sea line-clamp-1">{r.question_ar}</p>
                <p className="text-xs text-earth-brown">{r.category} • {r.is_published ? 'منشور' : 'مسودة'}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditing({ id: r.id, category: r.category, question_ar: r.question_ar ?? '', question_en: r.question_en ?? '', question_ti: r.question_ti ?? '', answer_ar: r.answer_ar ?? '', answer_en: r.answer_en ?? '', answer_ti: r.answer_ti ?? '', scholar_id: r.scholar_id ?? '', is_published: r.is_published })} className="rounded-lg border border-outline-variant/60 px-3 py-1.5 text-xs text-ink-text hover:bg-cream">تعديل</button>
                <button onClick={() => remove(r.id)} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50">حذف</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
