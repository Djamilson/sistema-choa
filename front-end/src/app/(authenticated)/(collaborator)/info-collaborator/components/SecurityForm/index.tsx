'use client'

import { Hr } from '@/components/Hr'
import { Button } from '@/components/buttons/Button'
import { ButtonSwitch } from '@/components/buttons/ButtonSwitch'
import { InputFloat } from '@/components/inputs/InputFloat'
import cn from '@/utils/cn'
import { Loader2 } from 'lucide-react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { FiLock } from 'react-icons/fi'
import { useSecurityForm } from './useSecurityForm'

export const SecurityForm = () => {
  const {
    errors,
    register,
    handleSubmit,
    onSubmit,
    isEditing,
    isSubmitting,
    toggleEdit,

    visiblePasswordOld,
    visiblePassword,
    visibleConfirmPassword,
    setVisiblePasswordOld,
    setVisiblePassword,
    setVisibleConfirmPassword,
  } = useSecurityForm()
  return (
    <div className="mt-6 border bg-slate-100 p-4">
      <div
        className={cn(
          'flex items-center font-medium',
          !isEditing ? `justify-between` : `justify-end`,
        )}
      >
        {!isEditing && <span>Senha</span>}
        {isSubmitting && (
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        )}
        <ButtonSwitch toggle={toggleEdit} isEditing={isEditing} />
      </div>
      {!isEditing && <p className="mt-2 text-sm">*******</p>}
      {isEditing && (
        <form
          className="mt-4 space-y-8"
          onSubmit={handleSubmit(onSubmit)}
          id="formEditSecurity"
        >
          <div className="relative mt-1">
            <InputFloat.Root
              type={visiblePasswordOld ? 'text' : 'password'}
              name="old_password"
              label="sua senha atual"
              iconPrimary={FiLock}
              disabled={isSubmitting}
              register={register}
              autoComplete="off"
              errors={errors}
              required
              errorTop={false}
            />

            {visiblePasswordOld && (
              <AiOutlineEye
                className="absolute right-2 top-[10px] cursor-pointer text-neutral-500"
                size={25}
                onClick={() => setVisiblePasswordOld(false)}
              />
            )}
            {!visiblePasswordOld && (
              <AiOutlineEyeInvisible
                className="absolute right-2 top-[10px] cursor-pointer text-neutral-500"
                size={25}
                onClick={() => setVisiblePasswordOld(true)}
              />
            )}
          </div>

          <Hr />

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

          <div className="flex items-center justify-center gap-x-2">
            <Button
              form="formEditSecurity"
              disabled={isSubmitting}
              type="submit"
              className={`max-w-xs border-none bg-success text-white hover:bg-success-hover hover:ring-success-hover hover:ring-offset-white`}
            >
              Salvar
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
