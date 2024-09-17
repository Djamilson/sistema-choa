import { z } from 'zod'

export const validationSchema = z.object({
  name: z
    .string({
      required_error: 'o nome é obrigatório',
    })
    .min(1, { message: 'o nome é obrigatório' }),
  acronym: z
    .string({
      required_error: 'o prefixo é obrigatório',
    })
    .min(1, { message: 'o prefixo é obrigatório' }),

  description: z.string(),
  brand: z
    .string({
      required_error: 'a marca é obrigatória',
    })
    .min(1, { message: 'a marca é obrigatória' }),
  plate: z
    .string({
      required_error: 'a placa é obrigatória',
    })
    .min(1, { message: 'a placa é obrigatória' }),

  fuel_type: z
    .string({
      required_error: 'tipo de combutível é obrigatório',
    })
    .min(1, { message: 'tipo combutível é obrigatório' }),
})
