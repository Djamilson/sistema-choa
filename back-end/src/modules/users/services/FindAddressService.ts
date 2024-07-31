import { Address } from '@modules/receivers/infra/typeprisma/entities/Address';
import IAddressesRepository from '@modules/receivers/repositories/IAddressesRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
}

@injectable()
class FindAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Address | null> {
    const address = await this.addressesRepository.findById(id);

    return address;
  }
}

export default FindAddressService;
