'use client'

import { ReactNode, useState } from 'react'
import { Accordion } from '.'
import cn from '@/utils/cn'

type IAccordionContentProps = {
  contentButton: ReactNode
  accordionContentBefore: ReactNode
  accordionContentAfter: ReactNode
  className?: string
}

export function AccordionContent({
  contentButton,
  accordionContentBefore,
  accordionContentAfter,
  className,
}: IAccordionContentProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={cn('border-b border-neutral-50 bg-white', className)}>
      <Accordion.Action onClick={() => setIsOpen(!isOpen)}>
        {contentButton}
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
      </Accordion.Action>

      {!isOpen && accordionContentBefore && (
        <div className="flex w-full items-center justify-between bg-white px-5 py-4 text-left text-sm font-normal text-gray-700">
          {accordionContentBefore}
        </div>
      )}

      {isOpen && (
        <div
          className={`overflow-hidden transition-all duration-500 ${
            isOpen ? 'max-h-full' : 'max-h-0'
          }`}
        >
          <div className="flex w-full items-center justify-between bg-white px-5 py-4 text-left text-sm font-normal text-gray-700">
            {accordionContentAfter}
          </div>
        </div>
      )}
    </div>
  )
}
