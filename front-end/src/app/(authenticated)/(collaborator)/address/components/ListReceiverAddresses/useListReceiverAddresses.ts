'use client'

import { IAddress } from '@/@model/address/address'
import { api } from '@/_services/apiClient'
import { IReceiverDBProps } from '@/app/(authenticated)/payments/components/MainPayment/usePayments'
import { Toast } from '@/components/Toast'
import useGetUserBySession from '@/hooks/auth/useGetUserBySession'
import { useAllAddressReceiverByReceiverId } from '@/hooks/Entity/usePayments'
import { formatZipCodeInPoint } from '@/utils/formatZipCode'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

type IUseListReceiverAddressesProps = {
  receiverId: string
}

type IHandleFavoriteAddress = {
  addressId: string
  receiverId: string
}

const useListReceiverAddresses = ({
  receiverId,
}: IUseListReceiverAddressesProps) => {
  const queryClient = useQueryClient()

  const [isOpenNewAddressReceiverModal, setIsOpenNewAddressReceiverModal] =
    useState<boolean>(false)
  const [openDialogModalDelete, setOpenDialogModalDelete] =
    useState<boolean>(false)
  const [selectedAddressIdDelete, setSelectedAddressId] = useState<string>('')

  const { data: addresses } = useAllAddressReceiverByReceiverId(receiverId)
  const user = useGetUserBySession()

  const closeNewAddressReceiverModal = () => {
    setIsOpenNewAddressReceiverModal(false)
  }

  const handleOnOpenDialogModalDelete = () => setOpenDialogModalDelete(true)

  useEffect(() => {
    if (selectedAddressIdDelete) {
      handleOnOpenDialogModalDelete()
    }
  }, [selectedAddressIdDelete])

  const handleOnCloseDialogModalDelete = () => {
    setOpenDialogModalDelete(false)
    setSelectedAddressId('')
  }

  const {
    mutateAsync: handleDeleteAddressMutateAsync,
    isPending: isLoadingDelete,
  } = useMutation({
    mutationFn: async (addressId: string) => {
      await api.delete(`addresses/${addressId}`)

      return addressId
    },
    onSuccess: (_addressId) => {
      queryClient.setQueryData(
        ['hydrate-all-addresses-receivers', receiverId],
        (oldData: IAddress[]) => {
          const newList = oldData?.filter((item) => item.id !== _addressId)

          return newList
        },
      )
      queryClient.invalidateQueries({
        queryKey: ['hydrate-receiver-id', user?.id],
      })
    },
  })

  const handleAddressDelete = async (addressId: string) => {
    try {
      await handleDeleteAddressMutateAsync(addressId)
      handleOnCloseDialogModalDelete()

      Toast({
        message: 'endereço deletado com sucesso! 🙌',
        type: 'success',
      })
    } catch (error) {
      Toast({
        message: `Error ao tentar deletar o endereço, tente novamente!`,
        type: 'error',
      })
    }
  }

  const { mutateAsync: handleFavoriteReceiverMutateAsync } = useMutation({
    mutationFn: async ({ addressId, receiverId }: IHandleFavoriteAddress) => {
      const { data } = await api.patch(
        `receivers/addresses/main/${addressId}`,
        {
          receiverId,
        },
      )

      return { receiver: data, addressId }
    },
    onSuccess: ({ receiver: _receiver, addressId }) => {
      queryClient.setQueryData(
        ['hydrate-all-receivers', user?.id],
        (oldData: IReceiverDBProps[]) => {
          const newList = oldData?.map((item) => {
            if (_receiver.id === item.id) {
              return {
                ..._receiver,
                address: {
                  ..._receiver.address,
                  main: true,
                  zipCodeFormat: formatZipCodeInPoint(_receiver.zip_code),
                },
              }
            }
            return item
          })

          return newList
        },
      )

      queryClient.setQueryData(
        ['hydrate-all-addresses-receivers', receiverId],
        (oldData: IAddress[]) => {
          const addresses = oldData?.map((address) => {
            if (address.id === addressId) {
              return {
                ...address,
                main: true,
                zipCodeFormat: formatZipCodeInPoint(address.zip_code),
              }
            }
            return { ...address, main: false }
          })

          return addresses
        },
      )
    },
  })

  const onSubmitAddressFavorite = async ({
    addressId,
    receiverId,
  }: IHandleFavoriteAddress) => {
    try {
      const receiversCached = queryClient.getQueryData([
        'hydrate-all-receivers',
        user?.id,
      ]) as unknown as IReceiverDBProps[]

      console.log('receiverCached:', receiversCached)
      const receiverCached = receiversCached.find(
        (item) => item.id === receiverId,
      )

      if (receiverCached?.address_id === addressId) {
        Toast({
          message:
            'Atenção! este endereço já é o seu favorito, tente outro! 🙌',
          type: 'warning',
        })
      } else {
        await handleFavoriteReceiverMutateAsync({ addressId, receiverId })

        Toast({
          message: 'endereço definido como favorito com sucesso! 🙌',
          type: 'success',
        })
      }
    } catch (error) {
      Toast({
        message: `Error ao tentar definir o recebedor como favorito, tente novamente!`,
        type: 'error',
      })
    }
  }

  return {
    addresses,

    isOpenNewAddressReceiverModal,
    closeNewAddressReceiverModal,
    setIsOpenNewAddressReceiverModal,

    selectedAddressIdDelete,
    handleOnCloseDialogModalDelete,
    openDialogModalDelete,
    handleAddressDelete,
    isLoadingDelete,
    setSelectedAddressId,
    onSubmitAddressFavorite,
  }
}

export default useListReceiverAddresses
