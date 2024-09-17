'use client'

import { IconBadge } from '@/components/IconBadge'
import { Button } from '@/components/buttons/Button'
import { DatepickerRoot } from '@/components/inputs/Datepicker/DatepickerRoot'
import { InputFloat } from '@/components/inputs/InputFloat'
import * as masks from '@/components/inputs/masks'
import { CakeIcon, FileDigit, Phone, ShieldAlert, User } from 'lucide-react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { FiLock } from 'react-icons/fi'
import { VscArrowRight } from 'react-icons/vsc'
import { ContainerSignUp } from '../ContainerSignUp'
import GoBackSignInLink from '../GoBackSignInLink'
import { useSignUpDataForm } from './useSignUpDataForm'

type ISignDataForm = {
  handlerCurrentStep: () => void
  email: string
}

export default function SignUpDataForm({
  handlerCurrentStep,
  email,
}: ISignDataForm) {
  const {
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
  } = useSignUpDataForm({ handlerCurrentStep, email })

  return (
    <div className="flex justify-center px-1 lg:flex-row">
      <div className="w-full bg-white">
        <ContainerSignUp.Root>
          <>
            <ContainerSignUp.Title icon={<IconBadge icon={User} />}>
              <>
                <span className="text-accent">Oba!!! </span>

                <span className="ml-2 font-normal">
                  agora vamos finalizar o seu cadastro
                </span>
              </>
            </ContainerSignUp.Title>
            <ContainerSignUp.Content>
              <>
                <form
                  className="space-y-8"
                  onSubmit={handleSubmit(onSubmit)}
                  id={`formNewCollaborator`}
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
                          {email}
                        </h2>
                      </div>
                    </div>
                    <InputFloat.Root
                      name="name"
                      iconPrimary={User}
                      label="nome do recebedor"
                      disabled={isSubmitting}
                      register={register}
                      errors={errors}
                      autoComplete="off"
                      required
                      errorTop={false}
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
                        errorTop={false}
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
                        errorTop={false}
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
                        errorTop={false}
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
                    type="submit"
                  >
                    {'criar seu cadastro'}
                    <VscArrowRight
                      className="absolute right-12 top-[10px] cursor-pointer"
                      size={25}
                    />
                  </Button>
                </form>
                <ContainerSignUp.Label />
                <GoBackSignInLink />
              </>
            </ContainerSignUp.Content>
          </>
        </ContainerSignUp.Root>
      </div>
    </div>
  )
}
