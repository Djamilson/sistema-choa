import { z } from 'zod'

export const validationSchemaDescription = z.object({
  description: z
    .string({
      required_error: 'a descrição é obrigatório',
    })
    .min(1, { message: 'a descrição é obrigatório' }),
})
