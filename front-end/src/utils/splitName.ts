export function splitName(fullName: string) {
  const parts = fullName.split(' ')
  const firstName = parts[0]
  const lastName = parts.slice(1).join(' ')

  return [firstName, lastName]
}
