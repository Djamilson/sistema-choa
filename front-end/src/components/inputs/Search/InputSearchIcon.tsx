import cn from '@/utils/cn'
import { ElementType } from 'react'

interface IInputSearchIconProps {
  icon: ElementType
  className?: string
}

export function InputSearchIcon({
  icon: Icon,
  className,
}: IInputSearchIconProps) {
  return (
    <div className={cn('absolute top-[10px] border-gray-200', className)}>
      <Icon className={`h-5 w-5 transition`} />
    </div>
  )
}
