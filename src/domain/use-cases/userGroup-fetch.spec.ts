import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { FetchUserGroupsUseCase } from './userGroup-fetch-use-case'
import { InMemoryUserGroupsRepository } from 'test/repositories/in-memory-userGroups-repository'
import { makeUserGroups } from 'test/factories/make-userGroups'

let inMemoryUserGroupsRepository: InMemoryUserGroupsRepository
let sut: FetchUserGroupsUseCase

describe('Fetch a userGroup', () => {
  beforeEach(() => {
    inMemoryUserGroupsRepository = new InMemoryUserGroupsRepository()
    sut = new FetchUserGroupsUseCase(inMemoryUserGroupsRepository)
  })

  it('should be able to fetch a userGroup', async () => {
    await inMemoryUserGroupsRepository.create(
      makeUserGroups({
        groupId: new UniqueEntityId('userGroup-1'),
        userId: new UniqueEntityId('user-1'),
      }),
    )

    const userGroup = await sut.execute({
      groupId: 'userGroup-1',
      userId: 'user-1',
    })

    expect(inMemoryUserGroupsRepository.items[0].groupId.toValue()).toEqual(
      userGroup?.groupId.toValue(),
    )
  })
})
