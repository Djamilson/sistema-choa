'use client'

import ContainerButton from '@/components/ContainerButton'
import { IconBadge } from '@/components/IconBadge'
import { Button } from '@/components/buttons/Button'
import { ButtonIsStyle } from '@/components/buttons/ButtonIsStyle'
import { InputFloat } from '@/components/inputs/InputFloat'
import { TextAreaFloat } from '@/components/inputs/TextAreaFloat'
import { DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Car, ImageIcon, PackagePlus } from 'lucide-react'
import { ContainerModal } from '../../../../../components/ContainerModal'
import { FileList } from '../FileList'
import { FileUpload } from '../FileUpload'
import { useNewCar } from './useNewCar'

const accept = {
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg'],
}

type INewCarPropsModal = {
  isOpen: boolean
  onClose: () => void
}
export default function NewCarModal({ isOpen, onClose }: INewCarPropsModal) {
  const {
    errors,
    register,
    handleSubmit,
    onSubmit,
    isSubmitting,
    uploadedFiles,
    handleDelete,
    handleUpload,

    handleCloseModalForm,
  } = useNewCar({
    onCloseModal: onClose,
  })

  return (
    <ContainerModal
      isOpen={isOpen}
      onClose={() => handleCloseModalForm()}
      className="max-w-xl"
    >
      <div className="flex h-full flex-col bg-white shadow-xl">
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-6 sm:px-6">
          <div className="flex items-start justify-between">
            <DialogTitle className="text-lg font-medium text-gray-600">
              Cadastra nova viatura
            </DialogTitle>
            <div className="ml-0 flex h-6 w-10 items-center">
              <ButtonIsStyle
                type="button"
                className="-m-2 h-6 w-full p-2 text-gray-400 hover:text-gray-500"
                onClick={() => handleCloseModalForm()}
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
                id="formNewCar"
              >
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={Car} />
                  <h2 className="text-lg">Dados da viatura</h2>
                </div>

                <InputFloat.Root
                  name="name"
                  label="nome da viatura"
                  disabled={isSubmitting}
                  register={register}
                  errors={errors}
                  autoComplete="off"
                  required
                  errorTop={false}
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
                  <InputFloat.Root
                    name="acronym"
                    label="prefixo"
                    disabled={isSubmitting}
                    register={register}
                    errors={errors}
                    autoComplete="off"
                    required
                    errorTop={false}
                  />

                  <InputFloat.Root
                    name="brand"
                    label="marca"
                    disabled={isSubmitting}
                    register={register}
                    errors={errors}
                    autoComplete="off"
                    required={false}
                    errorTop={false}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
                  <InputFloat.Root
                    name="plate"
                    label="placa"
                    disabled={isSubmitting}
                    register={register}
                    errors={errors}
                    autoComplete="off"
                    required
                    errorTop={false}
                  />

                  <InputFloat.Root
                    name="fuel_type"
                    label="tipo de cobustível"
                    disabled={isSubmitting}
                    register={register}
                    errors={errors}
                    autoComplete="off"
                    required={false}
                    errorTop={false}
                  />
                </div>

                <div className="flex items-center gap-x-2">
                  <IconBadge icon={PackagePlus} />
                  <h2 className="text-lg">Outras informações</h2>
                </div>

                <TextAreaFloat.Root
                  name="description"
                  label="descreva todas outras informações"
                  disabled={isSubmitting}
                  register={register}
                  errors={errors}
                  autoComplete="off"
                  required
                  rows={5}
                />

                <div className="flex items-center gap-x-2">
                  <IconBadge icon={ImageIcon} />
                  <h2 className="text-lg">Imagens da viatura</h2>
                </div>
                <div className="mb-2">
                  <FileUpload accept={accept} handleUpload={handleUpload} />
                </div>

                {!!uploadedFiles.length && (
                  <FileList files={uploadedFiles} onDelete={handleDelete} />
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <ContainerButton>
            <>
              <Button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleCloseModalForm()}
                className={`whitespace-nowrap text-accent hover:text-white`}
              >
                cancelar
              </Button>
              <Button
                disabled={isSubmitting}
                isLoading={isSubmitting}
                type="submit"
                form="formNewCar"
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
