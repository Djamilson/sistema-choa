'use client'

import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react'
import { useRef, useState } from 'react'
import {
  RiContactsLine,
  RiCoupon3Line,
  RiDashboardLine,
  RiLogoutCircleRLine,
  RiMapPinLine,
  RiShoppingBag3Line,
} from 'react-icons/ri'
import Avatar from '../Avatar'
import ModalLogout from '../ModalLogout'
import { LinkPopover } from './LinkPopover'

type IPopoverAuthenticatedProps = {
  name: string
  avatar_url: string
}

function PopoverAuthenticated({
  name,
  avatar_url,
}: IPopoverAuthenticatedProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const [openModalLogout, setOpenModalLogout] = useState<boolean>(false)

  const onCloseModalLogout = () => setOpenModalLogout(false)
  const onOpenModalLogout = () => setOpenModalLogout(true)

  return (
    <>
      <ModalLogout onOpen={openModalLogout} onClose={onCloseModalLogout} />
      <Popover className="relative">
        {({ open }) => (
          <>
            <PopoverButton
              ref={buttonRef}
              className="mt-1 flex cursor-pointer items-center justify-center text-sm font-semibold leading-6 text-white hover:bg-black/[0.05]"
            >
              <div className="mx-auto mr-1 max-w-2xl flex-col p-2 text-sm font-medium md:mr-2 lg:text-center">
                <span className="leading-0 flex flex-1 whitespace-nowrap text-justify ">
                  olá, {name}
                </span>
              </div>
              <div className="w-10">
                <Avatar src={avatar_url || null} />
              </div>
            </PopoverButton>

            <PopoverBackdrop className="fixed inset-0 bg-black/15" />

            {open && (
              <div className="absolute left-[46%] top-[56px] z-20 h-0 w-0 border-b-[18px] border-l-[16px] border-r-[16px] border-b-white border-l-transparent border-r-transparent"></div>
            )}

            <PopoverPanel
              anchor="bottom"
              className="h-54 absolute right-0 top-full z-10 mt-8 flex w-64 max-w-md overflow-hidden bg-white shadow-lg ring-2 ring-gray-900/5"
            >
              <div className="pag-2 w-full divide-y divide-gray-100 bg-white p-4">
                <LinkPopover
                  title="minha conta"
                  icon={RiDashboardLine}
                  href="/my-account"
                />
                <LinkPopover
                  title="meus pedidos"
                  icon={RiShoppingBag3Line}
                  href="/"
                />
                <LinkPopover title="meus vales" icon={RiCoupon3Line} href="/" />
                <LinkPopover
                  title="cadastro"
                  icon={RiContactsLine}
                  href="/info-collaborator"
                />
                <LinkPopover
                  title="endereço"
                  icon={RiMapPinLine}
                  href="/address"
                  onMouseOver={() => {}}
                />

                <button
                  onClick={onOpenModalLogout}
                  className="tex-sm flex w-full items-center bg-gray-50 p-3 text-left text-sm font-normal text-accent hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-blue-500 dark:hover:bg-gray-600"
                >
                  <div className="flex-shrink-0">
                    <RiLogoutCircleRLine size="22" />
                  </div>
                  <div className="w-full pl-5">
                    <div className="leading-1 whitespace-nowrap text-base font-normal text-gray-500 dark:text-gray-400">
                      sair da minha conta
                    </div>
                  </div>
                </button>
              </div>
            </PopoverPanel>
          </>
        )}
      </Popover>
    </>
  )
}

export { PopoverAuthenticated }
