'use client'

import { Hr } from '@/components/Hr'
import { IconBadge } from '@/components/IconBadge'
import useLoadingOnClickButtonModal from '@/components/loadings/LoadingOnClickButtonModal/useLoadingOnClickButtonModal'
import { Image, LayoutDashboard, ShieldCheck } from 'lucide-react'
import { useEffect } from 'react'
import { BirthDateForm } from '../BirthDateForm'
import { CpfOrCnpjForm } from '../CpfOrCnpjForm'
import { EmailForm } from '../EmailForm'
import Gender from '../Gender'
import { NameForm } from '../NameForm'
import PromotionalEmail from '../PromotionalEmail'
import { SecurityForm } from '../SecurityForm'
import { ThumbnailForm } from '../ThumbnailForm'

const Collaborator = () => {
  const { onClose: onCloseLoadingOnClickButtonModal } =
    useLoadingOnClickButtonModal()

  useEffect(() => {
    onCloseLoadingOnClickButtonModal()
  }, [onCloseLoadingOnClickButtonModal])

  return (
    <div className="gap-22 flex-[4] px-2 py-4 md:px-8 md:pb-12 md:pt-4">
      <div className="flex flex-col justify-between gap-6 text-base font-medium text-gray-900">
        <div className="flex w-full flex-col">
          <p>cadastro</p>
          <p className="mt-0.5 text-sm text-gray-500">
            aqui você pode alterar os seus dados
          </p>
        </div>

        <div className="flex w-full flex-col">
          <h3>dados da conta</h3>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="mt-4 gap-y-4  border bg-white px-4 pb-4 pt-3">
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-lg">Dados do pessoais</h2>
              </div>

              <NameForm />
              <EmailForm />
              <CpfOrCnpjForm />
              <BirthDateForm />
            </div>
          </div>

          <div className="mt-4 gap-y-4 border bg-white px-4 pb-4 pt-3">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Image} />
              <h2 className="text-lg">Foto do perfil</h2>
            </div>
            <ThumbnailForm />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="mt-4 gap-y-4 border bg-white px-4 pb-4 pt-3">
            <div className="mt-4 flex items-center gap-x-2">
              <IconBadge icon={ShieldCheck} />
              <h2 className="text-base">Segurança</h2>
            </div>
            <SecurityForm />
          </div>

          <div className="mt-4 space-y-6 border bg-white px-4 pb-4 pt-3">
            <div className="mt-4 flex items-center gap-x-2">
              <IconBadge icon={ShieldCheck} />
              <h2 className="text-base">Outros dados</h2>
            </div>
            <Hr />
            <PromotionalEmail />
            <Gender />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Collaborator
