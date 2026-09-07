import { ReferenceHome } from '@/components/reference-home'
import { getPublicNews } from '@/lib/public-data'

export const revalidate = 300

export default async function HomePage() {
  const news = await getPublicNews()
  return <ReferenceHome news={news} />
}
