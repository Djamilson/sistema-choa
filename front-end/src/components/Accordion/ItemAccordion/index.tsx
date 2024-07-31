'use client'

import { ReactNode, useState } from 'react'

type IAccordionProps = {
  title: string
  children: ReactNode
  complement?: ReactNode
}

const ItemAccordion = ({ title, complement, children }: IAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-neutral-50 bg-white">
      <button
        className="flex w-full items-center justify-between bg-white px-5 py-4 text-left text-sm font-medium text-gray-700 hover:bg-neutral-50 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={`h-6 w-6 transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      {!isOpen && complement && (
        <div className="flex w-full items-center justify-between bg-white px-5 py-4 text-left text-sm font-normal text-gray-700">
          {complement}
        </div>
      )}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? 'max-h-full' : 'max-h-0'
        }`}
      >
        <div className="border-t border-neutral-100 p-1 md:p-4">
          <div className="text-gray-600">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default ItemAccordion
