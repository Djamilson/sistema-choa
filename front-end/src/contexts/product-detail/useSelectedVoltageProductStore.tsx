'use client'

import { IVoltageProduct } from '@/@model/voltageProduct/voltageProduct'
import { AppError } from '@/_services/errors/AppError'
import { IToastProps } from '@/components/Toast'
import { create } from 'zustand'

export type ISelectedVoltageProductStore = {
  selectedVoltageProduct: IVoltageProduct
}

type IActionsProps = {
  setSelectedVoltageProductStore: (
    data: ISelectedVoltageProductStore,
  ) => Promise<IToastProps>
  clearSelectedVoltageProductStore: () => IToastProps
}

type IStoreProps = {
  state: {
    selectedVoltageProduct: IVoltageProduct
  }
  actions: IActionsProps
}

const meToastCart: IToastProps = {
  type: 'error',
  message: 'Tivemos um erro, tente novamente!',
}

export const useSelectedVoltageProductStore = create<IStoreProps>((set) => ({
  state: {
    selectedVoltageProduct: {} as IVoltageProduct,
  },
  actions: {
    setSelectedVoltageProductStore: async ({
      selectedVoltageProduct,
    }: ISelectedVoltageProductStore) => {
      try {
        set(() => {
          meToastCart.message = 'Voltagem selecionada com sucesso!'
          meToastCart.type = 'success'

          return {
            state: {
              selectedVoltageProduct,
            },
          }
        })

        return meToastCart
      } catch (error: any) {
        throw new AppError(error.message, error.statusCode)
      }
    },

    clearSelectedVoltageProductStore: () => {
      try {
        set(() => {
          meToastCart.message = 'Voltagem reiniciada com sucesso!'
          meToastCart.type = 'success'

          return {
            state: {
              selectedVoltageProduct: {} as IVoltageProduct,
            },
          }
        })

        return meToastCart
      } catch (error: any) {
        throw new AppError(error.message, error.statusCode)
      }
    },
  },
}))
