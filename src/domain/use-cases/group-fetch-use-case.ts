import { Injectable } from '@nestjs/common'
import { GroupRepository } from '../repositories/group-repository'

interface FetchGroupUseCaseRequest {
  groupId: string
}

@Injectable()
export class FetchGroupUseCase {
  constructor(private groupRepository: GroupRepository) {}

  async execute({ groupId }: FetchGroupUseCaseRequest) {
    const group = await this.groupRepository.findById(groupId)

    return group
  }
}
