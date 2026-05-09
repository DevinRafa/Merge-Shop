import { reviews } from '@/data/reviews'
import type { UserReview } from '@/lib/types'

export async function getReviewsByStoreId(storeId: string): Promise<UserReview[]> {
  await new Promise((r) => setTimeout(r, 150))
  return reviews.filter((r) => r.storeId === storeId)
}

export async function getFeaturedReviews(): Promise<UserReview[]> {
  await new Promise((r) => setTimeout(r, 150))
  return reviews.slice(0, 3)
}
