import { faker } from '@faker-js/faker'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Orcamento, OrcamentoProps } from 'src/domain/entities/orcamento'

export function makeOrcamento(
  override: Partial<OrcamentoProps> = {},
  id?: UniqueEntityId,
) {
  const orcamento = Orcamento.create(
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

  return orcamento
}
