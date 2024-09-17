import { z } from 'zod'
import { validationSchemaName } from './schema'

export type FormInputName = z.infer<typeof validationSchemaName>
