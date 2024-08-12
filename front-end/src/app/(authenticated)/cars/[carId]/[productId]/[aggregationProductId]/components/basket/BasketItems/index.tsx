'use client'

import { IGuarantee } from '@/@model/aggregationProduct/aggregationProduct'

import { ICartFormat } from '@/@model/cartFormat'
import { Freight } from '@/components/Freight'
import BasketItem from '../BasketItem'
import { useBasketItems } from './useBasketItems'

export type IHandleRemoveGuaranteeProps = {
  aggregationProductId: string
  oldGuaranteeId?: string
  guarantees?: IGuarantee[]
}

export type IHandleSelectedGuaranteeProductProps = {
  aggregationProductId: string
  guaranteeId: string
  oldGuaranteeId?: string
}
type IBasketItemsProps = {
  cartFormatted: ICartFormat[]
}

function BasketItems({ cartFormatted }: IBasketItemsProps) {
  const {
    handleIncrementQuantity,
    handleDecrementQuantity,
    handleRemoveProduct,
  } = useBasketItems()

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-1 lg:max-w-5xl lg:gap-x-10">
      {cartFormatted?.map((item) => {
        return (
          <BasketItem
            key={item.objectAggregationProductCart.aggregationProduct.id}
            handleIncrementQuantity={handleIncrementQuantity}
            handleDecrementQuantity={handleDecrementQuantity}
            handleRemoveProduct={handleRemoveProduct}
            item={item.objectAggregationProductCart}
          />
        )
      })}
      <div className="mt-6">
        <Freight status_freight={true} />
      </div>
    </div>
  )
}

export { BasketItems }
