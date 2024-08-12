import Container from '@/components/Container'
import { ReactNode } from 'react'

type IBreadcrumbProps = {
  children: ReactNode
}

function Breadcrumb({ children }: IBreadcrumbProps) {
  return (
    <nav className="w-full">
      <Container>
        <div className="flex w-full flex-row items-center justify-between">
          <ol className="inline-flex items-center space-x-1 py-2 md:space-x-3">
            {children}
          </ol>
        </div>
      </Container>
    </nav>
  )
}

export { Breadcrumb }
