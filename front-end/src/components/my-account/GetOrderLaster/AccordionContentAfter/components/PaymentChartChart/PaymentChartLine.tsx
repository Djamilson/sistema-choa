'use client'

import { fadeIn } from '@/_constants/variants'
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'

type IPaymentChartLineProps = {
  delay: number
  direction: string
}

export function PaymentChartLine({ delay, direction }: IPaymentChartLineProps) {
  const animationControls = useAnimation()

  useEffect(() => {
    const startAnimation = () => {
      animationControls.start({
        width: '100%',
      })
    }
    startAnimation()
  }, [animationControls]) // A matriz de dependência vazia garante que isso só seja executado uma vez

  return (
    <motion.div
      variants={fadeIn({ direction, delay })}
      initial="hidden"
      whileInView={'show'}
      viewport={{ once: false, amount: 0.6 }}
      className="inset-0 flex h-full items-center md:h-0 md:w-full"
    >
      {window.innerWidth <= 768 ? (
        <motion.div
          className="z-10 h-full border-l-2 border-gray-600 md:w-full md:border-l-0 md:border-t-2"
          initial={{ height: 0 }}
          animate={animationControls}
          whileInView={'show'}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 2 }}
        ></motion.div>
      ) : (
        <motion.div
          className="z-10 h-full border-l-2 border-gray-600 md:w-full md:border-l-0 md:border-t-2"
          initial={{ width: '0%' }}
          whileInView={'show'}
          animate={animationControls}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 2 }}
        ></motion.div>
      )}
    </motion.div>
  )
}
