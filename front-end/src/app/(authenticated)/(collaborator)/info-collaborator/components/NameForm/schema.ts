import { isValidFullName } from '@/utils/isValidFullName'
import { z } from 'zod'

export const validationSchemaName = z.object({
  name: z
    .string({
      required_error: 'O nome é obrigatório',
    })
    .min(1, { message: 'O nome deve ter pelo menos um caractere' })
    .refine((val) => isValidFullName(val), {
      message: 'O nome deve ter pelo menos um sobrenome',
    })
    .transform((name) => {
      return name
        .trim()
        .split(' ')
        .map((word) => word[0]?.toLocaleUpperCase().concat(word?.substring(1)))
        .join(' ')
    }),
})
