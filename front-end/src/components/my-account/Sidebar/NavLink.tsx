'use client'

import useLoadingOnClickButtonModal from '@/components/loadings/LoadingOnClickButtonModal/useLoadingOnClickButtonModal'
import cn from '@/utils/cn'
import { ElementType } from 'react'
import { IconType } from 'react-icons'
import { RiArrowRightSLine } from 'react-icons/ri'
import { MeLink } from './MeLink'

type INavLinkProps = {
  href: string
  className: string
  title: string
  icon?: IconType | ElementType | undefined
}

function NavLink({ href, className, title, icon: Icon }: INavLinkProps) {
  const { onOpen: onOpenLoadingModal } = useLoadingOnClickButtonModal()

  return (
    <div className="w-full flex-1 border-b-[1px]">
      <MeLink
        onClick={onOpenLoadingModal}
        href={href}
        className={cn(
          `relative flex w-full items-center justify-between border-2 py-0`,
          className,
        )}
      >
        <div className="flex w-full flex-row items-center justify-start">
          {Icon && <Icon size={24} />}
          <span className="pl-4">{title}</span>
        </div>
        <div className={`absolute -right-[2px] transition`}>
          <RiArrowRightSLine size={22} />
        </div>
      </MeLink>
    </div>
  )
}

export { NavLink }
