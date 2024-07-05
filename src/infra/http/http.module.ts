import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/create-account.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { DatabaseModule } from '../database/prisma/database.module'
import { CreateUserUseCase } from 'src/domain/use-cases/user-create-use-case'
import { PrismaClient } from '@prisma/client'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { AuthenticateUserUseCase } from 'src/domain/use-cases/user-authenticate-use-case'
import { CreateODespesasController } from './controllers/create-despesas.controller'
import { FetchDespesasController } from './controllers/fetch-recent-orcamentos.controller'
import { CreateDespesasUseCase } from 'src/domain/use-cases/despesas-create-use-case'
import { FetchRecentDespesasUseCase } from 'src/domain/use-cases/despesas-fetch-recent-use-case'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateODespesasController,
    FetchDespesasController,
  ],
  providers: [
    PrismaClient,
    CreateUserUseCase,
    CreateDespesasUseCase,
    FetchRecentDespesasUseCase,
    AuthenticateUserUseCase,
  ],
})
export class HttpModule {}
