'use client'

import { ICar } from '@/@model/car'
import { Button } from '@/components/buttons/Button'
import { ButtonSwitch } from '@/components/buttons/ButtonSwitch'
import { TextAreaFloat } from '@/components/inputs/TextAreaFloat'
import cn from '@/utils/cn'
import { Loader2 } from 'lucide-react'
import { useNameForm } from './useNameForm'

export type INameFormProps = {
  initialCar: ICar
}

export const NameForm = ({ initialCar }: INameFormProps) => {
  const {
    errors,
    register,
    handleSubmit,
    onSubmit,
    isEditing,
    isSubmitting,
    isValid,
    toggleEdit,
  } = useNameForm({
    initialCar,
  })
  return (
    <div className="mt-6 border bg-slate-100 p-4">
      <div
        className={cn(
          'flex items-center font-medium',
          !isEditing ? `justify-between` : `justify-end`,
        )}
      >
        {!isEditing && <span>Nome da viatura</span>}
        {isSubmitting && (
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        )}
        <ButtonSwitch toggle={toggleEdit} isEditing={isEditing} />
      </div>
      {!isEditing && <p className="mt-2 text-sm">{initialCar?.name}</p>}
      {isEditing && (
        <form
          className="mt-4 space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          id={`formEditName-${initialCar.id}`}
        >
          <TextAreaFloat.Root
            name="name"
            label="Nome"
            disabled={!isValid || isSubmitting}
            register={register}
            errors={errors}
            autoComplete="off"
            required
            rows={5}
          />
          <div className="flex items-center justify-center gap-x-2">
            <Button
              form={`formEditName-${initialCar.id}`}
              disabled={!isValid || isSubmitting}
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
