'use client'

import SearchModal from '@/components/modals/SearchModal'
import { useState } from 'react'

export function HeaderSearch() {
  const [isOpenSearchModal, setIsOpenSearchModal] = useState(false)

  const closeSearchModal = () => {
    setIsOpenSearchModal(false)
  }

  const openSearchModal = () => {
    setIsOpenSearchModal(true)
  }

  return (
    <div className="flex w-full items-center justify-center">
      <button
        onClick={() => openSearchModal()}
        className="mx-4 flex w-1/2 cursor-pointer border-[1px] bg-white text-sm font-light shadow-sm transition hover:bg-neutral-100 hover:text-accent hover:shadow-md "
      >
        <div className="relative flex w-full items-center justify-between p-2 text-neutral-500">
          <h4 className="leading-1 hidden whitespace-nowrap text-sm font-normal md:block">
            busca aqui o seu produto
          </h4>
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>
      </button>
      <SearchModal isOpen={isOpenSearchModal} onClose={closeSearchModal} />
    </div>
  )
}
