export function isValidFullName(fullName: string): boolean {
  const fullNameRegex = /^[A-Za-zÀ-ú]+(?: [A-Za-zÀ-ú]+)+$/
  return fullNameRegex.test(fullName)
}
