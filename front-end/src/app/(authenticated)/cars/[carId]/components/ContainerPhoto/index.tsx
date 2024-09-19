'use client'

import { ICar } from '@/@model/car'
import ContainerButton from '@/components/ContainerButton'
import { FileUpload } from '@/components/FileUpload'
import { Button } from '@/components/buttons/Button'
import { ImageIcon, ImagePlus, X } from 'lucide-react'
import { FileList } from './FileList'
import { PhotoCarList } from './PhotoCarList'
import { useContainerPhoto } from './useContainerPhoto'

interface IContainerPhotoProps {
  initialCar?: ICar
}

const accept = {
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg'],
}

export const ContainerPhoto = ({ initialCar }: IContainerPhotoProps) => {
  const {
    isEditing,
    toggleEdit,
    onSubmit,
    uploadedFiles,
    handleUpload,
    handleDelete,
  } = useContainerPhoto()

  return (
    <div className="mt-6 gap-y-4 border-t bg-white p-4">
      <div className="mb-4 flex items-center justify-between font-medium">
        Fotos do viatura
        <div className="max-w-md">
          <Button
            onClick={toggleEdit}
            className={`h-8 border-none shadow-none`}
          >
            {isEditing && (
              <div className={`flex w-full`}>
                <X className="mr-2 h-4 w-4" />
                Cancelar
              </div>
            )}

            {!isEditing && (
              <div className={`flex w-full`}>
                <ImagePlus className="mr-2 flex h-4 w-4" />
                Adicionar foto
              </div>
            )}
          </Button>
        </div>
      </div>

      {!isEditing && initialCar?.photos && initialCar?.photos?.length < 1 && (
        <div className="flex h-60 items-center justify-center  bg-slate-200">
          <ImageIcon className="h-10 w-10 text-slate-500" />
        </div>
      )}

      {isEditing && initialCar?.id && (
        <div className="mb-2">
          <div className="flex h-full flex-col bg-white shadow-xl">
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              <div className="flow-root">
                <div className="space-y-10 border-t py-8">
                  <div className="mb-2">
                    <FileUpload accept={accept} handleUpload={handleUpload} />
                  </div>

                  {!!uploadedFiles.length && (
                    <FileList files={uploadedFiles} onDelete={handleDelete} />
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <ContainerButton>
                <>
                  <Button
                    disabled={false}
                    isLoading={false}
                    onClick={toggleEdit}
                    className={`whitespace-nowrap text-accent hover:text-white`}
                  >
                    cancelar
                  </Button>
                  <Button
                    disabled={false}
                    isLoading={false}
                    type="button"
                    onClick={() =>
                      onSubmit({
                        carId: initialCar?.id,
                      })
                    }
                    className={`focus:shadow-outline relative w-full whitespace-nowrap border border-success text-sm font-medium text-success shadow-sm ring-0 transition-all duration-150 hover:border-gray-200 hover:bg-success-hover hover:text-white hover:opacity-80 hover:ring-2 hover:ring-green-500 hover:ring-offset-1 hover:ring-offset-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 md:mt-0 md:px-16 md:ring-offset-green-500`}
                  >
                    salvar
                  </Button>
                </>
              </ContainerButton>
            </div>
          </div>
        </div>
      )}
      {!isEditing &&
        initialCar?.id &&
        initialCar?.photos &&
        initialCar?.photos?.length > 0 && (
          <div className={`mt-4`}>
            <PhotoCarList
              carId={initialCar.id}
              initialPhotos={initialCar?.photos}
            />
          </div>
        )}
    </div>
  )
}
