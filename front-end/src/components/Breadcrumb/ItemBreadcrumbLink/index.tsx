import Link from 'next/link'
import { IconType } from 'react-icons'

type IItemBreadcrumb = {
  href: string
  title: string
  icon?: IconType
}

function ItemBreadcrumbLink({ href, title, icon: Icon }: IItemBreadcrumb) {
  return (
    <li className="inline-flex items-center">
      <Link
        href={href}
        className={`inline-flex items-center gap-3 text-sm font-normal text-gray-600 underline-offset-4 hover:text-accent hover:underline`}
      >
        {Icon && (
          <div className="w-4 pr-2 text-center">
            <Icon size={26} className="text-gray-400" />
          </div>
        )}
        {title}
      </Link>
    </li>
  )
}

export { ItemBreadcrumbLink }
