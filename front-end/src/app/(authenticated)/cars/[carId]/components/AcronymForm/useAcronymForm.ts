'use client'

import { api } from '@/_services/apiClient'
import { Toast } from '@/components/Toast'
import { getQueryClient } from '@/tanStackQuery/getQueryClient'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IAcronymFormProps } from '.'
import { validationSchemaAcronym } from './schema'
import { FormInputAcronym } from './types'

const queryClient = getQueryClient()

export const useAcronymForm = ({ initialCar }: IAcronymFormProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormInputAcronym>({
    resolver: zodResolver(validationSchemaAcronym),
    defaultValues: {
      acronym: '',
    },
  })

  const toggleEdit = () => {
    setIsEditing((current) => {
      if (initialCar && current && initialCar?.acronym) {
        setValue('acronym', initialCar?.acronym)
      }
      return !current
    })
  }

  useEffect(() => {
    if (initialCar && initialCar?.acronym) {
      setValue('acronym', initialCar?.acronym)
    }
  }, [initialCar, setValue])

  const { mutateAsync: updateCarMutateAsync } = useMutation({
    mutationFn: async ({ acronym }: FormInputAcronym) => {
      const { data } = await api.patch(`cars/${initialCar.id}/acronym`, {
        acronym,
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

  const onSubmit: SubmitHandler<FormInputAcronym> = async (data) => {
    try {
      if (initialCar?.acronym === data?.acronym) {
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
