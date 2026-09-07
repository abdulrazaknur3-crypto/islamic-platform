export type Service = {
  id: string
  name: string
  shortDescription: string
  icon: string
  keywords: string[]
}

export type NewsItem = {
  id: string
  title: string
  category: string
  sourceName: string
  sourceUrl: string
  publishedAt?: string | null
}

export type Testimonial = {
  id: string
  name: string
  role: string
  quote: string
}

export type RequestStatus =
  | 'new'
  | 'under_review'
  | 'waiting_customer'
  | 'in_progress'
  | 'completed'
  | 'cancelled'

export type RequestPriority = 'low' | 'normal' | 'high' | 'urgent'
