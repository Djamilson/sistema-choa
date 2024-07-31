import { api } from '@/_services/apiClient'
import { Toast } from '@/components/Toast'
import useGetUserBySession from '@/hooks/auth/useGetUserBySession'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export const useGender = () => {
  const queryClient = useQueryClient()

  const [openDialogModal, setOpenDialogModal] = useState<boolean>(false)
  const [selectedGender, setSelectedGender] = useState<string>('')

  const user = useGetUserBySession()

  useEffect(() => {
    if (user?.person?.gender) {
      setSelectedGender(user?.person?.gender)
    }
  }, [user])

  const handleOnOpenDialogModal = () => setOpenDialogModal(true)

  useEffect(() => {
    if (selectedGender && user?.person?.gender !== selectedGender) {
      handleOnOpenDialogModal()
    }
  }, [selectedGender, user?.person?.gender])

  const { mutateAsync: updateGender, isPending } = useMutation({
    mutationFn: async (selected: string) => {
      const { data } = await api.patch('persons/genders', {
        gender: selected,
      })

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hydrate-user'] })
    },
  })

  const handleOnCloseDialogModal = () => {
    setOpenDialogModal(false)
    setSelectedGender('')
  }

  const handleUpdateGender = async (selected: string) => {
    try {
      // const id = user?.id

      await updateGender(selected)
      Toast({
        message: 'O seu gênero foi alterado com sucesso!',
        type: 'success',
      })

      // updateUser(id)
      handleOnCloseDialogModal()
    } catch (err) {
      Toast({
        message: 'Erro ao tentar atualizar o gênero, tente novamente!',
        type: 'error',
      })
    }
  }

  return {
    handleUpdateGender,
    setSelectedGender,
    selectedGender,
    handleOnCloseDialogModal,
    openDialogModal,
    isPending,
  }
}
