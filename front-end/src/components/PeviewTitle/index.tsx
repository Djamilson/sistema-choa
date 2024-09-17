'use client'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'

// import 'react-quill/dist/quill.bubble.css'

type IPreviewTitleProps = {
  value: string
}

export const PreviewTitle = ({ value }: IPreviewTitleProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    [],
  )

  console.log('anjo', value)

  return <ReactQuill theme="bubble" value={value} readOnly />
}
