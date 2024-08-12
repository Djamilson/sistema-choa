import { IDataSheet } from '@/@model/product/IDataSheet'
import { DatasheetAccordion } from './DatasheetAccordion'
import { ItemDataSheetAccordion } from './ItemDatasheetAccordion'

type IDatasheetProps = {
  title: string
  dataSheets?: IDataSheet[]
}

function Datasheet({ title, dataSheets }: IDatasheetProps) {
  return (
    <DatasheetAccordion title={title}>
      {dataSheets &&
        dataSheets.length > 0 &&
        dataSheets.map((item) => {
          return <ItemDataSheetAccordion key={item.id} item={item} />
        })}
    </DatasheetAccordion>
  )
}
export { Datasheet }
