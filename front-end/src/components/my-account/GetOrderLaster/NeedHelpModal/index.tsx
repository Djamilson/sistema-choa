import { ContainerModal } from '@/components/ContainerModal'
import { Hr } from '@/components/Hr'
import { Button } from '@/components/buttons/Button'
import { DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Accordion } from '../../Accordion'

type IEditNeedHelpModalPropsModal = {
  isOpen: boolean
  onClose: () => void
  title: string
}
export default function NeedHelpModal({
  isOpen,
  onClose,
  title,
}: IEditNeedHelpModalPropsModal) {
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
            <div className="flex flex-col ">
              <div className="flex-[1] flex-col gap-8 bg-white px-6">
                <h3 className="text-md font-semibold">
                  como a gente pode te ajudar?
                </h3>

                <div className="mt-6 text-sm text-gray-400">
                  <Accordion.Root>
                    <Accordion.Content
                      contentButton={
                        <Accordion.Title>
                          <h2 className="text-sm font-medium leading-7 text-gray-900">
                            como rastreio a entrega?
                          </h2>
                        </Accordion.Title>
                      }
                      accordionContentBefore={
                        <Accordion.Container>
                          <>
                            <h3 className="my-4 ml-2 font-medium">
                              Pra saber do andamento da sua entrega, você pode
                              acessar ...
                            </h3>
                          </>
                        </Accordion.Container>
                      }
                      accordionContentAfter={
                        <Accordion.Container>
                          <div className="flex gap-3 py-5 md:gap-5">
                            <div className="flex flex-col justify-between gap-2 md:flex-row">
                              <div className="flex flex-col items-end">
                                <p className="md:text-md text-sm font-normal text-gray-500 dark:text-gray-400">
                                  {`Pra saber do andamento da
                                                    sua entrega, você pode
                                                    acessar Meus Pedidos, clicar
                                                    no pedido e, então, em
                                                    acompanhar envio. Acompanhe
                                                    seu e-mail cadastrado,
                                                    porque a gente envia
                                                    mensagens por lá a cada
                                                    atualização no pedido ;)`}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Accordion.Container>
                      }
                    />
                  </Accordion.Root>
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
