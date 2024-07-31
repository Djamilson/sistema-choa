import { ReactNode } from 'react'

type IAccordionTitleProps = {
  children: ReactNode
}

export function AccordionTitle({ children }: IAccordionTitleProps) {
  return <div className="flex w-full gap-x-2">{children}</div>
}
