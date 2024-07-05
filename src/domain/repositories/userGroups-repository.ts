import { PaginationParams } from 'src/core/repositories/pagination-params'
import { UserGroups } from '../entities/userGroups'

export abstract class UserGroupsRepository {
  abstract create(data: UserGroups): Promise<void>
  abstract findById(userId: string, groupId: string): Promise<UserGroups | null>
  abstract findManyRecent(
    params: PaginationParams,
    userId: string,
  ): Promise<UserGroups[]>

  abstract save(data: UserGroups): Promise<void>
  abstract delete(data: UserGroups): Promise<void>
}
