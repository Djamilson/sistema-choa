import { z } from 'zod'

export const validationSchemaBrand = z.object({
  brand: z
    .string({
      required_error: 'a marca é obrigatório',
    })
    .min(1, { message: 'a marca é obrigatório' }),
})
