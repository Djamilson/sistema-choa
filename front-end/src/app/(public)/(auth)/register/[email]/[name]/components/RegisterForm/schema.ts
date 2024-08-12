import { isValidFullName } from '@/utils/isValidFullName'
import { z } from 'zod'

export const validationSchemaSignin = z
  .object({
    email: z.string({ required_error: 'O e-mail é obrigatório' }).email({
      message: 'Formato de e-mail inválido',
    }),
    name: z
      .string({
        required_error: 'O nome é obrigatório',
      })
      .min(1, { message: 'O nome deve ter pelo menos um caractere' })
      .transform((name) => {
        return name
          .trim()
          .split(' ')
          .map((word) =>
            word[0]?.toLocaleUpperCase().concat(word?.substring(1)),
          )
          .join(' ')
      })
      .refine((val) => isValidFullName(val), {
        message: 'O nome deve ter pelo menos um sobrenome',
      }),
    cpfOrCnpj: z
      .string({
        required_error: 'o cpf/cnpj é obrigatório',
      })
      .min(14, { message: 'o cpf/cnpj está inválido' })
      .max(19, { message: 'o cpf/cnpj está inválido' })
      .transform((cpf) => {
        return cpf.replace(/\D/g, '')
      }),
    phone: z
      .string({
        required_error: 'o telefone é obrigatório',
      })
      .min(1, { message: 'o telefone é obrigatório' })
      .transform((phone) => {
        return phone.replace(/\D/g, '')
      }),
    birth_date: z.string({
      required_error: 'A data de nascimento é obrigatório',
    }),

    password: z
      .string({
        required_error: 'a nova senha é obrigatório',
      })
      .min(6, { message: 'Tem que ter no mínimo 6 caracteres!' }),

    password_confirmation: z
      .string({
        required_error: 'confirma senha é obrigatória',
      })
      .min(6, { message: 'Tem que ter no mínimo 6 caracteres!' }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ['password_confirmation'],
    message: 'as senhas estão diferentes, tente novamente!',
  })
