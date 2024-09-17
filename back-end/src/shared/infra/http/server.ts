import { config } from 'dotenv'
import 'es6-shim'
import 'reflect-metadata'

// documents
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from '../../../swagger.json'

import { errors } from 'celebrate'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'

import '@shared/container'
import { postgres } from '@shared/infra/prisma/lib/prismaClient'

import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError'

// import rateLimiter from './middlewares/rateLimiter';

import routes from './routes'

const processId = process.pid

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}
const app = express()

app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(express.json())
app.use('/files', express.static(uploadConfig.uploadsFolder))
// analisa as conexões por IP
// app.use(rateLimiter);

app.use(routes)

app.use(errors())

// tratar os erros
app.use((err: any, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    const meErrCode = err?.statusCode || 400

    return res.status(meErrCode).json({
      status: 'error',
      message: err.message,
    })
  }
  // console.log(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error, or unauthenticated',
  })
})

const server = app
  .listen(process.env.API_PORT, () => {
    // console.log(`🔥 API BACKEND INICIADA NA PORTA ${process.env.API_PORT} 🚀⭐️`);
  })
  .on('listening', () => {
    console.log(
      `🔥 API BACKEND INICIADA NA PORTA ${process.env.API_PORT}, processo ${processId} 🚀⭐️`,
    )
  })

// captura erros não tratados
// se não tiver ele o sistema quebra
process.on('uncaughtException', (error, origin) => {
  console.log(`\n${origin} signal received. \n${error} 🧨🧨`)
})

// se nao tiver ele, o sistema joga um warn
process.on('unhandledRejection', (error) => {
  console.log(`\nunhandledRejection signal received. \n${error} 💥💥`)
})

// closePostGres
async function handleClosePostGres() {
  const prismaPostgres = postgres

  await prismaPostgres.$disconnect()
}
// ---- grafulshutdown
function grafulShutdown(event: any) {
  return (code: any) => {
    console.log(`${event} received! with ${code}`)
    // garantimos que nenhum cliente vai entrar nessa aplicação no periodo
    // mas quem está em alguma transação, termina o que está fazendo
    server.close(async () => {
      console.log('http server closed 🙅❌', new Date().toISOString())
      console.log('DB connection closed 🙅❌', new Date().toISOString())
      await handleClosePostGres()
      process.exit(code)
    })
  }
}

// Disparado no Ctrl + C no terminal -> multi plataforma
process.on('SIGINT', grafulShutdown('SIGINT'))

// Disparado no kill
// aguardar as conexoes serem encerradas para só então encerrar o programa
process.on('SIGTERM', grafulShutdown('SIGTERM'))

process.on('exit', (code) => {
  console.log('exit signal received 👎🚦', code)
})

// vamos simular que um erro aleatorio aconteceu
/* setTimeout(() => {
  process.exit(1)
}, Math.random() * 1e4) // 10.000
*/
