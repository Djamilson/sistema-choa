'use client'

import { setRedirectTo } from '@/utils/setRedirectTo'
import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react'
import { usePathname } from 'next/navigation'
import { useRef } from 'react'
import { PuffLoader } from 'react-spinners'
import { LinkButtonPopover } from './LinkButtonPopover'
import { ButtonSignin } from './Popover/ButtonSignin'

function PopoverNotAuthenticated() {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const pathname = usePathname()

  function handleNavSigninOnSetRedirectTo() {
    setRedirectTo({ pathname })
    console.log('Pooorooo', pathname)
  }

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <PopoverButton
            ref={buttonRef}
            className="flex cursor-pointer items-center justify-center text-sm font-semibold leading-6 text-white hover:bg-black/[0.05]"
          >
            <ButtonSignin open={open} />
          </PopoverButton>

          <PopoverBackdrop className="fixed inset-0 bg-black/15" />

          {open && (
            <div className="absolute left-[46%] top-[70px] z-20 h-0 w-0 border-b-[18px] border-l-[16px] border-r-[16px] border-b-white border-l-transparent border-r-transparent"></div>
          )}

          <PopoverPanel
            anchor="bottom"
            className="h-54 absolute right-0 top-full z-10 mt-8 flex w-64 max-w-md overflow-hidden bg-white shadow-lg ring-2 ring-gray-900/5"
          >
            <div className="pag-2 bg-white p-4">
              <p className="my-4 text-gray-500">
                {`pra ver seus pedidos e ter uma experiência personalizada, acesse sua conta :)`}
              </p>
              <div className="pag-4 divide-y divide-gray-100 ">
                <LinkButtonPopover
                  onMouseOver={handleNavSigninOnSetRedirectTo}
                  className="cursor-pointer bg-accent text-white ring-accent ring-offset-slate-50 hover:bg-accent hover:ring-2 hover:ring-offset-2"
                  title="entrar"
                  href="/signin"
                >
                  <PuffLoader size={20} color="white" />
                </LinkButtonPopover>
                <LinkButtonPopover
                  onMouseOver={handleNavSigninOnSetRedirectTo}
                  className="cursor-pointer border-2 border-accent bg-white text-accent ring-gray-400 ring-offset-slate-50 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-700 hover:ring-2 hover:ring-offset-2"
                  title="criar conta"
                  href="/signup"
                >
                  <PuffLoader size={20} color="red" />
                </LinkButtonPopover>
              </div>
            </div>
          </PopoverPanel>
        </>
      )}
    </Popover>
  )
}

export { PopoverNotAuthenticated }
