'use client'

import Link from 'next/link'

export default function GoBackSignInLink() {
  return (
    <div className="mt-6 flex justify-center gap-2 px-2 text-sm text-gray-500">
      voltar para?
      <Link className="cursor-pointer font-semibold underline" href={'/signin'}>
        área de login
      </Link>
    </div>
  )
}
