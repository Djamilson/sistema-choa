/* eslint-disable array-callback-return */
import {
  IAggregationProductDetail,
  IAggregationProductDetailEcommerce,
} from '@/@model/product/product'
import { api } from '@/_services/apiClient'
import { AppError } from '@/_services/errors/AppError'
import { IToastProps } from '@/components/Toast'
import { createForgottenCarts } from '@/hooks/Entity/useForgottenCartAll'
import { getStockTotalAggregationProductByAggregationProductId } from '@/hooks/Entity/useStocks'
import { create } from 'zustand'

type IAddToCartOnGuarantee = {
  productId: string
  aggregationProduct: any
  guaranteeId: string
  total: number
}

type IAddToCart = {
  productId: string
  aggregationProduct: IAggregationProductDetailEcommerce
  total: number
}

export type ISelectedGuaranteeProps = {
  aggregationProductId: string
  guaranteeId: string
}

type IRemoveFromCartProps = {
  aggregationProductId: string
}

export type IUpdateQuantity = {
  aggregationProductId: string
}

export type IAggregationProductCart = {
  flagAmountOldToUpdateCartInTheDatabase: number
  productId: string
  aggregationProduct: IAggregationProductDetail
  amount: number
  totalInStock: number
  guaranteeId?: string
  quantityGuarantee: number
}

export type ISetFlagAmountOldToUpdateCartInTheDatabaseProps = {
  aggregationProductId: string
  flagAmountOldToUpdateCartInTheDatabase: number
}

type IActionsProps = {
  addToCartOnAggregationProductAndGuarantee: (
    data: IAddToCartOnGuarantee,
  ) => Promise<IToastProps>
  addToCartOnAggregationProduct: (data: IAddToCart) => Promise<IToastProps>
  removeFromCart: (data: IRemoveFromCartProps) => IToastProps
  updateIncrementQuantity: (data: IUpdateQuantity) => Promise<IToastProps>
  updateDecrementQuantity: (data: IUpdateQuantity) => Promise<IToastProps>
  setFlagAmountOldToUpdateCartInTheDatabase: (
    data: ISetFlagAmountOldToUpdateCartInTheDatabaseProps,
  ) => void
  setCartStore: (cartItems: IAggregationProductCart[]) => void
  removeGuarantee: (aggregationProductId: string) => Promise<IToastProps>
  selectedGuarantee: ({
    aggregationProductId,
    guaranteeId,
  }: ISelectedGuaranteeProps) => Promise<IToastProps | undefined>
  updateTotalStockAggregationProduct: () => void
  clearCart: () => void
}

type IStoreProps = {
  state: {
    cartItems: IAggregationProductCart[]
  }
  actions: IActionsProps
}

const meToastCart: IToastProps = {
  type: 'error',
  message: 'Tivemos um erro, tente novamente!',
}

export const useCartStore = create<IStoreProps>((set, get) => ({
  state: {
    cartItems: [],
  },
  actions: {
    /* addToCart: async ({ aggregationProductId }: IAddAggregationProduct) => {
            try {
                const oldCartItems = get().state.cartItems

                const aggregationProductExists = oldCartItems.find(
                    item => item.aggregationProduct.id === aggregationProductId
                )

                const [stockAggregationProduct, aggregationProduct] =
                    await Promise.all([
                        getStockTotalAggregationProductByAggregationProductId(
                            aggregationProductId
                        ),
                        getAggregationProductByAggregationProductId({
                            aggregationProductId
                        })
                    ])

                const stockAmount = stockAggregationProduct.total
                const currentAmount = aggregationProductExists
                    ? aggregationProductExists.amount
                    : 0

                const amount = currentAmount + 1

                if (amount > stockAmount) {
                    meToastCart.type = 'error'
                    meToastCart.message =
                        'Não temos mais produto para adicionar!'

                    return meToastCart
                }
                const p = { ...aggregationProduct }

                set(prevState => {
                    const cartItems = [...prevState.state.cartItems]
                    const quantityGuarantee = 0

                    const itemProductAdd = {
                        flagAmountOldToUpdateCartInTheDatabase: 0,
                        amount,
                        totalInStock: stockAmount,
                        aggregationProduct: {
                            id: '',
                            guarantees: [],
                            voltage_product: {},
                            color_product: {},
                            size_product: {},
                            divided_into: 3,
                            price: {}
                        },
                        quantityGuarantee
                    }

                    meToastCart.message =
                        'Produto adicionado a cesta com sucesso!'
                    meToastCart.type = 'success'

                    return {
                        state: {
                            cartItems: aggregationProductExists
                                ? cartItems.map(item =>
                                      item.aggregationProduct.id ===
                                      aggregationProductId
                                          ? {
                                                ...item,
                                                amount,
                                                aggregationProduct: {
                                                    ...aggregationProduct
                                                }
                                            }
                                          : item
                                  )
                                : [...cartItems, itemProductAdd]
                        }
                    }
                })

                return meToastCart
            } catch (error: any) {
                throw new AppError(error.message, error.statusCode)
            }
        }, */

    addToCartOnAggregationProductAndGuarantee: async ({
      guaranteeId,
      productId,
      aggregationProduct,
      total,
    }: IAddToCartOnGuarantee) => {
      try {
        const oldCartItems = get().state.cartItems

        const aggregationProductExists = oldCartItems.find(
          (item) => item.aggregationProduct.id === aggregationProduct.id,
        )

        const stockAmount = total
        const currentAmount = aggregationProductExists
          ? aggregationProductExists.amount
          : 0
        const amount = currentAmount + 1

        if (amount > stockAmount) {
          meToastCart.message = 'Não temos mais produto para adicionar!'
          meToastCart.type = 'error'

          return meToastCart
        }

        const quantityGuarantee = 1

        const itemProductAdd = {
          flagAmountOldToUpdateCartInTheDatabase: 0,
          amount,
          productId,
          totalInStock: stockAmount,
          aggregationProduct: { ...aggregationProduct },
          guaranteeId,
          quantityGuarantee,
        }

        set({
          state: {
            cartItems: aggregationProductExists
              ? oldCartItems.map((item) =>
                  item.aggregationProduct.id === aggregationProduct.id
                    ? {
                        ...item,
                        amount,
                        aggregationProduct: {
                          ...aggregationProduct,
                        },
                      }
                    : item,
                )
              : [...oldCartItems, itemProductAdd],
          },
        })

        meToastCart.message = 'Produto adicionado a cesta com sucesso!'
        meToastCart.type = 'success'

        return meToastCart
      } catch (error: any) {
        throw new AppError(error.message, error.statusCode)
      }
    },
    addToCartOnAggregationProduct: async ({
      productId,
      aggregationProduct,
      total,
    }: IAddToCart) => {
      try {
        const oldCartItems = get().state.cartItems

        const aggregationProductExists = oldCartItems.find(
          (item) => item.aggregationProduct.id === aggregationProduct.id,
        )

        const stockAmount = total
        const currentAmount = aggregationProductExists
          ? aggregationProductExists.amount
          : 0
        const amount = currentAmount + 1

        if (amount > stockAmount) {
          meToastCart.message = 'Não temos mais produto para adicionar!'
          meToastCart.type = 'error'

          return meToastCart
        }

        const quantityGuarantee = 1

        const itemProductAdd = {
          flagAmountOldToUpdateCartInTheDatabase: 0,
          amount,
          productId,
          totalInStock: stockAmount,
          aggregationProduct: { ...aggregationProduct },

          quantityGuarantee,
        }

        set({
          state: {
            cartItems: aggregationProductExists
              ? oldCartItems.map((item) =>
                  item.aggregationProduct.id === aggregationProduct.id
                    ? {
                        ...item,
                        amount,
                        aggregationProduct: {
                          ...aggregationProduct,
                        },
                      }
                    : item,
                )
              : [...oldCartItems, itemProductAdd],
          },
        })

        meToastCart.message = 'Produto adicionado a cesta com sucesso!'
        meToastCart.type = 'success'

        return meToastCart
      } catch (error: any) {
        throw new AppError(error.message, error.statusCode)
      }
    },

    removeGuarantee: async (aggregationProductId: string) => {
      try {
        const oldCartItems = get().state.cartItems
        const aggregationProductExists = oldCartItems.find(
          (item) => item.aggregationProduct.id === aggregationProductId,
        )

        if (!aggregationProductExists) {
          meToastCart.message =
            'Não foi possível remover a garantia, tente novamente!'
          meToastCart.type = 'error'

          return meToastCart
        }

        /* const guaranteeId =
                    aggregationProductExists?.aggregationProduct?.guarantees?.find(
                        item => Number(item?.price?.price) === 0
                    )?.id */

        const quantityGuarantee = 1
        const flagAmountOldToUpdateCartInTheDatabase = 0

        meToastCart.message = 'Garantia estendida removida com sucesso!'
        meToastCart.type = 'success'

        set({
          state: {
            cartItems: oldCartItems.map((item) =>
              item.aggregationProduct.id === aggregationProductId
                ? {
                    ...item,
                    flagAmountOldToUpdateCartInTheDatabase,
                    quantityGuarantee,
                    guaranteeId: 'tenho que fazer',
                  }
                : item,
            ),
          },
        })

        return meToastCart
      } catch (error: any) {
        throw new AppError(error.message, error.statusCode)
      }
    },
    selectedGuarantee: async ({
      aggregationProductId,
      guaranteeId,
    }: ISelectedGuaranteeProps) => {
      try {
        const oldCartItems = get().state.cartItems

        const aggregationProductExists = oldCartItems.find(
          (item) => item.aggregationProduct.id === aggregationProductId,
        )

        if (!aggregationProductExists) {
          meToastCart.message =
            'Não foi possível fazer selecionar a garantia estendida, tente novamente!'
          meToastCart.type = 'warning'

          return meToastCart
        }

        set((prevState) => {
          const cartItems = [...prevState.state.cartItems]

          const meCartItems = aggregationProductExists
            ? cartItems.map((item) => {
                if (item.aggregationProduct.id === aggregationProductId) {
                  return {
                    ...item,
                    guaranteeId,
                  }
                }
                return item
              })
            : cartItems

          meToastCart.message = 'Garantia do produto selecionada com sucesso!'
          meToastCart.type = 'success'

          return {
            state: {
              cartItems: meCartItems,
            },
          }
        })

        return meToastCart
      } catch (error: any) {
        throw new AppError(error.message, error.statusCode)
      }
    },

    removeFromCart: ({ aggregationProductId }: IRemoveFromCartProps) => {
      try {
        set((prevState) => {
          const cartItems = prevState.state.cartItems.filter(
            (item) => item.aggregationProduct.id !== aggregationProductId,
          )

          meToastCart.message = 'Produto removido da cesta com sucesso!'
          meToastCart.type = 'success'

          return {
            state: {
              cartItems,
            },
          }
        })
        return meToastCart
      } catch (error: any) {
        throw new AppError(error.message, error.statusCode)
      }
    },
    updateIncrementQuantity: async ({
      aggregationProductId,
    }: IUpdateQuantity) => {
      try {
        const oldCartItems = get().state.cartItems

        const aggregationProductExists = oldCartItems.find(
          (item) => item.aggregationProduct.id === aggregationProductId,
        )

        const currentAmount = aggregationProductExists
          ? aggregationProductExists.amount
          : 0

        const amount = currentAmount + 1

        const { total } =
          await getStockTotalAggregationProductByAggregationProductId(
            aggregationProductId,
          )

        if (amount > total) {
          meToastCart.message =
            'Não temos a quantidade solicitada do produto, tente novamente!'
          meToastCart.type = 'warning'

          return meToastCart
        }

        set((prevState) => {
          const cartItems = [...prevState.state.cartItems]

          const meCartItems = aggregationProductExists
            ? cartItems.map((item) => {
                if (item.aggregationProduct.id === aggregationProductId) {
                  return {
                    ...item,
                    amount,
                    quantityGuarantee: amount,
                  }
                }
                return item
              })
            : cartItems

          meToastCart.message =
            'Você alterou a quatidade do produto com sucesso!'
          meToastCart.type = 'success'

          return {
            state: {
              cartItems: meCartItems,
            },
          }
        })

        createForgottenCarts({
          aggregation_product_id: aggregationProductId,
          amount,
        })

        return meToastCart
      } catch (error: any) {
        throw new AppError(error.message, error.statusCode)
      }
    },
    updateDecrementQuantity: async ({
      aggregationProductId,
    }: IUpdateQuantity) => {
      try {
        const oldCartItems = get().state.cartItems

        const aggregationProductExists = oldCartItems.find(
          (item) => item.aggregationProduct.id === aggregationProductId,
        )

        if (aggregationProductExists && aggregationProductExists?.amount > 1) {
          set((prevState) => {
            const cartItems = [...prevState.state.cartItems]

            const meCartItems = aggregationProductExists
              ? cartItems.map((item) => {
                  if (item.aggregationProduct.id === aggregationProductId) {
                    const quantity = item.amount - 1

                    createForgottenCarts({
                      aggregation_product_id: aggregationProductId,
                      amount: quantity,
                    })

                    return {
                      ...item,
                      amount: quantity,
                      quantityGuarantee: quantity,
                    }
                  }
                  return item
                })
              : cartItems

            meToastCart.message =
              'Você alterou a quatidade do produto com sucesso!'
            meToastCart.type = 'success'

            return {
              state: {
                cartItems: meCartItems,
              },
            }
          })
        } else if (
          aggregationProductExists &&
          aggregationProductExists?.amount === 1
        ) {
          meToastCart.message =
            'Já temos a quantidade mínima desse produto na cesta!'
          meToastCart.type = 'warning'
        }

        return meToastCart
      } catch (error: any) {
        throw new AppError(error.message, error.statusCode)
      }
    },
    setFlagAmountOldToUpdateCartInTheDatabase: ({
      aggregationProductId,
      flagAmountOldToUpdateCartInTheDatabase,
    }: ISetFlagAmountOldToUpdateCartInTheDatabaseProps) => {
      const oldCartItems = get().state.cartItems

      const aggregationProductExists = oldCartItems.find(
        (item) => item.aggregationProduct.id === aggregationProductId,
      )

      if (aggregationProductExists) {
        set((prevState) => {
          const cartItems = [...prevState.state.cartItems]

          const meCartItems = cartItems.map((item) => {
            if (item.aggregationProduct.id === aggregationProductId) {
              return {
                ...item,
                flagAmountOldToUpdateCartInTheDatabase,
              }
            }
            return item
          })

          return {
            state: {
              cartItems: meCartItems,
            },
          }
        })
      }
    },
    setCartStore: (cartItems: IAggregationProductCart[]) =>
      set((prevState) => {
        const updateCartItems = [...prevState.state.cartItems, ...cartItems]

        return {
          state: {
            cartItems: updateCartItems,
          },
        }
      }),
    updateTotalStockAggregationProduct: async () => {
      try {
        const oldCartItems = get().state.cartItems

        const updateCart = await Promise.all(
          oldCartItems.map(async (item) => {
            const { data } = await api.get(
              `stocks/products/${item.aggregationProduct.id}`,
            )

            return {
              aggragetionProductId: item.aggregationProduct.id,
              ...data,
            }
          }),
        )

        set((prevState) => {
          const cartItems = [...prevState.state.cartItems]

          const meCartItems = cartItems.map((item) => {
            const totalInStock = updateCart
              ? updateCart?.find((stock) => {
                  if (
                    stock.aggragetionProductId === item.aggregationProduct.id
                  ) {
                    return stock
                  }
                })
              : 0

            return {
              ...item,
              totalInStock: totalInStock.total,
            }
          })

          return {
            state: {
              cartItems: meCartItems,
            },
          }
        })
      } catch (error: any) {
        throw new AppError(error.message, error.statusCode)
      }
    },
    clearCart: () =>
      set(() => {
        return {
          state: {
            cartItems: [] as IAggregationProductCart[],
          },
        }
      }),
  },
}))
