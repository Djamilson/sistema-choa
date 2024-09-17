'use client'

import { api } from '@/_services/apiClient'
import { Toast } from '@/components/Toast'
import { getQueryClient } from '@/tanStackQuery/getQueryClient'
import { useMutation } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { useDropzone as useDropzoneReactDropzone } from 'react-dropzone'

const queryClient = getQueryClient()

export interface IFileUploadProps {
  carId: string
  accept: {
    'image/png': string[]
    'image/jpeg': string[]
  }
  toggleEdit: () => void
}

export const useFileUpload = ({
  accept,
  carId,
  toggleEdit,
}: IFileUploadProps) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('')

  const { isPending: isLoading, mutateAsync: updatePhotocarMutateAsync } =
    useMutation({
      mutationFn: async (photo: FormData) => {
        const { data } = await api.patch(`cars/${carId}/thumbnail`, photo)

        // setInitialcar(data)

        return data
      },

      onSuccess: (data) => {
        queryClient.setQueryData(['hydrate-car', carId], () => {
          return data
        })

        queryClient.invalidateQueries({ queryKey: ['hydrate-cars'] })
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
        data.append('carId', carId)

        const fileUrl = URL.createObjectURL(file)

        setSelectedFileUrl(fileUrl)
        await updatePhotocarMutateAsync(data)

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
    [updatePhotocarMutateAsync, toggleEdit, carId],
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
