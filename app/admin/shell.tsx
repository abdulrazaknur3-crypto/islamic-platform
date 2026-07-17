'use client';

import Link from 'next/link';

export function empty(v: string): string | null {
  return v && v.trim() ? v : null;
}

export function AdminShell({
  title,
  onAdd,
  children,
}: {
  title: string;
  onAdd: () => void;
  children: React.ReactNode;
}) {
  return (
    <div dir="rtl" className="min-h-screen bg-cream">
      <header className="border-b border-outline-variant/40 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/admin/dashboard" className="flex items-center gap-1 text-sm text-shore-blue hover:text-deep-sea">
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
              اللوحة
            </Link>
            <span className="text-outline-variant">/</span>
            <p className="font-bold text-deep-sea">{title}</p>
          </div>
          <button
            onClick={onAdd}
            className="flex items-center gap-1 rounded-lg bg-deep-sea px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            إضافة
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
