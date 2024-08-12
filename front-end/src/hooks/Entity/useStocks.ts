import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { api } from '../../_services/apiClient'

export type IQuantityAggregationProductInStock = {
  total: number
}

export async function checkTotalAggregationProductByAggregationProductId(
  aggregationProductId: string,
): Promise<number> {
  const url = `stocks/products/totals/${aggregationProductId}`

  const { data } = await api.get(url)

  return data
}

type IGetStockTotalAggregationProductByAggregationProductIdProps = {
  total: number
}

export async function getStockTotalAggregationProductByAggregationProductId(
  aggregationProductId: string,
): Promise<IGetStockTotalAggregationProductByAggregationProductIdProps> {
  const url = `stocks/products/${aggregationProductId}`
  const { data } = await api.get(url)

  return data
}

export function useGetStockTotalAggregationProductByAggregationProductId(
  aggregationProductId: string,
) {
  return useQuery({
    queryKey: ['hydrate-stock', aggregationProductId],
    queryFn: () =>
      getStockTotalAggregationProductByAggregationProductId(
        aggregationProductId,
      ),
  }) as UseQueryResult<
    IGetStockTotalAggregationProductByAggregationProductIdProps,
    unknown
  >
}
