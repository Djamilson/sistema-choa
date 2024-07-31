'use client'

import { IAggregationProduct } from '@/@model/aggregationProduct/aggregationProduct'
import cn from '@/utils/cn'
import { handlePrefetchProductDetailByProductId } from '@/utils/handlePrefetch'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Star } from '../Star'

type ICardAggregationProductProps = {
  aggregationProduct: IAggregationProduct
}

function AggregationProductSearch({
  aggregationProduct,
}: ICardAggregationProductProps) {
  const aggregationProductId = aggregationProduct?.id
  const productId = aggregationProduct?.product.id

  const [isLoading, setLoading] = useState(true)

  return (
    <Link
      onMouseOver={() => handlePrefetchProductDetailByProductId(productId)}
      href={`/product-detail/${productId}/${aggregationProductId}`}
      className="flex max-w-[140px] flex-1 cursor-pointer overflow-hidden bg-white p-2 shadow-lg transition-shadow duration-300 ease-in-out hover:-translate-y-2 hover:transform sm:flex sm:hover:border-b-4 sm:hover:border-b-red-400 md:p-4"
    >
      <div className="flex w-full flex-col gap-1 md:gap-2">
        <div className="relative aspect-square h-full w-full overflow-hidden ">
          {aggregationProduct?.product?.subcategory && (
            <Image
              width={100}
              height={100}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 30vw, 13vw"
              src={
                aggregationProduct?.thumbnail_url || '/images/placeholder.jpg'
              }
              alt={aggregationProduct?.product.subcategory.name}
              className={cn(
                'object-cover transition duration-700 ease-in-out group-hover:scale-110 group-hover:opacity-75',
                isLoading
                  ? 'scale-110 blur-2xl grayscale'
                  : 'scale-100 blur-0 grayscale-0',
              )}
              onLoad={() => setLoading(false)}
            />
          )}
        </div>

        <div className="my-0.5 flex-1 py-2 text-sm font-bold ">
          <span className="line-clamp-2 leading-tight">
            {aggregationProduct?.product?.subcategory.name}
          </span>
        </div>

        <div className="-mt-[4px] items-center justify-between gap-1 pb-2 md:flex">
          <div className="flex font-normal text-neutral-500 ">
            <Star
              fontSize="h-4"
              totalStarStart={5}
              totalStarEnd={Number(aggregationProduct.reviewValue)}
            />
          </div>
          <div className="text-[12px] font-normal tracking-normal text-gray-500">
            {aggregationProduct?.totalReview > 1 &&
              `${aggregationProduct.totalReview} avaliações`}
            {aggregationProduct?.totalReview === 1 &&
              `${aggregationProduct.totalReview} avaliação`}

            {aggregationProduct?.totalReview === 0 && `sem avaliações`}
          </div>
        </div>

        <p
          className={`text-[12px] font-normal tracking-normal line-through ${
            aggregationProduct?.price.price_promotion !== 0
              ? 'text-neutral-500'
              : 'text-white'
          }`}
        >
          {Number(aggregationProduct?.price.price_promotion) > 0 &&
            aggregationProduct?.price.price_format}
        </p>
        <div className="flex-col items-center justify-between gap-1 md:flex">
          <span className="text-[16px] font-semibold tracking-normal text-neutral-500">
            {Number(aggregationProduct?.price.price_promotion) > 0 &&
              aggregationProduct?.price.price_promotion_format}
            {Number(aggregationProduct?.price.price_promotion) < 0.1 &&
              aggregationProduct?.price.price_format}
          </span>

          <p className="right-0">
            {Number(aggregationProduct?.price.price_promotion) > 0 && (
              <span className="ml-auto mr-3 flex rounded-full bg-green-500 px-2 py-1 text-[10px] font-medium uppercase text-white">
                Promoção
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center">
          <p className="text-[10px] font-normal leading-4 tracking-normal text-gray-500 md:text-[12px] ">
            {`${aggregationProduct?.price?.number_times_sale?.numberVez} de ${aggregationProduct?.price?.number_times_sale?.price} sem juros no cartão de crédito`}
          </p>
        </div>
      </div>
    </Link>
  )
}
export { AggregationProductSearch }
