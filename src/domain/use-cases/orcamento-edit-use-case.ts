import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { OrcamentoRepository } from '../repositories/orcamento-repository'
import { Injectable } from '@nestjs/common'

interface EditOrcamentoUseCaseRequest {
  orcamentoId: string
  name: string
  data?: Date | null
  valor: number
  dataVencimento?: Date | null
  userId: UniqueEntityId
}

@Injectable()
export class EditOrcamentoUseCase {
  constructor(private orcamentoRepository: OrcamentoRepository) {}

  async execute({
    orcamentoId,
    name,
    data,
    valor,
    dataVencimento,
  }: EditOrcamentoUseCaseRequest) {
    const orcamento = await this.orcamentoRepository.findById(orcamentoId)

    if (!orcamento) {
      return null
    }

    orcamento.name = name
    orcamento.data = data ?? null
    orcamento.valor = valor
    orcamento.dataVencimento = dataVencimento ?? null

    await this.orcamentoRepository.save(orcamento)

    return orcamento
  }
}
