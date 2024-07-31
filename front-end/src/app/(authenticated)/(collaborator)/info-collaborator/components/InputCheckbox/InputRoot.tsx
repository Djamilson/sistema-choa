'use client'

import { ElementType, InputHTMLAttributes } from 'react'
import { InputCheckbox } from '.'
import cn from '@/utils/cn'

interface IInputRootProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  iconPrimary?: ElementType
  label: string
  type?: string
  disabled?: boolean
  onChange?: (e: any) => void
  className?: string
}

export function InputRoot({
  name,
  label,
  disabled,
  iconPrimary: IconPrimary,
  onChange,
  className,
  type,
  ...rest
}: IInputRootProps) {
  return (
    <div className="group relative flex w-full max-w-md items-center justify-start gap-4 gap-x-3">
      <div className="flex h-6 items-center">
        <input
          id={name}
          disabled={disabled}
          type={type}
          className={cn(
            `h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600`,
            IconPrimary ? 'pl-14' : 'pl-4',
            className,
          )}
          onChange={onChange}
          {...rest}
        />
      </div>
      <div className="text-sm leading-6">
        <InputCheckbox.Label name={name} label={label} />
      </div>
    </div>
  )
}
