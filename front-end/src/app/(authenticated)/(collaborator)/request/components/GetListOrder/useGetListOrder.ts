'use client'

import useLoadingOnClickButtonModal from '@/components/loadings/LoadingOnClickButtonModal/useLoadingOnClickButtonModal'
import useGetUserBySession from '@/hooks/auth/useGetUserBySession'

import { useEffect, useState } from 'react'

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
    type_product_id: 'eiud',
    product_id: 'eiud',
    divided_into: 12,
    voltage_product_id: 'eiud',
    price_id: 'eiud',
    dimension_id: 'dfd',
    color_product_id: 'dfd',
    size_product_id: 'dfd',
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
        product_id: 'udd',
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
        product_id: 'udde',
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
        product_id: 'udder',
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

const useGetListOrder = () => {
  const INITIAL_PAGE = 1
  const INITIAL_LIMIT = 3

  const [isOpenDetailModalOrder, setIsOpenDetailModalOrder] = useState(false)
  const [isOpenTrackShippingModal, setIsOpenTrackShippingModal] =
    useState(false)
  const [isOpenExchangeOrReturnModal, setIsOpenExchangeOrReturnModal] =
    useState(false)
  const [isOpenNeedHelpModal, setIsOpenNeedHelpModal] = useState(false)

  const [page, setPage] = useState(INITIAL_PAGE)
  const user = useGetUserBySession()

  const { onClose: onCloseLoadingOnClickButtonModal } =
    useLoadingOnClickButtonModal()

  useEffect(() => {
    onCloseLoadingOnClickButtonModal()
  }, [onCloseLoadingOnClickButtonModal])

  const {
    data: infoOrders,
    isLoading: isLoadingOrders,
    isFetching: isFetchingOrders,
  } = useAllOrderByUserId(page, INITIAL_LIMIT, user.id || '')

  const openDetailModalOrder = () => {
    setIsOpenDetailModalOrder(true)
  }

  const openExchangeOrReturnModal = () => {
    setIsOpenExchangeOrReturnModal(true)
  }

  function openTrackShippingModal() {
    setIsOpenTrackShippingModal(true)
  }

  const closeTrackShippingModal = () => {
    setIsOpenTrackShippingModal(false)
  }
  const closeExchangeOrReturnModal = () => {
    setIsOpenExchangeOrReturnModal(false)
  }

  const closeDetailModalOrder = () => {
    setIsOpenDetailModalOrder(false)
  }

  const openNeedHelpModal = () => {
    setIsOpenNeedHelpModal(true)
  }

  const closeNeedHelpModal = () => {
    setIsOpenNeedHelpModal(false)
  }

  const addPage = () => setPage((old) => old + 1)
  const [filteredOrders, setFilteredOrders] = useState<IOrder[]>([] as IOrder[])

  useEffect(() => {
    if (infoOrders && infoOrders?.orders?.length > 0) {
      setFilteredOrders((old) => {
        const newOrders = infoOrders?.orders.filter((newItem) => {
          return old.every((existingItem) => existingItem.id !== newItem.id)
        })
        return [...old, ...newOrders]
      })
    }
  }, [infoOrders])

  return {
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
    object,
    addPage,
    page,

    infoOrders,
    isLoadingOrders,
    isFetchingOrders,
    filteredOrders,
  }
}

export default useGetListOrder
