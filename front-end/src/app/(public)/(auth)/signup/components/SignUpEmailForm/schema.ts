import { z } from 'zod'

export const validationSchemaSignin = z.object({
  email: z.string({ required_error: 'O e-mail é obrigatório' }).email({
    message: 'Formato de e-mail inválido',
  }),
})
