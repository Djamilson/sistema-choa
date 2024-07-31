import { z } from 'zod'

export const validationSchemaSignin = z.object({
  email: z.string({ required_error: 'O e-mail é obrigatório' }).email({
    message: 'Formato de e-mail inválido',
  }),
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
