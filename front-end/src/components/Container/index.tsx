import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-2 sm:px-2 md:px-4 xl:px-6">
      {children}
    </div>
  )
}

export default Container
