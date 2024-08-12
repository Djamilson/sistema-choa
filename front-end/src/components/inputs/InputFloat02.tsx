'use client'

import { FC } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { IconType } from 'react-icons'

interface InputProps {
  name: string
  iconPrimary?: IconType
  label: string
  type?: string
  disabled?: boolean
  required?: boolean
  register: UseFormRegister<any>
  errors: FieldErrors
}

const InputFloat: FC<InputProps> = ({
  name,
  label,
  type = 'text',
  disabled,
  iconPrimary: IconPrimary,
  register,
  required,
  errors,
}) => {
  return (
    <div className="relative w-full">
      {IconPrimary && (
        <div className="absolute left-4 top-3 border-2 border-b-0 border-l-0 border-t-0 border-gray-200 pr-2">
          <IconPrimary
            size={22}
            className={`${errors[name] ? 'text-rose-500' : 'text-neutral-500'}`}
          />
        </div>
      )}
      <input
        id={name}
        disabled={disabled}
        {...register(name, { required })}
        placeholder=" "
        type={type}
        className={`peer w-full border-0 border-b-2 border-gray-300 bg-white p-2 pb-3 pt-2 font-light text-gray-900 placeholder-transparent outline-none transition focus:border-rose-600 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70
                ${IconPrimary ? 'pl-14' : 'pl-4'}
                ${errors[name] ? 'border-rose-500' : 'border-neutral-300'}
                ${
                  errors[name] ? 'focus:border-rose-500' : 'focus:border-black'
                }`}
      />
      <label
        className={`text-md absolute top-5 z-10 origin-[0] transform duration-150
                 ${IconPrimary ? 'left-2' : 'left-4'}

                  -translate-y-11
                   ${IconPrimary ? `-translate-x-2` : '-translate-x-4'}
                   ${
                     IconPrimary
                       ? `peer-placeholder-shown:translate-x-12`
                       : 'peer-placeholder-shown:translate-x-0'
                   }
                  peer-placeholder-shown:-translate-y-2
                  peer-placeholder-shown:scale-100
                  ${
                    IconPrimary
                      ? `peer-focus:-translate-x-2`
                      : 'peer-focus:-translate-x-4'
                  }
                  peer-focus:-translate-y-11
                  peer-focus:scale-75
                  ${errors[name] ? 'text-rose-500' : 'text-neutral-500'}`}
      >
        {label}
      </label>
      {errors[name] && (
        <p className="mt-2 text-xs italic text-accent">
          <>{errors[name]?.message}</>
        </p>
      )}
    </div>
  )
}

export default InputFloat
