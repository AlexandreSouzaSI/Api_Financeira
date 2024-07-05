import { Injectable } from '@nestjs/common'
import { DespesasRepository } from '../repositories/despesas-repository'

interface FetchDespesasUseCaseRequest {
  despesaId: string
}

@Injectable()
export class FetchDespesasUseCase {
  constructor(private despesaRepository: DespesasRepository) {}

  async execute({ despesaId }: FetchDespesasUseCaseRequest) {
    const despesa = await this.despesaRepository.findById(despesaId)

    return despesa
  }
}
