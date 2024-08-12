import User from '@modules/users/infra/typeprisma/entities/User'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { inject, injectable } from 'tsyringe'

export type IUserId = {
  id: string
}

interface IRequest {
  usersId: IUserId[]
  aggregationProductId: string
}

@injectable()
class ListUsersByUserIdAndProductIdReviewsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    usersId,
    aggregationProductId,
  }: IRequest): Promise<any> {
    console.log('usersIdusersId>>=', JSON.stringify(usersId, null, 2))
    const cachekeyListUsersByUserIdAndProductIdReviews = `usersIdReviews:${aggregationProductId}`

    let usersExists = await this.cacheProvider.recover<any>(
      cachekeyListUsersByUserIdAndProductIdReviews,
    )

    if (!usersExists) {
      const meUsers =
        await this.usersRepository.listUsersByUserIdAndProductIdReviews(usersId)

      const usersFinally = instanceToPlain(plainToInstance(User, meUsers))

      await this.cacheProvider.save(
        cachekeyListUsersByUserIdAndProductIdReviews,
        usersFinally,
      )

      usersExists = usersFinally
    }

    return usersExists
  }
}

export { ListUsersByUserIdAndProductIdReviewsService }
