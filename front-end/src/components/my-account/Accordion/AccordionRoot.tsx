'use client'

import cn from '@/utils/cn'
import { ReactNode } from 'react'

type IAccordionRootProps = {
  children: ReactNode
  className?: string
}

export function AccordionRoot({ children, className }: IAccordionRootProps) {
  return (
    <div
      className={cn(
        'mt-4 flex flex-col gap-10 rounded-none border border-l-0 border-r-0 border-t-0 border-neutral-200 dark:border-neutral-600 dark:bg-neutral-800',
        className,
      )}
    >
      {children}
    </div>
  )
}
