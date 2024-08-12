'use client'

import { IReview } from '@/@model/review/review'
import { api } from '@/_services/apiClient'
import { Toast } from '@/components/Toast'
import useCheckIsAuthenticatedGetSession from '@/hooks/auth/useCheckIsAuthenticatedGetSession'
import useGetUserBySession from '@/hooks/auth/useGetUserBySession'
import {
  IReviewsInfo,
  useReviewsByAggregationProductId,
} from '@/hooks/Entity/useReviews'
import { getUniqueListBy } from '@/utils/getUniqueListBy'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export type THandleReview = {
  yesOrNot: 'yes' | 'not'
  reviewId: string
  oldStatus: boolean
}
type IUseListingReview = {
  aggregationProductId: string
}

export const useListingReview = ({
  aggregationProductId,
}: IUseListingReview) => {
  const INITIAL_PAGE_REVIEW = 1
  const INITIAL_LIMIT_REVIEW = 3

  const queryClient = useQueryClient()
  const router = useRouter()

  const user = useGetUserBySession()
  const isAuthenticated = useCheckIsAuthenticatedGetSession()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [pageReview, setPageReview] = useState(INITIAL_PAGE_REVIEW)
  const [limitReview] = useState(INITIAL_LIMIT_REVIEW)
  const [reviews, setReviews] = useState({} as IReviewsInfo)
  const [yesOrNot, setYesOrNot] = useState<'yes' | 'not' | undefined>('yes')
  const [selectedReviewId, setSelectedReviewId] = useState<string>('')

  const {
    data: reviewsDataBase,
    isLoading: isLoadingReview,
    isFetching: isFetchingReview,
  } = useReviewsByAggregationProductId({
    page: pageReview,
    limit: limitReview,
    aggregationProductId: String(aggregationProductId),
    userId: user ? user.id : undefined,
  })

  useEffect(() => {
    if (
      typeof reviewsDataBase === 'object' &&
      reviewsDataBase !== null &&
      reviewsDataBase?.reviews &&
      reviewsDataBase?.reviews?.length > 0 &&
      reviewsDataBase?.info.page === pageReview
    ) {
      setReviews((old) => {
        const meOld = old?.reviews || []
        const array = [...meOld, ...reviewsDataBase.reviews]

        return {
          reviews: getUniqueListBy(array) as unknown[] as IReview[],
          info: reviewsDataBase.info,
        }
      })
    }
  }, [reviewsDataBase, pageReview])

  function addPage() {
    setPageReview((old) => old + 1)
  }

  const { mutateAsync: updateStatusReview } = useMutation({
    mutationFn: async ({ yesOrNot, reviewId, oldStatus }: THandleReview) => {
      const statusReview = await api.post(
        `reviews/avaliations/${yesOrNot}/${reviewId}`,
        {
          oldStatus,
        },
      )

      return statusReview.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hydrate-reviews'] })
    },
  })

  async function handleChangerStatusReview({
    yesOrNot,
    reviewId,
    oldStatus,
  }: THandleReview) {
    try {
      setIsLoading(true)
      setSelectedReviewId(reviewId)
      setYesOrNot(yesOrNot)

      const updateReview = await updateStatusReview({
        yesOrNot,
        reviewId,
        oldStatus,
      })

      setReviews((olds) => {
        const { reviews, info } = olds
        const { review_id, status } = updateReview

        const updatedReviews = reviews.map((item) => {
          if (item.id !== review_id) {
            return item
          }

          const oldStatus = Boolean(item.status)
          let reviewYesTotal = item.reviewYesTotal
          let reviewNotTotal = item.reviewNotTotal
          let meAvaliationReview = status

          if (status && item.meAvaliationReview === undefined) {
            reviewYesTotal++
          } else if (
            !status &&
            item.meAvaliationReview !== false &&
            oldStatus
          ) {
            reviewNotTotal++
            if (item.reviewYesTotal > 0) {
              reviewYesTotal--
            }
          } else if (status && item.meAvaliationReview === false) {
            reviewYesTotal++
            if (item.reviewNotTotal > 0) {
              reviewNotTotal--
            }
          } else if (!status && item.meAvaliationReview === true) {
            if (item.reviewNotTotal > 0) {
              reviewNotTotal--
            }
          } else if (status && item.meAvaliationReview === true) {
            if (item.reviewYesTotal > 0) {
              reviewYesTotal--
            }
            meAvaliationReview = undefined
          } else if (!status && item.meAvaliationReview === false) {
            if (item.reviewNotTotal > 0) {
              reviewNotTotal--
            }
            meAvaliationReview = undefined
          }

          return {
            ...item,
            reviewYesTotal,
            reviewNotTotal,
            meAvaliationReview,
          }
        })

        return { reviews: updatedReviews, info }
      })

      Toast({
        message: 'Avaliação adicionada com sucesso!',
        type: 'success',
      })
    } catch (error) {
      const message = 'Ocorreu uma falha ao tentar avaliar, tente novamente!'

      Toast({
        type: 'error',
        message,
      })
    } finally {
      setIsLoading(false)
      setSelectedReviewId('')
      setYesOrNot(undefined)
    }
  }

  async function handleReviewYesOrNot(data: THandleReview) {
    if (isAuthenticated) {
      handleChangerStatusReview(data)
    } else {
      router.push('/signin')
    }
  }

  return {
    handleReviewYesOrNot,
    selectedReviewId,
    isLoadingReview,
    isFetchingReview,
    reviews,
    isLoading,
    yesOrNot,
    pageReview,
    addPage,
  }
}
