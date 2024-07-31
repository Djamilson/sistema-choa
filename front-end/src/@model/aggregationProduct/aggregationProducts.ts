import IInfo from '../product/info'
import { IAggregationProduct } from './aggregationProduct'

export type IAggregationProducts = {
  aggregationProducts: IAggregationProduct[]
  info: IInfo
}

export type ISuggestionAggregationProduct = {
  product_id: string
  name: string
}

export type IAggregationProductsSearch = {
  suggestions: ISuggestionAggregationProduct[]
  aggregationProducts: IAggregationProduct[]
  info: IInfo
}
