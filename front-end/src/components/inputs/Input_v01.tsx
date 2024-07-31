'use client'

import clsx from 'clsx'
import { FC, InputHTMLAttributes } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  type?: string
  required?: boolean
  register: UseFormRegister<any>
  errors: FieldErrors
  disabled?: boolean
}

const Input: FC<InputProps> = ({
  label,
  name,
  register,
  required,
  errors,
  type = 'text',
  disabled,
  ...rest
}) => {
  return (
    <>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={name}
          type={type}
          disabled={disabled}
          {...register(name, { required })}
          className={clsx(
            `form-input block w-full  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6`,
            errors[name] && 'focus:ring-rose-500',
            disabled && 'cursor-default opacity-50',
          )}
          {...rest}
        />
      </div>
    </>
  )
}

export default Input
