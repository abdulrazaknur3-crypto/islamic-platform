// طبقة البيانات — Data layer
// تقرأ من Supabase، وإذا كانت القاعدة فارغة أو غير متاحة ترجع للديمو داتا
// بهذا: الموقع لا ينكسر أبدًا، والمحتوى الحقيقي يحل محل التجريبي تلقائيًا فور إدخاله

import { createClient } from '@supabase/supabase-js';
import {
  demoFeaturedArticle,
  demoAudio,
  demoFatwa,
  type LocalizedText,
} from './demo-data';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = url && anonKey ? createClient(url, anonKey) : null;

export type FeaturedArticle = {
  title: LocalizedText;
  excerpt: LocalizedText;
  author: LocalizedText;
  dateDisplay: LocalizedText;
  isDemo: boolean;
};

export type AudioItem = {
  title: LocalizedText;
  durationDisplay: LocalizedText;
  isDemo: boolean;
};

export type FatwaItem = {
  category: LocalizedText;
  excerpt: LocalizedText;
  isDemo: boolean;
};

function fmtDate(iso: string | null): string {
  if (!iso) return '';
  return iso.slice(0, 10);
}

export async function getFeaturedArticle(): Promise<FeaturedArticle> {
  const fallback: FeaturedArticle = { ...demoFeaturedArticle, isDemo: true };
  if (!supabase) return fallback;
  try {
    const { data, error } = await supabase
      .from('articles')
      .select(
        'title_ar,title_en,title_ti,excerpt_ar,excerpt_en,excerpt_ti,read_minutes,published_at,scholars(name_ar,name_en,name_ti)'
      )
      .eq('is_published', true)
      .eq('is_featured', true)
      .order('published_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error || !data) return fallback;
    const scholar = Array.isArray(data.scholars) ? data.scholars[0] : data.scholars;
    const d = fmtDate(data.published_at);
    const m = data.read_minutes ?? 0;
    return {
      title: { ar: data.title_ar, en: data.title_en, ti: data.title_ti },
      excerpt: {
        ar: data.excerpt_ar ?? '',
        en: data.excerpt_en ?? '',
        ti: data.excerpt_ti ?? '',
      },
      author: {
        ar: scholar?.name_ar ?? '',
        en: scholar?.name_en ?? '',
        ti: scholar?.name_ti ?? '',
      },
      dateDisplay: {
        ar: `${d} • ${m} دقيقة للقراءة`,
        en: `${d} • ${m} min read`,
        ti: `${d} • ${m} ደቓይቕ ንባብ`,
      },
      isDemo: false,
    };
  } catch {
    return fallback;
  }
}

export async function getLatestAudio(): Promise<AudioItem> {
  const fallback: AudioItem = { ...demoAudio, isDemo: true };
  if (!supabase) return fallback;
  try {
    const { data, error } = await supabase
      .from('library_items')
      .select('title_ar,title_en,title_ti,duration_display')
      .eq('is_published', true)
      .eq('type', 'audio')
      .order('published_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error || !data) return fallback;
    const dur = data.duration_display ?? '';
    return {
      title: { ar: data.title_ar, en: data.title_en, ti: data.title_ti },
      durationDisplay: {
        ar: `المدة: ${dur}`,
        en: `Duration: ${dur}`,
        ti: `ንውሓት: ${dur}`,
      },
      isDemo: false,
    };
  } catch {
    return fallback;
  }
}

export async function getLatestFatwa(): Promise<FatwaItem> {
  const fallback: FatwaItem = { ...demoFatwa, isDemo: true };
  if (!supabase) return fallback;
  try {
    const { data, error } = await supabase
      .from('fatwas')
      .select('question_ar,question_en,question_ti')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error || !data) return fallback;
    return {
      category: demoFatwa.category,
      excerpt: {
        ar: data.question_ar ?? '',
        en: data.question_en ?? '',
        ti: data.question_ti ?? '',
      },
      isDemo: false,
    };
  } catch {
    return fallback;
  }
}
