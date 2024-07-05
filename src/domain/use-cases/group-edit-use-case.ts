import { Injectable } from '@nestjs/common'
import { GroupRepository } from '../repositories/group-repository'

interface EditGroupUseCaseRequest {
  groupId: string
  name: string
}

@Injectable()
export class EditGroupUseCase {
  constructor(private groupRepository: GroupRepository) {}

  async execute({ name, groupId }: EditGroupUseCaseRequest) {
    const group = await this.groupRepository.findById(groupId)

    if (!group) {
      return null
    }

    group.name = name

    await this.groupRepository.save(group)

    return group
  }
}
