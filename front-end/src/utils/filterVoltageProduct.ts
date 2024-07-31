import { IVoltageProduct } from '@/@model/voltageProduct/voltageProduct'

function filterVoltageProduct(
  inputArray: IVoltageProduct[],
  allowedIds: string[],
): IVoltageProduct[] {
  return inputArray.filter((product) => allowedIds.includes(product.id))
}

function filterVoltagesProductCompare(
  voltagesProduct: IVoltageProduct[],
  filteredVoltagesProductIdBySelectedColorProductId: string[],
) {
  if (!voltagesProduct) {
    return []
  }

  if (filteredVoltagesProductIdBySelectedColorProductId.length > 0) {
    return filterVoltageProduct(
      voltagesProduct,
      filteredVoltagesProductIdBySelectedColorProductId,
    )
  }

  return voltagesProduct
}

export { filterVoltageProduct, filterVoltagesProductCompare }
