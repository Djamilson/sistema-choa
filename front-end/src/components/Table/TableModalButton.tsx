'use client'

import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment, ReactNode } from 'react'

type IModalTransitionProps = {
  isOpen: boolean
  children: ReactNode
  closeModalEditClear: () => void
}

export function TableModalButton({
  isOpen,
  children,
  closeModalEditClear,
}: IModalTransitionProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => closeModalEditClear()}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 top-[40%] flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300 sm:duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300 sm:duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-xs">
                  <div className="flex h-36 flex-col bg-white shadow-xl">
                    <div className="flex-1 px-0 py-0">
                      <div className="flex items-start justify-between bg-accent px-4 py-4 sm:px-6">
                        <Dialog.Title className="text-lg font-medium text-white">
                          Ação
                        </Dialog.Title>

                        <div className="ml-3 flex h-7 items-center gap-4">
                          <button
                            type="button"
                            className="-m-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-white hover:bg-black/[0.05] md:h-12 md:w-12"
                            onClick={() => closeModalEditClear()}
                          >
                            <span className="sr-only">close modal</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="px-4 pb-6 pt-2 sm:px-6">
                      <div className="mt-2 flex justify-around gap-2 text-center text-sm font-normal text-gray-500">
                        {children}
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
