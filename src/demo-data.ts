// بيانات تجريبية مؤقتة — Demo data
// مبنية بنفس هيكل جداول Supabase القادمة (حقول ثلاثية اللغة)
// عند ربط قاعدة البيانات: نستبدل الاستيراد من هذا الملف باستعلامات Supabase فقط
// الصور: روابط مؤقتة من تصميم Stitch الأصلي — تُستبدل بصور الجهة في Supabase Storage

import type { Locale } from './config';

export type LocalizedText = Record<Locale, string>;

export const demoImages = {
  heroLibrary:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD93XN3_51AXmdpT1S4R5uTY45Z31_6F18wGnPibcVVjCYzZzoh8C07bhQJy4c3il6PaK5hFLmph_FZ9sRXWh0B4WM-Pj9y4L0Uvw6ikvBUghvrAX6wluPyaOe0pNL0chUx0Fzzt6CNDp17MJTgQqpRtqNsWBJmGvCAy2YxgsX-227-P_ZXJg5zqalZ53KvQTqLyyCyiRmEvbQjr1y0rtBz7jpeL8EqyiCsK61SvcKDQgS0T_osdjKR',
  scholar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAPXBXewnPsV36PhltnTVxDI2eM5ZBKHV53oHh4-xa-wEF8fNoizrLzcnNH6Mac7Q9W8H9sEJ7hCNA8gw20U-x2Y6P2HhSQRmUg6RnqP-cezCqh9RA_LPbyTWc-Ro2Bb2FaNQDthx0BqtOqVxDGYSJ0626w7veAx73ID4RPl90KXTdDe61mOuU_01IxFSQmYu30FRPQ-QeHkFLJ5Wuj3FzvUmJRvVbyw8YzJ4hMzOBAoX673_CHhoz9',
  woodPattern:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCMLMZKy3x0ULEjPaxL2_zbpLc98KxJ5x5UK5Detj8FAcXzvsMWiGmQHOWEJEpgLi_Oeb1heUFi0eG4FQxzwylg_QGEkdvMdCpfMyLckre24-cfMiNh2iauhRjU0tJgSeVEdI8yMFNU6GWn0ptgXNSYHlv0_ykj9KBYLQ6QWgdzrMX9H6alPQMiSvwbY0KyxC0413paj9_PpUClMxGVu49D7KOi4givBZ0fRhWmtPNqHpkvgIHevwhB',
  students:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCvWIrTg_iS5IZmAISu0dujcllbXeif-ciXzAgyvXgG9NZb1RvEMo6--TvpEKqLC_ir8vBihRbgMS6i3VhQ1DiY_QWwI9wibAbFsXpXnqvbfJFeWDdqZHGWFtWqJIjWaNX41I-aEfb3pIpFjv8Khg_TYM4MBYc5FGTR2bY5R9yBm2S-_IYdHWv01QSOU1yyKdfy_kzaSAFzhqRkS0qFFQ_KrIeeKJBtLx_pReSQM7wj1n2DB6uM_Vg0',
};

export const demoLiveSession = {
  status_live: true,
  title: {
    ar: 'أسس العقيدة: الجلسة الأسبوعية',
    en: 'Foundations of Aqeedah: Weekly Session',
    ti: 'መሰረታት ዓቂዳ: ሰሙናዊ ኣኼባ',
  } as LocalizedText,
};

export const demoFeaturedArticle = {
  title: {
    ar: 'مفهوم التزكية في العصر الحديث',
    en: 'The Concept of Tazkiyah in Modern Times',
    ti: 'ኣምር ተዝኪያ ኣብ ዘመናዊ ግዜ',
  } as LocalizedText,
  excerpt: {
    ar: 'كيف يمكن دمج ممارسات التزكية الروحية التقليدية في أنماط حياتنا المتسارعة في المهجر للحفاظ على السلام الداخلي والاتصال...',
    en: 'How traditional spiritual purification practices can be integrated into our fast-paced diaspora lifestyles to maintain inner peace and connection...',
    ti: 'ባህላዊ መንፈሳዊ ናይ ምጽራይ ልምድታት ኣብ ቅልጡፍ ናብራ ስደት ንውሽጣዊ ሰላምን ርክብን ንምዕቃብ ብኸመይ ክውሃሃድ ከም ዝኽእል...',
  } as LocalizedText,
  author: {
    ar: 'الشيخ إبراهيم محمود',
    en: 'Sheikh Ibrahim Mahmoud',
    ti: 'ሸኽ ኢብራሂም መሓሙድ',
  } as LocalizedText,
  dateDisplay: {
    ar: '12 أكتوبر 2024 • 15 دقيقة للقراءة',
    en: '12 Oct 2024 • 15 min read',
    ti: '12 ጥቅምቲ 2024 • 15 ደቓይቕ ንባብ',
  } as LocalizedText,
};

export const demoAudio = {
  title: {
    ar: 'الحفاظ على تراثنا: رحلة الدعوة باللغة التجرينية',
    en: 'Preserving Our Heritage: The Tigrinya Dawah Journey',
    ti: 'ውርሻና ምዕቃብ: ጉዕዞ ዳዕዋ ብትግርኛ',
  } as LocalizedText,
  durationDisplay: {
    ar: 'المدة: 45:12',
    en: 'Duration: 45:12',
    ti: 'ንውሓት: 45:12',
  } as LocalizedText,
};

export const demoFatwa = {
  category: {
    ar: 'فتوى حديثة',
    en: 'Recent Fatwa',
    ti: 'ሓድሽ ፈትዋ',
  } as LocalizedText,
  excerpt: {
    ar: 'بخصوص حسابات الزكاة للأصول الرقمية والمشاريع التجارية الحديثة...',
    en: 'Regarding the zakat calculations for digital assets and modern business...',
    ti: 'ብዛዕባ ሕሳብ ዘካ ንዲጂታላዊ ንብረትን ዘመናዊ ንግድን...',
  } as LocalizedText,
};

export const demoScholarQuote = {
  text: {
    ar: '"العلم هو النور الذي يرشد طريقنا."',
    en: '"Knowledge is the light that guides our path."',
    ti: '"ፍልጠት ንመገድና ዝመርሕ ብርሃን እዩ።"',
  } as LocalizedText,
};

export function pick(text: LocalizedText, locale: string): string {
  return text[locale as Locale] ?? text.ar;
}
