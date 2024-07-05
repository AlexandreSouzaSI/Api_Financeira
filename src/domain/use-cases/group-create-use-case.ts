import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { GroupRepository } from '../repositories/group-repository'
import { Group } from '../entities/group'

interface CreateGroupUseCaseRequest {
  userId: UniqueEntityId
  name: string
}

@Injectable()
export class CreateGroupUseCase {
  constructor(private groupRepository: GroupRepository) {}

  async execute({ name, userId }: CreateGroupUseCaseRequest) {
    const group = Group.create({
      userId,
      name,
    })

    await this.groupRepository.create(group)

    return group
  }
}
