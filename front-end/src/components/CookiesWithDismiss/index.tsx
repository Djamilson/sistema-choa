'use client'

import Link from 'next/link'
import { parseCookies, setCookie } from 'nookies'
import { useEffect, useState } from 'react'
import Balance from 'react-wrap-balancer'

type IIsVisibleProps = {
  isVisible: `hidden` | `block`
}

function CookiesWithDismiss() {
  const [isVisible, setIsVisible] = useState<IIsVisibleProps>({
    isVisible: 'hidden',
  })
  const cookies = parseCookies()
  const valueCookies = 'true'

  function handleClosePrivacy() {
    setCookie(null, '_shooferta_privacy', valueCookies, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
      HttpOnly: true,
    })
    setIsVisible({ isVisible: 'hidden' })
  }

  useEffect(() => {
    if (
      cookies._shooferta_privacy === undefined ||
      (cookies?._shooferta_privacy && cookies?._shooferta_privacy !== 'true')
    ) {
      setIsVisible({ isVisible: 'block' })
    }
  }, [cookies?._shooferta_privacy])

  return (
    <div
      id="cookies-simple-with-dismiss-button"
      className={`fixed bottom-4 z-[60] mx-auto w-full transform p-6 ${isVisible.isVisible}`}
    >
      <div className="border border-gray-200 bg-white p-2 px-4 shadow-md ">
        <div className="w-full items-center justify-between gap-x-5 p-2 sm:gap-x-10 md:flex">
          <p className="w-full text-center text-sm text-gray-600 dark:text-gray-400">
            <Balance>
              <span className="font-semibold">Shooferta e os cookies</span>: a
              gente usa cookies para personalizar anúncios e melhorar a sua
              experiência no site. Ao continuar navegando, você concorda com a
              nossa{' '}
              <Link
                href="/privacy-policy"
                className="inline-flex items-center font-medium text-accent decoration-2 hover:underline"
              >{`Política de Privacidade`}</Link>
              .
            </Balance>
          </p>

          <div className="inline-flex justify-center whitespace-nowrap text-center sm:text-left">
            <button
              type="button"
              onClick={() => handleClosePrivacy()}
              className="mt-6 border border-accent px-3 py-2 text-sm font-medium text-accent shadow-sm ring-4 transition-all hover:border-gray-200 hover:bg-accent hover:text-white hover:ring-2 hover:ring-accent hover:ring-offset-1 hover:ring-offset-white focus:outline-none focus:ring-1 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white md:mt-0 md:ring-offset-accent"
            >
              continuar e fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export { CookiesWithDismiss }
