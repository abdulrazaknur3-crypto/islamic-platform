'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/src/supabase-browser';
import { useAdminGuard } from '../use-admin-guard';
import { Field, TextArea, Toggle, ImageUpload, ScholarSelect } from '../components';
import { AdminShell, empty } from '../shell';

type Article = {
  id: string;
  title_ar: string; title_en: string; title_ti: string;
  excerpt_ar: string | null; excerpt_en: string | null; excerpt_ti: string | null;
  body_ar: string | null; body_en: string | null; body_ti: string | null;
  scholar_id: string | null;
  image_url: string | null;
  read_minutes: number | null;
  is_featured: boolean;
  is_published: boolean;
  published_at: string | null;
};

const blank = {
  title_ar: '', title_en: '', title_ti: '',
  excerpt_ar: '', excerpt_en: '', excerpt_ti: '',
  body_ar: '', body_en: '', body_ti: '',
  scholar_id: '', image_url: '', read_minutes: '10',
  is_featured: false, is_published: false,
};

export default function ArticlesAdmin() {
  const ready = useAdminGuard();
  const [rows, setRows] = useState<Article[]>([]);
  const [scholars, setScholars] = useState<{ id: string; name_ar: string }[]>([]);
  const [editing, setEditing] = useState<(typeof blank & { id?: string }) | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const supabase = createClient();
    const [a, s] = await Promise.all([
      supabase.from('articles').select('*').order('published_at', { ascending: false }),
      supabase.from('scholars').select('id,name_ar').order('name_ar'),
    ]);
    setRows((a.data as Article[]) ?? []);
    setScholars((s.data as { id: string; name_ar: string }[]) ?? []);
  }, []);

  useEffect(() => { if (ready) load(); }, [ready, load]);

  async function save() {
    if (!editing) return;
    setSaving(true);
    const supabase = createClient();
    const payload = {
      title_ar: editing.title_ar, title_en: editing.title_en, title_ti: editing.title_ti,
      excerpt_ar: empty(editing.excerpt_ar), excerpt_en: empty(editing.excerpt_en), excerpt_ti: empty(editing.excerpt_ti),
      body_ar: empty(editing.body_ar), body_en: empty(editing.body_en), body_ti: empty(editing.body_ti),
      scholar_id: editing.scholar_id || null,
      image_url: empty(editing.image_url),
      read_minutes: editing.read_minutes ? parseInt(editing.read_minutes) : null,
      is_featured: editing.is_featured,
      is_published: editing.is_published,
      published_at: editing.is_published ? new Date().toISOString() : null,
    };
    if (editing.id) {
      await supabase.from('articles').update(payload).eq('id', editing.id);
    } else {
      await supabase.from('articles').insert(payload);
    }
    setSaving(false);
    setEditing(null);
    load();
  }

  async function remove(id: string) {
    if (!confirm('هل تريد حذف هذا المقال؟')) return;
    const supabase = createClient();
    await supabase.from('articles').delete().eq('id', id);
    load();
  }

  if (!ready) return null;

  return (
    <AdminShell title="المقالات" onAdd={() => setEditing({ ...blank })}>
      {editing ? (
        <div className="space-y-4 rounded-2xl border border-outline-variant/40 bg-white p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="العنوان (عربي)" value={editing.title_ar} dir="rtl" onChange={(v) => setEditing({ ...editing, title_ar: v })} />
            <Field label="العنوان (إنجليزي)" value={editing.title_en} dir="ltr" onChange={(v) => setEditing({ ...editing, title_en: v })} />
            <Field label="العنوان (تجريني)" value={editing.title_ti} dir="ltr" onChange={(v) => setEditing({ ...editing, title_ti: v })} />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <TextArea label="المقتطف (عربي)" value={editing.excerpt_ar} dir="rtl" rows={2} onChange={(v) => setEditing({ ...editing, excerpt_ar: v })} />
            <TextArea label="المقتطف (إنجليزي)" value={editing.excerpt_en} dir="ltr" rows={2} onChange={(v) => setEditing({ ...editing, excerpt_en: v })} />
            <TextArea label="المقتطف (تجريني)" value={editing.excerpt_ti} dir="ltr" rows={2} onChange={(v) => setEditing({ ...editing, excerpt_ti: v })} />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <TextArea label="المتن (عربي)" value={editing.body_ar} dir="rtl" rows={6} onChange={(v) => setEditing({ ...editing, body_ar: v })} />
            <TextArea label="المتن (إنجليزي)" value={editing.body_en} dir="ltr" rows={6} onChange={(v) => setEditing({ ...editing, body_en: v })} />
            <TextArea label="المتن (تجريني)" value={editing.body_ti} dir="ltr" rows={6} onChange={(v) => setEditing({ ...editing, body_ti: v })} />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <ScholarSelect label="الشيخ" value={editing.scholar_id} scholars={scholars} onChange={(v) => setEditing({ ...editing, scholar_id: v })} />
            <Field label="دقائق القراءة" type="number" value={editing.read_minutes} dir="ltr" onChange={(v) => setEditing({ ...editing, read_minutes: v })} />
            <ImageUpload label="صورة المقال" bucket="article-images" value={editing.image_url} onChange={(url) => setEditing({ ...editing, image_url: url })} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Toggle label="مقال مميز (في الرئيسية)" checked={editing.is_featured} onChange={(v) => setEditing({ ...editing, is_featured: v })} />
            <Toggle label="منشور" checked={editing.is_published} onChange={(v) => setEditing({ ...editing, is_published: v })} />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={save} disabled={saving || !editing.title_ar} className="rounded-lg bg-deep-sea px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-50">
              {saving ? 'جارٍ الحفظ...' : 'حفظ'}
            </button>
            <button onClick={() => setEditing(null)} className="rounded-lg border border-outline-variant/60 px-6 py-2.5 text-sm text-ink-text">إلغاء</button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {rows.length === 0 && <p className="text-sm text-earth-brown">لا توجد مقالات بعد.</p>}
          {rows.map((r) => (
            <div key={r.id} className="flex items-center justify-between rounded-xl border border-outline-variant/40 bg-white p-4">
              <div>
                <p className="text-sm font-semibold text-deep-sea">{r.title_ar}</p>
                <p className="text-xs text-earth-brown">
                  {r.is_published ? 'منشور' : 'مسودة'} {r.is_featured && '• مميز'}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditing({ id: r.id, title_ar: r.title_ar, title_en: r.title_en, title_ti: r.title_ti, excerpt_ar: r.excerpt_ar ?? '', excerpt_en: r.excerpt_en ?? '', excerpt_ti: r.excerpt_ti ?? '', body_ar: r.body_ar ?? '', body_en: r.body_en ?? '', body_ti: r.body_ti ?? '', scholar_id: r.scholar_id ?? '', image_url: r.image_url ?? '', read_minutes: String(r.read_minutes ?? ''), is_featured: r.is_featured, is_published: r.is_published })} className="rounded-lg border border-outline-variant/60 px-3 py-1.5 text-xs text-ink-text hover:bg-cream">تعديل</button>
                <button onClick={() => remove(r.id)} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50">حذف</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
