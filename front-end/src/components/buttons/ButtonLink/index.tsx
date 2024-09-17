'use client'

import { LoadingPuff } from '@/components/loadings/LoadingPuff'
import cn from '@/utils/cn'
import { LucideIcon } from 'lucide-react'
import { ButtonHTMLAttributes, FunctionComponent, ReactNode } from 'react'
import { IconType } from 'react-icons'

interface IButtonLinkProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  outline?: boolean
  small?: boolean
  icon?: IconType | LucideIcon
  isLoading?: boolean
  children: ReactNode
  className?: string
}

const ButtonLink: FunctionComponent<IButtonLinkProps> = ({
  children,
  icon: Icon,
  isLoading,
  className,
  ...rest
}: IButtonLinkProps) => {
  return (
    <button
      className={cn(
        `tex-sm flex w-full flex-row gap-2 whitespace-nowrap text-left font-normal text-neutral-500 underline-offset-4 ring-0 transition-all duration-150 hover:cursor-pointer hover:text-accent hover:underline hover:decoration-accent`,
        className,
      )}
      {...rest}
    >
      {Icon && !isLoading && <Icon size={24} />}
      {isLoading && <LoadingPuff />}

      {!isLoading && <span> {children}</span>}
    </button>
  )
}

export { ButtonLink }
