'use client'

import { api } from '@/_services/apiClient'
import { IReceiverDBProps } from '@/app/(authenticated)/payments/components/MainPayment/usePayments'
import { Toast } from '@/components/Toast'
import useGetUserBySession from '@/hooks/auth/useGetUserBySession'
import { useAllReceiverByUserId } from '@/hooks/Entity/usePayments'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

type IUseListReceiverProps = {
  userId: string
}

const useListReceiver = ({ userId }: IUseListReceiverProps) => {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState<string>('')
  const [openDialogModalDelete, setOpenDialogModalDelete] =
    useState<boolean>(false)
  const [isOpenNewReceiverModal, setIsOpenNewReceiverModal] =
    useState<boolean>(false)
  const [selectedReceiverIdDelete, setSelectedReceiverId] = useState<string>('')

  const user = useGetUserBySession()

  const { data: allReceivers } = useAllReceiverByUserId(userId)

  const filteredReceivers =
    search.length > 0
      ? allReceivers?.filter((receiver) =>
          receiver.name.toLowerCase().includes(search.toLowerCase()),
        )
      : allReceivers

  const { mutateAsync: handleFavoriteReceiverMutateAsync } = useMutation({
    mutationFn: async (receiverId: string) => {
      const { data } = await api.patch(`receivers/main/${receiverId}`)

      return data
    },
    onSuccess: (_data) => {
      queryClient.setQueryData(
        ['hydrate-all-receivers', user?.id],
        (oldData: IReceiverDBProps[]) => {
          const newList = oldData?.map((item) => {
            if (_data.id === item.id) {
              return _data
            }
            return { ...item, main: false }
          })

          return newList
        },
      )
      queryClient.invalidateQueries({
        queryKey: ['hydrate-receiver-id', user?.id],
      })
    },
  })

  const onSubmitReceiverMain = async (receiverId: string) => {
    try {
      const mainReceiver = allReceivers?.find((item) => item.id === receiverId)

      if (mainReceiver && mainReceiver.main) {
        Toast({
          message:
            'Atenção! este recebedor já é o seu favorito, tente outro! 🙌',
          type: 'warning',
        })
      } else {
        await handleFavoriteReceiverMutateAsync(receiverId)

        Toast({
          message: 'recebedor definido como favorito com sucesso! 🙌',
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

  const {
    mutateAsync: handleDeleteReceiverMutateAsync,
    isPending: isLoadingDelete,
  } = useMutation({
    mutationFn: async (receiverId: string) => {
      await api.delete(`receivers/${receiverId}`)

      return receiverId
    },
    onSuccess: (_receiverId) => {
      queryClient.setQueryData(
        ['hydrate-all-receivers', user?.id],
        (oldData: IReceiverDBProps[]) => {
          const newList = oldData?.filter((item) => _receiverId !== item.id)

          return newList
        },
      )
      queryClient.invalidateQueries({
        queryKey: ['hydrate-receiver-id', user?.id],
      })
    },
  })

  const handleOnCloseDialogModalDelete = () => {
    setOpenDialogModalDelete(false)
    setSelectedReceiverId('')
  }
  const handleOnOpenDialogModalDelete = () => setOpenDialogModalDelete(true)

  const handleReceiverDelete = async (receiverId: string) => {
    try {
      await handleDeleteReceiverMutateAsync(receiverId)
      handleOnCloseDialogModalDelete()

      Toast({
        message: 'recebedor deletado com sucesso! 🙌',
        type: 'success',
      })
    } catch (error) {
      Toast({
        message: `Error ao tentar deletar o recebedor, tente novamente!`,
        type: 'error',
      })
    }
  }

  useEffect(() => {
    if (selectedReceiverIdDelete) {
      handleOnOpenDialogModalDelete()
    }
  }, [selectedReceiverIdDelete])

  const closeNewReceiverModal = () => setIsOpenNewReceiverModal(false)
  const openNewReceiverModal = () => setIsOpenNewReceiverModal(true)

  return {
    search,
    setSearch,
    filteredReceivers,
    onSubmitReceiverMain,
    handleReceiverDelete,
    openDialogModalDelete,
    handleOnCloseDialogModalDelete,
    isLoadingDelete,
    setSelectedReceiverId,
    selectedReceiverIdDelete,

    isOpenNewReceiverModal,
    closeNewReceiverModal,
    openNewReceiverModal,
  }
}

export default useListReceiver
