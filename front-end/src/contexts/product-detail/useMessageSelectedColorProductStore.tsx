'use client'

import { AppError } from '@/_services/errors/AppError'
import { IToastProps } from '@/components/Toast'
import { create } from 'zustand'

export type IMessageSelectedColorProductStore = {
  messageSelectedColorProduct: boolean
}

type IActionsProps = {
  setMessageSelectedColorProductStore: (
    data: IMessageSelectedColorProductStore,
  ) => Promise<IToastProps>
}

type IStoreProps = {
  state: {
    messageSelectedColorProduct: boolean
  }
  actions: IActionsProps
}

const meToastCart: IToastProps = {
  type: 'error',
  message: 'Tivemos um erro, tente novamente!',
}

export const useMessageSelectedColorProductStore = create<IStoreProps>(
  (set) => ({
    state: {
      messageSelectedColorProduct: false,
    },
    actions: {
      setMessageSelectedColorProductStore: async ({
        messageSelectedColorProduct,
      }: IMessageSelectedColorProductStore) => {
        try {
          set(() => {
            meToastCart.message = 'A cor do produto deve ser selecionada!'
            meToastCart.type = 'error'

            return {
              state: {
                messageSelectedColorProduct,
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
