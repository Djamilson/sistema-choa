'use client'

import { IAddress } from '@/@model/address/address'
import { api } from '@/_services/apiClient'
import { Toast } from '@/components/Toast'
import { useAddresses } from '@/hooks/Entity/useAddresses'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useListingAddressStore } from '../useListingAddressStore'

export const useListingAddresses = () => {
  const queryClient = useQueryClient()
  const [selectedAddressMain, setSelectedAddressMain] = useState<IAddress>(
    {} as IAddress,
  )
  const [selectedAddressDelete, setSelectedAddressDelete] = useState<IAddress>(
    {} as IAddress,
  )
  const [isOpenEditModalAddress, setIsOpenEditModalAddress] = useState(false)
  const [isLoadingUpdateMain, setIsLoadingUpdateMain] = useState<boolean>(false)
  const [isOpenModalTransitionDelete, setIsOpenModalTransitionDelete] =
    useState(false)
  const [selectedAddressIdEdit, setSelectedAddressIdEdit] = useState<string>('')

  const {
    state: { addresses },
    actions: { setListAddresses, upDateAddressMain, removeAddress },
  } = useListingAddressStore()

  const {
    data: addressesData,
    isLoading: isLoadingAddress,
    isFetching: isFetchingAddress,
  } = useAddresses()

  useEffect(() => {
    if (addressesData) {
      setListAddresses(addressesData)
    }
  }, [addressesData, setListAddresses])

  const { mutateAsync: updateAddressMain } = useMutation({
    mutationFn: async () => {
      await api.put(`addresses/main/addresses/${selectedAddressMain.id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hydrate-addresses'] })
    },
  })

  // selectedAddressMain address setMain
  useEffect(() => {
    async function handleUpdateMain() {
      try {
        setIsLoadingUpdateMain(true)
        await updateAddressMain()
        upDateAddressMain(selectedAddressMain.id)

        Toast({
          message: 'O endereço principal foi alterado com sucesso',
          type: 'success',
        })
      } catch (error) {
        const message =
          'Ocorreu uma falha ao tentar alterar o endereço principal, tente novamente!'

        Toast({
          message,
          type: 'success',
        })
      } finally {
        setSelectedAddressMain({} as IAddress)
        setIsLoadingUpdateMain(false)
      }
    }
    if (selectedAddressMain?.id) {
      handleUpdateMain()
    }
  }, [selectedAddressMain, upDateAddressMain, updateAddressMain])

  // selected address is open dialog delete
  useEffect(() => {
    if (
      typeof selectedAddressDelete === 'object' &&
      selectedAddressDelete !== null &&
      selectedAddressDelete.id
    ) {
      openModalTransitionDelete()
    }
  }, [selectedAddressDelete])

  function closeModalTransitionDelete() {
    setIsOpenModalTransitionDelete(false)
  }

  function openModalTransitionDelete() {
    setIsOpenModalTransitionDelete(true)
  }

  const { mutateAsync: deleteAddress } = useMutation({
    mutationFn: async () => {
      await api.delete(`addresses/${selectedAddressDelete.id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hydrate-addresses'] })
    },
  })

  async function handleDelete() {
    try {
      await deleteAddress()
      removeAddress(selectedAddressDelete.id)

      Toast({
        message: 'O endereço foi removido com sucesso!',
        type: 'success',
      })
    } catch (error) {
      console.log(error)
      const message = 'Ocorreu uma falha ao tentar remover, tente novamente!'

      Toast({
        message,
        type: 'error',
      })
    } finally {
      closeModalTransitionDelete()
      setSelectedAddressDelete({} as IAddress)
    }
  }

  function closeEditModalAddress() {
    setIsOpenEditModalAddress(false)
    setSelectedAddressIdEdit('')
  }

  function handleIsOpenEditModalAddress() {
    setIsOpenEditModalAddress(true)
  }

  useEffect(() => {
    if (selectedAddressIdEdit !== null && selectedAddressIdEdit.length > 0) {
      handleIsOpenEditModalAddress()
    }
  }, [selectedAddressIdEdit])

  return {
    handleDelete,
    addresses,
    isLoadingUpdateMain,
    isLoadingAddress,
    isFetchingAddress,
    isOpenEditModalAddress,
    isOpenModalTransitionDelete,
    closeModalTransitionDelete,
    closeEditModalAddress,
    selectedAddressIdEdit,
    selectedAddressDelete,
    selectedAddressMain,
    setIsLoadingUpdateMain,
    setSelectedAddressMain,
    setSelectedAddressIdEdit,
    setSelectedAddressDelete,
  }
}
