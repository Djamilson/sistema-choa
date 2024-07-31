'use client'

import { Button } from '@/components/buttons/Button'
import { InputFloat } from '@/components/inputs/InputFloat'
import { Mail } from 'lucide-react'
import { VscArrowRight } from 'react-icons/vsc'
import { useSignUpEmailForm } from './useSignUpEmailForm'

type ISignUpEmailForm = {
  handlerCurrentStep: () => void
}

export default function SignUpEmailForm({
  handlerCurrentStep,
}: ISignUpEmailForm) {
  const { onSubmit, handleSubmit, register, errors, isSubmitting } =
    useSignUpEmailForm({ handlerCurrentStep })

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <InputFloat.Root
        name="email"
        label="email"
        iconPrimary={Mail}
        disabled={isSubmitting}
        register={register}
        autoComplete="off"
        errors={errors}
        required
      />

      <Button disabled={isSubmitting} isLoading={isSubmitting} type="submit">
        {'próximo'}
        <VscArrowRight
          className="absolute right-12 top-[10px] cursor-pointer"
          size={25}
        />
      </Button>
    </form>
  )
}
