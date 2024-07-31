import {
  IAggregationProductDetail,
  IAggregationProductDetailEcommerce,
  IProduct,
  IProductEcommerce,
} from '@/@model/product/product'
import { IProducts } from '@/@model/product/products'
import { api } from '@/_services/apiClient'
import { formatPrice } from '@/utils/formatPrice'
import { numberTimesSale } from '@/utils/numberTimesSale'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

export async function getProduct(id: string): Promise<IProduct> {
  const url = `products/${id}`

  const { data } = await api.get(url)

  return data
}

export function useProductByProductId(productId: string) {
  return useQuery({
    queryKey: ['hydrate-product-by-product-id', productId],
    queryFn: () => getProduct(productId),
  }) as UseQueryResult<IProduct, unknown>
}

export async function getProducts(
  page: number,
  limit: number,
  publisher: boolean,
  search: string,
): Promise<IProducts> {
  const url = `products/pagination/list`

  const { data } = await api.get(url, {
    params: { page, limit, publisher, q: search || '' },
  })

  const p: IProduct[] = data.products.map((product: IProduct) => {
    return {
      ...product,
      aggregationProducts: product.aggregationProducts.map(
        (aggregationProduct: IAggregationProductDetail) => {
          return {
            ...aggregationProduct,
            price: {
              ...aggregationProduct.price,
              price_format: formatPrice(Number(aggregationProduct.price.price)),
              price_promotion_format: formatPrice(
                Number(aggregationProduct.price.price_promotion),
              ),

              number_times_sale: numberTimesSale({
                price_promotion: Number(
                  aggregationProduct.price.price_promotion,
                ),
                price: Number(aggregationProduct.price.price),
                divided_into: aggregationProduct.divided_into,
              }),
            },
          }
        },
      ),
    }
  })

  const meData = {
    products: p,
    info: data.info,
  }

  return meData
}

export async function getProductAndAggregationsByProductId(
  id: string,
): Promise<IProductEcommerce | null> {
  try {
    const url = `products/details`

    const { data } = await api.get(url, {
      params: { productId: id },
    })

    const meProduct: IProductEcommerce = {
      ...data,
      aggregationProducts: data.aggregationProducts?.map(
        (item: IAggregationProductDetailEcommerce) => {
          return {
            ...item,
            total_stock: item.total_stock,
            price: {
              ...item.price,
              price_format: formatPrice(Number(item.price.price)),
              price_promotion_format: formatPrice(
                Number(item.price.price_promotion),
              ),
              number_times_sale: numberTimesSale({
                price_promotion: Number(item.price.price_promotion),
                price: Number(item.price.price),
                divided_into: item.divided_into,
              }),
            },
          }
        },
      ),
    }

    return meProduct
  } catch (e) {
    return null
  }
}

export function useProductAndAggregationsByProductIdByInitialProduct(
  initialProduct: IProduct,
  productId: string,
) {
  return useQuery({
    queryKey: ['initial-product-by-product-id', productId],
    queryFn: () => getProductAndAggregationsByProductId(productId),
    initialData: initialProduct,
  }) as UseQueryResult<IProduct, unknown>
}

export function useProductAndAggregationsByProductId(productId: string) {
  return useQuery({
    queryKey: ['hydrate-product-detail', productId],
    queryFn: () => getProductAndAggregationsByProductId(productId),
  }) as UseQueryResult<IProduct, unknown>
}
