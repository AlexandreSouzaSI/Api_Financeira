import { PaginationParams } from 'src/core/repositories/pagination-params'
import { UserGroups } from 'src/domain/entities/userGroups'
import { UserGroupsRepository } from 'src/domain/repositories/userGroups-repository'

export class InMemoryUserGroupsRepository implements UserGroupsRepository {
  public items: UserGroups[] = []

  async create(userGroup: UserGroups) {
    this.items.push(userGroup)
  }

  async findById(groupId: string, userId: string) {
    const userGroup = this.items.find(
      (item) =>
        item.groupId.toString() === groupId &&
        item.userId.toString() === userId,
    )

    return userGroup || null
  }

  async findManyRecent({ page }: PaginationParams, id: string) {
    const filteredUserGroups = this.items.filter(
      (item) => item.userId.toString() === id,
    )

    const group = filteredUserGroups.slice((page - 1) * 20, page * 20)

    return group
  }

  async save(userGroup: UserGroups) {
    const itemIndex = this.items.findIndex((item) => item.id === userGroup.id)

    this.items[itemIndex] = userGroup
  }

  async delete(userGroup: UserGroups) {
    const itemIndex = this.items.findIndex(
      (item) =>
        item.groupId === userGroup.groupId && item.userId === userGroup.userId,
    )

    if (itemIndex !== -1) {
      this.items.splice(itemIndex, 1)
    }
  }
}
