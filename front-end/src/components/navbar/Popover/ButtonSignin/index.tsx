import Avatar from '@/components/Avatar'
import cn from '@/utils/cn'
import { ChevronDownIcon } from 'lucide-react'

type IButtonSigninProps = {
  open: boolean
}

function ButtonSignin({ open = false }: IButtonSigninProps) {
  return (
    <div className="flex w-64 p-2">
      <div className="mx-auto mr-1 max-w-2xl flex-col text-sm font-medium md:mr-3 lg:text-center">
        <span className="leading-0 flex flex-1 whitespace-nowrap text-justify">
          olá, faça o seu login,
        </span>
        <div className="-mt-1 flex flex-row justify-between tracking-tight sm:text-sm">
          <ChevronDownIcon className={cn('size-5', open && 'rotate-180')} />
          <span>ou cadastre-se</span>
        </div>
      </div>
      <div className="w-10">
        <Avatar src={null} />
      </div>
    </div>
  )
}

export { ButtonSignin }
