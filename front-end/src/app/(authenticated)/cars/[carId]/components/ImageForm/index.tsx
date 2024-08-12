import { IBrand } from '@/@model/car'
import { Button } from '@/components/buttons/Button'
import cn from '@/utils/cn'
import { ImageIcon, ImagePlus, X } from 'lucide-react'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import { FileUpload } from './FileUpload'
import { useImageForm } from './useImageForm'

interface IImageFormProps {
  initialBrand?: IBrand
  setInitialBrand: Dispatch<SetStateAction<IBrand>>
}

const accept = {
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg'],
}

export const ImageForm = ({
  initialBrand,
  setInitialBrand,
}: IImageFormProps) => {
  const { isEditing, toggleEdit, isLoading, setLoading } = useImageForm()

  return (
    <div className="mt-6 gap-y-4  border bg-white p-4">
      <div className="mb-4 flex items-center justify-between font-medium">
        Imagem da marca
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
                Adicionar imagem
              </>
            )}
          </Button>
        </div>
      </div>

      {!isEditing &&
        (!initialBrand?.logo_url ? (
          <div className="flex h-60 items-center justify-center  bg-slate-200">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="aspect-video relative mt-2 flex h-60 overflow-hidden  bg-white p-2 shadow-lg transition-shadow duration-300 ease-in-out hover:transform md:p-4">
            <Image
              width={500}
              height={60}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 30vw, 13vw"
              src={initialBrand?.logo_url || '/images/placeholder.jpg'}
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
        ))}

      {isEditing && initialBrand?.id && (
        <div className="mb-2">
          <FileUpload
            accept={accept}
            brandId={initialBrand?.id}
            toggleEdit={toggleEdit}
            setInitialBrand={setInitialBrand}
          />
        </div>
      )}
    </div>
  )
}
