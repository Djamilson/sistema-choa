import cn from '@/utils/cn'
import { ReactNode } from 'react'

type IProps = {
  classNameZebra?: string
  className?: string
  children: ReactNode
}

const TableRow = ({ className, classNameZebra, children }: IProps) => {
  return (
    <div
      className={cn(
        'focus:shadow-outline z-0 grid min-h-[12px] w-full items-center gap-x-3 border-b text-center text-sm font-normal ring-0 transition-all duration-150 hover:z-0 hover:border-gray-200 hover:bg-[#FFEDD5] hover:text-black/[0.5] hover:opacity-80 hover:ring-2 hover:ring-[#FFEDD5] hover:ring-offset-1 hover:ring-offset-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 md:px-4 md:ring-offset-[#FFEDD5]',
        classNameZebra || '',
        className || '',
      )}
    >
      {children}
    </div>
  )
}

export default TableRow
