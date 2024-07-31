'use client'

import cn from '@/utils/cn'
import ptBR from 'dayjs/locale/pt-br'
import { ElementType, useEffect, useState } from 'react'
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form'
import DatepickerComponent from 'react-tailwindcss-datepicker'
import { Datepicker } from '.'
import { removeTimezone } from '../masks'

export type IDateDatepickerProps = {
  startDate: Date | null
  endDate: Date | null
}

interface IDatepickerRootProps {
  name: string
  iconPrimary?: ElementType
  disabled?: boolean
  errorTop?: boolean
  useRange?: boolean
  label: string
  required?: boolean
  register: UseFormRegister<any>
  errors: FieldErrors
  className?: string
  setValue: UseFormSetValue<any>
  defaultValue?: string
  control: Control<any, any>
}

export function DatepickerRoot({
  name,
  label,
  errors,
  disabled,
  required = true,
  useRange = true,
  errorTop = true,
  iconPrimary: IconPrimary,
  className,
  setValue,
  defaultValue,
  control,
}: IDatepickerRootProps) {
  const [date, setDate] = useState<IDateDatepickerProps>(
    {} as IDateDatepickerProps,
  )

  const handleValueChange = (newValue: any) => {
    const data = newValue as unknown as IDateDatepickerProps

    setDate(newValue)
    setValue(name, data.startDate)
  }

  useEffect(() => {
    if (defaultValue) {
      setDate({
        startDate: new Date(removeTimezone(defaultValue)),
        endDate: new Date(removeTimezone(defaultValue)),
      })
    }
  }, [defaultValue, setDate])

  return (
    <div
      className={cn(
        `group relative w-full`,
        errorTop && errors[name] ? '' : 'mb-4',
      )}
    >
      {IconPrimary && (
        <Datepicker.Icon icon={IconPrimary} errors={errors} name={name} />
      )}

      <Controller
        control={control}
        name={name}
        render={() => (
          <DatepickerComponent
            value={date}
            onChange={handleValueChange}
            asSingle={true}
            displayFormat={'DD/MM/YYYY'}
            placeholder={'dd/mm/yyyy'}
            disabled={disabled}
            i18n={ptBR}
            useRange={useRange}
            inputClassName={cn(
              `peer w-full border bg-white p-2 pb-3 pt-2 font-light shadow-sm outline-none transition placeholder:italic placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-70`,
              IconPrimary ? 'pl-14' : 'pl-4',
              errors[name] ? 'border-rose-500' : 'border-neutral-300',
              errors[name]
                ? 'focus:group-focus:border-rose-500'
                : 'focus:focus:border-sky-500',
              className,
            )}
          />
        )}
        rules={{
          required,
        }}
      />

      <Datepicker.Label
        errors={errors}
        name={name}
        label={label}
        iconPrimary={IconPrimary}
      />
      {errors[name] && (
        <Datepicker.Errors errors={errors} name={name} errorTop={errorTop} />
      )}
    </div>
  )
}
