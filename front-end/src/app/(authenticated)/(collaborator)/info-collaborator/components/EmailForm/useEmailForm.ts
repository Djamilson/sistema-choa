'use client'

import { api } from '@/_services/apiClient'
import { Toast } from '@/components/Toast'
import useGetUserBySession from '@/hooks/auth/useGetUserBySession'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { validationSchemaEmail } from './schema'
import { FormInput } from './types'

export const useEmailForm = () => {
  const initialUser = useGetUserBySession()
  const queryClient = useQueryClient()

  const [isEditing, setIsEditing] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormInput>({
    resolver: zodResolver(validationSchemaEmail),
    defaultValues: {
      email: initialUser?.person?.email || '',
    },
  })

  const toggleEdit = () => {
    setIsEditing((current) => {
      if (initialUser && current) {
        setValue('email', initialUser?.person?.email)
      }
      return !current
    })
  }

  useEffect(() => {
    if (initialUser) {
      setValue('email', initialUser?.person.email)
    }
  }, [initialUser, setValue])

  const { mutateAsync: updateUserEmailMutateAsync } = useMutation({
    mutationFn: async ({ email }: FormInput) => {
      const { data } = await api.patch('persons/emails', { email })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hydrate-user'] })
    },
  })

  const onSubmit: SubmitHandler<FormInput> = async ({ email }) => {
    try {
      if (initialUser?.person.email === email) {
        Toast({
          message:
            'Infelizmente não foi feito nenhuma alteração ainda, tente novamente!',
          type: 'warning',
        })

        return
      }
      await updateUserEmailMutateAsync({ email })

      Toast({
        message: `Dados editado com sucesso!`,
        type: 'success',
      })

      toggleEdit()
      // updateUser(user.id)

      /* await update({
        user: updateUser,
      }) */
    } catch (error: any) {
      console.log('error edit name', error)
      let message = 'Ocorreu uma falha ao tentar editar, tente novamente!'

      if (error?.response?.data?.statusCode === 401) {
        message = 'esse email já está sendo usado, tente novamente!'
      }

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
    initialUser,
  }
}
