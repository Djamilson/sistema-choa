import cn from '@/utils/cn'
import { ElementType } from 'react'

interface IAccordionIconProps {
  icon: ElementType
  className?: string
}
export function AccordionIconIcon({
  icon: Icon,
  className,
}: IAccordionIconProps) {
  return (
    <Icon
      className={cn(
        'flex w-full items-center justify-between bg-white px-5 py-4 text-left text-sm font-medium text-gray-700 hover:bg-neutral-50 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-50',
        className,
      )}
    />
  )
}
