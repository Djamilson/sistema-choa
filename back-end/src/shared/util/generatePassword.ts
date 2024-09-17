import cuid from 'cuid'

export function generatePassword() {
  let id = cuid() // Gera o CUID
  let newPassword = id.replace(/\D/g, '').substring(0, 6)

  while (newPassword.length < 6) {
    id = cuid()
    newPassword += id.replace(/\D/g, '').substring(0, 6 - newPassword.length)
  }

  return newPassword
}
