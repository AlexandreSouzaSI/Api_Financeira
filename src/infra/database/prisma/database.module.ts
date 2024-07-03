import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { PrismaUserRepository } from './repositories/prisma-user-repository'
import { PrismaOrcamentoRepository } from './repositories/prisma-orcamento-repository'
import { PrismaRendaRepository } from './repositories/prisma-renda-repository'
import { UserRepository } from 'src/domain/repositories/user-repository'
import { OrcamentoRepository } from 'src/domain/repositories/orcamento-repository'
import { RendaRepository } from 'src/domain/repositories/renda-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: OrcamentoRepository,
      useClass: PrismaOrcamentoRepository,
    },
    {
      provide: RendaRepository,
      useClass: PrismaRendaRepository,
    },
  ],
  exports: [
    PrismaService,
    UserRepository,
    OrcamentoRepository,
    RendaRepository,
  ],
})
export class DatabaseModule {}
