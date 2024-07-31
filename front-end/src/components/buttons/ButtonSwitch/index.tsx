import cn from '@/utils/cn'
import { Pencil, X } from 'lucide-react'
import { IconType } from 'react-icons'
import { Button } from '../Button'

type IButtonSwitch = {
  icon?: IconType
  isEditing: boolean
  toggle: () => void
  title?: string
  disabled?: boolean
}

export function ButtonSwitch({
  toggle,
  icon: Icon,
  isEditing,
  disabled = false,
  title = 'Editar',
}: IButtonSwitch) {
  return (
    <div
      className={cn('max-w-md', disabled && 'cursor-not-allowed opacity-50')}
    >
      <Button
        onClick={toggle}
        disabled={disabled}
        className={`flex h-8 flex-1 items-center justify-between border-none shadow-none`}
      >
        {isEditing ? (
          <>
            <X className="mr-2 h-4 w-4" />
            Cancelar
          </>
        ) : (
          <div className="flex flex-1">
            {Icon ? (
              <div className="mr-2">
                <Icon size={20} />
              </div>
            ) : (
              <Pencil className="mr-2 h-4 w-4" />
            )}
            {title}
          </div>
        )}
      </Button>
    </div>
  )
}
