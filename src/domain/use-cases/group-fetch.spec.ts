import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { InMemoryGroupRepository } from 'test/repositories/in-memory-group-repository'
import { makeGroup } from 'test/factories/make-group'
import { FetchGroupUseCase } from './group-fetch-use-case'

let inMemoryGroupRepository: InMemoryGroupRepository
let sut: FetchGroupUseCase

describe('Fetch a group', () => {
  beforeEach(() => {
    inMemoryGroupRepository = new InMemoryGroupRepository()
    sut = new FetchGroupUseCase(inMemoryGroupRepository)
  })

  it('should be able to fetch a group', async () => {
    await inMemoryGroupRepository.create(
      makeGroup({}, new UniqueEntityId('group-1')),
    )

    const group = await sut.execute({
      groupId: 'group-1',
    })

    expect(inMemoryGroupRepository.items[0].id).toEqual(group?.id)
  })
})
