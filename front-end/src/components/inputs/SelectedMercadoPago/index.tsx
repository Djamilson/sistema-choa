import { SelectedErrors } from './SelectedErrors'
import { SelectedIcon } from './SelectedIcon'
import { SelectedLabel } from './SelectedLabel'
import { SelectedRoot } from './SelectedRoot'

export type IOption = {
  value: any
  label: string
}

export const SelectedMercadoPago = {
  Root: SelectedRoot,
  Label: SelectedLabel,
  Errors: SelectedErrors,
  Icon: SelectedIcon,
}
