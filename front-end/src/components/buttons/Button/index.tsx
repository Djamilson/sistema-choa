'use client'

import { LoadingPuff } from '@/components/loadings/LoadingPuff'
import cn from '@/utils/cn'
import { ButtonHTMLAttributes, FunctionComponent, ReactNode } from 'react'
import { IconType } from 'react-icons'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  outline?: boolean
  small?: boolean
  icon?: IconType
  isLoading?: boolean
  children: ReactNode
  disabled?: boolean
}

const Button: FunctionComponent<ButtonProps> = ({
  children,
  icon: Icon,
  isLoading,
  disabled = false,
  ...rest
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      {...rest}
      className={cn(
        `focus:shadow-outline relative min-h-12 w-full gap-2 whitespace-nowrap border border-accent px-1 py-2 text-center text-sm font-medium text-accent shadow-sm ring-0 transition-all duration-150 hover:border-gray-200 hover:bg-accent hover:text-white hover:opacity-80 hover:ring-2 hover:ring-accent hover:ring-offset-1 hover:ring-offset-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 md:mt-0 md:px-4 md:ring-offset-accent`,
        rest.className,
      )}
    >
      {Icon && !isLoading && (
        <Icon size={18} className="absolute left-4 top-4" />
      )}
      {isLoading && <LoadingPuff />}

      {!isLoading && children}
    </button>
  )
}

export { Button }
