import { ElementType } from 'react'
import { FieldErrors } from 'react-hook-form'

interface IDatepickerIconProps {
  icon: ElementType
  errors: FieldErrors
  name: string
}

export function DatepickerIcon({
  icon: Icon,
  errors,
  name,
}: IDatepickerIconProps) {
  return (
    <div className="absolute left-4 top-3 z-10 border-2 border-b-0 border-l-0 border-t-0 border-gray-200 pr-2">
      <Icon
        className={` h-5 w-5 transition ${
          errors[name] ? 'text-rose-500' : 'text-zinc-400'
        }`}
      />
    </div>
  )
}
