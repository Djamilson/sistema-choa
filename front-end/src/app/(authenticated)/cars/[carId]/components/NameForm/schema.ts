import { z } from 'zod'

export const validationSchemaName = z.object({
  name: z
    .string({
      required_error: 'o nome é obrigatório',
    })
    .min(1, { message: 'o nome é obrigatório' }),
})
