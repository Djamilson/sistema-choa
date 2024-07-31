'use client'

import cn from '@/utils/cn'
import {
  Dispatch,
  ElementType,
  SelectHTMLAttributes,
  SetStateAction,
  forwardRef,
} from 'react'
import Select from 'react-tailwindcss-select'
import { IOption, SelectedMercadoPago } from '.'

interface ISelectRootProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string
  iconPrimary?: ElementType
  label: string
  type?: string
  errors?: boolean
  onChange?: (e: any) => void
  className?: string
  errorTop?: boolean
  defaultValue: any
  setDefaultValue: Dispatch<SetStateAction<any | null>>
  options: IOption[]
  placeholder?: string
  errorMessage: string
}

export const SelectedRoot = forwardRef<HTMLSelectElement, ISelectRootProps>(
  function ForwardedInput(props, ref) {
    const {
      name,
      label,
      errors,
      iconPrimary: IconPrimary,
      options,
      setDefaultValue,
      errorMessage,
      onChange: userOnChange,
      errorTop = true,
      placeholder = 'selecione',
      ...rest
    } = props

    const selectProps = { ...ref, ...rest }

    return (
      <div
        className={cn(
          `group relative w-full`,
          errorTop && errors ? '' : 'mb-4',
        )}
      >
        {IconPrimary && errors && (
          <SelectedMercadoPago.Icon icon={IconPrimary} errors={errors} />
        )}

        <Select
          primaryColor="white"
          onChange={(val: any) => {
            setDefaultValue(val)
            userOnChange && userOnChange(val)
          }}
          options={options}
          classNames={{
            menuButton: ({ isDisabled }: any) =>
              cn(
                `peer flex text-sm text-gray-500 border border-gray-300 rounded-none p-1 shadow-sm transition-all duration-300 focus:outline-none`,
                isDisabled
                  ? 'bg-gray-200 border-accent'
                  : 'bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20',
                errors ? 'border-rose-500' : 'border-neutral-300',
                errors
                  ? 'focus:group-focus:border-rose-500'
                  : 'focus:focus:border-sky-500',
              ),
            menu: 'peer absolute z-10 w-full bg-white shadow-lg border py-1 mt-1.5 text-sm text-gray-700',
            listItem: ({ isSelected }: any) =>
              cn(
                `peer block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded-none`,
                isSelected
                  ? `text-white bg-blue-500`
                  : `text-gray-500 hover:bg-blue-100 hover:text-blue-500`,
              ),
          }}
          formatOptionLabel={(data) => (
            <li
              className={cn(
                `border-b-1 block cursor-pointer select-none truncate rounded-none px-2 py-2 transition duration-200 hover:border-green-100 hover:bg-green-200`,
                !data.isSelected
                  ? 'border-neutral-100'
                  : 'border-2 border-red-100 bg-red-200 text-accent',
              )}
            >
              {data.label}
            </li>
          )}
          {...selectProps}
          placeholder={placeholder}
        />

        <SelectedMercadoPago.Label
          errors={errors}
          name={name}
          label={label}
          iconPrimary={IconPrimary}
        />

        {errors && (
          <SelectedMercadoPago.Errors
            errorMessage={errorMessage}
            errorTop={errorTop}
          />
        )}
      </div>
    )
  },
)
