import { Injectable } from '@nestjs/common'
import { RendaRepository } from '../repositories/renda-repository'

interface DeleteRendaUseCaseRequest {
  rendaId: string
}

@Injectable()
export class DeleteRendaUseCase {
  constructor(private rendaRepository: RendaRepository) {}

  async execute({ rendaId }: DeleteRendaUseCaseRequest) {
    const renda = await this.rendaRepository.findById(rendaId)

    if (!renda) {
      return null
    }

    await this.rendaRepository.delete(renda)

    return renda
  }
}
