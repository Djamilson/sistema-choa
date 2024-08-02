'use client'

import { Button } from '@/components/buttons/Button'
import { ButtonIsStyle } from '@/components/buttons/ButtonIsStyle'
import ContainerButton from '@/components/ContainerButton'
import { FileUpload } from '@/components/FileUpload'
import { InputFloat } from '@/components/inputs/InputFloat'
import { DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { X } from 'lucide-react'
import Image from 'next/image'
import { ContainerModal } from '../../../../../components/ContainerModal'
import { useNewCar } from './useNewCar'

export const accept = {
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg'],
}

type INewBrandPropsModal = {
  isOpen: boolean
  onClose: () => void
}
export default function NewBrandModal({
  isOpen,
  onClose,
}: INewBrandPropsModal) {
  const {
    errors,
    register,
    handleSubmit,
    onSubmit,
    isSubmitting,
    handleDelete,
    handleUpload,
    uploadedFile,
  } = useNewCar({
    onCloseModal: onClose,
  })

  return (
    <ContainerModal isOpen={isOpen} onClose={() => onClose()}>
      <div className="flex h-full flex-col bg-white shadow-xl">
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="flex items-start justify-between">
            <DialogTitle className="text-lg font-medium text-gray-600">
              Cadastra nova marca
            </DialogTitle>
            <div className="ml-0 flex h-6 w-10 items-center">
              <ButtonIsStyle
                type="button"
                className="-m-2 h-6 w-full p-2 text-gray-400 hover:text-gray-500"
                onClick={() => onClose()}
              >
                <span className="sr-only">Close panel</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </ButtonIsStyle>
            </div>
          </div>

          <div className="mb-10 mt-6">
            <div className="flow-root">
              <form
                className="space-y-10 border-t py-8"
                onSubmit={handleSubmit(onSubmit)}
                id="formNewBrand"
              >
                <InputFloat.Root
                  name="name"
                  label="nome da marca"
                  disabled={isSubmitting}
                  register={register}
                  errors={errors}
                  autoComplete="off"
                  required
                />
                <div className="mb-2">
                  {!uploadedFile?.preview ? (
                    <div className="flex h-60 items-center justify-center  bg-slate-200">
                      <FileUpload accept={accept} handleUpload={handleUpload} />
                    </div>
                  ) : (
                    <div className="relative mt-2 aspect-video items-start overflow-hidden  bg-white shadow-lg transition-shadow duration-300 ease-in-out hover:transform">
                      <Image
                        width={500}
                        height={500}
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 30vw, 13vw"
                        src={uploadedFile.preview}
                        alt="Upload"
                        className={
                          'mt-4 inline-block scale-100  object-cover ring-2 ring-white blur-0 grayscale-0 transition duration-700 ease-in-out group-hover:scale-110 group-hover:opacity-75'
                        }
                      />

                      <ButtonIsStyle
                        className="group absolute right-2.5 top-2 -translate-y-1/4 translate-x-1/2 transform"
                        onClick={handleDelete}
                      >
                        <div className="flex h-5 w-5 items-center justify-center rounded-3xl border border-solid border-white/70 bg-accent transition-all duration-300 hover:h-6 hover:w-6">
                          <X className="text-white/70" width={16} height={16} />
                        </div>
                      </ButtonIsStyle>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <ContainerButton>
            <>
              <Button
                disabled={false}
                isLoading={false}
                onClick={() => onClose()}
                className={`whitespace-nowrap text-accent hover:text-white`}
              >
                cancelar
              </Button>
              <Button
                disabled={false}
                isLoading={false}
                type="submit"
                form="formNewBrand"
                className={`focus:shadow-outline relative w-full whitespace-nowrap border border-success text-sm font-medium text-success shadow-sm ring-0 transition-all duration-150 hover:border-gray-200 hover:bg-success-hover hover:text-white hover:opacity-80 hover:ring-2 hover:ring-green-500 hover:ring-offset-1 hover:ring-offset-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 md:mt-0 md:px-16 md:ring-offset-green-500`}
              >
                salvar
              </Button>
            </>
          </ContainerButton>
        </div>
      </div>
    </ContainerModal>
  )
}
