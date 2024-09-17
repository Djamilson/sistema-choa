import AccountsRepository from '@modules/_auth/account/infra/typeprisma/repositories/AccountsRepository'
import { IAccountsRepository } from '@modules/_auth/account/repositories/IAccountsRepository'
import RegistersUsersRepository from '@modules/_auth/registerUser/infra/typeprisma/repositories/RegistersUsersRepository'
import { IRegistersUsersRepository } from '@modules/_auth/registerUser/repositories/IRegistersUsersRepository'
import SessionsOAuthRepository from '@modules/_auth/sessionOAuth/infra/typeprisma/repositories/SessionsOAuthRepository'
import { ISessionsOAuthRepository } from '@modules/_auth/sessionOAuth/repositories/ISessionsOAuthRepository'
import VerificationTokensRepository from '@modules/_auth/verificationToken/infra/typeprisma/repositories/VerificationTokensRepository'
import { IVerificationTokensRepository } from '@modules/_auth/verificationToken/repositories/IVerificationTokensRepository'
import ForgotTokensRepository from '@modules/users/infra/typeprisma/repositories/ForgotTokensRepository'
import GroupsRepository from '@modules/users/infra/typeprisma/repositories/GroupsRepository'
import PersonsRepository from '@modules/users/infra/typeprisma/repositories/PersonsRepository'
import PhonesRepository from '@modules/users/infra/typeprisma/repositories/PhoneRepository'
import UsersCompaniesGroupsRepository from '@modules/users/infra/typeprisma/repositories/UsersCompaniesGroupsRepository'
import UsersRepository from '@modules/users/infra/typeprisma/repositories/UsersRepository'
import IForgotTokensRepository from '@modules/users/repositories/IForgotTokensRepository'
import IGroupsRepository from '@modules/users/repositories/IGroupsRepository'
import IPersonsRepository from '@modules/users/repositories/IPersonsRepository'
import IPhonesRepository from '@modules/users/repositories/IPhonesRepository'
import IUsersCompaniesGroupsRepository from '@modules/users/repositories/IUsersCompaniesGroupsRepository'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import { container } from 'tsyringe'
import { IDateProvider } from './providers/DateProvider/IDateProvider'
import DayjsDateProvider from './providers/DateProvider/implementations/DayjsDateProvider'

import { CarsRepository } from '@modules/cars/infra/typeprisma/repositories/CarsRepository'
import { PhotosRepository } from '@modules/cars/infra/typeprisma/repositories/PhotosRepository'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { IPhotosRepository } from '@modules/cars/repositories/IPhotosRepository'
import './providers'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)

container.registerSingleton<IPersonsRepository>(
  'PersonsRepository',
  PersonsRepository,
)

container.registerSingleton<IPhonesRepository>(
  'PhonesRepository',
  PhonesRepository,
)

container.registerSingleton<IUsersCompaniesGroupsRepository>(
  'UsersCompaniesGroupsRepository',
  UsersCompaniesGroupsRepository,
)

container.registerSingleton<IGroupsRepository>(
  'GroupsRepository',
  GroupsRepository,
)

container.registerSingleton<IForgotTokensRepository>(
  'ForgotTokensRepository',
  ForgotTokensRepository,
)

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider,
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)

container.registerSingleton<IPersonsRepository>(
  'PersonsRepository',
  PersonsRepository,
)

container.registerSingleton<IPhonesRepository>(
  'PhonesRepository',
  PhonesRepository,
)

container.registerSingleton<IUsersCompaniesGroupsRepository>(
  'UsersCompaniesGroupsRepository',
  UsersCompaniesGroupsRepository,
)

container.registerSingleton<IGroupsRepository>(
  'GroupsRepository',
  GroupsRepository,
)

container.registerSingleton<IAccountsRepository>(
  'AccountsRepository',
  AccountsRepository,
)

container.registerSingleton<ISessionsOAuthRepository>(
  'SessionsOAuthRepository',
  SessionsOAuthRepository,
)

container.registerSingleton<IRegistersUsersRepository>(
  'RegistersUsersRepository',
  RegistersUsersRepository,
)

container.registerSingleton<IVerificationTokensRepository>(
  'VerificationTokensRepository',
  VerificationTokensRepository,
)

container.registerSingleton<IPhotosRepository>(
  'PhotosRepository',
  PhotosRepository,
)

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository)
