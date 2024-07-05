import { faker } from '@faker-js/faker'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Despesas, DespesasProps } from 'src/domain/entities/despesas'

export function makeDespesa(
  override: Partial<DespesasProps> = {},
  id?: UniqueEntityId,
) {
  const Despesa = Despesas.create(
    {
      name: faker.person.firstName(),
      data: faker.date.anytime(),
      valor: faker.number.float(),
      dataVencimento: faker.date.anytime(),
      userId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return Despesa
}
