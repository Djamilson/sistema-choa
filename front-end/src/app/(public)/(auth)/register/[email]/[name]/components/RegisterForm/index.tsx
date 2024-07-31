'use client'

import { ContainerSignUp } from '@/app/(public)/(auth)/signup/components/ContainerSignUp'
import { HeaderSignUp } from '@/app/(public)/(auth)/signup/components/HeaderSignUp'
import SignUpSuccess from '@/app/(public)/(auth)/signup/components/SignUpSuccess'
import Wrapper from '@/components/Header/Wrapper'
import { IconBadge } from '@/components/IconBadge'
import { Button } from '@/components/buttons/Button'
import { DatepickerRoot } from '@/components/inputs/Datepicker/DatepickerRoot'
import { InputFloat } from '@/components/inputs/InputFloat'
import * as masks from '@/components/inputs/masks'
import {
  CakeIcon,
  FileDigit,
  Mail,
  Phone,
  ShieldAlert,
  User,
} from 'lucide-react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { FiLock } from 'react-icons/fi'
import { VscArrowRight } from 'react-icons/vsc'
import ProgressIndicator from '../ProgressIndicator'
import { useRegisterForm } from './useRegisterForm'

type IRegisterFormProps = {
  params: {
    email: string
    name: string
  }
}

export default function RegisterForm({ params }: IRegisterFormProps) {
  const {
    currentStep,
    onSubmit,
    handleSubmit,
    register,
    errors,
    isSubmitting,
    control,
    setValue,
    visiblePassword,
    visibleConfirmPassword,
    setVisiblePassword,
    setVisibleConfirmPassword,
  } = useRegisterForm({
    name: params.name,
    email: decodeURIComponent(params.email),
  })

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
                  <ContainerSignUp.Title icon={<IconBadge icon={User} />}>
                    <>
                      <span className="text-accent">Olá {params.name}!</span>
                      <span className="ml-2 font-normal">
                        finalizar o seu cadastro para começar uma experiência
                        incrível.
                      </span>
                    </>
                  </ContainerSignUp.Title>
                  <ContainerSignUp.Content>
                    <form
                      className="space-y-8"
                      onSubmit={handleSubmit(onSubmit)}
                      id={`createProviderIdForm`}
                    >
                      <div className="space-y-8 bg-white">
                        <div className="flex items-center gap-x-2 border-b pb-4">
                          <IconBadge icon={User} />
                          <div>
                            <h3
                              className={`font-normal text-gray-800 group-hover:text-gray-600 dark:text-white`}
                            >
                              Dados do pessoais
                            </h3>

                            <h2 className="mr-4 text-ellipsis text-base font-normal text-neutral-400">
                              {params?.name}
                            </h2>
                          </div>
                        </div>
                        <InputFloat.Root
                          name="email"
                          label="email"
                          iconPrimary={Mail}
                          disabled={true}
                          register={register}
                          autoComplete="off"
                          errors={errors}
                          required
                          errorTop={true}
                        />

                        <InputFloat.Root
                          name="name"
                          iconPrimary={User}
                          label="nome do recebedor"
                          disabled={isSubmitting}
                          register={register}
                          errors={errors}
                          autoComplete="off"
                          required
                          errorTop={true}
                        />

                        <InputFloat.Root
                          name="cpfOrCnpj"
                          label="cpf/cnpj"
                          iconPrimary={FileDigit}
                          disabled={isSubmitting}
                          register={register}
                          errors={errors}
                          autoComplete="off"
                          onChange={masks.cpfOrCnpjMask.onChange}
                          required
                          errorTop={true}
                        />

                        <div>
                          <DatepickerRoot
                            name="birth_date"
                            label="data de nascimento"
                            disabled={isSubmitting}
                            control={control}
                            useRange={false}
                            setValue={setValue}
                            register={register}
                            errors={errors}
                            errorTop={true}
                            required={false}
                            iconPrimary={CakeIcon}
                            defaultValue={''}
                          />
                        </div>
                        <InputFloat.Root
                          name="phone"
                          iconPrimary={Phone}
                          label="telefone"
                          disabled={isSubmitting}
                          register={register}
                          errors={errors}
                          autoComplete="off"
                          onChange={masks.phoneMask.onChange}
                          required
                          errorTop={true}
                        />

                        <div className="flex items-center gap-x-2 border-b pb-4">
                          <IconBadge icon={ShieldAlert} />
                          <h2 className="text-lg">Segurança</h2>
                        </div>

                        <div className="relative mt-1 ">
                          <InputFloat.Root
                            type={visiblePassword ? 'text' : 'password'}
                            name="password"
                            label="sua nova senha"
                            iconPrimary={FiLock}
                            disabled={isSubmitting}
                            register={register}
                            errors={errors}
                            autoComplete="off"
                            required
                            errorTop={true}
                          />

                          {visiblePassword && (
                            <AiOutlineEye
                              className="absolute right-2 top-[10px] cursor-pointer text-neutral-500"
                              size={25}
                              onClick={() => setVisiblePassword(false)}
                            />
                          )}
                          {!visiblePassword && (
                            <AiOutlineEyeInvisible
                              className="absolute right-2 top-[10px] cursor-pointer text-neutral-500"
                              size={25}
                              onClick={() => setVisiblePassword(true)}
                            />
                          )}
                        </div>

                        <div className="relative mt-1">
                          <InputFloat.Root
                            type={visibleConfirmPassword ? 'text' : 'password'}
                            name="password_confirmation"
                            label="confirma a nova senha"
                            iconPrimary={FiLock}
                            disabled={isSubmitting}
                            autoComplete="off"
                            register={register}
                            errors={errors}
                            required
                            errorTop={true}
                          />

                          {visibleConfirmPassword && (
                            <AiOutlineEye
                              className="absolute right-2 top-[10px] cursor-pointer text-neutral-500"
                              size={25}
                              onClick={() => setVisibleConfirmPassword(false)}
                            />
                          )}
                          {!visibleConfirmPassword && (
                            <AiOutlineEyeInvisible
                              className="absolute right-2 top-[10px] cursor-pointer text-neutral-500"
                              size={25}
                              onClick={() => setVisibleConfirmPassword(true)}
                            />
                          )}
                        </div>
                      </div>

                      <Button
                        disabled={isSubmitting}
                        isLoading={isSubmitting}
                        form={`createProviderIdForm`}
                        type="submit"
                      >
                        {'criar seu cadastro'}
                        <VscArrowRight
                          className="absolute right-12 top-[10px] cursor-pointer"
                          size={25}
                        />
                      </Button>
                    </form>
                  </ContainerSignUp.Content>
                </>
              </ContainerSignUp.Root>
            </div>
          </div>
        )}

        {currentStep === 2 && <SignUpSuccess />}
      </Wrapper>
    </>
  )
}
