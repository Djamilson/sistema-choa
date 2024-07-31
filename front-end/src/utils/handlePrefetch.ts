import {
  getAggregationProductByProductId,
  getProductMeDetailsByProductId,
} from '@/hooks/Entity/useDetailProduct'
import { getPoliticByPoliticId } from '@/hooks/Entity/usePolitics'
import { getQueryClient } from '@/tanStackQuery/getQueryClient'

const queryClient = getQueryClient()

export const handlePrefetchProductDetailByProductId = async (
  productId: string,
) => {
  if (productId) {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ['hydrate-product-by-product-id', productId],
        queryFn: () => getProductMeDetailsByProductId({ productId }),
      }),
      queryClient.prefetchQuery({
        queryKey: ['hydrate-list-aggregations-products', productId],
        queryFn: () => getAggregationProductByProductId(productId),
      }),
    ])
  }
}

export const handlePrefetchPoliticByPoliticId = async (politicId: string) => {
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['hydrate-politic-by-politic-id', politicId],
      queryFn: () => getPoliticByPoliticId(politicId),
    }),
  ])
}
