import Link from 'next/link'
import { IconType } from 'react-icons'

type INavLinkProps = {
  icon?: IconType
  children: string
  href: string
  className: string
}

export function NavLink({
  children,
  icon: Icon,
  href,
  className,
}: INavLinkProps) {
  return (
    <Link href={href} onMouseOver={() => {}}>
      <div className={`${className} leading-1 flex flex-row items-center`}>
        {Icon && (
          <div className="w-22">
            <Icon size={24} />
          </div>
        )}
        {children}
      </div>
    </Link>
  )
}
