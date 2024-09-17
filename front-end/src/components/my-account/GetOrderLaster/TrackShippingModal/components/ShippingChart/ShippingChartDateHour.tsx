import { ReactNode } from 'react'

interface ShippingChartDateHourProps {
  children: ReactNode
}
export function ShippingChartDateHour({
  children,
}: ShippingChartDateHourProps) {
  return (
    <div className="flex flex-col text-right text-xs italic text-gray-400">
      {children}
    </div>
  )
}
