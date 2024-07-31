// 'use client'

import { MessageComponent } from '@/components/MessageComponent'
import { Button } from '@/components/buttons/Button'
import { LoadingPulseLoader } from '@/components/loadings/LoadingPulseLoader'
import { ArrowLeftRight, MapPinIcon, MessagesSquareIcon } from 'lucide-react'
import { Accordion } from '../../../../../../components/my-account/Accordion'
import { AccordionContentAfter } from '../../../../../../components/my-account/GetOrderLaster/AccordionContentAfter'
import { AccordionContentBefore } from '../../../../../../components/my-account/GetOrderLaster/AccordionContentBefore'
import DetailSaleModal from '../../../../../../components/my-account/GetOrderLaster/DetailSaleModal'
import ExchangeOrReturnModal from '../../../../../../components/my-account/GetOrderLaster/ExchangeOrReturnModal'
import NeedHelpModal from '../../../../../../components/my-account/GetOrderLaster/NeedHelpModal'
import TrackShippingModal from '../../../../../../components/my-account/GetOrderLaster/TrackShippingModal'
import useGetListOrder from './useGetListOrder'

function GetListOrder() {
  const {
    openNeedHelpModal,
    openTrackShippingModal,
    closeNeedHelpModal,
    closeDetailModalOrder,
    closeTrackShippingModal,
    closeExchangeOrReturnModal,
    openExchangeOrReturnModal,
    openDetailModalOrder,
    isOpenDetailModalOrder,
    isOpenTrackShippingModal,
    isOpenExchangeOrReturnModal,
    isOpenNeedHelpModal,
    page,
    object,
    infoOrders,
    isLoadingOrders,
    isFetchingOrders,
    addPage,
    filteredOrders,
  } = useGetListOrder()

  return (
    <>
      <ExchangeOrReturnModal
        isOpen={isOpenExchangeOrReturnModal}
        onClose={closeExchangeOrReturnModal}
        title="troca ou devolução do pedido 02-784846424"
      />
      <TrackShippingModal
        isOpen={isOpenTrackShippingModal}
        onClose={closeTrackShippingModal}
        title="acompanhar o envio do pedido 02-784846424"
      />

      <NeedHelpModal
        isOpen={isOpenNeedHelpModal}
        onClose={closeNeedHelpModal}
        title="preciso de ajuda"
      />

      <DetailSaleModal
        isOpen={isOpenDetailModalOrder}
        onClose={closeDetailModalOrder}
        title="detalhes do pedido 02-784846424"
      />
      <h2>{page}</h2>
      {isLoadingOrders && isFetchingOrders && <LoadingPulseLoader />}
      {filteredOrders && filteredOrders?.length > 0 ? (
        filteredOrders?.map((orderProduct) => {
          return (
            <Accordion.Root key={orderProduct.id}>
              <Accordion.Content
                contentButton={
                  <Accordion.Title>
                    <>
                      <h2 className="text-sm font-medium leading-7 text-gray-900">
                        oooba, pedido entregue
                      </h2>
                      <h2 className="text-sm font-medium italic leading-7 text-gray-900">
                        entregue dia 20/nov
                      </h2>
                    </>
                  </Accordion.Title>
                }
                accordionContentBefore={
                  <Accordion.Container>
                    <AccordionContentBefore lastOrder={object} />
                  </Accordion.Container>
                }
                accordionContentAfter={
                  <Accordion.Container>
                    <AccordionContentAfter lastOrder={object}>
                      <div className="flex flex-col gap-4 border-b py-5 md:gap-8">
                        <div className="flex w-full items-center justify-around gap-4">
                          <Accordion.Button
                            className="flex flex-row items-center gap-2 px-4 py-6"
                            onClick={() => openExchangeOrReturnModal()}
                          >
                            <ArrowLeftRight size={18} />
                            <span>troca ou devolver</span>
                          </Accordion.Button>
                          <Accordion.Button
                            className="flex flex-row items-center gap-2 px-4 py-6"
                            onClick={() => {
                              openTrackShippingModal()
                            }}
                          >
                            <MapPinIcon size={18} />
                            <span>acompanhar o envio</span>
                          </Accordion.Button>
                          <Accordion.Button
                            className="flex flex-row items-center gap-2 px-4 py-6"
                            onClick={() => {
                              openNeedHelpModal()
                            }}
                          >
                            <MessagesSquareIcon size={18} />
                            <span>preciso de ajuda</span>
                          </Accordion.Button>
                        </div>

                        <div className="flex w-full flex-col items-start justify-start gap-3">
                          <label
                            htmlFor="detailId"
                            className="text-sm text-gray-500"
                          >
                            quer vê o detalhe do pedido?
                          </label>
                          <div className="flex max-w-xs items-center ">
                            <Accordion.Button
                              id={`detailId`}
                              className="flex cursor-pointer flex-row items-center justify-center gap-2 px-4 py-6 pl-2 font-semibold underline"
                              onClick={() => {
                                openDetailModalOrder()
                              }}
                            >
                              <span>detalhe do pedido</span>
                            </Accordion.Button>
                          </div>
                        </div>
                      </div>
                    </AccordionContentAfter>
                  </Accordion.Container>
                }
              />
            </Accordion.Root>
          )
        })
      ) : (
        <MessageComponent
          title="Ooops! não conseguimos encontra nenhum pedido!"
          message="Tente fazer uma compra! :)"
        />
      )}

      {infoOrders &&
        infoOrders?.orders?.length > 0 &&
        page < infoOrders?.info?.pages && (
          <div className="my-6 flex w-full items-center justify-center">
            <div className="group col-span-1 ">
              <div className="flex w-full flex-col">
                <Button
                  disabled={isLoadingOrders}
                  isLoading={isLoadingOrders}
                  type="button"
                  onClick={addPage}
                >
                  {`ver mais compras`}
                </Button>
              </div>
            </div>
          </div>
        )}
    </>
  )
}

export { GetListOrder }
