import { InMemoryOrcamentoRepository } from 'test/repositories/in-memory-orcamento-repository'
import { DeleteOrcamentoUseCase } from './orcamento-delete-use-case'
import { makeOrcamento } from 'test/factories/make-orcamento'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

let inMemoryOrcamentoRepository: InMemoryOrcamentoRepository
let sut: DeleteOrcamentoUseCase

describe('Delete orcamento', () => {
  beforeEach(() => {
    inMemoryOrcamentoRepository = new InMemoryOrcamentoRepository()
    sut = new DeleteOrcamentoUseCase(inMemoryOrcamentoRepository)
  })

  it('should be able to delete a orcamento', async () => {
    const newOrcamento = makeOrcamento({}, new UniqueEntityId('orcamento-1'))

    await inMemoryOrcamentoRepository.create(newOrcamento)

    await sut.execute({
      orcamentoId: 'orcamento-1',
    })

    expect(inMemoryOrcamentoRepository.items).toHaveLength(0)
  })
})
