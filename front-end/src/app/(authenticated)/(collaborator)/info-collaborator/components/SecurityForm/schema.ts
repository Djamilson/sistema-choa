import { z } from 'zod'

export const validationSchemaSecurity = z
  .object({
    old_password: z
      .string({
        required_error: 'a senha antiga é obrigatória',
      })
      .min(6, { message: 'Tem que ter no mínimo 6 caracteres!' }),

    password: z
      .string({
        required_error: 'a nova senha é obrigatório',
      })
      .min(6, { message: 'Tem que ter no mínimo 6 caracteres!' }),

    password_confirmation: z
      .string({
        required_error: 'confirma senha é obrigatória',
      })
      .min(6, { message: 'Tem que ter no mínimo 6 caracteres!' }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ['password_confirmation'],
    message: 'as senhas estão diferentes, tente novamente!',
  })
