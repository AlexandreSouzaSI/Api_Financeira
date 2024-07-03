import { Injectable } from '@nestjs/common'
import { OrcamentoRepository } from '../repositories/orcamento-repository'
import { Either, right } from 'src/core/either'
import { Orcamento } from '../entities/orcamento'

interface FetchRecentOrcamentoUseCaseRequest {
  userId: string
  page: number
}

type FetchRecentOrcamentoUseCaseResponse = Either<
  null,
  {
    orcamento: Orcamento[]
  }
>

@Injectable()
export class FetchRecentOrcamentoUseCase {
  constructor(private orcamentoRepository: OrcamentoRepository) {}

  async execute({
    userId,
    page,
  }: FetchRecentOrcamentoUseCaseRequest): Promise<FetchRecentOrcamentoUseCaseResponse> {
    const orcamento = await this.orcamentoRepository.findManyRecent(
      { page },
      userId,
    )

    return right({
      orcamento,
    })
  }
}
