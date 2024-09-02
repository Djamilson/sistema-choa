import { LoadingPuff } from '@/components/loadings/LoadingPuff'
import cn from '@/utils/cn'
import { UploadCloud } from 'lucide-react'
import Image from 'next/image'
import { IFileUploadProps, useFileUpload } from './useFileUpload'

export function FileUpload({ accept, carId, toggleEdit }: IFileUploadProps) {
  const {
    isLoading,
    selectedFileUrl,
    getRootProps,
    getInputProps,
    isDragActive,
  } = useFileUpload({
    accept,
    carId,
    toggleEdit,
  })

  return (
    <div
      className="mb-2 mt-2 flex h-60 w-full items-center justify-center"
      {...getRootProps()}
    >
      {isLoading && <LoadingPuff />}

      {!isLoading && (
        <label
          htmlFor="dropzone-file"
          className="focus:shadow-outline dark:hover:bg-bray-800 group relative flex h-64 w-full cursor-pointer flex-col items-center justify-center whitespace-nowrap rounded-lg border border-dashed border-gray-300 bg-slate-200 py-1 text-sm font-medium text-gray-500 shadow-sm ring-0 transition-all duration-150 hover:border-gray-200 hover:bg-red-200 hover:text-white hover:opacity-80 hover:ring-2 hover:ring-red-500 hover:ring-offset-1 hover:ring-offset-white focus:outline-none disabled:cursor-not-allowed  disabled:opacity-70 md:mt-0 md:px-16 md:ring-offset-red-500 dark:border-gray-600  dark:bg-gray-700 dark:text-gray-400 dark:hover:border-red-500 dark:hover:bg-gray-600 dark:hover:text-gray-50"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            {!isDragActive && selectedFileUrl ? (
              <Image
                width={500}
                height={60}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 30vw, 13vw"
                src={selectedFileUrl || '/images/placeholder.jpg'}
                alt="Upload"
                className={cn(
                  'inline-block  object-cover ring-2 ring-white transition duration-700 ease-in-out group-hover:scale-110 group-hover:opacity-75',
                  isLoading
                    ? 'scale-110 blur-2xl grayscale'
                    : 'scale-100 blur-0 grayscale-0',
                )}
              />
            ) : null}
            {!isDragActive && !selectedFileUrl ? (
              <UploadCloud size={38} />
            ) : null}

            {isDragActive && (
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Aguarde</span> ...
              </p>
            )}

            <p className="mt-2 text-sm">
              <span className="font-semibold">Click para upload</span> ou
              arraste e solte
            </p>
            <p className="text-xs">Png, jpg e jpeg</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            {...getInputProps()}
          />
          {isLoading && <LoadingPuff />}
        </label>
      )}
    </div>
  )
}
