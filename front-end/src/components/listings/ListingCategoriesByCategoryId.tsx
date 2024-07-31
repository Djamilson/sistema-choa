'use client'

import { IAggregationProduct } from '@/@model/aggregationProduct/aggregationProduct'
import { IAggregationProducts } from '@/@model/aggregationProduct/aggregationProducts'
import { useCategoriesByCategoryId } from '@/hooks/Entity/useAggregationProducts'
import { getUniqueListBy } from '@/utils/getUniqueListBy'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { TransitionGroup } from 'react-transition-group'
import { NavLinkCategory } from '../Category/NavLinkCategory'
import { Hr } from '../Hr'
import { MessageComponent } from '../MessageComponent'
import { ButtonAdd } from '../buttons/ButtonAdd'
import { LoadingPulseLoader } from '../loadings/LoadingPulseLoader'

type IOption = {
  value: string
  label: string
  checked: boolean
}

type IFilterSelected = {
  id: string
  name: string
  options: IOption[]
}

const filtersDataMe: IFilterSelected[] = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: true },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'New Arrivals', checked: false },
      { value: 'sale', label: 'Sale', checked: false },
      { value: 'travel', label: 'Travel', checked: true },
      { value: 'organization', label: 'Organization', checked: false },
      { value: 'accessories', label: 'Accessories', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '2l', label: '2L', checked: false },
      { value: '6l', label: '6L', checked: false },
      { value: '12l', label: '12L', checked: false },
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
      { value: '40l', label: '40L', checked: true },
    ],
  },
]

type IListingCategoriesByCategoryIdProps = {
  params: {
    categoryId: string
  }
}

const ListingCategoriesByCategoryId = ({
  params,
}: IListingCategoriesByCategoryIdProps) => {
  const { categoryId } = params

  const [pageHomeProduct, setPageHomeProduct] = useState(1)
  const [limit] = useState(5)

  const [status] = useState<boolean>(true)

  const [aggregationProducts, setAggregationProducts] = useState(
    {} as IAggregationProducts,
  )

  const {
    data: aggregationProductsBase,
    isLoading: isLoadingAggregationProducts,
    isFetching: isFetchingAggregationProducts,
  } = useCategoriesByCategoryId(pageHomeProduct, limit, status, categoryId)

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

  const [filtersData, setFiltersData] =
    useState<IFilterSelected[]>(filtersDataMe)

  const handleCheckboxChange = (filterId: string, optionValue: string) => {
    setFiltersData((prevFiltersData) => {
      return prevFiltersData.map((filter) => {
        if (filter.id === filterId) {
          const updatedOptions = filter.options.map((option) => {
            if (option.value === optionValue) {
              return { ...option, checked: !option.checked }
            }
            return option
          })
          return { ...filter, options: updatedOptions }
        }
        return filter
      })
    })
  }

  const handleRemoveSelected = (itemValue: string) => {
    setFiltersData((prevFiltersData) => {
      const updatedFiltersData = prevFiltersData.map((filter) => {
        const updatedOptions = filter.options.map((option) => {
          if (option.value === itemValue) {
            return { ...option, checked: false }
          }
          return option
        })
        return { ...filter, options: updatedOptions }
      })
      return updatedFiltersData
    })
  }

  const selectedItemsList = filtersData.flatMap((filter) =>
    filter.options
      .filter((option) => option.checked)
      .map((option) => option.value),
  )

  return (
    <div className="mt-10 flex flex-col gap-4 lg:flex-row">
      <div className="flex-[1] bg-white p-6">
        <h3 className="text-lg font-semibold">filtro</h3>

        <div className="mt-4">
          {filtersData.map((filter) => (
            <div key={filter.id} className="">
              <h4 className="mb-2 font-bold">{filter.name}</h4>
              {filter.options.map((option) => (
                <div
                  className="flex justify-between space-x-2 py-2"
                  key={option.value}
                >
                  <label
                    htmlFor={`${filter.id}-${option.value}`}
                    className="text-sm"
                  >
                    <p className="font-normal text-gray-400">{option.label}</p>
                  </label>
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      id={`${filter.id}-${option.value}`}
                      checked={option.checked}
                      onChange={() =>
                        handleCheckboxChange(filter.id, option.value)
                      }
                      className="text-primary-600 focus:border-primary-300 focus:ring-primary-200 h-4 w-4 rounded border-gray-300 shadow-sm focus:ring focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
                    />
                  </div>
                </div>
              ))}
              <Hr />
            </div>
          ))}
        </div>
      </div>
      <div className="gap-22 flex-[5] bg-white px-2 md:px-8">
        <div className="my-4 grid auto-cols-max grid-flow-col gap-2 divide-x divide-blue-300">
          <TransitionGroup component={null}>
            {selectedItemsList.map((item) => (
              <button
                key={item}
                type="button"
                className="ml-6 flex w-full max-w-2xl cursor-pointer items-center justify-center gap-x-2 rounded-full text-accent hover:bg-black/[0.05] md:h-12 md:w-12"
                onClick={() => handleRemoveSelected(item)}
              >
                <>
                  <span className="relative">
                    <div className="absolute -right-4 -mt-3 w-6">
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    {item}
                  </span>
                </>
              </button>
            ))}
          </TransitionGroup>
        </div>

        <Hr />
        <div className="text-lg font-bold">nossos itens</div>

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
        <div className="grid grid-cols-2 gap-4 pt-12 md:grid-cols-1 md:pt-12">
          {aggregationProducts &&
            aggregationProducts?.aggregationProducts?.map(
              (item: IAggregationProduct) => {
                return (
                  <NavLinkCategory key={item.id} aggregationProduct={item} />
                )
              },
            )}
        </div>

        <div className="my-12 flex w-full items-center justify-center ">
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
      </div>
    </div>
  )
}

export default ListingCategoriesByCategoryId
