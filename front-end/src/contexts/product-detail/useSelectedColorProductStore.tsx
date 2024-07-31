'use client'

import { IColorProduct } from '@/@model/colorProduct/colorProduct'
import { AppError } from '@/_services/errors/AppError'
import { IToastProps } from '@/components/Toast'
import { create } from 'zustand'

export type ISelectedColorProductStore = {
  selectedColorProduct: IColorProduct
}

type IActionsProps = {
  setSelectedColorProductStore: (
    data: ISelectedColorProductStore,
  ) => Promise<IToastProps>
  clearSelectedColorProductStore: () => IToastProps
}

type IStoreProps = {
  state: {
    selectedColorProduct: IColorProduct
  }
  actions: IActionsProps
}

const meToastCart: IToastProps = {
  type: 'error',
  message: 'Tivemos um erro, tente novamente!',
}

export const useSelectedColorProductStore = create<IStoreProps>((set) => ({
  state: {
    selectedColorProduct: {} as IColorProduct,
  },
  actions: {
    setSelectedColorProductStore: async ({
      selectedColorProduct,
    }: ISelectedColorProductStore) => {
      try {
        set(() => {
          meToastCart.message = 'Cor selecionada com sucesso!'
          meToastCart.type = 'success'

          return {
            state: {
              selectedColorProduct,
            },
          }
        })

        return meToastCart
      } catch (error: any) {
        throw new AppError(error.message, error.statusCode)
      }
    },

    clearSelectedColorProductStore: () => {
      try {
        set(() => {
          meToastCart.message = 'Cor reiniciada com sucesso!'
          meToastCart.type = 'success'

          return {
            state: {
              selectedColorProduct: {} as IColorProduct,
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
