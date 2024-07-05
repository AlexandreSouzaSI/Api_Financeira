import { Injectable } from '@nestjs/common'
import { UserGroupsRepository } from '../repositories/userGroups-repository'

interface DeleteUserGroupUseCaseRequest {
  userId: string
  groupId: string
}

@Injectable()
export class DeleteUserGroupUseCase {
  constructor(private userGroupRepository: UserGroupsRepository) {}

  async execute({ userId, groupId }: DeleteUserGroupUseCaseRequest) {
    const userGroup = await this.userGroupRepository.findById(userId, groupId)

    if (!userGroup) {
      return null
    }

    await this.userGroupRepository.delete(userGroup)

    return userGroup
  }
}
