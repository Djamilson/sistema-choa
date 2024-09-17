'use client'

import cn from '@/utils/cn'
import { CornerLeftDown } from 'lucide-react'
import { FC } from 'react'
import { IconType } from 'react-icons'

interface InputProps {
  name: string
  iconPrimary?: IconType
  label: string
  type?: string
  disabled?: boolean
  required?: boolean
  value?: string
  error: boolean
  onChange?: (e: any) => void
}

const InputMask: FC<InputProps> = ({
  name,
  label,
  value,
  type = 'text',
  disabled,
  iconPrimary: IconPrimary,
  error,
  onChange,
}) => {
  return (
    <div className="relative flex w-full">
      {IconPrimary && (
        <div className="absolute left-4 top-3 border-2 border-b-0 border-l-0 border-t-0 border-gray-200 pr-2">
          <IconPrimary
            size={22}
            className={`${error ? 'text-rose-500' : 'text-neutral-500'}`}
          />
        </div>
      )}

      <input
        id={name}
        disabled={disabled}
        placeholder=" "
        type={type}
        value={value}
        className={cn(
          `peer w-full border bg-white p-2 pb-3 pt-2 font-light outline-none transition disabled:cursor-not-allowed disabled:opacity-70`,
          IconPrimary ? 'pl-14' : 'pl-4',
          error
            ? 'border-rose-500 focus:group-focus:border-rose-500'
            : 'border-neutral-300 focus:focus:border-sky-500',
        )}
        onChange={onChange}
      />

      <label
        htmlFor={name}
        className={cn(
          `text-md absolute top-5 z-10 origin-[0] transform duration-150`,
          IconPrimary ? 'left-2' : 'left-4',
          `-translate-y-11`,
          IconPrimary ? `-translate-x-2` : '-translate-x-4',
          IconPrimary
            ? `peer-placeholder-shown:translate-x-12`
            : 'peer-placeholder-shown:translate-x-0',
          `peer-placeholder-shown:-translate-y-2 peer-placeholder-shown:scale-100`,
          IconPrimary
            ? `peer-focus:-translate-x-2`
            : 'peer-focus:-translate-x-4',
          `peer-focus:-translate-y-11 peer-focus:scale-75`,
          error ? 'text-rose-500' : 'text-neutral-500',
        )}
      >
        {label}
      </label>
      {error && (
        <div className="absolute right-0 flex -translate-y-6 flex-row gap-2 text-xs italic text-accent">
          <CornerLeftDown className="h-4 w-4" />
          <span>
            <>{`CEP inválido`}</>
          </span>
        </div>
      )}
    </div>
  )
}

export default InputMask
