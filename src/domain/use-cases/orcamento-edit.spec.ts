import { InMemoryOrcamentoRepository } from 'test/repositories/in-memory-orcamento-repository'
import { EditOrcamentoUseCase } from './orcamento-edit-use-case'
import { makeOrcamento } from 'test/factories/make-orcamento'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { makeUser } from 'test/factories/make-user'

let inMemoryOrcamentoRepository: InMemoryOrcamentoRepository
let sut: EditOrcamentoUseCase

describe('Edit orcamento', () => {
  beforeEach(() => {
    inMemoryOrcamentoRepository = new InMemoryOrcamentoRepository()
    sut = new EditOrcamentoUseCase(inMemoryOrcamentoRepository)
  })

  it('should be able to edit a orcamento', async () => {
    const newSale = makeOrcamento({}, new UniqueEntityId('orcamento-1'))
    const newUser = makeUser({}, new UniqueEntityId('user-1'))

    await inMemoryOrcamentoRepository.create(newSale)

    await sut.execute({
      orcamentoId: 'orcamento-1',
      name: 'Conta de Agua Atualizada',
      valor: 150,
      userId: newUser.id,
    })

    expect(inMemoryOrcamentoRepository.items[0]).toMatchObject({
      name: 'Conta de Agua Atualizada',
      valor: 150,
    })
  })
})
