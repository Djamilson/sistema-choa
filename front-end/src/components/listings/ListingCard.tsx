'use client'

import { IAggregationProduct } from '@/@model/aggregationProduct/aggregationProduct'
import { IAggregationProducts } from '@/@model/aggregationProduct/aggregationProducts'
import { useAggregationProductsList } from '@/hooks/Entity/useAggregationProducts'
import { getUniqueListBy } from '@/utils/getUniqueListBy'
import { useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { CardAggregationProduct } from '../CardAggregationProduct'
import { MessageComponent } from '../MessageComponent'
import { ButtonAdd } from '../buttons/ButtonAdd'
import { LoadingPulseLoader } from '../loadings/LoadingPulseLoader'

const ListingCard = () => {
  const [pageHomeProduct, setPageHomeProduct] = useState(1)
  const [limit] = useState(5)
  const [publisher] = useState<boolean>(true)
  const [aggregationProducts, setAggregationProducts] = useState(
    {} as IAggregationProducts,
  )

  const {
    data: aggregationProductsBase,
    isLoading: isLoadingAggregationProducts,
    isFetching: isFetchingAggregationProducts,
  } = useAggregationProductsList(pageHomeProduct, limit, publisher, '')

  useEffect(() => {
    if (
      aggregationProductsBase &&
      aggregationProductsBase?.info.page === pageHomeProduct
    ) {
      setAggregationProducts((old) => {
        const meOld = old?.aggregationProducts || []

        const array = [...meOld, ...aggregationProductsBase.aggregationProducts]

        return {
          aggregationProducts: getUniqueListBy(
            array,
          ) as unknown[] as IAggregationProduct[],
          info: aggregationProductsBase.info,
        }
      })
    }
  }, [aggregationProductsBase, pageHomeProduct])

  function addPageHomeProduct() {
    setPageHomeProduct((old) => old + 1)
  }

  return (
    <>
      {isLoadingAggregationProducts && isFetchingAggregationProducts && (
        <LoadingPulseLoader />
      )}

      {aggregationProducts?.aggregationProducts &&
        aggregationProducts?.aggregationProducts?.length < 1 && (
          <MessageComponent
            title="Ooops! não conseguimos encontra produto!"
            message="Tente novamente!"
          />
        )}

      <div className="grid grid-cols-2 gap-4 pt-0 sm:grid-cols-2 md:grid-cols-3 md:pt-24 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {aggregationProducts &&
          aggregationProducts?.aggregationProducts?.map(
            (item: IAggregationProduct) => {
              return (
                <CardAggregationProduct
                  key={item.id}
                  aggregationProduct={item}
                />
              )
            },
          )}
      </div>

      <div className="my-12 flex w-full items-center justify-center md:my-24">
        {aggregationProducts?.aggregationProducts?.length > 0 &&
          pageHomeProduct < aggregationProducts?.info?.pages && (
            <div className="mx-auto p-2 md:max-w-2xl">
              <ButtonAdd
                disabled={false}
                label={`ver mais produtos`}
                onClick={() => addPageHomeProduct()}
                icon={FiPlus}
              />
            </div>
          )}
      </div>
    </>
  )
}

export default ListingCard
