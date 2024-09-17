// import { PrismaClient } from '@prisma/client';

import { PrismaClient as PrismaClientMongoDb } from '../../../../../prisma/generated/mongodb'
import { PrismaClient as PrismaClientPostgres } from '../../../../../prisma/generated/postgres'
// import { PrismaClient as PrismaClientMysql } from '../../../../../prisma/generated/mysql';
// import { PrismaClient as PrismaClientPostgres } from '../../../../../prisma/generated/postgres'

const postgres = new PrismaClientPostgres({
  log: ['query', 'info', 'warn', 'error'],
})

const mongodb = new PrismaClientMongoDb({
  log: ['query', 'info', 'warn', 'error'],
})

/* const mysql = new PrismaClientMysql({
  log: ['query', 'info', 'warn', 'error'],
}); */

export { mongodb, postgres }
