import cn from '@/utils/cn'
import { CornerLeftDown, CornerLeftUp } from 'lucide-react'
import { FieldErrors } from 'react-hook-form'

type ISelectedErrorsProps = {
  errors: FieldErrors | any
  name: string
  errorTop: boolean
}

export function SelectedErrors({
  errors,
  name,
  errorTop,
}: ISelectedErrorsProps) {
  return (
    <div
      className={cn(
        'absolute right-0 flex flex-row gap-2 text-xs italic text-accent',
        errorTop ? '-translate-y-16' : 'translate-y-1 ',
      )}
    >
      {errorTop ? (
        <CornerLeftDown className="h-4 w-4" />
      ) : (
        <CornerLeftUp className="h-4 w-4" />
      )}

      <span>
        <>{errors[name]?.value?.message}</>
      </span>
    </div>
  )
}
