'use client'

import { MouseEvent } from 'react'
import { IconType } from 'react-icons'

interface ButtonProps {
  label: string
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  icon?: IconType
  rest?: string
  isLoading: boolean
}

const AvaliationButton = ({
  label,
  onClick,
  disabled,
  icon: Icon,
  isLoading,
  rest,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flex w-full items-center justify-center gap-1 px-2 py-2 text-sm font-light transition hover:text-gray-400 disabled:cursor-not-allowed disabled:opacity-70 ${rest}`}
    >
      {isLoading && (
        <span
          className="inline-block h-6 w-6 animate-spin rounded-full border-[3px] border-current border-t-transparent text-green-600"
          role="status"
          aria-label="loading"
        ></span>
      )}
      {Icon && !isLoading && <Icon size={24} className="" />}
      {!isLoading && label}
    </button>
  )
}

export { AvaliationButton }
