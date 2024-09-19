import { IPhoto } from '@/@model/photo/photo'
import { api } from '@/_services/apiClient'
import { Toast } from '@/components/Toast'
import { getQueryClient } from '@/tanStackQuery/getQueryClient'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
const queryClient = getQueryClient()

export type IUsePhotoCarListProps = {
  initialPhotos?: IPhoto[]
  carId: string
}

export const usePhotoCarList = ({
  initialPhotos,
  carId,
}: IUsePhotoCarListProps) => {
  const router = useRouter()

  const [isMounted, setIsMounted] = useState(false)
  const [images, setImages] = useState(initialPhotos)
  const [openDialogModalDelete, setOpenDialogModalDelete] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [selectImageDelete, setSelectImageDelete] = useState<IPhoto>(
    {} as IPhoto,
  )

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    setImages(initialPhotos)
  }, [initialPhotos])

  const { isPending: isLoadingDelete, mutateAsync: deleteMutateAsync } =
    useMutation({
      mutationFn: async (image: IPhoto) => {
        try {
          const { data } = await api.delete(`cars/photos/${image.id}`)

          setImages((oldData) =>
            oldData?.filter((item) => item.id !== image.id),
          )

          return data
        } catch {
          Toast({
            message: `Error ao tentar deletar a imagem, tente novamente!`,
            type: 'error',
          })
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['hydrate-car-id', carId],
        })
        queryClient.invalidateQueries({ queryKey: ['hydrate-cars'] })
      },
    })

  async function deleteImage() {
    try {
      if (!selectImageDelete?.id) {
        Toast({
          message:
            'Ocorreu uma falha ao tentar deletar a imagem, tente novamente!',
          type: 'error',
        })
        return
      }

      await deleteMutateAsync(selectImageDelete)

      Toast({
        message: `Image deletada com sucesso!`,
        type: 'success',
      })

      setSelectImageDelete({} as IPhoto)

      router.refresh()
    } catch (err) {
      Toast({
        message: 'Ocorreu uma falha ao tentar deletar, tente novamente!',
        type: 'error',
      })
    }
  }

  function handleOnCloseDialogModalDelete() {
    setOpenDialogModalDelete(false)
    setSelectImageDelete({} as IPhoto)
  }

  function handleOnOpenDialogModalDelete() {
    setOpenDialogModalDelete(true)
  }

  useEffect(() => {
    if (selectImageDelete && selectImageDelete.id) {
      handleOnOpenDialogModalDelete()
    }
  }, [selectImageDelete])

  return {
    isMounted,
    images,
    isLoading,
    setLoading,
    selectImageDelete,
    openDialogModalDelete,
    handleOnCloseDialogModalDelete,
    deleteImage,
    isLoadingDelete,
    setSelectImageDelete,
  }
}
