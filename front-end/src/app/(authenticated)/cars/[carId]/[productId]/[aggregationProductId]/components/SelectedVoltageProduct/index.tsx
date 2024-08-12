import { LoadingPulseLoader } from '../../../../../../../components/loadings/LoadingPulseLoader'
import { Alert } from '../Alert'
import { useSelectedVoltageProduct } from './useSelectedVoltageProduct'

type IProps = {
  productId: string
  filteredVoltagesProductIdBySelectedColorProductId: string[]
}

function SelectedVoltageProduct({
  productId,
  filteredVoltagesProductIdBySelectedColorProductId,
}: IProps) {
  const {
    isLoadingVoltagesProduct,
    isFetchingVoltagesProduct,
    isVoltageProductDisabled,
    handleVoltageProductClick,
    filterVoltages,
    messageSelectedVoltageProduct,
    clearSelectedVoltageProductStore,
    selectedVoltageProduct,
  } = useSelectedVoltageProduct({
    productId,
    filteredVoltagesProductIdBySelectedColorProductId,
  })
  return (
    <>
      {isLoadingVoltagesProduct && isFetchingVoltagesProduct && (
        <LoadingPulseLoader />
      )}

      {filterVoltages && filterVoltages.length > 0 && (
        <div className="">
          <div className="mb-2 flex justify-between">
            <div className="text-sm font-semibold">voltagem</div>
            <button
              onClick={() => clearSelectedVoltageProductStore()}
              className="cursor-pointer text-sm font-medium text-black/[0.5]"
            >
              remove seleção
            </button>
          </div>

          <div id="voltagesGrid" className="grid grid-cols-3 gap-2">
            {filterVoltages?.map((item) => {
              return (
                <button
                  key={item.id}
                  onClick={() => handleVoltageProductClick(item)}
                  disabled={isVoltageProductDisabled(item)}
                  type="button"
                  className={`flex w-full flex-row items-end justify-start text-sm font-medium text-neutral-500`}
                >
                  <div
                    className={`flex h-10 w-16 items-center justify-center border ${
                      (item && item.totalVoltage < 1) ||
                      (selectedVoltageProduct &&
                        selectedVoltageProduct.id === item.id &&
                        'cursor-not-allowed')
                    } ${
                      item &&
                      item.totalVoltage < 1 &&
                      'hover:cursor-not-allowed'
                    } ${
                      item &&
                      item.totalVoltage > 0 &&
                      selectedVoltageProduct &&
                      selectedVoltageProduct.id !== item.id &&
                      'cursor-pointer hover:border-2 hover:border-neutral-400 hover:opacity-75 '
                    } ${
                      selectedVoltageProduct &&
                      selectedVoltageProduct.id !== item.id &&
                      'border-neutral-300'
                    } ${
                      selectedVoltageProduct &&
                      selectedVoltageProduct.id === item.id &&
                      'border-accent'
                    } focus:outline-none focus:ring-4 focus:ring-neutral-300  dark:hover:bg-neutral-400 dark:focus:ring-neutral-800`}
                  >
                    {item.voltage}
                  </div>
                  <div className="ml-1 items-center justify-center text-xs font-light text-neutral-500 dark:border-gray-900">
                    {`(${item.totalVoltage})`}
                  </div>
                </button>
              )
            })}
          </div>

          {messageSelectedVoltageProduct && (
            <Alert
              title={`Atenção`}
              message={`selecione a voltagem do produto!`}
            />
          )}
        </div>
      )}
    </>
  )
}
export { SelectedVoltageProduct }
