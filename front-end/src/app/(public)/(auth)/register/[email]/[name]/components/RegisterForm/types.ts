import { z } from 'zod'
import { validationSchemaSignin } from './schema'

export type FormInput = z.infer<typeof validationSchemaSignin>
