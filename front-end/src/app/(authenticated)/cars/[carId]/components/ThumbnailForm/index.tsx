'use client'

import { IProduct } from '@/@model/product/product'
import { Button } from '@/components/buttons/Button'
import cn from '@/utils/cn'
import { ImageIcon, ImagePlus, X } from 'lucide-react'
import Image from 'next/image'
import { Dispatch, SetStateAction, useState } from 'react'
import { FileUpload } from './FileUpload'

interface IThumbnailFormProps {
  initialProduct?: IProduct
  setInitialProduct: Dispatch<SetStateAction<IProduct>>
}

const accept = {
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg'],
}

export const ThumbnailForm = ({
  initialProduct,
  setInitialProduct,
}: IThumbnailFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setLoading] = useState(true)

  const toggleEdit = () => setIsEditing((current) => !current)

  return (
    <div className="mt-6 gap-y-4  border bg-white p-4">
      <div className="mb-4 flex items-center justify-between font-medium">
        Thumbnail
        <div className="max-w-md">
          <Button
            onClick={toggleEdit}
            className={`h-8 border-none shadow-none`}
          >
            {isEditing && (
              <>
                <X className="mr-2 h-4 w-4" />
                Cancelar
              </>
            )}

            {!isEditing && (
              <>
                <ImagePlus className="mr-2 h-4 w-4" />
                Adicionar Thumbnai
              </>
            )}
          </Button>
        </div>
      </div>

      {!isEditing &&
        (!initialProduct?.thumbnail_url ? (
          <div className="flex h-60 items-center justify-center  bg-slate-200">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="aspect-video relative mt-2">
            <Image
              width={500}
              height={60}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 30vw, 13vw"
              src={initialProduct?.thumbnail_url || '/images/placeholder.jpg'}
              alt={initialProduct?.subcategory.name}
              className={cn(
                'inline-block  object-cover ring-2 ring-white transition duration-700 ease-in-out group-hover:scale-110 group-hover:opacity-75',
                isLoading
                  ? 'scale-110 blur-2xl grayscale'
                  : 'scale-100 blur-0 grayscale-0',
              )}
              onLoad={() => setLoading(false)}
            />
          </div>
        ))}

      {isEditing && initialProduct?.id && (
        <div className="mb-2">
          <FileUpload
            accept={accept}
            productId={initialProduct?.id}
            toggleEdit={toggleEdit}
            setInitialProduct={setInitialProduct}
          />
        </div>
      )}
      {/*! isEditing &&
        initialProduct?.id &&
        initialProduct?.images_products?.length > 0 && (
          <ImageList
            items={initialProduct.images_products}
            productId={initialProduct.id}
            setInitialProduct={setInitialProduct}
          />
        ) */}
    </div>
  )
}
