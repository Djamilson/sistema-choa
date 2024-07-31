'use client'

import { IGuarantee } from '@/@model/aggregationProduct/aggregationProduct'
import { AppError } from '@/_services/errors/AppError'
import { IToastProps } from '@/components/Toast'
import { create } from 'zustand'

export type ISelectedGuarantee = {
  selectedGuarantee: IGuarantee
}

type IActionsProps = {
  setSelectedGuarantee: (data: ISelectedGuarantee) => Promise<IToastProps>
  clearSelectedGuarantee: () => IToastProps
}

type IStoreProps = {
  state: {
    selectedGuarantee: IGuarantee
  }
  actions: IActionsProps
}

const meToastCart: IToastProps = {
  type: 'error',
  message: 'Tivemos um erro, tente novamente!',
}

export const useSelectedGuaranteeStore = create<IStoreProps>((set) => ({
  state: {
    selectedGuarantee: {} as IGuarantee,
  },
  actions: {
    setSelectedGuarantee: async ({ selectedGuarantee }: ISelectedGuarantee) => {
      try {
        set(() => {
          meToastCart.message = 'Produto adicionado a cesta com sucesso!'
          meToastCart.type = 'success'

          return {
            state: {
              selectedGuarantee,
            },
          }
        })

        return meToastCart
      } catch (error: any) {
        throw new AppError(error.message, error.statusCode)
      }
    },

    clearSelectedGuarantee: () => {
      try {
        set(() => {
          meToastCart.message = 'Garantia reiniciada com sucesso!'
          meToastCart.type = 'success'

          return {
            state: {
              selectedGuarantee: {} as IGuarantee,
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
