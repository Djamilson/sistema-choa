import cn from '@/utils/cn'
import { HTMLAttributes, ReactNode } from 'react'

interface IAccordionContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function AccordionContainer({
  children,
  ...rest
}: IAccordionContainerProps) {
  return (
    <div className={cn('flex w-full flex-col', rest.className)} {...rest}>
      {children}
    </div>
  )
}
