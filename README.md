# إنجازك — Engazk Services

واجهة One-Page احترافية لمكتب خدمات وتعقيب المعاملات، مع لوحة داخلية محمية لاستقبال الطلبات وإدارة الأخبار.

## التقنية
- Next.js 16.3.4 / App Router
- React 19.2
- Tailwind CSS 4.3
- Supabase Auth + Postgres + RLS
- Vercel

## الصفحات
- `/` الواجهة العامة الوحيدة.
- `/admin/login` دخول الموظفين.
- `/admin` لوحة العمليات الداخلية.

## الوظائف الحالية
- بنر موسمي لليوم الوطني السعودي 96.
- شريط أخبار ذهبي متحرك، وكل خبر يحمل رابط مصدر خارجي.
- بحث في الخدمات.
- نموذج طلب يرسل البيانات إلى Supabase عند الربط ويفتح واتساب برسالة جاهزة.
- لوحة استقبال طلبات بصلاحيات: admin / employee / liaison_officer / technical_support.
- اسم العرض الافتراضي للموظفين في النسخة الأولية: أبو مشاري.
- RLS يمنع القراءة العامة للطلبات ويتيح فقط إنشاء طلب جديد للعامة.

## التشغيل المحلي
```bash
cp .env.example .env.local
npm install
npm run dev
```

## Supabase
طبّق ملف migration الموجود في:
`supabase/migrations/20260907190000_initial_schema.sql`

ثم أضف في Vercel/GitHub local environment:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_WHATSAPP_NUMBER=966590097275`
- `NEXT_PUBLIC_TIKTOK_URL=https://www.tiktok.com/@mror_angazk`

> ملاحظة: الموقع مكتب خدمات مستقل ولا ينبغي أن تستخدم الهوية أو النصوص بما يوحي بأنه جهة حكومية رسمية.
