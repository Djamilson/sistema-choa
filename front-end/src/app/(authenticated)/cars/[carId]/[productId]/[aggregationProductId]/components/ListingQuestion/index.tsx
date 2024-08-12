'use client'

import { ReactNode } from 'react'
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import { Button } from '../../../../../../../components/buttons/Button'
import { LoadingPulseLoader } from '../../../../../../../components/loadings/LoadingPulseLoader'
import { AvaliationButton } from '../../../../../../../components/product-detail/AvaliationButton'
import { MeQuestion } from '../../../../../../../components/product-detail/question/MeQuestion'
import { useListQuestion } from './useListingQuestion'

type IListingQuestionProps = {
  aggregationProductId: string
  children: ReactNode
}

const ListingQuestion = ({
  aggregationProductId,
  children,
}: IListingQuestionProps) => {
  const {
    isLoadingQuestion,
    isFetchingQuestion,
    isLoading,
    handleQuestionYesOrNot,
    questions,
    selectedAnswerId,
    yesOrNot,
    addPage,
    pageQuestion,
  } = useListQuestion({ aggregationProductId })

  return (
    <div className="flex w-full flex-1 flex-col bg-white px-2 py-4 md:px-4">
      <div className="flex w-full flex-col border">
        <div className="flex-[1]">
          <div className="flex h-[54px] w-full items-center  rounded-b-none bg-neutral-50">
            <div className="text-md ml-2 font-bold text-neutral-500 md:ml-6 md:text-lg">
              questões
            </div>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center">
            {isLoadingQuestion && isFetchingQuestion && <LoadingPulseLoader />}

            {!isLoadingQuestion &&
              !isFetchingQuestion &&
              !questions?.questions?.length &&
              children}
          </div>

          <div className="flex items-center justify-center  md:mt-4 md:p-2">
            <div className="flex w-full flex-col gap-6 bg-white px-2 py-4 md:px-4">
              {questions &&
                questions.questions?.map((question) => {
                  return (
                    <MeQuestion key={question.id} question={question}>
                      <div className="flex items-center justify-between">
                        <AvaliationButton
                          isLoading={
                            selectedAnswerId === question.answer.id &&
                            yesOrNot === 'yes'
                              ? isLoading
                              : false
                          }
                          disabled={isLoading}
                          label={`(${question.answer.answerYesTotal})`}
                          icon={AiOutlineLike}
                          rest={`${
                            question?.answer.meAvaliationAnswer === true
                              ? `text-green-600`
                              : `text-gray-300`
                          }`}
                          onClick={() =>
                            handleQuestionYesOrNot({
                              answerId: question.answer.id,
                              yesOrNot: 'yes',
                              oldStatus: true,
                            })
                          }
                        />

                        <div className="">
                          <AvaliationButton
                            isLoading={
                              selectedAnswerId === question.answer.id &&
                              yesOrNot === 'not'
                                ? isLoading
                                : false
                            }
                            disabled={isLoading}
                            label={`(${
                              question.answer.answerNotTotal < 0
                                ? 0
                                : question.answer.answerNotTotal
                            })`}
                            icon={AiOutlineDislike}
                            rest={`${
                              question?.answer.meAvaliationAnswer === false
                                ? `text-accent`
                                : `text-gray-300`
                            }`}
                            onClick={() =>
                              handleQuestionYesOrNot({
                                answerId: question.answer.id,
                                yesOrNot: 'not',
                                oldStatus: false,
                              })
                            }
                          />
                        </div>
                      </div>
                    </MeQuestion>
                  )
                })}
            </div>
          </div>
        </div>
        {questions?.questions?.length > 0 &&
          pageQuestion < questions?.info?.pages && (
            <div className="my-6 flex w-full items-center justify-center">
              <div className="group col-span-1 ">
                <div className="flex w-full flex-col">
                  <Button
                    disabled={isLoading}
                    isLoading={isLoading}
                    type="button"
                    onClick={() => addPage()}
                  >
                    <> {`ver mais perguntas`}</>
                  </Button>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  )
}

export default ListingQuestion
