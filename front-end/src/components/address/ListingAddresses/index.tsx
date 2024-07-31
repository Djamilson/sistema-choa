'use client'

import { IAddress } from '@/@model/address/address'
import { Hr } from '@/components/Hr'
import { MessageComponent } from '@/components/MessageComponent'
import { LoadingPuff } from '@/components/loadings/LoadingPuff'
import { LoadingPulseLoader } from '@/components/loadings/LoadingPulseLoader'
import DialogModal from '@/components/modals/DialogModal'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBinLine } from 'react-icons/ri'
import { useListingAddresses } from './useListingAddresses'

const ListingAddresses = () => {
  const {
    handleDelete,
    addresses,
    isLoadingUpdateMain,
    isLoadingAddress,
    isFetchingAddress,
    isOpenModalTransitionDelete,
    closeModalTransitionDelete,
    selectedAddressDelete,
    selectedAddressMain,
    setIsLoadingUpdateMain,
    setSelectedAddressMain,
    setSelectedAddressIdEdit,
    setSelectedAddressDelete,
  } = useListingAddresses()

  return (
    <>
      {isLoadingAddress && isFetchingAddress && <LoadingPulseLoader />}

      {addresses && addresses.length < 1 && (
        <MessageComponent
          title="Ooops! não conseguimos encontrar endereço!"
          message="Você ainda não tem endereço cadastrado!"
        />
      )}

      {/* selectedAddressIdEdit.length > 0 && (
        <EditAddressModal
          isOpen={isOpenEditModalAddress}
          onClose={closeEditModalAddress}
          selectedAddressIdEdit={selectedAddressIdEdit}
        />
      ) */}

      <DialogModal
        onClose={() => closeModalTransitionDelete()}
        open={isOpenModalTransitionDelete}
        isLoading={false}
        handler={handleDelete}
        title={`Atenção!`}
        message={`Tem certeza que deseja remover esse endereço? `}
        titleButtonConfirmation={`sim deletar`}
        titleButtonOnClose={`não deletar`}
      >
        <>
          <p className="mt-4 text-sm text-gray-500">
            {selectedAddressDelete.street}
          </p>
          <p className="text-sm text-gray-500">
            {`${selectedAddressDelete?.number}, ${selectedAddressDelete.complement}`}
          </p>
          <p className="text-sm text-gray-500">
            {`${selectedAddressDelete?.neighborhood}, ${selectedAddressDelete?.city}-${selectedAddressDelete.state}`}
          </p>
          <p className="text-sm text-gray-500">
            {`CEP:${selectedAddressDelete?.zipCodeFormat}`}
          </p>
        </>
      </DialogModal>

      <div className="mx-auto mt-10 grid max-w-md grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        {addresses?.map((address: IAddress) => (
          <article
            key={address.id}
            className="flex max-w-md flex-col items-start justify-between overflow-hidden  bg-white p-6 shadow-md"
          >
            <div className="group relative w-full">
              <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-600 group-hover:text-gray-600">
                <span className="absolute inset-0" />
                nome
              </h3>
              <div className="-m-2">
                <Hr />
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                {`${address.street}, LT/Casa/AP ${address.number}, ${address.complement}`}
              </p>
              <p className="text-sm leading-6 text-gray-600">
                {`${address.neighborhood}, ${address.city}-${address.state}`}
              </p>
              <p className="text-sm leading-6 text-gray-600">
                {`CEP: ${address.zipCodeFormat}`}
              </p>
            </div>

            {address?.main && !isLoadingUpdateMain && (
              <div className="flex items-center justify-between space-x-2 py-4">
                <span className="animated inline-flex items-center bg-green-50 px-3 py-2 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  Favorito
                </span>
              </div>
            )}

            {isLoadingUpdateMain && selectedAddressMain?.id === address.id && (
              <LoadingPuff />
            )}

            {!address?.main && !isLoadingUpdateMain && (
              <div className="flex items-center justify-between space-x-2 py-4">
                <label htmlFor={address.id} className="text-sm">
                  <p className="font-normal text-gray-400">Tornar principal</p>
                </label>
                <div className="flex h-5 items-center">
                  <input
                    type="checkbox"
                    id={address.id}
                    checked={address.main}
                    onChange={() => {
                      setIsLoadingUpdateMain(true)
                      setSelectedAddressMain(address)
                    }}
                    className="text-primary-600 focus:border-primary-300 focus:ring-primary-200 h-4 w-4 rounded border-gray-300 shadow-sm focus:ring focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
                  />
                </div>
              </div>
            )}
            <div className="flex justify-between gap-6 text-base font-medium text-gray-900">
              <div className="py-2 md:max-w-md">
                <button
                  type="button"
                  onMouseOver={() => {}}
                  onClick={() => {
                    setSelectedAddressIdEdit(address.id)
                  }}
                  className={`focus:shadow-outline relative h-12 w-full whitespace-nowrap  border border-accent py-1 text-sm font-medium text-accent shadow-sm ring-0 transition-all duration-150 hover:border-gray-200 hover:bg-accent hover:text-white hover:opacity-80 hover:ring-2 hover:ring-accent hover:ring-offset-1 hover:ring-offset-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 md:mt-0 md:px-16 md:ring-offset-accent`}
                >
                  <FiEdit size={18} className="absolute left-4 top-3" />
                  editar
                </button>
              </div>
              <div className="py-2 md:max-w-md">
                <button
                  type="button"
                  disabled={address?.main}
                  onClick={() => setSelectedAddressDelete(address)}
                  className={`focus:shadow-outline relative h-12 w-full whitespace-nowrap  border border-accent py-1 text-sm font-medium text-accent shadow-sm ring-0 transition-all duration-150 hover:border-gray-200 hover:bg-accent hover:text-white hover:opacity-80 hover:ring-2 hover:ring-accent hover:ring-offset-1 hover:ring-offset-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 md:mt-0 md:px-16 md:ring-offset-accent`}
                >
                  <RiDeleteBinLine
                    size={18}
                    className="absolute left-4 top-3"
                  />
                  excluir
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}

export default ListingAddresses
