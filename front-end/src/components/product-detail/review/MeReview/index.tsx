import { IReview } from '@/@model/review/review'
import { Star } from '@/components/Star'
import { ReactNode } from 'react'

type IMeReviewProps = {
  review: IReview
  children: ReactNode
}

function MeReview({ review, children }: IMeReviewProps) {
  return (
    <div className="flex-[1] border">
      <div className="flex h-[54px] w-full items-center justify-between bg-neutral-50 px-2 md:px-6">
        <div className="whitespace-nowrap text-sm font-bold text-neutral-500">
          essa avaliação foi útil?
        </div>

        {children}
      </div>

      <article className="px-2 md:px-6">
        <div className="my-4 flex items-center gap-0.5">
          <Star
            fontSize="h-5 w-6"
            totalStarStart={5}
            totalStarEnd={Number(review.review)}
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="space-y-1 font-medium dark:text-white">
            <p className="block text-sm text-gray-500 dark:text-gray-400">
              {review.title}
            </p>
          </div>
        </div>
        <div className="mb-5 text-sm font-normal text-gray-500 dark:text-gray-400">
          <p> {review.comment}</p>
        </div>
        <footer className="mb-5 text-xs font-normal italic text-gray-500 dark:text-gray-400">
          <p>{`${review?.firstName} em ${review.created_at_formatted}`}</p>
        </footer>
      </article>
    </div>
  )
}

export { MeReview }
