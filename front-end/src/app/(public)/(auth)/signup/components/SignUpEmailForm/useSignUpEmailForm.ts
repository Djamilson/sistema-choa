'use client'

import { api } from '@/_services/apiClient'
import { Toast } from '@/components/Toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { validationSchemaSignin } from './schema'
import { FormInput } from './types'

type IUseSignUpEmailForm = {
  handlerCurrentStep: () => void
}

export const useSignUpEmailForm = ({
  handlerCurrentStep,
}: IUseSignUpEmailForm) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInput>({
    resolver: zodResolver(validationSchemaSignin),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit: SubmitHandler<FormInput> = async ({ email }) => {
    try {
      await api.get(`registers/collaborators/emails/${email}`)

      handlerCurrentStep()
      Toast({
        message:
          'muito bom, agora acesse o seu email para finalizar o cadastro!',
        type: 'success',
      })
    } catch (error: any) {
      let message = 'ocorreu uma falha ao tentar se cadastrar, tente novamente!'

      if (error?.response?.data?.statusCode === 401) {
        message = 'esse email já está sendo usado, tente novamente!'
      }

      if (error?.response?.data?.statusCode === 402) {
        message = 'esse documento já está sendo usado, tente novamente!'
      }

      if (error?.response?.data?.statusCode === 403) {
        message =
          'ocorreu um erro em nossos servidores, aguarde alguns instantes e tente novamentee!'
      }

      Toast({
        message,
        type: 'error',
      })
    }
  }

  return {
    onSubmit,
    handleSubmit,
    register,
    errors,
    isSubmitting,
  }
}
