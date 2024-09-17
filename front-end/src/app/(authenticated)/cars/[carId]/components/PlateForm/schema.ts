import { z } from 'zod'

export const validationSchemaPlate = z.object({
  plate: z
    .string({
      required_error: 'a placa é obrigatório',
    })
    .min(1, { message: 'a place é obrigatório' }),
})
