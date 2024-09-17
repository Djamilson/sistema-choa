import { z } from 'zod'

export const validationSchemaAcronym = z.object({
  acronym: z
    .string({
      required_error: 'o prefixo é obrigatório',
    })
    .min(1, { message: 'o prefixo é obrigatório' }),
})
