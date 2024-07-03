import { Injectable } from '@nestjs/common'
import { RendaRepository } from '../repositories/renda-repository'

interface FetchRecentRendaUseCaseRequest {
  userId: string
  page: number
}

@Injectable()
export class FetchRecentRendaUseCase {
  constructor(private rendaRepository: RendaRepository) {}

  async execute({ userId, page }: FetchRecentRendaUseCaseRequest) {
    const renda = await this.rendaRepository.findManyRecent({ page }, userId)

    return { renda }
  }
}
