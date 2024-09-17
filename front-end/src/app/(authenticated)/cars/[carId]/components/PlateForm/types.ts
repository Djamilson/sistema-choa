import { z } from 'zod'
import { validationSchemaPlate } from './schema'

export type FormInputPlate = z.infer<typeof validationSchemaPlate>
