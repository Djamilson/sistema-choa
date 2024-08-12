'use client'

import { IAddress } from '@/@model/address/address'
import { ISearchAddress } from '@/@model/address/searchAddress'
import { api } from '@/_services/apiClient'
import { ValidationSchema } from '@/app/(authenticated)/payments/components/Payment/components/address/NewAddressReceiverModal/types'
import { validationSchema } from '@/app/(authenticated)/questions/[productId]/[aggregationProductId]/components/CreateQuestionForm/schema'
import { Toast } from '@/components/Toast'
import { useLocalizationStore } from '@/contexts/useLocalizationStore'
import useGetUserBySession from '@/hooks/auth/useGetUserBySession'
import { useAddressById } from '@/hooks/Entity/useAddresses'
import { formatZipCodeInPoint } from '@/utils/formatZipCode'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useListingAddressStore } from '../useListingAddressStore'

type IUseAddressProps = {
  onCloseModal: () => void
  selectedAddressIdEdit: string
}

export const useEditAddress = ({
  onCloseModal,
  selectedAddressIdEdit,
}: IUseAddressProps) => {
  const queryClient = useQueryClient()

  const {
    state: { location },
    actions: { setLocalizationEdit },
  } = useLocalizationStore()

  const [searchAddress, setSearchAddress] = useState<ISearchAddress>(
    {} as ISearchAddress,
  )

  const { data: address } = useAddressById(selectedAddressIdEdit)
  const user = useGetUserBySession()

  const {
    actions: { upDateAddress },
  } = useListingAddressStore()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
    },
  })

  useEffect(() => {
    if (location) {
      setValue('neighborhood', location?.neighborhood)
      setValue('street', location?.street)
      setValue('city', location?.city)
      setValue('state', location?.state)

      clearErrors([
        'neighborhood',
        'street',
        'city',
        'state',
        'street',
        'number',
      ])
    }
  }, [location, setValue, clearErrors])

  useEffect(() => {
    if (typeof address === 'object' && address !== null && address.id) {
      setValue('street', address.street)
      setValue('number', String(address.number))
      setValue('complement', address.complement)
      setValue('neighborhood', address.neighborhood)
      setValue('state', address.state)
      setValue('city', address.city)

      setLocalizationEdit(address)
    }
  }, [address, setValue, setLocalizationEdit])

  const { mutateAsync: updateAddress } = useMutation({
    mutationFn: async ({
      city,
      id,
      number,
      neighborhood,
      state,
      street,
      zip_code,
      complement,
    }: Omit<IAddress, 'main' | 'zipCodeFormat' | 'receiver_id'>) => {
      const { data } = await api.put('addresses', {
        city,
        id,
        number,
        neighborhood,
        state,
        street,
        zip_code,
        complement,
      })

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`person`, { id: user?.person.id }],
      })
      queryClient.invalidateQueries({ queryKey: [`hydrate-addresses`] })
    },
  })

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    try {
      if (!address?.id || !location?.cep) {
        Toast({
          message: 'Erro ao tentar cadastrar o endereço, tente novamente!',
          type: 'error',
        })
        reset()
        onCloseModal()
        return
      }

      const id = address.id

      const newAddress = await updateAddress({
        ...data,
        id,
        zip_code: location?.cep,
        number: Number(data.number),
        status: true,
      })

      upDateAddress({
        ...newAddress,
        zipCodeFormat: formatZipCodeInPoint(newAddress.zip_code),
      })

      Toast({
        message: 'Endereço de entrega cadastrado com sucesso!',
        type: 'success',
      })
      reset()
      onCloseModal()
    } catch (err) {
      Toast({
        message: 'Erro ao tentar cadastrar o endereço, tente novamente!',
        type: 'error',
      })
    }
  }

  return {
    errors,
    register,
    handleSubmit,
    onSubmit,
    setSearchAddress,
    searchAddress,
    address,
  }
}
