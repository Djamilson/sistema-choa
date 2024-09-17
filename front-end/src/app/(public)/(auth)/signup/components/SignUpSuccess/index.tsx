'use client'

import { IconBadge } from '@/components/IconBadge'
import { Button } from '@/components/buttons/Button'
import { CircleCheckBig } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { VscArrowRight } from 'react-icons/vsc'
import { ContainerSignUp } from '../ContainerSignUp'

export default function SignUpSuccess() {
  const { push } = useRouter()

  return (
    <div className="flex justify-center px-1 lg:flex-row">
      <div className="w-full bg-white">
        <ContainerSignUp.Root>
          <>
            <ContainerSignUp.Title
              icon={<IconBadge icon={CircleCheckBig} variant="success" />}
            >
              <>
                <span className="text-success-600">
                  Já pode acessar sua conta!!!{' '}
                </span>

                <span className="ml-2 font-normal">
                  finalizamos o seu cadastro com sucesso
                </span>
              </>
            </ContainerSignUp.Title>
            <ContainerSignUp.Content>
              <>
                <div className="space-y-8">
                  <div className="space-y-8 bg-white">
                    <div className="flex items-center gap-x-2 border-b pb-4">
                      <IconBadge icon={CircleCheckBig} variant="success" />
                      <h2 className="text-lg">Conta criada com sucesso!!!</h2>
                    </div>
                  </div>

                  <Button type="button" onClick={() => push('/')}>
                    {'fazer login'}
                    <VscArrowRight
                      className="absolute right-12 top-[10px] cursor-pointer"
                      size={25}
                    />
                  </Button>
                </div>
              </>
            </ContainerSignUp.Content>
          </>
        </ContainerSignUp.Root>
      </div>
    </div>
  )
}
