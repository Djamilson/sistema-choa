import { ReactNode } from 'react'

interface IPaymentChartContentProps {
  children: ReactNode
}

export function PaymentChartContent({ children }: IPaymentChartContentProps) {
  return (
    <div className="flex h-full w-full items-start gap-6 md:h-8 md:flex-col md:items-center md:justify-center md:gap-2">
      {children}
    </div>
  )
}
