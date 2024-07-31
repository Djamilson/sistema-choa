'use client'

import cn from '@/utils/cn'
import { ElementType, ReactNode } from 'react'
import { InputMercadoPago } from '.'

type InputMercadoPagoRoot = {
  name: string
  iconPrimary?: ElementType
  label: string
  errors?: boolean
  errorTop?: boolean
  children: ReactNode
  errorMessage: string
}

export const InputMercadoPagoRoot = ({
  name,
  label,
  errors,
  iconPrimary: IconPrimary,
  errorTop = true,
  children,
  errorMessage,
}: InputMercadoPagoRoot) => {
  return (
    <div
      className={cn(
        `group relative h-12 w-full`,
        errorTop && errors ? '' : 'mb-4',
      )}
    >
      {IconPrimary && (
        <InputMercadoPago.Icon icon={IconPrimary} errors={errors} />
      )}
      {children}
      <InputMercadoPago.Label
        errors={errors}
        name={name}
        label={label}
        iconPrimary={IconPrimary}
      />
      {errors && (
        <InputMercadoPago.Errors
          errorMessage={errorMessage}
          errorTop={errorTop}
        />
      )}
    </div>
  )
}
