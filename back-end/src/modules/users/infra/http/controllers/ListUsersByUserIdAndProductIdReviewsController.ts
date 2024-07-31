import { ListUsersByUserIdAndProductIdReviewsService } from '@modules/users/services/ListUsersByUserIdAndProductIdReviewsService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class ListUsersByUserIdAndProductIdReviewsController {
  public async show(req: Request, res: Response): Promise<Response> {
    try {
      const { aggregationProductId } = req.params
      const { usersId } = req.body

      console.log('productID>>=', JSON.stringify(req.params, null, 2))
      console.log('req.body>>=', JSON.stringify(req.body, null, 2))

      const listUsersByUserIdAndProductIdReviewsService = container.resolve(
        ListUsersByUserIdAndProductIdReviewsService,
      )

      const users = await listUsersByUserIdAndProductIdReviewsService.execute({
        aggregationProductId,
        usersId,
      })

      return res.status(200).json(users)
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}

export { ListUsersByUserIdAndProductIdReviewsController }
