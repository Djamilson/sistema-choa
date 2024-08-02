import { ReactNode } from 'react'
import Container from '../Container'
import { ContainerSideBar } from '../ContainerSideBar'

type ContainerWrapper = {
  children: ReactNode
}

export const ContainerWrapper = ({ children }: ContainerWrapper) => {
  return (
    <Container>
      <div className="flex-[1] bg-white p-2">
        <ContainerSideBar />
      </div>
      <div className="flex-[4] px-2 pb-4 md:px-6 md:pb-12">
        <div className="flex flex-col justify-between gap-6 text-base font-medium text-gray-900">
          {children}
        </div>
      </div>
    </Container>
  )
}
