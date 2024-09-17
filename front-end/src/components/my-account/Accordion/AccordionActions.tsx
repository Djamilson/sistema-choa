import { ReactNode } from 'react'

type IAccordionActionProps = {
  children: ReactNode
}
export function AccordionActions({ children }: IAccordionActionProps) {
  return <div className="mx-auto md:max-w-md">{children}</div>
}
