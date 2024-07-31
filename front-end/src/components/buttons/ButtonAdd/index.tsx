'use client'

import { MouseEvent } from 'react'
import { IconType } from 'react-icons'

interface ButtonProps {
  label: string
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  icon?: IconType
}

const ButtonAdd = ({ label, onClick, disabled, icon: Icon }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`focus:shadow-outline relative h-12 w-56 whitespace-nowrap  border border-accent py-2 text-sm font-medium text-accent shadow-sm ring-0 transition-all duration-150 hover:border-gray-200 hover:bg-accent hover:text-white hover:opacity-80 hover:ring-2 hover:ring-accent hover:ring-offset-1 hover:ring-offset-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 md:mt-0 md:px-16 md:ring-offset-accent`}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  )
}

export { ButtonAdd }
