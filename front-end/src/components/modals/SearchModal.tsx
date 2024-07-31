'use client'

import { IAggregationProduct } from '@/@model/aggregationProduct/aggregationProduct'
import {
  IAggregationProductsSearch,
  ISuggestionAggregationProduct,
} from '@/@model/aggregationProduct/aggregationProducts'
import { useAggregationProductsListSearch } from '@/hooks/Entity/useAggregationProducts'
import { useDebounce } from '@/hooks/useDebounce'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FormEvent, useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { ContainerModal } from '../ContainerModal'
import { MessageComponent } from '../MessageComponent'
import InputSearch from '../inputs/InputSearch'
import { LoadingPuff } from '../loadings/LoadingPuff'
import { AggregationProductSearch } from './AggregationProductSearch'
import { DialogTitle } from '@headlessui/react'

type ISearchModalProps = {
  isOpen: boolean
  onClose: () => void
}

const SearchModal = ({ isOpen, onClose }: ISearchModalProps) => {
  const [pageHomeProduct, setPageHomeProduct] = useState(1)
  const [limit] = useState(3)

  const [aggregationProducts, setAggregationProducts] = useState(
    {} as IAggregationProductsSearch,
  )

  const status = true

  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce({
    value: searchTerm,
    setPage: setPageHomeProduct,
  })

  const {
    data: aggregationProductsBase,
    isLoading: isLoadingAggregationProducts,
    isFetching: isFetchingAggregationProducts,
  } = useAggregationProductsListSearch(
    pageHomeProduct,
    limit,
    status,
    debouncedSearchTerm,
  )

  const handleChangeSearch = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    setSearchTerm(value)
  }

  useEffect(() => {
    if (
      typeof aggregationProductsBase === 'object' &&
      aggregationProductsBase !== null &&
      aggregationProductsBase.aggregationProducts &&
      aggregationProductsBase.aggregationProducts.length > 0
    ) {
      let filteredList = aggregationProductsBase?.aggregationProducts

      if (searchTerm) {
        filteredList = filteredList.filter((el) =>
          el.product.subcategory.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
        )
      } else {
        filteredList = []
      }

      setAggregationProducts(() => ({
        ...aggregationProductsBase,
        aggregationProducts: filteredList || [],
      }))
    }
  }, [aggregationProductsBase, searchTerm])

  const bodyContent = (
    <>
      <div className={'flex w-full flex-col'}>
        {isLoadingAggregationProducts && isFetchingAggregationProducts && (
          <LoadingPuff />
        )}

        {aggregationProductsBase &&
          aggregationProductsBase?.aggregationProducts?.length < 1 &&
          aggregationProducts?.aggregationProducts?.length < 1 &&
          searchTerm.length > 0 && (
            <MessageComponent
              title="Ooops! não conseguimos encontra produto!"
              message="Tente entrar com outros dados!"
            />
          )}

        {aggregationProducts?.aggregationProducts &&
          aggregationProducts?.aggregationProducts?.length > 0 && (
            <div className="flex w-full gap-6 overflow-x-scroll">
              <div className="w-28 flex-col">
                <p className="whitespace-nowrap">você quis dizer</p>

                <div className="mt-4 w-full">
                  {aggregationProducts?.suggestions?.map(
                    (item: ISuggestionAggregationProduct) => {
                      return (
                        <button
                          type="button"
                          onClick={() => setSearchTerm(item.name.toLowerCase())}
                          className="tex-sm w-full text-sm font-normal text-gray-500 underline-offset-4 hover:text-accent hover:underline hover:decoration-accent"
                          key={item.product_id}
                        >
                          {item.name.toLowerCase()}
                        </button>
                      )
                    },
                  )}
                </div>
              </div>

              <div className="border-lef-2 flex shrink-0 flex-col pl-2">
                <p className="whitespace-nowrap">Produtos sugeridos</p>
                <div className="flex w-full flex-row gap-2 overflow-x-auto bg-white shadow-xl">
                  {aggregationProducts?.aggregationProducts?.map(
                    (item: IAggregationProduct) => {
                      return (
                        <AggregationProductSearch
                          key={item.id}
                          aggregationProduct={item}
                        />
                      )
                    },
                  )}
                </div>
              </div>
            </div>
          )}
      </div>
    </>
  )

  return (
    <ContainerModal isOpen={isOpen} onClose={() => onClose()}>
      <div className="flex h-full flex-col bg-white shadow-xl">
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="flex items-start justify-between">
            <DialogTitle className="text-sm font-medium text-gray-600 md:text-lg">
              Faça sua busca
            </DialogTitle>
            <div className="ml-3 flex h-7 items-center">
              <button
                type="button"
                className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                onClick={() => onClose()}
              >
                <span className="sr-only">Close panel</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="mt-8">
            <div className="flow-root">
              <div className="relative md:mt-1">
                <InputSearch
                  type={`text`}
                  name="search"
                  value={searchTerm}
                  label="entre aqui com o seu produto"
                  placeholder="busca aqui o seu produto"
                  onChange={handleChangeSearch}
                />

                <BiSearch
                  size={24}
                  className={`absolute right-2 top-[10px] fill-accent`}
                />
              </div>

              <div className="mt-6">{bodyContent}</div>
            </div>
          </div>
        </div>
      </div>
    </ContainerModal>
  )
}

export default SearchModal
