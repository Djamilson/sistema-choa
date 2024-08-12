import { ReactNode } from 'react'
import ItemAccordion from './ItemAccordion'

type IAccordionProps = {
  title: string
  children: ReactNode
  complement?: ReactNode
}

function Accordion({ title, complement, children }: IAccordionProps) {
  return (
    <div className="mt-4 rounded-none border border-l-0 border-r-0 border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
      <ItemAccordion title={title} complement={complement}>
        {children}
      </ItemAccordion>
    </div>
  )
}

export { Accordion }
