'use client'

import {
  CheckCheckIcon,
  ClipboardSignatureIcon,
  FastForwardIcon,
  ThumbsUpIcon,
  TruckIcon,
} from 'lucide-react'
import Image from 'next/image'
import { ReactNode } from 'react'
import { PaymentChart } from './components/PaymentChartChart'

type IAccordionContentAfterProps = {
  // lastOrder?: IOrdersOnProducts
  lastOrder?: any
  children: ReactNode
}

const AccordionContentAfter = ({
  children,
  lastOrder,
}: IAccordionContentAfterProps) => {
  return (
    <div className="flex flex-col gap-6">
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
              khkjhkhjkhkh meu deus
            </div>
          </div>
        </div>
      </div>

      <div className="mb-5 mt-10 border-b pb-10">
        <PaymentChart.Root>
          <PaymentChart.Content>
            <PaymentChart.DateHour>
              <span>20/11/2023</span>
              <span className="text-xs italic text-gray-400">07:03</span>
            </PaymentChart.DateHour>

            <PaymentChart.Icon
              icon={FastForwardIcon}
              direction={window.innerWidth <= 768 ? 'down' : 'left'}
              delay={0.2}
            >
              <PaymentChart.VerticalLine
                direction={window.innerWidth <= 768 ? 'down' : 'right'}
                delay={0.4}
              />
            </PaymentChart.Icon>

            <PaymentChart.Label label={`pedido foi recebido`} />
          </PaymentChart.Content>

          <PaymentChart.Content>
            <PaymentChart.DateHour>
              <span>23/12/2020</span>
              <span className="text-xs italic text-gray-400">07:03</span>
            </PaymentChart.DateHour>
            <PaymentChart.Icon
              direction={window.innerWidth <= 768 ? 'down' : 'left'}
              delay={0.6}
              icon={CheckCheckIcon}
            >
              <PaymentChart.VerticalLine
                direction={window.innerWidth <= 768 ? 'down' : 'right'}
                delay={0.8}
              />
            </PaymentChart.Icon>
            <PaymentChart.Label label={`pagamento provado`} />
          </PaymentChart.Content>

          <PaymentChart.Content>
            <PaymentChart.DateHour>
              <span>20/11/2020</span>
              <span className="text-xs italic text-gray-400">07:03</span>
            </PaymentChart.DateHour>
            <PaymentChart.Icon
              direction={window.innerWidth <= 768 ? 'down' : 'left'}
              delay={1.0}
              icon={ClipboardSignatureIcon}
            >
              <PaymentChart.VerticalLine
                direction={window.innerWidth <= 768 ? 'down' : 'right'}
                delay={1.2}
              />
            </PaymentChart.Icon>
            <PaymentChart.Label label={`nota fiscal disponível`} />
          </PaymentChart.Content>

          <PaymentChart.Content>
            <PaymentChart.DateHour>
              <span>23/12/2020</span>
              <span className="text-xs italic text-gray-400">07:03</span>
            </PaymentChart.DateHour>
            <PaymentChart.Icon
              direction={window.innerWidth <= 768 ? 'down' : 'left'}
              delay={1.4}
              icon={TruckIcon}
            >
              <PaymentChart.VerticalLine
                direction={window.innerWidth <= 768 ? 'down' : 'right'}
                delay={1.6}
              />
            </PaymentChart.Icon>
            <PaymentChart.Label label={`em transito`} />
          </PaymentChart.Content>

          <PaymentChart.Content>
            <PaymentChart.DateHour>
              <span>23/12/2020</span>
              <span className="text-xs italic text-gray-400">07:03</span>
            </PaymentChart.DateHour>
            <PaymentChart.Icon
              direction={window.innerWidth <= 768 ? 'down' : 'left'}
              delay={1.8}
              icon={ThumbsUpIcon}
              className="h-6 w-6 text-green-600"
            />
            <PaymentChart.Label label={`oooba! pedido entregue`} />
          </PaymentChart.Content>
        </PaymentChart.Root>
      </div>

      <div className="relative ml-6 pl-2 text-sm font-normal">{children}</div>
    </div>
  )
}

export { AccordionContentAfter }
