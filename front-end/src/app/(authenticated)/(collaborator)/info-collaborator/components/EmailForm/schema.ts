import { z } from 'zod'

export const validationSchemaEmail = z.object({
  email: z.string({ required_error: 'O e-mail é obrigatório' }).email({
    message: 'Formato de e-mail inválido',
  }),
})
