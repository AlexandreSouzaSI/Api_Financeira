import { Injectable } from '@nestjs/common'
import { UserGroupsRepository } from '../repositories/userGroups-repository'
import { UserGroups } from '../entities/userGroups'
import { Either, right } from 'src/core/either'

interface FetchRecentUserGroupsUseCaseRequest {
  userId: string
  page: number
}

type FetchRecentUserGroupsUseCaseResponse = Either<
  null,
  {
    userGroup: UserGroups[]
  }
>

@Injectable()
export class FetchRecentUserGroupsUseCase {
  constructor(private groupRepository: UserGroupsRepository) {}

  async execute({
    userId,
    page,
  }: FetchRecentUserGroupsUseCaseRequest): Promise<FetchRecentUserGroupsUseCaseResponse> {
    const userGroup = await this.groupRepository.findManyRecent(
      { page },
      userId,
    )

    return right({
      userGroup,
    })
  }
}
