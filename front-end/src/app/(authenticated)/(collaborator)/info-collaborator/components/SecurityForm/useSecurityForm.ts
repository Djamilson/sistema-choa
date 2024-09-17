'use client'

import { api } from '@/_services/apiClient'
import { Toast } from '@/components/Toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { validationSchemaSecurity } from './schema'
import { FormInput } from './types'

export const useSecurityForm = () => {
  const { refresh } = useRouter()

  const [isEditing, setIsEditing] = useState(false)
  const [visiblePasswordOld, setVisiblePasswordOld] = useState<boolean>(false)
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false)
  const [visibleConfirmPassword, setVisibleConfirmPassword] =
    useState<boolean>(false)

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormInput>({
    resolver: zodResolver(validationSchemaSecurity),
    mode: 'onTouched',
    defaultValues: {
      old_password: '',
      password: '',
      password_confirmation: '',
    },
  })

  useEffect(() => {
    // setValue('old_password', '')
    setFocus('old_password')
  }, [setFocus])

  const toggleEdit = () => {
    setIsEditing((current) => {
      return !current
    })
  }

  const { mutateAsync: updateUserEmailMutateAsync } = useMutation({
    mutationFn: async ({
      old_password,
      password,
      password_confirmation,
    }: FormInput) => {
      const { data } = await api.patch('persons/passwords', {
        old_password,
        password,
        password_confirmation,
      })
      return data
    },
    onSuccess: () => {},
  })

  const onSubmit: SubmitHandler<FormInput> = async ({
    old_password,
    password,
    password_confirmation,
  }) => {
    try {
      await updateUserEmailMutateAsync({
        old_password,
        password,
        password_confirmation,
      })

      Toast({
        message: `Dados editado com sucesso!`,
        type: 'success',
      })

      toggleEdit()
      refresh()
    } catch (erro) {
      console.log('erro', erro)
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

    visiblePasswordOld,
    visiblePassword,
    visibleConfirmPassword,

    setVisiblePasswordOld,
    setVisiblePassword,
    setVisibleConfirmPassword,
  }
}
