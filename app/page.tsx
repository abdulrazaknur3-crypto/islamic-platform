import { SeasonalBanner } from '@/components/seasonal-banner'
import { NewsTicker } from '@/components/news-ticker'
import { HomeHero } from '@/components/home-hero'
import { ServicesSection } from '@/components/services-section'
import { ProcessSection } from '@/components/process-section'
import { LatestNews } from '@/components/latest-news'
import { Testimonials } from '@/components/testimonials'
import { ClosingCta } from '@/components/closing-cta'
import { Footer } from '@/components/footer'
import { WhatsAppFab } from '@/components/whatsapp-fab'
import { getPublicNews } from '@/lib/public-data'

export const revalidate = 300

export default async function HomePage() {
  const news = await getPublicNews()

  return (
    <main>
      <SeasonalBanner />
      <NewsTicker items={news} />
      <HomeHero />
      <ServicesSection />
      <ProcessSection />
      <LatestNews items={news} />
      <Testimonials />
      <ClosingCta />
      <Footer />
      <WhatsAppFab />
    </main>
  )
}
