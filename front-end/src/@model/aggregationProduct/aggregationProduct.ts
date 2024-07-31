import { IPhoto } from '../photo/photo'

export type IPrice = {
  price: number
  price_promotion: number
  price_format: string
  price_promotion_format: string
  number_times_sale?: { numberVez: string; price: string }
  id: string
}

export type IProvider = {
  id: string
  name: string
  phone: string
  email: string
}

export type IGuaranteePrice = {
  id: string
  price: number
  price_format?: string
  user_id: string
  guarantee_id: string
}

export enum GuaranteesStatusEnum {
  ACTIVATED = 'activated', // ativado
  ISACTIVATED = 'isactivated', // desativado
  CANCELED = 'canceled', // cancelado
}

export type IGuarantee = {
  id: string
  aggregation_product_id: string
  divided_into: number
  status: string
  time: string
  price_id: string
  provider_id: string
  provider: IProvider
  price: IGuaranteePrice
}

export type IAggregationProduct = {
  id: string
  canceled_at: string
  active_frontend: boolean
  created_at: string
  updated_at: string
  publisher: boolean
  price_id: string
  guarantees?: IGuarantee[]
  dimension_id: string
  type_product_id: string
  product_id: string
  divided_into: number
  voltage_product_id: string
  color_product_id: string
  size_product_id: string
  price: IPrice
  reviewValue: number
  totalReview: number
  total_in_stock: number
  photos: IPhoto[]
  product: {
    id: string
    subcategory: {
      id: string
      name: string
    }
  }
  thumbnail_url?: string
}
