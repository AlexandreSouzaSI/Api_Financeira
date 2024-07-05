import { Injectable } from '@nestjs/common'
import { GroupRepository } from '../repositories/group-repository'

interface DeleteGroupUseCaseRequest {
  groupId: string
}

@Injectable()
export class DeleteGroupUseCase {
  constructor(private groupRepository: GroupRepository) {}

  async execute({ groupId }: DeleteGroupUseCaseRequest) {
    const group = await this.groupRepository.findById(groupId)

    if (!group) {
      return null
    }

    await this.groupRepository.delete(group)

    return group
  }
}
