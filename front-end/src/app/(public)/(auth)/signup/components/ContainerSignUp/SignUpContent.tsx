import { ReactElement } from 'react'

interface ISignUpContent {
  children: ReactElement
}
export function SignUpContent({ children }: ISignUpContent) {
  return (
    <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-12 shadow sm:px-10">{children}</div>
    </div>
  )
}
