'use client'

import { ReactNode } from 'react'

interface ITableRootProps {
  children: ReactNode
}

export function TableRoot({ children }: ITableRootProps) {
  return (
    <div className="mx-auto mt-6 flex w-full flex-col gap-2 bg-white px-4 py-2">
      {children}
    </div>
  )
}
