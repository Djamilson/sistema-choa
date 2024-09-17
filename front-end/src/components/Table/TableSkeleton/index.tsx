import { MessageComponent } from '@/components/MessageComponent'
import cn from '@/utils/cn'
import { ReactNode } from 'react'

type IProps = {
  children: ReactNode
  isLoading: boolean
  isFetching: boolean
  error: unknown
  title: string
  message: string
  className?: string
  limit?: number
}

function TableSkeleton({
  children,
  isFetching,
  isLoading,
  error,
  title,
  message,
  className,
  limit = 5,
}: IProps) {
  return isLoading && isFetching ? (
    <div
      role="status"
      className={cn(
        'w-full animate-pulse space-y-4 divide-y divide-gray-200 rounded border border-gray-200 p-4 shadow dark:divide-gray-700 dark:border-gray-700 md:p-6',
        className || '',
      )}
    >
      {[...new Array(limit)].map((_, index) => {
        return (
          <div key={index} className="flex items-center justify-between pt-4">
            <div>
              <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <div className="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <div>
              <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <div className="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <div>
              <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <div className="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
          </div>
        )
      })}
      <span className="sr-only">Loading...</span>
    </div>
  ) : error ? (
    <MessageComponent title={title} message={message} />
  ) : (
    <div className="flex w-full">{children}</div>
  )
}

export { TableSkeleton }
