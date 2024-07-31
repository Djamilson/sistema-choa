'use client'

import { Button } from '@/components/buttons/Button'
import { ButtonSwitch } from '@/components/buttons/ButtonSwitch'
import { InputFloat } from '@/components/inputs/InputFloat'
import cn from '@/utils/cn'
import { Loader2, User } from 'lucide-react'
import { useNameForm } from './useNameForm'

export const NameForm = () => {
  const {
    errors,
    register,
    handleSubmit,
    onSubmit,
    isEditing,
    isSubmitting,
    toggleEdit,
    initialUser,
    isPending,
  } = useNameForm()
  return (
    <div className="mt-6  border bg-slate-100 p-4">
      <div
        className={cn(
          'flex items-center font-medium',
          !isEditing ? `justify-between` : `justify-end`,
        )}
      >
        {!isEditing && <span>Nome completo</span>}
        {isSubmitting && (
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        )}
        <ButtonSwitch toggle={toggleEdit} isEditing={isEditing} />
      </div>
      {!isEditing && !isPending && (
        <p className="mt-2 text-sm">{initialUser?.person.name}</p>
      )}
      {!isEditing && isPending && (
        <div className="mt-2 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
      )}
      {isEditing && (
        <form
          className="mt-4 space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          id="formEditName"
        >
          <InputFloat.Root
            name="name"
            label="seu nome completo"
            iconPrimary={User}
            disabled={isSubmitting}
            register={register}
            errors={errors}
            required
          />

          <div className="flex items-center justify-center gap-x-2">
            <Button
              form="formEditName"
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
