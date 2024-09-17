'use client'

import cn from '@/utils/cn'
import { ShieldAlert } from 'lucide-react'
import { Dispatch, ReactElement, SetStateAction } from 'react'
import { ToDigitInput } from '../ToDigitInput'
import { useSignUpCodeValidationForm } from './useSignUpCodeValidationForm'

type ISignUpCodeValidationForm = {
  children: ReactElement
  setEmail: Dispatch<SetStateAction<string>>
}

export default function SignUpCodeValidationForm({
  children,
  setEmail,
}: ISignUpCodeValidationForm) {
  const {
    handleOnPress,
    codeDigitsArray,
    ref,
    code,
    handleChangeText,
    handleOnBlur,
    isCodeCorrect,
    message,
    containerIsFocused,
    CELL_COUNT,
  } = useSignUpCodeValidationForm({
    setEmail,
  })

  return (
    <article className="w-full">
      <div className="flex w-full flex-col items-center">
        <div
          className="flex flex-1 justify-between p-4"
          onClick={handleOnPress}
        >
          {codeDigitsArray.map((_, idx) => {
            return (
              <ToDigitInput
                key={idx}
                cellCount={CELL_COUNT}
                code={code}
                containerIsFocused={containerIsFocused}
                idx={idx}
              />
            )
          })}
          <input
            ref={ref}
            value={code}
            onChange={handleChangeText}
            onBlur={handleOnBlur}
            className="absolute h-1 w-1 opacity-0"
            type="text"
          />
        </div>

        {message.length > 0 && (
          <div
            className={cn(
              `group mt-6 flex w-full border-s-4 p-2 hover:border-success hover:bg-green-50 dark:bg-red-800/30`,
              'border-accent bg-red-50',
            )}
            role="alert"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span
                  className={cn(
                    `inline-flex size-8 items-center justify-center rounded-full border-4 text-red-800 group-hover:border-green-100 group-hover:bg-green-200 dark:border-red-900 dark:bg-red-800 dark:text-red-400`,

                    'border-red-100 bg-red-200',
                  )}
                >
                  <ShieldAlert />
                </span>
              </div>
              <div className="ms-3">
                <h3
                  className={`font-semibold text-gray-800 group-hover:text-gray-600 dark:text-white`}
                >
                  Atenção
                </h3>

                <p className="text-sm text-gray-700 group-hover:text-gray-600 dark:text-gray-400">
                  {message}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {isCodeCorrect && <div className="mt-8 w-full">{children}</div>}
    </article>
  )
}
