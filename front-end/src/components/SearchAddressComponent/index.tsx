'use client'

import { ISearchAddress } from '@/@model/address/searchAddress'
import cn from '@/utils/cn'
import { Search } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { PulseLoader } from 'react-spinners'
import InputMask from '../inputs/InputMask'
import { useSearchAddressComponent } from './useSearchAddressComponent'

type IProps = {
  setSearchAddress: Dispatch<SetStateAction<ISearchAddress>>
  searchAddress: ISearchAddress
  initialValue?: string
}

function SearchAddressComponent({
  setSearchAddress,
  searchAddress,
  initialValue,
}: IProps) {
  const { isLoadingCep, handleCEP, handleChange, searchField, isErrorCep } =
    useSearchAddressComponent({ setSearchAddress, searchAddress, initialValue })

  return (
    <div className="mb-4 mt-2 w-full max-w-[460]">
      <div className="flex h-4">
        <div className="relative mt-1">
          <InputMask
            name="cep"
            onChange={handleChange}
            label="Cep"
            value={searchField}
            error={isErrorCep}
          />

          {!isLoadingCep && (
            <div
              className={cn(
                `focus:shadow-outline absolute right-0 top-[0px] cursor-pointer border border-accent bg-accent px-6 py-[22px] text-sm font-medium shadow-sm transition-all duration-150 hover:border-gray-200 hover:bg-accent hover:text-white hover:opacity-80 hover:ring-2 hover:ring-accent hover:ring-offset-1 hover:ring-offset-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 md:ring-offset-accent`,
                isLoadingCep ? 'fill-rose-500' : '',
              )}
              onClick={() => handleCEP()}
            >
              {isLoadingCep && (
                <div className="absolute right-3 top-[11px] cursor-pointer text-white">
                  <PulseLoader size={22} color="white" />
                </div>
              )}
              {!isLoadingCep && (
                <Search
                  className="absolute right-3 top-[11px] cursor-pointer text-white"
                  size={20}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export { SearchAddressComponent }
