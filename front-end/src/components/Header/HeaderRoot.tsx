'use client'

import Container from '@/components/Container'
import cn from '@/utils/cn'
import { ReactNode } from 'react'
import { useHeaderRoot } from './useHeaderRoot'

type IHeaderRootProps = {
  children: ReactNode
}

export function HeaderRoot({ children }: IHeaderRootProps) {
  const { active } = useHeaderRoot()

  return (
    <header
      className={cn(
        '800px:hidden left-0 top-0 z-10 h-[60px] w-full bg-accent shadow-sm',
        active === true ? `fixed py-0` : `pt-0`,
      )}
    >
      <Container>
        <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
          {children}
        </div>
      </Container>
    </header>
  )
}
