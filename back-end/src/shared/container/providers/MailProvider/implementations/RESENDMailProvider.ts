import mailConfig from '@config/mail'
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider'
import AppError from '@shared/errors/AppError'
import { ErrorResponse, Resend } from 'resend'
import { inject, injectable } from 'tsyringe'
import ISendMailDTO from '../dtos/ISendMailDTO'
import IMailProvider from '../models/IMailProvider'

type ICreateEmailResponseSuccess = {
  id: string
}
export type ICreateEmailResponse = {
  data: ICreateEmailResponseSuccess | null
  error: ErrorResponse | null
}

@injectable()
export default class RESENDMailProvider implements IMailProvider {
  private resend = new Resend(process.env.MAIL_RESEND_KEY)

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {}

  public async sendMail({
    to,
    subject,
    templateData,
  }: ISendMailDTO): Promise<ICreateEmailResponse | any> {
    try {
      const { email } = mailConfig.defaults.from

      console.log('Emailll email =>>:', email)
      console.log('Emailll', to)

      const { data, error } = await this.resend.emails.send({
        from: email,
        to: to.email,
        subject,
        html: await this.mailTemplateProvider.parse(templateData),
      })

      console.log('data, error', data, error)

      return { data, error }
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}
