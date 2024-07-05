import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { InMemoryGroupRepository } from 'test/repositories/in-memory-group-repository'
import { EditGroupUseCase } from './group-edit-use-case'
import { makeGroup } from 'test/factories/make-group'

let inMemoryGroupRepository: InMemoryGroupRepository
let sut: EditGroupUseCase

describe('Edit group', () => {
  beforeEach(() => {
    inMemoryGroupRepository = new InMemoryGroupRepository()
    sut = new EditGroupUseCase(inMemoryGroupRepository)
  })

  it('should be able to edit a group', async () => {
    const newGroup = makeGroup(
      {
        name: 'original',
      },
      new UniqueEntityId('group-1'),
    )

    await inMemoryGroupRepository.create(newGroup)

    const result = await sut.execute({
      groupId: 'group-1',
      name: 'updated-group',
    })

    expect(inMemoryGroupRepository.items[0].name).toEqual(result?.name)
  })
})
