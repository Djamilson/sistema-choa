import { IReceiverDBProps } from '@/app/(authenticated)/payments/components/MainPayment/usePayments'
import NewReceiverModal from '@/app/(authenticated)/payments/components/Payment/components/receiver/NewReceiverModal'
import { EditCpfReceiverForm } from '@/app/(authenticated)/payments/components/Payment/components/receiver/SearchReceiverByUserIdModal/components/EditCpfReceiverForm'
import { EditEmailReceiverForm } from '@/app/(authenticated)/payments/components/Payment/components/receiver/SearchReceiverByUserIdModal/components/EditEmailReceiverForm'
import { EditNameReceiverForm } from '@/app/(authenticated)/payments/components/Payment/components/receiver/SearchReceiverByUserIdModal/components/EditNameReceiverForm'
import { EditPhoneReceiverForm } from '@/app/(authenticated)/payments/components/Payment/components/receiver/SearchReceiverByUserIdModal/components/EditPhoneReceiverForm'
import { ItemReceiver } from '@/app/(authenticated)/payments/components/Payment/components/receiver/SearchReceiverByUserIdModal/components/ItemReceiver'
import SearchButton from '@/app/(authenticated)/payments/components/Payment/components/receiver/SearchReceiverByUserIdModal/components/SearchButton'
import { IconBadge } from '@/components/IconBadge'
import * as masks from '@/components/inputs/masks'
import DialogModal from '@/components/modals/DialogModal'
import { Accordion } from '@/components/my-account/Accordion'
import { ButtonDetailProduct } from '@/components/product-detail/ButtonDetailProduct'
import cn from '@/utils/cn'
import { User } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { BsPlus } from 'react-icons/bs'
import ReceiverButtons from '../../../info-collaborator/components/ReceiverButtons'
import useListReceiver from './useListReceiver'

type IListReceiversProps = {
  userId: string
  selectedReceiver: IReceiverDBProps
  setSelectedReceiver: Dispatch<SetStateAction<IReceiverDBProps>>
  handleSelectedReceiver: (receiver: IReceiverDBProps) => void
}

const ListReceivers = ({
  userId,
  selectedReceiver,
  handleSelectedReceiver,
}: IListReceiversProps) => {
  const {
    search,
    setSearch,
    filteredReceivers,
    onSubmitReceiverMain,
    handleReceiverDelete,
    openDialogModalDelete,
    handleOnCloseDialogModalDelete,
    isLoadingDelete,
    setSelectedReceiverId,
    selectedReceiverIdDelete,

    isOpenNewReceiverModal,
    closeNewReceiverModal,
    openNewReceiverModal,
  } = useListReceiver({ userId })

  return (
    <>
      <div className={`mb-8 flex items-baseline justify-between`}>
        <div className="flex items-center gap-x-2">
          <IconBadge icon={User} />
          <div>
            <h3
              className={`font-normal text-gray-800 group-hover:text-gray-600 dark:text-white`}
            >
              Meus recebedores
            </h3>

            <h2 className="mr-4 text-ellipsis text-sm font-normal text-neutral-400">
              Total {filteredReceivers?.length || 0}
            </h2>
          </div>
        </div>
        <div className="flex items-center justify-end space-x-6">
          <NewReceiverModal
            isOpen={isOpenNewReceiverModal}
            onClose={closeNewReceiverModal}
            activeRouter={false}
          />
          <ButtonDetailProduct icon={BsPlus} onClick={openNewReceiverModal}>
            novo recebedor
          </ButtonDetailProduct>
        </div>
      </div>
      <div className="mt-6 w-full border-t pt-4">
        <SearchButton
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />

        {selectedReceiverIdDelete.length > 0 && (
          <DialogModal
            onClose={handleOnCloseDialogModalDelete}
            open={openDialogModalDelete}
            handler={() => handleReceiverDelete(selectedReceiverIdDelete)}
            isLoading={isLoadingDelete}
            title={`Atenção!`}
            message={`Tem certeza que deseja deletar o recebedor?`}
            titleButtonConfirmation={`sim`}
            titleButtonOnClose={`não`}
          />
        )}

        <div className="flex flex-col gap-y-6">
          {filteredReceivers &&
            filteredReceivers?.map((receiver) => {
              return (
                <Accordion.Root
                  key={receiver.id}
                  className={cn(
                    `group flex border-0 border-s-4 hover:border-success hover:bg-green-50 dark:bg-red-800/30`,
                    receiver.main && 'border-accent bg-red-50',
                  )}
                >
                  <Accordion.Content
                    className={
                      'w-full border border-gray-200 pt-0 shadow-md dark:border-gray-700 dark:bg-gray-800'
                    }
                    contentButton={
                      <Accordion.Title>
                        <h2 className="text-sm font-medium leading-7 text-gray-900">
                          {receiver.name}
                        </h2>
                      </Accordion.Title>
                    }
                    accordionContentAfter={
                      <Accordion.Container>
                        <ItemReceiver
                          className={cn(
                            `group flex border-0 shadow-none hover:border-success hover:bg-green-50`,
                            selectedReceiver?.id === receiver.id
                              ? 'border-accent bg-red-50'
                              : '',
                          )}
                        >
                          <>
                            <ReceiverButtons
                              handleSelectedReceiver={handleSelectedReceiver}
                              receiver={receiver}
                              selectedReceiverId={selectedReceiver?.id}
                              toggleFavorite={onSubmitReceiverMain}
                              handleSelectedReceiverIdDelete={
                                setSelectedReceiverId
                              }
                            />

                            <EditNameReceiverForm
                              receiverId={receiver.id}
                              receiverName={receiver.name}
                            />
                            <EditCpfReceiverForm
                              receiverId={receiver.id}
                              receiverCpf={masks.cpfOrCnpjMask.maskDefault(
                                receiver.cpf,
                              )}
                            />
                            <EditEmailReceiverForm
                              receiverId={receiver.id}
                              receiverEmail={receiver.email}
                            />

                            <EditPhoneReceiverForm
                              receiverId={receiver.id}
                              receiverPhone={masks.phoneMask.maskDefault(
                                receiver.phone,
                              )}
                            />
                          </>
                        </ItemReceiver>
                      </Accordion.Container>
                    }
                    accordionContentBefore={
                      <Accordion.Container>
                        <ReceiverButtons
                          handleSelectedReceiver={handleSelectedReceiver}
                          receiver={receiver}
                          selectedReceiverId={selectedReceiver?.id}
                          toggleFavorite={onSubmitReceiverMain}
                          handleSelectedReceiverIdDelete={setSelectedReceiverId}
                        />
                      </Accordion.Container>
                    }
                  />
                </Accordion.Root>
              )
            })}
        </div>
      </div>
    </>
  )
}
export default ListReceivers
