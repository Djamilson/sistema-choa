import { z } from 'zod'

export const validationSchemaCpfOrCnpj = z.object({
  cpfOrCnpj: z
    .string({
      required_error: 'o cpf/cnpj é obrigatório',
    })
    .min(14, { message: 'o cpf/cnpj está inválido' })
    .max(19, { message: 'o cpf/cnpj está inválido' })
    .transform((cpfOrCnpj) => {
      return cpfOrCnpj.replace(/\D/g, '')
    }),
})
