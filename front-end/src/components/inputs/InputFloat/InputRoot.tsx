'use client'

import cn from '@/utils/cn'
import { ElementType, InputHTMLAttributes, forwardRef } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { InputFloat } from '.'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
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
  errorTop?: boolean
  masker?: string
  classNameLabel?: string
  classNameLabelPeerPlaceholder?: string
}

export const InputRoot = forwardRef<HTMLInputElement, IInputProps>(
  function ForwardedInput(props, ref) {
    const {
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
      masker,
      classNameLabel,
      classNameLabelPeerPlaceholder,
      errorTop = true,
      ...rest
    } = props

    const inputProps = { ...ref, ...rest }

    return (
      <div
        className={cn(
          `group relative w-full`,
          errorTop && errors[name] ? '' : 'mb-4',
        )}
      >
        {IconPrimary && (
          <InputFloat.Icon icon={IconPrimary} errors={errors} name={name} />
        )}
        {masker && (
          <InputFloat.Masker errors={errors} name={name} masker={masker} />
        )}
        <input
          id={name}
          disabled={disabled}
          {...register(name, {
            required,
          })}
          placeholder=" "
          type={type}
          className={cn(
            `peer w-full border bg-white p-2 pb-3 pt-2 font-light shadow-sm outline-none transition placeholder:italic placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-70`,
            IconPrimary || masker ? 'pl-14' : 'pl-4',
            errors[name] ? 'border-rose-500' : 'border-neutral-300',
            errors[name]
              ? 'focus:group-focus:border-rose-500'
              : 'focus:focus:border-sky-500',
            className,
            disabled && `bg-neutral-100 disabled:opacity-70`,
          )}
          onChange={onChange}
          {...inputProps}
        />
        <InputFloat.Label
          errors={errors}
          name={name}
          label={label}
          iconPrimary={IconPrimary}
          masker={masker}
          classNameLabel={classNameLabel}
          classNameLabelPeerPlaceholder={classNameLabelPeerPlaceholder}
        />
        {errors[name] && (
          <InputFloat.Errors errors={errors} name={name} errorTop={errorTop} />
        )}
      </div>
    )
  },
)
