import { InMemoryOrcamentoRepository } from 'test/repositories/in-memory-orcamento-repository'
import { makeOrcamento } from 'test/factories/make-orcamento'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { FetchOrcamentoUseCase } from './orcamento-fetch-use-case'

let inMemoryOrcamentoRepository: InMemoryOrcamentoRepository
let sut: FetchOrcamentoUseCase

describe('Fetch a orcamento', () => {
  beforeEach(() => {
    inMemoryOrcamentoRepository = new InMemoryOrcamentoRepository()
    sut = new FetchOrcamentoUseCase(inMemoryOrcamentoRepository)
  })

  it('should be able to fetch a orcamento', async () => {
    await inMemoryOrcamentoRepository.create(
      makeOrcamento({}, new UniqueEntityId('orcamento-1')),
    )

    const orcamento = await sut.execute({
      orcamentoId: 'orcamento-1',
    })

    expect(inMemoryOrcamentoRepository.items[0].id).toEqual(orcamento?.id)
  })
})
