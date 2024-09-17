import cn from '@/utils/cn'

interface IPaymentChartLabelProps {
  label: string
  className?: string
}
export function PaymentChartLabel({
  label,
  className,
}: IPaymentChartLabelProps) {
  return (
    <p
      className={cn(
        'break-words text-left font-medium text-gray-400 md:text-center md:font-normal',
        className,
      )}
    >
      {label}
    </p>
  )
}
