import { IQuestion } from '@/@model/question/question'
import { ReactNode } from 'react'
import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { RiQuestionAnswerLine } from 'react-icons/ri'

type IMeQuestionProps = {
  question: IQuestion
  children: ReactNode
}

function MeQuestion({ question, children }: IMeQuestionProps) {
  return (
    <div className="flex-[1]  border">
      <article className="mt-4 px-2 md:px-6">
        <div className="relative my-4 flex items-start space-x-4">
          <BsFillQuestionCircleFill className={`absolute w-4 text-gray-400`} />
          <div className="space-y-1 pl-4 font-medium dark:text-white">
            <p className="block text-sm text-gray-500 dark:text-gray-400">
              {question.question}
            </p>
            <footer className="mb-5 text-xs font-normal italic text-gray-500 dark:text-gray-400">
              <p>
                {`por ${question?.firstName} em ${question.created_at_formatted}`}
              </p>
            </footer>
          </div>
        </div>
      </article>

      {question?.answer && (
        <article className="mt-2 flex w-full px-6">
          <div className="my-4 flex w-full flex-col items-center space-x-4">
            <div className="relative  w-full border-l-2 pl-10 font-medium md:ml-16 dark:text-white">
              <RiQuestionAnswerLine
                className={`absolute left-3 w-4 text-gray-400`}
              />
              <p className="block text-sm text-gray-500 dark:text-gray-400">
                {question.answer.answer}
              </p>
              <div className="mb-5 text-xs font-normal italic text-gray-500 dark:text-gray-400">
                <p>
                  {`respondido por ${question.answer?.company} em ${question.answer?.created_at_formatted}`}
                </p>
              </div>
            </div>
            <div className="mt-4 flex h-[44px] w-max items-center justify-between rounded-sm bg-neutral-50 pl-2 md:w-full ">
              <div className="whitespace-nowrap text-sm font-bold text-neutral-500">
                essa resposta foi útil?
              </div>
              {children}
            </div>
          </div>
        </article>
      )}
    </div>
  )
}

export { MeQuestion }
