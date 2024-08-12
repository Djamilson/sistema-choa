'use client'

import { IColorProduct } from '@/@model/colorProduct/colorProduct'
import { LoadingPulseLoader } from '@/components/loadings/LoadingPulseLoader'
import cn from '@/utils/cn'
import { Alert } from '../Alert'
import { useSelectedColorProduct } from './useSelectedColorProduct'

type IProps = {
  productId: string
}

function SelectedColorProduct({ productId }: IProps) {
  const {
    messageSelectedColorProduct,
    handleRemoveSelections,
    isColorProductDisabled,
    handleColorProductClick,
    colorsProduct,
    isLoadingColorsProduct,
    isFetchingColorsProduct,
    selectedColorProduct,
  } = useSelectedColorProduct({ productId })

  return (
    <div className="">
      <div className="mb-2 flex justify-between">
        <div className="text-sm font-semibold">cores</div>
        <button
          onClick={handleRemoveSelections}
          className="cursor-pointer text-sm font-medium text-black/[0.5]"
        >
          remove seleção
        </button>
      </div>
      {isLoadingColorsProduct && isFetchingColorsProduct && (
        <LoadingPulseLoader />
      )}
      <div id="colorsGrid" className="grid grid-cols-3 gap-2">
        {colorsProduct &&
          colorsProduct?.map((item: IColorProduct) => {
            return (
              <button
                key={item.id}
                onClick={() => handleColorProductClick(item)}
                disabled={isColorProductDisabled(item)}
                type="button"
                className={`flex w-full flex-row items-end justify-start text-sm font-medium text-neutral-500`}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: item.color,
                    display: 'inline-block',
                  }}
                >
                  <div
                    className={cn(
                      `flex h-10 w-10 border`,
                      item.color,
                      (item && item.totalColor < 1) ||
                        (selectedColorProduct &&
                          selectedColorProduct.id === item.id &&
                          'cursor-not-allowed'),
                      item && item.totalColor < 1 && 'hover:cursor-not-allowed',
                      item &&
                        item.totalColor > 0 &&
                        selectedColorProduct &&
                        selectedColorProduct.id !== item.id &&
                        'cursor-pointer hover:border-2 hover:border-neutral-400 hover:opacity-75 ',
                      selectedColorProduct &&
                        selectedColorProduct.id !== item.id &&
                        'border-neutral-300',
                      selectedColorProduct &&
                        selectedColorProduct.id === item.id &&
                        'border-accent',
                      `focus:outline-none focus:ring-4 focus:ring-neutral-300 dark:focus:ring-neutral-800`,
                    )}
                  ></div>
                </div>

                <div className="ml-1 items-center justify-center text-xs font-light text-neutral-500 dark:border-gray-900">
                  {`(${item.totalColor})`}
                </div>
              </button>
            )
          })}
      </div>

      {messageSelectedColorProduct && (
        <Alert title={`Atenção`} message={`selecione a cor do produto!`} />
      )}
    </div>
  )
}
export { SelectedColorProduct }
