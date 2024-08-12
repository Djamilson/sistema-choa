export function extractDataPhone(phone: string) {
  const countryCode = phone.slice(0, 2)
  const stateCode = phone.slice(2, 4)
  const phoneNumber = phone.slice(4)

  return {
    countryCode,
    stateCode,
    phoneNumber,
  }
}
