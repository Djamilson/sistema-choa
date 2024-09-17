import { IconType } from 'react-icons'

type IItemBreadcrumb = {
  title: string
  icon?: IconType
}

function ItemBreadcrumb({ title, icon: Icon }: IItemBreadcrumb) {
  return (
    <li className="inline-flex items-center">
      <div
        className={`inline-flex items-center gap-3 text-sm font-normal text-gray-500`}
      >
        {Icon && (
          <div className="w-4 text-center">
            <Icon size={26} className="text-gray-400" />
          </div>
        )}

        {title}
      </div>
    </li>
  )
}

export { ItemBreadcrumb }
