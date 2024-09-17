'use client'

import Wrapper from '@/components/Header/Wrapper'
import { IconBadge } from '@/components/IconBadge'
import { Button } from '@/components/buttons/Button'
import { MailCheck, QrCode } from 'lucide-react'
import { VscArrowRight } from 'react-icons/vsc'
import { ContainerSignUp } from '../ContainerSignUp'
import GoBackSignInLink from '../GoBackSignInLink'
import { HeaderSignUp } from '../HeaderSignUp'
import ProgressIndicator from '../ProgressIndicator'
import SignUpCodeValidationForm from '../SignUpCodeValidationForm'
import SignUpDataForm from '../SignUpDataForm'
import SignUpEmailForm from '../SignUpEmailForm'
import SignUpSuccess from '../SignUpSuccess'
import { useSignUpForm } from './useSignUpForm'

export default function SignUpForm() {
  const {
    currentStep,
    handlerCurrentStep,
    handlerGoBackCurrentStep,
    email,
    setEmail,
  } = useSignUpForm()

  return (
    <>
      <HeaderSignUp>
        <ProgressIndicator currentStep={currentStep} />
      </HeaderSignUp>
      <Wrapper className={`w-full max-w-[1440px] md:mx-auto md:px-2`}>
        {currentStep === 1 && (
          <div className="flex flex-col justify-center  px-1 lg:flex-row">
            <div className="w-full bg-white">
              <ContainerSignUp.Root>
                <>
                  <ContainerSignUp.Title icon={<IconBadge icon={MailCheck} />}>
                    <>
                      <span className="text-accent">Estamos quase lá. </span>
                      <span className="text-accent">
                        Entre com o seu melhor email
                      </span>
                      <span className="ml-2 font-normal">
                        para se registrar e começar uma experiência incrível.
                      </span>
                    </>
                  </ContainerSignUp.Title>
                  <ContainerSignUp.Content>
                    <>
                      <SignUpEmailForm
                        handlerCurrentStep={handlerCurrentStep}
                      />
                      <ContainerSignUp.Label />
                      <GoBackSignInLink />
                    </>
                  </ContainerSignUp.Content>
                </>
              </ContainerSignUp.Root>
            </div>

            <div className="w-full max-w-sm bg-white">
              <ContainerSignUp.Root>
                <>
                  <ContainerSignUp.Title icon={<IconBadge icon={QrCode} />}>
                    <>
                      <span className="text-accent">Já tem </span>
                      <span className="ml-2 font-normal">
                        o código enviado por email?
                      </span>
                    </>
                  </ContainerSignUp.Title>

                  <ContainerSignUp.Content>
                    <>
                      <Button
                        disabled={false}
                        isLoading={false}
                        type="button"
                        onClick={handlerCurrentStep}
                      >
                        {'click aqui'}
                        <VscArrowRight
                          className="absolute right-12 top-[10px] cursor-pointer"
                          size={25}
                        />
                      </Button>
                    </>
                  </ContainerSignUp.Content>
                </>
              </ContainerSignUp.Root>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div className="flex flex-1 items-center justify-center">
            <ContainerSignUp.Root>
              <>
                <ContainerSignUp.Title icon={<IconBadge icon={QrCode} />}>
                  <>
                    <span className="text-accent">Cole aqui.</span>
                    <span className="ml-2 font-normal">
                      o código enviado por email
                    </span>
                  </>
                </ContainerSignUp.Title>
                <ContainerSignUp.Content>
                  <>
                    <SignUpCodeValidationForm setEmail={setEmail}>
                      <Button type="button" onClick={handlerCurrentStep}>
                        {'próximo'}
                        <VscArrowRight
                          className="absolute right-12 top-[10px] cursor-pointer"
                          size={25}
                        />
                      </Button>
                    </SignUpCodeValidationForm>
                    <ContainerSignUp.Label />
                    <div className="mt-6 flex justify-center gap-2 px-2 text-sm text-gray-500">
                      voltar para?
                      <button
                        className="cursor-pointer font-semibold underline"
                        type={`button`}
                        onClick={handlerGoBackCurrentStep}
                      >
                        área de email
                      </button>
                    </div>
                  </>
                </ContainerSignUp.Content>
              </>
            </ContainerSignUp.Root>
          </div>
        )}

        {currentStep === 3 && email.length > 0 && (
          <SignUpDataForm
            email={email}
            handlerCurrentStep={handlerCurrentStep}
          />
        )}
        {currentStep === 4 && <SignUpSuccess />}
      </Wrapper>
    </>
  )
}
