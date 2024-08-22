import { z } from 'zod'
import { validationSchemaDescription } from './schema'

export type FormInputDescription = z.infer<typeof validationSchemaDescription>
