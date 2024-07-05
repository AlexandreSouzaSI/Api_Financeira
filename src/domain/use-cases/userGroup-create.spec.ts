import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { InMemoryUserGroupsRepository } from 'test/repositories/in-memory-userGroups-repository'
import { CreateUserGroupUseCase } from './userGroup-create-use-case'

let inMemoryUserGroupRepository: InMemoryUserGroupsRepository
let sut: CreateUserGroupUseCase

describe('Create a userGroup', () => {
  beforeEach(() => {
    inMemoryUserGroupRepository = new InMemoryUserGroupsRepository()
    sut = new CreateUserGroupUseCase(inMemoryUserGroupRepository)
  })

  it('should be able to create a userGroup', async () => {
    const userId = new UniqueEntityId('user-1')
    const groupId = new UniqueEntityId('group-1')

    const userGroups = await sut.execute({
      userId,
      groupId,
    })

    expect(userGroups).toBeDefined()
    expect(userGroups.userId.toValue()).toEqual('user-1') // Acessa o valor do UniqueEntityId
    expect(userGroups.groupId.toValue()).toEqual('group-1') // Acessa o valor do UniqueEntityId
  })
})
