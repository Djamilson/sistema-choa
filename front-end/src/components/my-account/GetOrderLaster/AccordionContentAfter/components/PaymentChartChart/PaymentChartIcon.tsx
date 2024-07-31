'use client'

import { fadeIn } from '@/_constants/variants'
import cn from '@/utils/cn'
import { motion } from 'framer-motion'
import { ElementType, ReactNode, useEffect, useState } from 'react'

interface IPaymentChartIconProps {
  icon: ElementType
  className?: string
  children?: ReactNode
  direction: string
  delay: number
}

export function PaymentChartIcon({
  icon: Icon,
  className,
  children,
  direction,
  delay,
}: IPaymentChartIconProps) {
  const [myDirection, setMyDirection] = useState<string>('left')

  useEffect(() => {
    setMyDirection(direction)
  }, [direction])

  return (
    <div className="relative z-20 flex h-24 cursor-pointer flex-col items-center justify-start md:left-12 md:w-full md:flex-row md:items-center lg:left-14">
      <motion.div
        variants={fadeIn({ direction: myDirection, delay })}
        initial="hidden"
        whileInView={'show'}
        viewport={{ once: false, amount: 0.6 }}
        className="relative flex flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-red-100 p-1 hover:bg-black/[0.05]"
      >
        <div className="mx-auto mt-0 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <Icon
            className={cn('h-6 w-6 text-accent', className)}
            aria-hidden="true"
          />
        </div>
      </motion.div>
      {children}
    </div>
  )
}
