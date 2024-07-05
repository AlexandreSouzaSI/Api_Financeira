import { Entity } from '../../core/entities/entity'
import { UniqueEntityId } from '../../core/entities/unique-entity-id'

export interface UserGroupsProps {
  userId: UniqueEntityId
  groupId: UniqueEntityId
  updatedAt?: Date | null
}

export class UserGroups extends Entity<UserGroupsProps> {
  get userId() {
    return this.props.userId
  }

  get groupId() {
    return this.props.groupId
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set userId(userId: UniqueEntityId) {
    this.props.userId = userId
    this.touch()
  }

  set groupId(groupId: UniqueEntityId) {
    this.props.groupId = groupId
    this.touch()
  }

  static create(props, id?: UniqueEntityId) {
    const userGroups = new UserGroups(
      {
        ...props,
        updatedAt: props.updatedAt ?? null,
      },
      id,
    )

    return userGroups
  }
}
