import { IAggregationProduct } from '@/@model/aggregationProduct/aggregationProduct'
import { IAggregationProducts } from '@/@model/aggregationProduct/aggregationProducts'
import { getUniqueListBy } from '@/utils/getUniqueListBy'
import { useEffect, useState } from 'react'
import { useAggregationProductsByCategoryId } from './useAggregationProducts'

type IProps = {
  categoryId: string
}

export function useSlide({ categoryId }: IProps) {
  const [pageSlideProduct, setPageSlideProduct] = useState(1)
  const [limitSlide] = useState(6)
  const [statusSlide] = useState<boolean>(true)

  const [products, setProducts] = useState({} as IAggregationProducts)

  const { data, isLoading, isFetching, error } =
    useAggregationProductsByCategoryId(
      pageSlideProduct,
      limitSlide,
      statusSlide,
      String(categoryId),
    )

  function addPage() {
    setPageSlideProduct((old) => old + 1)
  }

  useEffect(() => {
    if (
      typeof data === 'object' &&
      data !== null &&
      data?.aggregationProducts &&
      data?.aggregationProducts?.length > 0 &&
      data?.info.page === pageSlideProduct
    ) {
      setProducts((old) => {
        const meOld = old?.aggregationProducts || []

        const array = [...meOld, ...data.aggregationProducts]

        return {
          aggregationProducts: getUniqueListBy(
            array,
          ) as unknown[] as IAggregationProduct[],
          info: data.info,
        }
      })
    }
  }, [data, pageSlideProduct])

  return {
    isLoading,
    isFetching,
    error,
    products,
    addPage,
    page: pageSlideProduct,
  }
}
