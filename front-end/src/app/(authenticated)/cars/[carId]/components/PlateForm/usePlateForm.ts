'use client'

import { api } from '@/_services/apiClient'
import { Toast } from '@/components/Toast'
import { getQueryClient } from '@/tanStackQuery/getQueryClient'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IPlateFormProps } from '.'
import { validationSchemaPlate } from './schema'
import { FormInputPlate } from './types'

const queryClient = getQueryClient()

export const usePlateForm = ({ initialCar }: IPlateFormProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormInputPlate>({
    resolver: zodResolver(validationSchemaPlate),
    defaultValues: {
      plate: '',
    },
  })

  const toggleEdit = () => {
    setIsEditing((current) => {
      if (initialCar && current && initialCar?.plate) {
        setValue('plate', initialCar?.plate)
      }
      return !current
    })
  }

  useEffect(() => {
    if (initialCar && initialCar?.plate) {
      setValue('plate', initialCar?.plate)
    }
  }, [initialCar, setValue])

  const { mutateAsync: updateCarMutateAsync } = useMutation({
    mutationFn: async ({ plate }: FormInputPlate) => {
      const { data } = await api.patch(`cars/${initialCar.id}/plate`, {
        plate,
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

  const onSubmit: SubmitHandler<FormInputPlate> = async (data) => {
    try {
      if (initialCar?.plate === data?.plate) {
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
