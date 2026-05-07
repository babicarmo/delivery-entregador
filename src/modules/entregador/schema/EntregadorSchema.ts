import { z } from 'zod'

function validarCPF(cpf: string): boolean {
  const limpo = cpf.replace(/[.\-]/g, '')
  return /^\d{11}$/.test(limpo)
}

function validarCNH(cnh: string): boolean {
  return /^\d{9,11}$/.test(cnh)
}

export const veiculoSchema = z.object({
  tipo: z.string().min(2, 'Tipo deve ter ao menos 2 caracteres'),
  placa: z.string().min(7, 'Placa inválida').max(8, 'Placa inválida').toUpperCase(),
  modelo: z.string().min(2, 'Modelo deve ter ao menos 2 caracteres')
})

export const criarEntregadorSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter ao menos 3 caracteres'),
  telefone: z.string().min(10, 'Telefone inválido').max(20),
  cpf: z.string().refine(validarCPF, {
    message: 'CPF inválido. Use o formato 000.000.000-00 ou 00000000000'
  }),
  cnh: z.string().refine(validarCNH, {
    message: 'CNH inválida. Deve ter entre 9 e 11 dígitos'
  }),
  veiculo: veiculoSchema
})

export const atualizarEntregadorSchema = z.object({
  telefone: z.string().min(10).max(20).optional(),
  foto: z.string().optional()
})

export const atualizarStatusSchema = z.object({
  status: z.enum(['DISPONIVEL', 'EM_ENTREGA', 'INATIVO'], {
    errorMap: () => ({ message: 'Status deve ser: DISPONIVEL, EM_ENTREGA ou INATIVO' })
  })
})

export type CriarEntregadorInput = z.infer<typeof criarEntregadorSchema>
export type AtualizarEntregadorInput = z.infer<typeof atualizarEntregadorSchema>
export type AtualizarStatusInput = z.infer<typeof atualizarStatusSchema>