import { ReactNode } from 'react'

interface ITitleProps {
  children: ReactNode
}

function Title({ children }: ITitleProps) {
  return (
    <h3 className="text-lg font-bold text-neutral-600 md:text-2xl">
      {children}
    </h3>
  )
}

export { Title }
