'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import MenuItem from './MenuItem'

const CategoryMenuHamburger = () => {
  const router = useRouter()

  const [isOpenLogin, setIsOpenLogin] = useState(false)

  const toggleOpenLogin = useCallback(() => {
    setIsOpenLogin((value) => !value)
  }, [])

  return (
    <div className="relative flex flex-row items-center gap-3 py-1">
      <button
        type="button"
        onClick={toggleOpenLogin}
        className="flex cursor-pointer flex-row items-center rounded-full py-1 text-sm font-light text-gray-600 transition hover:bg-neutral-100 hover:px-2 hover:text-accent"
      >
        <AiOutlineMenu size={24} />

        <h2 className="leading-1 mx-auto ml-1 flex max-w-2xl whitespace-nowrap text-sm font-medium lg:text-center">
          todos os departamentos
        </h2>

        <MdOutlineKeyboardArrowDown size={24} />
      </button>
      {isOpenLogin && (
        <div className="absolute right-[20%] top-12 w-[40vw] overflow-hidden  bg-white text-sm shadow-md md:w-3/4">
          <div className="flex cursor-pointer flex-col">
            <>
              <MenuItem
                label="My trips"
                onClick={() => router.push('/trips')}
              />

              <MenuItem label="Airbnb your home" onClick={() => {}} />
              <hr />
              <MenuItem label="Logout" onClick={() => {}} />
            </>
            <>
              <MenuItem label="Login" onClick={() => {}} />
              <MenuItem label="Sign up" onClick={() => {}} />
            </>
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoryMenuHamburger
