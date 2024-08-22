'use client'

import { IProduct } from '@/@model/product/product'
import { api } from '@/_services/apiClient'
import { Toast } from '@/components/Toast'
import { getQueryClient } from '@/tanStackQuery/getQueryClient'
import { useMutation } from '@tanstack/react-query'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { useDropzone as useDropzoneReactDropzone } from 'react-dropzone'

const queryClient = getQueryClient()

export interface IFileUploadProps {
  productId: string
  setInitialProduct: Dispatch<SetStateAction<IProduct>>
  accept: {
    'image/png': string[]
    'image/jpeg': string[]
  }
  toggleEdit: () => void
}

export const useFileUpload = ({
  accept,
  productId,
  toggleEdit,
  setInitialProduct,
}: IFileUploadProps) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('')

  const { isPending: isLoading, mutateAsync: updatePhotoProductMutateAsync } =
    useMutation({
      mutationFn: async (photo: FormData) => {
        const { data } = await api.patch(
          `products/${productId}/thumbnail`,
          photo,
        )

        setInitialProduct(data)

        return data
      },

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['hydrate-product-id', productId],
        })
        queryClient.invalidateQueries({ queryKey: ['hydrate-products'] })
      },
    })

  const onDrop = useCallback(
    async (acceptedFiles: any) => {
      const file = acceptedFiles?.[0]

      if (!file) {
        return
      }

      try {
        const data = new FormData()

        data.append('file', file)
        data.append('productId', productId)

        const fileUrl = URL.createObjectURL(file)

        setSelectedFileUrl(fileUrl)
        await updatePhotoProductMutateAsync(data)

        Toast({
          message: 'Imagem adicionada com sucesso! 👍',
          type: 'success',
        })
        toggleEdit()
      } catch (e: any) {
        Toast({
          message: 'Erro ao tentar atualizar thumbnail, tente novamente!',
          type: 'error',
        })
      }
    },
    [updatePhotoProductMutateAsync, toggleEdit, productId],
  )

  const { getRootProps, getInputProps, isDragActive } =
    useDropzoneReactDropzone({
      maxFiles: 1,
      onDrop,
      accept,
      noClick: true,
    })

  return {
    isLoading,
    selectedFileUrl,
    getRootProps,
    getInputProps,
    isDragActive,
  }
}
