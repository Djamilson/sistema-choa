import { z } from 'zod'

export const validationSchemaBirthDate = z.object({
  birth_date: z.string({
    required_error: 'A data de nascimento é obrigatório',
  }),
})
