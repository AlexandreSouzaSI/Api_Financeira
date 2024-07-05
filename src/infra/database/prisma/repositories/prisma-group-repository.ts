import { Injectable } from '@nestjs/common'
import { PaginationParams } from 'src/core/repositories/pagination-params'
import { PrismaService } from '../prisma.service'
import { GroupRepository } from 'src/domain/repositories/group-repository'
import { PrismaGroupMapper } from '../mappers/prisma-group-mapper'
import { Group } from 'src/domain/entities/group'

@Injectable()
export class PrismaGroupRepository implements GroupRepository {
  constructor(private prisma: PrismaService) {}

  async create(renda: Group) {
    const data = PrismaGroupMapper.toPrisma(renda)

    await this.prisma.group.create({
      data,
    })
  }

  async findById(id: string) {
    const group = await this.prisma.group.findUnique({
      where: {
        id,
      },
    })

    if (!group) {
      return null
    }

    return PrismaGroupMapper.toDomain(group)
  }

  async findManyRecent({ page }: PaginationParams, id: string) {
    const group = await this.prisma.group.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
      skip: (page - 1) * 10,
      where: {
        userId: id,
      },
    })

    return group.map(PrismaGroupMapper.toDomain)
  }

  async save(group: Group) {
    const data = PrismaGroupMapper.toPrisma(group)

    await this.prisma.group.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(group: Group) {
    const data = PrismaGroupMapper.toPrisma(group)

    await this.prisma.group.delete({
      where: {
        id: data.id,
      },
    })
  }
}
