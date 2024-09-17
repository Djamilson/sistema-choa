'use client'

import { IPerson } from '@/@model/person/person'
import { api } from '@/_services/apiClient'
import { Toast } from '@/components/Toast'
import * as masks from '@/components/inputs/masks'
import useGetUserBySession from '@/hooks/auth/useGetUserBySession'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Session, User } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { validationSchemaCpfOrCnpj } from './schema'
import { FormInput } from './types'

type IHandleUpdateSession = {
  updatePerson: IPerson
  sessionPerson: (data?: any) => Promise<Session | null>
}

export const handleUpdateSession = async ({
  updatePerson,
  sessionPerson,
}: IHandleUpdateSession) => {
  sessionPerson((prev: User) => ({
    ...prev,
    person: {
      ...updatePerson,
      cpfOrCnpjFormat:
        updatePerson?.cpf && masks.cpfOrCnpjMask.maskDefault(updatePerson.cpf),
      birth_dateFormat:
        updatePerson.birth_date &&
        masks.dateMask.maskDefault(updatePerson.birth_date),
    },
  }))
}

export const useCpfOrCnpjForm = () => {
  const initialUser = useGetUserBySession()
  const queryClient = useQueryClient()

  const [isEditing, setIsEditing] = useState(false)
  const { update: sessionPerson, data: myUser } = useSession()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormInput>({
    resolver: zodResolver(validationSchemaCpfOrCnpj),
    defaultValues: {
      cpfOrCnpj:
        masks.cpfOrCnpjMask.maskDefault(initialUser?.person?.cpf) || '',
    },
  })

  const toggleEdit = () => {
    setIsEditing((current) => {
      if (initialUser && current) {
        setValue(
          'cpfOrCnpj',
          masks.cpfOrCnpjMask.maskDefault(initialUser?.person?.cpf),
        )
      }
      return !current
    })
  }

  useEffect(() => {
    if (initialUser) {
      setValue(
        'cpfOrCnpj',
        masks.cpfOrCnpjMask.maskDefault(initialUser?.person?.cpf),
      )
    }
  }, [initialUser, setValue])

  const { mutateAsync: updateUserCpfOrCnpjMutateAsync } = useMutation({
    mutationFn: async ({ cpfOrCnpj }: FormInput) => {
      const { data } = await api.patch('persons/cpfs', { cpf: cpfOrCnpj })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hydrate-user'] })
    },
  })

  const onSubmit: SubmitHandler<FormInput> = async ({ cpfOrCnpj }) => {
    try {
      if (initialUser?.person.cpf === cpfOrCnpj) {
        Toast({
          message:
            'Infelizmente não foi feito nenhuma alteração ainda, tente novamente!',
          type: 'warning',
        })

        return
      }
      const updatePerson = await updateUserCpfOrCnpjMutateAsync({ cpfOrCnpj })

      console.log('meu dado salvo;', updatePerson)
      console.log('meu dado salvo: myUser', myUser)

      Toast({
        message: `Dados editado com sucesso!`,
        type: 'success',
      })

      toggleEdit()
      await handleUpdateSession({ updatePerson, sessionPerson })
    } catch (error: any) {
      let message = 'Ocorreu uma falha ao tentar editar, tente novamente!'

      if (error?.response?.data?.statusCode === 401) {
        message = 'esse documento já está sendo usado, tente novamente!'
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
