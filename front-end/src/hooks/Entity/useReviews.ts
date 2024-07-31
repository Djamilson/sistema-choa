import IInfo from '@/@model/product/info'
import { IReview } from '@/@model/review/review'
import { api } from '@/_services/apiClient'
import { dateFormattedBirthDate } from '@/utils/formatDate'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export type IReviewsInfo = {
  reviews: IReview[]
  info: IInfo
}

type TReviewsByAggregationProductId = {
  page: number
  limit: number
  aggregationProductId: string
  userId: string | undefined
}

type TReviewsByAggregationProductIdByInitialDataReviews = {
  page: number
  limit: number
  aggregationProductId: string
  userId: string | undefined
  initialDataReviews: IReviewsInfo
}

export async function getMeReviews({
  page,
  limit,
  aggregationProductId,
  userId,
}: TReviewsByAggregationProductId): Promise<IReviewsInfo> {
  const url = `reviews/pagination/list`

  const { data } = await api.get(url, {
    params: { page, limit, aggregationProductId },
  })
  const listReviews: IReview[] = data?.reviews?.map((review: IReview) => {
    return {
      ...review,
      meAvaliationReview: review?.reviews_avaliations.filter(
        (rAvaliation) => rAvaliation.author_id === userId,
      )[0]?.status,
      firstName: review?.author?.person?.name.split(' '),
      created_at_formatted: dateFormattedBirthDate(String(review.created_at)),
    }
  })

  const meData = {
    reviews: listReviews,
    info: data.info,
  }

  return meData
}

export function useReviewsByProductIdAndInitialReviewsByProductId({
  page,
  limit,
  aggregationProductId,
  userId,
  initialDataReviews,
}: TReviewsByAggregationProductIdByInitialDataReviews) {
  return useQuery({
    queryKey: ['initial-reviews', `${aggregationProductId}-${page}`],
    queryFn: () => getMeReviews({ page, limit, aggregationProductId, userId }),
    initialData: initialDataReviews,
  }) as UseQueryResult<IReviewsInfo, unknown>
}

export function useReviewsByAggregationProductId({
  page,
  limit,
  aggregationProductId,
  userId,
}: TReviewsByAggregationProductId) {
  return useQuery({
    queryKey: ['hydrate-reviews', `${aggregationProductId}-${page}`],
    queryFn: () => getMeReviews({ page, limit, aggregationProductId, userId }),
  }) as UseQueryResult<IReviewsInfo, unknown>
}

type IStarReview = {
  order: number
  star: number
}

export type IDetailReviewAggregationProduct = {
  totalReview: number
  average: string
  starReviews: IStarReview[]
}

export async function getDetalReviewAggregationProduct(
  aggregationProductId: string,
): Promise<IDetailReviewAggregationProduct> {
  const url = `reviews/details/products`

  const { data } = await api.get(url, {
    params: { aggregationProductId },
  })

  return data
}

export function useDetailReviewsByAggregationProductIdOnInitialReviews(
  aggregationProductId: string,
) {
  return useQuery<IDetailReviewAggregationProduct, unknown>({
    queryKey: [
      'initial-detail-review-aggregation-product',
      aggregationProductId,
    ],
    queryFn: () => getDetalReviewAggregationProduct(aggregationProductId),
  })
}

export function useDetailReviewsByAggregationProductId(
  aggregationProductId: string,
) {
  return useQuery<IDetailReviewAggregationProduct, unknown>({
    queryKey: [
      'hydrate-detail-review-aggregation-product',
      aggregationProductId,
    ],
    queryFn: () => getDetalReviewAggregationProduct(aggregationProductId),
  })
}
