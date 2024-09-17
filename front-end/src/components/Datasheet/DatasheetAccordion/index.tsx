import { Accordion } from '@/components/Accordion'
import { ReactNode } from 'react'

type IDatasheetProps = {
  title: string
  children?: ReactNode
}

function DatasheetAccordion({ title, children }: IDatasheetProps) {
  return <Accordion title={title}>{children}</Accordion>
}
export { DatasheetAccordion }
