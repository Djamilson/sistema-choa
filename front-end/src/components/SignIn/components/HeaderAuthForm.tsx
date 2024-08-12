'use client'

import { fadeIn } from '@/_constants/variants'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Balance from 'react-wrap-balancer'

export default function HeaderAuthForm() {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <motion.div
        variants={fadeIn({ direction: 'down', delay: 0.2 })}
        initial="hidden"
        whileInView={'show'}
        viewport={{ once: false, amount: 0.6 }}
        className="mt-6 px-2 text-center text-lg font-bold tracking-tight text-gray-600 md:text-2xl"
      >
        <Image
          height="58"
          width="58"
          className="mx-auto w-auto"
          src="/images/logo.png"
          alt="Logo"
          priority
        />
      </motion.div>

      <motion.h3
        variants={fadeIn({ direction: 'down', delay: 0.4 })}
        initial="hidden"
        whileInView={'show'}
        viewport={{ once: false, amount: 0.6 }}
        className="mt-6 px-2 text-center text-lg font-bold tracking-tight text-gray-600 md:text-2xl"
      >
        <Balance>
          <span className="text-accent">Estamos quase lá.</span>
          <span className="ml-2 font-normal">
            Faça seu login para começar uma experiência incrível.
          </span>
        </Balance>
      </motion.h3>
    </div>
  )
}
