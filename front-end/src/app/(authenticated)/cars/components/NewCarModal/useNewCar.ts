'use client'

import { api } from '@/_services/apiClient'
import { Toast } from '@/components/Toast'
import { getQueryClient } from '@/tanStackQuery/getQueryClient'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { filesize } from 'filesize'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { validationSchema } from '../schema'
import { FormInput } from '../types'

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

type IUpDateProps = {
  Car: FormData
  CarId: string
}

type IPropsFileSave = {
  uploadedFile: IFileProps
  CarId: string
}

type IUseCarProps = {
  onCloseModal: () => void
}

const queryClient = getQueryClient()

export const useNewCar = ({ onCloseModal }: IUseCarProps) => {
  const [uploadedFile, setUploadedFile] = useState<IFileProps>({} as IFileProps)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormInput>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: '',
    },
  })

  const { mutateAsync: createCarMutateAsync } = useMutation({
    mutationFn: async (Car: FormInput) => {
      const { name } = Car

      const { data } = await api.post(`Cars/new`, {
        name,
      })
      /* setMyCars((oldData) => {
        const { Cars: oldCars, info } = oldData

        return {
          Cars: [...oldCars, data],
          info,
        }
      }) */

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['hydrate-Cars'],
      })
    },
  })

  const { mutateAsync: upDateCarMutateAsync } = useMutation({
    mutationFn: async ({ Car, CarId }: IUpDateProps) => {
      const res = await api.patch(`Cars/${CarId}/logo`, Car, {
        onUploadProgress: (e) => {
          const progress =
            e.total && parseInt(String(Math.round((e.loaded * 100) / e.total)))

          setUploadedFile((old) => {
            return {
              ...old,
              progress: Number(progress),
            }
          })
        },
      })

      setUploadedFile((old) => {
        return {
          ...old,
          uploaded: true,
          id: res.data.id,
          url: res.data.photo_url,
        }
      })

      /* setMyCars((oldData) => {
        const { Cars: oldCars, info } = oldData

        return {
          Cars:
            oldCars?.map((item) => {
              if (item.id === CarId) {
                return res.data
              }
              return item
            }) || [],
          info,
        }
      }) */
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['hydrate-Cars'],
      })
    },
  })

  function handleUpload(file: File) {
    setUploadedFile({
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
    })
  }

  async function processUpload({ uploadedFile, CarId }: IPropsFileSave) {
    try {
      const data = new FormData()

      data.append('file', uploadedFile.file, uploadedFile.name)
      data.append('CarId', CarId)

      await upDateCarMutateAsync({ Car: data, CarId })
    } catch (error) {
      setUploadedFile((old) => {
        return { ...old, error: true }
      })
    }
  }

  function handleDelete() {
    setUploadedFile({} as IFileProps)
  }

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      const newCar = await createCarMutateAsync(data)

      uploadedFile &&
        uploadedFile?.preview &&
        (await processUpload({
          uploadedFile,
          CarId: newCar.id,
        }))

      Toast({
        message: 'marca cadastrado com sucesso, 🙌!',
        type: 'success',
      })
      reset()
      setUploadedFile({} as IFileProps)
      onCloseModal()
    } catch (err) {
      Toast({
        message: 'Erro ao tentar cadastrar a marca, tente novamente, 😭!',
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
    handleDelete,
    handleUpload,
    uploadedFile,
  }
}
