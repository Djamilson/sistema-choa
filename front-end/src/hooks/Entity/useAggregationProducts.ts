import {
  IAggregationProduct,
  IGuarantee,
} from '@/@model/aggregationProduct/aggregationProduct'
import {
  IAggregationProducts,
  IAggregationProductsSearch,
} from '@/@model/aggregationProduct/aggregationProducts'
import { IFilterOff } from '@/@model/filter/filterOff/filterOff'
import { IFilterPrice } from '@/@model/filter/price/filterPrice'
import { api } from '@/_services/apiClient'
import { AppError } from '@/_services/errors/AppError'
import { formatPrice } from '@/utils/formatPrice'
import { numberTimesSale } from '@/utils/numberTimesSale'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

export type IFilterProps = {
  page: number
  limit: number
  publisher: boolean
  search: string
  filterOptionSearchOffs: IFilterOff[]
  filterOptionSearchPrices: IFilterPrice[]
}

export async function getAggregationProductsByCategoryId(
  page: number,
  limit: number,
  publisher: boolean,
  categoryId: string,
): Promise<IAggregationProducts> {
  const url = `aggregations/products/pagination/categories/${categoryId}`

  const { data } = await api.get(url, {
    params: { page, limit, publisher },
  })

  const aggregationProducts: IAggregationProduct[] =
    data.aggregationProducts.map((aggregationProduct: IAggregationProduct) => {
      return {
        ...aggregationProduct,
        price: {
          ...aggregationProduct.price,
          price_format: formatPrice(Number(aggregationProduct.price.price)),
          price_promotion_format: formatPrice(
            Number(aggregationProduct.price.price_promotion),
          ),

          number_times_sale: numberTimesSale({
            price_promotion: Number(aggregationProduct.price.price_promotion),
            price: Number(aggregationProduct.price.price),
            divided_into: aggregationProduct.divided_into,
          }),
        },
      }
    })

  const meData = {
    aggregationProducts,
    info: data.info,
  }

  return meData
}

export async function getAggregationProducts(
  page: number,
  limit: number,
  publisher: boolean,
  search: string,
): Promise<IAggregationProducts> {
  const url = `aggregations/products/pagination/list`

  const { data } = await api.get(url, {
    params: { page, limit, publisher, q: `${search || ''}` },
  })

  const aggregationProducts: IAggregationProduct[] =
    data?.aggregationProducts?.map(
      (aggregationProduct: IAggregationProduct) => {
        return {
          ...aggregationProduct,
          price: {
            ...aggregationProduct.price,
            price_format: formatPrice(Number(aggregationProduct.price.price)),
            price_promotion_format: formatPrice(
              Number(aggregationProduct.price.price_promotion),
            ),

            number_times_sale: numberTimesSale({
              price_promotion: Number(aggregationProduct.price.price_promotion),
              price: Number(aggregationProduct.price.price),
              divided_into: aggregationProduct.divided_into,
            }),
          },
        }
      },
    )

  const meData =
    data && data?.aggregationProducts?.length > 0
      ? {
          aggregationProducts,
          info: data.info,
        }
      : data

  return meData
}

export async function getAggregationProductsSearch(
  page: number,
  limit: number,
  publisher: boolean,
  search: string,
): Promise<IAggregationProductsSearch> {
  if (search.length < 1) return {} as IAggregationProductsSearch

  const url = `aggregations/products/search/list`

  const { data } = await api.get(url, {
    params: { page, limit, publisher, q: search || '' },
  })

  const aggregationProducts: IAggregationProduct[] =
    data.aggregationProducts.map((aggregationProduct: IAggregationProduct) => {
      return {
        ...aggregationProduct,
        price: {
          ...aggregationProduct.price,
          price_format: formatPrice(Number(aggregationProduct.price.price)),
          price_promotion_format: formatPrice(
            Number(aggregationProduct.price.price_promotion),
          ),

          number_times_sale: numberTimesSale({
            price_promotion: Number(aggregationProduct.price.price_promotion),
            price: Number(aggregationProduct.price.price),
            divided_into: aggregationProduct.divided_into,
          }),
        },
      }
    })

  const meData = {
    suggestions: data.suggestions,
    aggregationProducts,
    info: data.info,
  }

  return meData
}

export function useCategoriesByCategoryId(
  page: number,
  limit: number,
  status: boolean,
  categoryId: string,
) {
  return useQuery({
    queryKey: [`hydrate-categories-by-category-id`, `${page}-${categoryId}`],
    queryFn: () =>
      getAggregationProductsByCategoryId(page, limit, status, categoryId),
  }) as UseQueryResult<IAggregationProducts, unknown>
}

export function useAggregationProductsByCategoryId(
  page: number,
  limit: number,
  status: boolean,
  categoryId: string,
) {
  return useQuery({
    queryKey: [`hydrate-slide-aggregations-products`, `${page}-${categoryId}`],
    queryFn: () =>
      getAggregationProductsByCategoryId(page, limit, status, categoryId),
  }) as UseQueryResult<IAggregationProducts, unknown>
}

export function useAggregationProductsByInitialAggregationsProducts(
  page: number,
  limit: number,
  publisher: boolean,
  search: string,
  aggregationsProducts: IAggregationProducts,
) {
  return useQuery({
    queryKey: ['initial-aggregations-products'],
    queryFn: () => getAggregationProducts(page, limit, publisher, search),
    initialData: aggregationsProducts,
  }) as UseQueryResult<IAggregationProducts, unknown>
}

export function useAggregationProductsList(
  page: number,
  limit: number,
  publisher: boolean,
  search: string,
) {
  return useQuery<IAggregationProducts, unknown>({
    queryKey: ['hydrate-aggregations-products', `${page}-${search}`],
    queryFn: () => getAggregationProducts(page, limit, publisher, search),
  })
}

export function useAggregationProductsListSearch(
  page: number,
  limit: number,
  status: boolean,
  search: string,
) {
  return useQuery({
    queryKey: ['hydrate-products-list-search', `${page}-${search}`],
    queryFn: () => getAggregationProductsSearch(page, limit, status, search),
  }) as UseQueryResult<IAggregationProductsSearch, unknown>
}

export async function getAggregationProductsSearchFilter({
  limit,
  page,
  search,
  publisher,
  filterOptionSearchOffs,
  filterOptionSearchPrices,
}: IFilterProps): Promise<IAggregationProductsSearch> {
  console.log('vamos lar inicio search.length', search.length)

  if (search.length < 1) return {} as IAggregationProductsSearch

  const url = `aggregations/products/pagination/searches/filters`

  const me = {
    page,
    limit,
    publisher,
    q: search || '',
    filterOptionSearchOffs:
      filterOptionSearchOffs.length > 0
        ? filterOptionSearchOffs
        : [
            {
              id: '',
              from: '',
              to: '',
              status: true,
            },
          ],
    filterOptionSearchPrices:
      filterOptionSearchPrices.length > 0
        ? filterOptionSearchPrices
        : [{ id: '', from: '', to: '', status: true }],
  }

  const { data } = await api.post(url, me)

  const aggregationProducts: IAggregationProduct[] =
    data.aggregationProducts.map((aggregationProduct: IAggregationProduct) => {
      return {
        ...aggregationProduct,
        price: {
          ...aggregationProduct.price,
          price_format: formatPrice(Number(aggregationProduct.price.price)),
          price_promotion_format: formatPrice(
            Number(aggregationProduct.price.price_promotion),
          ),

          number_times_sale: numberTimesSale({
            price_promotion: Number(aggregationProduct.price.price_promotion),
            price: Number(aggregationProduct.price.price),
            divided_into: aggregationProduct.divided_into,
          }),
        },
      }
    })

  const meData = {
    suggestions: data.suggestions,
    aggregationProducts,
    info: data.info,
  }

  return meData
}

export function useAggregationProductsListSearchFilter({
  limit,
  page,
  search,
  publisher,
  filterOptionSearchOffs,
  filterOptionSearchPrices,
}: IFilterProps) {
  return useQuery({
    queryKey: ['hydrate-products-filter-search', `${page}-${search}`],
    queryFn: () =>
      getAggregationProductsSearchFilter({
        limit,
        page,
        search,
        publisher,
        filterOptionSearchOffs,
        filterOptionSearchPrices,
      }),
  }) as UseQueryResult<IAggregationProductsSearch, unknown>
}

type IP = {
  aggregationProductId?: string
}
export async function getAggregationProductByAggregationProductId({
  aggregationProductId,
}: IP): Promise<IAggregationProduct> {
  const url = `aggregations/products/${aggregationProductId}`

  const { data } = await api.get(url)

  const meAggregationProduct: IAggregationProduct = {
    ...data,
    guarantees: data.guarantees
      ? data.guarantees.map((guarantee: IGuarantee) => {
          return {
            ...guarantee,
            price: {
              ...guarantee.price,
              price_format: formatPrice(Number(guarantee.price.price)),
            },
          }
        })
      : [],
    price: {
      ...data.price,
      price_format: formatPrice(Number(data.price.price)),
      price_promotion_format: formatPrice(Number(data.price.price_promotion)),
      number_times_sale: numberTimesSale({
        price_promotion: Number(data.price.price_promotion),
        price: Number(data.price.price),
        divided_into: data.divided_into,
      }),
    },
  }

  return meAggregationProduct
}

export function useAggregationProductByAggregationProductIdByInitialAggregationProduct(
  aggregationProductId: string,
  initialAggregationProduct: IAggregationProduct,
) {
  return useQuery({
    queryKey: ['initial-aggregation-product', aggregationProductId],
    queryFn: () =>
      getAggregationProductByAggregationProductId({
        aggregationProductId,
      }),
    initialData: initialAggregationProduct,
  }) as UseQueryResult<IAggregationProduct, unknown>
}

export function useAggregationProductByAggregationProductId(
  aggregationProductId: string,
) {
  try {
    const m = useQuery({
      queryKey: ['hydrate-aggregation-product', aggregationProductId],
      queryFn: () =>
        getAggregationProductByAggregationProductId({
          aggregationProductId,
        }),
    }) as UseQueryResult<IAggregationProduct, unknown>

    return m
  } catch (error) {
    console.log('error::', error)
    throw new AppError(error)
  }
}
