'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/src/supabase-browser';
import { useAdminGuard } from '../use-admin-guard';
import { Field, TextArea, Toggle, ScholarSelect } from '../components';
import { AdminShell, empty } from '../shell';

type Item = {
  id: string;
  type: string;
  title_ar: string; title_en: string; title_ti: string;
  description_ar: string | null; description_en: string | null; description_ti: string | null;
  scholar_id: string | null;
  file_url: string | null;
  youtube_id: string | null;
  duration_display: string | null;
  is_published: boolean;
};

const blank = {
  type: 'book',
  title_ar: '', title_en: '', title_ti: '',
  description_ar: '', description_en: '', description_ti: '',
  scholar_id: '', file_url: '', youtube_id: '', duration_display: '',
  is_published: false,
};

const typeLabels: Record<string, string> = { book: 'كتاب', audio: 'صوت', video: 'فيديو' };

export default function LibraryAdmin() {
  const ready = useAdminGuard();
  const [rows, setRows] = useState<Item[]>([]);
  const [scholars, setScholars] = useState<{ id: string; name_ar: string }[]>([]);
  const [editing, setEditing] = useState<(typeof blank & { id?: string }) | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const supabase = createClient();
    const [i, s] = await Promise.all([
      supabase.from('library_items').select('*').order('published_at', { ascending: false }),
      supabase.from('scholars').select('id,name_ar').order('name_ar'),
    ]);
    setRows((i.data as Item[]) ?? []);
    setScholars((s.data as { id: string; name_ar: string }[]) ?? []);
  }, []);

  useEffect(() => { if (ready) load(); }, [ready, load]);

  async function save() {
    if (!editing) return;
    setSaving(true);
    const supabase = createClient();
    const payload = {
      type: editing.type,
      title_ar: editing.title_ar, title_en: editing.title_en, title_ti: editing.title_ti,
      description_ar: empty(editing.description_ar), description_en: empty(editing.description_en), description_ti: empty(editing.description_ti),
      scholar_id: editing.scholar_id || null,
      file_url: empty(editing.file_url),
      youtube_id: empty(editing.youtube_id),
      duration_display: empty(editing.duration_display),
      is_published: editing.is_published,
      published_at: editing.is_published ? new Date().toISOString() : null,
    };
    if (editing.id) await supabase.from('library_items').update(payload).eq('id', editing.id);
    else await supabase.from('library_items').insert(payload);
    setSaving(false);
    setEditing(null);
    load();
  }

  async function remove(id: string) {
    if (!confirm('هل تريد حذف هذه المادة؟')) return;
    const supabase = createClient();
    await supabase.from('library_items').delete().eq('id', id);
    load();
  }

  if (!ready) return null;

  return (
    <AdminShell title="المكتبة" onAdd={() => setEditing({ ...blank })}>
      {editing ? (
        <div className="space-y-4 rounded-2xl border border-outline-variant/40 bg-white p-6">
          <div>
            <label className="text-sm font-medium text-ink-text">النوع</label>
            <select value={editing.type} onChange={(e) => setEditing({ ...editing, type: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/60 bg-white px-4 py-2.5 text-sm outline-none focus:border-shore-blue">
              <option value="book">كتاب</option>
              <option value="audio">صوت</option>
              <option value="video">فيديو</option>
            </select>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="العنوان (عربي)" value={editing.title_ar} dir="rtl" onChange={(v) => setEditing({ ...editing, title_ar: v })} />
            <Field label="العنوان (إنجليزي)" value={editing.title_en} dir="ltr" onChange={(v) => setEditing({ ...editing, title_en: v })} />
            <Field label="العنوان (تجريني)" value={editing.title_ti} dir="ltr" onChange={(v) => setEditing({ ...editing, title_ti: v })} />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <TextArea label="الوصف (عربي)" value={editing.description_ar} dir="rtl" rows={2} onChange={(v) => setEditing({ ...editing, description_ar: v })} />
            <TextArea label="الوصف (إنجليزي)" value={editing.description_en} dir="ltr" rows={2} onChange={(v) => setEditing({ ...editing, description_en: v })} />
            <TextArea label="الوصف (تجريني)" value={editing.description_ti} dir="ltr" rows={2} onChange={(v) => setEditing({ ...editing, description_ti: v })} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <ScholarSelect label="الشيخ" value={editing.scholar_id} scholars={scholars} onChange={(v) => setEditing({ ...editing, scholar_id: v })} />
            <Field label="المدة (مثل 45:12)" value={editing.duration_display} dir="ltr" onChange={(v) => setEditing({ ...editing, duration_display: v })} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="رابط الملف (للكتب/الصوت)" value={editing.file_url} dir="ltr" onChange={(v) => setEditing({ ...editing, file_url: v })} />
            <Field label="معرّف يوتيوب (للفيديو)" value={editing.youtube_id} dir="ltr" onChange={(v) => setEditing({ ...editing, youtube_id: v })} />
          </div>
          <Toggle label="منشور" checked={editing.is_published} onChange={(v) => setEditing({ ...editing, is_published: v })} />
          <div className="flex gap-3 pt-2">
            <button onClick={save} disabled={saving || !editing.title_ar} className="rounded-lg bg-deep-sea px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-50">
              {saving ? 'جارٍ الحفظ...' : 'حفظ'}
            </button>
            <button onClick={() => setEditing(null)} className="rounded-lg border border-outline-variant/60 px-6 py-2.5 text-sm text-ink-text">إلغاء</button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {rows.length === 0 && <p className="text-sm text-earth-brown">لا توجد مواد بعد.</p>}
          {rows.map((r) => (
            <div key={r.id} className="flex items-center justify-between rounded-xl border border-outline-variant/40 bg-white p-4">
              <div>
                <p className="text-sm font-semibold text-deep-sea">{r.title_ar}</p>
                <p className="text-xs text-earth-brown">{typeLabels[r.type] ?? r.type} • {r.is_published ? 'منشور' : 'مسودة'}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditing({ id: r.id, type: r.type, title_ar: r.title_ar, title_en: r.title_en, title_ti: r.title_ti, description_ar: r.description_ar ?? '', description_en: r.description_en ?? '', description_ti: r.description_ti ?? '', scholar_id: r.scholar_id ?? '', file_url: r.file_url ?? '', youtube_id: r.youtube_id ?? '', duration_display: r.duration_display ?? '', is_published: r.is_published })} className="rounded-lg border border-outline-variant/60 px-3 py-1.5 text-xs text-ink-text hover:bg-cream">تعديل</button>
                <button onClick={() => remove(r.id)} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50">حذف</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
