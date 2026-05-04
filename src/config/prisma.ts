// Cria UMA única conexão com o banco e exporta para todo o projeto
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default prisma