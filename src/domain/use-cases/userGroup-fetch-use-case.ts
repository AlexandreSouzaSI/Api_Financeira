import { Injectable } from '@nestjs/common'
import { UserGroupsRepository } from '../repositories/userGroups-repository'

interface FetchUserGroupsUseCaseRequest {
  groupId: string
  userId: string
}

@Injectable()
export class FetchUserGroupsUseCase {
  constructor(private userGroupsRepository: UserGroupsRepository) {}

  async execute({ groupId, userId }: FetchUserGroupsUseCaseRequest) {
    const userGroup = await this.userGroupsRepository.findById(groupId, userId)

    return userGroup
  }
}
