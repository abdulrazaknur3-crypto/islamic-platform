'use client';

import { useState } from 'react';
import { createClient } from '@/src/supabase-browser';

export function Field({
  label,
  value,
  onChange,
  placeholder,
  dir,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  dir?: 'rtl' | 'ltr';
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-ink-text">{label}</label>
      <input
        type={type}
        value={value}
        dir={dir}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-outline-variant/60 bg-white px-4 py-2.5 text-sm outline-none focus:border-shore-blue"
      />
    </div>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  placeholder,
  dir,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  dir?: 'rtl' | 'ltr';
  rows?: number;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-ink-text">{label}</label>
      <textarea
        value={value}
        dir={dir}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-outline-variant/60 bg-white px-4 py-2.5 text-sm outline-none focus:border-shore-blue"
      />
    </div>
  );
}

export function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-lg border border-outline-variant/60 bg-white px-4 py-3">
      <span className="text-sm font-medium text-ink-text">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition-colors ${
          checked ? 'bg-deep-sea' : 'bg-outline-variant'
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            checked ? 'right-0.5' : 'right-5'
          }`}
        />
      </button>
    </label>
  );
}

export function ImageUpload({
  label,
  bucket,
  value,
  onChange,
}: {
  label: string;
  bucket: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    setUploading(true);
    const supabase = createClient();
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error: upErr } = await supabase.storage.from(bucket).upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });
    if (upErr) {
      setError('فشل الرفع: ' + upErr.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
    onChange(data.publicUrl);
    setUploading(false);
  }

  return (
    <div>
      <label className="text-sm font-medium text-ink-text">{label}</label>
      <div className="mt-1 flex items-center gap-3">
        {value && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-16 w-16 rounded-lg object-cover" />
        )}
        <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-outline-variant/60 bg-white px-4 py-2.5 text-sm text-ink-text transition-colors hover:bg-cream">
          <span className="material-symbols-outlined text-lg">upload</span>
          {uploading ? 'جارٍ الرفع...' : value ? 'تغيير الصورة' : 'رفع صورة'}
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function ScholarSelect({
  label,
  value,
  onChange,
  scholars,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  scholars: { id: string; name_ar: string }[];
}) {
  return (
    <div>
      <label className="text-sm font-medium text-ink-text">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-outline-variant/60 bg-white px-4 py-2.5 text-sm outline-none focus:border-shore-blue"
      >
        <option value="">— اختر —</option>
        {scholars.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name_ar}
          </option>
        ))}
      </select>
    </div>
  );
}
