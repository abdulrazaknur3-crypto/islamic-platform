'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/src/supabase-browser';
import { useAdminGuard } from '../use-admin-guard';
import { Field, TextArea, Toggle, ImageUpload } from '../components';
import { AdminShell, empty } from '../shell';

type Scholar = {
  id: string;
  name_ar: string;
  name_en: string;
  name_ti: string;
  bio_ar: string | null;
  bio_en: string | null;
  bio_ti: string | null;
  photo_url: string | null;
  is_active: boolean;
};

const blank = {
  name_ar: '',
  name_en: '',
  name_ti: '',
  bio_ar: '',
  bio_en: '',
  bio_ti: '',
  photo_url: '',
  is_active: true,
};

export default function ScholarsAdmin() {
  const ready = useAdminGuard();
  const [rows, setRows] = useState<Scholar[]>([]);
  const [editing, setEditing] = useState<typeof blank & { id?: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase.from('scholars').select('*').order('name_ar');
    setRows((data as Scholar[]) ?? []);
  }, []);

  useEffect(() => {
    if (ready) load();
  }, [ready, load]);

  async function save() {
    if (!editing) return;
    setSaving(true);
    const supabase = createClient();
    const payload = {
      name_ar: editing.name_ar,
      name_en: editing.name_en,
      name_ti: editing.name_ti,
      bio_ar: empty(editing.bio_ar),
      bio_en: empty(editing.bio_en),
      bio_ti: empty(editing.bio_ti),
      photo_url: empty(editing.photo_url),
      is_active: editing.is_active,
    };
    if (editing.id) {
      await supabase.from('scholars').update(payload).eq('id', editing.id);
    } else {
      await supabase.from('scholars').insert(payload);
    }
    setSaving(false);
    setEditing(null);
    load();
  }

  async function remove(id: string) {
    if (!confirm('هل تريد حذف هذا الشيخ؟')) return;
    const supabase = createClient();
    await supabase.from('scholars').delete().eq('id', id);
    load();
  }

  if (!ready) return null;

  return (
    <AdminShell title="المشايخ" onAdd={() => setEditing({ ...blank })}>
      {editing ? (
        <div className="space-y-4 rounded-2xl border border-outline-variant/40 bg-white p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="الاسم (عربي)" value={editing.name_ar} dir="rtl" onChange={(v) => setEditing({ ...editing, name_ar: v })} />
            <Field label="الاسم (إنجليزي)" value={editing.name_en} dir="ltr" onChange={(v) => setEditing({ ...editing, name_en: v })} />
            <Field label="الاسم (تجريني)" value={editing.name_ti} dir="ltr" onChange={(v) => setEditing({ ...editing, name_ti: v })} />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <TextArea label="نبذة (عربي)" value={editing.bio_ar} dir="rtl" rows={3} onChange={(v) => setEditing({ ...editing, bio_ar: v })} />
            <TextArea label="نبذة (إنجليزي)" value={editing.bio_en} dir="ltr" rows={3} onChange={(v) => setEditing({ ...editing, bio_en: v })} />
            <TextArea label="نبذة (تجريني)" value={editing.bio_ti} dir="ltr" rows={3} onChange={(v) => setEditing({ ...editing, bio_ti: v })} />
          </div>
          <ImageUpload label="صورة الشيخ" bucket="scholar-photos" value={editing.photo_url} onChange={(url) => setEditing({ ...editing, photo_url: url })} />
          <Toggle label="نشط (يظهر في الموقع)" checked={editing.is_active} onChange={(v) => setEditing({ ...editing, is_active: v })} />
          <div className="flex gap-3 pt-2">
            <button onClick={save} disabled={saving || !editing.name_ar} className="rounded-lg bg-deep-sea px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-50">
              {saving ? 'جارٍ الحفظ...' : 'حفظ'}
            </button>
            <button onClick={() => setEditing(null)} className="rounded-lg border border-outline-variant/60 px-6 py-2.5 text-sm text-ink-text">إلغاء</button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {rows.length === 0 && <p className="text-sm text-earth-brown">لا يوجد مشايخ بعد. اضغط "إضافة" للبدء.</p>}
          {rows.map((r) => (
            <div key={r.id} className="flex items-center justify-between rounded-xl border border-outline-variant/40 bg-white p-4">
              <div className="flex items-center gap-3">
                {r.photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={r.photo_url} alt="" className="h-10 w-10 rounded-full object-cover" />
                ) : (
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-shore-blue/20 text-sm font-bold text-deep-sea">
                    {r.name_ar.replace(/^(الشيخ|Sheikh|ሸኽ)\s*/, '').charAt(0) || '؟'}
                  </span>
                )}
                <div>
                  <p className="text-sm font-semibold text-deep-sea">{r.name_ar}</p>
                  <p className="text-xs text-earth-brown">{r.is_active ? 'نشط' : 'مخفي'}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditing({ id: r.id, name_ar: r.name_ar, name_en: r.name_en, name_ti: r.name_ti, bio_ar: r.bio_ar ?? '', bio_en: r.bio_en ?? '', bio_ti: r.bio_ti ?? '', photo_url: r.photo_url ?? '', is_active: r.is_active })} className="rounded-lg border border-outline-variant/60 px-3 py-1.5 text-xs text-ink-text hover:bg-cream">تعديل</button>
                <button onClick={() => remove(r.id)} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50">حذف</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
