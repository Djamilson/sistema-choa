import { IAddress } from '@/@model/address/address'
import { AppError } from '@/_services/errors/AppError'
import { IToastProps } from '@/components/Toast'
import { formatZipCodeInPoint } from '@/utils/formatZipCode'
import { create } from 'zustand'

type IActionsProps = {
  setListAddresses: (addressesData: IAddress[]) => void
  addAddress: (address: IAddress) => void
  removeAddress: (address: string) => IToastProps
  upDateAddress: (address: IAddress) => void
  upDateAddressMain: (addressId: string) => void
}

const meToastRemove: IToastProps = {
  type: 'error',
  message: 'Tivemos um erro, tente novamente!',
}

type IStoreProps = {
  state: { addresses: IAddress[] }
  actions: IActionsProps
}

export const useListingAddressStore = create<IStoreProps>((set) => ({
  state: {
    addresses: [] as IAddress[],
  },
  actions: {
    setListAddresses: (addresses: IAddress[]) =>
      set(() => {
        return {
          state: {
            addresses: [...addresses],
          },
        }
      }),

    addAddress: (address: IAddress) =>
      set((prevState) => {
        const addressItems = [...prevState.state.addresses]

        return {
          state: {
            addresses: [
              address,
              ...addressItems?.map((oldAddress) => {
                return { ...oldAddress, main: false }
              }),
            ],
          },
        }
      }),

    removeAddress: (addressId: string) => {
      try {
        set((prevState) => {
          const addressItems = [...prevState.state.addresses]
          meToastRemove.message = 'Endereço removido com sucesso!'
          meToastRemove.type = 'success'

          return {
            state: {
              addresses:
                addressItems?.filter((address) => address.id !== addressId) ||
                ([] as IAddress[]),
            },
          }
        })
        return meToastRemove
      } catch (error: any) {
        throw new AppError(
          'Não foi possível remove o endereço, caso seja o enderço principal não é possível fazer a remoção!',
          error.statusCode,
        )
      }
    },

    upDateAddress: ({
      id,
      street,
      city,
      state,
      neighborhood,
      number,
      zip_code,
      complement,
    }: IAddress) =>
      set((prevState) => {
        const addressItems = [...prevState.state.addresses]

        return {
          state: {
            addresses:
              addressItems?.map((oldAddress) => {
                if (oldAddress.id === id) {
                  return {
                    ...oldAddress,
                    street,
                    number,
                    complement,
                    city,
                    state,
                    neighborhood,
                    zip_code,
                    zipCodeFormat: formatZipCodeInPoint(zip_code),
                  }
                }
                return oldAddress
              }) || ([] as IAddress[]),
          },
        }
      }),

    upDateAddressMain: (addressId: string) =>
      set((prevState) => {
        const addressItems = [...prevState.state.addresses]

        return {
          state: {
            addresses:
              addressItems?.map((oldAddress) => {
                if (oldAddress.id === addressId) {
                  return { ...oldAddress, main: true }
                }
                return { ...oldAddress, main: false }
              }) || ([] as IAddress[]),
          },
        }
      }),
  },
}))
