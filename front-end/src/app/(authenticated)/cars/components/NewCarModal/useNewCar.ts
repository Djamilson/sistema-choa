'use client'

import IListCars from '@/@model/car'
import { api } from '@/_services/apiClient'
import useLoadingOnClickButtonModal from '@/components/loadings/LoadingOnClickButtonModal/useLoadingOnClickButtonModal'
import { Toast } from '@/components/Toast'
import { getQueryClient } from '@/tanStackQuery/getQueryClient'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { filesize } from 'filesize'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { validationSchema } from './schema'
import { FormInput } from './types'

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

type IUseNewCarProps = {
  onCloseModal: () => void
  page?: number
}

type IPropsFileSave = {
  uploadedFile: IFileProps
  carId: string
}

const queryClient = getQueryClient()

export const useNewCar = ({ onCloseModal, page = 1 }: IUseNewCarProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<IFileProps[]>(
    [] as IFileProps[],
  )

  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormInput>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: '',
      acronym: '',
      brand: '',
      description: '',
      fuel_type: '',
      plate: '',
    },
  })

  function handleCloseModalForm() {
    onCloseModal()

    setUploadedFiles([] as IFileProps[])
    reset()
  }

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

  function handleDelete(id: string) {
    setUploadedFiles(() => {
      return uploadedFiles.filter((file) => file.id !== id)
    })
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
      console.log('uploadedFile, carId', uploadedFile, carId)

      const data = new FormData()

      data.append('file', uploadedFile.file, uploadedFile.name)
      data.append('carId', carId)

      const res = await api.patch(`cars/photos`, data, {
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
      console.log('error photos:', error)
      updateFile(uploadedFile.id, {
        error: true,
      })
    }
  }

  const { mutateAsync: createCarMutateAsync } = useMutation({
    mutationFn: async ({
      name,
      acronym,
      brand,
      description,
      fuel_type,
      plate,
    }: FormInput) => {
      const { data } = await api.post('cars/new', {
        name,
        acronym,
        brand,
        description,
        fuel_type,
        plate,
      })

      const promises = uploadedFiles?.map(async (file) => {
        return processUpload({
          uploadedFile: file,
          carId: data.id,
        })
      })

      await Promise.all(promises)

      return data
    },
    onSuccess: (data) => {
      console.log('datadata:::', data)

      queryClient.setQueryData(
        ['hydrate-cars-page', { page: `${page}-` }],
        (oldData: IListCars) => {
          console.log('atualizando:::', oldData)
          const { cars, info } = oldData

          return { cars: [data, ...cars], info }
        },
      )
    },
  })

  const {
    onOpen: onOpenLoadingOnClickButtonModal,
    onClose: onCloseLoadingOnClickButtonModal,
  } = useLoadingOnClickButtonModal()

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      onOpenLoadingOnClickButtonModal()

      await createCarMutateAsync(data)

      Toast({
        message: 'viatura cadastrada com sucesso, 🙌!',
        type: 'success',
      })

      handleCloseModalForm()
      onCloseLoadingOnClickButtonModal()
    } catch (err: any) {
      let message = 'Erro ao tentar cadastrar a viatura, tente novamente, 😭!'

      if (err?.response?.data?.statusCode === 401) {
        message =
          'já existe uma viatura cadastrada com esse nome, tente novamente!'
      }

      Toast({
        message,
        type: 'error',
      })
    }
  }

  return {
    errors,
    register,
    handleSubmit,
    onSubmit,
    isSubmitting,
    isValid,
    clearErrors,

    uploadedFiles,
    handleDelete,
    handleUpload,

    handleCloseModalForm,
  }
}
