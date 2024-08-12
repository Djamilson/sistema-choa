export function isValidFullName(fullName: string): boolean {
  const fullNameRegex = /^[A-Za-zÀ-ú]+(?: [A-Za-zÀ-ú]+)+$/
  console.log('validando name:', fullNameRegex.test(fullName))
  return fullNameRegex.test(fullName)
}
