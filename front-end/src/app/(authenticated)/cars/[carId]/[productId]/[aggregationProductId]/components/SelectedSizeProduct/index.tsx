'use client'

import { LoadingPulseLoader } from '../../../../../../../components/loadings/LoadingPulseLoader'
import { Alert } from '../Alert'
import { useSelectedSizeProduct } from './useSelectedSizeProduct'

type IProps = {
  productId: string
  filteredSizesProductIdBySelectedColorProductId: string[]
}

function SelectedSizeProduct({
  productId,
  filteredSizesProductIdBySelectedColorProductId,
}: IProps) {
  const {
    isLoadingSizesProduct,
    isFetchingSizesProduct,
    filterSizes,
    selectedSizeProduct,
    isSizeProductDisabled,
    handleSizeProductClick,
    messageSelectedSizeProduct,
    clearSelectedSizeProductStore,
  } = useSelectedSizeProduct({
    productId,
    filteredSizesProductIdBySelectedColorProductId,
  })

  return (
    <>
      {isLoadingSizesProduct && isFetchingSizesProduct && (
        <LoadingPulseLoader />
      )}
      {filterSizes && filterSizes.length > 0 && (
        <div className="">
          <div className="mb-2 flex justify-between">
            <div className="text-sm font-semibold">tamanhos</div>
            <button
              onClick={() => clearSelectedSizeProductStore()}
              className="cursor-pointer text-sm font-medium text-black/[0.5]"
            >
              remove seleção
            </button>
          </div>

          <div id="sizesGrid" className="grid grid-cols-3 gap-2">
            {filterSizes?.map((item) => {
              return (
                <button
                  key={item.id}
                  onClick={() => handleSizeProductClick(item)}
                  disabled={isSizeProductDisabled(item)}
                  type="button"
                  className={`flex w-full flex-row items-end justify-start text-sm font-medium text-neutral-500`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center border ${
                      (item && item.totalSize < 1) ||
                      (selectedSizeProduct &&
                        selectedSizeProduct.id === item.id &&
                        'cursor-not-allowed')
                    } ${
                      item && item.totalSize < 1 && 'hover:cursor-not-allowed'
                    } ${
                      item &&
                      item.totalSize > 0 &&
                      selectedSizeProduct &&
                      selectedSizeProduct.id !== item.id &&
                      'cursor-pointer hover:border-2 hover:border-neutral-400 hover:opacity-75 '
                    } ${
                      selectedSizeProduct &&
                      selectedSizeProduct.id !== item.id &&
                      'border-neutral-300'
                    } ${
                      selectedSizeProduct &&
                      selectedSizeProduct.id === item.id &&
                      'border-accent'
                    } focus:outline-none focus:ring-4 focus:ring-neutral-300 dark:hover:bg-neutral-700 dark:focus:ring-neutral-800`}
                  >
                    {item.description}
                  </div>
                  <div className="ml-1 items-center justify-center text-xs font-light text-neutral-500 dark:border-gray-900">
                    {`(${item.totalSize})`}
                  </div>
                </button>
              )
            })}
          </div>
          {messageSelectedSizeProduct && (
            <Alert
              title={`Atenção`}
              message={`selecione o tamanho do produto!`}
            />
          )}
        </div>
      )}
    </>
  )
}
export { SelectedSizeProduct }
