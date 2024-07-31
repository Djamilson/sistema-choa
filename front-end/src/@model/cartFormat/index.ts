import { IAggregationProductCart } from '@/contexts/useCartStore'

export type ICartFormat = {
  subtotal: string
  objectAggregationProductCart: IAggregationProductCart
}
