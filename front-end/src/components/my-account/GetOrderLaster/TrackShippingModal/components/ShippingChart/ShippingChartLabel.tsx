import cn from '@/utils/cn'

interface IShippingChartLabelProps {
  label: string
  className?: string
}
export function ShippingChartLabel({
  label,
  className,
}: IShippingChartLabelProps) {
  return (
    <p
      className={cn(
        'break-words text-left font-medium text-gray-400',
        className,
      )}
    >
      {label}
    </p>
  )
}
