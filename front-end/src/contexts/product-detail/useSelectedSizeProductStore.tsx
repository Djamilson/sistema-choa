'use client'

import { ISizeProduct } from '@/@model/sizeProduct/sizeProduct'
import { AppError } from '@/_services/errors/AppError'
import { IToastProps } from '@/components/Toast'
import { create } from 'zustand'

export type ISelectedSizeProductStore = {
  selectedSizeProduct: ISizeProduct
}

type IActionsProps = {
  setSelectedSizeProductStore: (
    data: ISelectedSizeProductStore,
  ) => Promise<IToastProps>
  clearSelectedSizeProductStore: () => IToastProps
}

type IStoreProps = {
  state: {
    selectedSizeProduct: ISizeProduct
  }
  actions: IActionsProps
}

const meToastCart: IToastProps = {
  type: 'error',
  message: 'Tivemos um erro, tente novamente!',
}

export const useSelectedSizeProductStore = create<IStoreProps>((set) => ({
  state: {
    selectedSizeProduct: {} as ISizeProduct,
  },
  actions: {
    setSelectedSizeProductStore: async ({
      selectedSizeProduct,
    }: ISelectedSizeProductStore) => {
      try {
        set(() => {
          meToastCart.message = 'Tamanho selecionado com sucesso!'
          meToastCart.type = 'success'

          return {
            state: {
              selectedSizeProduct,
            },
          }
        })

        return meToastCart
      } catch (error: any) {
        throw new AppError(error.message, error.statusCode)
      }
    },

    clearSelectedSizeProductStore: () => {
      try {
        set(() => {
          meToastCart.message = 'Tamanho reiniciado com sucesso!'
          meToastCart.type = 'success'

          return {
            state: {
              selectedSizeProduct: {} as ISizeProduct,
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
