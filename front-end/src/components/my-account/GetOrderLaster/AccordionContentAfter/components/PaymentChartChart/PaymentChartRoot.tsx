import { ReactNode } from 'react'

interface IPaymentChartRootProps {
  children: ReactNode
}
export function PaymentChartRoot({ children }: IPaymentChartRootProps) {
  return (
    <div className="relative mb-4 ml-6 flex items-center justify-center pl-2 text-sm font-normal md:mb-9">
      <div className="flex w-full flex-col justify-center py-2 md:flex-row md:gap-0 md:py-5">
        {children}
      </div>
    </div>
  )
}
