'use client'

import { doCredentialLogin } from '@/auth/actions'
import { Toast } from '@/components/Toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { validationSchemaSignin } from './schema'
import { FormInput } from './types'

type Variant = 'LOGIN' | 'REGISTER'

export const useAuthForm = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [variant] = useState<Variant>('LOGIN')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInput>({
    resolver: zodResolver(validationSchemaSignin),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FormInput> = async ({ password, email }) => {
    try {
      await doCredentialLogin({ password, email })

      Toast({
        message: 'login efetuado com sucesso!',
        type: 'success',
      })
      // push(href)
    } catch (error: any) {
      Toast({
        message: 'Não foi possível fazer login, tente novamente!',
        type: 'error',
      })
    }
  }

  return {
    onSubmit,
    handleSubmit,
    variant,
    visible,
    register,
    errors,
    setVisible,
    isSubmitting,
  }
}
