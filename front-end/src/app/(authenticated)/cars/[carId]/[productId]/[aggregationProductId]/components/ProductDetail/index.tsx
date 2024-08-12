'use client'

import { IAggregationProductDetailEcommerce } from '@/@model/product/product'
import { CardInfoCurrencyProduct } from '@/app/(public)/product-detail/[productId]/[aggregationProductId]/components/CardInfoCurrencyProduct'
import { SelectedColorProduct } from '@/app/(public)/product-detail/[productId]/[aggregationProductId]/components/SelectedColorProduct'
import { SelectedSizeProduct } from '@/app/(public)/product-detail/[productId]/[aggregationProductId]/components/SelectedSizeProduct'
import { SelectedVoltageProduct } from '@/app/(public)/product-detail/[productId]/[aggregationProductId]/components/SelectedVoltageProduct'
import RelatedSlideProducts from '@/components/CardCategory/RelatedSlideProducts'
import Container from '@/components/Container'
import Wrapper from '@/components/Header/Wrapper'
import { Hr } from '@/components/Hr'
import { SharedButtons } from '@/components/SharedButtons'
import { Star } from '@/components/Star'
import { ButtonDetailProduct } from '@/components/product-detail/ButtonDetailProduct'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ImageGallery from '../ImageGallery'
import ProductInfo from '../ProductInfo'
import { useProductDetails } from './useProductDetails'

type IPageProps = {
  params: {
    aggregationProductId: string
    productId: string
  }
}

const ProductDetail = ({ params }: IPageProps) => {
  const { aggregationProductId, productId } = params
  const [selectedAggregationProduct, setSelectedAggregationProduct] =
    useState<IAggregationProductDetailEcommerce>(
      {} as IAggregationProductDetailEcommerce,
    )

  const {
    handleNavPolitics,
    sharedUrl,
    filteredSizesProductIdBySelectedColorProductId,
    filteredVoltagesProductIdBySelectedColorProductId,
    initialProduct,
    handleClickDetailProduct,
    listAggregationsProducts,
  } = useProductDetails({
    productId,
    aggregationProductId,
    setSelectedAggregationProduct,
  })

  useEffect(() => {
    if (listAggregationsProducts && listAggregationsProducts.length > 0) {
      setSelectedAggregationProduct(() => {
        const meSelectionAggregationProduct = listAggregationsProducts?.find(
          (item) => item.id === aggregationProductId,
        )
        if (!meSelectionAggregationProduct?.id) {
          return {} as IAggregationProductDetailEcommerce
        }

        return meSelectionAggregationProduct
      })
    }
  }, [
    listAggregationsProducts,
    aggregationProductId,
    setSelectedAggregationProduct,
  ])

  return (
    <>
      <Wrapper className={`w-full max-w-[1440px] md:mx-auto md:px-2`}>
        <div className="mt-6 flex flex-col gap-[30px] px-1 md:px-4 lg:flex-row lg:gap-[20px]">
          <div className="bg-white px-4 py-4 md:flex">
            <div className="w-full max-w-[500px] flex-[1.5] md:mx-1 md:w-auto lg:mx-0 lg:max-w-full">
              <div className="mb-9 flex flex-col">
                <h3 className="pb-4">compartilhamento</h3>

                {sharedUrl && productId && aggregationProductId && (
                  <SharedButtons
                    mountUrl={sharedUrl}
                    aggregationProductId={String(aggregationProductId)}
                    productId={String(productId)}
                  />
                )}
              </div>
              <ImageGallery photos={selectedAggregationProduct?.photos} />
            </div>
            <div className="mt-6 w-full flex-[1] py-2 md:ml-6 md:mt-0 md:max-w-[380px]">
              <p className="mb-4 line-clamp-3 text-sm font-bold leading-none text-neutral-500 md:text-lg">
                {initialProduct && initialProduct?.subcategory?.name}
              </p>

              {initialProduct && selectedAggregationProduct?.id && (
                <div className="my-2 flex items-center justify-between gap-1">
                  <div className="flex font-normal text-neutral-500 ">
                    <Star
                      fontSize="h-6"
                      totalStarStart={5}
                      totalStarEnd={Number(
                        selectedAggregationProduct?.reviewValue,
                      )}
                    />
                  </div>
                  <p className="text-[12px] font-normal tracking-normal text-gray-500">
                    {selectedAggregationProduct?.totalReview > 1 &&
                      `${selectedAggregationProduct?.totalReview} avaliações`}
                    {selectedAggregationProduct?.totalReview === 1 &&
                      `${selectedAggregationProduct?.totalReview} avaliação`}
                    {selectedAggregationProduct?.totalReview < 1 &&
                      `sem avaliações`}
                  </p>
                </div>
              )}
              <Hr />
              <div className="markdown text-md mb-5">
                <p className="mt-4 line-clamp-3 text-sm font-normal text-gray-500">
                  {initialProduct?.description}
                </p>

                <ButtonDetailProduct
                  onClick={() => handleClickDetailProduct('detailProduct')}
                >
                  mais informações
                </ButtonDetailProduct>
              </div>

              <Hr />
              <div className="mb-10">
                {productId && <SelectedColorProduct productId={productId} />}
              </div>
              <div className="mb-10">
                {productId && (
                  <SelectedSizeProduct
                    productId={productId}
                    filteredSizesProductIdBySelectedColorProductId={
                      filteredSizesProductIdBySelectedColorProductId
                    }
                  />
                )}
              </div>

              <div className="mb-10">
                {productId && (
                  <SelectedVoltageProduct
                    productId={productId}
                    filteredVoltagesProductIdBySelectedColorProductId={
                      filteredVoltagesProductIdBySelectedColorProductId
                    }
                  />
                )}
              </div>

              <>
                <Link
                  href={`/exchanges-and-returns`}
                  onMouseOver={() => {
                    handleNavPolitics()
                  }}
                >
                  <div className="tex-sm w-full font-normal text-neutral-500 underline-offset-4 hover:text-accent hover:underline hover:decoration-accent">
                    política de troca e devolução
                  </div>
                </Link>
              </>
            </div>
          </div>

          {productId && (
            <CardInfoCurrencyProduct
              selectedAggregationProduct={selectedAggregationProduct}
              productId={productId}
              product={initialProduct}
            />
          )}
        </div>
      </Wrapper>
      <Container>
        <RelatedSlideProducts />
        <ProductInfo
          aggregationProductId={aggregationProductId}
          productId={productId}
          initialProduct={initialProduct}
          dataSheets={selectedAggregationProduct?.dataSheets}
        />
      </Container>
    </>
  )
}

export default ProductDetail
