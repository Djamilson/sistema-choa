'use client'

import ICategory from '@/@model/category/category'
import { Button } from '@/components/buttons/Button'
import cn from '@/utils/cn'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type ICategoryProps = {
  category: ICategory
}

function CategoryView({ category }: ICategoryProps) {
  const { push } = useRouter()
  const [isLoading, setLoading] = useState(true)

  return (
    <div className="group mx-auto max-w-md overflow-hidden rounded-sm bg-white shadow-md transition-shadow  duration-300 ease-in-out hover:-translate-y-2 hover:transform  sm:hover:border-b-4 sm:hover:border-b-red-400 md:max-w-2xl">
      <div className="flex flex-col">
        <div className="md:shrink-0">
          <Image
            width={500}
            height={500}
            className={cn(
              'object-cover transition duration-700 ease-in-out group-hover:scale-110 group-hover:opacity-75',
              isLoading
                ? 'scale-110 blur-2xl grayscale'
                : 'scale-100 blur-0 grayscale-0',
            )}
            src={category?.photo_url || '/images/placeholder.jpg'}
            alt={category.name}
            onLoad={() => setLoading(false)}
          />
        </div>
        <div className="p-2 md:p-8">
          <p className="mt-1 block text-lg font-medium leading-tight text-gray-700 dark:text-gray-500">
            {category?.name}
          </p>
          <div className="my-0.5 flex-1 py-2 text-gray-600 dark:text-gray-400">
            <p className="line-clamp-3 leading-tight">{category.description}</p>
          </div>
          <div className="my-4">
            <Button
              disabled={false}
              onClick={() => push(`/collections/${category.id}`)}
            >
              ver coleção completa
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
export { CategoryView }
