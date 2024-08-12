import { ReactNode } from 'react'

interface PaymentChartDateHourProps {
  children: ReactNode
}
export function PaymentChartDateHour({ children }: PaymentChartDateHourProps) {
  return (
    <div className="flex flex-col text-right text-xs italic text-gray-400 md:text-center lg:text-center">
      {children}
    </div>
  )
}
