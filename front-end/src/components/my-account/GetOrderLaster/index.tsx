'use client'

import { MessageComponent } from '@/components/MessageComponent'
import { LoadingPulseLoader } from '@/components/loadings/LoadingPulseLoader'
import { useLastOrderByUserId } from '@/hooks/Entity/useOrders'
import { ArrowLeftRight, MapPinIcon, MessagesSquareIcon } from 'lucide-react'
import { useState } from 'react'
import { Accordion } from '../Accordion'
import { AccordionContentAfter } from './AccordionContentAfter'
import { AccordionContentBefore } from './AccordionContentBefore'
import DetailSaleModal from './DetailSaleModal'
import ExchangeOrReturnModal from './ExchangeOrReturnModal'
import NeedHelpModal from './NeedHelpModal'
import TrackShippingModal from './TrackShippingModal'

const object = {
  id: 'ea585eeb-4801-45a2-a583-a3042431a3ad',
  quantity: 1,
  subtotal: '1768.88',
  payment_collaborator: 'null',
  created_at: '2022-12-10T13:20:26.731Z',
  orderPlacedHour: 'tes',
  confirmationPayment: 'pago',
  status: 'string',
  status_format: 'string',

  price: {
    id: '318141f0-5ffc-4387-9584-c0983b5ea19f',
    price: 2988.33,
    price_promotion: 1768.88,
    price_format: 'R$ 1768.88',
    price_promotion_format: 'R$ 1768.88',
  },

  aggregation_product: {
    id: '1139959b-6cc4-41e2-8aaa-fdfe90afb3c2',
    active_frontend: true,
    canceled_at: 'null',
    publisher: true,
    created_at: '2022-12-10T13:20:26.731Z',
    updated_at: '2022-12-10T13:20:26.731Z',
    type_aggregation_product_id: 'eiud',
    aggregation_product_id: 'eiud',
    divided_into: 12,
    voltage_aggregation_product_id: 'eiud',
    price_id: 'eiud',
    dimension_id: 'dfd',
    color_aggregation_product_id: 'dfd',
    size_aggregation_product_id: 'dfd',
    reviewValue: 232,
    totalReview: 12,
    total_in_stock: 23,
    size_product: {
      id: '1bbe7208-e01a-48e1-8d61-4ef83878995d',
      description: 'DEFAULT',
      acronym: 'DEFAULT',
    },
    type_product: {
      acronym: 'SC',
      description: 'SACO',
      id: 'aa9f307c-9324-4b24-8260-9bddf28b1aa1',
    },
    dimension: {
      id: '79f30236-7a33-4672-88bf-58db690035c7',
      height: '123cm',
      length: '40cm',
      weight: '12kg',
      width: '23cm',
    },
    color_product: {
      id: '922e10f6-1045-4a7b-bbb2-56a899260ea7',
      color: 'DEFAULT',
    },
    photos: [
      {
        id: 'a24400a9-2fbb-4777-8500-40667d1d88b5',
        name: '05b99475-cb5b-4bcc-9089-d844728f2c13-mais-vendido.jpg',
        aggregation_product_id: 'udd',
        photo_url: '/images/placeholder.jpg',
        color_product: {
          id: '922e10f6-1045-4a7b-bbb2-56a899260ea7',
          created_at: '2022-12-10T13:20:26.731Z',
          updated_at: '2022-12-10T13:20:26.731Z',
          color: 'DEFAULT',
        },
      },
      {
        id: '421a40aa-6081-4936-8e3d-487fd8702508',
        name: '8c05063e-b10b-4127-8d2c-8ef3978452f4-mais-vendido.jpg',
        aggregation_product_id: 'udde',
        photo_url: '/images/placeholder.jpg',
        color_product: {
          id: '922e10f6-1045-4a7b-bbb2-56a899260ea7',
          created_at: '2022-12-10T13:20:26.731Z',
          updated_at: '2022-12-10T13:20:26.731Z',
          color: 'DEFAULT',
        },
      },
      {
        id: '322e0ef7-288a-4369-8e6a-c55ddf3686f3',
        name: '222385a0-a3a6-440d-926f-2d152b287220-whatsapp-image-2022-11-30-at-180329.jpeg',
        aggregation_product_id: 'udder',
        photo_url: '/images/placeholder.jpg',
        color_product: {
          id: '922e10f6-1045-4a7b-bbb2-56a899260ea7',
          created_at: '2022-12-10T13:20:26.731Z',
          updated_at: '2022-12-10T13:20:26.731Z',
          color: 'DEFAULT',
        },
      },
    ],
    price: {
      id: '318141f0-5ffc-4387-9584-c0983b5e9fsd',
      price: 2988.33,
      price_promotion: 1768.88,
      price_format: 'R$ 1768.88',
      price_promotion_format: 'R$ 1768.88',
    },
    product: {
      id: '66866fee-3b53-484d-9d84-8b5a073d0847',
      description:
        'Resolução HD Qualidade de imagem em alta definição Entre na era digital com os detalhes e cores mais vivas da qualidade HD.',
      bar_code: '7687gg',
      sku: '887umhj',
      thumbnail: '61e33fb4-c129-45bb-96ab-8e7d6d104fc7-notebook.png',
      brand: {
        id: '6955e70b-4d39-4cac-99f6-c039d91eb4e6',
        name: 'DEFAULT',
        logo: null,
      },
      product_info: {
        id: 'c15b0cd7-bfc1-4de5-a568-964c13308f4d',
        link: 'https://www.americanas.com.br/produto/4199005924?pfm_index=NaN&pfm_page=search&pfm_pos=grid&pfm_type=search_page&offerId=61851d47d9fd6edeecea72c1&cor=PRATA&voltagem=BIVOLT',
        freight: '0.01',
        company: 'Americas',
        price: '9999.99',
        price_promotion: '9999.99',
        currency: 'real',
      },
      subcategory: {
        id: 'b04b3e2f-1f18-4dad-9084-3e44eabd292a',
        name: 'Notebook Lenovo Ideapad 3i Intel Celeron-N4020 4GB 128GB SSD Tela 15,6" Windows 11 - Prata',
      },
    },
  },
}

function GetOrderLaster() {
  const {
    data: lastOrder,
    isLoading: isLoadingLastOrder,
    isFetching: isFetchingLastOrder,
  } = useLastOrderByUserId()

  const [isOpenDetailModalOrder, setIsOpenDetailModalOrder] = useState(false)
  const [isOpenTrackShippingModal, setIsOpenTrackShippingModal] =
    useState(false)
  const [isOpenExchangeOrReturnModal, setIsOpenExchangeOrReturnModal] =
    useState(false)
  const [isOpenNeedHelpModal, setIsOpenNeedHelpModal] = useState(false)

  function openDetailModalOrder() {
    setIsOpenDetailModalOrder(true)
  }

  function openExchangeOrReturnModal() {
    setIsOpenExchangeOrReturnModal(true)
  }

  function openTrackShippingModal() {
    setIsOpenTrackShippingModal(true)
  }

  function closeTrackShippingModal() {
    setIsOpenTrackShippingModal(false)
  }
  function closeExchangeOrReturnModal() {
    setIsOpenExchangeOrReturnModal(false)
  }

  function closeDetailModalOrder() {
    setIsOpenDetailModalOrder(false)
  }

  function openNeedHelpModal() {
    setIsOpenNeedHelpModal(true)
  }

  function closeNeedHelpModal() {
    setIsOpenNeedHelpModal(false)
  }

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

      <Accordion.Root>
        <Accordion.Content
          contentButton={
            <Accordion.Title>
              <h2 className="text-sm font-medium leading-7 text-gray-900">
                oooba, pedido entregue
              </h2>
              <h2 className="text-sm font-medium italic leading-7 text-gray-900">
                entregue dia 20/nov
              </h2>
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
                    <label htmlFor="detailId" className="text-sm text-gray-500">
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
      {isLoadingLastOrder && isFetchingLastOrder && <LoadingPulseLoader />}
      {lastOrder !== null &&
      lastOrder?.orders_on_products &&
      lastOrder?.orders_on_products?.length > 0 ? (
        lastOrder?.orders_on_products.map((orderProduct) => {
          return (
            <Accordion.Root key={orderProduct.id}>
              <Accordion.Content
                contentButton={
                  <Accordion.Title>
                    <h2 className="text-sm font-medium leading-7 text-gray-900">
                      oooba, pedido entregue
                    </h2>
                    <h2 className="text-sm font-medium italic leading-7 text-gray-900">
                      entregue dia 20/nov
                    </h2>
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
    </>
  )
}

export { GetOrderLaster }
