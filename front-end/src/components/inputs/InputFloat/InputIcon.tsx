import cn from '@/utils/cn'
import { ElementType } from 'react'
import { FieldErrors } from 'react-hook-form'

interface IInputIconProps {
  icon: ElementType
  errors: FieldErrors
  name: string
}

export function InputIcon({ icon: Icon, errors, name }: IInputIconProps) {
  return (
    <div className="absolute left-4 top-3 border-2 border-b-0 border-l-0 border-t-0 border-gray-200 pr-2">
      <Icon
        className={cn(
          `h-5 w-5 transition`,
          errors[name] ? 'text-rose-500' : 'text-neutral-500 ',
        )}
      />
    </div>
  )
}
