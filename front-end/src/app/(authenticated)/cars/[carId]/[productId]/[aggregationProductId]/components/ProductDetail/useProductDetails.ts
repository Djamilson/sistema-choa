'use client'

import {
  IAggregationProductDetailEcommerce,
  IProductEcommerce,
} from '@/@model/product/product'
import useLoadingOnClickButtonModal from '@/components/loadings/LoadingOnClickButtonModal/useLoadingOnClickButtonModal'
import { useSelectedColorProductStore } from '@/contexts/product-detail/useSelectedColorProductStore'
import { useSelectedSizeProductStore } from '@/contexts/product-detail/useSelectedSizeProductStore'
import { useSelectedVoltageProductStore } from '@/contexts/product-detail/useSelectedVoltageProductStore'
import { meAnimatedScroll } from '@/hooks/AnimateScrooll/useAnimatedScroll'
import {
  useAggregationProductDetailByAggregationProductIds,
  useProductMeDetailsByProductId,
} from '@/hooks/Entity/useDetailProduct'
import { setRedirectTo } from '@/utils/setRedirectTo'
import { usePathname } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

function removeRepetitions(array: string[]): string[] {
  const occurrences: Record<string, number> = {}
  for (let i = 0; i < array.length; i++) {
    occurrences[array[i]] = (occurrences[array[i]] || 0) + 1
  }
  return Object.keys(occurrences)
}

type IFilterSelectedAggregationProduct = {
  aggregationProducts: IAggregationProductDetailEcommerce[]
  colorId?: string
  sizeId?: string
  voltageId?: string
}

function filterSelectedAggregationProduct({
  aggregationProducts,
  colorId,
  sizeId,
  voltageId,
}: IFilterSelectedAggregationProduct) {
  const selectedProducts = aggregationProducts?.filter((item) => {
    const testColor = colorId ? item.color_product.id === colorId : true
    const testSize = sizeId ? item.size_product.id === sizeId : true
    const testVoltage = voltageId ? item.voltage_product.id === voltageId : true

    return (
      (testColor && testSize && testVoltage) ||
      (testColor && testSize && !voltageId) ||
      (testColor && !sizeId && testVoltage) ||
      (!colorId && testSize && testVoltage) ||
      (testColor && !sizeId && !voltageId) ||
      (!colorId && testSize && !voltageId) ||
      (!colorId && !sizeId && testVoltage) ||
      (!colorId && !sizeId && !voltageId)
    )
  })

  return selectedProducts || ({} as IAggregationProductDetailEcommerce)
}

type IUseProductDetailsProps = {
  productId: string
  aggregationProductId: string
  setSelectedAggregationProduct: Dispatch<
    SetStateAction<IAggregationProductDetailEcommerce>
  >
}

export const useProductDetails = ({
  productId,
  setSelectedAggregationProduct,
}: IUseProductDetailsProps) => {
  const [initialProduct, setInitialProduct] = useState<IProductEcommerce>(
    {} as IProductEcommerce,
  )

  const [
    filteredSizesProductIdBySelectedColorProductId,
    setFilteredSizesProductIdBySelectedColorProductId,
  ] = useState<string[]>([])

  const [
    filteredVoltagesProductIdBySelectedColorProductId,
    setFilteredVoltagesProductIdBySelectedColorProductId,
  ] = useState<string[]>([])

  const { data: product } = useProductMeDetailsByProductId(String(productId))

  const { data: listAggregationsProducts } =
    useAggregationProductDetailByAggregationProductIds(productId)

  const {
    state: { selectedColorProduct },
  } = useSelectedColorProductStore()

  const {
    state: { selectedSizeProduct },
  } = useSelectedSizeProductStore()

  const {
    state: { selectedVoltageProduct },
  } = useSelectedVoltageProductStore()

  const handleClickDetailProduct = (detailProduct: string) =>
    meAnimatedScroll({ id: detailProduct })

  const { onClose: onCloseLoadingOnClickButtonModal } =
    useLoadingOnClickButtonModal()

  useEffect(() => {
    onCloseLoadingOnClickButtonModal()
  }, [onCloseLoadingOnClickButtonModal])

  useEffect(() => {
    if (product && product?.id) {
      setInitialProduct((oldProduct) => {
        return {
          ...product,
          aggregationProducts: oldProduct.aggregationProducts,
        }
      })
    }
  }, [product])

  useEffect(() => {
    if (listAggregationsProducts && listAggregationsProducts.length > 0) {
      setInitialProduct((oldProduct) => {
        return {
          ...oldProduct,
          aggregationProducts: listAggregationsProducts,
        }
      })
    }
  }, [listAggregationsProducts])

  useEffect(() => {
    if (!listAggregationsProducts) {
      return
    }

    const filteredAggregations = listAggregationsProducts

    if (selectedColorProduct && selectedColorProduct?.id) {
      setFilteredSizesProductIdBySelectedColorProductId(
        removeRepetitions(
          filteredAggregations
            .filter(
              (item) =>
                item.color_product.totalColor > 0 &&
                item.color_product.id === selectedColorProduct.id,
            )
            ?.map((item) => item.size_product.id),
        ),
      )
      setFilteredVoltagesProductIdBySelectedColorProductId(
        removeRepetitions(
          filteredAggregations
            .filter(
              (item) =>
                item.color_product.totalColor > 0 &&
                item.color_product.id === selectedColorProduct.id,
            )
            ?.map((item) => item.voltage_product.id),
        ),
      )
    } else {
      setFilteredSizesProductIdBySelectedColorProductId([])
      setFilteredVoltagesProductIdBySelectedColorProductId([])
    }

    setSelectedAggregationProduct(
      filterSelectedAggregationProduct({
        aggregationProducts: listAggregationsProducts,
        colorId: selectedColorProduct?.id,
        sizeId: selectedSizeProduct?.id,
        voltageId: selectedVoltageProduct?.id,
      })[0],
    )
  }, [
    listAggregationsProducts,
    selectedColorProduct,
    selectedSizeProduct,
    selectedVoltageProduct,
    setSelectedAggregationProduct,
  ])

  const sharedUrl =
    process.env.NEXT_PUBLIC_ENV_URL_SHARED_ECOMMERCE &&
    process.env.NEXT_PUBLIC_ENV_URL_SHARED_ECOMMERCE

  const pathname = usePathname()

  function handleNavPolitics() {
    setRedirectTo({ pathname })
  }
  return {
    handleNavPolitics,
    sharedUrl,
    filteredSizesProductIdBySelectedColorProductId,
    filteredVoltagesProductIdBySelectedColorProductId,
    initialProduct,
    handleClickDetailProduct,
    listAggregationsProducts,
  }
}
