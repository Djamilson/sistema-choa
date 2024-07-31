import {
  IGuarantee,
  IPrice,
} from '@/@model/aggregationProduct/aggregationProduct'
import { IBrand } from '@/@model/brand'
import { IPhoto } from '@/@model/photo/photo'
import { IDataSheet } from '@/@model/product/IDataSheet'
import ISubCategory from '@/@model/subcategory/subcategory'

export type IDescription = {
  id: string
  description: string
}

export type IProductInfo = {
  id: string
  company: string
  currency: string
  freight: number
  link: number
  price: number
  price_promotion: number
  stock: number
}

export type IQuestionAvaliation = {
  id: string
  status: boolean
  answer_id: string
  author_id: string
  author: string
}

export type IAggregationProductDetail = {
  id: string
  active_frontend: boolean
  canceled_at?: string
  publisher: boolean
  product_id: string
  product: {
    id: string
    subcategory: ISubCategory
  }
  divided_into: number
  guarantees?: IGuarantee[]
  voltage_product: {
    id: string
    voltage: string
  }
  type_product: {
    id: string
    acronym: string
    description: string
  }
  photos: IPhoto[]
  size_product: {
    id: string
    description: string
    acronym: string
  }
  color_product: {
    id: string
    color: string
  }
  dimension: {
    id: string
    height: string
    length: string
    weight: string
    width: string
  }
  price: IPrice
}

export type IAggregationProductDetailEcommerce = {
  id: string
  active_frontend: boolean
  canceled_at?: string
  publisher: boolean
  product_id: string
  product: {
    id: string
    subcategory: ISubCategory
  }
  total_stock: number
  divided_into: number
  guarantees?: IGuarantee[]
  dataSheets: IDataSheet[]
  reviewValue: number
  totalReview: number
  total_reviews?: number
  voltage_product: {
    id: string
    voltage: string
    totalVoltage: number
  }
  type_product: {
    id: string
    acronym: string
    description: string
  }
  photos: IPhoto[]
  size_product: {
    id: string
    description: string
    acronym: string
    totalSize: number
  }
  unit_measurement: {
    id: string
    description: string
    acronym: string
  }
  color_product: {
    id: string
    color: string
    totalColor: number
  }
  dimension: {
    id: string
    height: string
    length: string
    weight: string
    width: string
  }
  price: IPrice
}

export type IProductEcommerce = {
  id: string
  sku: string
  status_freight: boolean
  bar_code?: string
  description: string
  slug?: string
  thumbnail?: string
  aggregationProducts: IAggregationProductDetailEcommerce[]
  subcategory: ISubCategory
}

export type IProduct = {
  id: string
  sku: string
  status_freight: boolean
  bar_code?: string
  description: string
  slug?: string
  thumbnail?: string
  aggregationProducts: IAggregationProductDetailEcommerce[]
  subcategory: ISubCategory
  status_product: boolean
  product_info_id: string
  subcategory_id: string
  brand: IBrand
  thumbnail_url?: string
}
