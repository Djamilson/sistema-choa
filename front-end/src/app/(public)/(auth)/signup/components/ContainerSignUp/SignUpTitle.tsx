'use client'

import { fadeIn } from '@/_constants/variants'
import { motion } from 'framer-motion'
import { ReactElement } from 'react'
import Balance from 'react-wrap-balancer'

interface ISignUpTitle {
  children: ReactElement
  icon: ReactElement
}
export function SignUpTitle({ children, icon: Icon }: ISignUpTitle) {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <motion.div
        variants={fadeIn({ direction: 'down', delay: 0.2 })}
        initial="hidden"
        whileInView={'show'}
        viewport={{ once: false, amount: 0.6 }}
        className="px-2 text-center text-lg font-bold tracking-tight text-gray-600 md:text-2xl"
      >
        <div className="mt-4 flex items-center justify-center gap-x-2">
          {Icon}
        </div>
      </motion.div>

      <motion.h3
        variants={fadeIn({ direction: 'down', delay: 0.4 })}
        initial="hidden"
        whileInView={'show'}
        viewport={{ once: false, amount: 0.6 }}
        className="mt-6 px-2 text-center text-lg font-bold tracking-tight text-gray-600 md:text-2xl"
      >
        <Balance>{children}</Balance>
      </motion.h3>
    </div>
  )
}
