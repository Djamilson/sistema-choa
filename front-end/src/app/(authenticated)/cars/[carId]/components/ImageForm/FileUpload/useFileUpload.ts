'use client'

import { IBrand } from '@/@model/car'
import { api } from '@/_services/apiClient'
import { Toast } from '@/components/Toast'
import { getQueryClient } from '@/tanStackQuery/getQueryClient'
import { useMutation } from '@tanstack/react-query'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { useDropzone as useDropzoneReactDropzone } from 'react-dropzone'

const queryClient = getQueryClient()

export interface IFileUploadProps {
  brandId: string
  setInitialBrand: Dispatch<SetStateAction<IBrand>>
  accept: {
    'image/png': string[]
    'image/jpeg': string[]
  }
  toggleEdit: () => void
}

export const useFileUpload = ({
  accept,
  brandId,
  toggleEdit,
  setInitialBrand,
}: IFileUploadProps) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('')

  const { isPending: isLoading, mutateAsync: updatePhotoBrandMutateAsync } =
    useMutation({
      mutationFn: async (photo: FormData) => {
        const { data } = await api.patch(`brands/${brandId}/logo`, photo)

        setInitialBrand(data)
        return data
      },

      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ['hydrate-brand-id', data.id],
        })
        queryClient.invalidateQueries({ queryKey: ['hydrate-brands'] })
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
        data.append('brandId', brandId)

        const fileUrl = URL.createObjectURL(file)

        setSelectedFileUrl(fileUrl)
        await updatePhotoBrandMutateAsync(data)

        Toast({
          message: 'Imagem adicionada com sucesso! 👍',
          type: 'success',
        })
        toggleEdit()
      } catch (e: any) {
        Toast({
          message: 'Erro ao tentar adicionar a imagem, tente novamente!',
          type: 'error',
        })
      }
    },
    [updatePhotoBrandMutateAsync, toggleEdit, brandId],
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
