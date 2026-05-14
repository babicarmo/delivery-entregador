// import { FastifyInstance, RouteHandlerMethod } from 'fastify'
// import { EntregadorController } from '../controllers/EntregadorController'

// const controller = new EntregadorController()

// export async function entregadorRoutes(fastify: FastifyInstance) {

//   // Rotas públicas
//   fastify.get('/', controller.listarTodos.bind(controller))
//   fastify.get('/disponiveis', controller.listarDisponiveis.bind(controller))
//   fastify.get('/:id', controller.buscarPorId.bind(controller) as RouteHandlerMethod)

//   // Rotas protegidas
//   fastify.post('/', {
//     preHandler: [fastify.authenticate]
//   }, controller.criar.bind(controller))

//   fastify.put('/:id', {
//     preHandler: [fastify.authenticate]
//   }, controller.atualizar.bind(controller) as RouteHandlerMethod)

//   fastify.patch('/:id/status', {
//     preHandler: [fastify.authenticate]
//   }, controller.atualizarStatus.bind(controller) as RouteHandlerMethod)

//   fastify.delete('/:id', {
//     preHandler: [fastify.authenticate]
//   }, controller.deletar.bind(controller) as RouteHandlerMethod)
// }

import { FastifyInstance, RouteHandlerMethod } from 'fastify'
import { EntregadorController } from '../controllers/EntregadorController'

const controller = new EntregadorController()

export async function entregadorRoutes(fastify: FastifyInstance) {

  // Rotas públicas
  fastify.get('/', controller.listarTodos.bind(controller))
  fastify.get('/disponiveis', controller.listarDisponiveis.bind(controller))
  fastify.get('/status/:pedidoId', controller.buscarPorPedido.bind(controller) as RouteHandlerMethod)
  fastify.get('/:id', controller.buscarPorId.bind(controller) as RouteHandlerMethod)

  // Rotas protegidas
  fastify.post('/', {
    preHandler: [fastify.authenticate]
  }, controller.criar.bind(controller))

  fastify.put('/:id', {
    preHandler: [fastify.authenticate]
  }, controller.atualizar.bind(controller) as RouteHandlerMethod)

  fastify.patch('/:id/status', {
    preHandler: [fastify.authenticate]
  }, controller.atualizarStatus.bind(controller) as RouteHandlerMethod)

  fastify.patch('/:id/atribuir-pedido', {
    preHandler: [fastify.authenticate]
  }, controller.atribuirPedido.bind(controller) as RouteHandlerMethod)

  fastify.patch('/:id/concluir-entrega', {
    preHandler: [fastify.authenticate]
  }, controller.concluirEntrega.bind(controller) as RouteHandlerMethod)

  fastify.delete('/:id', {
    preHandler: [fastify.authenticate]
  }, controller.deletar.bind(controller) as RouteHandlerMethod)
}