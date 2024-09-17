'use client'

import { api } from '@/_services/apiClient'
import { Toast } from '@/components/Toast'
import { getQueryClient } from '@/tanStackQuery/getQueryClient'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IFuelTypeFormProps } from '.'
import { validationSchemaFuelType } from './schema'
import { FormInputFuelType } from './types'

const queryClient = getQueryClient()

export const useFuelTypeForm = ({ initialCar }: IFuelTypeFormProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormInputFuelType>({
    resolver: zodResolver(validationSchemaFuelType),
    defaultValues: {
      fuel_type: '',
    },
  })

  const toggleEdit = () => {
    setIsEditing((current) => {
      if (initialCar && current && initialCar?.fuel_type) {
        setValue('fuel_type', initialCar?.fuel_type)
      }
      return !current
    })
  }

  useEffect(() => {
    if (initialCar && initialCar?.fuel_type) {
      setValue('fuel_type', initialCar?.fuel_type)
    }
  }, [initialCar, setValue])

  const { mutateAsync: updateCarMutateAsync } = useMutation({
    mutationFn: async ({ fuel_type }: FormInputFuelType) => {
      const { data } = await api.patch(`cars/${initialCar.id}/fuel_type`, {
        fuel_type,
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

  const onSubmit: SubmitHandler<FormInputFuelType> = async (data) => {
    try {
      if (initialCar?.fuel_type === data?.fuel_type) {
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
