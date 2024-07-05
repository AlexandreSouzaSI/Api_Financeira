import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { DespesasRepository } from '../repositories/despesas-repository'

interface EditDespesasUseCaseRequest {
  despesaId: string
  name: string
  data?: Date | null
  valor: number
  dataVencimento?: Date | null
  userId: UniqueEntityId
}

@Injectable()
export class EditDespesasUseCase {
  constructor(private despesasRepository: DespesasRepository) {}

  async execute({
    despesaId,
    name,
    data,
    valor,
    dataVencimento,
  }: EditDespesasUseCaseRequest) {
    const despesa = await this.despesasRepository.findById(despesaId)

    if (!despesa) {
      return null
    }

    despesa.name = name
    despesa.data = data ?? null
    despesa.valor = valor
    despesa.dataVencimento = dataVencimento ?? null

    await this.despesasRepository.save(despesa)

    return despesa
  }
}
