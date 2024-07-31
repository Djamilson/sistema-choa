import cn from '@/utils/cn'
import { ButtonHTMLAttributes, ReactNode } from 'react'

interface IAccordionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}
export function AccordionButton({ children, ...rest }: IAccordionButtonProps) {
  return (
    <button
      {...rest}
      className={cn(
        'focus:shadow-outline relative h-10 w-full whitespace-nowrap  border border-accent py-1 text-sm font-medium text-accent shadow-sm ring-0 transition-all duration-150 hover:border-gray-200 hover:bg-accent hover:text-white hover:opacity-80 hover:ring-2 hover:ring-accent hover:ring-offset-1 hover:ring-offset-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 md:mt-0 md:px-16 md:ring-offset-accent',
        rest.className,
      )}
    >
      {children}
    </button>
  )
}
