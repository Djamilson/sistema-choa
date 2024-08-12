'use client'

import cn from '@/utils/cn'
import { ElementType, TextareaHTMLAttributes, forwardRef } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { TextAreaFloat as TextArea } from '.'

interface ITextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  iconPrimary?: ElementType
  label: string
  disabled?: boolean
  required?: boolean
  register: UseFormRegister<any>
  errors: FieldErrors
  onChange?: (e: any) => void
  className?: string
}

export const TextAreaRoot = forwardRef<HTMLTextAreaElement, ITextAreaProps>(
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
      ...rest
    } = props

    const inputProps = { ...ref, ...rest }

    return (
      <div className="group relative w-full">
        {IconPrimary && (
          <TextArea.Icon icon={IconPrimary} errors={errors} name={name} />
        )}
        <textarea
          id={name}
          disabled={disabled}
          {...register(name, { required })}
          placeholder=" "
          className={cn(
            `peer w-full border bg-white p-2 pb-3 pt-2 font-light outline-none transition disabled:cursor-not-allowed disabled:opacity-70`,
            IconPrimary ? 'pl-14' : 'pl-4',
            errors[name] ? 'border-rose-500' : 'border-neutral-300',
            errors[name]
              ? 'focus:group-focus:border-rose-500'
              : 'focus:focus:border-sky-500',
            className,
          )}
          onChange={onChange}
          {...inputProps}
        />
        <TextArea.Label
          errors={errors}
          name={name}
          label={label}
          iconPrimary={IconPrimary}
        />
        {errors[name] && <TextArea.Errors errors={errors} name={name} />}
      </div>
    )
  },
)
