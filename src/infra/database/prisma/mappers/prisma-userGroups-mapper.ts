import { UserGroups as PrismaUserGroups, Prisma } from '@prisma/client'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { UserGroups } from 'src/domain/entities/userGroups'

export class PrismaUserGroupsMapper {
  static toDomain(raw: PrismaUserGroups): UserGroups {
    return UserGroups.create({
      userId: new UniqueEntityId(raw.userId),
      groupId: new UniqueEntityId(raw.groupId),
      updatedAt: raw.updatedAt,
    })
  }

  static toPrisma(
    userGroups: UserGroups,
  ): Prisma.UserGroupsUncheckedCreateInput {
    return {
      userId: userGroups.userId.toString(),
      groupId: userGroups.groupId.toString(),
      updatedAt: userGroups.updatedAt,
    }
  }
}
