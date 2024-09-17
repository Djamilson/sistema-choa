'use client'

import { api } from '@/_services/apiClient'
import { Toast } from '@/components/Toast'
import { useConfettiStore } from '@/components/providers/useConfettiStore'
import { generateHash } from '@/utils/generateHash'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { validationSchemaSignin } from './schema'
import { FormInput } from './types'

type IUseRegisterFormProps = {
  name: string
  email: string
}

export const useRegisterForm = ({ name, email }: IUseRegisterFormProps) => {
  const [currentStep, setCurrentStep] = useState<number>(1)

  const handlerCurrentStep = () => setCurrentStep((old) => old + 1)
  const handlerGoBackCurrentStep = () => setCurrentStep((old) => old - 1)

  const [visiblePassword, setVisiblePassword] = useState<boolean>(false)
  const [visibleConfirmPassword, setVisibleConfirmPassword] =
    useState<boolean>(false)
  const confetti = useConfettiStore()

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormInput>({
    resolver: zodResolver(validationSchemaSignin),
    defaultValues: {
      email: '',
      name: '',
      cpfOrCnpj: '',
      phone: '',
      birth_date: '',
      password: '',
      password_confirmation: '',
    },
  })

  useEffect(() => {
    if (name.length > 0) {
      setValue('name', name)
    }
  }, [name, setValue])

  useEffect(() => {
    if (email.length > 0) {
      setValue('email', email)
    }
  }, [email, setValue])

  const onSubmit: SubmitHandler<FormInput> = async ({
    email,
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

      await api.post(`registers/collaborators`, user)

      confetti.onOpen()
      handlerCurrentStep()
      Toast({
        message: 'muito bom, agora vamos finalizar o cadastro!',
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
    currentStep,
    handlerCurrentStep,
    handlerGoBackCurrentStep,
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
