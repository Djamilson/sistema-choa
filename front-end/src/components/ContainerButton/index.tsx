import { ReactNode } from 'react'

type IContainerButtonProps = {
  children: ReactNode
}

const ContainerButton = ({ children }: IContainerButtonProps) => {
  return (
    <div className="mt-6 grid max-w-md grid-cols-1 items-center justify-between gap-x-6 sm:grid-cols-2">
      {children}
    </div>
  )
}

export default ContainerButton
