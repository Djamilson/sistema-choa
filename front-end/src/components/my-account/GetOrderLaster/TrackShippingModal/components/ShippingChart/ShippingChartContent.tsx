import { ReactNode } from 'react'

interface IShippingChartContentProps {
  children: ReactNode
}

export function ShippingChartContent({ children }: IShippingChartContentProps) {
  return (
    <div className="flex h-full w-full items-start justify-items-center gap-6">
      {children}
    </div>
  )
}
