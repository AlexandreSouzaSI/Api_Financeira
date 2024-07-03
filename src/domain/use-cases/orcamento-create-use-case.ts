import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Orcamento } from '../entities/orcamento'
import { OrcamentoRepository } from '../repositories/orcamento-repository'
import { Injectable } from '@nestjs/common'
import { Either, right } from 'src/core/either'

interface CreateOrcamentoUseCaseRequest {
  name: string
  data?: Date | null
  valor: number
  dataVencimento?: Date | null
  userId: UniqueEntityId
}

type CreateOrcamentoUseCaseResponse = Either<
  null,
  {
    orcamento: Orcamento
  }
>

@Injectable()
export class CreateOrcamentoUseCase {
  constructor(private orcamentoRepository: OrcamentoRepository) {}

  async execute({
    name,
    data,
    valor,
    dataVencimento,
    userId,
  }: CreateOrcamentoUseCaseRequest): Promise<CreateOrcamentoUseCaseResponse> {
    const orcamento = Orcamento.create({
      userId,
      name,
      data,
      valor,
      dataVencimento,
    })

    await this.orcamentoRepository.create(orcamento)

    return right({
      orcamento,
    })
  }
}
