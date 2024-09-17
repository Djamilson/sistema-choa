import { z } from 'zod'
import { validationSchemaBrand } from './schema'

export type FormInputBrand = z.infer<typeof validationSchemaBrand>
