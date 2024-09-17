'use client'

import { api } from '@/_services/apiClient'
import { Toast } from '@/components/Toast'
import { getQueryClient } from '@/tanStackQuery/getQueryClient'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IBrandFormProps } from '.'
import { validationSchemaBrand } from './schema'
import { FormInputBrand } from './types'

const queryClient = getQueryClient()

export const useBrandForm = ({ initialCar }: IBrandFormProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormInputBrand>({
    resolver: zodResolver(validationSchemaBrand),
    defaultValues: {
      brand: '',
    },
  })

  const toggleEdit = () => {
    setIsEditing((current) => {
      if (initialCar && current && initialCar?.brand) {
        setValue('brand', initialCar?.brand)
      }
      return !current
    })
  }

  useEffect(() => {
    if (initialCar && initialCar?.brand) {
      setValue('brand', initialCar?.brand)
    }
  }, [initialCar, setValue])

  const { mutateAsync: updateCarMutateAsync } = useMutation({
    mutationFn: async ({ brand }: FormInputBrand) => {
      const { data } = await api.patch(`cars/${initialCar.id}/brand`, {
        brand,
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

  const onSubmit: SubmitHandler<FormInputBrand> = async (data) => {
    try {
      if (initialCar?.brand === data?.brand) {
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
