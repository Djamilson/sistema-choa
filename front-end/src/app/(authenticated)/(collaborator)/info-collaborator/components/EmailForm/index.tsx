'use client'

import { Button } from '@/components/buttons/Button'
import { ButtonSwitch } from '@/components/buttons/ButtonSwitch'
import { InputFloat } from '@/components/inputs/InputFloat'
import cn from '@/utils/cn'
import { Loader2, Mail } from 'lucide-react'
import { useEmailForm } from './useEmailForm'

export const EmailForm = () => {
  const {
    errors,
    register,
    handleSubmit,
    onSubmit,
    isEditing,
    isSubmitting,
    toggleEdit,
    initialUser,
  } = useEmailForm()
  return (
    <div className="mt-6  border bg-slate-100 p-4">
      <div
        className={cn(
          'flex items-center font-medium',
          !isEditing ? `justify-between` : `justify-end`,
        )}
      >
        {!isEditing && <span>Email</span>}
        {isSubmitting && (
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        )}
        <ButtonSwitch
          disabled={true}
          toggle={toggleEdit}
          isEditing={isEditing}
        />
      </div>
      {!isEditing && (
        <p className="mt-2 text-sm">{initialUser?.person.email}</p>
      )}
      {isEditing && (
        <form
          className="mt-4 space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          id="formEditEmail"
        >
          <InputFloat.Root
            name="email"
            label="email"
            iconPrimary={Mail}
            disabled={isSubmitting}
            register={register}
            errors={errors}
            required
          />

          <div className="flex items-center justify-center gap-x-2">
            <Button
              form="formEditEmail"
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
