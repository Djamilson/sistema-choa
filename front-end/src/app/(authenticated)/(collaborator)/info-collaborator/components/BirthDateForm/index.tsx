'use client'

import { Button } from '@/components/buttons/Button'
import { ButtonSwitch } from '@/components/buttons/ButtonSwitch'
import { DatepickerRoot } from '@/components/inputs/Datepicker/DatepickerRoot'
import cn from '@/utils/cn'
import { CakeIcon, Loader2 } from 'lucide-react'
import { useBirthDateForm } from './useBirthDateForm'

export const BirthDateForm = () => {
  const {
    errors,
    register,
    handleSubmit,
    onSubmit,
    isEditing,
    isSubmitting,
    toggleEdit,
    control,
    setValue,
    initialUser,
  } = useBirthDateForm()
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
            {(initialUser?.person?.birth_date && 'Data de nascimento') ||
              'a data de nascimento deve ser cadastrada!'}
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
        <p className="mt-2 text-sm"> {initialUser?.person?.birth_dateFormat}</p>
      )}
      {isEditing && (
        <form
          className="mt-4 space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          id="formEditCpfOrCnpj"
        >
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
            defaultValue={
              initialUser?.person?.birth_date
                ? initialUser?.person?.birth_date
                : ''
            }
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
