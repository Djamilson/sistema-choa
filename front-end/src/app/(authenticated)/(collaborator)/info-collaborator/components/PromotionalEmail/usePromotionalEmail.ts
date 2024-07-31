'use client'

import { api } from '@/_services/apiClient'
import { Toast } from '@/components/Toast'
import useGetUserBySession from '@/hooks/auth/useGetUserBySession'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { handleUpdateSession } from '../CpfOrCnpjForm/useCpfOrCnpjForm'

export const usePromotionalEmail = () => {
  const queryClient = useQueryClient()
  const { update: sessionPerson } = useSession()
  const user = useGetUserBySession()

  const [isChecked, setIsChecked] = useState<boolean>(false)

  useEffect(() => {
    if (user?.person?.promotional_email) {
      setIsChecked(user?.person?.promotional_email)
    }
  }, [setIsChecked, user])

  const { mutateAsync: updatePromotionalEmail } = useMutation({
    mutationFn: async () => {
      setIsChecked(!user?.person?.promotional_email)

      const { data } = await api.patch('persons/promotional-emails', {
        promotional_email: !user?.person?.promotional_email,
      })

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hydrate-user'] })
    },
  })

  const closeModalTransitionIsActiveOrIsDesactive = () => {
    setIsOpenModalTransitionIsActiveOrIsDesactive(false)
    setSelectedIsActiveOrIsDesactive('')
  }

  const handleIsActiveOrIsDesactive = async () => {
    try {
      const updatePerson = await updatePromotionalEmail()
      Toast({
        message:
          'A opção para receber email promocional foi atualizada com sucesso!',
        type: 'success',
      })

      closeModalTransitionIsActiveOrIsDesactive()
      await handleUpdateSession({ updatePerson, sessionPerson })
    } catch (err) {
      Toast({
        message:
          'Erro ao tentar atualizar a opção para recebimento de email promocional, tente novamente!',
        type: 'error',
      })
    }
  }

  const [selectedIsActiveOrIsDesactive, setSelectedIsActiveOrIsDesactive] =
    useState<string>('')
  const [
    isOpenModalTransitionIsActiveOrIsDesactive,
    setIsOpenModalTransitionIsActiveOrIsDesactive,
  ] = useState(false)

  const openModalTransitionIsActiveOrIsDesactive = () => {
    setIsOpenModalTransitionIsActiveOrIsDesactive(true)
  }

  useEffect(() => {
    if (
      selectedIsActiveOrIsDesactive !== null &&
      selectedIsActiveOrIsDesactive.length > 0
    ) {
      openModalTransitionIsActiveOrIsDesactive()
    }
  }, [selectedIsActiveOrIsDesactive])

  return {
    isChecked,
    isOpenModalTransitionIsActiveOrIsDesactive,
    closeModalTransitionIsActiveOrIsDesactive,
    handleIsActiveOrIsDesactive,
    openModalTransitionIsActiveOrIsDesactive,
    setSelectedIsActiveOrIsDesactive,
  }
}
