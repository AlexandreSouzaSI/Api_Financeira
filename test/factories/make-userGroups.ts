import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { UserGroups, UserGroupsProps } from 'src/domain/entities/userGroups'

export function makeUserGroups(override: Partial<UserGroupsProps> = {}) {
  const userGroups = UserGroups.create({
    userId: new UniqueEntityId(),
    groupId: new UniqueEntityId(),
    ...override,
  })

  return userGroups
}
