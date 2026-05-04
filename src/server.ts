// import { buildApp } from './app';


// const start = async () => {
//   const app = await buildApp()

//   try {
//     await app.listen({ port: 3004, host: '0.0.0.0' })
//     console.log('API rodando em http://localhost:3004')
//     console.log('Documentação em http://localhost:3004/docs')
//   } catch (err) {
//     app.log.error(err)
//     process.exit(1)
//   }
// }

// start()

import { app } from './app'

app.listen({ port: 3004, host: '0.0.0.0' }).then(() => {
  console.log('🚀 API rodando em http://localhost:3004')
})