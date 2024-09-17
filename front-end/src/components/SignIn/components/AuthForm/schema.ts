import { z } from 'zod'

export const validationSchemaSignin = z.object({
  email: z.string({ required_error: 'O e-mail é obrigatório' }).email({
    message: 'Formato de e-mail inválido',
  }),
  password: z
    .string({ required_error: 'A senha é obrigatória' })
    .min(1, {
      message: 'A senha é obrigatória',
    })
    .min(6, {
      message: 'A senha precisa ter no mínimo 6 caracteres',
    })
    .max(32, { message: 'A senha deve ter no máximo 32 caracteres' }),
})
