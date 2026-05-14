// import { v4 as uuidv4 } from 'uuid'
// // Importação direta do PrismaClient para evitar erros de undefined
// import { PrismaClient } from '@prisma/client'
// import { NotFoundError, ConflictError, ValidationError } from '../../../utils/errors'
// import {
//   CriarEntregadorInput,
//   AtualizarEntregadorInput,
//   AtualizarStatusInput
// } from '../schema/EntregadorSchema'
// import { formatarEntregador } from '../entregador.mapper'

// // Instanciando o prisma aqui para garantir que ele esteja disponível em todas as funções
// const prisma = new PrismaClient()

// export class EntregadorService {

//   async criar(dados: CriarEntregadorInput, fotoBuffer?: Buffer) {
//     const cpfLimpo = dados.cpf.replace(/[.\-]/g, '')

//     const existeCPF = await prisma.entregador.findUnique({ where: { cpf: cpfLimpo } })
//     if (existeCPF) throw new ConflictError('CPF já cadastrado')

//     const existeCNH = await prisma.entregador.findUnique({ where: { cnh: dados.cnh } })
//     if (existeCNH) throw new ConflictError('CNH já cadastrada')

//     const existePlaca = await prisma.veiculo.findUnique({ where: { placa: dados.veiculo.placa } })
//     if (existePlaca) throw new ConflictError('Placa já cadastrada')

//     const veiculoId = uuidv4()
//     const entregadorId = uuidv4()

//     const entregador = await prisma.$transaction(async (tx: any) => {
//       await tx.veiculo.create({
//         data: {
//           id: veiculoId,
//           tipo: dados.veiculo.tipo,
//           placa: dados.veiculo.placa,
//           modelo: dados.veiculo.modelo
//         }
//       })

//       const novoEntregador = await tx.entregador.create({
//         data: {
//           id: entregadorId,
//           nome: dados.nome,
//           telefone: dados.telefone,
//           cpf: cpfLimpo,
//           cnh: dados.cnh,
//           foto: fotoBuffer || null,
//           status: 'DISPONIVEL',
//           veiculo_id: veiculoId
//         },
//         include: { veiculo: true }
//       })

//       return novoEntregador
//     })

//     return formatarEntregador(entregador)
//   }

//   async listarTodos() {
//     const entregadores = await prisma.entregador.findMany({
//       include: { veiculo: true },
//       orderBy: { nome: 'asc' }
//     })
//     return entregadores.map((e: any) => formatarEntregador(e))
//   }

//   async listarDisponiveis() {
//     const entregadores = await prisma.entregador.findMany({
//       where: { status: 'DISPONIVEL' },
//       include: { veiculo: true },
//       orderBy: { nome: 'asc' }
//     })
//     return entregadores.map((e: any) => formatarEntregador(e))
//   }

//   async buscarPorId(id: string) {
//     const entregador = await prisma.entregador.findUnique({
//       where: { id },
//       include: { veiculo: true }
//     })
//     if (!entregador) throw new NotFoundError('Entregador não encontrado')
//     return formatarEntregador(entregador)
//   }

//   async atualizar(id: string, dados: AtualizarEntregadorInput, fotoBuffer?: Buffer) {
//     const existe = await prisma.entregador.findUnique({ where: { id } })
//     if (!existe) throw new NotFoundError('Entregador não encontrado')

//     const dadosAtualizar: { telefone?: string; foto?: Buffer } = {}
//     if (dados.telefone) dadosAtualizar.telefone = dados.telefone
//     if (fotoBuffer)     dadosAtualizar.foto = fotoBuffer

//     const entregador = await prisma.entregador.update({
//       where: { id },
//       data: dadosAtualizar,
//       include: { veiculo: true }
//     })
//     return formatarEntregador(entregador)
//   }

//   async atualizarStatus(id: string, dados: AtualizarStatusInput) {
//     const existe = await prisma.entregador.findUnique({ where: { id } })
//     if (!existe) throw new NotFoundError('Entregador não encontrado')

//     const entregador = await prisma.entregador.update({
//       where: { id },
//       data: { status: dados.status },
//       include: { veiculo: true }
//     })
//     return formatarEntregador(entregador)
//   }

//   async deletar(id: string) {
//     const entregador = await prisma.entregador.findUnique({ where: { id } })
//     if (!entregador) throw new NotFoundError('Entregador não encontrado')

//     if (entregador.status !== 'INATIVO') {
//       throw new ValidationError('Apenas entregadores INATIVOS podem ser removidos')
//     }

//     await prisma.$transaction(async (tx: any) => {
//       await tx.entregador.delete({ where: { id } })
//       await tx.veiculo.delete({ where: { id: entregador.veiculo_id } })
//     })

//     return { mensagem: 'Entregador removido com sucesso' }
//   }
// }


import { v4 as uuidv4 } from 'uuid'
import prisma from '../../../config/prisma'
import { NotFoundError, ConflictError, ValidationError } from '../../../utils/errors'
import {
  CriarEntregadorInput,
  AtualizarEntregadorInput,
  AtualizarStatusInput
} from '../schema/EntregadorSchema'
import { formatarEntregador } from '../entregador.mapper'

export class EntregadorService {

  async criar(dados: CriarEntregadorInput, fotoBuffer?: Buffer) {
    const cpfLimpo = dados.cpf.replace(/[.\-]/g, '')

    const existeCPF = await prisma.entregador.findUnique({ where: { cpf: cpfLimpo } })
    if (existeCPF) throw new ConflictError('CPF já cadastrado')

    const existeCNH = await prisma.entregador.findUnique({ where: { cnh: dados.cnh } })
    if (existeCNH) throw new ConflictError('CNH já cadastrada')

    const existePlaca = await prisma.veiculo.findUnique({ where: { placa: dados.veiculo.placa } })
    if (existePlaca) throw new ConflictError('Placa já cadastrada')

    const veiculoId = uuidv4()
    const entregadorId = uuidv4()

    const entregador = await prisma.$transaction(async (tx: any) => {
      await tx.veiculo.create({
        data: {
          id: veiculoId,
          tipo: dados.veiculo.tipo,
          placa: dados.veiculo.placa,
          modelo: dados.veiculo.modelo
        }
      })

      const novoEntregador = await tx.entregador.create({
        data: {
          id: entregadorId,
          nome: dados.nome,
          telefone: dados.telefone,
          cpf: cpfLimpo,
          cnh: dados.cnh,
          foto: fotoBuffer || null,
          status: 'DISPONIVEL',
          veiculo_id: veiculoId,
          pedidoAtualId: null
        },
        include: { veiculo: true }
      })

      return novoEntregador
    })

    return formatarEntregador(entregador)
  }

  async listarTodos() {
    const entregadores = await prisma.entregador.findMany({
      include: { veiculo: true },
      orderBy: { nome: 'asc' }
    })
    return entregadores.map((e: any) => formatarEntregador(e))
  }

  async listarDisponiveis() {
    const entregadores = await prisma.entregador.findMany({
      where: { status: 'DISPONIVEL' },
      include: { veiculo: true },
      orderBy: { nome: 'asc' }
    })
    return entregadores.map((e: any) => formatarEntregador(e))
  }

  async buscarPorId(id: string) {
    const entregador = await prisma.entregador.findUnique({
      where: { id },
      include: { veiculo: true }
    })
    if (!entregador) throw new NotFoundError('Entregador não encontrado')
    return formatarEntregador(entregador)
  }

  async buscarPorPedido(pedidoId: string) {
    const entregador = await prisma.entregador.findFirst({
      where: { pedidoAtualId: pedidoId },
      include: { veiculo: true }
    })
    if (!entregador) throw new NotFoundError('Nenhum entregador encontrado para esse pedido')
    return formatarEntregador(entregador)
  }

  async atualizar(id: string, dados: AtualizarEntregadorInput, fotoBuffer?: Buffer) {
    const existe = await prisma.entregador.findUnique({ where: { id } })
    if (!existe) throw new NotFoundError('Entregador não encontrado')

    const dadosAtualizar: { telefone?: string; foto?: Buffer } = {}
    if (dados.telefone) dadosAtualizar.telefone = dados.telefone
    if (fotoBuffer)     dadosAtualizar.foto = fotoBuffer

    const entregador = await prisma.entregador.update({
      where: { id },
      data: dadosAtualizar,
      include: { veiculo: true }
    })
    return formatarEntregador(entregador)
  }

  async atualizarStatus(id: string, dados: AtualizarStatusInput) {
    const existe = await prisma.entregador.findUnique({ where: { id } })
    if (!existe) throw new NotFoundError('Entregador não encontrado')

    const entregador = await prisma.entregador.update({
      where: { id },
      data: { status: dados.status },
      include: { veiculo: true }
    })
    return formatarEntregador(entregador)
  }

  async atribuirPedido(id: string, pedidoId: string) {
    const entregador = await prisma.entregador.findUnique({ where: { id } })
    if (!entregador) throw new NotFoundError('Entregador não encontrado')

    if (entregador.status !== 'DISPONIVEL') {
      throw new ValidationError('Entregador não está disponível')
    }

    const updated = await prisma.entregador.update({
      where: { id },
      data: {
        status: 'EM_ENTREGA',
        pedidoAtualId: pedidoId
      },
      include: { veiculo: true }
    })
    return formatarEntregador(updated)
  }

  async concluirEntrega(id: string) {
    const entregador = await prisma.entregador.findUnique({ where: { id } })
    if (!entregador) throw new NotFoundError('Entregador não encontrado')

    if (entregador.status !== 'EM_ENTREGA') {
      throw new ValidationError('Entregador não está em entrega')
    }

    const updated = await prisma.entregador.update({
      where: { id },
      data: {
        status: 'DISPONIVEL',
        pedidoAtualId: null
      },
      include: { veiculo: true }
    })
    return formatarEntregador(updated)
  }

  async deletar(id: string) {
    const entregador = await prisma.entregador.findUnique({ where: { id } })
    if (!entregador) throw new NotFoundError('Entregador não encontrado')

    if (entregador.status !== 'INATIVO') {
      throw new ValidationError('Apenas entregadores INATIVOS podem ser removidos')
    }

    await prisma.$transaction(async (tx: any) => {
      await tx.entregador.delete({ where: { id } })
      await tx.veiculo.delete({ where: { id: entregador.veiculo_id } })
    })

    return { mensagem: 'Entregador removido com sucesso' }
  }
}