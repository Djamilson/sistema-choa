'use client'

import { IAggregationProductDetailEcommerce } from '@/@model/product/product'
import { ContainerModal } from '@/components/ContainerModal'
import { DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useRef } from 'react'

type IConfirmationAddAggregationProductForCartModalProps = {
  isOpen: boolean
  onClose: () => void
  handleNavAddSelectedGuarantee?: () => Promise<void>
  selectedAggregationProduct: IAggregationProductDetailEcommerce
}

const ConfirmationAddAggregationProductForCartModal = ({
  isOpen,
  onClose,
  handleNavAddSelectedGuarantee,
  selectedAggregationProduct,
}: IConfirmationAddAggregationProductForCartModalProps) => {
  const cancelButtonRef = useRef(null)

  const bodyContent = (
    <div className="flex w-full">
      <div className={'flex w-full flex-col '}>
        <div className="flex-1 text-sm font-medium text-gray-500">
          <p className="line-clamp-2 leading-tight">
            {selectedAggregationProduct?.product?.subcategory.name}
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          {selectedAggregationProduct?.color_product?.color !== 'DEFAULT' && (
            <div className="flex items-center justify-between gap-x-4 border-b">
              <span>cor:</span>

              <div
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor:
                    selectedAggregationProduct?.color_product?.color,
                  display: 'inline-block',
                }}
              ></div>
            </div>
          )}
          {selectedAggregationProduct?.size_product?.description !==
            'DEFAULT' && (
            <div className="flex items-center justify-between gap-x-4 border-b">
              <span>tamanho:</span>
              <span>
                {selectedAggregationProduct?.size_product?.description}
              </span>
            </div>
          )}
          {selectedAggregationProduct?.voltage_product?.voltage !==
            'DEFAULT' && (
            <div className="flex items-center justify-between gap-x-4 border-b">
              <span>voltagem:</span>
              <span>
                {selectedAggregationProduct?.voltage_product?.voltage}
              </span>
            </div>
          )}
        </div>

        <p className="mt-10 text-sm text-gray-500">Deseja continuar?</p>
      </div>
    </div>
  )

  return (
    <ContainerModal isOpen={isOpen} onClose={onClose}>
      <div className="flex h-full flex-col bg-white shadow-xl">
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <ExclamationTriangleIcon
                className="h-6 w-6 text-accent"
                aria-hidden="true"
              />
            </div>
            <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
              <DialogTitle
                as="h3"
                className="text-base font-semibold leading-6 text-gray-900"
              >
                O produto escolhido
              </DialogTitle>
              <div className="mt-6 w-full">{bodyContent}</div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            className="inline-flex w-full justify-center bg-accent px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent sm:ml-3 sm:w-auto"
            onClick={() => {
              handleNavAddSelectedGuarantee && handleNavAddSelectedGuarantee()
              onClose()
            }}
          >
            sim, continuar
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={() => onClose()}
            ref={cancelButtonRef}
          >
            não, alterar
          </button>
        </div>
      </div>
    </ContainerModal>
  )
}

export default ConfirmationAddAggregationProductForCartModal
