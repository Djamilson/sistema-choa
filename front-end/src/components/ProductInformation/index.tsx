import { ReactNode } from 'react'
import { Accordion } from '../Accordion'

type IProductInformationProps = {
  title: string
  children?: ReactNode
  complementProductInformation?: ReactNode
}

function ProductInformation({
  title,
  complementProductInformation,
  children,
}: IProductInformationProps) {
  return (
    <Accordion title={title} complement={complementProductInformation}>
      {children}
    </Accordion>
  )
}
export { ProductInformation }
