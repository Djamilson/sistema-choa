'use client'

import {
  IAggregationProductDetail,
  IAggregationProductDetailEcommerce,
  IProductEcommerce,
} from '@/@model/product/product'
import { useMessageSelectedColorProductStore } from '@/contexts/product-detail/useMessageSelectedColorProductStore'
import { useMessageSelectedSizeProductStore } from '@/contexts/product-detail/useMessageSelectedSizeProductStore'
import { useMessageSelectedVoltageProductStore } from '@/contexts/product-detail/useMessageSelectedVoltageProductStore'
import { useSelectedColorProductStore } from '@/contexts/product-detail/useSelectedColorProductStore'
import { useSelectedSizeProductStore } from '@/contexts/product-detail/useSelectedSizeProductStore'
import { useSelectedVoltageProductStore } from '@/contexts/product-detail/useSelectedVoltageProductStore'
import { useTemporaryVariableAggregationProductAddCartStore } from '@/contexts/product-detail/useTemporaryVariableAggregationProductAddCartStore'
import { useCartStore } from '@/contexts/useCartStore'
import { getAggregationProductByAggregationProductId } from '@/hooks/Entity/useAggregationProducts'
import {
  IQuantityAggregationProductInStock,
  getStockTotalAggregationProductByAggregationProductId,
} from '@/hooks/Entity/useStocks'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Toast } from '../../../../../../../components/Toast'

type IUseCardInfoCurrencyProductProps = {
  productId: string
  product: IProductEcommerce
  selectedAggregationProduct: IAggregationProductDetailEcommerce
}

export const useCardInfoCurrencyProduct = ({
  productId,
  selectedAggregationProduct,
  product,
}: IUseCardInfoCurrencyProductProps) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const aggregationProductId = selectedAggregationProduct?.id

  const {
    state: { selectedColorProduct },
  } = useSelectedColorProductStore()

  const {
    state: { selectedSizeProduct },
  } = useSelectedSizeProductStore()

  const {
    state: { selectedVoltageProduct },
  } = useSelectedVoltageProductStore()

  const {
    actions: { setMessageSelectedColorProductStore },
  } = useMessageSelectedColorProductStore()

  const {
    actions: { setMessageSelectedSizeProductStore },
  } = useMessageSelectedSizeProductStore()

  const {
    actions: { setMessageSelectedVoltageProductStore },
  } = useMessageSelectedVoltageProductStore()

  const handleOpenModalAddAggregationProduct = () => {
    if (
      selectedAggregationProduct?.color_product.color.toLowerCase() !==
        'DEFAULT'.toLowerCase() &&
      !selectedColorProduct?.id
    ) {
      Toast({
        type: 'error',
        message: 'Tem que selecionar a cor do produto!',
      })
      setMessageSelectedColorProductStore({
        messageSelectedColorProduct: true,
      })
      return
    }

    if (
      selectedAggregationProduct?.size_product.description.toLowerCase() !==
        'DEFAULT'.toLowerCase() &&
      !selectedSizeProduct?.id
    ) {
      Toast({
        type: 'error',
        message: 'Tem que selecionar o tamanho do produto!',
      })
      setMessageSelectedSizeProductStore({
        messageSelectedSizeProduct: true,
      })
      return
    }

    if (
      selectedAggregationProduct?.voltage_product.voltage.toLowerCase() !==
        'DEFAULT'.toLowerCase() &&
      !selectedVoltageProduct?.id
    ) {
      Toast({
        type: 'error',
        message: 'Tem que selecionar a voltagem do produto!',
      })
      setMessageSelectedVoltageProductStore({
        messageSelectedVoltageProduct: true,
      })
      return
    }

    // confirmationAddAggregationProductModal.onOpen()
    openConfirmationAddAggregationProductForCartModal()
  }

  const {
    actions: { setTemporaryVariableAggregationProductAddCartStore },
  } = useTemporaryVariableAggregationProductAddCartStore()

  const handlePrefetchAggregationProductByAggregationProductId = async () => {
    if (
      selectedAggregationProduct?.color_product.color.toLowerCase() !==
        'DEFAULT'.toLowerCase() &&
      !selectedColorProduct?.id
    ) {
      return
    }

    if (
      selectedAggregationProduct?.size_product.description.toLowerCase() !==
        'DEFAULT'.toLowerCase() &&
      !selectedSizeProduct?.id
    ) {
      return
    }

    if (
      selectedAggregationProduct?.voltage_product.voltage.toLowerCase() !==
        'DEFAULT'.toLowerCase() &&
      !selectedVoltageProduct?.id
    ) {
      return
    }

    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ['hydrate-stock', aggregationProductId],
        queryFn: () =>
          getStockTotalAggregationProductByAggregationProductId(
            aggregationProductId,
          ),
      }),
      queryClient.prefetchQuery({
        queryKey: ['hydrate-aggregation-product', aggregationProductId],
        queryFn: () =>
          getAggregationProductByAggregationProductId({
            aggregationProductId,
          }),
      }),
    ])

    const { total } = queryClient.getQueryData([
      'hydrate-stock',
      aggregationProductId,
    ]) as unknown as IQuantityAggregationProductInStock

    if (total && total < 1) {
      Toast({
        type: 'warning',
        message: 'Não temos o produto selecionado em estoque, tente novamente!',
      })
    }
  }

  const {
    actions: { addToCartOnAggregationProduct },
  } = useCartStore()

  async function handleNavAddSelectedGuarantee() {
    try {
      if (
        selectedAggregationProduct?.guarantees &&
        selectedAggregationProduct?.guarantees.length > 1
      ) {
        router.push(`/selected-guarantee/${aggregationProductId}`)
      }

      // router.push(`/selected-guarantee/${aggregationProductId}`)

      const meTotast = await addToCartOnAggregationProduct({
        productId,
        aggregationProduct: {
          ...selectedAggregationProduct,
          product,
        },
        total: 1,
      })

      router.push(`/basket`)

      Toast(meTotast)

      const aggregationProduct = queryClient.getQueryData([
        'hydrate-aggregation-product',
        aggregationProductId,
      ]) as unknown as IAggregationProductDetail

      setTemporaryVariableAggregationProductAddCartStore({
        aggregationProduct,
      })
    } catch (err) {
      console.log('Vamos começar a corrigir', err)
    }
  }

  const [
    isOpenConfirmationAddAggregationProductForCartModal,
    setIsOpenConfirmationAddAggregationProductForCartModal,
  ] = useState(false)

  function closeConfirmationAddAggregationProductForCartModal() {
    setIsOpenConfirmationAddAggregationProductForCartModal(false)
  }

  function openConfirmationAddAggregationProductForCartModal() {
    setIsOpenConfirmationAddAggregationProductForCartModal(true)
  }

  return {
    isOpenConfirmationAddAggregationProductForCartModal,
    closeConfirmationAddAggregationProductForCartModal,
    handleOpenModalAddAggregationProduct,
    handleNavAddSelectedGuarantee,
    handlePrefetchAggregationProductByAggregationProductId,
  }
}
