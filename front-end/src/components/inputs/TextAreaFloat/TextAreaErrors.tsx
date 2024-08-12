import { CornerLeftDown } from 'lucide-react'
import { FieldErrors } from 'react-hook-form'

interface ITextAreaErrorsProps {
  errors: FieldErrors
  name: string
}

export function TextAreaErrors({ errors, name }: ITextAreaErrorsProps) {
  return (
    <div className="absolute right-0 flex -translate-y-[168px] flex-row gap-2 text-xs italic text-accent">
      <CornerLeftDown className="h-4 w-4" />
      <span>
        <>{errors[name]?.message}</>
      </span>
    </div>
  )
}
