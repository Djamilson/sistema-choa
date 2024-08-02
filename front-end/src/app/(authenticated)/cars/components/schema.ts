import { z } from 'zod'

export const validationSchema = z.object({
  name: z
    .string({
      required_error: 'o nome é obrigatório',
    })
    .min(1, { message: 'o nome é obrigatório' })
    .toLowerCase(),
})

export const validationSchemaEditName = z.object({
  name: z
    .string({
      required_error: 'o nome é obrigatório',
    })
    .min(1, { message: 'o nome é obrigatório' })
    .transform((name) => {
      return name
        .trim()
        .split(' ')
        .map((word) => {
          return word[0]?.toLocaleUpperCase().concat(word?.substring(1))
        })
        .join(' ')
    }),
})

export const validationSchemaEditDescription = z.object({
  description: z.string({
    required_error: 'a descrição é obrigatória',
  }),
})
