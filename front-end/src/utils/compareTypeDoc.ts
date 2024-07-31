export function compareTypeDoc(value: string): string {
  return value.replace(/\D/g, '').length === 11 ? 'CPF' : 'CNPJ'
}
