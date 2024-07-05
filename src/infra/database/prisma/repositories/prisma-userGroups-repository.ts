import { Injectable } from '@nestjs/common'
import { PaginationParams } from 'src/core/repositories/pagination-params'
import { PrismaService } from '../prisma.service'
import { UserGroups } from 'src/domain/entities/userGroups'
import { PrismaUserGroupsMapper } from '../mappers/prisma-userGroups-mapper'
import { UserGroupsRepository } from 'src/domain/repositories/userGroups-repository'

@Injectable()
export class PrismaUserGroupsRepository implements UserGroupsRepository {
  constructor(private prisma: PrismaService) {}

  async create(userGroups: UserGroups) {
    const data = PrismaUserGroupsMapper.toPrisma(userGroups)

    await this.prisma.userGroups.create({
      data,
    })
  }

  async findById(userId: string, groupId: string) {
    const userGroup = await this.prisma.userGroups.findUnique({
      where: {
        userId_groupId: {
          userId,
          groupId,
        },
      },
    })

    if (!userGroup) {
      return null
    }

    return PrismaUserGroupsMapper.toDomain(userGroup)
  }

  async findManyByUserId({ page }: PaginationParams, userId: string) {
    const userGroups = await this.prisma.userGroups.findMany({
      take: 10,
      skip: (page - 1) * 10,
      where: {
        userId,
      },
    })

    return userGroups.map(PrismaUserGroupsMapper.toDomain)
  }

  async save(userGroups: UserGroups) {
    const data = PrismaUserGroupsMapper.toPrisma(userGroups)

    await this.prisma.userGroups.update({
      where: {
        userId_groupId: {
          userId: data.userId,
          groupId: data.groupId,
        },
      },
      data,
    })
  }

  async delete(userGroups: UserGroups) {
    const data = PrismaUserGroupsMapper.toPrisma(userGroups)

    await this.prisma.userGroups.delete({
      where: {
        userId_groupId: {
          userId: data.userId,
          groupId: data.groupId,
        },
      },
    })
  }
}
