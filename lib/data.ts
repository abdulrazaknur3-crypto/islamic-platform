import type { NewsItem, Service, Testimonial } from '@/lib/types'

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966590097275'

export const TIKTOK_URL =
  process.env.NEXT_PUBLIC_TIKTOK_URL || 'https://www.tiktok.com/@mror_angazk'

export const services: Service[] = [
  {
    id: 'traffic',
    name: 'المرور',
    shortDescription: 'خدمات المركبات والإجراءات المرورية',
    icon: 'CarFront',
    keywords: ['مرور', 'مركبة', 'سيارة', 'نقل ملكية', 'رخصة', 'إسقاط'],
  },
  {
    id: 'passports',
    name: 'الجوازات',
    shortDescription: 'الإقامات والتأشيرات والإجراءات ذات العلاقة',
    icon: 'BookOpenCheck',
    keywords: ['جوازات', 'إقامة', 'تأشيرة', 'خروج وعودة', 'مقيم'],
  },
  {
    id: 'civil-affairs',
    name: 'الأحوال المدنية',
    shortDescription: 'خدمات الأحوال والوثائق المدنية',
    icon: 'Fingerprint',
    keywords: ['أحوال', 'هوية', 'سجل أسرة', 'ميلاد'],
  },
  {
    id: 'business',
    name: 'السجل التجاري',
    shortDescription: 'إجراءات المنشآت والسجلات التجارية',
    icon: 'BriefcaseBusiness',
    keywords: ['سجل تجاري', 'وزارة التجارة', 'منشأة', 'شركة', 'مؤسسة'],
  },
  {
    id: 'balady',
    name: 'بلدي',
    shortDescription: 'الرخص البلدية والخدمات المرتبطة بها',
    icon: 'Building2',
    keywords: ['بلدي', 'بلدية', 'رخصة بلدية', 'محل'],
  },
  {
    id: 'najiz',
    name: 'ناجز',
    shortDescription: 'مساندة في الإجراءات والخدمات الرقمية',
    icon: 'Scale',
    keywords: ['ناجز', 'توثيق', 'وكالة', 'عدل'],
  },
  {
    id: 'insurance',
    name: 'التأمينات',
    shortDescription: 'خدمات التأمينات والمنشآت والأفراد',
    icon: 'ShieldCheck',
    keywords: ['تأمينات', 'مشترك', 'منشأة', 'أجور'],
  },
  {
    id: 'other',
    name: 'خدمات أخرى',
    shortDescription: 'لم تجد خدمتك؟ اشرحها لنا وسنوجّهك',
    icon: 'LayoutGrid',
    keywords: ['أخرى', 'استفسار', 'خدمة حكومية'],
  },
]

export const fallbackNews: NewsItem[] = [
  {
    id: 'news-1',
    title: 'تابع قرارات وتحديثات مكتب العمل من المصدر الرسمي',
    category: 'مكتب العمل',
    sourceName: 'وزارة الموارد البشرية',
    sourceUrl: 'https://www.hrsd.gov.sa/',
  },
  {
    id: 'news-2',
    title: 'آخر تحديثات خدمات الجوازات والمنصات المرتبطة بها',
    category: 'الجوازات',
    sourceName: 'أبشر',
    sourceUrl: 'https://www.absher.sa/',
  },
  {
    id: 'news-3',
    title: 'مستجدات خدمات المنشآت والسجلات التجارية',
    category: 'الأعمال',
    sourceName: 'المركز السعودي للأعمال',
    sourceUrl: 'https://business.sa/',
  },
  {
    id: 'news-4',
    title: 'التحديثات الرسمية للرخص والخدمات البلدية',
    category: 'بلدي',
    sourceName: 'بلدي',
    sourceUrl: 'https://balady.gov.sa/',
  },
]

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'عبدالله العتيبي',
    role: 'عميل أعمال',
    quote: 'وضوح في المتطلبات ومتابعة منظمة حتى إقفال الطلب.',
  },
  {
    id: 't2',
    name: 'سارة محمد',
    role: 'صاحبة منشأة',
    quote: 'تجربة مرتبة وسهلة، وأعجبني أن التحديثات تصلني بدون متابعة مستمرة مني.',
  },
  {
    id: 't3',
    name: 'أحمد الشهري',
    role: 'عميل أفراد',
    quote: 'خدمة سريعة وواضحة، وعرفت حالة معاملتي في كل مرحلة.',
  },
]

export const processSteps = [
  ['إرسال الطلب', 'عبر واتساب أو النموذج'],
  ['مراجعة المتطلبات', 'وتدقيق المعلومات'],
  ['توضيح الإجراء', 'والتكلفة قبل البدء'],
  ['إنجاز المعاملة', 'ومتابعتها مع الجهة'],
  ['إشعارك بالنتيجة', 'وإغلاق الطلب بوضوح'],
] as const
