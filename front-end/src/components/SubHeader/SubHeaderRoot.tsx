import { ReactNode } from 'react'

type ISubHeaderRootProps = {
  children: ReactNode
}

export function SubHeaderRoot({ children }: ISubHeaderRootProps) {
  return (
    <header className={`left-0 top-0 h-[60px] w-full border-b`}>
      <div className="mx-auto w-full max-w-[1440px] items-center">
        <div className="flex flex-row items-center justify-between">
          {children}
        </div>
      </div>
    </header>
  )
}
