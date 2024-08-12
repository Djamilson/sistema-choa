'use client'

import { Button } from '@/components/buttons/Button'
import { LoadingPulseLoader } from '@/components/loadings/LoadingPulseLoader'
import { AvaliationButton } from '@/components/product-detail/AvaliationButton'
import { MeReview } from '@/components/product-detail/review/MeReview'
import { ReactNode } from 'react'
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import { useListingReview } from './useListingReview'

type IListingReviewProps = {
  aggregationProductId: string
  children: ReactNode
}

const ListingReview = ({
  aggregationProductId,
  children,
}: IListingReviewProps) => {
  const {
    handleReviewYesOrNot,
    selectedReviewId,
    isLoadingReview,
    isFetchingReview,
    reviews,
    isLoading,
    yesOrNot,
    pageReview,
    addPage,
  } = useListingReview({
    aggregationProductId,
  })

  return (
    <div className="flex w-full flex-col bg-white py-4">
      <div className="flex w-full flex-col border">
        <div className="flex-[1]">
          <div className="flex h-[54px] w-full items-center bg-neutral-50">
            <div className="ml-6 text-lg font-bold text-neutral-500">
              comentários
            </div>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center">
            {isLoadingReview && isFetchingReview && <LoadingPulseLoader />}

            {!isLoadingReview &&
              !isFetchingReview &&
              !reviews?.reviews?.length &&
              children}
          </div>

          <div className="mt-4 flex items-center justify-center  p-2">
            <div className="flex w-full flex-col gap-6 bg-white md:px-4 md:py-4">
              {reviews &&
                reviews.reviews?.map((review) => {
                  return (
                    <MeReview key={review.id} review={review}>
                      <div className="flex items-center justify-between pr-4">
                        <AvaliationButton
                          isLoading={
                            selectedReviewId === review.id && yesOrNot === 'yes'
                              ? isLoading
                              : false
                          }
                          disabled={isLoading}
                          label={`(${review.reviewYesTotal})`}
                          icon={AiOutlineLike}
                          rest={`${
                            review?.meAvaliationReview === true
                              ? `text-green-600`
                              : `text-gray-300`
                          }`}
                          onClick={() =>
                            handleReviewYesOrNot({
                              reviewId: review.id,
                              yesOrNot: 'yes',
                              oldStatus: true,
                            })
                          }
                        />

                        <div className="">
                          <AvaliationButton
                            isLoading={
                              selectedReviewId === review.id &&
                              yesOrNot === 'not'
                                ? isLoading
                                : false
                            }
                            disabled={isLoading}
                            label={`(${
                              review.reviewNotTotal < 0
                                ? 0
                                : review.reviewNotTotal
                            })`}
                            icon={AiOutlineDislike}
                            rest={`${
                              review?.meAvaliationReview === false
                                ? `text-accent`
                                : `text-gray-300`
                            }`}
                            onClick={() =>
                              handleReviewYesOrNot({
                                reviewId: review.id,
                                yesOrNot: 'not',
                                oldStatus: false,
                              })
                            }
                          />
                        </div>
                      </div>
                    </MeReview>
                  )
                })}
            </div>
          </div>
        </div>
        {reviews?.reviews?.length > 0 && pageReview < reviews?.info?.pages && (
          <div className="my-6 flex w-full items-center justify-center">
            <div className="group col-span-1 ">
              <div className="flex w-full flex-col">
                <Button
                  disabled={isLoading}
                  isLoading={isLoading}
                  type="button"
                  onClick={() => addPage()}
                >
                  {`ver mais avaliações`}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ListingReview
