import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { InMemoryGroupRepository } from 'test/repositories/in-memory-group-repository'
import { DeleteGroupUseCase } from './group-delete-use-case'
import { makeGroup } from 'test/factories/make-group'

let inMemoryGroupRepository: InMemoryGroupRepository
let sut: DeleteGroupUseCase

describe('Delete group', () => {
  beforeEach(() => {
    inMemoryGroupRepository = new InMemoryGroupRepository()
    sut = new DeleteGroupUseCase(inMemoryGroupRepository)
  })

  it('should be able to delete a group', async () => {
    const newStock = makeGroup({}, new UniqueEntityId('group-1'))

    await inMemoryGroupRepository.create(newStock)

    await sut.execute({
      groupId: 'group-1',
    })

    expect(inMemoryGroupRepository.items).toHaveLength(0)
  })
})
