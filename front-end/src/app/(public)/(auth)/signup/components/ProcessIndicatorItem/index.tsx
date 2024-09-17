import cn from '@/utils/cn'
import { ReactNode } from 'react'

type IProcessIndicatorItem = {
  title: string
  currentStep: number
  value: number
  children: ReactNode
}

const ProcessIndicatorItem = ({
  title,
  currentStep,
  value,
  children,
}: IProcessIndicatorItem) => {
  return (
    <div className="-ml-4 flex flex-col items-center gap-y-2">
      <span className="text-center text-sm">{title}</span>
      <span className="relative flex flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-red-100 p-1 hover:bg-black/[0.05]">
        <span
          className={cn(
            `inline-flex size-8 items-center justify-center rounded-full border-2 text-accent group-hover:border-green-100 group-hover:bg-green-200 dark:border-red-900 dark:bg-red-800 dark:text-red-400`,
            currentStep > value
              ? 'border-red-100 bg-red-200 text-accent'
              : 'bg-gray-100 text-neutral-400',
            currentStep === value ? 'bg-green-500 text-white' : 'bg-gray-100',
          )}
        >
          {children}
        </span>
      </span>
    </div>
  )
}

export default ProcessIndicatorItem
