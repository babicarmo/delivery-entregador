// import Fastify from 'fastify'
// import multipart from '@fastify/multipart'
// import swagger from '@fastify/swagger'
// import apiReference from '@scalar/fastify-api-reference'
// import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from 'fastify-type-provider-zod'
// import jwtPlugin from './plugins/jwt'
// import { entregadorRoutes } from './modules/entregador/routes/EntregadorRoutes'

// export const buildApp = async () => {
//   const app = Fastify({ logger: true })

//   app.setValidatorCompiler(validatorCompiler)
//   app.setSerializerCompiler(serializerCompiler)

//   await app.register(multipart, {
//     limits: { fileSize: 5 * 1024 * 1024 }
//   })

//   await app.register(jwtPlugin)

//   await app.register(swagger, {
//     openapi: {
//       info: {
//         title: 'API de Entregadores',
//         description: 'Microsserviço responsável pelo gerenciamento de entregadores do sistema de delivery.',
//         version: '1.0.0'
//       },
//       components: {
//         securitySchemes: {
//           bearerAuth: {
//             type: 'http',
//             scheme: 'bearer',
//             bearerFormat: 'JWT'
//           }
//         }
//       }
//     },
//     transform: jsonSchemaTransform
//   })

//   await app.register(apiReference, {
//     routePrefix: '/docs'
//   })

//   app.get('/health', {
//     schema: {
//       tags: ['Status'],
//       summary: 'Verifica se a API está rodando'
//     }
//   }, async () => {
//     return { status: 'ok', servico: 'delivery-entregador', timestamp: new Date().toISOString() }
//   })

//   app.post('/auth/login', {
//     schema: {
//       tags: ['Autenticação'],
//       summary: 'Gera um token JWT',
//       body: {
//         type: 'object',
//         required: ['usuario', 'senha'],
//         properties: {
//           usuario: { type: 'string' },
//           senha: { type: 'string' }
//         }
//       }
//     }
//   }, async (req: any, reply) => {
//     const { usuario, senha } = req.body as { usuario: string; senha: string }

//     if (usuario !== 'admin' || senha !== 'admin123') {
//       return reply.status(401).send({ error: 'Credenciais inválidas' })
//     }

//     const token = app.jwt.sign(
//       { usuario: 'admin', perfil: 'gestor' },
//       { expiresIn: '8h' }
//     )

//     return reply.send({ token })
//   })

//   await app.register(entregadorRoutes, { prefix: '/api/entregadores' })

//   return app
// }


// import Fastify from 'fastify'
// import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
// import jwtPlugin from './plugins/jwt'
// import { entregadorRoutes } from './modules/entregador/routes/EntregadorRoutes'
// import 'dotenv/config'

// export const app = Fastify({ logger: true })

// app.setValidatorCompiler(validatorCompiler)
// app.setSerializerCompiler(serializerCompiler)

// app.register(jwtPlugin)
// app.register(entregadorRoutes, { prefix: '/api/entregadores' })

// import Fastify from 'fastify'
// import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
// import jwtPlugin from './plugins/jwt'
// import { entregadorRoutes } from './modules/entregador/routes/EntregadorRoutes'
// import 'dotenv/config'

// export const app = Fastify({ logger: true })

// app.setValidatorCompiler(validatorCompiler)
// app.setSerializerCompiler(serializerCompiler)

// app.register(jwtPlugin)

// // Rota de login para gerar token JWT
// app.post('/auth/login', async (req: any, reply) => {
//   const { usuario, senha } = req.body as { usuario: string; senha: string }

//   if (usuario !== 'admin' || senha !== 'admin123') {
//     return reply.status(401).send({ error: 'Credenciais inválidas' })
//   }

//   const token = app.jwt.sign(
//     { usuario: 'admin', perfil: 'gestor' },
//     { expiresIn: '8h' }
//   )

//   return reply.send({ token })
// })

// app.register(entregadorRoutes, { prefix: '/api/entregadores' })

import Fastify from 'fastify'
import multipart from '@fastify/multipart'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import jwtPlugin from './plugins/jwt'
import { entregadorRoutes } from './modules/entregador/routes/EntregadorRoutes'
import 'dotenv/config'

export const app = Fastify({ logger: true })

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(multipart, {
  limits: { fileSize: 5 * 1024 * 1024 }
})

app.register(jwtPlugin)

app.post('/auth/login', async (req: any, reply) => {
  const { usuario, senha } = req.body as { usuario: string; senha: string }

  if (usuario !== 'admin' || senha !== 'admin123') {
    return reply.status(401).send({ error: 'Credenciais inválidas' })
  }

  const token = app.jwt.sign(
    { usuario: 'admin', perfil: 'gestor' },
    { expiresIn: '8h' }
  )

  return reply.send({ token })
})

app.register(entregadorRoutes, { prefix: '/api/entregadores' })