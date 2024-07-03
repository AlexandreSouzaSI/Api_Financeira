import { Orcamento as PrismaOrcamento, Prisma } from '@prisma/client'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Orcamento } from 'src/domain/entities/orcamento'

export class PrismaOrcamentoMapper {
  static toDomain(raw: PrismaOrcamento): Orcamento {
    return Orcamento.create(
      {
        name: raw.name,
        valor: raw.valor.toNumber(),
        data: raw.data,
        userId: new UniqueEntityId(raw.userId),
        dataVencimento: raw.dataVencimento,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(orcamento: Orcamento): Prisma.OrcamentoUncheckedCreateInput {
    return {
      id: orcamento.id.toString(),
      name: orcamento.name,
      valor: orcamento.valor,
      data: orcamento.data,
      userId: orcamento.userId.toString(),
      dataVencimento: orcamento.data,
      createdAt: orcamento.createdAt,
      updatedAt: orcamento.updatedAt,
    }
  }
}
