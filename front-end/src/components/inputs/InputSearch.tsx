'use client'

import { FC } from 'react'
import { IconType } from 'react-icons'

interface InputProps {
  name: string
  value: string
  iconPrimary?: IconType
  label: string
  type?: string
  disabled?: boolean
  placeholder: string

  onChange?: (e: any) => void
}

const InputSearch: FC<InputProps> = ({
  name,
  placeholder = '',
  type = 'text',
  value = '',
  iconPrimary: IconPrimary,
  onChange,
}) => {
  return (
    <div className="relative w-full">
      {IconPrimary && (
        <div className="absolute left-4 top-3 border-2 border-b-0 border-l-0 border-t-0 border-gray-200 pr-2">
          <IconPrimary size={22} className={`text-accent`} />
        </div>
      )}
      <input
        id={name}
        placeholder={placeholder}
        type={type}
        value={value}
        autoComplete="off"
        className={`peer  w-full border bg-white p-2 pb-3 pt-2 font-light outline-none transition disabled:cursor-not-allowed disabled:opacity-70
                ${IconPrimary ? 'pl-14' : 'pl-4'}
                focus:border-accent`}
        onChange={onChange}
      />
    </div>
  )
}

export default InputSearch
