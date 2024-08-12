import { IDataSheet } from '@/@model/product/IDataSheet'

type IItemDataSheetAccordionProps = {
  item: IDataSheet
}

function ItemDataSheetAccordion({ item }: IItemDataSheetAccordionProps) {
  return (
    <div className="flex gap-3 border-b py-0 md:gap-5">
      <div className="mt-2 flex items-center">
        <div className="md:text-md flex items-center justify-between gap-2 text-sm text-black/[0.5]">
          <div className="font-semibold text-black/[0.5]">{item.name}:</div>

          <div className="ml-1 text-black/[0.5]">{item.description}</div>
        </div>
      </div>
    </div>
  )
}
export { ItemDataSheetAccordion }
