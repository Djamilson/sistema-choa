'use client'

import DialogModal from '@/components/modals/DialogModal'
import { ButtonDetailProduct } from '@/components/product-detail/ButtonDetailProduct'
import useGetUserBySession from '@/hooks/auth/useGetUserBySession'
import cn from '@/utils/cn'
import { Square, SquareCheckBig } from 'lucide-react'
import { usePromotionalEmail } from './usePromotionalEmail'

function PromotionalEmail() {
  const user = useGetUserBySession()

  const {
    isChecked,
    isOpenModalTransitionIsActiveOrIsDesactive,
    closeModalTransitionIsActiveOrIsDesactive,
    handleIsActiveOrIsDesactive,
    setSelectedIsActiveOrIsDesactive,
  } = usePromotionalEmail()

  return (
    <div className="flex w-full flex-col gap-2">
      <DialogModal
        onClose={() => closeModalTransitionIsActiveOrIsDesactive()}
        open={isOpenModalTransitionIsActiveOrIsDesactive}
        isLoading={false}
        handler={handleIsActiveOrIsDesactive}
        title={`Atenção!`}
        message={`Email promocional`}
        titleButtonConfirmation={`sim`}
        titleButtonOnClose={`não`}
      >
        <>
          {user?.person?.promotional_email && (
            <p className="text-sm text-gray-500">
              Você esta cancelando o envio de email promocional?
            </p>
          )}

          {!user?.person?.promotional_email && (
            <p className="text-sm text-gray-500">
              Você está autorizando o envio de email promocioais?
            </p>
          )}
        </>
      </DialogModal>

      <h2 className="text-sm font-medium leading-7 text-gray-900">
        Email promocional
      </h2>
      <div className="mt-4">
        <ButtonDetailProduct
          disabled={false}
          icon={isChecked ? SquareCheckBig : Square}
          onClick={() => setSelectedIsActiveOrIsDesactive(user?.id || '')}
          className={cn(`text-sm`, isChecked && `text-green-600`)}
        >
          deseja receber e-mails promocionais
        </ButtonDetailProduct>
      </div>
    </div>
  )
}

export default PromotionalEmail
