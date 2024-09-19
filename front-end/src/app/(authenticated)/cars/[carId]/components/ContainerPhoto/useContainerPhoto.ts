'use client'

import { api } from '@/_services/apiClient'
import { Toast } from '@/components/Toast'
import { getCarByCarId } from '@/hooks/Entity/useCars'
import { getQueryClient } from '@/tanStackQuery/getQueryClient'
import { useMutation } from '@tanstack/react-query'
import { filesize } from 'filesize'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export type IFileProps = {
  file: File
  id: string
  name: string
  readableSize: string
  preview: string
  uploaded: boolean
  url: string
  progress: number
  error: boolean
}

type IPropsFileSave = {
  uploadedFile: IFileProps
  carId: string
}

type IOnSubmitProps = { carId: string }

const queryClient = getQueryClient()

export const useContainerPhoto = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<IFileProps[]>(
    [] as IFileProps[],
  )
  const toggleEdit = () =>
    setIsEditing((current) => {
      setUploadedFiles([] as IFileProps[])
      return !current
    })

  const { mutateAsync: createImageMutateAsync } = useMutation({
    mutationFn: async ({ carId }: IOnSubmitProps) => {
      const promises = uploadedFiles.map(async (file) => {
        return processUpload({
          uploadedFile: file,
          carId,
        })
      })

      await Promise.all(promises)

      return carId
    },
    onSuccess: async (carId) => {
      queryClient.invalidateQueries({ queryKey: ['hydrate-car', carId] })

      const data = await getCarByCarId(carId)
      queryClient.setQueryData(['hydrate-car', data.id], () => {
        return data
      })

      queryClient.invalidateQueries({ queryKey: ['hydrate-cars'] })
    },
  })

  function handleUpload(file: File) {
    setUploadedFiles([
      {
        file,
        id: String(uuidv4()),
        name: file.name,
        readableSize: String(
          filesize(file.size, {
            base: 2,
            standard: 'jedec',
          }),
        ),
        preview: URL.createObjectURL(file),
        progress: 0,
        uploaded: false,
        error: false,
        url: URL.createObjectURL(file),
      },
      ...uploadedFiles,
    ])
  }

  function updateFile(id: string, data: any) {
    setUploadedFiles(
      uploadedFiles.map((uploadedFile) => {
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile
      }),
    )
  }

  async function processUpload({ uploadedFile, carId }: IPropsFileSave) {
    try {
      const data = new FormData()

      data.append('file', uploadedFile.file, uploadedFile.name)
      data.append('carId', carId)

      const res = await api.patch('cars/photos', data, {
        onUploadProgress: (e) => {
          const progress =
            e.total && parseInt(String(Math.round((e.loaded * 100) / e.total)))
          updateFile(uploadedFile.id, {
            progress,
          })
        },
      })

      updateFile(uploadedFile.id, {
        uploaded: true,
        id: res.data.id,
        url: res.data.photo_url,
      })
    } catch (error) {
      updateFile(uploadedFile.id, {
        error: true,
      })
    }
  }

  function handleDelete(id: string) {
    setUploadedFiles(() => {
      return uploadedFiles.filter((file) => file.id !== id)
    })
  }

  const onSubmit = async ({ carId }: IOnSubmitProps) => {
    try {
      if (uploadedFiles.length < 1) {
        Toast({
          message:
            'Atenção, não foi selecionado nenhuma imagem!, tente novamente, 😭!',
          type: 'warning',
        })
        return
      }

      await createImageMutateAsync({ carId })

      Toast({
        message: 'imagem (ns) cadastrada (s) com sucesso, 🙌!',
        type: 'success',
      })

      toggleEdit()
    } catch (err) {
      Toast({
        message: 'Erro ao tentar cadastrar a imagem, tente novamente, 😭!',
        type: 'error',
      })
    }
  }
  return {
    isEditing,
    toggleEdit,
    onSubmit,
    uploadedFiles,
    handleUpload,
    handleDelete,
  }
}
