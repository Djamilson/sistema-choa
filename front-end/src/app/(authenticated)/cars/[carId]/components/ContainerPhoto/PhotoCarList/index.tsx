'use client'

import { IPhoto } from '@/@model/photo/photo'
import DialogModal from '@/components/modals/DialogModal'
import cn from '@/utils/cn'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { Loader2, Trash } from 'lucide-react'
import Image from 'next/image'
import { usePhotoCarList } from './usePhotoCarList'

export type IPhotoCarListProps = {
  initialPhotos?: IPhoto[]
  carId: string
}

export const PhotoCarList = ({ initialPhotos, carId }: IPhotoCarListProps) => {
  const {
    isMounted,
    onDragEnd,
    images,
    isLoading,
    setLoading,
    selectImageDelete,
    setSelectImageDelete,
    openDialogModalDelete,
    handleOnCloseDialogModalDelete,
    deleteImage,
    isLoadingDelete,
    isUpdating,
  } = usePhotoCarList({
    initialPhotos,
    carId,
  })

  if (!isMounted) {
    return null
  }

  return (
    <>
      {selectImageDelete && selectImageDelete?.id && (
        <DialogModal
          onClose={() => handleOnCloseDialogModalDelete()}
          open={openDialogModalDelete}
          handler={() => deleteImage()}
          isLoading={isLoadingDelete}
          title={`Atenção!`}
          message={`Tem certeza que deseja deletar a imagem? Após essa ação essa imagem não estará na galeria de fotos todos dos produtos!`}
          titleButtonConfirmation={`sim deletar`}
          titleButtonOnClose={`não deletar`}
        />
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="images">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {isUpdating && (
                <div className="mb-4 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-accent" />
                </div>
              )}

              {images?.map((image, index) => (
                <Draggable key={image.id} draggableId={image.id} index={index}>
                  {(provided) => (
                    <div
                      className={cn(
                        'group mb-4 flex items-center gap-x-2 border border-slate-200 bg-slate-200 text-sm text-slate-700',
                        !!image?.id && 'border-sky-200 bg-sky-100 text-sky-700',
                      )}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div className="group relative mb-2 ml-6 mt-2 flex aspect-video h-40 overflow-hidden bg-white p-2 shadow-lg transition-shadow duration-300 ease-in-out hover:transform">
                        <Image
                          width={500}
                          height={40}
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 30vw, 13vw"
                          src={image.photo_url || '/images/placeholder.jpg'}
                          alt="Upload"
                          className={cn(
                            'inline-block object-cover ring-2 ring-white transition duration-700 ease-in-out group-hover:scale-110 group-hover:opacity-75',
                            isLoading
                              ? 'scale-110 blur-2xl grayscale'
                              : 'scale-100 blur-0 grayscale-0',
                          )}
                          onLoad={() => setLoading(false)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#e838cc] to-[#4a22bd] opacity-0 transition-all duration-700 group-hover:opacity-30"></div>
                      </div>

                      <div className="ml-auto flex items-center gap-x-2 pr-2">
                        <Trash
                          onClick={() => setSelectImageDelete(image)}
                          className="h-5 w-5 cursor-pointer transition hover:opacity-75"
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}
