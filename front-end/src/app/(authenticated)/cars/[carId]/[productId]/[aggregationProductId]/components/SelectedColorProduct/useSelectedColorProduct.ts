'use client'

import { IColorProduct } from '@/@model/colorProduct/colorProduct'
import { useMessageSelectedColorProductStore } from '@/contexts/product-detail/useMessageSelectedColorProductStore'
import { useSelectedColorProductStore } from '@/contexts/product-detail/useSelectedColorProductStore'
import { useSelectedSizeProductStore } from '@/contexts/product-detail/useSelectedSizeProductStore'
import { useSelectedVoltageProductStore } from '@/contexts/product-detail/useSelectedVoltageProductStore'
import { useColorsProductByProductId } from '@/hooks/Entity/useColorsProduct'

type IUseSelectedColorProduct = {
  productId: string
}

export const useSelectedColorProduct = ({
  productId,
}: IUseSelectedColorProduct) => {
  const {
    data: colorsProduct,
    isLoading: isLoadingColorsProduct,
    isFetching: isFetchingColorsProduct,
  } = useColorsProductByProductId(productId)

  const {
    state: { selectedColorProduct },
    actions: { setSelectedColorProductStore, clearSelectedColorProductStore },
  } = useSelectedColorProductStore()

  const {
    actions: { clearSelectedSizeProductStore },
  } = useSelectedSizeProductStore()

  const {
    actions: { clearSelectedVoltageProductStore },
  } = useSelectedVoltageProductStore()

  const {
    state: { messageSelectedColorProduct },
    actions: { setMessageSelectedColorProductStore },
  } = useMessageSelectedColorProductStore()

  function handleColorProductClick(item: IColorProduct) {
    if (item.totalColor > 0) {
      setSelectedColorProductStore({ selectedColorProduct: item })
      clearSelectedSizeProductStore()
      clearSelectedVoltageProductStore()
    }
    setMessageSelectedColorProductStore({
      messageSelectedColorProduct: false,
    })
  }

  function isColorProductDisabled(item: IColorProduct) {
    return (
      item.totalColor < 1 ||
      (selectedColorProduct && selectedColorProduct.id === item.id)
    )
  }

  const handleRemoveSelections = () => {
    clearSelectedColorProductStore()
    clearSelectedSizeProductStore()
    clearSelectedVoltageProductStore()
  }

  return {
    messageSelectedColorProduct,
    handleRemoveSelections,
    isColorProductDisabled,
    handleColorProductClick,
    colorsProduct,
    isLoadingColorsProduct,
    isFetchingColorsProduct,
    selectedColorProduct,
  }
}
