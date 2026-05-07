import { FastifyRequest, FastifyReply } from 'fastify'
import { EntregadorService } from '../service/EntregadorService'
import {
  criarEntregadorSchema,
  atualizarEntregadorSchema,
  atualizarStatusSchema
} from '../schema/EntregadorSchema'
import { AppError } from '../../../utils/errors'
import '@fastify/multipart'

const service = new EntregadorService()

export class EntregadorController {

  async criar(req: FastifyRequest, reply: FastifyReply) {
    try {
      const parts = req.parts()
      const campos: Record<string, any> = {}
      let fotoBuffer: Buffer | undefined

      for await (const part of parts) {
        if (part.type === 'file') {
          if (!['image/jpeg', 'image/png'].includes(part.mimetype)) {
            return reply.status(422).send({ error: 'Apenas imagens JPG ou PNG são aceitas' })
          }
          const chunks: Buffer[] = []
          for await (const chunk of part.file) {
            chunks.push(chunk)
          }
          fotoBuffer = Buffer.concat(chunks)
        } else {
          campos[part.fieldname] = part.value
        }
      }

      if (campos.veiculo && typeof campos.veiculo === 'string') {
        campos.veiculo = JSON.parse(campos.veiculo)
      }

      const dadosValidados = criarEntregadorSchema.parse(campos)
      const entregador = await service.criar(dadosValidados, fotoBuffer)
      return reply.status(201).send(entregador)
    } catch (err) {
      return tratarErro(err, reply)
    }
  }

  async listarTodos(req: FastifyRequest, reply: FastifyReply) {
    try {
      const entregadores = await service.listarTodos()
      return reply.send(entregadores)
    } catch (err) {
      return tratarErro(err, reply)
    }
  }

  async listarDisponiveis(req: FastifyRequest, reply: FastifyReply) {
    try {
      const entregadores = await service.listarDisponiveis()
      return reply.send(entregadores)
    } catch (err) {
      return tratarErro(err, reply)
    }
  }

  async buscarPorId(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = req.params
      const entregador = await service.buscarPorId(id)
      return reply.send(entregador)
    } catch (err) {
      return tratarErro(err, reply)
    }
  }

  async atualizar(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = req.params
      const parts = req.parts()
      const campos: Record<string, any> = {}
      let fotoBuffer: Buffer | undefined

      for await (const part of parts) {
        if (part.type === 'file') {
          if (!['image/jpeg', 'image/png'].includes(part.mimetype)) {
            return reply.status(422).send({ error: 'Apenas imagens JPG ou PNG são aceitas' })
          }
          const chunks: Buffer[] = []
          for await (const chunk of part.file) {
            chunks.push(chunk)
          }
          fotoBuffer = Buffer.concat(chunks)
        } else {
          campos[part.fieldname] = part.value
        }
      }

      const dadosValidados = atualizarEntregadorSchema.parse(campos)
      const entregador = await service.atualizar(id, dadosValidados, fotoBuffer)
      return reply.send(entregador)
    } catch (err) {
      return tratarErro(err, reply)
    }
  }

  async atualizarStatus(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = req.params
      const dadosValidados = atualizarStatusSchema.parse(req.body)
      const entregador = await service.atualizarStatus(id, dadosValidados)
      return reply.send(entregador)
    } catch (err) {
      return tratarErro(err, reply)
    }
  }

  async deletar(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = req.params
      const resultado = await service.deletar(id)
      return reply.send(resultado)
    } catch (err) {
      return tratarErro(err, reply)
    }
  }
}

function tratarErro(err: unknown, reply: FastifyReply) {
  if (err instanceof AppError) {
    return reply.status(err.statusCode).send({ error: err.message })
  }
  if (err instanceof Error && err.name === 'ZodError') {
    return reply.status(400).send({ error: 'Dados inválidos', detalhes: JSON.parse(err.message) })
  }
  console.error('Erro inesperado:', err)
  return reply.status(500).send({ error: 'Erro interno do servidor' })
}