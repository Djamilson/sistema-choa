import Avatar from '@/components/Avatar'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

function ButtonSignin() {
  return (
    <>
      <div className="mx-auto mr-1 max-w-2xl flex-col text-sm font-medium md:mr-3 lg:text-center">
        <span className="leading-0 flex flex-1 whitespace-nowrap text-justify">
          olá, faça o seu login,
        </span>
        <div className="-mt-1 flex flex-row justify-between tracking-tight sm:text-sm">
          <MdOutlineKeyboardArrowDown size={24} />
          <span>ou cadastre-se</span>
        </div>
      </div>
      <div className="w-10">
        <Avatar src={null} />
      </div>
    </>
  )
}

export { ButtonSignin }
