'use client'

import Link from 'next/link'

type ILinkEvaluateProductProps = {
  href: string
  title: string
}

function LinkEvaluateProduct({ href, title }: ILinkEvaluateProductProps) {
  return (
    <Link href={href}>
      <div className="tex-sm w-full font-normal text-neutral-500 hover:text-accent hover:underline hover:decoration-accent">
        {title}
      </div>
    </Link>
  )
}

export { LinkEvaluateProduct }
