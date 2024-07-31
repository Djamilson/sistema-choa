import { IInfoDTO } from '@/@model/__DTOS'
import { IOrder, IOrdersOnProducts } from '@/@model/order/order'
import { api } from '@/_services/apiClient'
import { dateFormattedDayMonth, dateFormattedHourMin } from '@/utils/formatDate'
import { formatPrice } from '@/utils/formatPrice'
import { getStatusOrderOnProduct } from '@/utils/getStatusOrderOnProduct'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

export async function getLastOrderByUserId(): Promise<IOrder | null> {
  try {
    const url = `orders/last`

    const { data } = await api.get(url)

    const meOrder: IOrder = {
      ...data,
      total_format: formatPrice(Number(data.total)),
      orders_on_products: data.orders_on_products?.map(
        (orderProduct: IOrdersOnProducts) => {
          return {
            ...orderProduct,
            status_format: getStatusOrderOnProduct(orderProduct.status),
            confirmationPayment: `${dateFormattedDayMonth(
              orderProduct.created_at,
            )} ${dateFormattedHourMin(orderProduct.created_at)}`,
            orderPlacedHour: `${dateFormattedDayMonth(
              orderProduct.created_at,
            )} ${dateFormattedHourMin(orderProduct.created_at)}`,
          }
        },
      ),
    }

    return meOrder
  } catch (e) {
    return null
  }
}

export function useLastOrderByUserId() {
  return useQuery({
    queryKey: ['hydrate-orders-by-user-id'],
    queryFn: () => getLastOrderByUserId(),
  }) as UseQueryResult<IOrder, unknown>
}

/* type IAddressProps = {
  id: string
  street: string
  number: number
  city: string
  state: string
  zip_code: string
  neighborhood: string
  complement: string
}

type IReceiverProps = {
  cpf: string
  name: string
  phone: string
  email: string
  address: IAddressProps
}

type IOrder = {
  canceled_at?: string
  id: string
  created_at: string
  purchase_status: string
  distribution_status: string
  freight: string
  total: string
  receiver: IReceiverProps
} */

export type IOrdersInfo = {
  orders: IOrder[]
  info: IInfoDTO
}

export async function getAllOrderByUserId(
  page: number,
  limit: number,
  userId: string,
): Promise<IOrdersInfo> {
  const url = `orders/pagination/all/${userId}`

  const { data } = await api.get(url, {
    params: { page, limit },
  })

  const { info, orders } = data
  const myOrders = orders?.map((order: IOrder) => {
    return {
      ...orders,
      total_format: formatPrice(Number(order.total)),
      orders_on_products:
        order.orders_on_products?.map((orderProduct: IOrdersOnProducts) => {
          return {
            ...orderProduct,
            status_format: getStatusOrderOnProduct(orderProduct.status),
            confirmationPayment: `${dateFormattedDayMonth(
              orderProduct.created_at,
            )} ${dateFormattedHourMin(orderProduct.created_at)}`,
            orderPlacedHour: `${dateFormattedDayMonth(
              orderProduct.created_at,
            )} ${dateFormattedHourMin(orderProduct.created_at)}`,
          }
        }) || [],
    }
  })

  return { orders: myOrders, info }
}

export function useAllOrderByUserId(
  page: number,
  limit: number,
  userId: string,
) {
  return useQuery({
    queryKey: [`hydrate-all-orders-by-userid`, `${page}-${userId}`],
    queryFn: () => getAllOrderByUserId(page, limit, userId),
  }) as UseQueryResult<IOrdersInfo, unknown>
}
