'use client'

import { api } from '@/_services/apiClient'
import { Toast } from '@/components/Toast'
import { useConfettiStore } from '@/components/providers/useConfettiStore'
import { generateHash } from '@/utils/generateHash'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { validationSchemaSignin } from './schema'
import { FormInput } from './types'

type IUseSignDataForm = {
  handlerCurrentStep: () => void
  email: string
}

export const useSignUpDataForm = ({
  handlerCurrentStep,
  email,
}: IUseSignDataForm) => {
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false)
  const [visibleConfirmPassword, setVisibleConfirmPassword] =
    useState<boolean>(false)
  const confetti = useConfettiStore()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormInput>({
    resolver: zodResolver(validationSchemaSignin),
    defaultValues: {
      name: '',
      cpfOrCnpj: '',
      phone: '',
      birth_date: '',
      password: '',
      password_confirmation: '',
    },
  })

  const onSubmit: SubmitHandler<FormInput> = async ({
    cpfOrCnpj,
    birth_date,
    name,
    phone,
    password,
  }) => {
    try {
      if (!/\s/.test(name)) {
        console.log('name:::', name)
        Toast({
          message: `o nome dever ter o sobre nome!`,
          type: 'error',
        })
        return
      }

      const user = {
        password: await generateHash(password),

        email,
        cpf: cpfOrCnpj,
        birth_date,
        name,
        phone,
      }

      const { data } = await api.post(`registers/collaborators`, user)

      console.log('Opad', data)
      confetti.onOpen()
      handlerCurrentStep()
      Toast({
        message: 'muito bom, agora vamos finalizar o cadastro!',
        type: 'success',
      })
    } catch (error: any) {
      console.log('error edit name', error)
      let message = 'Ocorreu uma falha ao tentar se cadastrar, tente novamente!'

      if (error?.response?.data?.statusCode === 401) {
        message = 'esse email já está sendo usado, tente novamente!'
      }

      if (error?.response?.data?.statusCode === 402) {
        message = 'esse documento já está sendo usado, tente novamente!'
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
    control,
    setValue,
    visiblePassword,
    visibleConfirmPassword,
    setVisiblePassword,
    setVisibleConfirmPassword,
  }
}
