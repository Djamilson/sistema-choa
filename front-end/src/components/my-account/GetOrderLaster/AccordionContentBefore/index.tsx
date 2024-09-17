import Image from 'next/image'

type IAccordionContentBeforeProps = {
  // lastOrder?: IOrdersOnProducts | any
  lastOrder?: any
}

const AccordionContentBefore = ({
  lastOrder,
}: IAccordionContentBeforeProps) => {
  return (
    <>
      <h3 className="my-4 ml-2 font-medium">pedido entregue</h3>

      <div className="relative ml-6 pl-2 text-sm font-normal">
        <h3 className="my-4 font-medium">teste diofiosiod</h3>

        <div className="flex gap-3 border-b py-5 md:gap-5">
          <div className="aspect-square w-[50px] shrink-0 md:w-[120px]">
            <Image
              src={
                lastOrder?.aggregation_product?.thumbnail_url ||
                `/images/p1.png`
              }
              alt={
                lastOrder
                  ? lastOrder?.aggregation_product?.product.subcategory.name
                  : 'images'
              }
              width={120}
              height={120}
            />
          </div>

          <div className="flex w-full flex-col">
            <div className="flex flex-col justify-between gap-2 md:flex-row">
              <div className="flex-1 text-sm font-medium text-black/[0.5]">
                <span className="line-clamp-2 leading-tight">
                  {lastOrder?.aggregation_product?.product.subcategory.name}
                </span>
              </div>

              <div className="flex flex-col items-end">
                <p className="md:text-md text-sm font-semibold text-gray-500 dark:text-gray-400">
                  {lastOrder &&
                    lastOrder?.quantity > 1 &&
                    `${lastOrder?.quantity} unidades`}
                </p>

                <p className="md:text-md text-sm font-semibold text-gray-500 dark:text-gray-400">
                  {lastOrder &&
                    lastOrder.quantity === 1 &&
                    `${lastOrder.quantity} unidade`}
                </p>

                <div className="flex flex-row items-center justify-between gap-1 md:my-2">
                  jhkjhkj
                </div>
              </div>
            </div>

            <div className="text-md -ml-12 block font-medium text-black/[0.5] md:-mt-2 md:ml-0">
              khkjhkhjkhkh
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export { AccordionContentBefore }
