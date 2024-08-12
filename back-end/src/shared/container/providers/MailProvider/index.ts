import mailConfig from '@config/mail'
import { container } from 'tsyringe'
import IMailProvider from './models/IMailProvider'

import EtherealMailProvider from './implementations/EtherealMailProvider'
import RESENDMailProvider from './implementations/RESENDMailProvider'
import SESMailProvider from './implementations/SESMailProvider'

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
  resend: container.resolve(RESENDMailProvider),
}

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
)
