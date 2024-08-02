'use client'

import Link from 'next/link'

export default function SignUpLink() {
  return (
    <div className="mt-6 flex justify-center gap-2 px-2 text-sm text-gray-500">
      não tem cadastro?
      <Link className="cursor-pointer font-semibold underline" href={'/signup'}>
        cadastre-se
      </Link>
    </div>
  )
}
