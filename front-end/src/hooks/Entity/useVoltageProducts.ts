import { useQuery, UseQueryResult } from '@tanstack/react-query'

import {
  IVoltageProduct,
  TVoltageProductInfo,
} from '@/@model/voltageProduct/voltageProduct'
import { api } from '@/_services/apiClient'

export async function getVoltagesProducts(): Promise<IVoltageProduct[]> {
  const url = `voltages/products`

  const { data } = await api.get(url)

  console.log('data', data)

  // aqui faço a formatação dos dados
  return data
}

export async function getVoltageProduct(id: string): Promise<IVoltageProduct> {
  const url = `voltages/products/${id}`

  const res = await api.get(url)

  console.log(res.data)

  return res.data
}

export function useVoltagesProducts() {
  return useQuery<IVoltageProduct[], unknown>({
    queryKey: ['hydrate-voltages-products'],
    queryFn: () => getVoltagesProducts(),
  })
}

export function useVoltageProduct(voltageProductId: string) {
  return useQuery<IVoltageProduct, unknown>({
    queryKey: ['hydrate-voltage-product-id', voltageProductId],
    queryFn: () => getVoltageProduct(voltageProductId),
  })
}

export async function getVoltagesProductsPagination(
  page: number,
  limit: number,
  search: string,
): Promise<TVoltageProductInfo> {
  const url = `voltages/products/pagination/list`

  const { data } = await api.get(url, {
    params: { page, limit, q: search },
  })

  console.log('Voltages::', data)

  const { info, voltagesProducts } = data

  // aqui faço a formatação dos dados
  return {
    info,
    voltagesProducts: voltagesProducts.filter(
      (item: IVoltageProduct) => item.voltage !== 'DEFAULT',
    ),
  }
}

export function useVoltagesProductsPagination(
  page: number,
  limit: number,
  search: string,
) {
  return useQuery<TVoltageProductInfo, unknown>({
    queryKey: ['hydrate-voltages-product-pagination', `${page}- ${search}`],
    queryFn: () => getVoltagesProductsPagination(page, limit, search),
  })
}

/* export type IVoltageProduct = {
    id: string
    description: string
    acronym: string
} */

export type IVoltageAggregationProduct = {
  aggregationProductId: string
  voltage_product: IVoltageProduct
}

export async function getVoltagesProductByProductId(
  productId: string,
): Promise<IVoltageProduct[]> {
  const url = `voltages/products/aggregations/${productId}`

  const { data } = await api.get(url)

  return data
}

export function useVoltagesProductByProductIdAndInitialVoltagesProductByProductId(
  initialColorsProducts: IVoltageProduct[],
  productId: string,
) {
  return useQuery({
    queryKey: ['initial-voltages-product', { product_id: productId }],
    queryFn: () => getVoltagesProductByProductId(productId),
    initialData: initialColorsProducts,
  }) as UseQueryResult<IVoltageProduct[], unknown>
}

export function useVoltagesProductByProductId(productId: string) {
  return useQuery<IVoltageProduct[], unknown>({
    queryKey: ['hydrate-voltages-product', { product_id: productId }],
    queryFn: () => getVoltagesProductByProductId(productId),
  })
}
