'use client'

import { api } from '@/_services/apiClient'
import { Toast } from '@/components/Toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { useDropzone as useDropzoneReactDropzone } from 'react-dropzone'

export interface IFileUploadProps {
  userId: string
  accept: {
    'image/png': string[]
    'image/jpeg': string[]
  }
  toggleEdit: () => void
}

export const useFileUpload = ({
  accept,
  userId,
  toggleEdit,
}: IFileUploadProps) => {
  const queryClient = useQueryClient()
  const [selectedFileUrl, setSelectedFileUrl] = useState('')

  const { isPending: isLoading, mutateAsync: updatePhotoUserMutateAsync } =
    useMutation({
      mutationFn: async (photo: FormData) => {
        const { data } = await api.patch(`users/avatar`, photo)

        // updateAvatarUser(data)

        return data
      },

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['hydrate-user-id', userId],
        })
        queryClient.invalidateQueries({ queryKey: ['hydrate-users'] })
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
        data.append('userId', userId)

        const fileUrl = URL.createObjectURL(file)

        setSelectedFileUrl(fileUrl)
        await updatePhotoUserMutateAsync(data)

        Toast({
          message: 'Imagem adicionada com sucesso! 👍',
          type: 'success',
        })
        toggleEdit()
      } catch (e: any) {
        console.log('error ', e)
        Toast({
          message: 'Erro ao tentar atualizar thumbnail, tente novamente!',
          type: 'error',
        })
      }
    },
    [updatePhotoUserMutateAsync, toggleEdit, userId],
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
