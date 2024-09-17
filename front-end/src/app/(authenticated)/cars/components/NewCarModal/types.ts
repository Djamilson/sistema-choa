import { z } from 'zod'
import { validationSchema } from './schema'

export type FormInput = z.infer<typeof validationSchema>
