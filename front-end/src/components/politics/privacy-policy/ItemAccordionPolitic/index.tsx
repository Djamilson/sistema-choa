import { ReactNode } from 'react'
import { IconType } from 'react-icons'

type IItemAccordionPoliticProps = {
  icon?: IconType
  children: ReactNode
}

function ItemAccordionPolitic({
  icon: Icon,
  children,
}: IItemAccordionPoliticProps) {
  return (
    <div className="relative ml-6 pl-2 text-sm font-normal">
      {Icon && (
        <Icon size={20} className="absolute -left-5 top-0 text-green-600" />
      )}
      {children}
    </div>
  )
}

export { ItemAccordionPolitic }
