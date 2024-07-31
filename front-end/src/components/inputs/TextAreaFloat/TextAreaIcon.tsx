import { ElementType } from 'react'
import { FieldErrors } from 'react-hook-form'

interface ITextAreaIconProps {
  icon: ElementType
  errors: FieldErrors
  name: string
}

export function TextAreaIcon({ icon: Icon, errors, name }: ITextAreaIconProps) {
  return (
    <div className="absolute left-4 top-3 border-2 border-b-0 border-l-0 border-t-0 border-gray-200 pr-2">
      <Icon
        className={`h-5 w-5 transition ${
          errors[name] ? 'text-rose-500' : 'text-neutral-500 '
        }        `}
      />
    </div>
  )
}
