'use client'

import { useEffect, useState } from 'react'

type IUseStickyHeaderProps = {
  active: boolean
}

export const useStickyHeader = (): IUseStickyHeaderProps => {
  const [active, setActive] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 70) {
        setActive(true)
      } else {
        setActive(false)
      }
    })
  }, [])

  return {
    active,
  }
}
