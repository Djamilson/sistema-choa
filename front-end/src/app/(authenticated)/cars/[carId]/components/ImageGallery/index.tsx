'use client'
import { IPhoto } from '@/@model/photo/photo'
import cn from '@/utils/cn'
import { ensureHttp } from '@/utils/ensureHttp'
import Image from 'next/image'
import { useState } from 'react'

type IProductDetailsCarouselProps = {
  photos?: IPhoto[]
}

const ImageGallery = ({ photos }: IProductDetailsCarouselProps) => {
  const [selectedImage, setSelectedImage] = useState<number>(0)
  const [isLoading, setLoading] = useState(true)

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="order-last flex gap-4 lg:order-none lg:flex-col">
        {photos?.map((img, index) => (
          <div
            key={img.id}
            className="group overflow-hidden bg-gray-100 ring-accent ring-offset-slate-50 hover:bg-accent hover:ring-2 hover:ring-offset-2"
          >
            <Image
              src={
                (img?.photo_url && ensureHttp(img?.photo_url)) ||
                '/images/placeholder.jpg'
              }
              onClick={() => setSelectedImage(index)}
              width={200}
              height={200}
              priority
              alt={`${img.name} ${index + 1}`}
              className={cn(
                `h-full w-full cursor-pointer object-cover object-center transition duration-700 ease-in-out group-hover:scale-110 group-hover:opacity-75 `,
                selectedImage === index
                  ? `border-[1px] border-accent`
                  : `border-[1px] border-zinc-300 `,
                isLoading
                  ? 'scale-110 blur-2xl grayscale'
                  : 'scale-100 blur-0 grayscale-0',
              )}
              onLoad={() => setLoading(false)}
            />
          </div>
        ))}
      </div>

      <div className="group relative overflow-hidden bg-gray-100 lg:col-span-4">
        {photos && (
          <Image
            src={
              (photos[selectedImage]?.photo_url &&
                ensureHttp(photos[selectedImage]?.photo_url)) ||
              '/images/placeholder.jpg'
            }
            alt="Photo"
            width={500}
            height={500}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className={cn(
              'h-full w-full object-cover object-center transition duration-700 ease-in-out group-hover:scale-110 group-hover:opacity-75',
              isLoading
                ? 'scale-110 blur-2xl grayscale'
                : 'scale-100 blur-0 grayscale-0',
            )}
            onLoad={() => setLoading(false)}
          />
        )}
        <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
          Sale
        </span>
      </div>
    </div>
  )
}

export default ImageGallery
