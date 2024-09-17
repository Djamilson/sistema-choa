'use client'

import { SearchAddressComponent } from '@/components/SearchAddressComponent'
import { Button } from '@/components/buttons/Button'
import { InputFloat } from '@/components/inputs/InputFloat'
import { useLocalizationStore } from '@/contexts/useLocalizationStore'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'
import { useEditAddress } from './useEditAddress'

type IEditAddressPropsModal = {
  isOpen: boolean
  onClose: () => void
  selectedAddressIdEdit: string
}
export default function EditAddressModal({
  isOpen,
  onClose,
  selectedAddressIdEdit,
}: IEditAddressPropsModal) {
  const {
    errors,
    register,
    handleSubmit,
    onSubmit,
    setSearchAddress,
    searchAddress,
    address,
  } = useEditAddress({ onCloseModal: onClose, selectedAddressIdEdit })

  const {
    state: { location },
    actions: { clearLocalization },
  } = useLocalizationStore()

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => onClose()}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-lg">
                  <div className="flex h-full flex-col bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <DialogTitle className="text-lg font-medium text-gray-600">
                          editando endereço
                        </DialogTitle>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => onClose()}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mb-10 mt-6">
                        <div className="flow-root">
                          <form
                            className="space-y-8 border-t py-8"
                            onSubmit={handleSubmit(onSubmit)}
                            id="formEditAddress"
                          >
                            <div className="w-full border-b">
                              <h3 className="text-lg font-medium text-gray-600">
                                busca endereço
                              </h3>
                              <div className="group mt-6 flex flex-row gap-2 pb-4 text-right text-sm font-normal text-neutral-500">
                                <SearchAddressComponent
                                  setSearchAddress={setSearchAddress}
                                  searchAddress={searchAddress}
                                  initialValue={address?.zipCodeFormat}
                                />

                                {location && (
                                  <div className="flex items-center text-center">
                                    <button
                                      onClick={() => clearLocalization()}
                                      className="items-center whitespace-nowrap text-right hover:text-accent hover:underline hover:decoration-accent"
                                    >
                                      limpar endereço
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>

                            <InputFloat.Root
                              name="street"
                              label="endereço"
                              disabled={true}
                              register={register}
                              errors={errors}
                              required
                            />

                            <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
                              <InputFloat.Root
                                name="number"
                                label="número/casa"
                                disabled={false}
                                register={register}
                                errors={errors}
                                required
                                type="number"
                              />

                              <InputFloat.Root
                                name="complement"
                                label="complemento"
                                disabled={false}
                                register={register}
                                errors={errors}
                                required
                              />
                            </div>

                            <InputFloat.Root
                              name="neighborhood"
                              label="bairro"
                              disabled={false}
                              register={register}
                              errors={errors}
                              required
                            />
                            <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
                              <InputFloat.Root
                                name="city"
                                label="cidade"
                                disabled={true}
                                register={register}
                                errors={errors}
                                required
                              />

                              <InputFloat.Root
                                name="state"
                                label="estado"
                                disabled={true}
                                register={register}
                                errors={errors}
                                required
                              />
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row items-center gap-4 border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="mt-6 flex max-w-md flex-[1]">
                        <Button
                          disabled={false}
                          isLoading={false}
                          type="button"
                          onClick={() => onClose()}
                        >
                          cancelar
                        </Button>
                      </div>
                      <div className="mt-6 max-w-md flex-[1]">
                        <Button
                          disabled={false}
                          isLoading={false}
                          type="submit"
                          form="formEditAddress"
                          className="border-green bg-green-600 text-white"
                        >
                          editar
                        </Button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
