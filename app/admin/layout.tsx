export const metadata = {
  title: 'لوحة تحكم المنصة الإسلامية',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="ar" dir="rtl" className="font-arabic">
      {children}
    </div>
  );
}
