import { PaginationParams } from 'src/core/repositories/pagination-params'
import { Group } from 'src/domain/entities/group'
import { GroupRepository } from 'src/domain/repositories/group-repository'

export class InMemoryGroupRepository implements GroupRepository {
  public items: Group[] = []

  async create(group: Group) {
    this.items.push(group)
  }

  async findById(id: string) {
    const group = this.items.find((item) => item.id.toString() === id)

    if (!group) {
      return null
    }

    return group
  }

  async findManyRecent({ page }: PaginationParams, id: string) {
    const filteredGroup = this.items.filter(
      (item) => item.userId.toString() === id,
    )

    const group = filteredGroup
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return group
  }

  async save(group: Group) {
    const itemIndex = this.items.findIndex((item) => item.id === group.id)

    this.items[itemIndex] = group
  }

  async delete(group: Group) {
    const itemIndex = this.items.findIndex((item) => item.id === group.id)

    this.items.splice(itemIndex, 1)
  }
}
