import { z } from 'zod'
import { validationSchemaEmail } from './schema'

export type FormInput = z.infer<typeof validationSchemaEmail>
