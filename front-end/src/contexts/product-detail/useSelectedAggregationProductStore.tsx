'use client'

import { IAggregationProductDetailEcommerce } from '@/@model/product/product'
import { AppError } from '@/_services/errors/AppError'
import { IToastProps } from '@/components/Toast'
import { create } from 'zustand'

export type ISelectedAggregationProductStore = {
  selectedAggregationProduct: IAggregationProductDetailEcommerce
}

type IActionsProps = {
  setSelectedAggregationProductStore: (
    data: ISelectedAggregationProductStore,
  ) => Promise<IToastProps>
  clearSelectedAggregationProductStore: () => IToastProps
}

type IStoreProps = {
  state: {
    selectedAggregationProduct: IAggregationProductDetailEcommerce
  }
  actions: IActionsProps
}

const meToastCart: IToastProps = {
  type: 'error',
  message: 'Tivemos um erro, tente novamente!',
}

export const useSelectedAggregationProductStore = create<IStoreProps>(
  (set) => ({
    state: {
      selectedAggregationProduct: {} as IAggregationProductDetailEcommerce,
    },
    actions: {
      setSelectedAggregationProductStore: async ({
        selectedAggregationProduct,
      }: ISelectedAggregationProductStore) => {
        try {
          set(() => {
            meToastCart.message = 'Produto selecionado com sucesso!'
            meToastCart.type = 'success'

            return {
              state: {
                selectedAggregationProduct,
              },
            }
          })

          return meToastCart
        } catch (error: any) {
          throw new AppError(error.message, error.statusCode)
        }
      },

      clearSelectedAggregationProductStore: () => {
        try {
          set(() => {
            meToastCart.message = 'Produto reiniciado com sucesso!'
            meToastCart.type = 'success'

            return {
              state: {
                selectedAggregationProduct:
                  {} as IAggregationProductDetailEcommerce,
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
