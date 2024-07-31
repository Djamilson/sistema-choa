'use client'

import { api } from '@/_services/apiClient'
import { Toast } from '@/components/Toast'
import useGetUserBySession from '@/hooks/auth/useGetUserBySession'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { handleUpdateSession } from '../CpfOrCnpjForm/useCpfOrCnpjForm'
import { validationSchemaBirthDate } from './schema'
import { FormInput } from './types'

export const useBirthDateForm = () => {
  const initialUser = useGetUserBySession()
  const queryClient = useQueryClient()
  const { update: sessionPerson } = useSession()
  const [isEditing, setIsEditing] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormInput>({
    resolver: zodResolver(validationSchemaBirthDate),
    defaultValues: {
      birth_date: '',
    },
  })

  const toggleEdit = () => {
    setIsEditing((current) => {
      return !current
    })
  }

  const { mutateAsync: updateUserBirthDateMutateAsync } = useMutation({
    mutationFn: async ({ birth_date }: FormInput) => {
      const { data } = await api.patch('persons/birth-dates', { birth_date })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hydrate-user'] })
    },
  })

  const onSubmit: SubmitHandler<FormInput> = async ({ birth_date }) => {
    try {
      console.log('minha data', birth_date)
      if (initialUser?.person.birth_date === birth_date) {
        Toast({
          message:
            'Infelizmente não foi feito nenhuma alteração ainda, tente novamente!',
          type: 'warning',
        })

        return
      }
      const updatePerson = await updateUserBirthDateMutateAsync({ birth_date })

      Toast({
        message: `Dados editado com sucesso!`,
        type: 'success',
      })

      toggleEdit()
      handleUpdateSession({ updatePerson, sessionPerson })
    } catch (error: any) {
      console.log('error edit name', error)
      const message = 'Ocorreu uma falha ao tentar editar, tente novamente!'

      Toast({
        message,
        type: 'error',
      })
    }
  }

  return {
    errors,
    register,
    handleSubmit,
    onSubmit,
    isEditing,
    isSubmitting,
    isValid,
    toggleEdit,
    control,
    setValue,
    initialUser,
  }
}
