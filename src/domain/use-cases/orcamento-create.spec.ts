import { InMemoryOrcamentoRepository } from 'test/repositories/in-memory-orcamento-repository'
import { CreateOrcamentoUseCase } from './orcamento-create-use-case'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

let inMemoryOrcamentoRepository: InMemoryOrcamentoRepository
let sut: CreateOrcamentoUseCase

describe('create a orcamento', () => {
  beforeEach(() => {
    inMemoryOrcamentoRepository = new InMemoryOrcamentoRepository()
    sut = new CreateOrcamentoUseCase(inMemoryOrcamentoRepository)
  })

  it('should be able to create a orcamento', async () => {
    const orcamento = await sut.execute({
      userId: new UniqueEntityId('21'),
      name: 'conta de luz',
      valor: 100,
      data: new Date(),
      dataVencimento: new Date(),
    })

    expect(orcamento.value?.orcamento.valor).toEqual(100)
  })
})
