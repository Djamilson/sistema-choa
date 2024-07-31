import {
  IAggregationProduct,
  IPrice,
} from '@/@model/aggregationProduct/aggregationProduct'

export type IOrdersOnProducts = {
  id: string
  quantity: number
  subtotal: string
  created_at: string
  orderPlacedHour: string
  confirmationPayment: string
  payment_collaborator: string
  status: string
  status_format: string
  price: IPrice
  aggregation_product: IAggregationProduct
}

export type IOrder = {
  id: string
  created_at: string
  distribution_status: string
  purchase_status: string
  total: string
  total_format: string
  freight: string
  user: {
    id: string
    person: {
      id: string
    }
  }
  orders_on_products: IOrdersOnProducts[]
}
