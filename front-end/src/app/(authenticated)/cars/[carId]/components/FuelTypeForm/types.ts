import { z } from 'zod'
import { validationSchemaFuelType } from './schema'

export type FormInputFuelType = z.infer<typeof validationSchemaFuelType>
