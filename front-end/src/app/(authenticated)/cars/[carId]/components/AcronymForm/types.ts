import { z } from 'zod'
import { validationSchemaAcronym } from './schema'

export type FormInputAcronym = z.infer<typeof validationSchemaAcronym>
