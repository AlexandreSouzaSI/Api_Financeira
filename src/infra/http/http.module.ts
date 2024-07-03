import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/create-account.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateOrcamentosController } from './controllers/create-orcamentos.controller'
import { DatabaseModule } from '../database/prisma/database.module'
import { CreateUserUseCase } from 'src/domain/use-cases/user-create-use-case'
import { PrismaClient } from '@prisma/client'
import { CreateOrcamentoUseCase } from 'src/domain/use-cases/orcamento-create-use-case'
import { FetchRecentOrcamentoUseCase } from 'src/domain/use-cases/orcamento-fetch-recent-use-case'
import { FetchOrcamentosController } from './controllers/fetch-recent-orcamentos.controller'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { AuthenticateUserUseCase } from 'src/domain/use-cases/user-authenticate-use-case'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateOrcamentosController,
    FetchOrcamentosController,
  ],
  providers: [
    PrismaClient,
    CreateUserUseCase,
    CreateOrcamentoUseCase,
    FetchRecentOrcamentoUseCase,
    AuthenticateUserUseCase,
  ],
})
export class HttpModule {}
