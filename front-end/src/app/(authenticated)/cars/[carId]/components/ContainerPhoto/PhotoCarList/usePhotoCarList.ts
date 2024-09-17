import { IPhoto } from '@/@model/photo/photo'
import { api } from '@/_services/apiClient'
import { Toast } from '@/components/Toast'
import { getQueryClient } from '@/tanStackQuery/getQueryClient'
import { DropResult } from '@hello-pangea/dnd'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
const queryClient = getQueryClient()

type IUpdateData = {
  imageId: string
  position: number
}

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

  const { isPending: isUpdating, mutateAsync: onReorderMutateAsync } =
    useMutation({
      mutationFn: async (updateData: IUpdateData[]) => {
        try {
          const { data } = await api.put(
            `aggregations/cars/photos/${carId}/reorder`,
            {
              list: updateData,
            },
          )
          console.log('Salvou: updateData', updateData)
          console.log('Salvou:', data)

          /* setInitialCar((old) => {
            return {
              ...old,
              aggregationCars: old?.aggregationCars?.map((item) => {
                if (item.id === carId) {
                  setImages(data.photos)
                  return serializabledFormatedAggregationCar(data)
                }
                return item
              }),
            }
          }) */

          Toast({
            message: `Imagens reordenada com sucesso!`,
            type: 'success',
          })

          router.refresh()
          return data
        } catch (erro) {
          console.log('erro::::', erro)
          Toast({
            message: `Error ao tentar reordenar as imagens, tente novamente!`,
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

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = (images?.length && Array.from(images)) || []
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    const startIndex = Math.min(result.source.index, result.destination.index)
    const endIndex = Math.max(result.source.index, result.destination.index)

    const updatedImage = items.slice(startIndex, endIndex + 1)

    setImages(items)

    const bulkUpdateData: IUpdateData[] = updatedImage.map((image) => ({
      imageId: image.id,
      position: items.findIndex((item) => item.id === image.id),
    }))
    console.log('bulkUpdateData', bulkUpdateData)
    onReorderMutateAsync(bulkUpdateData)
  }

  const { isPending: isLoadingDelete, mutateAsync: deleteMutateAsync } =
    useMutation({
      mutationFn: async (image: IPhoto) => {
        try {
          const { data } = await api.delete(
            `aggregations/cars/photos/${image.id}`,
          )

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
    onDragEnd,
    images,
    isLoading,
    setLoading,
    selectImageDelete,
    openDialogModalDelete,
    handleOnCloseDialogModalDelete,
    deleteImage,
    isLoadingDelete,
    setSelectImageDelete,
    isUpdating,
  }
}
