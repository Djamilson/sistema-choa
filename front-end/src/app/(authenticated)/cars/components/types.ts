import { z } from 'zod'
import {
  validationSchema,
  validationSchemaEditDescription,
  validationSchemaEditName,
} from './schema'

export type FormInput = z.infer<typeof validationSchema>
export type FormInputEditName = z.infer<typeof validationSchemaEditName>
export type FormInputEditDescription = z.infer<
  typeof validationSchemaEditDescription
>
