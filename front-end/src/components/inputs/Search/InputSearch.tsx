'use client'

import { Search } from '@/components/inputs/Search'
import cn from '@/utils/cn'
import { ElementType, InputHTMLAttributes } from 'react'

interface IInputSearchProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  value?: string
  iconPrimary?: ElementType
  iconSecond?: ElementType
  type?: string
  onChange?: (e: any) => void
  className?: string
}

export function InputSearch({
  name,
  onChange,
  iconPrimary: IconPrimary,
  className,
  iconSecond: IconSecond,
  value,
  type = 'text',
  ...rest
}: IInputSearchProps) {
  return (
    <div className="group relative w-full max-w-md">
      {IconPrimary && (
        <Search.Icon icon={IconPrimary} className="left-4 border-r-2 pr-2" />
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={cn(
          `peer w-full border border-neutral-300 bg-white px-2 py-[6px] font-light outline-none transition focus:focus:border-sky-500 disabled:cursor-not-allowed disabled:opacity-70`,
          IconPrimary ? 'pl-14' : 'pl-4',
          IconSecond ? 'pr-14' : 'pr-4',
          className,
        )}
        {...rest}
      />
      {IconSecond && (
        <Search.Icon icon={IconSecond} className="right-4 border-l-2 pl-2" />
      )}
    </div>
  )
}
