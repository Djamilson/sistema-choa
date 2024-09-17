'use client'

import { LoadingPuff } from '@/components/loadings/LoadingPuff'
import cn from '@/utils/cn'
import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react'
import { IconType } from 'react-icons'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: IconType
  isLoading?: boolean
  children?: ReactNode
}

const ButtonIsStyle = forwardRef<HTMLButtonElement, IButtonProps>(
  function ForwardedButton(props, ref) {
    const { children, icon: Icon, isLoading, ...rest } = props

    const btnProps = { ...ref, ...rest }

    return (
      <button
        {...btnProps}
        className={cn(
          `flex w-full items-center justify-center text-center text-sm transition-all duration-150 hover:opacity-80`,
          rest.className,
        )}
      >
        {Icon && !isLoading && (
          <div className="mr-4">
            <Icon size={18} />
          </div>
        )}

        {isLoading && <LoadingPuff />}

        {!isLoading && children}
      </button>
    )
  },
)

export { ButtonIsStyle }
