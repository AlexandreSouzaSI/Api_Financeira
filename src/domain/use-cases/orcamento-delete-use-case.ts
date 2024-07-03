import { Injectable } from '@nestjs/common'
import { OrcamentoRepository } from '../repositories/orcamento-repository'

interface DeleteOrcamentoUseCaseRequest {
  orcamentoId: string
}

@Injectable()
export class DeleteOrcamentoUseCase {
  constructor(private orcamentoRepository: OrcamentoRepository) {}

  async execute({ orcamentoId }: DeleteOrcamentoUseCaseRequest) {
    const orcamento = await this.orcamentoRepository.findById(orcamentoId)

    if (!orcamento) {
      return null
    }

    await this.orcamentoRepository.delete(orcamento)

    return orcamento
  }
}
