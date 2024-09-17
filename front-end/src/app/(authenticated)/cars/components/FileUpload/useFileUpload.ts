'use client'

import { useCallback } from 'react'
import { useDropzone as useDropzoneReactDropzone } from 'react-dropzone'

export interface IFileUploadProps {
  handleUpload: (file: File) => void
  accept: {
    'image/png': string[]
    'image/jpeg': string[]
  }
}

export const useFileUpload = ({ handleUpload, accept }: IFileUploadProps) => {
  const onDrop = useCallback(
    async (acceptedFiles: any) => {
      const file = acceptedFiles?.[0]

      if (!file) {
        return
      }

      handleUpload(file)
    },
    [handleUpload],
  )

  const { getRootProps, getInputProps, isDragActive } =
    useDropzoneReactDropzone({
      maxFiles: 1,
      onDrop,
      accept,
      noClick: true,
    })

  return {
    getRootProps,
    getInputProps,
    isDragActive,
  }
}
