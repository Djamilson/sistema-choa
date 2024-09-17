import cn from '@/utils/cn'
import { ElementType, ReactNode } from 'react'

interface IShippingChartIconProps {
  icon: ElementType
  className?: string
  children?: ReactNode
}

export function ShippingChartIcon({
  icon: Icon,
  className,
  children,
}: IShippingChartIconProps) {
  return (
    <div className="relative flex h-24 cursor-pointer flex-col items-center justify-start ">
      <div className="relative flex flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-red-100 p-1 hover:bg-black/[0.05]">
        <div className="mx-auto mt-0 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <Icon
            className={cn('h-6 w-6 text-accent', className)}
            aria-hidden="true"
          />
        </div>
      </div>
      {children}
    </div>
  )
}
