'use client'

import cn from '@/utils/cn'
import Link, { LinkProps } from 'next/link'
import { ReactNode } from 'react'

interface MeLinkProps extends LinkProps {
  className: string
  children: ReactNode
}

export function MeLink({ className, children, ...rest }: MeLinkProps) {
  return (
    <Link
      {...rest}
      className={cn(
        'hover:ring-none md:ring-offset-none flex flex-col items-center rounded-none border-none transition duration-150 ease-in-out hover:bg-gray-50 hover:text-accent focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50',
        className,
      )}
    >
      {children}
    </Link>
  )
}
