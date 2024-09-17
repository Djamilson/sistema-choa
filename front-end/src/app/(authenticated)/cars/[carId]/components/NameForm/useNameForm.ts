'use client'

import { api } from '@/_services/apiClient'
import { Toast } from '@/components/Toast'
import { getQueryClient } from '@/tanStackQuery/getQueryClient'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { INameFormProps } from '.'
import { validationSchemaName } from './schema'
import { FormInputName } from './types'

const queryClient = getQueryClient()

export const useNameForm = ({ initialCar }: INameFormProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormInputName>({
    resolver: zodResolver(validationSchemaName),
    defaultValues: {
      name: '',
    },
  })

  const toggleEdit = () => {
    setIsEditing((current) => {
      if (initialCar && current && initialCar?.name) {
        setValue('name', initialCar?.name)
      }
      return !current
    })
  }

  useEffect(() => {
    if (initialCar && initialCar?.name) {
      setValue('name', initialCar?.name)
    }
  }, [initialCar, setValue])

  const { mutateAsync: updateCarMutateAsync } = useMutation({
    mutationFn: async ({ name }: FormInputName) => {
      const { data } = await api.patch(`cars/${initialCar.id}/name`, {
        name,
      })

      return data
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['hydrate-car', data.id], () => {
        return data
      })

      queryClient.invalidateQueries({ queryKey: ['hydrate-cars'] })
    },
  })

  const onSubmit: SubmitHandler<FormInputName> = async (data) => {
    try {
      if (initialCar?.name === data?.name) {
        Toast({
          message:
            'Infelizmente não foi feito nenhuma alteração ainda, tente novamente!',
          type: 'warning',
        })

        return
      }
      await updateCarMutateAsync(data)

      Toast({
        message: `Dado editado com sucesso!`,
        type: 'success',
      })
      toggleEdit()
      router.refresh()
    } catch (err) {
      Toast({
        message: 'Ocorreu uma falha ao tentar editar, tente novamente!',
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
  }
}
