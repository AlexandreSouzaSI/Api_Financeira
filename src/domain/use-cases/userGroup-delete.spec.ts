import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { InMemoryUserGroupsRepository } from 'test/repositories/in-memory-userGroups-repository'
import { DeleteUserGroupUseCase } from './userGroup-delete-use-case'
import { makeUserGroups } from 'test/factories/make-userGroups'

let inMemoryUserGroupRepository: InMemoryUserGroupsRepository
let sut: DeleteUserGroupUseCase

describe('Delete userGroups', () => {
  beforeEach(() => {
    inMemoryUserGroupRepository = new InMemoryUserGroupsRepository()
    sut = new DeleteUserGroupUseCase(inMemoryUserGroupRepository)
  })

  it('should be able to delete a userGroups', async () => {
    const newStock = makeUserGroups({
      groupId: new UniqueEntityId('groups-1'),
      userId: new UniqueEntityId('user-1'),
    })

    await inMemoryUserGroupRepository.create(newStock)

    await sut.execute({
      userId: 'user-1',
      groupId: 'groups-1',
    })

    const foundUserGroups = await inMemoryUserGroupRepository.findById(
      'user-1',
      'groups-1',
    )

    expect(foundUserGroups).toBeNull()
  })
})
