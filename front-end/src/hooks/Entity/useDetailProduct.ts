import {
  IAggregationProductDetailEcommerce,
  IProductEcommerce,
} from '@/@model/product/product'
import { api } from '@/_services/apiClient'
import { AppError } from '@/_services/errors/AppError'
import { formatPrice } from '@/utils/formatPrice'
import { numberTimesSale } from '@/utils/numberTimesSale'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

type IProductMeDetailsByProductIdProps = {
  productId: string
}

type IGetAggregationProductMeDetailsByAggregationProductIdProps = {
  aggregationProductId: string
}

export async function getAggregationProductMeDetailsByAggregationProductId({
  aggregationProductId,
}: IGetAggregationProductMeDetailsByAggregationProductIdProps): Promise<IAggregationProductDetailEcommerce | null> {
  const url = `me/aggregations/products/details`

  const { data } = await api.get(url, {
    params: { aggregationProductId },
  })

  const meAggregationProduct: IAggregationProductDetailEcommerce = {
    ...data,
  }

  return meAggregationProduct
}

export async function getProductMeDetailsByProductId({
  productId,
}: IProductMeDetailsByProductIdProps): Promise<IProductEcommerce> {
  const url = `me/products/details`

  const { data } = await api.get(url, {
    params: { productId },
  })

  const meProduct: IProductEcommerce = {
    ...data,
  }

  return meProduct
}

export function useProductMeDetailsByProductId(productId: string) {
  return useQuery<IProductEcommerce>({
    queryKey: ['hydrate-product-by-product-id', productId],
    queryFn: () => getProductMeDetailsByProductId({ productId }),
  }) as UseQueryResult<IProductEcommerce, unknown>
}

/*
type IGuarantee = {
  id: string
}

type IVoltageProduct = {
  id: string
  voltage: string
}

type IColorProduct = {
  id: string
  color: string
}

type ISizeProduct = {
  id: string
  description: string
  acronym: string
}

type IPrice = {
  id: string
  price: number
  price_promotion: number
  price_format: string
  price_promotion_format: string
  number_times_sale?: { numberVez: string; price: string }
}

export type IAggregationProductDetailEcommerce = {
  id: string
  guarantees: IGuarantee[]
  voltage_product: IVoltageProduct
  color_product: IColorProduct
  size_product: ISizeProduct
  divided_into: number
  thumbnail_url?: string
  photos: IPhoto[]
  product: {
    id: string
    subcategory: {
      name: string
    }
  }
  price: IPrice
} */

export async function getAggregationProductByProductId(
  productId: string,
): Promise<IAggregationProductDetailEcommerce[]> {
  try {
    const url = `aggregations/products/details/aggregations-products`

    const { data } = await api.get(url, {
      params: { productId },
    })

    const listAggregationsProducts: IAggregationProductDetailEcommerce[] =
      data?.map((aggregationProduct: IAggregationProductDetailEcommerce) => {
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

    return listAggregationsProducts
  } catch (err) {
    throw new AppError(err)
  }
}

export function useAggregationProductDetailByAggregationProductIds(
  productId: string,
) {
  return useQuery<IAggregationProductDetailEcommerce[], unknown>({
    queryKey: ['hydrate-list-aggregations-products', productId],
    queryFn: () => getAggregationProductByProductId(productId),
  })
}
