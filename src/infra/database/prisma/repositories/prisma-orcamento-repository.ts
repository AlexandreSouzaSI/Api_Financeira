import { Injectable } from '@nestjs/common'
import { PaginationParams } from 'src/core/repositories/pagination-params'
import { Orcamento } from 'src/domain/entities/orcamento'
import { OrcamentoRepository } from 'src/domain/repositories/orcamento-repository'
import { PrismaService } from '../prisma.service'
import { PrismaOrcamentoMapper } from '../mappers/prisma-orcamento-mapper'

@Injectable()
export class PrismaOrcamentoRepository implements OrcamentoRepository {
  constructor(private prisma: PrismaService) {}

  async create(orcamento: Orcamento) {
    const data = PrismaOrcamentoMapper.toPrisma(orcamento)

    await this.prisma.orcamento.create({
      data,
    })
  }

  async findById(id: string) {
    const orcamento = await this.prisma.orcamento.findUnique({
      where: {
        id,
      },
    })

    if (!orcamento) {
      return null
    }

    return PrismaOrcamentoMapper.toDomain(orcamento)
  }

  async findManyRecent({ page }: PaginationParams, id: string) {
    const orcamento = await this.prisma.orcamento.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
      skip: (page - 1) * 10,
      where: {
        userId: id,
      },
    })

    return orcamento.map(PrismaOrcamentoMapper.toDomain)
  }

  async save(orcamento: Orcamento) {
    const data = PrismaOrcamentoMapper.toPrisma(orcamento)

    await this.prisma.orcamento.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(orcamento: Orcamento) {
    const data = PrismaOrcamentoMapper.toPrisma(orcamento)

    await this.prisma.orcamento.delete({
      where: {
        id: data.id,
      },
    })
  }
}
