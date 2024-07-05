import { Group as PrismaGroup, Prisma } from '@prisma/client'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Group } from 'src/domain/entities/group'

export class PrismaGroupMapper {
  static toDomain(raw: PrismaGroup): Group {
    return Group.create(
      {
        name: raw.name,
        userId: new UniqueEntityId(raw.userId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(group: Group): Prisma.GroupUncheckedCreateInput {
    return {
      id: group.id.toString(),
      name: group.name,
      userId: group.userId.toString(),
      createdAt: group.createdAt,
      updatedAt: group.updatedAt,
    }
  }
}
