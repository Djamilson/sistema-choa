import { ReactNode } from 'react'
import Balance from 'react-wrap-balancer'

type IMessageNoReviewOrNoQuestionProps = {
  title: string
  subTitle: string
  children: ReactNode
}

function MessageNoReviewOrNoQuestion({
  children,
  title,
  subTitle,
}: IMessageNoReviewOrNoQuestionProps) {
  return (
    <div className="left-0 flex w-full flex-col bg-white px-4 py-4">
      <div className="flex-[1] border">
        <div className="text-md mt-4 flex items-center justify-center border-t-gray-200">
          <h3 className="mt-4 text-xl font-semibold text-gray-500">
            <Balance>{title}</Balance>
          </h3>
        </div>
        <div className="mb-5 flex items-center justify-center">{subTitle}</div>
        <div className="mb-8 flex items-center justify-center">{children}</div>
      </div>
    </div>
  )
}

export { MessageNoReviewOrNoQuestion }
