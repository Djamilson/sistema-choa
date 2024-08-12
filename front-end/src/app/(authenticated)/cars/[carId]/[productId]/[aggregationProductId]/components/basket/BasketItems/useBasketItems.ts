'use client'

import { Toast } from '@/components/Toast'
import {
  IAggregationProductCart,
  IUpdateQuantity,
  useCartStore,
} from '@/contexts/useCartStore'
import useCheckIsAuthenticatedGetSession from '@/hooks/auth/useCheckIsAuthenticatedGetSession'
import {
  removeItemForgottenCarts,
  updateForgottenCarts,
} from '@/hooks/Entity/useForgottenCartAll'

type IHandleFlagAmountOldToUpdateCartInTheDatabaseProps = {
  cartItems: IAggregationProductCart[]
  aggregationProductId: string
}

export const useBasketItems = () => {
  const isAuthenticated = useCheckIsAuthenticatedGetSession()

  const {
    actions: {
      removeFromCart,
      updateIncrementQuantity,
      updateDecrementQuantity,
    },
  } = useCartStore()

  const {
    state: { cartItems },
    actions: { setFlagAmountOldToUpdateCartInTheDatabase },
  } = useCartStore()

  async function handleRemoveProduct(aggregationProductId: string) {
    try {
      const meToast = removeFromCart({ aggregationProductId })

      Toast(meToast)

      if (isAuthenticated) {
        await removeItemForgottenCarts(aggregationProductId)
      }
    } catch (error) {
      Toast({
        message: 'Erro ao tenta remove o produto!',
        type: 'error',
      })
    }
  }

  async function handleFlagAmountOldToUpdateCartInTheDatabase({
    cartItems,
    aggregationProductId,
  }: IHandleFlagAmountOldToUpdateCartInTheDatabaseProps) {
    const aggregationProductExists = cartItems.find(
      (item) => item.aggregationProduct.id === aggregationProductId,
    )

    if (
      isAuthenticated &&
      aggregationProductExists &&
      aggregationProductExists.flagAmountOldToUpdateCartInTheDatabase !==
        aggregationProductExists.amount
    ) {
      setFlagAmountOldToUpdateCartInTheDatabase({
        flagAmountOldToUpdateCartInTheDatabase: aggregationProductExists.amount,
        aggregationProductId,
      })

      // autalizando carrinho no banco
      await updateForgottenCarts({
        aggregation_product_id: aggregationProductExists.aggregationProduct.id,
        amount: aggregationProductExists.amount,
      })
    }
  }

  async function handleIncrementQuantity({
    aggregationProductId,
  }: IUpdateQuantity) {
    try {
      const meToast = await updateIncrementQuantity({
        aggregationProductId,
      })
      Toast(meToast)

      handleFlagAmountOldToUpdateCartInTheDatabase({
        cartItems,
        aggregationProductId,
      })
    } catch (error) {
      Toast({
        message: 'Erro na alteração de quantidade de produto!',
        type: 'error',
      })
    }
  }

  async function handleDecrementQuantity({
    aggregationProductId,
  }: IUpdateQuantity) {
    try {
      const meToast = await updateDecrementQuantity({
        aggregationProductId,
      })
      Toast(meToast)

      handleFlagAmountOldToUpdateCartInTheDatabase({
        cartItems,
        aggregationProductId,
      })
    } catch (error) {
      Toast({
        message: 'Erro na alteração de quantidade de produto!',
        type: 'error',
      })
    }
  }
  /*
  async function handleSelectedGuaranteeProduct({
    aggregationProductId,
    guaranteeId,
    oldGuaranteeId,
  }: IHandleSelectedGuaranteeProductProps) {
    try {
      if (oldGuaranteeId && guaranteeId && oldGuaranteeId === guaranteeId) {
        Toast({
          message: 'Garantia do produto já selecionada!',
          type: 'error',
        })
        return
      }

      const meToast = await selectedGuarantee({
        aggregationProductId,
        guaranteeId,
      })
      meToast && Toast(meToast)

      handleFlagAmountOldToUpdateCartInTheDatabase({
        cartItems,
        aggregationProductId,
      })
    } catch (error) {
      Toast({
        message: 'Erro na seleção da garantia do produto!',
        type: 'error',
      })
    }
  }

  function getGuaranteeIdOnGuaranteCompany(
    guarantees: IGuarantee[],
  ): string | undefined {
    const guaranteeId = guarantees.find(
      (item) => Number(item.price.price) === 0,
    )?.id

    return guaranteeId
  }

  async function handleRemoveGuarantee({
    aggregationProductId,
    oldGuaranteeId,
    guarantees,
  }: IHandleRemoveGuaranteeProps) {
    try {
      const guaranteeId =
        guarantees && getGuaranteeIdOnGuaranteCompany(guarantees)

      if (oldGuaranteeId && guaranteeId && oldGuaranteeId === guaranteeId) {
        Toast({
          message: 'Esse produto já está sem garantia estendida!',
          type: 'error',
        })
        return
      }

      const meToast = await removeGuarantee(aggregationProductId)
      Toast(meToast)

      handleFlagAmountOldToUpdateCartInTheDatabase({
        cartItems,
        aggregationProductId,
      })
    } catch (error) {
      Toast({
        message: 'Erro na alteração de quantidade da garantia do produto!',
        type: 'error',
      })
    }
  }
*/
  return {
    handleIncrementQuantity,
    handleDecrementQuantity,
    handleRemoveProduct,
  }
}
