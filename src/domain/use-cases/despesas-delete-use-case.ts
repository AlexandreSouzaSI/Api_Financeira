import { Injectable } from '@nestjs/common'
import { DespesasRepository } from '../repositories/despesas-repository'

interface DeleteDespesasUseCaseRequest {
  despesaId: string
}

@Injectable()
export class DeleteDespesasUseCase {
  constructor(private despesaRepository: DespesasRepository) {}

  async execute({ despesaId }: DeleteDespesasUseCaseRequest) {
    const despesa = await this.despesaRepository.findById(despesaId)

    if (!despesa) {
      return null
    }

    await this.despesaRepository.delete(despesa)

    return despesa
  }
}
