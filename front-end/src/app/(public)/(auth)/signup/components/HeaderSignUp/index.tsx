import { Header } from '@/components/Header'
import { ReactElement } from 'react'
type IHeaderSignUp = {
  children: ReactElement
}

export const HeaderSignUp = ({ children }: IHeaderSignUp) => {
  return (
    <header
      className={`800px:hidden left-0 top-0 z-10 h-[80px] w-full bg-accent py-1 shadow-sm `}
    >
      <div className="mx-auto w-full max-w-[1440px] px-2 sm:px-2 md:px-4 xl:px-6">
        <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
          <Header.Logo href="/" urlLogo="/images/logo.png" />
          <div className="mx-auto mr-0 w-full max-w-[600px] text-center md:mt-1">
            <div className="mr-0 text-base font-semibold leading-tight md:text-xl">
              {children}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
