import { FastifyInstance, RouteHandlerMethod } from 'fastify'
import { EntregadorController } from '../controllers/EntregadorController'

const controller = new EntregadorController()

export async function entregadorRoutes(fastify: FastifyInstance) {

  // Rotas públicas
  fastify.get('/', controller.listarTodos.bind(controller))
  fastify.get('/disponiveis', controller.listarDisponiveis.bind(controller))
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

  fastify.delete('/:id', {
    preHandler: [fastify.authenticate]
  }, controller.deletar.bind(controller) as RouteHandlerMethod)
}

