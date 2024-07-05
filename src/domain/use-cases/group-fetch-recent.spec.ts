import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { InMemoryGroupRepository } from 'test/repositories/in-memory-group-repository'
import { FetchRecentGroupUseCase } from './group-fetch-recent-use-case'
import { makeGroup } from 'test/factories/make-group'

let inMemoryGroupRepository: InMemoryGroupRepository
let sut: FetchRecentGroupUseCase

describe('Fetch a recent group', () => {
  beforeEach(() => {
    inMemoryGroupRepository = new InMemoryGroupRepository()
    sut = new FetchRecentGroupUseCase(inMemoryGroupRepository)
  })

  it('should be able to fetch recent group', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryGroupRepository.create(
        makeGroup({
          userId: new UniqueEntityId('group-1'),
        }),
      )
    }

    const result = await sut.execute({
      userId: 'group-1',
      page: 2,
    })

    const { group } = result

    expect(group.length).toBe(2)
    expect(group[0].userId.toString()).toEqual('group-1')
    expect(group[1].userId.toString()).toEqual('group-1')
  })
})
