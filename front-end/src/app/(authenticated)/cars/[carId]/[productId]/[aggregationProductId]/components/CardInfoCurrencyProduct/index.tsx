'use client'

import {
  IAggregationProductDetailEcommerce,
  IProductEcommerce,
} from '@/@model/product/product'
import AddToCartButton from '@/components/buttons/AddToCartButton'
import { BsFillBasket2Fill } from 'react-icons/bs'
import { Freight } from '../../../../../../../components/Freight'
import { Hr } from '../../../../../../../components/Hr'
import { ButtonSale } from '../../../../../../../components/buttons/ButtonSale'
import ConfirmationAddAggregationProductForCartModal from '../ConfirmationAddAggregationProductForCartModal '
import { useCardInfoCurrencyProduct } from './useCardInfoCurrencyProduct'

type IPageProps = {
  productId: string
  selectedAggregationProduct: IAggregationProductDetailEcommerce
  product: IProductEcommerce
}

function CardInfoCurrencyProduct({
  productId,
  selectedAggregationProduct,
  product,
}: IPageProps) {
  const {
    isOpenConfirmationAddAggregationProductForCartModal,
    closeConfirmationAddAggregationProductForCartModal,
    handleOpenModalAddAggregationProduct,
    handleNavAddSelectedGuarantee,
    handlePrefetchAggregationProductByAggregationProductId,
  } = useCardInfoCurrencyProduct({
    productId,
    selectedAggregationProduct,
    product,
  })

  return (
    <div className="right-0 flex w-full flex-col bg-white px-4 py-4 md:w-[480px] md:px-6">
      <div className="flex items-center justify-between text-xl font-bold text-zinc-500">
        {Number(selectedAggregationProduct?.price?.price_promotion) > 0 &&
          selectedAggregationProduct?.price.price_promotion_format}
        {Number(selectedAggregationProduct?.price?.price_promotion) < 0.1 &&
          selectedAggregationProduct?.price?.price_format}
        <p className="ml-2 text-xl font-bold text-accent">
          veem
          <span className="ml-2 text-lg text-neutral-500">Comigo</span>
        </p>
      </div>

      <div className="mt-4 flex flex-row items-center justify-between gap-1">
        <span
          className={`text-[12px] font-normal tracking-normal line-through ${
            selectedAggregationProduct?.price?.price_promotion !== 0
              ? 'text-neutral-500'
              : 'text-white'
          }`}
        >
          {Number(selectedAggregationProduct?.price?.price_promotion) > 0 &&
            selectedAggregationProduct?.price?.price_format}
        </span>
        <span className="">
          {Number(selectedAggregationProduct?.price?.price_promotion) > 0 && (
            <span className="ml-auto mr-3 flex rounded-full bg-green-500 px-2 py-1 text-[10px] font-medium uppercase text-white">
              Promoção
            </span>
          )}
        </span>
      </div>

      <div className="mt-2 flex flex-row items-center">
        <p className="text-[12px] font-normal leading-4 tracking-normal text-stone-400 ">
          {`${selectedAggregationProduct?.price?.number_times_sale?.numberVez} de ${selectedAggregationProduct?.price?.number_times_sale?.price} sem juros no cartão de crédito`}
        </p>
      </div>

      <div className="mt-6 flex justify-center">
        <span className="text-sm text-neutral-500">
          mais formas de pagamento
        </span>
      </div>

      <Hr />
      <Freight status_freight={true} />

      <div className="item mt-8 flex justify-center">
        <span className="text-right text-sm font-normal text-neutral-500 ">
          mais formas de entrega
        </span>
      </div>

      <Hr />
      <div className="flex items-center">
        {selectedAggregationProduct && selectedAggregationProduct?.id && (
          <ConfirmationAddAggregationProductForCartModal
            handleNavAddSelectedGuarantee={handleNavAddSelectedGuarantee}
            selectedAggregationProduct={selectedAggregationProduct}
            isOpen={isOpenConfirmationAddAggregationProductForCartModal}
            onClose={closeConfirmationAddAggregationProductForCartModal}
          />
        )}
        <ButtonSale
          icon={BsFillBasket2Fill}
          onClick={handleOpenModalAddAggregationProduct}
          onMouseEnter={() =>
            handlePrefetchAggregationProductByAggregationProductId()
          }
        >
          comprar
        </ButtonSale>
        <AddToCartButton
          onClick={handleOpenModalAddAggregationProduct}
          urlImage={'/images/placeholder.jpg'}
        />
        <div
          className={`fixed bottom-4 left-0 z-10 w-full transform md:hidden`}
        >
          <div className="border border-gray-200 bg-white p-2 shadow-md ">
            <div className="w-full items-center justify-between ">
              <ButtonSale
                icon={BsFillBasket2Fill}
                onClick={handleOpenModalAddAggregationProduct}
                onMouseEnter={() =>
                  handlePrefetchAggregationProductByAggregationProductId()
                }
              >
                comprar
              </ButtonSale>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { CardInfoCurrencyProduct }
