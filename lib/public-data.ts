import { fallbackNews } from '@/lib/data'
import type { NewsItem } from '@/lib/types'
import { createClient, hasSupabaseConfig } from '@/lib/supabase/server'

export async function getPublicNews(): Promise<NewsItem[]> {
  if (!hasSupabaseConfig()) return fallbackNews

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('news_items')
      .select('id,title,category,source_name,source_url,published_at')
      .eq('is_active', true)
      .order('priority', { ascending: false })
      .order('published_at', { ascending: false })
      .limit(8)

    if (error || !data?.length) return fallbackNews

    return data.map((item) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      sourceName: item.source_name,
      sourceUrl: item.source_url,
      publishedAt: item.published_at,
    }))
  } catch {
    return fallbackNews
  }
}
