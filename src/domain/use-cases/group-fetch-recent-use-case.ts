import { Injectable } from '@nestjs/common'
import { GroupRepository } from '../repositories/group-repository'

interface FetchRecentGroupUseCaseRequest {
  userId: string
  page: number
}

@Injectable()
export class FetchRecentGroupUseCase {
  constructor(private groupRepository: GroupRepository) {}

  async execute({ userId, page }: FetchRecentGroupUseCaseRequest) {
    const group = await this.groupRepository.findManyRecent({ page }, userId)

    return { group }
  }
}
