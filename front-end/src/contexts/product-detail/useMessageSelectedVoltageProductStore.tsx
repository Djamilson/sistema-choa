'use client'

import { AppError } from '@/_services/errors/AppError'
import { IToastProps } from '@/components/Toast'
import { create } from 'zustand'

export type IMessageSelectedVoltageProductStore = {
  messageSelectedVoltageProduct: boolean
}

type IActionsProps = {
  setMessageSelectedVoltageProductStore: (
    data: IMessageSelectedVoltageProductStore,
  ) => Promise<IToastProps>
}

type IStoreProps = {
  state: {
    messageSelectedVoltageProduct: boolean
  }
  actions: IActionsProps
}

const meToastCart: IToastProps = {
  type: 'error',
  message: 'Tivemos um erro, tente novamente!',
}

export const useMessageSelectedVoltageProductStore = create<IStoreProps>(
  (set) => ({
    state: {
      messageSelectedVoltageProduct: false,
    },
    actions: {
      setMessageSelectedVoltageProductStore: async ({
        messageSelectedVoltageProduct,
      }: IMessageSelectedVoltageProductStore) => {
        try {
          set(() => {
            meToastCart.message = 'A voltagem do produto deve ser selecionada!'
            meToastCart.type = 'error'

            return {
              state: {
                messageSelectedVoltageProduct,
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
