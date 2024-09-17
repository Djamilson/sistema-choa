'use client'

import { ISearchAddress } from '@/@model/address/searchAddress'
import { useLocalizationStore } from '@/contexts/useLocalizationStore'
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react'
import { Toast } from '../Toast'
import * as masks from '../inputs/masks'

type IUseSearchAddressComponentProps = {
  setSearchAddress: Dispatch<SetStateAction<ISearchAddress>>
  searchAddress: ISearchAddress
  initialValue?: string
}

export const useSearchAddressComponent = ({
  setSearchAddress,
  searchAddress,
  initialValue,
}: IUseSearchAddressComponentProps) => {
  const {
    actions: { getLocalization },
  } = useLocalizationStore()

  const [searchField, setSearchField] = useState('')
  const [isErrorCep, setIsErrorCep] = useState<boolean>(false)
  const [isLoadingCep, setIsLoadingCep] = useState<boolean>(false)

  useEffect(() => {
    if (initialValue && initialValue.length > 0) {
      setSearchField(initialValue || '')
    }
  }, [initialValue])

  async function handleCEP() {
    try {
      setIsLoadingCep(true)
      if (searchField.length !== 10) {
        setIsErrorCep(true)
        setIsLoadingCep(false)
        Toast({
          message: 'o cep está inválido, tente novamente!',
          type: 'error',
        })

        return
      }

      await getLocalization({ zipCode: searchField })

      Toast({
        message: `Busca de endereço com sucesso!`,
        type: 'success',
      })
    } catch (error) {
      console.log('error popdopfopsopodfpo', error)
      Toast({
        message: 'Não foi possível buscar o endereço, tente novamente!',
        type: 'error',
      })
    } finally {
      setIsLoadingCep(false)
    }
  }

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    masks.cepByMask.onChange(e)
    const { value } = e.currentTarget
    setSearchField(value)

    if (searchAddress && searchAddress.state) {
      setSearchAddress({} as ISearchAddress)
    }

    if (isErrorCep) {
      setIsErrorCep(false)
    }
  }

  return { isLoadingCep, handleCEP, handleChange, searchField, isErrorCep }
}
