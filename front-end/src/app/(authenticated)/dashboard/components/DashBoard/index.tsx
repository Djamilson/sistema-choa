'use client'

import useLoadingOnClickButtonModal from '@/components/loadings/LoadingOnClickButtonModal/useLoadingOnClickButtonModal'
import { useEffect } from 'react'

const DashBoard = () => {
  const { onClose: onCloseLoadingOnClickButtonModal } =
    useLoadingOnClickButtonModal()

  useEffect(() => {
    onCloseLoadingOnClickButtonModal()
  }, [onCloseLoadingOnClickButtonModal])

  return (
    <div className="gap-22 flex-[4] bg-white px-2 py-4 md:px-8 md:pb-12 md:pt-4">
      <div className="flex flex-col justify-between gap-6 text-base font-medium text-gray-900">
        <div className="flex w-full flex-col">
          <p>últimos pedidos</p>
          <p className="mt-0.5 text-sm text-gray-500">
            aqui tá seu pedido mais recente, acompanhe todos pelo menu lateral
            meus pedidos
          </p>
        </div>

        <div className="flex w-full flex-col">
          <h3>dados da conta</h3>
        </div>
      </div>
    </div>
  )
}

export default DashBoard
