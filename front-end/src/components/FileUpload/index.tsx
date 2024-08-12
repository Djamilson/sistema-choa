import { UploadCloud } from 'lucide-react'
import { useFileUpload } from './useFileUpload'

type IFileUploadProps = {
  title?: string | undefined
  accept: {
    'image/png': string[]
    'image/jpeg': string[]
  }
  handleUpload: (file: File) => void
}

export function FileUpload({ accept, handleUpload, title }: IFileUploadProps) {
  const { getRootProps, getInputProps, isDragActive } = useFileUpload({
    accept,
    handleUpload,
  })

  return (
    <div
      className="mb-2 mt-2 flex h-60 w-full items-center justify-center"
      {...getRootProps()}
    >
      <label
        htmlFor="dropzone-file"
        className="focus:shadow-outline dark:hover:bg-bray-800 group relative flex h-64 w-full cursor-pointer flex-col items-center justify-center whitespace-nowrap border border-dashed border-gray-300 bg-slate-200 py-1 text-sm font-medium text-gray-500 shadow-sm ring-0 transition-all duration-150 hover:border-gray-200 hover:bg-red-200 hover:text-white hover:opacity-80 hover:ring-2 hover:ring-red-500 hover:ring-offset-1 hover:ring-offset-white focus:outline-none disabled:cursor-not-allowed  disabled:opacity-70 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:border-red-500  dark:hover:bg-gray-600 dark:hover:text-gray-50 md:mt-0 md:px-16 md:ring-offset-red-500"
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          {title && (
            <p className="my-2 text-sm">
              <span className="font-semibold">{title}</span>
            </p>
          )}

          {!isDragActive ? <UploadCloud size={38} /> : null}

          {isDragActive && (
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Aguarde</span> ...
            </p>
          )}

          <p className="mt-2 text-sm">
            <span className="font-semibold">Click para upload</span> ou arraste
            e solte
          </p>
          <p className="text-xs">Png, jpg e jpeg</p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          {...getInputProps()}
        />
      </label>
    </div>
  )
}
