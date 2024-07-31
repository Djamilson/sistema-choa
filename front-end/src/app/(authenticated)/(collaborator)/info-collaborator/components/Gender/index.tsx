'use client'

import DialogModal from '@/components/modals/DialogModal'
import { ButtonDetailProduct } from '@/components/product-detail/ButtonDetailProduct'
import useGetUserBySession from '@/hooks/auth/useGetUserBySession'
import cn from '@/utils/cn'
import { Square, SquareCheckBig } from 'lucide-react'
import { useGender } from './useGender'

function Gender() {
  const {
    handleUpdateGender,
    setSelectedGender,
    isPending,
    selectedGender,
    handleOnCloseDialogModal,
    openDialogModal,
  } = useGender()

  const user = useGetUserBySession()

  return (
    <div className="flex w-full flex-col gap-2">
      <DialogModal
        onClose={handleOnCloseDialogModal}
        open={openDialogModal}
        handler={() => handleUpdateGender(selectedGender)}
        isLoading={isPending}
        title={`Atenção!`}
        message={`Deseja alterar o gênero?`}
        titleButtonConfirmation={`sim`}
        titleButtonOnClose={`não`}
      >
        <div className="my-6 flex w-full items-baseline justify-between">
          <p className="text-sm text-gray-500">
            O gênero vair ser alterado para!
          </p>

          <span className="ml-4 text-sm font-medium text-gray-500">
            {selectedGender === 'MALE' && `Masculino`}
            {selectedGender === 'FEMALE' && `Feminio`}
            {selectedGender === 'OTHER' && `Não definir`}
          </span>
        </div>
      </DialogModal>

      <fieldset>
        <legend className="text-sm font-semibold leading-6 text-gray-900">
          Gênero
        </legend>
        <p className="text-sm leading-6 text-gray-500">
          {`pra gente te conhecer um pouquinho melhor :)`}
        </p>

        <div className="my-6 flex w-full items-baseline justify-between">
          <ButtonDetailProduct
            disabled={false}
            icon={user?.person?.gender === 'MALE' ? SquareCheckBig : Square}
            onClick={() => setSelectedGender('MALE')}
            className={cn(
              `text-sm`,
              user?.person?.gender === 'MALE' && `text-green-600`,
            )}
          >
            masculino
          </ButtonDetailProduct>

          <ButtonDetailProduct
            disabled={false}
            icon={user?.person?.gender === 'FEMALE' ? SquareCheckBig : Square}
            onClick={() => setSelectedGender('FEMALE')}
            className={cn(
              `text-sm`,
              user?.person?.gender === 'FEMALE' && `text-green-600`,
            )}
          >
            feminino
          </ButtonDetailProduct>
          <ButtonDetailProduct
            disabled={false}
            icon={user?.person?.gender === 'OTHER' ? SquareCheckBig : Square}
            onClick={() => setSelectedGender('OTHER')}
            className={cn(
              `text-sm`,
              user?.person?.gender === 'OTHER' && `text-green-600`,
            )}
          >
            não informar
          </ButtonDetailProduct>
        </div>
      </fieldset>
    </div>
  )
}

export default Gender
