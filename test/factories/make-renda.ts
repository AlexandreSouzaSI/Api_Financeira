import { faker } from '@faker-js/faker'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Renda, RendaProps } from 'src/domain/entities/renda'

export function makeRenda(
  override: Partial<RendaProps> = {},
  id?: UniqueEntityId,
) {
  const renda = Renda.create(
    {
      name: faker.person.firstName(),
      data: faker.date.anytime(),
      valor: faker.number.float(),
      userId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return renda
}
