'use client'

import { Button } from '@/components/buttons/Button'
import { ButtonSwitch } from '@/components/buttons/ButtonSwitch'
import { InputFloat } from '@/components/inputs/InputFloat'
import * as masks from '@/components/inputs/masks'
import cn from '@/utils/cn'
import { compareTypeDoc } from '@/utils/compareTypeDoc'
import { FileDigit, Loader2 } from 'lucide-react'
import { useCpfOrCnpjForm } from './useCpfOrCnpjForm'

export const CpfOrCnpjForm = () => {
  const {
    errors,
    register,
    handleSubmit,
    onSubmit,
    isEditing,
    isSubmitting,
    toggleEdit,
    initialUser,
  } = useCpfOrCnpjForm()
  return (
    <div className="mt-6  border bg-slate-100 p-4">
      <div
        className={cn(
          'flex items-center font-medium',
          !isEditing ? `justify-between` : `justify-end`,
        )}
      >
        {!isEditing && (
          <span>
            {(initialUser?.person?.cpf &&
              compareTypeDoc(initialUser?.person?.cpf)) ||
              'cpf/cnpj'}
          </span>
        )}
        {isSubmitting && (
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        )}
        <ButtonSwitch toggle={toggleEdit} isEditing={isEditing} />
      </div>
      {!isEditing && (
        <p className="mt-2 text-sm">
          {initialUser?.person?.cpfOrCnpjFormat
            ? initialUser?.person?.cpfOrCnpjFormat
            : 'Ainda não tem CPF ou Cnpj'}
        </p>
      )}

      {isEditing && (
        <form
          className="mt-4 space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          id="formEditCpfOrCnpj"
        >
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

          <div className="flex items-center justify-center gap-x-2">
            <Button
              form="formEditCpfOrCnpj"
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
