import cn from '@/utils/cn'
import { ElementType } from 'react'
import { FieldErrors } from 'react-hook-form'

interface IInputLabelProps {
  errors: FieldErrors
  label: string
  name: string
  iconPrimary?: ElementType
  masker?: string
  classNameLabel?: string
  classNameLabelPeerPlaceholder?: string
}

export function InputLabel({
  label,
  errors,
  iconPrimary,
  name,
  masker,
  classNameLabel,
  classNameLabelPeerPlaceholder,
}: IInputLabelProps) {
  return (
    <label
      htmlFor={name}
      className={cn(
        `text-md absolute top-5 z-10 origin-[0] transform duration-150`,
        iconPrimary || masker ? classNameLabel || `left-2` : 'left-4',
        `-translate-y-11`,
        iconPrimary || masker ? `-translate-x-2` : '-translate-x-4',
        iconPrimary || masker
          ? classNameLabelPeerPlaceholder ||
              `peer-placeholder-shown:translate-x-12`
          : 'peer-placeholder-shown:translate-x-0',
        `peer-placeholder:italic peer-placeholder:text-slate-400 peer-placeholder-shown:-translate-y-2 peer-placeholder-shown:scale-100`,

        iconPrimary || masker
          ? `peer-focus:-translate-x-2 peer-focus:text-xl`
          : 'peer-focus:-translate-x-4',
        `peer-focus:-translate-y-11 peer-focus:scale-75`,
        errors[name] ? 'text-rose-500' : 'text-neutral-500',
      )}
    >
      {label}
    </label>
  )
}
/*
className={cn(
        `text-md absolute top-5 -z-50 origin-[0] -translate-y-11 transform duration-150 peer-placeholder-shown:-translate-y-2 peer-placeholder-shown:scale-100 peer-focus:-translate-y-11 peer-focus:scale-75`,
        iconPrimary
          ? 'left-2 -translate-x-2 peer-placeholder-shown:translate-x-12 peer-focus:-translate-x-2'
          : 'left-4 -translate-x-4 peer-placeholder-shown:translate-x-0 peer-focus:-translate-x-4',
        errors[name] ? 'text-rose-500' : 'text-neutral-500',
      )}
*/
