'use client'

import cn from '@/utils/cn'
import Link from 'next/link'
import { ReactNode } from 'react'

type ILinkButtonPopoverProps = {
  href: string
  title: string
  className: string
  onMouseOver: () => void
  children: ReactNode
}

function LinkButtonPopover({
  href,
  title,
  className,
  onMouseOver,
}: ILinkButtonPopoverProps) {
  return (
    <div
      className={`group relative flex w-full items-center gap-x-4 py-2 text-sm leading-6 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-70`}
    >
      <Link
        onMouseOver={() => onMouseOver()}
        href={href}
        className={cn(`flex w-full items-center  p-4 text-white`, className)}
      >
        <span className="block flex-auto text-center">{title}</span>
      </Link>
    </div>
  )
}

export { LinkButtonPopover }
