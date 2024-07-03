import { InMemoryOrcamentoRepository } from 'test/repositories/in-memory-orcamento-repository'
import { makeOrcamento } from 'test/factories/make-orcamento'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { FetchRecentOrcamentoUseCase } from './orcamento-fetch-recent-use-case'

let inMemoryOrcamentoRepository: InMemoryOrcamentoRepository
let sut: FetchRecentOrcamentoUseCase

describe('Fetch a recent orcamento', () => {
  beforeEach(() => {
    inMemoryOrcamentoRepository = new InMemoryOrcamentoRepository()
    sut = new FetchRecentOrcamentoUseCase(inMemoryOrcamentoRepository)
  })

  it('should be able to fetch recent orcamentos', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryOrcamentoRepository.create(
        makeOrcamento({
          userId: new UniqueEntityId('orcamento-1'),
          createdAt: new Date(), // Adicione uma data de criação para garantir a ordenação
        }),
      )
    }

    const result = await sut.execute({
      userId: 'orcamento-1',
      page: 2,
    })

    expect(result.value?.orcamento).toHaveLength(2)
  })
})
