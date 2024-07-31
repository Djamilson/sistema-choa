'use client'

import { useStickyHeader } from '@/hooks/AnimateScrooll/useStickyHeader'
import { useEffect } from 'react'
import useLoadingOnClickButtonModal from '../loadings/LoadingOnClickButtonModal/useLoadingOnClickButtonModal'

export const useHeaderRoot = () => {
  const { active } = useStickyHeader()

  const { onClose: onCloseLoadingOnClickButtonModal } =
    useLoadingOnClickButtonModal()

  useEffect(() => {
    onCloseLoadingOnClickButtonModal()
  }, [onCloseLoadingOnClickButtonModal])

  return {
    active,
  }
}
