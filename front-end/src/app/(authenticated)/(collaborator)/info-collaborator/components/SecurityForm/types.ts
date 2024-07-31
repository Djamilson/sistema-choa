import { z } from 'zod'
import { validationSchemaSecurity } from './schema'

export type FormInput = z.infer<typeof validationSchemaSecurity>
