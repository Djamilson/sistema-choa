import { useQuery, UseQueryResult } from '@tanstack/react-query'
import IInfo from '../../@model/product/info'
import { IQuestion } from '../../@model/question/question'
import { api } from '../../_services/apiClient'
import { dateFormattedBirthDate } from '../../utils/formatDate'

export type IQuestionsInfo = {
  questions: IQuestion[]
  info: IInfo
}
type TQuestionsByAggregationProductId = {
  page: number
  limit: number
  aggregationProductId: string
  userId: string | undefined
}

export async function getMeQuestions({
  page,
  limit,
  aggregationProductId,
  userId,
}: TQuestionsByAggregationProductId): Promise<IQuestionsInfo> {
  const url = `questions/pagination/ecommerce/list`

  const { data } = await api.get(url, {
    params: { page, limit, aggregationProductId },
  })

  const r: IQuestion[] = data?.questions?.map((question: IQuestion) => {
    return {
      ...question,

      firstName: question.author.person.name.split(' '),
      created_at_formatted: dateFormattedBirthDate(String(question.created_at)),
      answer: {
        ...question.answer,
        meAvaliationAnswer: question?.answer?.questions_avaliations.filter(
          (rAvaliation) => rAvaliation.author_id === userId,
        )[0]?.status,
        company: process.env.NEXT_PUBLIC_NAME_COMPANY,
      },
    }
  })

  const meData = {
    questions: r,
    info: data.info,
  }

  return meData
}

type TQuestionsByAggregationProductIdByInitialDataQuestions = {
  page: number
  limit: number
  aggregationProductId: string
  userId: string | undefined
  initialDataQuestions: IQuestionsInfo
}

export function useQuestionsByProductIdAndInitialQuestionsByProductId({
  page,
  limit,
  aggregationProductId,
  userId,
  initialDataQuestions,
}: TQuestionsByAggregationProductIdByInitialDataQuestions) {
  return useQuery({
    queryKey: ['initial-questions', `${aggregationProductId}-${page}`],
    queryFn: () =>
      getMeQuestions({ page, limit, aggregationProductId, userId }),
    initialData: initialDataQuestions,
  }) as UseQueryResult<IQuestionsInfo, unknown>
}

export function useQuestionsByAggregationProductId({
  page,
  limit,
  aggregationProductId,
  userId,
}: TQuestionsByAggregationProductId) {
  return useQuery({
    queryKey: ['hydrate-questions', `${aggregationProductId}-${page}`],
    queryFn: () =>
      getMeQuestions({ page, limit, aggregationProductId, userId }),
  }) as UseQueryResult<IQuestionsInfo, unknown>
}
