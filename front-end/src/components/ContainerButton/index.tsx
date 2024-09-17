import { ReactNode } from 'react'

type IContainerButtonProps = {
  children: ReactNode
}

const ContainerButton = ({ children }: IContainerButtonProps) => {
  return (
    <div className="mt-6 flex max-w-md items-center justify-around gap-x-6">
      {children}
    </div>
  )
}

export default ContainerButton
