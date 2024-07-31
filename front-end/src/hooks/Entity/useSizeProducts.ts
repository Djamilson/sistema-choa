import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { IInfoDTO } from '@/@model/__DTOS'
import { ISizeProduct, TSizeProduct } from '@/@model/sizeProduct/sizeProduct'
import { api } from '@/_services/apiClient'

export type ISizeProductInfo = {
  info: IInfoDTO
  sizesProducts: ISizeProduct[]
}

export async function getSizesProductsPagination(
  page: number,
  limit: number,
  search: string,
): Promise<ISizeProductInfo> {
  const url = `sizes/products/pagination/list`

  const { data } = await api.get(url, {
    params: { page, limit, q: search },
  })

  console.log('Products::', data)

  const { info, sizesProducts } = data

  // aqui faço a formatação dos dados
  return {
    info,
    sizesProducts: sizesProducts.filter(
      (item: ISizeProduct) => item.description !== 'DEFAULT',
    ),
  }
}

export async function getSizesProducts(): Promise<ISizeProduct[]> {
  const url = `sizes/products`

  const { data } = await api.get(url)

  console.log('data', data)

  // aqui faço a formatação dos dados
  return data
}

export async function getSizeProduct(id: string): Promise<ISizeProduct> {
  const url = `sizes/products/${id}`

  const res = await api.get(url)

  console.log(res.data)

  return res.data
}

export async function getSizeProductAcronym(
  acronym: string,
): Promise<ISizeProduct> {
  const url = `sizes/products/acronym/show`

  const res = await api.get(url, { params: { acronym } })

  console.log(res.data)

  return res.data
}

export function useSizesProducts() {
  return useQuery({
    queryKey: ['hydrate-size-products'],
    queryFn: () => getSizesProducts(),
  }) as UseQueryResult<ISizeProduct[], unknown>
}

export async function getSizesProductsAcronym(
  acronym: string,
): Promise<ISizeProduct[]> {
  const url = `sizes/products/acronym`

  const { data } = await api.get(url, {
    params: { acronym },
  })

  return [...data.sizesProducts]
}

export function useSizesProductsAcronym(acronym: string) {
  return useQuery({
    queryKey: ['hydrate-size-products-pagination-acronym', acronym],
    queryFn: () => getSizesProductsAcronym(acronym),
  }) as UseQueryResult<ISizeProduct[], unknown>
}

export async function getSizesProductsPaginationIsAcronym(
  page: number,
  limit: number,
  search: string,
  isacronym: string,
): Promise<TSizeProduct> {
  const url = `sizes/products/pagination/isacronym`

  const { data } = await api.get(url, {
    params: { page, limit, q: search, isacronym },
  })

  console.log('sizesProducts::', data)

  const { info, sizesProducts } = data

  return {
    info,
    sizesProducts: sizesProducts?.filter(
      (item: ISizeProduct) => item.description !== 'DEFAULT',
    ),
  }
}

export function useSizesProductsPaginationIsAcronym(
  page: number,
  limit: number,
  search: string,
  isAcronym: string,
) {
  return useQuery({
    queryKey: [
      'hydrate-size-products-pagination-isacronym',
      { page: `${page}-${search}` },
    ],
    queryFn: () =>
      getSizesProductsPaginationIsAcronym(page, limit, search, isAcronym),
  }) as UseQueryResult<TSizeProduct, unknown>
}

export function useSizeProduct(id: string) {
  return useQuery({
    queryKey: ['hydrate-size-product', id],
    queryFn: () => getSizeProduct(id),
  }) as UseQueryResult<ISizeProduct, unknown>
}

export function useSizeProductByAcronym(acronym: string) {
  return useQuery({
    queryKey: ['hydrate-size-product-acronym', `${acronym}`],
    queryFn: () => getSizeProductAcronym(acronym),
  }) as UseQueryResult<ISizeProduct, unknown>
}

export function useSizesProductsPagination(
  page: number,
  limit: number,
  search: string,
) {
  return useQuery({
    queryKey: ['hydrate-size-products-pagination', `${page}-${search}`],
    queryFn: () => getSizesProductsPagination(page, limit, search),
  }) as UseQueryResult<ISizeProduct[], unknown>
}

export type ISizeAggregationProduct = {
  aggregationProductId: string
  size_product: ISizeProduct
}

type ISizeDB = {
  acronym: number
  aggregationProductId: string
  description: string
  id: string
  totalSize: number
}

export async function getSizesProductByProductId(
  productId: string,
): Promise<ISizeProduct[]> {
  const url = `sizes/products/aggregations/${productId}`

  const { data } = await api.get(url)

  return data.filter((size: ISizeDB) => size.totalSize > 0)
}

export function useTitlesEcommercesByInitialTitles(
  initialSizesProduct: ISizeProduct[],
  productId: string,
) {
  return useQuery({
    queryKey: ['initial-sizes-product', { productId }],
    queryFn: () => getSizesProductByProductId(productId),
    initialData: initialSizesProduct,
  }) as UseQueryResult<ISizeProduct[], unknown>
}

export function useSizesProductByProductId(productId: string) {
  return useQuery({
    queryKey: ['hydrate-sizes-product', { productId }],
    queryFn: () => getSizesProductByProductId(productId),
  }) as UseQueryResult<ISizeProduct[], unknown>
}
