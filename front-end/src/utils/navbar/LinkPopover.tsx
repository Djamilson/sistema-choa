'use client'

import Link, { LinkProps } from 'next/link'
import { IconType } from 'react-icons'

interface ILinkPopoverProps extends LinkProps {
  href: string
  title: string
  icon: IconType
  onMouseOver?: () => void
}

function LinkPopover({
  href,
  icon: Icon,
  title,
  onMouseOver,
}: ILinkPopoverProps) {
  return (
    <div className="group relative flex items-center gap-x-4 rounded-sm p-0 text-sm leading-6 hover:bg-gray-50">
      <Link
        href={href}
        className="flex flex-auto items-center gap-2"
        onMouseOver={() => onMouseOver && onMouseOver()}
      >
        <div className="m-1 mt-1 flex h-9 w-9 flex-none items-center justify-center  bg-gray-50 text-accent group-hover:bg-white">
          <Icon size="22" />
        </div>
        <div className="block flex-auto text-gray-600 ">
          {title}
          <span className="absolute inset-0" />
        </div>
      </Link>
    </div>
  )
}

export { LinkPopover }
