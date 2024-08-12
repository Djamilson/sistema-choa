import HeartButton from '@/app/(authenticated)/payments/components/Payment/components/HeartButton'
import { EditAddressReceiverForm } from '@/app/(authenticated)/payments/components/Payment/components/address/EditAddressReceiverForm'
import ItemAddress from '@/app/(authenticated)/payments/components/Payment/components/address/ItemAddress'
import { ItemAddressReceiverContainer } from '@/app/(authenticated)/payments/components/Payment/components/address/ItemAddressReceiverContainer'
import NewAddressReceiverModal from '@/app/(authenticated)/payments/components/Payment/components/address/NewAddressReceiverModal'
import { MessageComponent } from '@/components/MessageComponent'
import DialogModal from '@/components/modals/DialogModal'
import { ButtonDetailProduct } from '@/components/product-detail/ButtonDetailProduct'
import cn from '@/utils/cn'
import { Lightbulb, MapPin } from 'lucide-react'
import { AiFillDelete, AiOutlineDelete } from 'react-icons/ai'
import { BsPlus } from 'react-icons/bs'
import useListReceiverAddresses from './useListReceiverAddresses'
import { IconBadge } from '@/components/IconBadge'

type IListReceiverAddressesProps = {
  receiverId: string
  nameReceiver: string
}

const ListReceiverAddresses = ({
  receiverId,
  nameReceiver,
}: IListReceiverAddressesProps) => {
  const {
    addresses,
    isOpenNewAddressReceiverModal,
    closeNewAddressReceiverModal,
    setIsOpenNewAddressReceiverModal,
    selectedAddressIdDelete,
    handleOnCloseDialogModalDelete,
    openDialogModalDelete,
    handleAddressDelete,
    isLoadingDelete,
    setSelectedAddressId,
    onSubmitAddressFavorite,
  } = useListReceiverAddresses({ receiverId })

  return (
    <>
      <div className={`mb-8 flex items-baseline justify-between`}>
        <div className="flex items-center gap-x-2">
          <IconBadge icon={MapPin} />
          <div>
            <h3
              className={`font-normal text-gray-800 group-hover:text-gray-600 dark:text-white`}
            >
              Endereço(s)
            </h3>

            <h2 className="mr-4 text-ellipsis text-base font-normal text-neutral-400">
              {nameReceiver && nameReceiver}
            </h2>
          </div>
        </div>
        <div className="flex items-center justify-end space-x-6">
          {receiverId && (
            <>
              <NewAddressReceiverModal
                isOpen={isOpenNewAddressReceiverModal}
                onClose={closeNewAddressReceiverModal}
                receiverId={receiverId}
              />
              <ButtonDetailProduct
                icon={BsPlus}
                onClick={() => setIsOpenNewAddressReceiverModal(true)}
              >
                novo endereço
              </ButtonDetailProduct>
            </>
          )}
        </div>
      </div>

      {!receiverId && (
        <div
          className={cn(
            `blue-500 group mt-4 flex w-full border-s-4 bg-blue-50 p-2 dark:bg-red-800/30`,
            'blue-accent bg-red-50',
          )}
          role="alert"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span
                className={`inline-flex size-8 items-center justify-center rounded-full border-4 bg-blue-200 text-red-800 group-hover:border-blue-100 dark:border-red-900 dark:bg-red-800 dark:text-red-400`}
              >
                <Lightbulb />
              </span>
            </div>
            <div className="ms-3">
              {!receiverId && (
                <h3
                  className={`font-normal text-gray-800 group-hover:text-gray-600 dark:text-white`}
                >
                  selecione o recebedor
                </h3>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 border-t p-4">
        <div className="flex flex-col gap-y-4">
          {selectedAddressIdDelete.length > 0 && (
            <DialogModal
              onClose={handleOnCloseDialogModalDelete}
              open={openDialogModalDelete}
              handler={() => handleAddressDelete(selectedAddressIdDelete)}
              isLoading={isLoadingDelete}
              title={`Atenção!`}
              message={`Tem certeza que deseja deletar o endereço?`}
              titleButtonConfirmation={`sim`}
              titleButtonOnClose={`não`}
            />
          )}

          {addresses && addresses.length < 1 && (
            <MessageComponent
              title="Ooops! você ainda não cadastrou um endereço válido!"
              message="antes de continuar, cadastre um endereço!"
            />
          )}
          {addresses && addresses.length < 1 && receiverId && (
            <ButtonDetailProduct
              icon={BsPlus}
              onClick={() => setIsOpenNewAddressReceiverModal(true)}
            >
              novo endereço
            </ButtonDetailProduct>
          )}

          {addresses &&
            addresses?.map((itemAddress) => {
              return (
                <ItemAddressReceiverContainer
                  key={itemAddress.id}
                  className={cn(
                    `group flex border-0 border-s-4 hover:border-success hover:bg-green-50 dark:bg-red-800/30`,
                    itemAddress.main && 'border-accent bg-red-50',
                  )}
                >
                  <>
                    <div className="my-5 flex w-full items-baseline justify-between">
                      <div className="flex w-full justify-end space-x-4">
                        <HeartButton
                          hasFavorited={itemAddress.main}
                          toggleFavorite={() =>
                            onSubmitAddressFavorite({
                              addressId: itemAddress.id,
                              receiverId,
                            })
                          }
                          valueId={itemAddress.id}
                        />
                        <div
                          onClick={() => setSelectedAddressId(itemAddress.id)}
                          className="relative cursor-pointer transition  hover:opacity-80"
                        >
                          <AiOutlineDelete
                            size={28}
                            className="absolute -right-[2px] -top-[2px] fill-green-200"
                          />
                          <AiFillDelete
                            size={24}
                            className={`fill-neutral-500/70 hover:fill-rose-500`}
                          />
                        </div>
                      </div>
                    </div>

                    <ItemAddress className="border-t">
                      <EditAddressReceiverForm address={itemAddress} />
                    </ItemAddress>
                  </>
                </ItemAddressReceiverContainer>
              )
            })}
        </div>
      </div>
    </>
  )
}
export default ListReceiverAddresses
