'use client'

import { IAggregationProductDetail } from '@/@model/product/product'
import { AppError } from '@/_services/errors/AppError'
import { IToastProps } from '@/components/Toast'
import { create } from 'zustand'

export type ITemporaryVariableAggregationProductAddCartStore = {
  aggregationProduct: IAggregationProductDetail
}

type IActionsProps = {
  setTemporaryVariableAggregationProductAddCartStore: (
    data: ITemporaryVariableAggregationProductAddCartStore,
  ) => Promise<IToastProps>
  clearTemporaryVariableAggregationProductAddCartStore: () => IToastProps
}

type IStoreProps = {
  state: {
    aggregationProduct: IAggregationProductDetail
  }
  actions: IActionsProps
}

const meToastCart: IToastProps = {
  type: 'error',
  message: 'Tivemos um erro, tente novamente!',
}

export const useTemporaryVariableAggregationProductAddCartStore =
  create<IStoreProps>((set) => ({
    state: {
      aggregationProduct: {} as IAggregationProductDetail,
    },
    actions: {
      setTemporaryVariableAggregationProductAddCartStore: async ({
        aggregationProduct,
      }: ITemporaryVariableAggregationProductAddCartStore) => {
        try {
          set(() => {
            meToastCart.message = 'Produto adicionado a cesta com sucesso!'
            meToastCart.type = 'error'

            return {
              state: {
                aggregationProduct,
              },
            }
          })

          return meToastCart
        } catch (error: any) {
          throw new AppError(error.message, error.statusCode)
        }
      },
      clearTemporaryVariableAggregationProductAddCartStore: () => {
        try {
          set(() => {
            meToastCart.message = 'reiniciada com sucesso!'
            meToastCart.type = 'success'

            return {
              state: {
                aggregationProduct: {} as IAggregationProductDetail,
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
