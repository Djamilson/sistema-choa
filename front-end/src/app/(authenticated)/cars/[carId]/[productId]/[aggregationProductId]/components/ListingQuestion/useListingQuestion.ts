'use client'

import { IQuestion } from '@/@model/question/question'
import { api } from '@/_services/apiClient'
import { Toast } from '@/components/Toast'
import useCheckIsAuthenticatedGetSession from '@/hooks/auth/useCheckIsAuthenticatedGetSession'
import useGetUserBySession from '@/hooks/auth/useGetUserBySession'
import {
  IQuestionsInfo,
  useQuestionsByAggregationProductId,
} from '@/hooks/Entity/useQuestions'
import { getUniqueListBy } from '@/utils/getUniqueListBy'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type IUseListQuestionProps = {
  aggregationProductId: string
}

export type THandleQuestion = {
  yesOrNot: 'yes' | 'not'
  answerId: string
  oldStatus: boolean
}

export const useListQuestion = ({
  aggregationProductId,
}: IUseListQuestionProps) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const INITIAL_PAGE_QUESTION = 1
  const INITIAL_LIMIT_QUESTION = 3

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [pageQuestion, setPageQuestion] = useState(INITIAL_PAGE_QUESTION)
  const [limitQuestion] = useState(INITIAL_LIMIT_QUESTION)
  const [questions, setQuestions] = useState({} as IQuestionsInfo)
  const [yesOrNot, setYesOrNot] = useState<'yes' | 'not' | undefined>('yes')
  const [selectedAnswerId, setSelectedAnswerId] = useState<string>('')

  const isAuthenticated = useCheckIsAuthenticatedGetSession()
  const user = useGetUserBySession()

  const {
    data: questionsDataBase,
    isLoading: isLoadingQuestion,
    isFetching: isFetchingQuestion,
  } = useQuestionsByAggregationProductId({
    page: pageQuestion,
    limit: limitQuestion,
    aggregationProductId: String(aggregationProductId),
    userId: user ? user.id : undefined,
  })

  useEffect(() => {
    if (
      typeof questionsDataBase === 'object' &&
      questionsDataBase !== null &&
      questionsDataBase?.questions &&
      questionsDataBase?.questions?.length > 0 &&
      questionsDataBase?.info.page === pageQuestion
    ) {
      setQuestions((old) => {
        const meOld = old?.questions || []
        const array = [...meOld, ...questionsDataBase.questions]

        return {
          questions: getUniqueListBy(array) as unknown[] as IQuestion[],
          info: questionsDataBase.info,
        }
      })
    }
  }, [questionsDataBase, pageQuestion])

  function addPage() {
    setPageQuestion((old) => old + 1)
  }

  const { mutateAsync: updateStatusQuestion } = useMutation({
    mutationFn: async ({ yesOrNot, answerId, oldStatus }: THandleQuestion) => {
      const statusQuestion = await api.post(
        `questions/answers/avaliations/${yesOrNot}/${answerId}`,
        {
          oldStatus,
        },
      )

      return statusQuestion.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hydrate-questions'] })
    },
  })

  async function handleChangerStatusQuestion({
    yesOrNot,
    answerId,
    oldStatus,
  }: THandleQuestion) {
    try {
      setIsLoading(true)
      setSelectedAnswerId(answerId)
      setYesOrNot(yesOrNot)

      const updateQuestion = await updateStatusQuestion({
        yesOrNot,
        answerId,
        oldStatus,
      })

      setQuestions((olds) => {
        const { questions, info } = olds
        const { answer_id, status } = updateQuestion

        const updatedQuestions = questions.map((item) => {
          if (item.answer.id !== answer_id) {
            return item
          }

          const oldStatus = Boolean(item.answer)
          let answerYesTotal = item.answer.answerYesTotal
          let answerNotTotal = item.answer.answerNotTotal
          let meAvaliationAnswer = status

          if (status && item.answer.meAvaliationAnswer === undefined) {
            answerYesTotal++
          } else if (
            !status &&
            item.answer.meAvaliationAnswer !== false &&
            oldStatus
          ) {
            answerNotTotal++
            if (item.answer.answerYesTotal > 0) {
              answerYesTotal--
            }
          } else if (status && item.answer.meAvaliationAnswer === false) {
            answerYesTotal++
            if (item.answer.answerNotTotal > 0) {
              answerNotTotal--
            }
          } else if (!status && item.answer.meAvaliationAnswer === true) {
            if (item.answer.answerNotTotal > 0) {
              answerNotTotal--
            }
          } else if (status && item.answer.meAvaliationAnswer === true) {
            if (item.answer.answerYesTotal > 0) {
              answerYesTotal--
            }
            meAvaliationAnswer = undefined
          } else if (!status && item.answer.meAvaliationAnswer === false) {
            if (item.answer.answerNotTotal > 0) {
              answerNotTotal--
            }
            meAvaliationAnswer = undefined
          }

          return {
            ...item,
            answer: {
              ...item.answer,
              answerYesTotal,
              answerNotTotal,
              meAvaliationAnswer,
            },
          }
        })

        return { questions: updatedQuestions, info }
      })

      Toast({
        message: 'Avaliação adicionada com sucesso!',
        type: 'success',
      })
    } catch (error) {
      const message = 'Ocorreu uma falha ao tentar avaliar, tente novamente!'

      Toast({
        type: 'error',
        message,
      })
    } finally {
      setIsLoading(false)
      setSelectedAnswerId('')
      setYesOrNot(undefined)
    }
  }

  async function handleQuestionYesOrNot(data: THandleQuestion) {
    if (isAuthenticated) {
      handleChangerStatusQuestion(data)
    } else {
      router.push('/signin')
    }
  }

  return {
    isLoadingQuestion,
    isFetchingQuestion,
    isLoading,
    handleQuestionYesOrNot,
    questions,
    selectedAnswerId,
    yesOrNot,
    addPage,
    pageQuestion,
  }
}
