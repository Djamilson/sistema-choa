'use client'

import { AppError } from '@/_services/errors/AppError'
import { IToastProps } from '@/components/Toast'
import { create } from 'zustand'

export type IMessageSelectedSizeProductStore = {
  messageSelectedSizeProduct: boolean
}

type IActionsProps = {
  setMessageSelectedSizeProductStore: (
    data: IMessageSelectedSizeProductStore,
  ) => Promise<IToastProps>
}

type IStoreProps = {
  state: {
    messageSelectedSizeProduct: boolean
  }
  actions: IActionsProps
}

const meToastCart: IToastProps = {
  type: 'error',
  message: 'Tivemos um erro, tente novamente!',
}

export const useMessageSelectedSizeProductStore = create<IStoreProps>(
  (set) => ({
    state: {
      messageSelectedSizeProduct: false,
    },
    actions: {
      setMessageSelectedSizeProductStore: async ({
        messageSelectedSizeProduct,
      }: IMessageSelectedSizeProductStore) => {
        try {
          set(() => {
            meToastCart.message = 'O tamanho do produto deve ser selecionado!'
            meToastCart.type = 'error'

            return {
              state: {
                messageSelectedSizeProduct,
              },
            }
          })

          return meToastCart
        } catch (error: any) {
          throw new AppError(error.message, error.statusCode)
        }
      },
    },
  }),
)
