import { CornerLeftDown } from 'lucide-react'
import { FieldErrors } from 'react-hook-form'

interface IInputErrorsProps {
  errors: FieldErrors
  name: string
}

export function InputErrors({ errors, name }: IInputErrorsProps) {
  return (
    <div className="absolute right-0 flex -translate-y-16 flex-row gap-2 text-xs italic text-accent">
      <CornerLeftDown className="h-4 w-4" />
      <span>
        <>{errors[name]?.message}</>
      </span>
    </div>
  )
}
