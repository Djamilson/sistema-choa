import { Accordion } from '@/components/Accordion'
import {
  IAggregationProductCart,
  IUpdateQuantity,
} from '@/contexts/useCartStore'
import Image from 'next/image'
import Link from 'next/link'
import { RiDeleteBin6Line } from 'react-icons/ri'

type IBasketItemProps = {
  handleIncrementQuantity: ({
    aggregationProductId,
  }: IUpdateQuantity) => Promise<void>
  handleDecrementQuantity: ({
    aggregationProductId,
  }: IUpdateQuantity) => Promise<void>
  item: IAggregationProductCart
  handleRemoveProduct: (aggregationProductId: string) => Promise<void>
}

const BasketItem = ({
  handleDecrementQuantity,
  handleIncrementQuantity,
  handleRemoveProduct,
  item,
}: IBasketItemProps) => {
  return (
    <div className="flex gap-3 border-b py-5 md:gap-5">
      <div className="aspect-square w-[50px] shrink-0 md:w-[120px]">
        <Image
          src={item.aggregationProduct?.photos[0].photo_url || `/images/p1.png`}
          alt={item.aggregationProduct?.product?.subcategory.name}
          width={120}
          height={120}
        />
      </div>

      <div className="flex w-full flex-col">
        <div className="flex flex-col justify-between gap-2 md:flex-row">
          <Link
            href={`/product-detail/${item.productId}/${item.aggregationProduct.id}`}
            className="w-full max-w-lg cursor-pointer transition-shadow duration-300 ease-in-out hover:transform hover:underline hover:underline-offset-4 sm:flex md:mr-8"
          >
            <div className="flex-1 text-sm font-medium text-black/[0.5]">
              <span className="line-clamp-2 leading-tight">
                {item.aggregationProduct?.product?.subcategory.name}
              </span>
            </div>
          </Link>

          <div className="flex flex-col items-end">
            <p className="md:text-md text-sm font-semibold text-gray-500 dark:text-gray-400">
              {Number(item.aggregationProduct?.price?.price_promotion) > 0 &&
                item.aggregationProduct?.price.price_promotion_format}
              {Number(item.aggregationProduct?.price?.price_promotion) < 0.1 &&
                item.aggregationProduct?.price?.price_format}
            </p>

            <div className="flex flex-row items-center justify-between gap-1 md:my-2">
              <span className="">
                {Number(item.aggregationProduct?.price?.price_promotion) >
                  0 && (
                  <span className="flex rounded-full bg-green-500 px-2 py-1 text-[10px] font-medium uppercase text-white">
                    Promoção
                  </span>
                )}
              </span>
              <span
                className={`text-[12px] font-normal tracking-normal line-through ${
                  item.aggregationProduct?.price?.price_promotion !== 0
                    ? 'text-neutral-500'
                    : 'text-white'
                }`}
              >
                {Number(item.aggregationProduct?.price?.price_promotion) > 0 &&
                  item.aggregationProduct?.price?.price_format}
              </span>
            </div>
          </div>
        </div>

        <div className="text-md -ml-12 block font-medium text-black/[0.5] md:-mt-2 md:ml-0">
          <Accordion title={`Seguros/garantias`}>
            <div className="flex flex-col md:mt-2">
              The clsx function can take any number of arguments, each of which
              can be an Object, Array, Boolean, or String.
            </div>
          </Accordion>
        </div>

        <div className="-ml-12 mt-4 flex items-center justify-between md:ml-0">
          <div className="md:text-md flex-col items-center gap-2 text-sm text-black/[0.5] md:flex md:flex-row md:gap-10">
            <div className="flex items-center gap-1">
              <div className="font-semibold">Quantidade:</div>
              <div className="focus:shadow-outline group flex items-center justify-center gap-2 border-[1px] border-gray-200 ring-0 ring-offset-accent transition-all duration-150 hover:border-accent hover:ring-1 hover:ring-red-400 hover:ring-offset-1 hover:ring-offset-white focus:outline-none">
                <button
                  className="flex-shrink-0 p-2 text-base text-zinc-500 hover:scale-110 hover:text-accent"
                  onClick={() =>
                    handleDecrementQuantity({
                      aggregationProductId: item.aggregationProduct.id,
                    })
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.25 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <span>
                  {item.totalInStock < 1 && 0}
                  {item.totalInStock > 0 && item.amount}
                </span>
                <button
                  onClick={() =>
                    handleIncrementQuantity({
                      aggregationProductId: item.aggregationProduct.id,
                    })
                  }
                  className="flex-shrink-0 p-2 text-base text-zinc-500 hover:scale-110 hover:text-accent"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {item.aggregationProduct?.size_product.description !==
              'DEFAULT' && (
              <div className="flex items-center gap-1">
                <div className="font-semibold">Tamanho:</div>
                <div className="font-semibold">
                  {item.aggregationProduct.size_product.description}
                </div>
              </div>
            )}
            {item.aggregationProduct?.color_product.color !== 'DEFAULT' && (
              <div className="flex items-center gap-1">
                <div className="font-semibold">cor:</div>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor:
                      item.aggregationProduct.color_product.color,
                    display: 'inline-block',
                  }}
                ></div>
              </div>
            )}
          </div>
          <RiDeleteBin6Line
            onClick={() => handleRemoveProduct(item.aggregationProduct.id)}
            className="cursor-pointer text-[16px] text-black/[0.5] hover:text-black md:text-[20px]"
          />
        </div>
      </div>
    </div>
  )
}

export default BasketItem
