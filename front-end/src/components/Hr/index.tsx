import cn from '@/utils/cn'

type IHrProps = {
  className?: string
}

function Hr({ className }: IHrProps) {
  return (
    <hr
      className={cn(
        `my-8 h-px border-0 bg-gray-200 dark:bg-gray-700`,
        className,
      )}
    />
  )
}

export { Hr }
