import cn from '@/utils/cn'
import { ReactNode } from 'react'

interface ITableTitleColumnProps {
  children: ReactNode
  className?: string
}

export function TableTitleColumn({
  children,
  className,
}: ITableTitleColumnProps) {
  return (
    <div
      className={cn(
        'grid h-12 items-center justify-center gap-x-3 border-b text-center text-sm font-medium text-black/[0.5] transition-all duration-150 md:px-4',
        className || '',
      )}
    >
      {children}
    </div>
  )
}
