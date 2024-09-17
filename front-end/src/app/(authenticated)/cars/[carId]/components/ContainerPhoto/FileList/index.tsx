'use client'

import cn from '@/utils/cn'
import { CheckCircleIcon, LucideFileWarning, Trash2Icon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export type IFile = {
  id: string
  name: string
  readableSize: string
  preview: string
  uploaded: boolean
  file: File
  url: string
  progress: number
  error: boolean
}

type IProps = {
  files: IFile[]
  onDelete: (id: string) => void
}

function FileList({ files, onDelete }: IProps) {
  const [isLoading, setLoading] = useState(true)

  return (
    <>
      <div className="mt-16 flex w-full flex-col gap-y-4">
        {files.length > 0 &&
          files.map((file) => {
            return (
              <div
                key={file.id}
                className="flex flex-col bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="flex p-4">
                  <span className="mr-5 flex">
                    <div className="aspect-video h-30 relative flex overflow-hidden  bg-white p-2 shadow-lg transition-shadow duration-300 ease-in-out hover:transform">
                      <Image
                        width={500}
                        height={40}
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 30vw, 13vw"
                        src={file.preview || '/images/placeholder.jpg'}
                        alt="Upload"
                        className={cn(
                          'inline-block  object-cover ring-2 ring-white transition duration-700 ease-in-out group-hover:scale-110 group-hover:opacity-75',
                          isLoading
                            ? 'scale-110 blur-2xl grayscale'
                            : 'scale-100 blur-0 grayscale-0',
                        )}
                        onLoad={() => setLoading(false)}
                      />
                    </div>

                    <div className="ml-4 min-w-0 max-w-md text-sm">
                      <span className="block overflow-hidden overflow-ellipsis whitespace-nowrap dark:text-gray-200">
                        {file.name}
                      </span>
                      <span className="block text-xs italic text-gray-500">
                        {file.readableSize}
                      </span>
                      <div className="relative mt-4 flex shrink-0 appearance-none items-center justify-end rounded-full text-xs transition-colors duration-200 ease-in-out before:inline-block before:h-6 before:w-6 before:translate-x-0 before:transform before:transition before:duration-200 before:ease-in-out">
                        {!!file.url && file?.progress < 1 && (
                          <button
                            className="inline-block h-7 w-[3.25rem] cursor-pointer  border-none bg-transparent p-1 transition-colors duration-200 ease-in-out hover:scale-110 hover:text-accent hover:opacity-75"
                            onClick={() => onDelete(file.id)}
                          >
                            <Trash2Icon className="shrink-0" />
                          </button>
                        )}
                        {file.error && (
                          <LucideFileWarning className="shrink-0 text-red-400" />
                        )}
                        {!file.uploaded &&
                          !file.error &&
                          file?.progress > 0 && <div>{file?.progress}%</div>}
                        {file.uploaded && (
                          <CheckCircleIcon className="shrink-0 text-success" />
                        )}
                      </div>
                    </div>
                  </span>
                </div>
              </div>
            )
          })}
      </div>
    </>
  )
}

export { FileList }
