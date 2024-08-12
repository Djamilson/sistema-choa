'use client'

import { fadeInLogoHome } from '@/_constants/variants'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Balance from 'react-wrap-balancer'

interface IHeaderLogoProps {
  href: string
  urlLogo: string
}

export function HeaderLogo({ href, urlLogo }: IHeaderLogoProps) {
  return (
    <Link href={href} className="z-30 m-0 p-0">
      <div className="flex min-h-full flex-col justify-center py-0">
        <div className="flex-col-2 flex sm:mx-auto sm:w-full sm:max-w-md">
          <motion.div
            variants={fadeInLogoHome({ direction: 'right', delay: 0.2 })}
            initial="hidden"
            whileInView={'show'}
            viewport={{ once: false, amount: 0.6 }}
            className="mt-1 px-2 text-center text-lg font-bold tracking-tight text-gray-600 md:text-2xl"
          >
            <Image
              height="50"
              width="50"
              className="mx-auto w-auto shadow-sm"
              src={urlLogo || '/images/logo.png'}
              alt="Logo"
              priority
            />
          </motion.div>

          <motion.h3
            variants={fadeInLogoHome({ direction: 'down', delay: 0.4 })}
            initial="hidden"
            whileInView={'show'}
            viewport={{ once: false, amount: 0.6 }}
            className="mt-4 px-0 text-center text-lg font-bold tracking-tight text-gray-600 md:text-2xl"
          >
            <Balance>
              <span className="text-white">Choa</span>
              <span className="ml-2 font-semibold text-orangermy">2024</span>
            </Balance>
          </motion.h3>
        </div>
      </div>
    </Link>
  )
}
