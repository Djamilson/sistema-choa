const groups = [
  {
    id: 'cjld2cjzh0074qzrmn831i7uj',
    name: 'role-super-admin',
    description: 'Super Administrador',
  },

  {
    id: 'cjld2cjzh0077qzrmn831i7um',
    name: 'role-admin',
    description: 'Administrador',
  },
  {
    id: 'cjld2cjzh0069qzrmn831i7ue',
    name: 'role-user',
    description: 'Usuário',
  },
  {
    id: 'cjld2cjzh0080qzrmn831i7up',
    name: 'role-client',
    description: 'Colaborador',
  },
]

const person = {
  id: 'cjld2cjzh0088qzrmn831i7ux',
  name: 'Djamilson',
  email: 'djamilson@gmail.com',
  cpf: '17984639035',
}

const user = {
  id: 'cjld2cjzh002zrmn831i7sl',
  password: '$2a$08$Jd5PlZgaFaTbLINhRVUzLO.PzTTC1BbPQz54A2VgPIVUJ7CuCh3iK',
  person_id: 'cjld2cjzh0088qzrmn831i7ux',
}

const usersCompaniesGroups = [
  {
    user_id: 'cjld2cjzh002zrmn831i7sl',
    group_id: 'cjld2cjzh0077qzrmn831i7um',
    company_id: 'cjld2cjzh0060qzrmn831i7tv',
  },
  {
    user_id: 'cjld2cjzh002zrmn831i7sl',
    group_id: 'cjld2cjzh0074qzrmn831i7uj',
    company_id: 'cjld2cjzh0060qzrmn831i7tv',
  },
  {
    user_id: 'cjld2cjzh002zrmn831i7sl',
    group_id: 'cjld2cjzh0080qzrmn831i7up',
    company_id: 'cjld2cjzh0060qzrmn831i7tv',
  },
]

export { groups, person, user, usersCompaniesGroups }
