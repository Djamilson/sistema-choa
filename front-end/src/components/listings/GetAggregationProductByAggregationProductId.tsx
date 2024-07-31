'use client'

import { useSelectedGuaranteeStore } from '@/contexts/product-detail/useSelectedGuaranteeStore'
import { useAggregationProductByAggregationProductId } from '@/hooks/Entity/useAggregationProducts'
import { useEffect } from 'react'
import { SelectedCardGuarantee } from '../SelectedGuarantee/SelectedCardGuarantee/indext'
import { LoadingPulseLoader } from '../loadings/LoadingPulseLoader'

type IAggregationProductByAggregationProductIdProps = {
  params: {
    aggregationProductId: string
  }
}

const GetAggregationProductByAggregationProductId = ({
  params,
}: IAggregationProductByAggregationProductIdProps) => {
  const { aggregationProductId } = params

  const {
    data: aggregationProduct,
    isLoading: isLoadingAggregationProduct,
    isFetching: isFetchingAggregationProduct,
  } = useAggregationProductByAggregationProductId(aggregationProductId)

  const {
    state: { selectedGuarantee },
    actions: { setSelectedGuarantee },
  } = useSelectedGuaranteeStore()

  useEffect(() => {
    if (aggregationProduct) {
      const meGuaranteeInitial = aggregationProduct.guarantees?.find(
        (guarantee) => Number(guarantee.price.price) === 0,
      )
      meGuaranteeInitial?.id &&
        setSelectedGuarantee({ selectedGuarantee: meGuaranteeInitial })
    }
  }, [aggregationProduct, setSelectedGuarantee])

  return (
    <>
      {isLoadingAggregationProduct && isFetchingAggregationProduct && (
        <LoadingPulseLoader />
      )}
      {aggregationProduct &&
        aggregationProduct?.guarantees?.map((guarantee) => {
          return (
            <SelectedCardGuarantee
              key={guarantee.id}
              guarantee={guarantee}
              setSelectedGuarantee={setSelectedGuarantee}
              selectedGuarantee={selectedGuarantee}
            />
          )
        })}
      {selectedGuarantee && Number(selectedGuarantee?.price?.price) === 0 && (
        <div className="flex h-full flex-col  border border-gray-200 p-8 text-center dark:border-gray-700">
          <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">
            Total de serviços selecionados:
          </h4>

          <p className="mt-8 text-sm text-gray-500">
            Nenhum serviço foi selecionado
          </p>
          <p className="mt-8 text-sm text-gray-500">sem garantia estendida</p>
        </div>
      )}

      {selectedGuarantee && Number(selectedGuarantee?.price?.price) > 0 && (
        <div className="flex h-full flex-col  border border-gray-200 p-8 text-center dark:border-gray-700">
          <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">
            Total de serviços selecionados:
          </h4>
          <span className="mt-5 text-2xl font-bold text-gray-800 dark:text-gray-200">
            {selectedGuarantee?.price?.price_format}
          </span>
          <p className="mt-2 text-sm text-gray-500">sem juros</p>
          <p className="mt-2 text-sm text-gray-500">
            {`${selectedGuarantee.divided_into}x de `}
            <span className="ml-2 font-bold">
              {selectedGuarantee.price.price_format}
            </span>
          </p>
        </div>
      )}
    </>
  )
}

export default GetAggregationProductByAggregationProductId
