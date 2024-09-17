'use client'

import { fadeIn } from '@/_constants/variants'
import cn from '@/utils/cn'
import { motion } from 'framer-motion'
import { BookTextIcon, LucideIcon, MailCheck, QrCode } from 'lucide-react'
import CountUp from 'react-countup'
import { AiOutlineHistory } from 'react-icons/ai'
import ProcessIndicatorItem from '../ProcessIndicatorItem'
import ProcessIndicatorProgressBarLine from '../ProcessIndicatorProgressbarLine'

type IProgressIndicatorProps = {
  currentStep: number
  icon?: LucideIcon
  handlerCurrentStep?: (value: number) => void
}

const ProgressIndicator = ({
  currentStep,
  handlerCurrentStep,
}: IProgressIndicatorProps) => {
  return (
    <div className="flex w-full flex-col items-center px-6">
      <div className="flex w-full items-center justify-between">
        <motion.div
          variants={fadeIn({ direction: 'right', delay: 0.4 })}
          initial="hidden"
          whileInView={'show'}
          viewport={{ once: false, amount: 0.4 }}
          className={cn(
            `relative flex w-full flex-row items-center justify-center`,
            currentStep > 1 ? 'text-white' : 'text-green-600',
          )}
          onClick={() => handlerCurrentStep && handlerCurrentStep(1)}
        >
          <ProcessIndicatorItem
            currentStep={currentStep}
            title="Email"
            value={1}
          >
            {currentStep > 1 ? (
              <MailCheck className={`text-xl text-accent`} />
            ) : (
              <CountUp end={1} />
            )}
          </ProcessIndicatorItem>

          <motion.div
            variants={fadeIn({ direction: 'right', delay: 0.6, size: 40 })}
            initial="hidden"
            whileInView={'show'}
            viewport={{ once: false, amount: 0.6 }}
            className={`mt-6 flex w-full flex-1`}
          >
            <ProcessIndicatorProgressBarLine
              currentStep={currentStep}
              value={1}
            />
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeIn({ direction: 'right', delay: 0.8 })}
          initial="hidden"
          whileInView={'show'}
          viewport={{ once: false, amount: 0.6 }}
          className={cn(
            `relative flex w-full flex-row items-center justify-center`,
            currentStep > 2
              ? 'text-white'
              : currentStep === 2
                ? 'text-green-600'
                : 'text-gray-300',
          )}
          onClick={() => handlerCurrentStep && handlerCurrentStep(2)}
        >
          <ProcessIndicatorItem
            currentStep={currentStep}
            title="Valida código"
            value={2}
          >
            {currentStep > 2 ? (
              <QrCode className={`text-xl text-accent`} />
            ) : (
              <CountUp end={2} />
            )}
          </ProcessIndicatorItem>

          <motion.div
            variants={fadeIn({ direction: 'right', delay: 1, size: 40 })}
            initial="hidden"
            whileInView={'show'}
            viewport={{ once: false, amount: 0.6 }}
            className="-ml-2 mt-6 flex w-full flex-1"
          >
            <ProcessIndicatorProgressBarLine
              currentStep={currentStep}
              value={2}
            />
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeIn({ direction: 'right', delay: 1.2 })}
          initial="hidden"
          whileInView={'show'}
          viewport={{ once: false, amount: 0.6 }}
          className={cn(
            `relative -ml-0 flex w-full flex-row items-center justify-center`,
            currentStep > 3
              ? 'text-white'
              : currentStep === 3
                ? 'text-green-600'
                : 'text-gray-300',
          )}
          onClick={() => handlerCurrentStep && handlerCurrentStep(3)}
        >
          <ProcessIndicatorItem
            currentStep={currentStep}
            title="Dados"
            value={3}
          >
            {currentStep > 3 ? (
              <BookTextIcon className={`text-2xl text-accent`} />
            ) : (
              <CountUp end={3} />
            )}
          </ProcessIndicatorItem>

          <motion.div
            variants={fadeIn({ direction: 'right', delay: 1.4, size: 40 })}
            initial="hidden"
            whileInView={'show'}
            viewport={{ once: false, amount: 0.6 }}
            className="-ml-3 mt-6 flex w-full flex-1"
          >
            <ProcessIndicatorProgressBarLine
              currentStep={currentStep}
              value={3}
            />
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeIn({ direction: 'right', delay: 1.6 })}
          initial="hidden"
          whileInView={'show'}
          viewport={{ once: false, amount: 0.6 }}
          className={cn(
            `relative -m-10 flex w-1/3 flex-row items-center justify-start`,
            currentStep === 4 ? 'text-green-600' : 'text-gray-300',
          )}
          onClick={() => handlerCurrentStep && handlerCurrentStep(4)}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-center text-sm">Sucesso</span>
            <span className="relative flex flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-red-100 p-1 hover:bg-black/[0.05]">
              <span
                className={cn(
                  `mx-auto mt-0 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-8 sm:w-8`,
                  currentStep > 4
                    ? 'bg-red-200 text-accent'
                    : 'bg-gray-200 text-gray-400',
                )}
              >
                {currentStep > 4 ? (
                  <AiOutlineHistory className={`text-xl text-accent`} />
                ) : (
                  <CountUp end={4} />
                )}
              </span>
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProgressIndicator
