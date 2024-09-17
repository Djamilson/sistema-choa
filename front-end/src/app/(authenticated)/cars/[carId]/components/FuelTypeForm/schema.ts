import { z } from 'zod'

export const validationSchemaFuelType = z.object({
  fuel_type: z
    .string({
      required_error: 'o tipo de combustível é obrigatório',
    })
    .min(1, { message: 'o tipo de combustível é obrigatório' }),
})
