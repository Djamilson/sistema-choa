import { fadeInLogoHome } from '@/_constants/variants'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

type IInputSearchRoot = {
  children: ReactNode
}
export function InputSearchRoot({ children }: IInputSearchRoot) {
  return (
    <div className="-mt-4 flex w-full max-w-xl">
      <div className="w-full sm:mx-auto">
        <motion.div
          variants={fadeInLogoHome({ direction: 'down', delay: 0.2 })}
          initial="hidden"
          whileInView={'show'}
          viewport={{ once: false, amount: 0.6 }}
          className="mt-10"
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
