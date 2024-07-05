import { PaginationParams } from 'src/core/repositories/pagination-params'
import { Group } from '../entities/group'

export abstract class GroupRepository {
  abstract create(data: Group): Promise<void>
  abstract findById(id: string): Promise<Group | null>
  abstract findManyRecent(
    params: PaginationParams,
    userId: string,
  ): Promise<Group[]>

  abstract save(data: Group): Promise<void>
  abstract delete(data: Group): Promise<void>
}
