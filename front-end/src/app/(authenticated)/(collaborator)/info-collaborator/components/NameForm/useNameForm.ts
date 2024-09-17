'use client'

import { api } from '@/_services/apiClient'
import { Toast } from '@/components/Toast'
import useGetUserBySession from '@/hooks/auth/useGetUserBySession'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useEffect, useState, useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { handleUpdateSession } from '../CpfOrCnpjForm/useCpfOrCnpjForm'
import { validationSchemaName } from './schema'
import { FormInput } from './types'

export const useNameForm = () => {
  const initialUser = useGetUserBySession()
  const { update: sessionPerson } = useSession()
  const queryClient = useQueryClient()

  const [isEditing, setIsEditing] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormInput>({
    resolver: zodResolver(validationSchemaName),
    defaultValues: {
      name: '',
    },
  })

  const toggleEdit = () => {
    setIsEditing((current) => {
      if (initialUser && current) {
        setValue('name', initialUser?.person?.name)
      }
      return !current
    })
  }

  useEffect(() => {
    if (initialUser) {
      setValue('name', initialUser?.person.name)
    }
  }, [initialUser, setValue])

  const { mutateAsync: updateUserMutateAsync } = useMutation({
    mutationFn: async ({ name }: FormInput) => {
      const { data } = await api.patch('persons/names', { name })
      console.log('slavou', data)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hydrate-addresses'] })
    },
  })
  const [isPending, startTransition] = useTransition()

  const onSubmit: SubmitHandler<FormInput> = async ({ name }) => {
    startTransition(async () => {
      try {
        if (initialUser?.person.name === name) {
          Toast({
            message:
              'Infelizmente não foi feito nenhuma alteração ainda, tente novamente!',
            type: 'warning',
          })

          return
        }
        const updatePerson = await updateUserMutateAsync({ name })

        Toast({
          message: `Dados editado com sucesso!`,
          type: 'success',
        })

        toggleEdit()
        handleUpdateSession({ updatePerson, sessionPerson })
      } catch {
        Toast({
          message: 'Ocorreu uma falha ao tentar editar, tente novamente!',
          type: 'error',
        })
      }
    })
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
    isPending,
  }
}
