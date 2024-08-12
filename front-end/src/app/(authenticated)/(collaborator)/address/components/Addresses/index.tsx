'use client'

import useGetUserBySession from '@/hooks/auth/useGetUserBySession'
import ListReceivers from '../ListReceiver'
import ListReceiverAddresses from '../ListReceiverAddresses'
import useAddress from './useAddress'

const Addresses = () => {
  const initialUser = useGetUserBySession()
  const { selectedReceiver, setSelectedReceiver, handleSelectedReceiver } =
    useAddress()
  return (
    <div className="gap-22 flex-[4] px-2 py-4 md:px-8 md:pb-12 md:pt-4">
      <div className="mt-4">
        <div className="flex flex-col justify-between gap-6 text-base font-medium text-gray-900">
          <div className="flex w-full flex-col">
            <p>cadastro</p>
            <p className="mt-0.5 text-sm text-gray-500">
              aqui você pode alterar os seus recebedores e endereços
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="mt-4 gap-y-4 border bg-white px-4 pb-4 pt-3">
              {initialUser && initialUser?.id && (
                <ListReceivers
                  userId={initialUser?.id}
                  selectedReceiver={selectedReceiver}
                  setSelectedReceiver={setSelectedReceiver}
                  handleSelectedReceiver={handleSelectedReceiver}
                />
              )}
            </div>

            <div className="mt-4 w-full gap-y-4 border bg-white px-4 pb-4 pt-3">
              {selectedReceiver && selectedReceiver?.id && (
                <ListReceiverAddresses
                  receiverId={selectedReceiver?.id}
                  nameReceiver={selectedReceiver.name}
                />
              )}
              {!selectedReceiver?.id && (
                <div
                  className="mt-6 rounded-b border-t-4 border-teal-500 bg-teal-100 px-4 py-3 text-teal-900 shadow-md"
                  role="alert"
                >
                  <div className="flex">
                    <div className="py-1">
                      <svg
                        className="mr-4 h-6 w-6 fill-current text-teal-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold">
                        Você ainda não selecionou o recebedor
                      </p>
                      <p className="text-sm">
                        Selecione o um recebedor para listar os endereços!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Addresses
