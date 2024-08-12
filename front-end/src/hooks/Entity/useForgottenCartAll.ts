import { IAggregationProductCart } from '@/contexts/useCartStore'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../_services/apiClient'

export type IAggregationProductAmount = {
  amount: number
  guarantee_id?: string
  total_in_stock: number
  aggregation_product_id: string
  isAuthenticated: boolean
}

export async function updateForgottenCarts(
  productAmount: Omit<
    IAggregationProductAmount,
    'isAuthenticated' | 'total_in_stock'
  >,
): Promise<void> {
  await api.put(`forgotten/carts/update`, productAmount)
}

export async function removeItemForgottenCarts(
  aggregationProductId: string,
): Promise<void> {
  await api.delete(`forgotten/carts/remove/item/${aggregationProductId}`)
}

export async function destroyForgottenCarts(): Promise<void> {
  await api.get(`forgotten/carts/destroy`)
}

// initial

export async function createForgottenCarts(
  aggregationProductAmount: Omit<
    IAggregationProductAmount,
    'isAuthenticated' | 'total_in_stock'
  >,
): Promise<IAggregationProductCart> {
  const { data } = await api.post(
    `forgotten/carts/create`,
    aggregationProductAmount,
  )

  return data
}

export async function getForgottenCartsUpdate(
  productAmounts: Omit<
    IAggregationProductAmount,
    'isAuthenticated' | 'total_in_stock'
  >[],
): Promise<IAggregationProductCart[]> {
  const { data } = await api.put(`forgotten/carts`, {
    products: productAmounts,
  })
  console.log('getForgottenCartsUpdate:::', data)

  return data
}

export async function getForgottenCarts(): Promise<IAggregationProductCart[]> {
  const { data } = await api.get(`forgotten/carts`)

  console.log('getForgottenCarts:::', data)

  return data
}

export function useForgottenCartsUpdate(
  productAmounts: Omit<IAggregationProductAmount, 'isAuthenticated'>[],
) {
  return useQuery<IAggregationProductCart[], unknown>({
    queryKey: ['hydrate-products-cart'],
    queryFn: () => getForgottenCartsUpdate(productAmounts),
  })
}
