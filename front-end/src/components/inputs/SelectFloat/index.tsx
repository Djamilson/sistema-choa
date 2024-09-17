import { SelectFloatIcon } from './SelectFloatIcon'
import { SelectedErrors } from './SelectedErrors'
import { SelectedLabel } from './SelectedLabel'
import { SelectedRoot } from './SelectedRoot'

export type IOption = {
  value: any
  label: string
}

export const SelectFloat = {
  Root: SelectedRoot,
  Icon: SelectFloatIcon,
  Label: SelectedLabel,
  Errors: SelectedErrors,
}
