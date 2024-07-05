import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { InMemoryUserGroupsRepository } from 'test/repositories/in-memory-userGroups-repository'
import { FetchRecentUserGroupsUseCase } from './userGroup-fetch-recent-use-case'
import { makeUserGroups } from 'test/factories/make-userGroups'

let inMemoryUserGroupsRepository: InMemoryUserGroupsRepository
let sut: FetchRecentUserGroupsUseCase

describe('Fetch a recent group', () => {
  beforeEach(() => {
    inMemoryUserGroupsRepository = new InMemoryUserGroupsRepository()
    sut = new FetchRecentUserGroupsUseCase(inMemoryUserGroupsRepository)
  })

  it('should be able to fetch recent userGroup', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryUserGroupsRepository.create(
        makeUserGroups({
          userId: new UniqueEntityId('userGroup-1'),
        }),
      )
    }

    const result = await sut.execute({
      userId: 'userGroup-1',
      page: 2,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.userGroup[0].userId.toString()).toEqual('userGroup-1')
    expect(result.value?.userGroup[1].userId.toString()).toEqual('userGroup-1')
  })
})
