import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Renda } from '../entities/renda'
import { RendaRepository } from '../repositories/renda-repository'
import { Injectable } from '@nestjs/common'

interface CreateRendaUseCaseRequest {
  userId: UniqueEntityId
  name: string
  data?: Date | null
  valor: number
}

@Injectable()
export class CreateRendaUseCase {
  constructor(private rendaRepository: RendaRepository) {}

  async execute({ name, valor, data, userId }: CreateRendaUseCaseRequest) {
    const renda = Renda.create({
      name,
      userId,
      valor,
      data,
    })

    await this.rendaRepository.create(renda)

    return renda
  }
}
