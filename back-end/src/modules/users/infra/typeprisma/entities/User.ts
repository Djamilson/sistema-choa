import { QuestionAvaliation } from '@modules/aggregationsProducts/_questions/_questionsAvaliantions/infra/typeprisma/entities/QuestionAvaliation'
import { Question } from '@modules/aggregationsProducts/_questions/infra/typeprisma/entities/Question'
import { Exclude } from 'class-transformer'
import { Person } from './Person'
import { UserCompanyGroup } from './UserCompanyGroup'
class User {
  id: string

  usersGroups: UserCompanyGroup[]
  person: Person
  person_id: string
  is_verified: boolean

  questions: Question[]
  questionAvaliations: QuestionAvaliation[]

  @Exclude()
  password: string

  @Exclude()
  created_at: Date

  @Exclude()
  updated_at: Date
}

export default User
