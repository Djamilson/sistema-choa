'use client'

import { api } from '@/_services/apiClient'
import {
    FormInput,
    FormInputEditName,
} from '@/app/(authenticated)/cars/components/types'
import { Toast } from '@/components/Toast'
import { getQueryClient } from '@/tanStackQuery/getQueryClient'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IBrandFormProps } from '.'
import { validationSchemaEditName } from '../../../components/schema'

const queryClient = getQueryClient()

export const useNameForm = ({
  initialBrand,
  setInitialBrand,
}: IBrandFormProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormInputEditName>({
    resolver: zodResolver(validationSchemaEditName),
    defaultValues: {
      name: '',
    },
  })

  const toggleEdit = () => {
    setIsEditing((current) => {
      if (initialBrand && current) {
        setValue('name', initialBrand?.name)
      }
      return !current
    })
  }

  useEffect(() => {
    if (initialBrand) {
      setValue('name', initialBrand?.name)
    }
  }, [initialBrand, setValue])

  const { mutateAsync: updateBrandMutateAsync } = useMutation({
    mutationFn: async ({ name }: FormInput) => {
      const { data } = await api.patch(`brands/${initialBrand.id}/name`, {
        name,
      })

      setInitialBrand(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['hydrate-brand-id', initialBrand.id],
      })
      queryClient.invalidateQueries({ queryKey: ['hydrate-brands'] })
    },
  })

  const onSubmit: SubmitHandler<FormInputEditName> = async (data) => {
    try {
      if (initialBrand?.name === data.name) {
        Toast({
          message:
            'Infelizmente não foi feito nenhuma alteração ainda, tente novamente!',
          type: 'warning',
        })

        return
      }
      await updateBrandMutateAsync(data)

      Toast({
        message: `Dados editado com sucesso!`,
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
