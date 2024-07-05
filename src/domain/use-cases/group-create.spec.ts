import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { CreateGroupUseCase } from './group-create-use-case'
import { InMemoryGroupRepository } from 'test/repositories/in-memory-group-repository'

let inMemoryGroupRepository: InMemoryGroupRepository
let sut: CreateGroupUseCase

describe('create a group', () => {
  beforeEach(() => {
    inMemoryGroupRepository = new InMemoryGroupRepository()
    sut = new CreateGroupUseCase(inMemoryGroupRepository)
  })

  it('should be able to create a group', async () => {
    const group = await sut.execute({
      userId: new UniqueEntityId('21'),
      name: 'Caminhão',
    })

    expect(group.name).toEqual('Caminhão')
    expect(group.userId.toValue()).toEqual('21')
  })
})
