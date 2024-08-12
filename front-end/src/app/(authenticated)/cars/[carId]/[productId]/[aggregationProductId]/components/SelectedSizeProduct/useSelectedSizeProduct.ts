import { ISizeProduct } from '@/@model/sizeProduct/sizeProduct'
import { useMessageSelectedSizeProductStore } from '@/contexts/product-detail/useMessageSelectedSizeProductStore'
import { useSelectedColorProductStore } from '@/contexts/product-detail/useSelectedColorProductStore'
import { useSelectedSizeProductStore } from '@/contexts/product-detail/useSelectedSizeProductStore'
import { useSizesProductByProductId } from '@/hooks/Entity/useSizeProducts'
import { filterSizesProductCompare } from '@/utils/filterSizeProduct'
import { useEffect, useState } from 'react'

type IUseSelectedSizeProductProps = {
  productId: string
  filteredSizesProductIdBySelectedColorProductId: string[]
}

export const useSelectedSizeProduct = ({
  productId,
  filteredSizesProductIdBySelectedColorProductId,
}: IUseSelectedSizeProductProps) => {
  const {
    data: sizesProduct,
    isLoading: isLoadingSizesProduct,
    isFetching: isFetchingSizesProduct,
  } = useSizesProductByProductId(String(productId))

  const [filterSizes, setFilterSizes] = useState<ISizeProduct[]>(
    [] as ISizeProduct[],
  )

  const {
    state: { selectedColorProduct },
  } = useSelectedColorProductStore()

  useEffect(() => {
    if (selectedColorProduct && selectedColorProduct.id) {
      setFilterSizes(
        sizesProduct
          ? filterSizesProductCompare(
              sizesProduct,
              filteredSizesProductIdBySelectedColorProductId,
            ) || sizesProduct
          : sizesProduct || [],
      )
    } else {
      setFilterSizes((sizesProduct && sizesProduct) || [])
    }
  }, [
    filteredSizesProductIdBySelectedColorProductId,
    sizesProduct,
    selectedColorProduct,
  ])

  const {
    state: { selectedSizeProduct },
    actions: { setSelectedSizeProductStore, clearSelectedSizeProductStore },
  } = useSelectedSizeProductStore()

  const {
    state: { messageSelectedSizeProduct },
    actions: { setMessageSelectedSizeProductStore },
  } = useMessageSelectedSizeProductStore()

  const handleSizeProductClick = (item: ISizeProduct) => {
    if (item.totalSize > 0) {
      setSelectedSizeProductStore({ selectedSizeProduct: item })
    }
    setMessageSelectedSizeProductStore({
      messageSelectedSizeProduct: false,
    })
  }

  const isSizeProductDisabled = (item: ISizeProduct) => {
    return (
      item.totalSize < 1 ||
      (selectedSizeProduct && selectedSizeProduct.id === item.id)
    )
  }

  return {
    isLoadingSizesProduct,
    isFetchingSizesProduct,
    filterSizes,
    isSizeProductDisabled,
    handleSizeProductClick,
    messageSelectedSizeProduct,
    clearSelectedSizeProductStore,
    selectedSizeProduct,
  }
}
