import { Injectable } from '@nestjs/common'
import { RendaRepository } from '../repositories/renda-repository'

interface FetchRendaUseCaseRequest {
  rendaId: string
}

@Injectable()
export class FetchRendaUseCase {
  constructor(private rendaRepository: RendaRepository) {}

  async execute({ rendaId }: FetchRendaUseCaseRequest) {
    const renda = await this.rendaRepository.findById(rendaId)

    return renda
  }
}
