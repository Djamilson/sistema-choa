import cn from '@/utils/cn'
import { ElementType } from 'react'

type ISelectedLabelProps = {
  errors?: boolean
  label: string
  name: string
  iconPrimary?: ElementType
}

export function SelectedLabel({
  label,
  errors = false,
  iconPrimary,
  name,
}: ISelectedLabelProps) {
  return (
    <label
      htmlFor={name}
      className={cn(
        `text-md absolute top-5 z-0 origin-[0] transform duration-150`,
        iconPrimary ? 'left-2' : 'left-4',
        `-translate-y-11`,
        iconPrimary ? `-translate-x-2` : '-translate-x-4',
        iconPrimary
          ? `peer-placeholder-shown:translate-x-12`
          : 'peer-placeholder-shown:translate-x-0',
        `peer-placeholder:italic peer-placeholder:text-slate-400 peer-placeholder-shown:-translate-y-2 peer-placeholder-shown:scale-100`,
        iconPrimary ? `peer-focus:-translate-x-2` : 'peer-focus:-translate-x-4',
        `peer-focus:-translate-y-11 peer-focus:scale-75`,
        errors ? 'text-rose-500' : 'text-neutral-500',
      )}
    >
      {label}
    </label>
  )
}
