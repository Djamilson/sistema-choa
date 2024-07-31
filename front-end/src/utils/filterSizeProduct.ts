import { ISizeProduct } from '@/@model/sizeProduct/sizeProduct'

function filterSizeProduct(
  inputArray: ISizeProduct[],
  allowedIds: string[],
): ISizeProduct[] {
  return inputArray.filter((product) => allowedIds.includes(product.id))
}

function filterSizesProductCompare(
  sizesProduct: ISizeProduct[],
  filteredSizesProductIdBySelectedColorProductId: string[],
) {
  if (!sizesProduct) {
    return []
  }

  if (filteredSizesProductIdBySelectedColorProductId.length > 0) {
    return filterSizeProduct(
      sizesProduct,
      filteredSizesProductIdBySelectedColorProductId,
    )
  }

  return sizesProduct
}

export { filterSizeProduct, filterSizesProductCompare }
