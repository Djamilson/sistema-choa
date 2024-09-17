'use client'

import { ICar } from '@/@model/car'
import { Button } from '@/components/buttons/Button'
import { ButtonSwitch } from '@/components/buttons/ButtonSwitch'
import { InputFloat } from '@/components/inputs/InputFloat'
import cn from '@/utils/cn'
import { Loader2 } from 'lucide-react'
import { usePlateForm } from './usePlateForm'

export type IPlateFormProps = {
  initialCar: ICar
}

export const PlateForm = ({ initialCar }: IPlateFormProps) => {
  const {
    errors,
    register,
    handleSubmit,
    onSubmit,
    isEditing,
    isSubmitting,
    isValid,
    toggleEdit,
  } = usePlateForm({
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
        {!isEditing && <span>Placa</span>}
        {isSubmitting && (
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        )}
        <ButtonSwitch toggle={toggleEdit} isEditing={isEditing} />
      </div>
      {!isEditing && <p className="mt-2 text-sm">{initialCar?.plate}</p>}
      {isEditing && (
        <form
          className="mt-4 space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          id={`formEditPlate-${initialCar.id}`}
        >
          <InputFloat.Root
            name="plate"
            label="Placa"
            disabled={!isValid || isSubmitting}
            register={register}
            errors={errors}
            autoComplete="off"
            required
          />
          <div className="flex items-center justify-center gap-x-2">
            <Button
              form={`formEditPlate-${initialCar.id}`}
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
