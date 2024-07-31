import { ContainerModal } from '@/components/ContainerModal'
import { Hr } from '@/components/Hr'
import { Button } from '@/components/buttons/Button'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { CheckCheckIcon, ThumbsUpIcon, TruckIcon } from 'lucide-react'
import { ShippingChart } from './components/ShippingChart'
import { DialogTitle } from '@headlessui/react'

type ITrackShippingModalPropsModal = {
  isOpen: boolean
  onClose: () => void
  title: string
}
export default function TrackShippingModal({
  isOpen,
  onClose,
  title,
}: ITrackShippingModalPropsModal) {
  return (
    <ContainerModal
      isOpen={isOpen}
      onClose={onClose}
      className="pointer-events-auto w-screen max-w-lg"
    >
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
            <div className="flex flex-col gap-6">
              <div className="flex-[1] flex-col gap-4 bg-white px-6">
                <div className="text-sm font-semibold">
                  como a gente pode te ajudar? Use o campo de busca ou escolha
                  uma categoria
                </div>

                <ShippingChart.Root>
                  <ShippingChart.Content>
                    <ShippingChart.DateHour>
                      <span>20/11/2020</span>
                      <span>07:03</span>
                    </ShippingChart.DateHour>
                    <ShippingChart.Icon icon={CheckCheckIcon}>
                      <ShippingChart.VerticalLine />
                    </ShippingChart.Icon>
                    <ShippingChart.Label label={`seu pedido foi enviado`} />
                  </ShippingChart.Content>
                  <ShippingChart.Content>
                    <ShippingChart.DateHour>
                      <span>23/12/2020</span>
                      <span>07:03</span>
                    </ShippingChart.DateHour>
                    <ShippingChart.Icon icon={CheckCheckIcon}>
                      <ShippingChart.VerticalLine />
                    </ShippingChart.Icon>
                    <ShippingChart.Label label={`seu pedido foi enviado`} />
                  </ShippingChart.Content>
                  <ShippingChart.Content>
                    <ShippingChart.DateHour>
                      <span>23/12/2020</span>
                      <span>07:03</span>
                    </ShippingChart.DateHour>
                    <ShippingChart.Icon icon={TruckIcon}>
                      <ShippingChart.VerticalLine />
                    </ShippingChart.Icon>
                    <ShippingChart.Label label={`em transito para sua casa`} />
                  </ShippingChart.Content>

                  <ShippingChart.Content>
                    <ShippingChart.DateHour>
                      <span>23/12/2020</span>
                      <span>07:03</span>
                    </ShippingChart.DateHour>
                    <ShippingChart.Icon
                      icon={ThumbsUpIcon}
                      className="h-6 w-6 text-green-600"
                    />
                    <ShippingChart.Label label={`oooba! pedido entregue`} />
                  </ShippingChart.Content>
                </ShippingChart.Root>
              </div>
              <Hr className="my-2" />
              <div className="flex-[1] gap-2 bg-white px-6">
                <div className="text-sm font-semibold">rastreamento</div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-600">transportadora</span>
                  <span className="text-sm text-green-600">Direct</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-600">código</span>
                  <span className="text-sm text-green-600">OL438040813BR</span>
                </div>

                <div className="flex items-center justify-center">
                  <div className="mt-6 max-w-md flex-[1]">
                    <Button
                      disabled={false}
                      isLoading={false}
                      type="button"
                      onClick={() => onClose()}
                      className="border-green bg-green-600 text-white"
                    >
                      rastrear entrega
                    </Button>
                  </div>
                </div>
              </div>
              <Hr className="my-2" />
              <div className="flex-[1] gap-2 bg-white px-6">
                <div className="text-sm font-semibold">dados para entrega</div>

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
            >
              fechar
            </Button>
          </div>
        </div>
      </div>
    </ContainerModal>
  )
}
