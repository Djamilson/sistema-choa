import { z } from 'zod'
import { validationSchemaBirthDate } from './schema'

export type FormInput = z.infer<typeof validationSchemaBirthDate>
