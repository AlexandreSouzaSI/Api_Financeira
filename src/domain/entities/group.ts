import { Entity } from '../../core/entities/entity'
import { UniqueEntityId } from '../../core/entities/unique-entity-id'
import { Optional } from '../../core/types/optional'

export interface GroupProps {
  name: string
  createdAt: Date
  updatedAt?: Date | null
  userId: UniqueEntityId
}

export class Group extends Entity<GroupProps> {
  get userId() {
    return this.props.userId
  }

  get name() {
    return this.props.name
  }

  get createdAt() {
    return this.props.createdAt
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

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  static create(props: Optional<GroupProps, 'createdAt'>, id?: UniqueEntityId) {
    const group = new Group(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return group
  }
}
