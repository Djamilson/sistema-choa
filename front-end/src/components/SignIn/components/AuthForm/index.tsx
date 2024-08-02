'use client'

import { Button } from '@/components/buttons/Button'
import { InputFloat } from '@/components/inputs/InputFloat'
import { Mail } from 'lucide-react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { FiLock } from 'react-icons/fi'
import { useAuthForm } from './useAuthForm'

export default function AuthForm() {
  const {
    onSubmit,
    handleSubmit,
    variant,
    visible,
    register,
    errors,
    setVisible,
    isSubmitting,
  } = useAuthForm()

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <InputFloat.Root
        name="email"
        label="email"
        iconPrimary={Mail}
        disabled={isSubmitting}
        register={register}
        errors={errors}
        required
      />

      <div className="relative mt-1">
        <InputFloat.Root
          type={visible ? 'text' : 'password'}
          name="password"
          label="sua senha"
          iconPrimary={FiLock}
          disabled={isSubmitting}
          register={register}
          errors={errors}
          required
        />

        {visible && (
          <AiOutlineEye
            className="absolute right-2 top-[10px] cursor-pointer text-neutral-500"
            size={25}
            onClick={() => setVisible(false)}
          />
        )}
        {!visible && (
          <AiOutlineEyeInvisible
            className="absolute right-2 top-[10px] cursor-pointer text-neutral-500"
            size={25}
            onClick={() => setVisible(true)}
          />
        )}
      </div>
      <div className="mt-4 flex justify-start px-2 text-sm text-gray-500">
        {variant === 'LOGIN' ? 'esqueceu a senha?' : 'Already have an account?'}

        <button
          onClick={() => {}}
          className="cursor-pointer pl-2 font-semibold underline"
        >
          {variant === 'LOGIN' ? 'recuperar' : 'Login'}
        </button>
      </div>

      <Button disabled={isSubmitting} isLoading={isSubmitting} type="submit">
        {variant === 'LOGIN' ? 'Entrar' : 'Register'}
      </Button>
    </form>
  )
}
