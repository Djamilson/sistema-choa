'use client'

import { ISearchAddress } from '@/@model/address/searchAddress'
import { useLocalizationStore } from '@/contexts/useLocalizationStore'
import { useState } from 'react'
import { SearchAddressComponent } from '../SearchAddressComponent'

type IProps = {
  status_freight: boolean
}
function Freight({ status_freight }: IProps) {
  const {
    state: { location },
    actions: { clearLocalization },
  } = useLocalizationStore()

  const [searchAddress, setSearchAddress] = useState<ISearchAddress>(
    {} as ISearchAddress,
  )

  return (
    <>
      <div className="border-b-neutral-100">
        <SearchAddressComponent
          setSearchAddress={setSearchAddress}
          searchAddress={searchAddress}
        />
      </div>
      {location?.street && (
        <>
          <div className="my-6 flex justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-neutral-500">receba até</span>
              <span className="text-sm font-bold text-neutral-500">
                frete valor
              </span>
            </div>
            <div className="flex flex-col">
              <span
                className={`${status_freight} ? 'line-through' : 'none' text-sm text-neutral-500 `}
              >
                frete valor
              </span>
              <span className="text-sm font-bold">frete grátis</span>
            </div>
          </div>

          <div className="group my-2 mb-4 flex-col gap-2 text-right text-sm font-normal text-neutral-500">
            <div className="flex">
              <p className="text-justify ">
                {`${location?.street}, ${location?.neighborhood}, ${location?.city}-${location?.state}`}
              </p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => clearLocalization()}
                className="text-right hover:text-accent hover:underline hover:decoration-accent"
              >
                limpar endereço
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export { Freight }
