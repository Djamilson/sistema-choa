export type IStarReview = {
  order: number
  star: number
}

export type IAvaliationReview = {
  totalReview: number
  average: string
  starReviews: IStarReview[]
}

export type TAvaliation = {
  author_id: string
  review_id: string
  status: boolean
}

export type IReview = {
  id: string
  title: string
  comment: string
  created_at: Date
  review: number
  status: string
  author_id: string

  aggregation_product_id: string
  aggregation_product: {
    id: string
  }
  created_at_formatted: string

  firstName: string
  reviews_avaliations: TAvaliation[]
  meAvaliationReview: boolean | undefined

  reviewYesTotal: number
  reviewNotTotal: number

  author: {
    id: string
    person: {
      id: string
      name: string
    }
  }
}
