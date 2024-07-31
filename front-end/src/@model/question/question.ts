import { IQuestionAvaliation } from '@/@model/product/product'
import { IUser } from '@/@model/user/user'

export type IAnswer = {
  id: string
  answer: string
  created_at: string
  created_at_formatted: string
  questions_avaliations: IQuestionAvaliation[]

  meAvaliationAnswer: boolean | undefined

  answerYesTotal: number
  answerNotTotal: number

  company: string
  author: IUser
}

export type IQuestion = {
  id: string
  question: string
  created_at: Date

  author_id: string
  answer_id: string
  answer: IAnswer
  aggregation_product_id: string
  aggregationProduct: {
    id: string
  }
  created_at_formatted: string

  firstName: string

  author: {
    id: string
    person: {
      id: string
      name: string
    }
  }
}
