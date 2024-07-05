import { faker } from '@faker-js/faker'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Group, GroupProps } from 'src/domain/entities/group'

export function makeGroup(
  override: Partial<GroupProps> = {},
  id?: UniqueEntityId,
) {
  const group = Group.create(
    {
      name: faker.person.firstName(),
      userId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return group
}
