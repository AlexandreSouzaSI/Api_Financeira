import { Group } from 'src/domain/entities/group'

export class GroupPresenter {
  static toHTTP(group: Group) {
    return {
      id: group.id.toString(),
      name: group.name,
      createdAt: group.createdAt,
      updatedAt: group.updatedAt,
      userId: group.userId.toString(),
    }
  }
}
