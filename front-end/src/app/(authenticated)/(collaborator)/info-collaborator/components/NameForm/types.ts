import { z } from 'zod'
import { validationSchemaName } from './schema'

export type FormInput = z.infer<typeof validationSchemaName>
