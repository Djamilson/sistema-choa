import cn from '@/utils/cn'
import { ButtonHTMLAttributes, ReactNode } from 'react'

interface IAccordionActionProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}
export function AccordionAction({ children, ...rest }: IAccordionActionProps) {
  return (
    <button
      {...rest}
      className={cn(
        'flex w-full items-center justify-between gap-3 border-b bg-neutral-50 px-5 py-4 text-left text-sm font-medium text-gray-700 hover:bg-neutral-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-50 md:gap-5',
        rest.className,
      )}
    >
      {children}
    </button>
  )
}
