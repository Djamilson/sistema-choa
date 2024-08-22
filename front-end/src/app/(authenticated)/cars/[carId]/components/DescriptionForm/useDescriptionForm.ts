'use client'

import { api } from '@/_services/apiClient'
import { Toast } from '@/components/Toast'
import { getQueryClient } from '@/tanStackQuery/getQueryClient'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IDescriptionFormProps } from '.'
import { validationSchemaDescription } from './schema'
import { FormInputDescription } from './types'

const queryClient = getQueryClient()

export const useDescriptionForm = ({ initialCar }: IDescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormInputDescription>({
    resolver: zodResolver(validationSchemaDescription),
    defaultValues: {
      description: '',
    },
  })

  const toggleEdit = () => {
    setIsEditing((current) => {
      if (initialCar && current && initialCar?.description) {
        setValue('description', initialCar?.description)
      }
      return !current
    })
  }

  useEffect(() => {
    if (initialCar && initialCar?.description) {
      setValue('description', initialCar?.description)
    }
  }, [initialCar, setValue])

  const { mutateAsync: updateCarMutateAsync } = useMutation({
    mutationFn: async ({ description }: FormInputDescription) => {
      const { data } = await api.patch(`cars/${initialCar.id}/description`, {
        description,
      })

      return data
    },
    onSuccess: (data) => {
      console.log('datadata:::', data)

      queryClient.setQueryData(
        ['hydrate-car', data.id],
        (/* oldData: ICar */) => {
          return data
        },
      )
    },
  })

  const onSubmit: SubmitHandler<FormInputDescription> = async (data) => {
    try {
      if (initialCar?.description === data?.description) {
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
