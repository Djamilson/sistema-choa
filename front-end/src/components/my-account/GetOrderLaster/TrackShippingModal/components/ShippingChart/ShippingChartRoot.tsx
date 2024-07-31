import { ReactNode } from 'react'

interface IShippingChartRootProps {
  children: ReactNode
}
export function ShippingChartRoot({ children }: IShippingChartRootProps) {
  return (
    <div className="relative mb-9 ml-6 flex items-center justify-center pl-2 text-sm font-normal">
      <div className="flex w-full flex-col justify-center gap-4 py-5 md:gap-0">
        {children}
      </div>
    </div>
  )
}
