import cn from '@/utils/cn'
import { CornerLeftDown, CornerLeftUp } from 'lucide-react'

interface IInputMercadoPagoErrorsProps {
  errorMessage: string
  errorTop: boolean
}

export function InputMercadoPagoErrors({
  errorMessage,
  errorTop,
}: IInputMercadoPagoErrorsProps) {
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
        <>{errorMessage}</>
      </span>
    </div>
  )
}
