'use client'

import { LoadingPuff } from '@/components/loadings/LoadingPuff'
import { ButtonHTMLAttributes, FunctionComponent, ReactNode } from 'react'
import { IconType } from 'react-icons'

interface IButtonSaleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  outline?: boolean
  small?: boolean
  icon?: IconType
  isLoading?: boolean
  children: ReactNode
}

const ButtonSale: FunctionComponent<IButtonSaleProps> = ({
  children,
  icon: Icon,
  isLoading,
  ...rest
}: IButtonSaleProps) => {
  return (
    <button
      className={`focus:shadow-outline text-md relative flex w-full items-center justify-center gap-4 whitespace-nowrap border border-accent bg-accent px-6 py-4 font-semibold text-white shadow-sm ring-0 transition-all duration-150 hover:border-gray-200 hover:bg-accent hover:text-gray-50 hover:ring-2 hover:ring-red-400 hover:ring-offset-1 hover:ring-offset-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 md:relative md:bottom-0 md:z-[0] md:mt-0 md:px-16 md:ring-offset-accent`}
      {...rest}
    >
      {Icon && !isLoading && <Icon size={24} />}
      {isLoading && <LoadingPuff />}

      {!isLoading && <span> {children}</span>}
    </button>
  )
}

export { ButtonSale }
