'use client'

import cn from '@/utils/cn'
import { ElementType } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import InputMask from 'react-input-mask'
import { InputFloatMask } from '.'

interface IInputRootProps {
  name: string
  iconPrimary?: ElementType
  label: string
  type?: string
  disabled?: boolean
  required?: boolean
  register: UseFormRegister<any>
  errors: FieldErrors
  onChange?: (e: any) => void
  className?: string
  mask: any
}

// https://codesandbox.io/p/sandbox/brava-react-masked-input-8xe2p?file=%2Fsrc%2FMaskedInput.js%3A11%2C25

export function InputRoot({
  name,
  label,
  errors,
  disabled,
  required,
  register,
  iconPrimary: IconPrimary,
  onChange,
  className,
  type,
  mask,
}: IInputRootProps) {
  return (
    <div className="group relative w-full">
      {IconPrimary && (
        <InputFloatMask.Icon icon={IconPrimary} errors={errors} name="email" />
      )}
      <InputMask
        id={name}
        mask={mask}
        disabled={disabled}
        {...register(name, { required })}
        placeholder=" "
        type={type}
        className={cn(
          `peer w-full border bg-white p-2 pb-3 pt-2 font-light shadow-sm outline-none transition placeholder:italic placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-70`,
          IconPrimary ? 'pl-14' : 'pl-4',
          errors[name] ? 'border-rose-500' : 'border-neutral-300',
          errors[name]
            ? 'focus:group-focus:border-rose-500'
            : 'focus:focus:border-sky-500',
          className,
        )}
        onChange={onChange}
        pattern="[0-9]*"
        inputMode="numeric"
      />
      <InputFloatMask.Label
        errors={errors}
        name={name}
        label={label}
        iconPrimary={IconPrimary}
      />
      {errors[name] && <InputFloatMask.Errors errors={errors} name={name} />}
    </div>
  )
}
