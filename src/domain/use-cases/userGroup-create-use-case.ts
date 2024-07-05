import { Injectable } from '@nestjs/common'
import { UserGroupsRepository } from '../repositories/userGroups-repository'
import { UserGroups } from '../entities/userGroups'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

interface CreateUserGroupUseCaseRequest {
  userId: UniqueEntityId
  groupId: UniqueEntityId
}

@Injectable()
export class CreateUserGroupUseCase {
  constructor(private userGroupRepository: UserGroupsRepository) {}

  async execute({ userId, groupId }: CreateUserGroupUseCaseRequest) {
    const userGroups = UserGroups.create({
      userId,
      groupId,
    })

    await this.userGroupRepository.create(userGroups)

    return userGroups
  }
}
