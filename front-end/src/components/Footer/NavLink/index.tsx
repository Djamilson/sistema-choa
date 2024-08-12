'use client'

import Link from 'next/link'

type INavProps = {
  href: string
  title: string
}

function NavLink({ href, title }: INavProps) {
  return (
    <Link
      href={href}
      className="cursor-pointer text-[12px] text-neutral-600 hover:text-accent"
    >
      {title}
    </Link>
  )
}

export { NavLink }
