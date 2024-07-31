import { IColorProduct } from '@/@model/colorProduct/colorProduct'
import { api } from '@/_services/apiClient'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export type IColorAggregationProduct = {
  aggregationProductId: string
  color_product: IColorProduct
}

export async function getColorsProductByProductId(
  productId: string,
): Promise<IColorProduct[]> {
  const url = `colors/products/aggregations/${productId}`

  const { data } = await api.get(url)
  console.log('minhas cores:', data)
  return data.filter((color: any) => color.totalColor > 0)
}

export function useColorsProductByProductIdAndInitialColorsProduct(
  initialColorsProducts: IColorProduct[],
  productId: string,
) {
  return useQuery<IColorProduct[], unknown>({
    queryKey: ['initial-colors-product', { product_id: productId }],
    queryFn: () => getColorsProductByProductId(productId),
    initialData: initialColorsProducts,
  }) as UseQueryResult<IColorProduct[], unknown>
}

export function useColorsProductByProductId(productId: string) {
  return useQuery<IColorProduct[], unknown>({
    queryKey: ['hydrate-colors-product'],
    queryFn: () => getColorsProductByProductId(productId),
  }) as UseQueryResult<IColorProduct[], unknown>
}
