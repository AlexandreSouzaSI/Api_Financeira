import { Injectable } from '@nestjs/common'
import { OrcamentoRepository } from '../repositories/orcamento-repository'

interface FetchOrcamentoUseCaseRequest {
  orcamentoId: string
}

@Injectable()
export class FetchOrcamentoUseCase {
  constructor(private orcamentoRepository: OrcamentoRepository) {}

  async execute({ orcamentoId }: FetchOrcamentoUseCaseRequest) {
    const orcamento = await this.orcamentoRepository.findById(orcamentoId)

    return orcamento
  }
}
