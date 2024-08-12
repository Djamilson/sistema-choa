import { IVoltageProduct } from '@/@model/voltageProduct/voltageProduct'
import { useMessageSelectedVoltageProductStore } from '@/contexts/product-detail/useMessageSelectedVoltageProductStore'
import { useSelectedColorProductStore } from '@/contexts/product-detail/useSelectedColorProductStore'
import { useSelectedVoltageProductStore } from '@/contexts/product-detail/useSelectedVoltageProductStore'
import { useVoltagesProductByProductId } from '@/hooks/Entity/useVoltageProducts'
import { filterVoltagesProductCompare } from '@/utils/filterVoltageProduct'
import { useEffect, useState } from 'react'

type IUseSelectedVoltageProduct = {
  productId: string
  filteredVoltagesProductIdBySelectedColorProductId: string[]
}

export const useSelectedVoltageProduct = ({
  productId,
  filteredVoltagesProductIdBySelectedColorProductId,
}: IUseSelectedVoltageProduct) => {
  const [filterVoltages, setFilterVoltages] = useState<IVoltageProduct[]>(
    [] as IVoltageProduct[],
  )
  const {
    data: voltagesProduct,
    isLoading: isLoadingVoltagesProduct,
    isFetching: isFetchingVoltagesProduct,
  } = useVoltagesProductByProductId(String(productId))

  const {
    state: { selectedVoltageProduct },
    actions: {
      setSelectedVoltageProductStore,
      clearSelectedVoltageProductStore,
    },
  } = useSelectedVoltageProductStore()

  const {
    state: { messageSelectedVoltageProduct },
    actions: { setMessageSelectedVoltageProductStore },
  } = useMessageSelectedVoltageProductStore()

  const {
    state: { selectedColorProduct },
  } = useSelectedColorProductStore()

  function handleVoltageProductClick(item: IVoltageProduct) {
    if (item.totalVoltage > 0) {
      setSelectedVoltageProductStore({ selectedVoltageProduct: item })
    }
    setMessageSelectedVoltageProductStore({
      messageSelectedVoltageProduct: false,
    })
  }

  useEffect(() => {
    if (selectedColorProduct && selectedColorProduct.id) {
      setFilterVoltages(
        voltagesProduct
          ? filterVoltagesProductCompare(
              voltagesProduct,
              filteredVoltagesProductIdBySelectedColorProductId,
            ) || voltagesProduct
          : voltagesProduct || [],
      )
    } else {
      setFilterVoltages((voltagesProduct && voltagesProduct) || [])
    }
  }, [
    filteredVoltagesProductIdBySelectedColorProductId,
    selectedColorProduct,
    voltagesProduct,
  ])

  const isVoltageProductDisabled = (item: IVoltageProduct) => {
    return (
      item.totalVoltage < 1 ||
      (selectedVoltageProduct && selectedVoltageProduct.id === item.id)
    )
  }

  return {
    isLoadingVoltagesProduct,
    isFetchingVoltagesProduct,
    isVoltageProductDisabled,
    handleVoltageProductClick,
    filterVoltages,
    messageSelectedVoltageProduct,
    clearSelectedVoltageProductStore,
    selectedVoltageProduct,
  }
}
