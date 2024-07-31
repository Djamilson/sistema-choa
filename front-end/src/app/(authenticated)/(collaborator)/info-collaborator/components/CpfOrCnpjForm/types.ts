import { z } from 'zod'
import { validationSchemaCpfOrCnpj } from './schema'

export type FormInput = z.infer<typeof validationSchemaCpfOrCnpj>
