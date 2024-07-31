'use client'

import { ElementType } from 'react'
import { RiArrowRightSLine } from 'react-icons/ri'

type INavLinkProps = {
  onClick: () => void
  className: string
  title: string
  icon?: ElementType | undefined
}

function NavButton({ onClick, className, title, icon: Icon }: INavLinkProps) {
  return (
    <div className="flex-1 border-b-[1px]">
      <button
        onClick={onClick}
        className={`relative flex w-full items-center justify-between py-0  ${className}`}
      >
        <div className="flex flex-row items-center">
          {Icon && <Icon size={24} />}
          <span className="pl-4">{title}</span>
        </div>
        <div className={`absolute right-[0px] transition`}>
          <RiArrowRightSLine size={22} />
        </div>
      </button>
    </div>
  )
}

export { NavButton }
