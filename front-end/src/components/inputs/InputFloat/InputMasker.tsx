import cn from '@/utils/cn'
import { FieldErrors } from 'react-hook-form'

interface IInputIconProps {
  errors: FieldErrors
  masker?: string
  name: string
}

export function InputMasker({ errors, name, masker }: IInputIconProps) {
  return (
    <div className="absolute left-0 top-3 inline-flex min-w-fit items-center border-2 border-b-0 border-l-0 border-t-0 border-gray-200 px-4 pr-2">
      {masker && (
        <span
          className={cn(
            'text-sm text-gray-500 dark:text-gray-400',
            errors[name] ? 'text-rose-500' : 'text-neutral-500',
          )}
        >
          {masker}
        </span>
      )}
    </div>
  )
}
