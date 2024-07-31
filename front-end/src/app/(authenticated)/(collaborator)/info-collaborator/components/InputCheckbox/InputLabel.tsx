interface IInputLabelProps {
  label: string
  name: string
}

export function InputLabel({ label, name }: IInputLabelProps) {
  return (
    <label htmlFor={name} className={`text-gray-600`}>
      {label}
    </label>
  )
}
