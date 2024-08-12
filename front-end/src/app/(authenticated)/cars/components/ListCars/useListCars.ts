'use client'

import { ICar } from '@/@model/car'
import { useAllCars } from '@/hooks/Entity/useCars'
import { useDebounce } from '@/hooks/useDebounce'
import { FormEvent, useEffect, useState } from 'react'

export const useListCars = () => {
  const [isOpenModalContainerButton, setIsOpenModalContainerButton] =
    useState(false)
  const [isOpenNewModalCar, setIsOpenNewModalCar] = useState(false)

  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce({ value: searchTerm, setPage })

  const [selectCarEdit, setSelectCarEdit] = useState<ICar>({} as ICar)

  const {
    data: cars,
    isLoading,
    isFetching,
    error,
  } = useAllCars(page, limit, debouncedSearchTerm)

  function closeModalEditClear() {
    setIsOpenModalContainerButton(false)
    setSelectCarEdit({} as ICar)
  }

  function openModalEdit() {
    setIsOpenModalContainerButton(true)
  }

  function closeNewModalCar() {
    setIsOpenNewModalCar(false)
    setSelectCarEdit({} as ICar)
  }

  const handleChangeSearch = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    setSearchTerm(value)
  }

  useEffect(() => {
    if (selectCarEdit && selectCarEdit.id) {
      openModalEdit()
    }
  }, [selectCarEdit])

  return {
    searchTerm,
    handleChangeSearch,
    isOpenNewModalCar,
    closeNewModalCar,
    selectCarEdit,
    setSelectCarEdit,
    setIsOpenNewModalCar,
    cars,
    page,
    setPage,
    limit,
    isLoading,
    isFetching,
    isOpenModalContainerButton,

    closeModalEditClear,
    error,
  }
}
