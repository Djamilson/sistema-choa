'use client'

import { ContainerWrapper } from '@/components/ContainerWrapper'
import { Header } from '@/components/Header'
import { SubHeader } from '@/components/SubHeader'
import { IconBadge } from '@/components/icon-badge'
import { MeLink } from '@/components/links/MeLink'
import { ArrowLeft, ImageIcon, LayoutDashboard } from 'lucide-react'
import { ImageForm } from './components/ImageForm'
import { NameForm } from './components/NameForm'
import { useBrandEdit } from './useBrandEdit'

export type IBrandEditProps = {
  params: { brandId: string }
}

function BrandEdit({ params }: IBrandEditProps) {
  const { brandId } = params

  const {
    initialBrand,
    setInitialBrand,
    selectBrandVisible,
    closeBrandVisible,
    setSelectBrandVisible,
  } = useBrandEdit({ brandId })

  return (
    <div className={`bg-neutral-100`}>
      <Header.Root>
        <Header.Logo
          href="/"
          urlLogo="/images/logo.png"
        />
      </Header.Root>

      <ContainerWrapper>
        <div className="flex w-full">
          <MeLink
            href={`/brands`}
            className="mb-6 flex flex-row items-center text-sm transition hover:bg-neutral-100 hover:opacity-75"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>voltar marcas</span>
          </MeLink>
        </div>
        <SubHeader.Root>
          <SubHeader.Title title="Editar a marca" />
        </SubHeader.Root>
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Dados da marca</h2>
              </div>

              <div className="mt-6 gap-y-4  border bg-white px-4 pb-4 pt-3">
                {initialBrand?.id && (
                  <NameForm
                    initialBrand={initialBrand}
                    setInitialBrand={setInitialBrand}
                  />
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ImageIcon} />
              <h2 className="text-xl">Imagem da marca</h2>
            </div>
            <ImageForm
              initialBrand={initialBrand}
              setInitialBrand={setInitialBrand}
            />
          </div>
        </div>
      </ContainerWrapper>
    </div>
  )
}

export default BrandEdit
