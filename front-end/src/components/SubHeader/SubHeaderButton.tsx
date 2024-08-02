import { IconType } from 'react-icons'
import { Button } from '../buttons/Button'

interface ISubHeaderButton {
  title: string
  onClick: () => void
  icon?: IconType
  className?: string
}

export function SubHeaderButton({
  title,
  icon: Icon,
  onClick,
  className,
}: ISubHeaderButton) {
  return (
    <div className="flex flex-row items-center">
      <Button
        onClick={onClick}
        isLoading={false}
        icon={Icon}
        className={className}
      >
        {title}
      </Button>
    </div>
  )
}
