import ISendMailDTO from '../dtos/ISendMailDTO'
import { ICreateEmailResponse } from '../implementations/RESENDMailProvider'

export default interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<ICreateEmailResponse | void | null>
}
