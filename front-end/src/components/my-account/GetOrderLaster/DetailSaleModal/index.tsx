import { ContainerModal } from '@/components/ContainerModal'
import { Hr } from '@/components/Hr'
import { Button } from '@/components/buttons/Button'
import { DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

type IEditDetailSaleModalPropsModal = {
  isOpen: boolean
  onClose: () => void
  title: string
}
export default function DetailSaleModal({
  isOpen,
  onClose,
  title,
}: IEditDetailSaleModalPropsModal) {
  return (
    <ContainerModal isOpen={isOpen} onClose={onClose}>
      <div className="flex h-full flex-col bg-white shadow-xl">
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="flex items-start justify-between">
            <DialogTitle className="text-sm font-medium text-gray-600">
              {title}
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
          <Hr className="my-2" />
          <div className="mb-10">
            <div className="flex flex-col ">
              <div className="flex-[1] flex-col gap-4 bg-white px-6">
                <div className="text-sm font-semibold">pagamento</div>

                <div className="flex items-center justify-between text-gray-400">
                  <span className="text-sm ">visa</span>
                  <span className="text-sm ">421844####4402</span>
                </div>

                <div className="flex items-center justify-between text-gray-400">
                  <span className="text-sm ">em</span>
                  <span className="text-sm ">R$ 128,62 em 1x</span>
                </div>
              </div>
              <Hr className="my-2" />
              <div className="flex-[1] gap-2 bg-white px-6">
                <div className="text-sm font-semibold">total pago</div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-600">frete</span>
                  <span className="text-sm text-green-600">gratis</span>
                </div>
                <div className="flex items-center justify-between text-gray-400">
                  <span className="text-sm">subtotal</span>
                  <span className="text-sm">R$ 456,44</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm ">desconto</span>
                  <span className="text-sm">R$ 5,60</span>
                </div>

                <Hr className="my-2" />

                <div className="mb-4 flex justify-between">
                  <div className="text-sm font-medium  text-black md:text-sm">
                    total
                  </div>
                  <div className="text-sm font-medium  text-black md:text-sm">
                    R$ 50.600,34
                  </div>
                </div>
              </div>
              <Hr className="my-2" />
              <div className="flex-[1] gap-2 bg-white px-6">
                <div className="text-sm font-semibold">
                  informações do comprador
                </div>

                <h3 className="mb-4 text-sm font-medium text-gray-400">
                  Djamilson Alves da Costa
                </h3>

                <div className="text-sm">
                  <div className="mb-2 flex justify-between">
                    <div className="text-md font-medium  text-black md:text-sm">
                      endereço
                    </div>
                  </div>

                  <p>
                    Quadra ARSO 101 Alameda 28, 13 - QI-17 al 28 LT 13 lado sul
                  </p>
                  <p>quadra/divisa com AV LO 25 Q 1003 sul 13 - Palmas, TO</p>
                  <p>CEP: 77018452</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center gap-4 border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="mt-6 max-w-md flex-[1]">
            <Button
              disabled={false}
              isLoading={false}
              type="button"
              onClick={() => onClose()}
              className="border-green bg-green-600 text-white"
            >
              fechar
            </Button>
          </div>
        </div>
      </div>
    </ContainerModal>
  )
}
