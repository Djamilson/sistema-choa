'use client'

import { ButtonDetailProduct } from '@/components/product-detail/ButtonDetailProduct'
import cn from '@/utils/cn'
import { ImageIcon, ImagePlus, X } from 'lucide-react'
import Image from 'next/image'
import { FileUpload } from './FileUpload'
import useThumbnailForm from './useThumbnailForm'

const accept = {
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg'],
}

export const ThumbnailForm = () => {
  const { toggleEdit, isLoading, isEditing, setLoading, initialUser } =
    useThumbnailForm()

  return (
    <div className="gap-y-4 bg-white">
      <div className="relative mb-2 mt-6 flex items-baseline justify-between border-b font-medium">
        <span className="mb-2">Minha foto</span>
        <div className="absolute right-0 justify-end">
          <ButtonDetailProduct
            icon={isEditing ? X : ImagePlus}
            onClick={toggleEdit}
          >
            {isEditing && `Cancelar`}
            {!isEditing && `Adicionar foto`}
          </ButtonDetailProduct>
        </div>
      </div>

      {!isEditing &&
        (!initialUser?.person?.avatar_url ? (
          <div className="flex h-60 items-center justify-center bg-slate-200">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative mt-4 flex aspect-video items-center justify-center">
            <Image
              width={500}
              height={60}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 30vw, 13vw"
              src={initialUser?.person?.avatar_url || '/images/placeholder.jpg'}
              alt={initialUser?.person.name}
              className={cn(
                'inline-block h-40 w-40 rounded-full object-cover ring-2 ring-white transition duration-700 ease-in-out group-hover:scale-110 group-hover:opacity-75',
                isLoading
                  ? 'scale-110 blur-2xl grayscale'
                  : 'scale-100 blur-0 grayscale-0',
              )}
              onLoad={() => setLoading(false)}
            />
          </div>
        ))}

      {isEditing && initialUser?.id && (
        <div className="mb-2">
          <FileUpload
            accept={accept}
            userId={initialUser?.id}
            toggleEdit={toggleEdit}
          />
        </div>
      )}
    </div>
  )
}
