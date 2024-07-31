import { ReactElement } from 'react'

interface INotificationRootProps {
  children: ReactElement
}
export function SignUpRoot({ children }: INotificationRootProps) {
  return (
    <div className="flex min-h-full flex-col justify-center bg-neutral-100 py-12 sm:px-6 lg:px-8">
      {children}
    </div>
  )
}
