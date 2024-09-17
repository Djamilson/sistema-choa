'use client'

import { IStarReview } from '@/@model/review/review'
import { Accordion } from '@/components/Accordion'
import { Hr } from '@/components/Hr'
import { Star } from '@/components/Star'
import { Button } from '@/components/buttons/Button'
import { useDetailReviewsByAggregationProductId } from '@/hooks/Entity/useReviews'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import Balance from 'react-wrap-balancer'

type IProductReviewsProps = {
  title: string
  children: ReactNode
  productId: string
  aggregationProductId: string
}

function ProductReviews({
  title,
  productId,
  aggregationProductId,
  children,
}: IProductReviewsProps) {
  const { push } = useRouter()

  const { data: detailReviewProduct } =
    useDetailReviewsByAggregationProductId(aggregationProductId)

  return (
    <Accordion title={title}>
      <div className="mt-6 gap-[10px] pl-2 md:flex md:px-4 md:pl-0 lg:flex-row">
        <div className="flex flex-col bg-white py-4 pr-4">
          <Button
            type="button"
            onClick={() =>
              push(`/reviews/${productId}/${aggregationProductId}`)
            }
          >
            avaliar produto
          </Button>

          <div className="my-8 rounded border text-4xl font-bold text-zinc-500">
            <div className="w-full bg-neutral-50">
              <h3 className="px-2 py-2 text-xl font-bold text-accent">
                nossa
                <span className="ml-2 text-xl text-neutral-500">nota</span>
              </h3>
            </div>
            <div className="px-2">
              <div className="my-4 flex items-center justify-between">
                <div className="flex flex-row gap-x-1.5 font-normal text-neutral-500 ">
                  {detailReviewProduct?.average && (
                    <Star
                      fontSize="h-8 w-7"
                      totalStarStart={5}
                      totalStarEnd={Number(detailReviewProduct?.average)}
                    />
                  )}
                </div>

                <h3 className="pl-16 text-2xl font-bold tracking-normal text-gray-500">
                  {detailReviewProduct?.average}
                </h3>
              </div>

              <hr className="my-2 h-px border-0 bg-gray-200 dark:bg-gray-700" />

              <h3 className="my-4 text-center text-sm font-normal text-accent">
                <Balance>
                  <span className="ml-2 text-neutral-500">
                    {detailReviewProduct?.totalReview &&
                      detailReviewProduct?.totalReview === 1 &&
                      `baseado em ${detailReviewProduct?.totalReview} avaliação`}
                    {detailReviewProduct?.totalReview &&
                      detailReviewProduct?.totalReview > 1 &&
                      `baseado em ${detailReviewProduct?.totalReview} avaliações`}

                    {detailReviewProduct?.totalReview &&
                      detailReviewProduct?.totalReview < 1 &&
                      `sem avaliações`}
                  </span>
                </Balance>
              </h3>
            </div>
          </div>

          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            notas
          </p>
          <div className="mt-6 flex flex-col gap-2">
            {detailReviewProduct?.starReviews?.map((item: IStarReview) => {
              return (
                <div
                  className="flex flex-row items-center justify-between"
                  key={item.order}
                >
                  <div className="mr-4 flex items-center">
                    <Star
                      fontSize="h-6 w-5"
                      totalStarStart={1}
                      totalStarEnd={Number(1)}
                    />

                    <p className="ml-2 text-sm font-medium text-neutral-500 dark:text-white">
                      {item.order}
                    </p>
                  </div>

                  <div className="flex h-4 w-[100%] rounded bg-gray-200 dark:bg-gray-700">
                    <div
                      className={`h-4 w-[${item.star}%] rounded bg-yellow-400`}
                    ></div>
                  </div>

                  <h4 className="w-[80px] text-right text-sm font-medium text-accent dark:text-blue-500">
                    {`${item.star}%`}
                  </h4>
                </div>
              )
            })}
          </div>

          <Hr />
        </div>
        {children}
      </div>
    </Accordion>
  )
}
export { ProductReviews }
